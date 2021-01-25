//Canvas-Variabeln
let canvas = document.getElementById('mCanvas');
let ctx = canvas.getContext("2d");
//Szenerie-Variabeln
//Die hintersten sind links
let sceneryNames = ['bg', 'z1', 'z2', 'z3'];
let imgs = [];
let countImg = 0;

//Event beim laden des Dokuments
window.onload = (event) => {
    preloadImages(ctx);
}

function preloadImages(ctx){
    //Durch jedes Szenerie-Objekt iterieren
    for(let i=0; i<sceneryNames.length; i++){
        let img = new Image();
        imgs.push(img);

        //Beim laden checken, ob es das letzte Bild ist
        img.onload = function(){
            if(++countImg>= imgs.length){
                //Wenn alle Bilder geladen sind, werden sie gezeichnet
                console.log('All scenery images are loaded');
                drawScenery(imgs, ctx);
            }
        }
        img.src = 'img/'+ sceneryNames[i] +'.png';
    }
    //TEMPORÄR: HAI ANZEIGEN
    let sharkTest = new Image();
    sharkTest.onload = function(){
        ctx.drawImage(sharkTest, 700, 800);
    }
    sharkTest.src = 'img/shark/shark_normal.png';
}


//Funktion, die die Szenerie vom Hintergrund aus richtung Vordergrung zeichnet
function drawScenery(imgs, ctx){
    imgs.forEach(img => {
        ctx.drawImage(img, 0, 0);
    });
}