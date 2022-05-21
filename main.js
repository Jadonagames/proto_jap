let canvas0 = document.getElementById("canvas0");
let canvas = document.getElementById("canvas");
canvas.style.fontKerning = "none";
canvas.style.textRendering = "optimizeSpeed";
canvas.style.letterSpacing = 0;
let ctx0 = canvas.getContext("2d");
const ctx = canvas.getContext("2d");
let checkAssetsInterval = setInterval(checkAssetsLoading, 1000 / 60);
let interval;
// let lastUpdate = Date.now();
let lastUpdate = 0;
const SCALE_X = 2;
const SCALE_Y = 2;
const CANVAS_WIDTH = canvas.width / SCALE_X;
const CANVAS_HEIGHT = canvas.height / SCALE_Y;
const BLACK_COLOR = "rgba(0,0,0,1)";
const BLACK_COLOR_0 = "rgba(0,0,0,0)";
const WHITE_COLOR = "rgba(255,255,255,1)";
const WHITE_COLOR_0 = "rgba(255,255,255,0)";
const RED_COLOR = "rgba(255,0,0,1)";
const RED_COLOR_0 = "rgba(255,0,0,0)";

const RED_BTN_SDW_COLOR = "rgba(142,45,45,1)";
const GREEN_BOARD_SDW_COLOR = "rgba(18,72,39,1)"; //? DialogPanel / Infos.KanaPanel // All other green panels
const GREEN_BOARD_SDW_COLOR2 = "rgba(20,102,53,1)"; //? Lessons Hiragana/Katakana titles

const TEST_BTN_SDW_COLOR = "rgba(228,223,192,1)";
const TEST_BTN_HVR_COLOR = "rgba(172,50,50,1)";

/*
"rgba(217,213,188,0)"       // choose type title panel shadow

"rgba(150,150,150,0)"       // endGameMark shadow
"rgba(150,150,150,1)"       // --
"rgba(215,30,30,0)"         // endGameMark

"rgba(162,162,162,1)"       // keyboard instructions panel shadow
"rgba(172,50,50,1)"         // virtual keyboard message shadow && fulltestBtn hover
"rgba(23,88,49,1)"          // kanaBtn shadow

"rgba(176,150,124,1)" + 0  // LessonBtn shadow
"rgba(213,210,190,1)" + 0  // LessonBtn Hover shadow
"rgba(162,138,114,1)" + 0  // LessonBtn Hover

"rgb(181,205,190)" // shadow (quand "inactif") (switch buttons)

"rgba(228,223,192,1)"       // FullTestBtn shadow & hover shadow

"rgba(200,200,200,0)"       // EntryField shadow
"rgba(100,100,100,0)"       // EntryField hover shadow
"rgba(192,192,192,0)"       // login/signup title shadow
"rgba(217, 160, 102, 1)")   // user panel shadow

*/


const CANVAS_ORIGIN_COLOR = "rgba(213,210,193,1)";
let MUSIC_VOLUME = 0.5;
let SFX_VOLUME = 0.5;
let TRANSITION = false;
let SCREEN_SHAKE = false;
let SCREEN_SHAKE_X = 5;
let SCREEN_SHAKE_Y = 5;
let SCREEN_SHAKE_RED = true;
let screenShakeTimer = new Timer(0.1, { cb: setScreenShake, arg: false });
let SAVING = false;
let SAVING_SPRITE = null;
let MOUSE_SPRITE = new Sprite({ w: 8, h: 9 }, centerX(8), centerY(8));
MOUSE_SPRITE.addAnimation("normal", { x: 114, y: 34 });
MOUSE_SPRITE.addAnimation("hover", { x: 124, y: 34 });
MOUSE_SPRITE.addAnimation("down", { x: 134, y: 34 });
MOUSE_SPRITE.addAnimation("entry", { x: 144, y: 34 });
MOUSE_SPRITE.addAnimation("error", { x: 154, y: 34 });
MOUSE_SPRITE.changeAnimation("normal");
//TODO 
//! Move these 
// const SERVER_URL = "http://localhost:3000/test";
const SERVER_URL = "https://kanaworld.herokuapp.com/test";
let bAlreadyExists = false;
let bEntryError = false;
let bIncorrectCredentials = false;
let messageTimeOut = null;
let USER = {
    id: -1,
    name: "",
    saveData: "",
    token: ""
}
//! --------------

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
let log = console.log.bind(console);
let titleSpeed = 0.2; // 0.2 - 2

let bStatsDebug = false;
let debugDt = 0;
let debug_STOP = false;
let shortcut_tomainmenu = 1; //! ------ ------------------------------------
let boolTest = false;
let imageData = null;
let imageDatasArr = [];
// ---------------- END DEBUG

// SaveManager.save();
SaveManager.init();
SaveManager.load();

const MAIN_STATE = Object.freeze({
    Load: -1,
    Language: 0,
    Splash: 1,
    Menu: 2,
    Lessons: 3,
    Infos: 4,
    Game: 5,
    Pause: 6,
    Transition: 7,
    LessonTutorial: 8,
    Introduction: 9,
    FreeMode: 10,
    Login: 11,
    Error: 12
})

let mainState = 0;
if (shortcut_tomainmenu) {
    mainState = MAIN_STATE.Menu;
} else {
    // mainState = MAIN_STATE.Language;
    mainState = MAIN_STATE.Load;
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
        // LanguageScreen.init();
        LoadScreen.init()
    }



    //! interval = setInterval(run, 1000 / 60);

    requestAnimationFrame(run);
}

function run(pTime) { //? Time est envoyé automatiquement par "requestAnimationFrame"
    requestAnimationFrame(run);

    //! let now = Date.now();
    //! let dt = (now - lastUpdate) / 1000;
    let dt = (pTime - lastUpdate) / 1000;

    if (dt < (1 / 60) - 0.001) {
        return;
    }
    //! lastUpdate = now;
    lastUpdate = pTime;
    debugDt = dt;

    if (SCREEN_SHAKE) {
        screenShakeTimer.update(dt);
    }

    switch (mainState) {
        case MAIN_STATE.Load:
            LoadScreen.update(dt);
            break;
        case MAIN_STATE.Language:
            LanguageScreen.update(dt);
            break;
        case MAIN_STATE.Splash:
            SplashScreen.update(dt);
            break;
        case MAIN_STATE.Introduction:
            Introduction.update(dt);
            break;
        case MAIN_STATE.Menu:
            MainMenu.update(dt);
            break;
        case MAIN_STATE.Lessons:
            Lessons.update(dt);
            break;
        case MAIN_STATE.FreeMode:
            FreeMode.update(dt);
            break;
        case MAIN_STATE.Infos:
            Infos.update(dt);
            break;
        case MAIN_STATE.Game:
            Game1.update(dt);
            break;
        case MAIN_STATE.LessonTutorial:
            LessonTutorial.update(dt);
            break;
        case MAIN_STATE.Login:
            Login.update(dt);
            break;
        case MAIN_STATE.Error:
            ErrorScreen.update(dt);
            break;
    }
    if (SAVING) SAVING_SPRITE.update(dt);

    MOUSE_SPRITE.update(dt);
    Sprite.debug_drawcalls = 0;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.scale(SCALE_X, SCALE_Y);


    if (SCREEN_SHAKE) {
        screenShake(ctx, SCREEN_SHAKE_X, SCREEN_SHAKE_Y);
    }

    switch (mainState) {
        case MAIN_STATE.Load:
            LoadScreen.draw(ctx);
            break;
        case MAIN_STATE.Language:
            LanguageScreen.draw(ctx);
            break;
        case MAIN_STATE.Splash:
            SplashScreen.draw(ctx);
            break;
        case MAIN_STATE.Introduction:
            Introduction.draw(ctx);
            break;
        case MAIN_STATE.Menu:
            MainMenu.draw(ctx);
            break;
        case MAIN_STATE.Lessons:
            Lessons.draw(ctx);
            break;
        case MAIN_STATE.FreeMode:
            FreeMode.draw(ctx);
            break;
        case MAIN_STATE.Infos:
            Infos.draw(ctx);
            break;
        case MAIN_STATE.Game:
            Game1.draw(ctx);
            break;
        case MAIN_STATE.LessonTutorial:
            LessonTutorial.draw(ctx);
            break;
        case MAIN_STATE.Login:
            Login.draw(ctx);
            break;
        case MAIN_STATE.Error:
            ErrorScreen.draw(ctx);
            break;
    }

    if (SAVING) SAVING_SPRITE.draw(ctx);


    if (SCREEN_SHAKE && SCREEN_SHAKE_RED) {
        canvas.style.backgroundColor = "rgb(255,50,50)"
    }

    // if (bStatsDebug) {
    if (1) {
        ctx.textAlign = "left";
        ctx.font = "10px jpfont";
        ctx.fillText("Drawcalls: " + Sprite.debug_drawcalls, 0, 10);
        ctx.fillText("fps: " + Math.floor(dt * 3750), 0, 20);
    }

    ctx.font = "10px jpfont";

    if (!Transition.bActive) {
        MOUSE_SPRITE.ox = MOUSE_SPRITE.currentAnimation.origin.x + (MOUSE_SPRITE.width * MOUSE_SPRITE.currentFrame);
        ctx.drawImage(SS, MOUSE_SPRITE.ox, MOUSE_SPRITE.currentAnimation.origin.y, MOUSE_SPRITE.width, MOUSE_SPRITE.height, Math.floor(MOUSE_SPRITE.x), Math.floor(MOUSE_SPRITE.y), MOUSE_SPRITE.width * MOUSE_SPRITE.scaleX, MOUSE_SPRITE.height * MOUSE_SPRITE.scaleY);
    }


    ctx.restore();
}

function startBtnCB(pParam) {
    mainState = MAIN_STATE.Game;

    let bLessonRange = false;
    switch (pParam.testType) {
        case "Training":
            bLessonRange = true;
            MAX_TURN = -1;
            break;
        case "Lesson_test":
            bLessonRange = true;
            // MAX_TURN = 3;
            MAX_TURN = 1; // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            break;
        case "Full_test":
            bLessonRange = false;
            MAX_TURN = 1;
            break;
        case "freemode":
            bLessonRange = false;
            MAX_TURN = 1;
            break;
    }

    Game1.load(pParam.choiceType, pParam.answerType, pParam.range, bLessonRange, pParam.testType, pParam.lessonNumber);
    MOUSE_SPRITE.y -= CANVAS_HEIGHT;
    if (!Game1.bGameInitialized) {
        Game1.init(pParam.testType);
    }

    Panel.resetTypeState("game1", Game1.STATE.Game);
    Button.resetTypeState("game1", Game1.STATE.Game);

}

function changeMainState(pNewState) {

    if (FadeEffect.bActive) FadeEffect.bActive = false;
    if (typeof pNewState == "number") {
        mainState = pNewState;
    } else {
        mainState = pNewState.state;
        MainMenu.clearKanaInterval();
    }


    switch (mainState) {
        case MAIN_STATE.Language:
            LanguageScreen.init();
            break;
        case MAIN_STATE.Introduction:
            if (!Introduction.bInit) {
                Introduction.init();
            }
            Introduction.changeState(Introduction.STATE.Main);
            break;

        case MAIN_STATE.Infos:
            if (!Infos.bInit) {
                Infos.init();
            }
            FadeEffect.fade({ callback: null, direction: "in", maxTimer: 0.01 });
            Infos.changeState(Infos.STATE.Main);
            break;
        case MAIN_STATE.FreeMode:
            if (!FreeMode.bInit) {
                FreeMode.init();
            }
            FadeEffect.fade({ callback: null, direction: "in", maxTimer: 0.01 });
            FreeMode.changeState(FreeMode.STATE.Main);
            break;
        case MAIN_STATE.Lessons:

            if (!SaveManager.SAVE_DATA["prologue"]) {
                changeMainState(MAIN_STATE.LessonTutorial);
            } else {
                if (!Lessons.bInit) {
                    Lessons.init();
                }
                FadeEffect.fade({ callback: null, direction: "in", maxTimer: 0.01 });
                Lessons.changeState(Lessons.STATE.Hiragana);
            }

            break;
        case MAIN_STATE.LessonTutorial:
            if (!LessonTutorial.bInit) {
                LessonTutorial.init();
            }
            FadeEffect.fade({ callback: null, direction: "in", maxTimer: 0.01 });
            LessonTutorial.changeState(LessonTutorial.STATE.Main);
            break;

        case MAIN_STATE.Error:
            ErrorScreen.init();
            ErrorScreen.changeState(ErrorScreen.STATE.Main);
            break;
    }
}

function toMainMenu() {

    if (!SaveManager.SAVE_DATA["intro"] && !MainMenu.bInit) {
        changeMainState(MAIN_STATE.Introduction);
        canvas.style.backgroundColor = CANVAS_ORIGIN_COLOR;
        return;
    }

    if (!MainMenu.bInit) {
        MainMenu.init();
    }
    canvas.style.backgroundColor = CANVAS_ORIGIN_COLOR;

    mainState = MAIN_STATE.Menu;


    MainMenu.changeState(MainMenu.STATE.Main);
    TRANSITION = true;

    if (MainMenu.bTitleFinish) {
        MainMenu.initKanaInterval();
        Button.currentList.forEach(b => {
            b.getTooltip().forEach(t => {
                t.currentFrame = 0;
            })
            if (b.bCanMove) b.setMoving(true);
        });
        Panel.currentList.forEach(p => {
            if (p.bCanMove) p.setMoving(true);
        });
    }

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

function displaySaving(pBool = true) {
    if (pBool) {
        SAVING = true;
        SAVING_SPRITE = new Sprite({ w: 42, h: 26 }, 400, CANVAS_HEIGHT, null, "sv");
        SAVING_SPRITE.addAnimation("arrive", { x: 342, y: 952 }, 5, [0.2, 0.1, 0.1, 0.1, 0.1], false);
        // SAVING_SPRITE.setAnimationCB("arrive", { cb: SAVING_SPRITE.changeAnimation.bind(SAVING_SPRITE), arg: "open" });
        SAVING_SPRITE.addAnimation("open", { x: 342, y: 978 }, 17, [0.15, 0.15, 0.1, 0.1, 0.15, 0.15, 0.15, 0.1, 0.3, 0.1, 0.15, 0.15, 0.15, 0.15, 0.15, 0.15, 0.15], false);
        SAVING_SPRITE.setAnimationCB("open", { cb: SAVING_SPRITE.changeAnimation.bind(SAVING_SPRITE), arg: "close" });
        SAVING_SPRITE.addAnimation("close", { x: 342, y: 1004 }, 9, [0.1, 0.1, 0.1, 0.1, 0.15, 0.15, 0.15, 0.15, 0.2], false);
        SAVING_SPRITE.setAnimationCB("close", { cb: SAVING_SPRITE.changeAnimation.bind(SAVING_SPRITE), arg: "down" });
        SAVING_SPRITE.addAnimation("down", { x: 342, y: 1030 }, 2, [1, 0.5], false);
        SAVING_SPRITE.setAnimationCB("down", { cb: displaySaving, arg: false });
        SAVING_SPRITE.setDestination({ x: 400, y: CANVAS_HEIGHT - 50 });
        SAVING_SPRITE.setMoveSpeed(0.5);

        SAVING_SPRITE.changeAnimation("arrive");
    } else {
        SAVING = false;
        SAVING_SPRITE = null;
    }
}