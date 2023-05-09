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
        this.fishSpeed = -450;
        this.fishSpeedMax = -800;
        this.trashSpeed = -450;
        this.trashSpeedMax = -700;
        

        this.physics.world.setBounds(0, 0, 640, 480);
        //creating some stuff
        this.backdrop = this.add.tileSprite(0, 0,640, 480, 'backdrop').setOrigin(0,0);
       
        //need array of different phrases to cycle through
        this.hints = ["Don't hit the jelly fish!", "Collect fish for points!", "Don't get caught up in the trash!", "Avoid boats!", "Don't bump into the rocks!"];
        menuConfig.fontSize = 20;
        //text
        this.hintText = this.add.text(game.config.width/2, game.config.height/5 - borderUISize - borderPadding, "Use the up and down arrows to move.", menuConfig).setOrigin(0.5);
        //need array of different phrases to cycle through
        
        this.time.delayedCall(5000, () => {
            this.displayHint = this.hints[0];
            this.hintText.setText(this.displayHint); 
        });
        this.time.delayedCall(35000, () => { 
            this.displayHint = this.hints[1];
            this.hintText.setText(this.displayHint); 
        });
        this.time.delayedCall(55000, () => {
            this.displayHint = this.hints[2];
            this.hintText.setText(this.displayHint); 
        });
        this.time.delayedCall(70000, () => {
            this.displayHint = this.hints[3];
            this.hintText.setText(this.displayHint); 
        });
        this.time.delayedCall(105000, () => {
            this.displayHint = this.hints[4];
            this.hintText.setText(this.displayHint); 
        });
           
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
        
        //fishes
        this.fishGroup = this.add.group({
            runChildUpdate: true
        });
        this.time.delayedCall(2500, () => {
            this.addFish();
        });

        //trash
        this.trashGroup = this.add.group({
            runChildUpdate: true
        });
        this.time.delayedCall(4500, () => {
            this.addTrash();
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
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
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
            fixedWidth: 80
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
        
        
        //end condition
        this.collided = false;
        
        
    }
    // create new rock and add them to existing barrier group
    addRock() {
        let speedVariance =  Phaser.Math.Between(0, 50);
        let rock = new Rock(this, this.rockSpeed - speedVariance);
        this.rockGroup.add(rock);
    }
    // create new jelly and add them to existing jelly group: I really like this method!
    addJelly() {
        let speedVariance =  Phaser.Math.Between(0, 50);
        let jelly = new Jellyfish(this, this.jellySpeed - speedVariance).setRandomPosition(680, 0 ,0, 400);
        this.jellyGroup.add(jelly);
    }
    //creating soome fishes
    addFish() {
        let speedVariance =  Phaser.Math.Between(0, 50);
        let fish = new Fish(this, this.fishSpeed - speedVariance).setRandomPosition(680, 0 ,0, 400);
        this.fishGroup.add(fish);
    }
    //adding trash...
    addTrash() {
        let speedVariance =  Phaser.Math.Between(0, 50);
        let trash = new Trash(this, this.trashSpeed - speedVariance).setRandomPosition(680, 0 ,0, 400);
        this.trashGroup.add(trash);
    }

    update() {
        //here we go...
        //check key input for restart
       


        //moving background
        this.backdrop.tilePositionX += 0.5;


        if (!this.gameOver){
            
                
            
            //character
            this.character.update();

            // check for collisions
            this.physics.world.collide(this.character, this.jellyGroup, this.characterCollision, null, this);
            this.physics.world.collide(this.character, this.rockGroup, this.characterCollision, null, this);
            this.physics.world.collide(this.character, this.fishGroup, this.fishCollision, null, this);
            this.physics.world.collide(this.character, this.trashGroup, this.trashCollision, null, this);
            
        }
    }



    //collison that causes harm
    characterCollision(){
        this.cameras.main.shake(500, 0.0025);
        this.music.pause();
        this.scene.start('menuScene');
    }
    //collision with fish(eating them)
    fishCollision(){
        this.fishGroup.clear(true, true);
        this.addFish();
        this.score += 1;
        this.scoreRight.text = this.score;
    }
    //collision for trash(cause it also disappears like fish, because it is SADLY being eaten as well)
    trashCollision(){
        this.trashGroup.clear(true, true);
        this.addTrash();
        if(this.score > 0){
            this.score -= 1;
            this.scoreRight.text = this.score;
        }
    }

    //Use randomness to generate escalating challenge, e.g. terrain, pickups, etc. (5)
    levelBump() {
        // increment level (ie, score)
        level++;

        // bump speed every 5 levels (until max is hit)
        if(level % 5 == 0) {
            //this.sound.play('clang', { volume: 0.5 });         // play clang to signal speed up
            if(this.rockSpeed >= this.rockSpeedMax) {     // increase barrier speed
                this.rockSpeed -= 10;

            }
            if(this.jellySpeed >= this.jellySpeedMax) {     // increase jelly speed
                this.jellySpeed -= 10;

            }
            if(this.fishSpeed >= this.fishSpeedMax) {     // increase fish speed
                this.fishSpeed -= 5;

            }
            if(this.trashSpeed >= this.trashSpeedMax) {     // increase trash speed
                this.trashSpeed -= 5;

            }
        }  
     }

}