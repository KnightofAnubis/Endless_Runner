class Jellyfish extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, velocity) {
        super(scene, game.config.width, game.config.height/2, 'jellyfish');
        this.parentScene = scene;
        this.parentScene.add.existing(this);    // add to existing scene, displayList, updateList
        this.parentScene.physics.add.existing(this);
        
        this.play('move');

        this.setVelocityX(velocity + 400);            // make it go!
        this.setImmovable();
        this.newJellyfish = true;
    }

    update() {
        
        this.on('animationcomplete', () => {this.anims.play('move')});
        
        
        if(this.newJellyfish && this.x < game.config.width/2) {
            // (recursively) call parent scene method from this context
            this.parentScene.addJelly(this.parent, this.velocity);
            this.newJellyfish = false;
        }

        
        if(this.x < -this.width) {
            this.destroy();
        }
    }
    
}