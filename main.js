let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let checkAssetsInterval = setInterval(checkAssetsLoading, 1000 / 60);
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
let bDebug = true;
let debugDt = 0;
let debug_STOP = false;
// ---------------- END DEBUG

const MAIN_STATE = Object.freeze({
    Language: 0,
    Splash: 1,
    Menu: 2,
    Game: 3,
    Pause: 4,
    Transition: 5
})

// let mainState = MAIN_STATE.Splash;
let mainState = MAIN_STATE.Language; // COMMENT FOR : MAINMENU START

function checkAssetsLoading() {
    if (ASSETS_READY) {
        clearInterval(checkAssetsInterval);
        init();
    } else {
        console.log("Assets not loaded yet");
    }
}

function run() {
    let now = Date.now();
    let dt = (now - lastUpdate) / 1000;
    lastUpdate = now;

    debugDt = dt;

    switch (mainState) {
        case MAIN_STATE.Language:
            LanguageScreen.update(dt);
            break;
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
        case MAIN_STATE.Language:
            LanguageScreen.draw(ctx);
            break;
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

    // SplashScreen.init();  // COMMENT FOR : MAINMENU START
    LanguageScreen.init(); // COMMENT FOR : MAINMENU START
    // MainMenu.init();
    //toMainMenu() // FOR : MAINMENU START

    interval = setInterval(run, 1000 / 60);
}


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
    // Panel.resetTypeState("normal", GAME_STATE.Game);
    // Button.resetTypeState("normal", GAME_STATE.Game);
    Panel.resetTypeState("game1", Game1.STATE.Game);
    Button.resetTypeState("game1", Game1.STATE.Game);

}

function toMainMenu() {

    if (!MainMenu.bInit) {
        MainMenu.init();
    }
    // MainMenu.init();
    canvas.style.backgroundColor = "cornflowerblue";

    mainState = MAIN_STATE.Menu;

    MainMenu.changeState(MainMenu.STATE.Main);

    // GESTION MENU KEYBOARD
    // Button.currentList[0].setState(Button.STATE.Hover);
    // Button.currentList[0].getSprite().changeAnimation("hover");
    // --------------------------

    // Sprite.list = [];
}
