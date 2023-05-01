class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        //loading some sounds... cause it takes time

    }

    create() {
        //creating stoof
        //menu...
        let menuConfig = {
            fontFamily: "Courier",
            fontSize: '28px',
            backgroundColor: '#008080',
            color: '#00000',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        //soome text instructions
        this.add.text(game.config.width/2, game.config.height/5 - borderUISize - borderPadding, "This is a place holder text", menuConfig).setOrigin(0.5);


    }

    updata() {
        //gettin' ready to play!
        this.scene.start('playScene');
    }
}