class Jellyfish extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        this.frameName = texture;

        this.move = this.scene.add.sprite(this.x, this.y, this.jellyfish).setOrigin(0,0);
        this.move.play('move');

        this.moveSpeed = 1;
    }

    update() {
        // move up and down
      
            
        this.move.x = this.x;
        this.move.y = this.y; 
        this.move.on('animationcomplete', () => {this.move.anims.play('move')});
        
        // move spaceship left
        this.x -= this.moveSpeed;
        //wrap around from left edge to right edge
        if(this.x <= 0 - this.width) {
            this.x = game.config.width;
            this.y = Math.round(Math.random() * this.y);
        }
    }
}