class Play extends Phaser.Scene {
    constructor() {
        super('playScene');
    }

    init(data) {
        this.selectedCharacter = data.character;
    }

    preload() {
        //loading some sprites 
        this.load.image('backdrop', 'assets/background.png');
        this.load.aseprite(
            this.selectedCharacter,
            `assets/${this.selectedCharacter}.png`,
            `assets/${this.selectedCharacter}.json`
        )
    }

    create() {
        //creating some stuff
        this.backdrop = this.add.tileSprite(0, 0,640, 480, 'backdrop').setOrigin(0,0);
        //UI stuff
        //white border cause I liked it
        this.add.rectangle(0, 0, game.config.width, borderUISize/2, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - borderUISize/2, game.config.width, borderUISize/2, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUISize/2, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize/2, 0, borderUISize/2, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        
         //animation
       
        this.anims.createFromAseprite(this.selectedCharacter);

        //const sprite = this.add.sprite(500, 300).play({ key: 'Magnum Break', repeat: -1 }).setScale(6);
        //add character
        this.character = new Character(this, game.config.width/4, game.config.height/2, this.selectedCharacter).setOrigin(0.5, 0);
        
       

       
        //some keys
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);

        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#000080',
            color: '#00ffff',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        //text
        this.add.text(game.config.width/2, game.config.height/5 - borderUISize - borderPadding, "This is a place holder text", scoreConfig).setOrigin(0.5);

        

    }

    update() {
        //here we go...
        this.backdrop.tilePositionX += 0.5;

        //character
        this.character.update();
    }
}