//Fisch-Arrays für jede Ebene
let z0 = [];
let z1 = [];
let z2 = [];
let z3 = [];


//Szenerie-Variabeln
class Layer{
    constructor(imgSprite, contentArray){
        this.contentArray = contentArray;
        this.imgSprite = imgSprite;
    }
}

//Liste mit Fischbilder
let fishImgSprites = [];

//Liste mit Haibilder
let sharkImgSprites = [];

//Liste mit Szenerie-Layers
let layers = [];
layers.push(new Layer(null, z0));
layers.push(new Layer(null, z1));
layers.push(new Layer(null, z2));
layers.push(new Layer(null, z3));

let countImg = 0;

//Event beim laden des Dokuments
window.onload = (event) => {
    preloadImages(ctx);
}

function preloadImages(ctx){

    //Fischbilder laden
    for(let i=1; i<6; i++){
        let img = new Image();
        img.src = 'img/fish/'+ i +'.png';
        fishImgSprites.push(img);
    }
    console.log('All fish images are loaded');
    
    //Haibilder laden
    sharkImgSprites[0] = new Image();
    sharkImgSprites[0].src = 'img/shark/biting.png';
    sharkImgSprites[1] = new Image();
    sharkImgSprites[1].src = 'img/shark/normal.png';
    console.log('All shark images are loaded');


    //Durch jedes Layer-Array iterieren und Bild hinzufügen
    for(let i=0; i<layers.length; i++){
        let img = new Image();

        //Beim laden checken, ob es das letzte Bild ist
        img.onload = function(){
            if(++countImg == layers.length){
                //Wenn alle Szenerie-Bilder geladen sind, werden sie gezeichnet
                console.log('All scenery images are loaded');
                drawScenery(layers, ctx);
            }
        }
        img.src = 'img/z'+ i +'.png';
        layers[i].imgSprite = img;
    }

}

//Funktion, die die Szenerie vom Hintergrund aus in Richtung Vordergrund zeichnet
function drawScenery(layers, ctx){
    layers.forEach(layer => {
        ctx.drawImage(layer.imgSprite, 0, 0);
    });
}