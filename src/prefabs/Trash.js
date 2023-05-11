class Trash extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, velocity) {
        // call Phaser Physics Sprite constructor
        super(scene, game.config.width, game.config.height/2, 'trash'); 
        
        this.parentScene = scene;               // maintain scene context

        // set up physics sprite
        this.parentScene.add.existing(this);    // add to existing scene, displayList, updateList
        this.parentScene.physics.add.existing(this);    // add to physics system
        this.setVelocityX(velocity + 400);            // make it go!
        this.setImmovable(); 
        
        this.body.setSize(5,15);
        this.setDisplaySize(45,45);                  
        this.newTrash = true;                 // custom property to control barrier spawning
    }

    update() {
        // add new barrier when existing barrier hits center X
        if(this.newTrash && this.x < game.config.width/2) {
            // (recursively) call parent scene method from this context
            this.parentScene.addTrash(this.parent, this.velocity);
            this.newTrash = false;
        }

        // destroy paddle if it reaches the left edge of the screen
        if(this.x < -this.width) {
            this.destroy();
        }
    }
}