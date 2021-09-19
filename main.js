let canvas0 = document.getElementById("canvas0");
let canvas = document.getElementById("canvas");
canvas.style.fontKerning = "none";
canvas.style.textRendering = "optimizeSpeed";
canvas.style.letterSpacing = 0;
let ctx0 = canvas.getContext("2d");
let ctx = canvas.getContext("2d");
let checkAssetsInterval = setInterval(checkAssetsLoading, 1000 / 60);
let interval;
let lastUpdate = Date.now();
const SCALE_X = 2;
const SCALE_Y = 2;
const CANVAS_WIDTH = canvas.width / SCALE_X;
const CANVAS_HEIGHT = canvas.height / SCALE_Y;
let canvasOriginBgColor = "cornflowerblue";
let MUSIC_VOLUME = 0.5;
let SFX_VOLUME = 0.5;
let TRANSITION = false;
let SCREEN_SHAKE = false;
let screenShakeTimer = new Timer(0.1, { cb: setScreenShake, arg: false });
// screenShakeTimer.setMax(0.1);

let MOUSE_SPRITE = new Sprite({ w: 8, h: 9 }, centerX(8), centerY(8));
MOUSE_SPRITE.addAnimation("normal", 1, { x: 114, y: 34 }, 0.1);
MOUSE_SPRITE.addAnimation("hover", 1, { x: 122, y: 34 }, 0.1);
MOUSE_SPRITE.addAnimation("down", 1, { x: 130, y: 34 }, 0.1);
MOUSE_SPRITE.changeAnimation("normal");

//!TEST--------
// let canvasTest = document.getElementById("canvasTest");
// let canvasTestCtx = canvasTest.getContext("2d");
// canvasTest.style.top = centerY(60) * SCALE_X + "px";
// canvasTest.style.left = centerX(90) * SCALE_Y + "px";

// canvasTest.style.display = "none";
// console.table(canvasTest);
//!------------


/**
 * DEBUG
 */
let bStatsDebug = false;
let debugDt = 0;
let debug_STOP = false;
let shortcut_tomainmenu = 1;
let boolTest = false;
let imageData = null;
let imageDatasArr = [];
// ---------------- END DEBUG

// SaveManager.save();
SaveManager.init();
SaveManager.load();

const MAIN_STATE = Object.freeze({
    Language: 0,
    Splash: 1,
    Menu: 2,
    Lessons: 3,
    Infos: 4,
    Game: 5,
    Pause: 6,
    Transition: 7
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
        console.log("--- Assets loaded ---");
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

function run() {
    let now = Date.now();
    let dt = (now - lastUpdate) / 1000;
    lastUpdate = now;

    debugDt = dt;

    if (SCREEN_SHAKE) {
        screenShakeTimer.update(dt);
    }

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
        case MAIN_STATE.Lessons:
            Lessons.update(dt);
            break;
        case MAIN_STATE.Infos:
            Infos.update(dt);
            break;
        case MAIN_STATE.Game:
            Game1.update(dt);
            break;
    }
    MOUSE_SPRITE.update(dt);
    Sprite.debug_drawcalls = 0;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.scale(SCALE_X, SCALE_Y);


    if (SCREEN_SHAKE) {
        screenShake(ctx);
    }

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
        case MAIN_STATE.Lessons:
            Lessons.draw(ctx);
            break;
        case MAIN_STATE.Infos:
            Infos.draw(ctx);
            break;
        case MAIN_STATE.Game:
            Game1.draw(ctx);
            break;
    }

    if (SCREEN_SHAKE) {
        canvas.style.backgroundColor = "rgb(255,50,50)"
    }

    if (bStatsDebug) {
        ctx.font = "10px jpfont";
        ctx.fillText("Drawcalls: " + Sprite.debug_drawcalls, 0, 10);
        ctx.fillText("fps: " + Math.floor(dt * 3750), 0, 20);
    }


    ctx.font = "10px jpfont";
    ctx.fillStyle = "rgb(255,0,0)";
    ctx.textAlign = "left";
    if (SaveManager.bSaveDataExists) {
        ctx.fillText("Save?: SAVE DATA", 0, 10);
    } else {
        ctx.fillText("Save?: NO SAVE DATA", 0, 10);
    }

    MOUSE_SPRITE.ox = MOUSE_SPRITE.currentAnimation.origin.x + (MOUSE_SPRITE.width * MOUSE_SPRITE.currentFrame);
    ctx.drawImage(SS, MOUSE_SPRITE.ox, MOUSE_SPRITE.currentAnimation.origin.y, MOUSE_SPRITE.width, MOUSE_SPRITE.height, MOUSE_SPRITE.x, MOUSE_SPRITE.y, MOUSE_SPRITE.width * MOUSE_SPRITE.scaleX, MOUSE_SPRITE.height * MOUSE_SPRITE.scaleY);


    ctx.restore();

    // canvasTestCtx.clearRect(0, 0, canvas.width, canvas.height);
    // canvasTestCtx.save();
    // canvasTestCtx.scale(SCALE_X, SCALE_Y);

    // canvasTestCtx.restore();

}

function startBtnCB(pParam) {
    mainState = MAIN_STATE.Game;

    // console.log(pParam);
    let bLessonRange = false;
    switch (pParam.testType) {
        case "Training":
            bLessonRange = true;
            MAX_TURN = -1;
            break;
        case "Lesson_test":
            bLessonRange = true;
            // MAX_TURN = 5;
            MAX_TURN = 1;
            break;
        case "Full_test":
            bLessonRange = false;
            // MAX_TURN = 2;
            MAX_TURN = 1;
            break;
    }

    Game1.load(pParam.choiceType, pParam.answerType, pParam.range, bLessonRange, pParam.testType, pParam.lessonNumber);
    MOUSE_SPRITE.y -= CANVAS_HEIGHT;
    if (!Game1.bGameInitialized) {
        Game1.init();
        ScreenManager.init();
        // Pause.init();
    }

    Panel.resetTypeState("game1", Game1.STATE.Game);
    Button.resetTypeState("game1", Game1.STATE.Game);

}

function changeMainState(pNewState) {

    if (typeof pNewState == "number") {
        mainState = pNewState;
    } else {
        mainState = pNewState.state;
        MainMenu.clearKanaInterval();
    }

    switch (mainState) {
        case MAIN_STATE.Infos:
            if (!Infos.bInit) {
                Infos.init();
            }
            Infos.changeState(Infos.STATE.Main);
            break;
        case MAIN_STATE.Lessons:
            if (!Lessons.bInit) {
                Lessons.init();
            }
            Lessons.changeState(Lessons.STATE.Hiragana);
            break;
    }
}

function toMainMenu() {

    if (!MainMenu.bInit) {
        MainMenu.init();
    }
    canvas.style.backgroundColor = "cornflowerblue";

    mainState = MAIN_STATE.Menu;

    MainMenu.initKanaInterval();

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

    let kanaArray = [
        "hira_a", "hira_i", "hira_u", "hira_e", "hira_o",
        "hira_ka", "hira_ki", "hira_ku", "hira_ke", "hira_ko",
        "hira_sa", "hira_shi", "hira_su", "hira_se", "hira_so",
        "hira_ta", "hira_chi", "hira_tsu", "hira_te", "hira_to",
        "hira_na", "hira_ni", "hira_nu", "hira_ne", "hira_no",
        "hira_ha", "hira_hi", "hira_fu", "hira_he", "hira_ho",
        "hira_ma", "hira_mi", "hira_mu", "hira_me", "hira_mo",
        "hira_ya", "hira_yu", "hira_yo",
        "hira_ra", "hira_ri", "hira_ru", "hira_re", "hira_ro",
        "hira_wa", "hira_wo",
        "hira_n",
        "hira_ga", "hira_gi", "hira_gu", "hira_ge", "hira_go",
        "hira_za", "hira_ji", "hira_zu", "hira_ze", "hira_zo",
        "hira_da", "hira_di", "hira_du", "hira_de", "hira_do",
        "hira_ba", "hira_bi", "hira_bu", "hira_be", "hira_bo",
        "hira_pa", "hira_pi", "hira_pu", "hira_pe", "hira_po",
        "kata_a", "kata_i", "kata_u", "kata_e", "kata_o",
        "kata_ka", "kata_ki", "kata_ku", "kata_ke", "kata_ko",
        "kata_sa", "kata_shi", "kata_su", "kata_se", "kata_so",
        "kata_ta", "kata_chi", "kata_tsu", "kata_te", "kata_to",
        "kata_na", "kata_ni", "kata_nu", "kata_ne", "kata_no",
        "kata_ha", "kata_hi", "kata_fu", "kata_he", "kata_ho",
        "kata_ma", "kata_mi", "kata_mu", "kata_me", "kata_mo",
        "kata_ya", "kata_yu", "kata_yo",
        "kata_ra", "kata_ri", "kata_ru", "kata_re", "kata_ro",
        "kata_wa", "kata_wo",
        "kata_n",
        "kata_ga", "kata_gi", "kata_gu", "kata_ge", "kata_go",
        "kata_za", "kata_ji", "kata_zu", "kata_ze", "kata_zo",
        "kata_da", "kata_di", "kata_du", "kata_de", "kata_do",
        "kata_ba", "kata_bi", "kata_bu", "kata_be", "kata_bo",
        "kata_pa", "kata_pi", "kata_pu", "kata_pe", "kata_po"
    ];


    const nbColumns = 10;
    let offX = 0;
    let offY = 0;
    let columnsCount = 0;
    let kanaCount = 0;
    let frameCount = 0;
    let kanaWidth = 34;
    let startPos = 170;

    for (let i = 0; i < 419; i++) {

        if (i == 104) {
            kanaWidth = 38;
            startPos = 544;
            offX = 0;
            offY = 0;
            columnsCount = 0;
        } else if (i == 208) {
            kanaWidth = 34;
            startPos = 918;
            offX = 0;
            offY = 0;
            columnsCount = 0;
        } else if (i == 316) {
            kanaWidth = 38;
            startPos = 1292;
            offX = 0;
            offY = 0;
            columnsCount = 0;
        }

        ctx0.drawImage(SS, 0 + offX, startPos + offY, kanaWidth, 34, 0, 0, kanaWidth, 34);
        imageData = ctx0.getImageData(0, 0, kanaWidth * SCALE_X, 34 * SCALE_Y);

        if (frameCount == KANA[kanaArray[kanaCount]].frames.length) { //
            kanaCount++;
            frameCount = 0;
        }

        KANA[kanaArray[kanaCount]].imageData.push(imageData); // 1
        frameCount++;

        offX += kanaWidth;
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