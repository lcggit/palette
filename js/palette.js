/*
* 画线：鼠标事件<down、move、up>
*     起始位置，结束位置
*
* */
class Palette{
    constructor(canvas,mask){
        this.canvas = canvas;//引入画布
        //console.log(canvas);
        this.ctx = canvas.getContext('2d');
        this.cw = this.canvas.width;
        this.ch = this.canvas.height;
        this.history = [];
        this.mask = mask;
        console.log(mask);
    }
    //直线
    line(){
        let that = this;//当方法里面套用一个函数时，this的指向会发生改变
        that.canvas.onmousedown = function (e) {
            let ox = e.offsetX,oy = e.offsetY;
            that.canvas.onmousemove = function (e) {
                that.ctx.clearRect(0,0,that.cw,that.ch);
                let mx = e.offsetX,my = e.offsetY;
                if(that.history.length){
                    that.ctx.putImageData(that.history[that.history.length-1],0,0)//必须传有3个参数变量
                }
                that.ctx.beginPath();
                that.ctx.moveTo(ox,oy);
                that.ctx.lineTo(mx,my);
                that.ctx.stroke();
            }
            that.canvas.onmouseup = function () {
                that.history.push(that.ctx.getImageData(0,0,that.cw,that.ch));
                that.canvas.onmousemove = null;
                that.canvas.onmouseup = null;
            }
        }
    }
    //铅笔
    pencil(){
        let that = this;//当方法里面套用一个函数时，this的指向会发生改变
        console.log(that);
        that.canvas.onmousedown = function (e) {
            let ox = e.offsetX,oy = e.offsetY;
            console.log(1);
            that.ctx.beginPath();
            that.ctx.moveTo(ox,oy);
            that.canvas.onmousemove = function (e) {
                that.ctx.clearRect(0,0,that.cw,that.ch);
                let mx = e.offsetX,my = e.offsetY;
                if(that.history.length){
                    that.ctx.putImageData(that.history[that.history.length-1],0,0)//必须传有3个参数变量
                }


                that.ctx.lineTo(mx,my);
                that.ctx.stroke();
            }
            that.canvas.onmouseup = function () {
                that.history.push(that.ctx.getImageData(0,0,that.cw,that.ch));
                that.canvas.onmousemove = null;
                that.canvas.onmouseup = null;
            }
        }
    }
    //圆
    circle(){
        let that = this;//当方法里面套用一个函数时，this的指向会发生改变
        console.log(that);
        that.canvas.onmousedown = function (e) {
            let ox = e.offsetX,oy = e.offsetY;
            that.ctx.moveTo(ox,oy);
            that.canvas.onmousemove = function (e) {
                that.ctx.clearRect(0,0,that.cw,that.ch);
                let mx = e.offsetX,my = e.offsetY;
                let r = Math.sqrt(Math.pow(ox-mx,2)+Math.pow(oy-my,2));
                console.log(r);
                if(that.history.length){
                    that.ctx.putImageData(that.history[that.history.length-1],0,0)//必须传有3个参数变量
                }

                that.ctx.beginPath();
                that.ctx.arc(ox,oy,r,0,Math.PI*2)
                that.ctx.stroke();
            }
            that.canvas.onmouseup = function () {
                that.history.push(that.ctx.getImageData(0,0,that.cw,that.ch));
                that.canvas.onmousemove = null;
                that.canvas.onmouseup = null;
            }
        }
    }
    //矩形
    rec(){
        let that = this;//当方法里面套用一个函数时，this的指向会发生改变
        that.canvas.onmousedown = function (e) {
            let ox = e.offsetX,oy = e.offsetY;
            that.canvas.onmousemove = function (e) {
                that.ctx.clearRect(0,0,that.cw,that.ch);
                let mx = e.offsetX,my = e.offsetY;
                if(that.history.length){
                    that.ctx.putImageData(that.history[that.history.length-1],0,0)//必须传有3个参数变量
                }
                that.ctx.beginPath();
                that.ctx.moveTo(ox,oy);
                that.ctx.lineTo(mx,oy);
                that.ctx.lineTo(mx,my);
                that.ctx.lineTo(ox,my);
                that.ctx.lineTo(ox,oy);
                that.ctx.stroke();
            }
            that.canvas.onmouseup = function () {
                that.history.push(that.ctx.getImageData(0,0,that.cw,that.ch));
                that.canvas.onmousemove = null;
                that.canvas.onmouseup = null;
            }
        }
    }
    //多边形
    poly(num = 6) {
        let that = this;//当方法里面套用一个函数时，this的指向会发生改变
        console.log(that);
        that.canvas.onmousedown = function (e) {
            let ox = e.offsetX,oy = e.offsetY;
            that.canvas.onmousemove = function (e) {
                that.ctx.clearRect(0,0,that.cw,that.ch);
                let mx = e.offsetX,my = e.offsetY;
                let r = Math.sqrt(Math.pow(ox-mx,2)+Math.pow(oy-my,2));
                console.log(r);
                if(that.history.length){
                    that.ctx.putImageData(that.history[that.history.length-1],0,0)//必须传有3个参数变量
                }

                let ang = 2*Math.PI/num;
                that.ctx.beginPath();
                that.ctx.moveTo(ox+r,oy);
                for(let i = 0; i < num;i++){
                    let x = ox+r*Math.cos(ang*i),
                        y = oy+r*Math.sin(ang*i);
                    that.ctx.lineTo(x,y);
                }
                that.ctx.closePath()
                that.ctx.stroke();
            }
            that.canvas.onmouseup = function () {
                that.history.push(that.ctx.getImageData(0,0,that.cw,that.ch));
                that.canvas.onmousemove = null;
                that.canvas.onmouseup = null;
            }
        }
    }
    //多角形
    poly_J(num = 6){
        let that = this;//当方法里面套用一个函数时，this的指向会发生改变
        that.canvas.onmousedown = function (e) {
            let ox = e.offsetX,oy = e.offsetY;
            that.canvas.onmousemove = function (e) {
                that.ctx.clearRect(0,0,that.cw,that.ch);
                let mx = e.offsetX,my = e.offsetY;
                let r = Math.sqrt(Math.pow(ox-mx,2)+Math.pow(oy-my,2));
                if(that.history.length){
                    that.ctx.putImageData(that.history[that.history.length-1],0,0)//必须传有3个参数变量
                }
                let r1 = r/3,ang = Math.PI/num;
                that.ctx.beginPath();
                for(let i = 0; i < 2*num; i++){
                    let x,y;
                    if(i % 2 == 0){
                        x = mx + r*Math.cos(i*ang);
                        y = my + r*Math.sin(i*ang);
                    }else {
                        x = mx + r1*Math.cos(i*ang);
                        y = my + r1*Math.sin(i*ang);
                    }
                    that.ctx.lineTo(x,y);
                }
                that.ctx.closePath()
                that.ctx.stroke();
            }
            that.canvas.onmouseup = function () {
                that.history.push(that.ctx.getImageData(0,0,that.cw,that.ch));
                that.canvas.onmousemove = null;
                that.canvas.onmouseup = null;
            }
        }
    }
    //橡皮擦
    erase(){

    }
}