let canvas0 = document.getElementById("canvas0");
let canvas = document.getElementById("canvas");
let ctx0 = canvas.getContext("2d");
let ctx = canvas.getContext("2d");
let checkAssetsInterval = setInterval(checkAssetsLoading, 1000 / 60);
let interval;
let lastUpdate = Date.now();
const SCALE_X = 2;
const SCALE_Y = 2;
const CANVAS_WIDTH = canvas.width / SCALE_X;
const CANVAS_HEIGHT = canvas.height / SCALE_Y;
let MUSIC_VOLUME = 0.5;
let SFX_VOLUME = 0.5;

/**
 * DEBUG
 */
let bStatsDebug = false;
let debugDt = 0;
let debug_STOP = false;
let shortcut_tomainmenu = true;
let boolTest = false;
let imageData = null;
let imageDatasArr = [];
// ---------------- END DEBUG

const MAIN_STATE = Object.freeze({
    Language: 0,
    Splash: 1,
    Menu: 2,
    Infos: 3,
    Game: 4,
    Pause: 5,
    Transition: 6
})

let mainState = 0;
if (shortcut_tomainmenu) {
    mainState = MAIN_STATE.Menu;
} else {
    mainState = MAIN_STATE.Language;
}

function checkAssetsLoading() {
    if (ASSETS_READY) {
        clearInterval(checkAssetsInterval);
        init();
    } else {
        console.log("Assets not loaded yet");
    }
}

function init() {

    console.log("------------------------");
    console.log("init");
    ctx0.imageSmoothingEnabled = false;
    loadImageDatas(ctx0);

    ctx.imageSmoothingEnabled = false;
    ctx.msImageSmoothingEnabled = false;
    ctx.webkitImageSmoothingEnabled = false;
    ctx.mozImageSmoothingEnabled = false;
    if (shortcut_tomainmenu) {
        MainMenu.init();
        toMainMenu()
    } else {
        LanguageScreen.init();
    }



    interval = setInterval(run, 1000 / 60);
}

let testest = true;

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
        case MAIN_STATE.Infos:
            Infos.update(dt);
            break;
        case MAIN_STATE.Game:
            // update(dt);
            Game1.update(dt);
            break;
    }
    Sprite.debug_drawcalls = 0;

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
        case MAIN_STATE.Infos:
            Infos.draw(ctx);
            break;
        case MAIN_STATE.Game:
            // draw(ctx);
            Game1.draw(ctx);
            break;
    }

    if (bStatsDebug) {
        ctx.font = "10px jpfont";
        ctx.fillText("Drawcalls: " + Sprite.debug_drawcalls, 0, 10);
        ctx.fillText("fps: " + Math.floor(dt * 3750), 0, 20);
    }
    ctx.restore();
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

function changeMainState(pNewState) {
    mainState = pNewState;
    switch (mainState) {
        case MAIN_STATE.Infos:
            if (!Infos.bInit) {
                Infos.init();
            }
            Infos.changeState(Infos.STATE.Main);
            break;
    }
}

function toMainMenu() {

    if (!MainMenu.bInit) {
        MainMenu.init();
    }
    canvas.style.backgroundColor = "cornflowerblue";

    mainState = MAIN_STATE.Menu;

    MainMenu.changeState(MainMenu.STATE.Main);

    // GESTION MENU KEYBOARD
    // Button.currentList[0].setState(Button.STATE.Hover);
    // Button.currentList[0].getSprite().changeAnimation("hover");
    // --------------------------
}

function loadImageDatas() {

    ctx0.clearRect(0, 0, canvas.width, canvas.height);
    ctx0.save();
    ctx0.scale(SCALE_X, SCALE_Y);

    const nbColumns = 10;
    let offX = 0;
    let offY = 0;
    let columnsCount = 0;
    for (let i = 0; i < 104; i++) {
        ctx0.drawImage(SS, 0 + offX, 170 + offY, 34, 34, 0, 0, 34, 34);
        imageData = ctx0.getImageData(0, 0, 34 * SCALE_X, 34 * SCALE_Y);
        imageDatasArr.push(imageData);
        offX += 34;
        columnsCount++;
        if (columnsCount == nbColumns) {
            columnsCount = 0;
            offX = 0;
            offY += 34;
        }
    }

    offX = 0;
    offY = 0;
    columnsCount = 0;
    for (let i = 0; i < 104; i++) {
        ctx0.drawImage(SS, 0 + offX, 544 + offY, 38, 34, 0, 0, 38, 34);
        imageData = ctx0.getImageData(0, 0, 38 * SCALE_X, 34 * SCALE_Y);
        imageDatasArr.push(imageData);
        offX += 38;
        columnsCount++;
        if (columnsCount == nbColumns) {
            columnsCount = 0;
            offX = 0;
            offY += 34;
        }
    }

    offX = 0;
    offY = 0;
    columnsCount = 0;
    for (let i = 0; i < 108; i++) {
        ctx0.drawImage(SS, 0 + offX, 918 + offY, 34, 34, 0, 0, 34, 34);
        imageData = ctx0.getImageData(0, 0, 34 * SCALE_X, 34 * SCALE_Y);
        imageDatasArr.push(imageData);
        offX += 34;
        columnsCount++;
        if (columnsCount == nbColumns) {
            columnsCount = 0;
            offX = 0;
            offY += 34;
        }
    }

    offX = 0;
    offY = 0;
    columnsCount = 0;
    for (let i = 0; i < 103; i++) {
        ctx0.drawImage(SS, 0 + offX, 1292 + offY, 38, 34, 0, 0, 38, 34);
        imageData = ctx0.getImageData(0, 0, 38 * SCALE_X, 34 * SCALE_Y);
        imageDatasArr.push(imageData);
        offX += 38;
        columnsCount++;
        if (columnsCount == nbColumns) {
            columnsCount = 0;
            offX = 0;
            offY += 34;
        }
    }

    ctx0.restore();
    ctx0.clearRect(0, 0, canvas.width, canvas.height);
}