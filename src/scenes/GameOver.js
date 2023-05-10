class GameOver extends Phaser.Scene {
    constructor() {
        super('gameOverScene');
    }

    create() {
        // in game credits
        this.add.text(game.config.width/2, game.config.height/5 - borderUISize - borderPadding, "Game Over", menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/4, game.config.height/3.5 - borderUISize - borderPadding, "Music made through MuseScore 3", menuConfig);
        this.add.text(game.config.width/4, game.config.height/2.8 - borderUISize - borderPadding, "Sound Effects made through Audacity", menuConfig);
        this.add.text(game.config.width/4, game.config.height/2.3 - borderUISize - borderPadding, "Assets made through Aserpite", menuConfig);
        this.add.text(game.config.width/4, game.config.height/2 - borderUISize - borderPadding, "All made by Kelsey Melott", menuConfig);
        this.add.text(game.config.width/4, game.config.height/1.5 - borderUISize - borderPadding, "Press (R) to restart.", menuConfig);
        this.add.text(game.config.width/4, game.config.height/1.4 - borderUISize - borderPadding, "Press (M) for Menu Screen.", menuConfig);
         //define some keys
         keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
         keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
 
     }
 
     update() {
         //gettin' ready to play!
         if(Phaser.Input.Keyboard.JustDown(keyR)) {
             this.scene.start('playScene');
         }
         if (Phaser.Input.Keyboard.JustDown(keyM)) {
             this.scene.start('menuScene');
         }
 
     }
}
