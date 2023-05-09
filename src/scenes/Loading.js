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
            `shark.png`,
            `shark.json`
        )
       this.load.aseprite(
            'manta',
            `manta.png`,
            `manta.json`
        )
        this.load.image('backdrop', 'background.png');
        this.load.aseprite(
            'jellyfish',
            'jellyfish.png',
            'jellyfish.json'
        );
        this.load.image('rock', 'rock.png');
        this.load.image('trash', 'trash.png');
        this.load.image('fish', 'fish.png');

        
        
        // load audio assets
        this.load.audio('background_music', 'ocean.wav');
        
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