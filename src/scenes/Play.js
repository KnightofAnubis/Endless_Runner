class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        //loading some sprites 

    }

    create() {
        //creating some stuff

        //UI stuff
        //white border cause I liked it
        this.add.rectangle(0, 0, game.config.width, borderUISize/2, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - borderUISize/2, game.config.width, borderUISize/2, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUISize/2, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize/2, 0, borderUISize/2, game.config.height, 0xFFFFFF).setOrigin(0, 0);

        //add character
        this.character = new Character(this, game.config.width/1, game.config.height/2, '').setOrigin(0.5, 0);
        

    }

    update() {
        //here we go...

    }
}