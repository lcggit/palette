window.addEventListener('load',function () {
    let canvas = document.querySelector('canvas');
    //let ctx = canvas.getContext('2d');
    let shape = document.querySelectorAll('.style>li');
    let stylebtn = document.querySelectorAll('.stylebtn');
    let colorbtn = document.querySelectorAll('input[type=color]');
    let linewidth = document.querySelector('input[type=number]');
    let opacity = document.querySelector('.opacity');

    let fill = document.querySelectorAll('.fill>li');

    let fontbtn = document.querySelector('.font>.fonts');
    let clipbtn = document.querySelector('.font>.clips');
    let clip = document.querySelector('.clip');
    let save = document.querySelector('.fill>li>a');
    let palette = null;
    let history = [];
    let flag = false;
    //新建
    fill.forEach(e => {
        let type = e.id;
        e.onclick = function(){
            if(type == 'new'){
                let cw  = parseInt(prompt('请输入画板的宽度'));
                let ch = parseInt(prompt('请输入画板的高度'));
                canvas = document.createElement('canvas');
                canvas.width = cw;
                canvas.height = ch;
                canvas.className = 'canvas';
                document.querySelector('section').appendChild(canvas);
                palette = new Palette(opacity,canvas);
                flag = true;
            }else{
                if(!flag){return;}
                palette[type]();
            }
        }
    })
    //工具
    shape.forEach(e => {
        let type = e.id;
        e.onclick = function(){
            shape.forEach(obj => obj.classList.remove('hop'));
            this.classList.add('hop');
            if(type == 'poly' || type == 'poly_J'){
                let num = prompt('请输入边数或角数');
                palette.draw(type,num);
                flag = true;
            }else if(type == 'pencil' || type == 'erase'){
                palette[type]();
            }else{
                if (!flag){return}
                palette.draw(type);
            }
        }
    })
    shape[0].onclick();
    //保存
    save.onclick = function () {
        let data = canvas.toDataURL('image/png');
        save.herf = data;
        save.download = '1.png';
    }
    stylebtn.forEach(element =>{
        element.onclick = function () {
            stylebtn.forEach(e =>{
                e.classList.remove('hop');
            })
            this.classList.add('hop');
            palette.style = this.id;
            //console.log(this.id)
        }
    })
    colorbtn.forEach(ele =>{
        ele.onchange = function () {
            palette[this.id] = this.value;
           // console.log(this.value);
        }
    })
    linewidth.onchange = function () {
        palette[this.id] = this.value;
        console.log(palette[this.id]);
    }
    fontbtn.onclick = function () {
        fontbtn.classList.add('hop')
        palette.font();
    }
    clipbtn.onclick = function () {
        palette.clip(clip);
    }
})