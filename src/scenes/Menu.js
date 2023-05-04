class Menu extends Phaser.Scene {
    constructor() {
        super('menuScene');
    }

    preload() {
        //loading some sounds... cause it takes time
        this.load.audio('background_music', 'assets/ocean.wav');
    }

    create() {
        //creating stoof
        //menu...
        let menuConfig = {
            fontFamily: "Courier",
            fontSize: '28px',
            //backgroundColor: '#008080',
            color: '#008080',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        //soome text instructions
        this.add.text(game.config.width/2, game.config.height/5 - borderUISize - borderPadding, "Endless Swimmer", menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/3 - borderUISize - borderPadding, "For easy mode select <-", menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2.5 - borderUISize - borderPadding, "For hard mode select ->", menuConfig).setOrigin(0.5);
        //define some keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

    }

    update() {
        //gettin' ready to play!
        if(Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start('selectionScene');
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            this.scene.start('selectionScene');
        }

    }
}