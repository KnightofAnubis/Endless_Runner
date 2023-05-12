class Darkmode extends Phaser.Scene
{
	constructor()
	{
		super('darkmodeScene');
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

	create()
	{
		//  Enable lights and set a dark ambient color
        this.lights.enable().setAmbientColor(0x333333);

        //  Add an image and set it to use Lights2D
        this.backdrop = this.add.tileSprite(0, 0,640, 480, 'darkbackdrop').setOrigin(0,0);
        this.backdrop.setPipeline('Light2D');

        //  Our spotlight. 100px radius and white in color.
        this.light = this.lights.addLight(game.config.width/4, game.config.height/2, 100).setColor(0xffffff).setIntensity(2);



    
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
        
        //load animations
        this.addAnimation();

       

        //jelly group
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

         //add character
        this.character = new Character(this, game.config.width/4, game.config.height/2, this.selectedCharacter).setOrigin(0.5, 0);
        this.character.body.setSize(60,25);
        this.character.body.setOffset(5,-11);
        this.character.body.setImmovable();
        this.character.body.setCollideWorldBounds(true);
        //some keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);

        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: 'teal',
            color: 'white',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 80
        }
    
        //new initialize score
        score = 0;
        this.scoreRight = this.add.text(game.config.width/9, game.config.height/5 - borderUISize - borderPadding, score, scoreConfig).setOrigin(0.5);

        //need array of different phrases to cycle through
        this.hints = ["Collect fish for points!", "Don't hit the jelly fish!", "Don't get caught up in the trash!", "Don't bump into the rocks!"];
        menuConfig.fontSize = 20;
        menuConfig.color = "white";
        //text
        this.hintText = this.add.text(game.config.width/2, game.config.height/5 - borderUISize - borderPadding, "Use the up and down arrows to move.", menuConfig).setOrigin(0.5);
        
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
         //three lives
         this.lives = [];
         this.lifeOutlines = [];
         this.maxlife = 3;
         this.lifeCount = this.maxlife;
         var life01line = this.add.sprite(game.config.width/9 * (0/2) , game.config.height/3.8 - borderUISize - borderPadding, this.selectedCharacter).setOrigin(-0.5).setScale(0.5).setTint(0x333333),
             life02line = this.add.sprite(game.config.width/9 * (1/2) , game.config.height/3.8 - borderUISize - borderPadding, this.selectedCharacter).setOrigin(-0.5).setScale(0.5).setTint(0x333333),
             life03line = this.add.sprite(game.config.width/9 * (2/2) , game.config.height/3.8 - borderUISize - borderPadding, this.selectedCharacter).setOrigin(-0.5).setScale(0.5).setTint(0x333333);
         this.lifeOutlines = [life01line, life02line, life03line];
 
         var life01 = this.add.sprite(game.config.width/9 * (0/2) , game.config.height/3.8 - borderUISize - borderPadding, this.selectedCharacter).setOrigin(-0.5).setScale(0.5),
             life02 = this.add.sprite(game.config.width/9 * (1/2) , game.config.height/3.8 - borderUISize - borderPadding, this.selectedCharacter).setOrigin(-0.5).setScale(0.5),
             life03 = this.add.sprite(game.config.width/9 * (2/2) , game.config.height/3.8 - borderUISize - borderPadding, this.selectedCharacter).setOrigin(-0.5).setScale(0.5);
         this.lives = [life01, life02, life03];
        
        //end condition
        this.collided = false;
        this.gameOver = false;
        
    }
    addAnimation(){
        //animation
        this.anims.remove('Swim');
        this.anims.remove('move');
        this.anims.createFromAseprite(this.selectedCharacter);
        this.anims.createFromAseprite('jellyfish');
    }
    // create new rock and add them to existing barrier group
    addRock() {
        let speedVariance =  Phaser.Math.Between(0, 50);
        let rock = new Rock(this, this.rockSpeed - speedVariance).setPipeline('Light2D');
   
        this.rockGroup.add(rock);
    }
    // create new jelly and add them to existing jelly group: I really like this method!
    addJelly() {
        let speedVariance =  Phaser.Math.Between(0, 50);
        let jelly = new Jellyfish(this, this.jellySpeed - speedVariance).setRandomPosition(680, 100 ,0, 300).setPipeline('Light2D');
        this.jellyGroup.add(jelly);
    }
    //creating soome fishes
    addFish() {
        let speedVariance =  Phaser.Math.Between(0, 50);
        let select = ['fish', 'blueFish', 'yellowFish'];
        let fishSelect = Math.round(Math.random() * select.length);
        var chosenFish = select[fishSelect];
        if (!chosenFish) {
            chosenFish = "fish";
        }
        let fish = new Fish(this, this.fishSpeed - speedVariance, chosenFish).setRandomPosition(680, 100 ,0, 380).setPipeline('Light2D');
        this.fishGroup.add(fish);
    }
    //adding trash...
    addTrash() {
        let speedVariance =  Phaser.Math.Between(0, 50);
        let trash = new Trash(this, this.trashSpeed - speedVariance).setRandomPosition(680, 100 ,0, 300).setPipeline('Light2D');
        this.trashGroup.add(trash);
    }

    update() {
        //here we go...
        //check key input for restart
        if(this.gameOver){
            this.time.delayedCall(1000, () => {
                this.scene.start("gameOverScene");
            });
            
        }


        //moving background
        this.backdrop.tilePositionX += 0.5;


        if (!this.gameOver){
            //game over if player hits too many thinks
            if(this.collided == true){
                this.music.pause();
                this.difficultyTimer.destroy(); 
                this.character.destroy();
                this.gameOver = true;
            }
        
                    //  Track the pointer
        
            if(keyUP.isDown){
                this.light.y -= 2; 
                
            }
            if(keyDOWN.isDown){
                this.light.y += 2; 
            }
            //character
            this.character.update();

            // check for collisions
            this.physics.world.collide(this.character, this.jellyGroup, this.jellyCollision, null, this);
            this.physics.world.collide(this.character, this.rockGroup, this.rockCollision, null, this);
            this.physics.world.collide(this.character, this.fishGroup, this.fishCollision, null, this);
            this.physics.world.collide(this.character, this.trashGroup, this.trashCollision, null, this);
            
        }
    }



    //collison that causes harm
    jellyCollision(){
        this.sound.play('buzz', { volume: 0.2 });
        this.cameras.main.shake(500, 0.0025);
        this.particles = this.add.particles(this.character.x, this.character.y, 'spark');
        
        this.add.particles(this.character.x, this.character.y, 'spark', {
            scale: 0.5,
            speed: 70,
            lifespan: 500,
            gravityY: 10,
            frequency: 50,
            duration: 500,
        });
        this.jellyGroup.remove(this.jellyGroup.getFirst(true), true);
        var currentLifeCount = this.lifeCount,
            currentLife = this.lives[currentLifeCount - 1];
            
        let lifeFade = this.tweens.add({
            targets: currentLife,
            alpha: 0,
            scaleX: 0,
            scaleY: 0,
            ease: 'Linear',
            duration: 200
        });    
        lifeFade.play();
        
        //console.log(this.lifeCount);
        this.lifeCount -= 1;
        if (this.lifeCount <= 0) {
            this.collided = true;
        }
        
    }
    //collision with rocks
    rockCollision(){
        this.sound.play('oof', { volume: 0.5 });
        this.cameras.main.shake(500, 0.0025);
        this.character.reset();
        this.character.body.x = game.config.width/5;
        this.character.body.y = game.config.height/2.1;
        this.light.x =  game.config.width/4;
        this.light.y =  game.config.height/2;
        var currentLifeCount = this.lifeCount,
            currentLife = this.lives[currentLifeCount - 1];
            
        let lifeFade = this.tweens.add({
            targets: currentLife,
            alpha: 0,
            scaleX: 0,
            scaleY: 0,
            ease: 'Linear',
            duration: 200
        });    
        lifeFade.play();
        
        //console.log(this.lifeCount);
        this.lifeCount -= 1;
        if (this.lifeCount <= 0) {
            this.collided = true;
        }
    }
    //collision with fish(eating them)
    fishCollision(){
        this.sound.play('yum', { volume: 0.7 });
        this.fishGroup.remove(this.fishGroup.getFirst(true), true);
        score += 1;
        this.scoreRight.text = score;
    }
    //collision for trash(cause it also disappears like fish, because it is SADLY being eaten as well)
    trashCollision(){
        this.sound.play('blah', { volume: 0.7 });
        this.trashGroup.remove(this.trashGroup.getFirst(true), true);
        if(score > 0){
            score -= 1;
            this.scoreRight.text = score;
        }
    }

    //Use randomness to generate escalating challenge, e.g. terrain, pickups, etc. (5)
    levelBump() {
        // increment level (ie, score)
        level++;

        // bump speed every 5 levels (until max is hit)
        if(level % 5 == 0) {
            this.sound.play('woomp', { volume: 0.6 });         // play clang to signal speed up
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

