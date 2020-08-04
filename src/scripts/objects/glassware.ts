import { GameObjects } from "phaser";

export default abstract class Glassware extends Phaser.GameObjects.Sprite {
    glasstype: string;
    description: string;

    target: number; //should vary
    max: number;
    weight: number; //starting weight in g of glass without any water in it
    waterAmount: number = 0;    //how much water in ml (weight of water in g)
    waterImage: GameObjects.Sprite; 
    percentVariation: number; //how much scale should vary based on the type of glass and waterAmount 
    
    graphics: GameObjects.Graphics;
    mask: Phaser.Display.Masks.GeometryMask;
    maskHeightStart: number;
    maskShape;

    constructor(scene: Phaser.Scene, x: number, y: number, typeinput: string) {
        super(scene, x, y, typeinput); 
        this.setTintFill(0xCCC); //gradient [topLeft] [, topRight] [, bottomLeft] [, bottomRight]
        
        this.graphics = scene.add.graphics();
        
        this.waterImage = new GameObjects.Sprite(scene, x,y, typeinput+'Fill');
    }

    abstract addWater();
    abstract subtractWater();
    abstract updateMask();
    abstract setWater(amountOfWater: number);
    
    addMask(scene: Phaser.Scene, x, y, w, h){

        this.maskShape = this.graphics.fillRoundedRect(x-w/2, y-h/2, w , h, { tl: 0, tr: 0, bl: w/2, br: w/2 });
        this.maskShape.alpha = 0;

        this.mask = this.waterImage.createGeometryMask(this.graphics);
        this.mask.invertAlpha = true;
        this.maskHeightStart = this.maskShape.y * 1.5; //must be after invert
        this.waterImage.setMask(this.mask);
        this.clearMask(); //mask off of lineart for some reason

        scene.add.existing(this.waterImage);
        scene.add.existing(this);
    }

    

}

