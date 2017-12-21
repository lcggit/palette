function $(select,ranger = document) {
    if (typeof select == 'string') {
        /*ranger = ranger ? ranger:document;
        ranger = ranger || document;*/
        let selector = select.trim();
        let firstChar = selector.charAt(0);
        if (firstChar == '#') {
            return document.getElementById(selector.substring(1));
        } else if (firstChar == '.') {
            return ranger.getElementsByClassName(selector.substring(1));
        } else if (/^[a-zA-Z][A-Za-z1-6]{0,10}$/.test(selector)) {
            return ranger.getElementsByTagName(selector);
        } else if (/^<[a-zA-Z][A-Za-z1-6]{0,10}>$/.test(selector)) {
            return document.createElement(selector.slice(1, -1));
        }
    } else if (typeof select == 'function') {
        window.onload = function () {
            select();
        }
    }
}

let divs = document.createElement('div');
divs.classList.add('circle');

//对所有方法的封装，都是在基于原生的js的基础上执行的，

function append(parentNode,child){//在末尾添加
    parentNode.appendChild(child);
};

function prepend(parentNode,child){//在父元素的第一个子元素的元素节点前面添加
    let firstChild = parentNode.firstElementChild;
    if(firstChild){
        parentNode.insertBefore(child,firstChild);
    }else{
        parentNode.appendChild(child);
    }
};

////HTMLElement.prototype.fun方法：相当于在这条原型链上面，给一个原型对象HTMLElement添加了一个函数方法，这样的话，在这条原型链下的任何一个对象都可以去调用HTMLElement所添加的这个fun方法

HTMLElement.prototype.append =  function(child){//自己封装的append函数
    this.appendChild(child);
};

HTMLElement.prototype.appendTo = function(parentNode){
    //parentNode.appendChild(this);
    parentNode.append(this);
};//把子元素节点插入到父元素节点（parentNode）中

HTMLElement.prototype.prepend = function(child){
    let firstChild = this.firstElementChild;
    if(firstChild){
        this.insertBefore(child,firstChild);
    }else{
        this.appendChild(child);
    }
};

HTMLElement.prototype.prependTo = function(parentNode){
    parentNode.prepend(this);
};

/*
box.insert(div);
外部插入
insertbefor(原生的)
*/
HTMLElement.prototype.insert = function(node){
    let parent = this.parentNode;
    parent.insertBefore(node,this);
};

HTMLElement.prototype.insertTo = function(parentNode){
    parentNode.insert(this);
};

//对比原生的js--insertBefore发现，缺少一个父类 parent，所以首先需要获取parent（this所指的parent），

/*往一个元素的后面  → 兄弟元素(元素节点)前面*/
HTMLElement.prototype.after = function(node){
    //this node
    let next = this.nextElementSibling;
    if(next){
        next.insert(node);
    }else{
        let parent = this.parentNode;
        parent.append(node);
    }
};

HTMLElement.prototype.afterTo = function(node){
    node.after(this);
};

/*查找*/

/*查找当前对象的父节点*/
HTMLElement.prototype.parent = function(){
    return this.parentNode;
};

/*查找所有的父节点元素，可以处理查找所有拥有定位属性的元素，以及查找某个元素的依据哪个元素定位*/
/*
1.首先给HTMLElement.prototype声明一个函数
2.需要先获取每个元素的父节点元素，
3.判断第2步中获取到的元素是否是拥有定位属性的元素
4.判断定位属性：relative，absolute
 */
HTMLElement.prototype.parents = function(){
    let arr = [];//接收得到的parent
    let parent = this.parentNode;//获取页面中所有的parent
    if(parent.nodeName == 'BODY'){
        arr.push(parent);
    }
    while(parent.nodeName != 'HTML'){
        arr.push(parent);
        parent = parent.parentNode;//更新parent的值
        if(parent.nodeName == 'HTML'){
            arr.push(parent);
        }
    }
    return arr;
};

HTMLElement.prototype.offsetParents = function(){
    let parents = this.parents();
    let node = null;
    for(let i =0;i < parents.length;i++){
        let v = window.getComputedStyle(parents[i],null).position;
        if(v == 'relative' || v == 'absolute'){
            node = parents[i];
            break;
        }
    }
    if(!node){
        node = document.body;
    }
    return node;
};

function nextSibling(elem) {
    let next = [];
    let allchild = elem.parentNode.children;
    for(let i =0;i<allchild.length;i++) {
        if(allchild[i] != elem) 
            next.push(allchild[i]);
    }
    return next[0];
}

function obj(){
    // function Person(name,age,sex){//构造一个函数
    //     this.name = name;//因为对象名不确定，用this
    //     this.age = age;
    //     this.sex = sex;

    // }
    // Person.prototype = {//对象

    //     say:function (){//添加方法
    //         console.log('会打球');
    //     }
    // }
    // var lisi = new Person('李四',23,'女');
    // console.log(lisi);
    // lisi.say();
    // Student.prototype = new Person();
    // function Student (job,ban,color){
    //     this.job = job;
    //     this.ban = ban;
    //     this.color = color;
    //     this.play = function(){
    //         console.log('会boll');
    //     }
    // }
    // var xiao = new Student('学生',1709,'red');
    // console.log(xiao);
    // xiao.say();


    /*function Person(name,age){
        this.name = name;
        this.age = age;
    }
    Person.prototype = {
        say:function(){
            console.log('singing');
        }
    }
    let ming = new Person('ming',20);
    console.log(ming);
    ming.say();
    Student.prototype = new Person();
    function Student(job,color){
        this.job = job;
        this.color = color;
    }
    function Student (){
        // this.play=function(){
        //     console.log('play boll');
        // }
        
    }
    let hua = new Student('学生','red');
    console.log(hua);*/
};