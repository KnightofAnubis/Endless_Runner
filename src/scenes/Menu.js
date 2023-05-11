class Menu extends Phaser.Scene {
    constructor() {
        super('menuScene');
    }


    create() {
        //creating stoof
        //menu...
        let menuConfig = {
            fontFamily: "Georgia",
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
        this.add.text(game.config.width/2, game.config.height/3 - borderUISize - borderPadding, "For Light mode select <-", menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2.5 - borderUISize - borderPadding, "For Dark mode select ->", menuConfig).setOrigin(0.5);
        //define some keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

    }

    update() {
        //gettin' ready to play!
        if(Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            game.settings = {
                mode: true
            }
            this.scene.start('selectionScene');
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            game.settings = {
                mode: false
            }
            this.scene.start('selectionScene');
        }

    }
}