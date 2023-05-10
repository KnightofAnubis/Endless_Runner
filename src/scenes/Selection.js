//might be out of scope...

class Selection extends Phaser.Scene {
    constructor() {
        super('selectionScene');
    }
   

    create() {
        //selection
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
        //instructions
        this.add.text(game.config.width/2, game.config.height/5 - borderUISize - borderPadding, "Select the avatar you want to use.", menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/3 - borderUISize - borderPadding, "Use the <- and -> arrows to select.", menuConfig).setOrigin(0.5);
        
        this.shark = this.add.image(game.config.width/5, game.config.height/2, 'shark').setOrigin(0.5, 0);
        this.shark.setDisplaySize(200,100);
        this.manta = this.add.image(game.config.width/1.5, game.config.height/2, 'manta').setOrigin(0.5, 0);
        this.manta.setDisplaySize(200,100);
        
        //define some keys
        this.input.keyboard.once('keydown-SPACE', this.handleContinue, this);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
 
    }
    update() {
        //shark
        if(Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.selectedKey = 'shark';
            this.add.text(game.config.width/2, game.config.height - borderUISize - borderPadding, "Press SPACE to continue...", menuConfig).setOrigin(0.5);
        }
        //manta
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            this.selectedKey = 'manta';
            this.add.text(game.config.width/2, game.config.height - borderUISize - borderPadding, "Press SPACE to continue...", menuConfig).setOrigin(0.5);
        }
    }

    handleContinue() {
        if(game.settings.mode){
            this.scene.start('playScene', {character: this.selectedKey});
        }
        if(!game.settings.mode){
            this.scene.start('darkmodeScene', {character: this.selectedKey});
        }
    }
}