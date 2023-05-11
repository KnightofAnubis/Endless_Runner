class Load extends Phaser.Scene {
    constructor() {
        super('loadScene');
    }

    preload() {
        // loading bar
        // see: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/loader/
        let loadingBar = this.add.graphics();
        this.load.on('progress', (value) => {
            loadingBar.clear();                                 // reset fill/line style
            loadingBar.fillStyle(0xFFFFFF, 1);                  // (color, alpha)
            loadingBar.fillRect(0, game.config.height/2, game.config.width * value, 5);  // (x, y, w, h)
        });
        this.load.on('complete', () => {
            loadingBar.destroy();
        });

        this.load.path = './assets/';
        // load graphics assets
        this.load.aseprite(
            'shark',
            `characters/shark.png`,
            `characters/shark.json`
        )
       this.load.aseprite(
            'manta',
            `characters/manta.png`,
            `characters/manta.json`
        )
        this.load.image('backdrop', 'background/background.png');
        this.load.image('reef', 'background/reef.png');
        this.load.image('darkbackdrop', 'background/darkbackground.png');
        this.load.image('spark', 'sprites/lightning.png');
        this.load.aseprite(
            'jellyfish',
            'sprites/jellyfish.png',
            'sprites/jellyfish.json'
        );
        this.load.image('rock', 'sprites/rock.png');
        this.load.image('trash', 'sprites/trash.png');
        this.load.image('fish', 'sprites/fish.png');
        this.load.image('blueFish', 'sprites/blueFish.png');
        this.load.image('yellowFish', 'sprites/yellowFish.png');

        
        
        // load audio assets
        this.load.audio('background_music', 'sound/ocean.wav');
        this.load.audio('yum', 'sound/yum.wav');
        this.load.audio('blah', 'sound/blah.wav');
        this.load.audio('woomp','sound/woomp.wav');
        this.load.audio('buzz', 'sound/buzz.wav');
        this.load.audio('oof', 'sound/oof.wav');
        
    }

    create() {
        // check for local storage browser support
        if(window.localStorage) {
            console.log('Local storage supported');
        } else {
            console.log('Local storage not supported');
        }

        // go to Title scene
        this.scene.start('menuScene');
    }
}