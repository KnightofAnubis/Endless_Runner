class Play extends Phaser.Scene {
    constructor() {
        super('playScene');
    }

    init(data) {
        this.selectedCharacter = data.character;
    }

    preload() {
        //loading some sprites 
        this.load.aseprite(
            this.selectedCharacter,
            `assets/${this.selectedCharacter}.png`,
            `assets/${this.selectedCharacter}.json`
        );
       
    }

    create() {
        // reset parameters
        this.rockSpeed = -450;
        this.rockSpeedMax = -1000;
        level = 0;
        this.jellySpeed = -450;
        this.jellySpeedMax = -1000;

        this.physics.world.setBounds(0, 0, 640, 480);
        //creating some stuff
        this.backdrop = this.add.tileSprite(0, 0,640, 480, 'backdrop').setOrigin(0,0);
       
        
         //animation
       
        this.anims.createFromAseprite(this.selectedCharacter);
        this.anims.createFromAseprite('jellyfish');


       this.jellyGroup = this.add.group({
            runChildUpdate: true
       });
         // wait a few seconds before spawning jelly (same as rocks)
        this.time.delayedCall(2500, () => { 
            this.addJelly(); 
        });
        
        //add character
        this.character = new Character(this, game.config.width/4, game.config.height/2, this.selectedCharacter).setOrigin(0.5, 0);
        this.character.body.setSize(60,30);
        this.character.body.setOffset(5,-11);
        this.character.body.setImmovable();
        this.character.body.setCollideWorldBounds(true);
        
         // set up rock group
         this.rockGroup = this.add.group({
            runChildUpdate: true    // make sure update runs on group children
        });
        // wait a few seconds before spawning barriers
        this.time.delayedCall(2500, () => { 
            this.addRock(); 
        });

        // set up difficulty timer (triggers callback every second)
        this.difficultyTimer = this.time.addEvent({
            delay: 1000,
            callback: this.levelBump,
            callbackScope: this,
            loop: true
        });

        
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
        this.score = 0;
        this.scoreRight = this.add.text(game.config.width/9, game.config.height/5 - borderUISize - borderPadding, this.score, scoreConfig).setOrigin(0.5);

        
        
        
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
    // create new rock and add them to existing barrier group
    addRock() {
        let speedVariance =  Phaser.Math.Between(0, 50);
        let rock = new Rock(this, this.rockSpeed - speedVariance);
        this.rockGroup.add(rock);
    }
    // create new rock and add them to existing barrier group
    addJelly() {
        let speedVariance =  Phaser.Math.Between(0, 50);
        let jelly = new Jellyfish(this, this.jellySpeed - speedVariance).setRandomPosition(680, 0 ,0, 300);
        this.jellyGroup.add(jelly);
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

            // check for collisions
            this.physics.world.collide(this.character, this.jellyGroup, this.characterCollision, null, this);
            this.physics.world.collide(this.character, this.rockGroup, this.characterCollision, null, this);
            
        }
    }


    hintAdvice() {
    
       //need array of different phrases to cycle through
       this.hints = ["Don't hit the jelly fish!", "Collect fish for points!", "Don't get caught up in the trash!", "Avoid boats!", "Don't bump into the rocks!"];
       
        menuConfig.fontSize = 20;
        //text
        this.hintText = this.add.text(game.config.width/2, game.config.height/5 - borderUISize - borderPadding, "Use the up and down arrows to move.", menuConfig).setOrigin(0.5);
        //need array of different phrases to cycle through
        
        this.clock = this.time.delayedCall(5000, () => {
            this.index = Math.round(Math.random() * this.hints.length); 
            console.log(this.index); 
            this.displayHint = this.hints[this.index];
            this.hintText.setText(this.displayHint); 
            
        }, null, this);
        
        
    }

    characterCollision(){
        this.cameras.main.shake(500, 0.0025);
        this.character.reset();
    }
    levelBump() {
        // increment level (ie, score)
        level++;

        // bump speed every 5 levels (until max is hit)
        if(level % 5 == 0) {
            //console.log(`level: ${level}, speed: ${this.barrierSpeed}`);
            //this.sound.play('clang', { volume: 0.5 });         // play clang to signal speed up
            if(this.rockSpeed >= this.rockSpeedMax) {     // increase barrier speed
                this.rockSpeed -= 10;

            }
            if(this.jellySpeed >= this.jellySpeedMax) {     // increase barrier speed
                this.jellySpeed -= 10;

            }
        }  
     }

}