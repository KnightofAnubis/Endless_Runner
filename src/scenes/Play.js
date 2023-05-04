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
        );
        this.load.aseprite(
            'jellyfish',
            'assets/jellyfish.png',
            'assets/jellyfish.json'
        );
    }

    create() {
        //creating some stuff
        this.backdrop = this.add.tileSprite(0, 0,640, 480, 'backdrop').setOrigin(0,0);
       
        
         //animation
       
        this.anims.createFromAseprite(this.selectedCharacter);
        this.anims.createFromAseprite('jellyfish');


        this.jellyfish01 = new Jellyfish(this, 0, Phaser.Math.Between(0, this.game.config.height), 'jellyfish');
        this.jellyfish02 = new Jellyfish(this, 0, Phaser.Math.Between(0, this.game.config.height), 'jellyfish');
        this.jellyfish03 = new Jellyfish(this, 0, Phaser.Math.Between(0, this.game.config.height), 'jellyfish');

        //add character
        this.character = new Character(this, game.config.width/4, game.config.height/2, this.selectedCharacter).setOrigin(0.5, 0);
        
        
        
        

        //UI stuff
        //white border cause I liked it
        this.add.rectangle(0, 0, game.config.width, borderUISize/2, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - borderUISize/2, game.config.width, borderUISize/2, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUISize/2, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize/2, 0, borderUISize/2, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        //some keys
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);

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
            fixedWidth: 100
        }
    
        //new initialize score
        this.p2Score = 0;
        this.scoreRight = this.add.text(game.config.width/9, game.config.height/5 - borderUISize - borderPadding, this.p2Score, scoreConfig).setOrigin(0.5);

        
        
        
        //Background music
        this.sound.audioPlayDelay = 0.1;
        this.sound.loopEndOffset = 0.05;
        
        const loopMarker = {
            name: 'loop',
            start: 0,
            duration: 16,
            config: {
                volume: 0.1,
                loop: true
            }
        };

        this.music =  this.sound.add('background_music');
        
        
        if (!this.sound.locked)
        {
            // already unlocked so play
            this.music.addMarker(loopMarker);
            this.music.play('loop', {
                delay: 0
            });
        }
        else
        {
            // wait for 'unlocked' to fire and then play
            this.sound.once(Phaser.Sound.Events.UNLOCKED, () => {
                this.music.addMarker(loopMarker);
                this.music.play('loop', {
                    delay: 0
                });
            });
        }
        
        this.hintAdvice();
        
    }

    update() {
        //here we go...
        //check key input for restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }
        //moving background
        this.backdrop.tilePositionX += 0.5;


        if (!this.gameOver){
            //game over if player hits too many thinks
            /*if(skndjn){
                this.music.pause();
                this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', menuConfig).setOrigin(0.5);
                this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or <- for Menu', menuConfig).setOrigin(0.5);
                this.gameOver = true;
            }*/
        
        
            //character
            this.character.update();
            //jellyfish
            this.jellyfish01.update();
            this.jellyfish02.update();
            this.jellyfish03.update();
        }
    }


    hintAdvice() {
    
       //need array of different phrases to cycle through
       this.hints = ["Don't hit the jelly fish!", "Collect fish for points!", "Don't get caught up in the trash!", "Avoid boats!", "Don't bump into the rocks!"];
       
        menuConfig.fontSize = 20;
        //text
        this.hintText = this.add.text(game.config.width/2, game.config.height/5 - borderUISize - borderPadding, "Player Hints", menuConfig).setOrigin(0.5);
        //need array of different phrases to cycle through
        
        this.clock = this.time.delayedCall(5000, () => {
            this.index = Math.round(Math.random() * this.hints.length); 
            console.log(this.index); 
            this.displayHint = this.hints[this.index];
            this.hintText.setText(this.displayHint); 
            
        }, null, this);
        
        
    }

}