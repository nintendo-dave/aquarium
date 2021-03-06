//einfaches Setup für das Canvas
const canvas= document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 500;

let score = 0;
let gameFrame = 0;
ctx.font = '50px Georgia';

//Maus interaktiv einbinden
var canvasPosition = canvas.getBoundingClientRect();
const mouse = {
    x: canvas.width/2,
    y: canvas.height/2,
    click: false
}
canvas.addEventListener('mousedown', function(event){
    mouse.click = true;
    mouse.x = event.x - canvasPosition.left;
    mouse.y = event.y - canvasPosition.top;

});
canvas.addEventListener('mouseup',function(){
    mouse.click = false;
})

//Spieler 
class Player{
    constructor(){
        this.x = canvas.width;
        this.y = canvas.width/2;
        this.radius = 50;
        this.angle = 0;
        this.frameX = 0;
        this.frameY = 0;
        this.frame = 0;
        this.spriteWidth = 498;
        this.spriteHeight = 327;
    }
    update(){
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        if (mouse.x != this.x){
            this.x -= dx/10;
        }
        if(mouse.y != this.y){
            this.y -= dy/10;
        }
    }
    draw(){
        if(mouse.click){
            ctx.lineWidth = 0.2;
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
        
        }
        ctx.fillStyle = 'red';
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.radius,0,Math.PI * 2);
        ctx.fill();
        ctx.closePath();
    }
}
const player = new Player();

//Fische
const FischeArray = [];
class Fisch{
    constructor(){
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.radius = 50;
        this.speed = Math.random() * 5 + 1;
        this.distance;
    }
    update(){
        //+= bedeutet die Objekte bewegen sich nach rechts.
        this.x += this.speed;
        
    }

    updateLeft(){
        //-= bedeutet die Objekte bewegen sich nach links.
        this.x -= this.speed;
        
    }
    draw(){
        ctx.fillStyle = "blue";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
        ctx.stroke();


    }
}
function handleFische(){
    if (gameFrame % 100 == 0){
        FischeArray.push(new Fisch());

    }
    for(var i = 0; i < FischeArray.length; i++){
        FischeArray[i].update();
        FischeArray[i].draw();
    }
   
}



//Animation Loop
function animate(){
    ctx.clearRect(0,0,canvas.width, canvas.height);
    handleFische();
  
    player.update();
    player.draw();
    gameFrame++;
    requestAnimationFrame(animate);
}
animate();