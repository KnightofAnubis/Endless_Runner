class Fish extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, velocity) {
        // call Phaser Physics Sprite constructor
        super(scene, game.config.width, game.config.height/2, 'fish'); 
        
        this.parentScene = scene;               // maintain scene context

        // set up physics sprite
        this.parentScene.add.existing(this);    // add to existing scene, displayList, updateList
        this.parentScene.physics.add.existing(this);    // add to physics system
        this.setVelocityX(velocity + 400);            // make it go!
        this.setImmovable();
        
        this.setSize(20,20);
        this.setDisplaySize(40,40);
        this.newFish = true;                 // custom property to control barrier spawning
    }

    update() {
        // add new barrier when existing barrier hits center X
        if(this.newFish && this.x < game.config.width/4) {
            // (recursively) call parent scene method from this context
            this.parentScene.addFish(this.parent, this.velocity);
            this.newFish = false;
        }

        // destroy paddle if it reaches the left edge of the screen
        if(this.x < -this.width) {
            this.destroy();
        }
    }

}