class GameOver extends Phaser.Scene {
    constructor() {
        super('gameOverScene');
    }

    create() {
        if(localStorage.getItem('hiscore') != null) {
            let storedScore = parseInt(localStorage.getItem('hiscore'));
            console.log(`storedScore: ${storedScore}`);
            // see if current score is higher than stored score
            if(score > storedScore) {
                console.log(`New high score: ${score}`);
                localStorage.setItem('hiscore', score.toString());
                highScore = score;
                newHighScore = true;
            } else {
                //console.log('No new high score :/');
                highScore = parseInt(localStorage.getItem('hiscore'));
                newHighScore = false;
            }
        } else {
            console.log('No high score stored. Creating new.');
            highScore = score;
            localStorage.setItem('hiscore', highScore.toString());
            newHighScore = true;
        }
        // in game credits
        menuConfig.color = '#008080';
        this.add.text(game.config.width/2, game.config.height/5 - borderUISize - borderPadding, "Game Over", menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/4, game.config.height/3.8 - borderUISize - borderPadding, `This browser's best: ${highScore} fish`, menuConfig);
        this.add.text(game.config.width/4, game.config.height/3 - borderUISize - borderPadding, "Music made through MuseScore 3", menuConfig);
        this.add.text(game.config.width/4, game.config.height/2.5 - borderUISize - borderPadding, "Sound Effects made through Audacity", menuConfig);
        this.add.text(game.config.width/4, game.config.height/2.2 - borderUISize - borderPadding, "Assets made through Aseprite", menuConfig);
        this.add.text(game.config.width/4, game.config.height/1.9 - borderUISize - borderPadding, "All made by Kelsey Melott", menuConfig);
        this.add.text(game.config.width/4, game.config.height/1.5 - borderUISize - borderPadding, "Press (R) to restart.", menuConfig);
        this.add.text(game.config.width/4, game.config.height/1.4 - borderUISize - borderPadding, "Press (M) for Menu Screen.", menuConfig);
         //define some keys
         keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
         keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
 
     }
 
     update() {
         //gettin' ready to play!
         if(Phaser.Input.Keyboard.JustDown(keyR)) {
            if(game.settings.mode){
                this.scene.start('playScene');
            }
            if(!game.settings.mode){
                this.scene.start('darkmodeScene');
            }
         }
         if (Phaser.Input.Keyboard.JustDown(keyM)) {
             this.scene.start('menuScene');
         }
 
     }
}
