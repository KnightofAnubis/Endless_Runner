//Kelsey Melott <kmelott.ucsc.edu>
// Endless Runner Name: 
//Time it took in hrs:

//Check list:
//complete:
//Use multiple Scene classes (dictated by your game's style) (5) 
//Have some form of player input/control appropriate to your game design (5)
//Include one or more animated characters that use a texture atlas (5) Using this.anims.createFromAseprite I was told this was okay as long as I specified it was being used.
//Simulate scrolling with a tileSprite (or equivalent means) (5)
//Have looping background music (5)
//Implement proper collision detection (via Arcade Physics or a custom routine) (5)
//Use randomness to generate escalating challenge, e.g. terrain, pickups, etc. (5)
//Be theoretically endless (5)
//Include in-game instructions using text or other means (e.g., tooltips, tutorial, diagram, etc.) (5)

//to do:
//Properly transition between Scenes and allow the player to restart w/out having to reload the page (5)
//Use a minimum of three sound effects for key mechanics, UI, and/or significant events appropriate to your game design (5)
//Include some metric of accomplishment that a player can improve over time, e.g., score, survival time, etc. (5)
//Be playable for at least 15 seconds for a new player of low to moderate skill (5)
//Run without significant crashes or errors (5)
//Include in-game credits for all roles, assets, music, etc. (5)

//Creative tilt: 
//
//

'use strict';
//game config
let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    },

    scene: [Load, Menu, Selection, Play]
   
}
//menu config
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

let game = new Phaser.Game(config);

let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

let keyLEFT, keyRIGHT, keyUP, keyDOWN, keyR;
let level;
