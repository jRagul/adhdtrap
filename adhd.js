canvas = document.querySelector('canvas')

canvas.width = window.innerWidth;
canvas.height = window.innerHeight

let c = canvas.getContext('2d')

let mouse ={
    x:undefined,
    y:undefined
}
let colorArray = [
    '#26547C',
    '#EF476F',
    '#FFD166',
    '#06D6A0',
    '#FCFCFC'
]
window.addEventListener('mousemove',function(event){
    mouse.x = event.x;
    mouse.y = event.y;
    
})

function Circle(x,y,dx,dy,radius){
    this.x = x;
    this.y = y
    this.dx = dx
    this.dy = dy
    this.radius = radius
    this.minRadius = radius
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)]
    this.draw = function(){
        c.beginPath()
        c.arc(this.x,this.y,this.radius,0,Math.PI * 2)
        c.strokeStyle = "white"
        c.fillStyle = this.color
        c.fill()
        c.stroke()
    }
    this.update = function(){
        if(this.x+this.radius > innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx
        }
        if(this.y+this.radius > innerHeight || this.y - this.radius < 0) {
            this.dy = -this.dy
        }
        this.x += this.dx
        this.y += this.dy

        if(mouse.x - this.x < 70 && mouse.x - this.x > - 70 && mouse.y - this.y < 70 && mouse.y - this.y > -70){
            if(this.radius < 100){
                this.radius += 6;
            }
        }
        else if(this.radius >this.minRadius){
            this.radius -= 1;
        }



        this.draw()
    }
}
let circle = new Circle(100,200,4,3,30)

let circleArr = []

function createCircle(size){
    for(i= 0;i<size;i++){
        let x  = Math.random() * (window.innerWidth - 60) +30
        let y = Math.random() * (window.innerHeight -60) + 30
        let dx = Math.random() - 0.5
        let dy = Math.random() - 0.5
        let radius = Math.random() * 6 + 1
        circleArr.push(new Circle(x,y,dx,dy,radius))
    }
}

createCircle(2000)

function animate(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    requestAnimationFrame(animate);
    c.clearRect(0,0,innerWidth,innerHeight)
    for(i=0;i<circleArr.length;i++){
        circleArr[i].update()
    }
}
animate()