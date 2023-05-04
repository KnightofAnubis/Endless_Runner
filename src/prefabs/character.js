class Character extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
            this.frameName = texture;

            //add object to existing scene
            //scene.add.existing(this);
            this.swim = this.scene.add.sprite(this.x, this.y, this.character).setOrigin(0,0);
            this.swim.play('Swim');
            
            
            this.moveSpeed = 1;
            
            
    }

    update() {
        
        if(keyUP.isDown){
            this.y -= this.moveSpeed; 
            this.swim.x = this.x;
            this.swim.y = this.y; 
            this.swim.on('animationcomplete', () => {this.swim.anims.play('Swim')});
        
        }
        if(keyDOWN.isDown){
            this.y += this.moveSpeed; 
            this.swim.x = this.x;
            this.swim.y = this.y; 
            this.swim.on('animationcomplete', () => {this.swim.anims.play('Swim')});
        
        } else {
            this.swim.on('animationcomplete', () => {this.swim.anims.play('Swim')});
        }
    }

    reset() {
        //what happens when the player dies?
    }
}