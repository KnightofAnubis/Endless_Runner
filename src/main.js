//Kelsey Melott <kmelott.ucsc.edu>
// Endless Runner Name: 
//Time it took in hrs: 25rn

//Check list:
//Use multiple Scene classes (dictated by your game's style) (5) 
// scene: [Load, Menu,  Selection, Darkmode, Play, GameOver]

//Have some form of player input/control appropriate to your game design (5) 
//up and down arrow for main game

//Include one or more animated characters that use a texture atlas (5) 
//Using this.anims.createFromAseprite I was told this was okay as long as I specified it was being used.

//Simulate scrolling with a tileSprite (or equivalent means) (5)
//background and reef

//Have looping background music (5)
//Ocean.wav made in MuseScore 3

//Implement proper collision detection (via Arcade Physics or a custom routine) (5)
//Arcade Physics

//Use randomness to generate escalating challenge, e.g. terrain, pickups, etc. (5)
//used the level bump from Paddle Parkcore to increase speed of enemies and fish

//Be theoretically endless (5)
//it continues till death

//Include in-game instructions using text or other means (e.g., tooltips, tutorial, diagram, etc.) (5)
//tips at the top of the main play scenes

//Be playable for at least 15 seconds for a new player of low to moderate skill (5)
//Yes

//Include in-game credits for all roles, assets, music, etc. (5)
//Listed out on the GameOver scene

//Properly transition between Scenes and allow the player to restart w/out having to reload the page (5)
//Player can restart game mode they had chosen or return to menu screne

//Include some metric of accomplishment that a player can improve over time, e.g., score, survival time, etc. (5)
// eating fish improves score, hi score is listed on Game Over screen: this idea was also taken from Paddle Parkcore

//Use a minimum of three sound effects for key mechanics, UI, and/or significant events appropriate to your game design (5)
//four sound effects for collision and 'level bump'

//Run without significant crashes or errors (5)
//it did for me

//sources:
//For the three lives I used https://digitherium.com/blog/phaser-platformer-series-13-hearts-lives/

//Creative tilt: 
//For this project I implemented a dark mode that uses Phaser lights in order to make it seem like the player is swimming through the abyssal plain. 
//This was done through researching the concept outside of class. I went through a few tutorials, but none of them worked and I ended up adapting it 
//from a Phaser example for creating a spotlight. 

//While I don’t think I did anything particularly clever with this endless runner, I am proud of the player sprite animations and being able to select 
//which character the player wants to use. I am also proud of the overall aesthetic of the ocean. The music could have been more refined, but I was 
//going for something with more deep toned instruments and a Jaws theme undertone. 


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
            debug: false
        }
    },

    scene: [Load, Menu,  Selection, Darkmode, Play, GameOver]
   
}
//menu config
let menuConfig = {
    fontFamily: "Georgia",
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

let keyLEFT, keyRIGHT, keyUP, keyDOWN, keyR, keyM;
let level;
let highScore;
let newHighScore = false;
let score;