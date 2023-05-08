class Jellyfish extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, velocity) {
        super(scene, game.config.width, game.config.height/2, 'jellyfish');
        this.parentScene = scene;
        this.move = this.parentScene.add.sprite(this.x, this.y, 'jellyfish').setOrigin(0.5);
        this.parentScene.physics.add.existing(this);    // add to physics system
        
        
        this.move.play('move');

        this.setVelocityX(velocity + 400);            // make it go!
        this.setImmovable();
        this.newJellyfish = true;
    }

    update() {
        // move up and down
        this.move.x = this.x;
        this.move.y = this.y; 
        this.move.on('animationcomplete', () => {this.move.anims.play('move')});
        
        // add new barrier when existing barrier hits center X
        if(this.newJellyfish && this.x < game.config.width/2) {
            // (recursively) call parent scene method from this context
            this.parentScene.addJelly(this.parent, this.velocity);
            this.newJellyfish = false;
        }

        // destroy paddle if it reaches the left edge of the screen
        if(this.x < -this.width) {
            this.destroy();
        }
    }
    
}