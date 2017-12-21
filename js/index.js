window.addEventListener('load',function () {
    let canvas = document.querySelector('canvas');
    let ctx = canvas.getContext('2d');
    let shape = document.querySelectorAll('header>ul>li');
    let palette = new Palette(canvas);
    let mask = document.querySelector('.mask');
    console.log(mask);
    shape.forEach(ele => {
        let type = ele.id;
        ele.onclick = function () {
            shape.forEach(obj=>{
                obj.classList.remove('hop');
            })
            ele.classList.add('hop');
            palette[type]();
        }
    })
})