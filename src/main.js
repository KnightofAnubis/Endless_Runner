//Kelsey Melott <kmelott.ucsc.edu>
// Endless Runner Name: 
//Time it took in hrs:

//Check list:
//Use multiple Scene classes (dictated by your game's style) (5)
//Properly transition between Scenes and allow the player to restart w/out having to reload the page (5)
//Include in-game instructions using text or other means (e.g., tooltips, tutorial, diagram, etc.) (5)
//Have some form of player input/control appropriate to your game design (5)
//Include one or more animated characters that use a texture atlas (5)
//Simulate scrolling with a tileSprite (or equivalent means) (5)
//Implement proper collision detection (via Arcade Physics or a custom routine) (5)
//Have looping background music (5)
//Use a minimum of three sound effects for key mechanics, UI, and/or significant events appropriate to your game design (5)
//Use randomness to generate escalating challenge, e.g. terrain, pickups, etc. (5)
//Include some metric of accomplishment that a player can improve over time, e.g., score, survival time, etc. (5)
//Be theoretically endless (5)
//Be playable for at least 15 seconds for a new player of low to moderate skill (5)
//Run without significant crashes or errors (5)
//Include in-game credits for all roles, assets, music, etc. (5)

//Creative tilt: 
//
//

let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scene: [Menu, Play],
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    }
}

let game = new Phaser.Game(config);

let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;