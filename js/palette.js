class Palette{
    //添加属性
    constructor(opacity,canvas){
        this.opacity = opacity;
        this.canvas = canvas;//引入画布
        this.ctx = this.canvas.getContext("2d");
        this.cw = this.canvas.width;
        this.ch = this.canvas.height;
        this.history = [];
        this.style = 'strock';
        this.fillStyle = '#000';
        this.strokeStyle = '#000';
        this.lineWidth = 1;
        this.temp = [];
    }
    //画布中元素的样式集合
    _init(){
        this.ctx.fillStyle = this.fillStyle;
        this.ctx.strokeStyle = this.strokeStyle;
        this.ctx.lineWidth = this.lineWidth;
    }
    //撤销
    back(){
        let that = this;
        let back = document.querySelector('#back');
        //点击撤回
        back.onclick = function () {
            if(that.history.length > 0){
                let data = that.history.pop();//对应的历史记录删除并保存下来
                that.ctx.putImageData(data, 0, 0)
            }else{
                that.ctx.clearRect(0, 0, that.cw, that.ch);
            }
        }
        //按键撤回
        document.onkeydown = function(e){
            if(e.ctrlKey && e.key == 'z'){
                if(that.history.length > 0){
                    let data = that.history.pop();
                    that.ctx.putImageData(data, 0, 0)
                }else{
                    that.ctx.clearRect(0, 0, that.cw, that.ch);
                }
            };
        };
        this.history.push(this.ctx.getImageData(0, 0,this.cw,this.ch));
    }
    //清空
    clear(){
        this.ctx.clearRect(0, 0, this.cw, this.ch);
        this.history.push(this.ctx.getImageData(0, 0,this.cw,this.ch));
    }
    //直线
    line(ox,oy,mx,my){
        this.ctx.beginPath();
        this.ctx.moveTo(ox,oy);
        this.ctx.lineTo(mx,my);
        this.ctx.stroke();
    }
    //圆
    circle(ox,oy,mx,my){
        let r = Math.sqrt(Math.pow(ox-mx,2)+Math.pow(oy-my,2));
        this.ctx.beginPath();
        this.ctx.arc(ox,oy,r,0,Math.PI*2)
        this.ctx[this.style]();
    }
    //矩形
    rec(ox,oy,mx,my){
        this.ctx.beginPath();
        this.ctx.rect(ox,oy,mx-ox,my-oy);
        this.ctx[this.style]();
    }
    //多边形
    poly(ox,oy,mx,my,num) {
        let r = Math.sqrt(Math.pow(ox-mx,2)+Math.pow(oy-my,2));
        let ang = 2*Math.PI/num;
        this.ctx.beginPath();
        this.ctx.moveTo(ox+r,oy);
        for(let i = 0; i < num;i++){
            let x = ox+r*Math.cos(ang*i),
                y = oy+r*Math.sin(ang*i);
            this.ctx.lineTo(x,y);
        }
        this.ctx.closePath()
        this.ctx[this.style]();
    }
    //多角形
    poly_J(ox,oy,mx,my,num){
        let r = Math.sqrt(Math.pow(ox-mx,2)+Math.pow(oy-my,2));
        let r1 = r/3,ang = Math.PI/num;
        this.ctx.beginPath();
        for(let i = 0; i < 2*num; i++){
            let x,y;
            if(i % 2 == 0){
                x = mx + r*Math.cos(i*ang);
                y = my + r*Math.sin(i*ang);
            }else {
                x = mx + r1*Math.cos(i*ang);
                y = my + r1*Math.sin(i*ang);
            }
            this.ctx.lineTo(x,y);
        }
        this.ctx.closePath()
        this.ctx[this.style]();
    }
    //橡皮擦
    erase(){
        let that = this;
        let mask = document.querySelector('.mask');
        mask.style.display = 'block';
        that.opacity.onmousedown = function(e){
            let ox = e.offsetWidth,oy = e.offsetHeight;
            let ew = mask.offsetWidth,eh = mask.offsetHeight;
            let maxW = e.offsetWidth - mask.offsetWidth;
            let maxH = e.offsetHeight -mask.offsetHeight;
            that.opacity.onmousemove = function(e){
                //橡皮擦的移动方式：跟着鼠标移动就好
                let lefts = e.offsetX - ew/2;
                let tops = e.offsetY - eh/2;
                if(lefts >= maxW){
                    lefts = maxW;
                }
                if(tops >= maxH){
                    tops = maxH;
                }
                if(lefts <= 0){
                    lefts = 0;
                }
                if(tops <= 0){
                    tops =0;
                }
                mask.style.left = lefts+ 'px';
                mask.style.top = tops+ 'px';
                that.ctx.clearRect(lefts,tops,ew,eh);
            }
            that.opacity.onmouseup = function(){
                that.history.push(that.ctx.getImageData(0, 0,that.cw,that.ch));
                that.opacity.onmousemove = null;
                that.opacity.onmouseup = null;
            }
        }
        that.back();
    }
    //铅笔
    pencil(){
        let that = this;//当方法里面套用一个函数时，this的指向会发生改变
        console.log(that);
        that.opacity.onmousedown = function (e) {
            let ox = e.offsetX,oy = e.offsetY;
            console.log(1);
            that.ctx.beginPath();
            that.ctx.moveTo(ox,oy);
            that.opacity.onmousemove = function (e) {
                that.ctx.clearRect(0,0,that.cw,that.ch);
                let mx = e.offsetX,my = e.offsetY;
                if(that.history.length){
                    that.ctx.putImageData(that.history[that.history.length-1],0,0)//必须传有3个参数变量
                }
                that.ctx.lineTo(mx,my);
                that.ctx.stroke();
            }
            that.opacity.onmouseup = function () {
                that.history.push(that.ctx.getImageData(0,0,that.cw,that.ch));
                that.opacity.onmousemove = null;
                that.opacity.onmouseup = null;
            }
        }
        that.back();
    }
    //虚线
    dash(ox,oy,mx,my){
        this.ctx.beginPath();
        this.ctx.setLineDash([5,15]);
        this.ctx.moveTo(ox, oy);
        this.ctx.lineTo(mx, my);
        this.ctx.closePath();
        this.ctx.stroke();
    }
    //画布
    draw(type,num){
        let that = this;
        let era = document.querySelector('.mask');
        era.style.display = 'none';
        that.opacity.onmousedown = function(e){
            let ox = e.offsetX,oy = e.offsetY;
            that.opacity.onmousemove = function(e){
                let mx = e.offsetX,my = e.offsetY;
                that.ctx.clearRect(0,0,that.cw,that.ch);
                if(that.history.length){
                    that.ctx.putImageData(that.history[that.history.length - 1], 0, 0);
                }
                that._init();
                that[type](ox,oy,mx,my,num);
            }
            that.opacity.onmouseup = function(){
                that.history.push(that.ctx.getImageData(0, 0,that.cw,that.ch));
                that.opacity.onmousemove = null;
                that.opacity.onmouseup = null;
            }
        }
        that.back();
    }
    //插入文本框
    font(){
        this.opacity.onmousedown = function (e) {
            this._init();
            this.opacity.onmousedown = null;//一次性事件
            let ox = e.offsetX, oy = e.offsetY;
            let inputs = document.createElement('input');
            inputs.style.cssText = `
                width:100px;
                height:50px;
                border:1px solid #ccc;
                border-radius:5px;
                position:absolute;
                top:${oy}px;
                left:${ox}px;
            `;
            inputs.autofocus = true;
            this.opacity.appendChild(inputs);

            inputs.onblur = function () {
                let v = inputs.value;
                inputs.value = null;
                this.ctx.font = '30px 微软雅黑';
                this.ctx.fillText(v,ox,oy);
                this.opacity.removeChild(inputs)
            }.bind(this);

            inputs.onmousedown = function (e) {
                let ox = e.clientX,oy = e.clientY,l = inputs.offsetLeft,t = inputs.offsetTop;
                console.log(ox,oy,l,t);
                this.opacity.onmousemove = function (e) {
                    let mx = e.clientX,my = e.clientY;
                    let lefts = l + mx-ox,//自身的距离+移动的距离
                        tops = t + my-oy;
                    if(lefts >= this.cw-100){
                        lefts = this.cw-100;
                    }
                    if(lefts <= 0){
                        lefts = 0;
                    }
                    if(tops >= this.ch-50){
                        tops = this.ch-50;
                    }
                    if(tops <= 0){
                        tops = 0;
                    }
                    inputs.style.left = lefts + 'px';
                    inputs.style.top = tops +'px';
                }.bind(this)
                inputs.onmouseup = function () {
                    inputs.onmouseup = null;
                    this.opacity.onmousemove = null;
                }.bind(this);
            }.bind(this);
        }.bind(this);
    }
    //裁剪
    clip(clip){
        this.opacity.onmousedown = function (e){
            let ox = e.offsetX,oy = e.offsetY,w,h,minx,miny;
            //console.log(1)
            clip.style.display = 'block';
            clip.style.left = ox + 'px';
            clip.style.top = oy + 'px';
            this.opacity.onmousemove = function (e){
                let mx = e.offsetX,my = e.offsetY;
                w = Math.abs(mx-ox);
                h = Math.abs(my-oy);
                //此处元素的移动需要考虑移动的正负，所以选择比较ox和mx中的较小值，作为元素的左上角位置，
                minx = ox<mx?ox:mx;
                miny = oy<my?oy:my;
                clip.style.left = minx + 'px';
                clip.style.top = miny + 'px';
                clip.style.width = w +'px';
                clip.style.height = h +'px';
            }
            this.opacity.onmouseup = function (){
                this.opacity.onmouseup = null;
                this.opacity.onmousemove = null;
                //一下四步的顺序不可以改变。
                this.temp = this.ctx.getImageData(minx,miny,w,h);//将clip块下的像素信息保存到temp中
                this.ctx.clearRect(minx,miny,w,h);//清空画布
                this.history.push(this.ctx.getImageData(0,0,this.cw,this.ch));//保存历史记录
                // console.log(minx,miny,w,h);
                this.ctx.putImageData(this.temp,minx,miny);//把获取到的temp放回当前位置
                this.drag(clip,minx,miny);//调用drag方法，拖拽，
            }.bind(this);
        }.bind(this);
    }
    //裁剪以后的拖拽,和上面input块的拖拽方法一样
    //  拖拽的方法：原来的位置+ 移动的距离（mx/my - ox/oy）
    drag(clip,minx,miny){//minx和miny代表初始位置
        this.opacity.onmousedown = function (e) {
            let ox = e.offsetX, oy = e.offsetY;
            this.opacity.onmousemove  =function (e) {
                let mx = e.offsetX, my = e.offsetY;
                let lefts = minx + mx-ox, tops = miny + my - oy;
                clip.style.left = lefts +'px';
                clip.style.top = tops + 'px';
                this.ctx.clearRect(0,0,this.cw,this.ch);
                if(this.history.length){
                    this.ctx.putImageData(this.history[this.history.length - 1],0,0);
                    //把history中的最后一个再放回去
                }
                this.ctx.putImageData(this.temp,lefts,tops);//保证clip下的内容可以跟着clip块移动
            }.bind(this);
            this.opacity.onmouseup = function () {
                this.opacity.onmousedown = null;
                this.opacity.onmousemove = null;
                this.opacity.onmouseup = null;
                clip.style.display = 'none';
                this.history.push(this.ctx.getImageData(0,0,this.cw,this.ch));//只要画布产生改变，就需要把内容放入历史记录
            }.bind(this);
        }.bind(this);
    }
}