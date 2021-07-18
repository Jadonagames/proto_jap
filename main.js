let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let interval;
let lastUpdate = Date.now();
const SCALE_X = 3;
const SCALE_Y = 3;
const CANVAS_WIDTH = canvas.width / SCALE_X;
const CANVAS_HEIGHT = canvas.height / SCALE_Y;
let MUSIC_VOLUME = 0.5;
let SFX_VOLUME = 0.5;

/**
 * DEBUG
 */
let bDebug = false;
let debugDt = 0;
// ---------------- END DEBUG

const MAIN_STATE = Object.freeze({
    Splash: 0,
    Menu: 1,
    Game: 2,
    Pause: 3,
    Transition: 4,
})

let mainState = MAIN_STATE.Splash;

function run() {
    let now = Date.now();
    let dt = (now - lastUpdate) / 1000;
    lastUpdate = now;

    debugDt = dt;

    switch (mainState) {
        case MAIN_STATE.Splash:
            SplashScreen.update(dt);
            break;
        case MAIN_STATE.Menu:
            MainMenu.update(dt);
            break;
        case MAIN_STATE.Game:
            // update(dt);
            Game1.update(dt);
            break;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.scale(SCALE_X, SCALE_Y);


    switch (mainState) {
        case MAIN_STATE.Splash:
            SplashScreen.draw(ctx);
            break;
        case MAIN_STATE.Menu:
            MainMenu.draw(ctx);
            break;
        case MAIN_STATE.Game:
            // draw(ctx);
            Game1.draw(ctx);
            break;
    }

    ctx.restore();
}

function init() {

    console.log("------------------------");
    console.log("init");
    ctx.imageSmoothingEnabled = false;
    ctx.msImageSmoothingEnabled = false;
    ctx.webkitImageSmoothingEnabled = false;
    ctx.mozImageSmoothingEnabled = false;

    SplashScreen.init();
    MainMenu.init();

    interval = setInterval(run, 1000 / 60);
}

init();

function startBtnCB() {
    mainState = MAIN_STATE.Game;

    if (!bGameInitialized) {
        // gameInit();
        Game1.init();
        ScreenManager.init();
        Pause.init();
    }
    // load();
    Game1.load();
    // Button.resetTypeState("normal", GAME_STATE.Game);
    Button.resetTypeState("game1", Game1.STATE.Game);

}

function toMainMenu() {

    // MainMenu.init();
    canvas.style.backgroundColor = "cornflowerblue";

    mainState = MAIN_STATE.Menu;

    MainMenu.changeState(MainMenu.STATE.Main);

    // GESTION MENU KEYBOARD
    // Button.currentList[0].setState(Button.STATE.Hover);
    // Button.currentList[0].getSprite().changeAnimation("hover");
    // --------------------------

    Sprite.list = [];
}
