let canvas0 = document.getElementById("canvas0");
let canvas = document.getElementById("canvas");
canvas.style.fontKerning = "none";
canvas.style.textRendering = "optimizeSpeed";
canvas.style.letterSpacing = 0;
let ctx0 = canvas.getContext("2d", {willReadFrequently: true});
const ctx = canvas.getContext("2d");
let checkAssetsInterval = setInterval(checkAssetsLoading, 1000 / 60);
let interval;
// let lastUpdate = Date.now();
let lastUpdate = 0;

const SCALE = Object.freeze({
    STATE_1: 1, //? 450x300
    STATE_2: 2, //? 900x600
    STATE_3: 3, //? 1350x900
    STATE_4: 4, //? 1800x1200
    STATE_5: 5, //? 2250x1500
    STATE_6: 6, //? 2700x1800
    STATE_7: 7  //? 3150x2100
});
const scaleList = [{}];
let offWidth = 450;
let offHeight = 300;
let offSpeed = 0;
let offCanvasY = 0;
for (let i = 1; i <= 7; i++) {
    scaleList[i] = ({
        speed: 25 + offSpeed,
        canvasY: -300 + offCanvasY,
        width: offWidth,
        height: offHeight
    });
    offSpeed += 25;
    offCanvasY -= 300;
    offWidth += 450;
    offHeight += 300;
}

let currentScale = SCALE.STATE_2; //! AZE

let windowWidth = window.innerWidth;

if (windowWidth < 900) {
    currentScale = SCALE.STATE_1;
} else if (windowWidth < 1350) {
    currentScale = SCALE.STATE_2;
} else if (windowWidth <= 1920) {
    currentScale = SCALE.STATE_3;
} else if (windowWidth < 2250) {
    currentScale = SCALE.STATE_4;
} else if (windowWidth < 2700) {
    currentScale = SCALE.STATE_5;
} else if (windowWidth < 3150) {
    currentScale = SCALE.STATE_6;
} else {
    currentScale = SCALE.STATE_7;
}

let SCALE_X = currentScale;
let SCALE_Y = currentScale;

canvas.width = scaleList[currentScale].width;
canvas.height = scaleList[currentScale].height;

let CANVAS_WIDTH = canvas.width / SCALE_X;
let CANVAS_HEIGHT = canvas.height / SCALE_Y;
let FULLSCREEN = false;
// let CANVAS_SIZE
// canvas.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT)

const BLACK_COLOR = "rgba(0,0,0,1)";
const BLACK_COLOR_0 = "rgba(0,0,0,0)";
const WHITE_COLOR = "rgba(255,255,255,1)";
const WHITE_COLOR_0 = "rgba(255,255,255,0)";
const RED_COLOR = "rgba(255,0,0,1)";
const RED_COLOR_0 = "rgba(255,0,0,0)";

const GREY_100_COLOR = "rgba(100,100,100,1)";
const GREY_150_COLOR = "rgba(150,150,150,1)"; //? endGameMark shadow???
const GREY_150_COLOR_0 = "rgba(150,150,150,0)";
const GREY_162_COLOR = "rgba(162,162,162,1)"; //? keyboard instructions panel shadow
const GREY_192_COLOR_0 = "rgba(192,192,192,0)"; //? login/signup title shadow
const GREY_200_COLOR = "rgba(200,200,200,1)";

const RED_BTN_SDW_COLOR = "rgba(142,45,45,1)";
const RED_SCREENSHAKE_COLOR = "rgba(255,50,50,1)";
const GREEN_BOARD_SDW_COLOR = "rgba(18,72,39,1)"; //? DialogPanel / Infos.KanaPanel // All other green panels
const GREEN_BOARD_SDW_COLOR2 = "rgba(20,102,53,1)"; //? Lessons Hiragana/Katakana titles

const TEST_BTN_SDW_COLOR = "rgba(228,223,192,1)";
const TEST_BTN_HVR_COLOR = "rgba(172,50,50,1)";

const LESSON_BTN_SDW_COLOR = "rgba(176,150,124,1)";
const LESSON_BTN_SDW_COLOR_0 = "rgba(176,150,124,0)";
const LESSON_BTN_HVR_SDW_COLOR = "rgba(213,210,190,1)";
const LESSON_BTN_HVR_SDW_COLOR_0 = "rgba(213,210,190,0)";
const LESSON_BTN_HOVER_COLOR = "rgba(162,138,114,1)";
const LESSON_BTN_HOVER_COLOR_0 = "rgba(162,138,114,0)";

const ENTRYFIELD_SDW_COLOR_0 = "rgba(200,200,200,0)";
const ENTRYFIELD_HVR_SDW_COLOR_0 = "rgba(100,100,100,0)";

const CHOOSETYPE_SDW_COLOR = "rgba(217,213,188,1)";
const CHOOSETYPE_SDW_COLOR_0 = "rgba(217,213,188,0)"; //? choose type title panel shadow
const ENDGAMEMARK_COLOR = "rgba(215,30,30,1)";
const INACTIVE_SDW_COLOR = "rgba(181,205,190,1)"; //? shadow (quand "inactif") (switch buttons)

/*
"rgba(23,88,49,1)"          // kanaBtn shadow
"rgba(217,160,102,1)")   // user panel shadow
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

//? SETTINGS ---------------
let SETTINGS = false;
let MAIN_SPRITE_LIST = [];
let BG;
let SETTINGS_PANEL;
let SETTINGS_BTN;
let RESOLUTION_BTN;

let MUSIC_SPEAKER;
let SFX_SPEAKER;
let MUSIC_SPRITE;
let SFX_SPRITE;
let MUSIC_DOWN_BTN;
let MUSIC_UP_BTN;
let SFX_DOWN_BTN;
let SFX_UP_BTN;

let CLOSE_SETTINGS_BTN;
let FULLSCREEN_BTN;
let SETTINGS_PANEL_DATA = {
    x: 110,
    y: 0,
    w: 231,
    h: 56
}

let RESOLUTION_SETTINGS = false;
let RESOLUTION_PANEL;
let RESOLUTION_ANIM;
let RESOLUTION_PANEL_DATA = {
    x: 146,
    y: 84,
    w: 161,
    h: 121
}
//? ---------------------------

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
// let canvasTEST = document.getElementById("canvasTEST");
// let ctxTEST = canvasTEST.getContext("2d");
// let imgTEST = null;
// let imgTEST2 = null;
// ctxTEST.imageSmoothingEnabled = false;
// let myData = null;
// let bDataOk = false;
// let bTestEnd = false;
// let TESTNUM = 1;

// let CANVAS_TEST_WIDTH
// let CANVAS_TEST_HEIGHT
// if (TESTNUM == 1) {
//     CANVAS_TEST_WIDTH = (9*2)+(11*6);
//     CANVAS_TEST_HEIGHT = (9*2)+(11*3);
// } else {
//     CANVAS_TEST_WIDTH = (9*2)+(11*2);
//     CANVAS_TEST_HEIGHT = (9*2)+(11*2);
// }
//!------------



//TODO

//! Gestion taille écran au démarrage
// toast(window.innerWidth);


/**
 * DEBUG
 */
let log = console.log.bind(console);
let titleSpeed = 0.2; // 0.2 - 2

let bStatsDebug = 1;
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
    API_Login("aaaaaa","aaaaaa");
    mainState = MAIN_STATE.Menu;
    USER.name = "username";
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
    // ctx.mozImageSmoothingEnabled = false;

    // ARROWS = new Sprite({w: 450, h: 300}, 0, 0, null);
    // ARROWS.addAnimation("normal", {x: 1152, y: 944});
    // ARROWS.changeAnimation("normal");
    // MAIN_SPRITE_LIST.push(ARROWS.getSprite());

    SETTINGS_BTN = new Button({ w: 26, h: 26 }, CANVAS_WIDTH - 26, 0, null, {cb: openSettings, arg: "SETTINGS"}, "all", "",   "", 0, true);
    SETTINGS_BTN.setInactiveAnimation();
    SETTINGS_BTN.setAnimations({ x: 1344, y: 80});
    SETTINGS_BTN.getSprite().setIdTest("S");
    SETTINGS_BTN.setIdTest("S");
    //? Button added to currentList in toMainMenu()
    MAIN_SPRITE_LIST.push(SETTINGS_BTN.getSprite()); 

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

function openSettings() {

    let offsetY = 0;
    if (mainState == MAIN_STATE.Lessons && Lessons.state == Lessons.STATE.Lesson) {
        offsetY = CANVAS_HEIGHT;
    }

    SETTINGS = true;
    SETTINGS_BTN.setState(Button.STATE.Inactive);
    SETTINGS_BTN.getSprite().changeAnimation("inactive");
    Button.currentList.forEach(b => {
        if (b.type != "all") {
            b.setState(Button.STATE.Inactive);
        }
    });

    BG = new Sprite({ w: 1, h: 1 }, 0, 0 + offsetY, null, "normal", { x: CANVAS_WIDTH, y: CANVAS_HEIGHT });
    BG.addAnimation("normal", { x: 38, y: 3 });
    BG.changeAnimation("normal");
    BG.setIdTest("BG");
    BG.setAlpha(0);
    BG.fade(0.01);
    MAIN_SPRITE_LIST.push(BG);

    SETTINGS_PANEL = new Panel({ w: 231, h: 56 }, centerX(230), -56 + offsetY, null, "all", 0, "", 0, true);
    SETTINGS_PANEL.setIdTest("SETTINGS PANEL");
    SETTINGS_PANEL.getSprite().addAnimation("normal", {x: 1696, y: 128});
    SETTINGS_PANEL.getSprite().changeAnimation("normal");
    SETTINGS_PANEL.setDestination({ x: centerX(230), y: 0 + offsetY});
    SETTINGS_PANEL.setCanMove(true);
    SETTINGS_PANEL.setMovingSpeed(0.2);
    SETTINGS_PANEL.setMoving(true);
    Panel.currentList.push(SETTINGS_PANEL);
    MAIN_SPRITE_LIST.push(SETTINGS_PANEL.getSprite());

    RESOLUTION_BTN = new Button({ w: 32, h: 30 }, 11, 8, SETTINGS_PANEL, {cb: openResolutionPanel, arg: ""}, "all", "", "", 0, true);
    RESOLUTION_BTN.setIdTest("reso");
    RESOLUTION_BTN.setAnimatedBtnAnimations({ x: 1472, y: 0}, 7, [0.2, 0.1, 0.15, 0.2, 0.1, 0.15, 0.4]);
    RESOLUTION_BTN.getSprite().setIdTest("reso");
    Button.currentList.push(RESOLUTION_BTN);
    MAIN_SPRITE_LIST.push(RESOLUTION_BTN.getSprite());

    MUSIC_SPEAKER = new Sprite({ w: 16, h: 14 }, 67, 5, SETTINGS_PANEL);
    MUSIC_SPEAKER.setIdTest("bgm speaker");
    MUSIC_SPEAKER.addAnimation("normal", { x: 203, y: 96 });
    MUSIC_SPEAKER.addAnimation("mute", { x: 219, y: 96 });
    if (MUSIC_VOLUME === 0) {
        MUSIC_SPEAKER.changeAnimation("mute");
    } else {
        MUSIC_SPEAKER.changeAnimation("normal");
    }
    MAIN_SPRITE_LIST.push(MUSIC_SPEAKER.getSprite());

    SFX_SPEAKER = new Sprite({ w: 16, h: 14 }, 67, 25, SETTINGS_PANEL);
    SFX_SPEAKER.setIdTest("sfx speaker");
    SFX_SPEAKER.addAnimation("normal", { x: 203, y: 96 });
    SFX_SPEAKER.addAnimation("mute", { x: 219, y: 96 });
    if (SFX_VOLUME === 0) {
        SFX_SPEAKER.changeAnimation("mute");
    } else {
        SFX_SPEAKER.changeAnimation("normal");
    }
    MAIN_SPRITE_LIST.push(SFX_SPEAKER.getSprite());

    MUSIC_SPRITE = new Sprite({ w: 60, h: 16 }, 108, 4, SETTINGS_PANEL);
    MUSIC_SPRITE.setIdTest("bgm sp");
    MUSIC_SPRITE.addAnimation("0", { x: 672, y: 768 });
    MUSIC_SPRITE.addAnimation("1", { x: 672 + 60, y: 768 });
    MUSIC_SPRITE.addAnimation("2", { x: 672 + 60 * 2, y: 768 });
    MUSIC_SPRITE.addAnimation("3", { x: 672 + 60 * 3, y: 768 });
    MUSIC_SPRITE.addAnimation("4", { x: 672 + 60 * 4, y: 768 });
    MUSIC_SPRITE.addAnimation("5", { x: 672 + 60 * 5, y: 768 });
    MUSIC_SPRITE.addAnimation("6", { x: 672 + 60 * 6, y: 768 });
    MUSIC_SPRITE.addAnimation("7", { x: 672 + 60 * 7, y: 768 });
    MUSIC_SPRITE.addAnimation("8", { x: 672 + 60 * 8, y: 768 });
    MUSIC_SPRITE.addAnimation("9", { x: 672 + 60 * 9, y: 768 });
    MUSIC_SPRITE.addAnimation("10", { x: 672 + 60 * 10, y: 768 });
    MUSIC_SPRITE.changeAnimation(MUSIC_VOLUME * 10);
    MAIN_SPRITE_LIST.push(MUSIC_SPRITE);

    SFX_SPRITE = new Sprite({ w: 60, h: 16 }, 108, 24, SETTINGS_PANEL);
    SFX_SPRITE.setIdTest("sfx sp");
    SFX_SPRITE.addAnimation("0", { x: 672, y: 768 });
    SFX_SPRITE.addAnimation("1", { x: 672 + 60, y: 768 });
    SFX_SPRITE.addAnimation("2", { x: 672 + 60 * 2, y: 768 });
    SFX_SPRITE.addAnimation("3", { x: 672 + 60 * 3, y: 768 });
    SFX_SPRITE.addAnimation("4", { x: 672 + 60 * 4, y: 768 });
    SFX_SPRITE.addAnimation("5", { x: 672 + 60 * 5, y: 768 });
    SFX_SPRITE.addAnimation("6", { x: 672 + 60 * 6, y: 768 });
    SFX_SPRITE.addAnimation("7", { x: 672 + 60 * 7, y: 768 });
    SFX_SPRITE.addAnimation("8", { x: 672 + 60 * 8, y: 768 });
    SFX_SPRITE.addAnimation("9", { x: 672 + 60 * 9, y: 768 });
    SFX_SPRITE.addAnimation("10", { x: 672 + 60 * 10, y: 768 });
    SFX_SPRITE.changeAnimation(SFX_VOLUME * 10);
    MAIN_SPRITE_LIST.push(SFX_SPRITE);

    MUSIC_DOWN_BTN = new Button({ w: 17, h: 17 }, 88, 4, SETTINGS_PANEL, Sound.decreaseMusicVolume, "all", "", "", 0, true);
    MUSIC_DOWN_BTN.setIdTest("bgm down");
    MUSIC_DOWN_BTN.setAnimations({ x: 0, y: 95 });
    Button.currentList.push(MUSIC_DOWN_BTN);
    MAIN_SPRITE_LIST.push(MUSIC_DOWN_BTN.getSprite());

    MUSIC_UP_BTN = new Button({ w: 17, h: 17 }, 172, 4, SETTINGS_PANEL, Sound.increaseMusicVolume, "all", "", "", 0, true);
    MUSIC_UP_BTN.setIdTest("bgm up");
    MUSIC_UP_BTN.setAnimations({ x: 51, y: 95 });
    Button.currentList.push(MUSIC_UP_BTN);
    MAIN_SPRITE_LIST.push(MUSIC_UP_BTN.getSprite());

    SFX_DOWN_BTN = new Button({ w: 17, h: 17 }, 88, 24, SETTINGS_PANEL, Sound.decreaseSfxVolume, "all", "", "", 0, true);
    SFX_DOWN_BTN.setIdTest("sfx down");
    SFX_DOWN_BTN.setAnimations({ x: 0, y: 95 });
    Button.currentList.push(SFX_DOWN_BTN);
    MAIN_SPRITE_LIST.push(SFX_DOWN_BTN.getSprite());

    SFX_UP_BTN = new Button({ w: 17, h: 17 }, 172, 24, SETTINGS_PANEL, Sound.increaseSfxVolume, "all", "", "", 0, true);
    SFX_UP_BTN.setIdTest("sfx up");
    SFX_UP_BTN.setAnimations({ x: 51, y: 95 });
    Button.currentList.push(SFX_UP_BTN);
    MAIN_SPRITE_LIST.push(SFX_UP_BTN.getSprite());
    
    FULLSCREEN_BTN = new Button({ w: 23, h: 22 }, 198, 19, SETTINGS_PANEL, toggleFullScreen, "all", "", "", 0, true);
    FULLSCREEN_BTN.setIdTest("fullscreen");
    if (FULLSCREEN) {
        FULLSCREEN_BTN.setAnimations({x: 1344, y: 54});
    } else {
        FULLSCREEN_BTN.setAnimations({x: 1344, y: 32});
    }
    Button.currentList.push(FULLSCREEN_BTN);
    MAIN_SPRITE_LIST.push(FULLSCREEN_BTN.getSprite());

    CLOSE_SETTINGS_BTN = new Button({ w: 25, h: 11}, 197, 0, SETTINGS_PANEL, {cb: closeSettings, arg: ""}, "all", "", "", 0, true);
    CLOSE_SETTINGS_BTN.setIdTest("close");
    CLOSE_SETTINGS_BTN.setAnimations({x: 1776, y: 96});
    Button.currentList.push(CLOSE_SETTINGS_BTN);
    MAIN_SPRITE_LIST.push(CLOSE_SETTINGS_BTN.getSprite());

}

function closeSettings() {
    let offsetY = 0;
    if (mainState == MAIN_STATE.Lessons && Lessons.state == Lessons.STATE.Lesson) {
        offsetY = CANVAS_HEIGHT;
    }

    SETTINGS_PANEL.setMoveCB(SETTINGS_PANEL.delete.bind(SETTINGS_PANEL), "");
    SETTINGS_PANEL.setStartPos({x: centerX(230), y: 0 + offsetY});
    SETTINGS_PANEL.setDestination({x: centerX(230), y: -56 + offsetY});
    SETTINGS_PANEL.setCanMove(true);
    SETTINGS_PANEL.setMoving(true);
    BG.delete = true;
    MUSIC_SPEAKER.delete = true;
    SFX_SPEAKER.delete = true;
    MUSIC_SPRITE.delete = true;
    SFX_SPRITE.delete = true;

    SETTINGS_BTN.setState(Button.STATE.Normal);
    SETTINGS_BTN.getSprite().changeAnimation("normal");
    SETTINGS = false;
    Button.currentList.forEach(b => {
        b.setState(Button.STATE.Normal);
    });
}

function openResolutionPanel() {

    let offsetY = 0;
    if (mainState == MAIN_STATE.Lessons && Lessons.state == Lessons.STATE.Lesson) {
        offsetY = CANVAS_HEIGHT;
    }

    Button.currentList.forEach(b => {
        if (b.type == "all") {
            b.setState(Button.STATE.Inactive);
        }
    });

    RESOLUTION_SETTINGS = true;

    RESOLUTION_PANEL = new Sprite({w: 450, h: 300}, 0, 0 + offsetY, null, "all");
    RESOLUTION_PANEL.addAnimation("normal", {x: 1152, y: 944});
    RESOLUTION_PANEL.changeAnimation("normal");
    MAIN_SPRITE_LIST.push(RESOLUTION_PANEL);

    RESOLUTION_ANIM = new Sprite({ w: 63, h: 70}, 230, 106 + offsetY);
    RESOLUTION_ANIM.addAnimation("normal", {x: 1152, y: 1244}, 6, [0.5, 0.2, 0.1, 0.5, 0.2, 0.1]);
    RESOLUTION_ANIM.changeAnimation("normal");
    MAIN_SPRITE_LIST.push(RESOLUTION_ANIM);

    let offY = 0;
    for (let i = 1; i <= 7; i++) {
        CHECK = new CheckboxBtn({ w: 8, h: 9 }, 160, 100 + offY + offsetY, null, {cb: changeResolution, arg: i}, "all", "", "SCALE_" + i, 0, true);
        CHECK.setBoxCollider(54, 9, 0, 0);
        CHECK.setGroup(1);
        CHECK.setAnimations({x: 1728, y: 96});
        CHECK.setOffsets(30, 8);
        CHECK.setFontColor("rgba(191,188,168,1)", BLACK_COLOR, "rgba(191,188,168,1)", WHITE_COLOR);
        Button.currentList.push(CHECK);
        MAIN_SPRITE_LIST.push(CHECK.getSprite());
        offY += 12;
        CheckboxBtn.checklist[CHECK.label] = CHECK;
    }
    CheckboxBtn.checklist["SCALE_" + currentScale].check();
}

function closeResolutionPanel() {
    for (let i = 1; i <= 7; i++) {
        CheckboxBtn.checklist["SCALE_" + i].delete();
    }
    CheckboxBtn.checklist = CheckboxBtn.checklist.filter(b => {
        return b.group != 1;
    });
    RESOLUTION_PANEL.delete = true;
    RESOLUTION_ANIM.delete = true;

    RESOLUTION_SETTINGS = false;

    Button.currentList.forEach(b => {
        if (b.type == "all") {
            if (b.id_test != "S") b.setState(Button.STATE.Normal);
        }
    });
}

function testToast(a) {
    toast("Toast !", "d", 0);
}

function testSettingBtn(pArg) {
    // log(pArg);
    toast(window.innerWidth);
    toast(window.navigator.userAgent)
    log(window.navigator.userAgent)
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


    //TODO
    //! いずれ put Button/Panel currentLists update() HERE

    /*
    Simple:
    - freeMode
    - infos
    - introduction
    - lessons 意外！
    - lessonTutorial
    - mainMenu

    Condition:
    - game1
    - login + (bMoving condition inside)

    */

    Button.currentList.forEach(b => {
        if (b.bMoving) {
            b.update(dt);
        }
    });



    Sprite.manageBeforeUpdating(MAIN_SPRITE_LIST, dt);
    MAIN_SPRITE_LIST = MAIN_SPRITE_LIST.filter(sp => {
        return !sp.delete;
    });

    MOUSE_SPRITE.update(dt);
    if (Sound.bPlayingKana) {
        if (Sound.list[Sound.currentPlayingKana].sound.ended) {
            Sound.bPlayingKana = false;
            Sound.currentPlayingKana = "";
            Button.currentList.forEach(b => {
                if (b instanceof SoundBtn) {
                    b.setState(Button.STATE.Normal);
                    b.getSprite().changeAnimation("normal");
                }
            });
        }
    }

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
        canvas.style.backgroundColor = RED_SCREENSHAKE_COLOR;
    }

    let offset = 0;
    if (mainState == MAIN_STATE.Lessons && Lessons.state == Lessons.STATE.Lesson) {
        offset = CANVAS_HEIGHT;
    }
    // if (bStatsDebug) {
    if (1) {
        ctx.textAlign = "left";
        ctx.font = "10px jpfont";
        ctx.fillText("Drawcalls: " + Sprite.debug_drawcalls, 0, 10 + offset);
        ctx.fillText("fps: " + Math.floor((1000/dt)/1000), 0, 20 + offset);
    }

    if (bStatsDebug) {
        ctx.fillStyle = BLACK_COLOR;
        // ctx.font = "16px pgfont";

        ctx.fillText("ButtonList : " + Button.list.length, 0, 50 + offset);
        ctx.fillText("ButtonCurrent : " + Button.currentList.length, 0, 60 + offset);
        // ctx.fillText("BGSPRITE List : " + MainMenu.randomKanaSpriteList.length, 0, 300);
        ctx.fillText("PanelList : " + Panel.list.length, 0, 70 + offset);
        ctx.fillText("PanelCurrent : " + Panel.currentList.length, 0, 80 + offset);
        ctx.fillText("MAIN_SPRITE : " + MAIN_SPRITE_LIST.length, 0, 90 + offset);
        // ctx.fillText("MainMenuList : " + MainMenu.mainList.length, 0, 140);
        // ctx.fillText("BGSPRITE List : " + MainMenu.randomKanaSpriteList.length, 0, 300);
    }

    ctx.font = "10px jpfont";

    if (!Transition.bActive) {

        if (!Game1.bStartTransition) {
            Sprite.manageBeforeDrawing(MAIN_SPRITE_LIST);
        }

        MOUSE_SPRITE.ox = MOUSE_SPRITE.currentAnimation.origin.x + (MOUSE_SPRITE.width * MOUSE_SPRITE.currentFrame);
        ctx.drawImage(SS, MOUSE_SPRITE.ox, MOUSE_SPRITE.currentAnimation.origin.y, MOUSE_SPRITE.width, MOUSE_SPRITE.height, Math.floor(MOUSE_SPRITE.x), Math.floor(MOUSE_SPRITE.y), MOUSE_SPRITE.width * MOUSE_SPRITE.scaleX, MOUSE_SPRITE.height * MOUSE_SPRITE.scaleY);
    }

    // ctx.drawImage(myData, 0, 0,100,100,0,0,100,100);
    // if (myData != null && bDataOk) {
    //     if (TESTNUM == 1) {
    //         ctx.drawImage(imgTEST, 330, 200);
    //     } else {
    //         ctx.drawImage(imgTEST2, 330, 150);
    //     }
    // }


    if (FadeEffect.bActive) {
        FadeEffect.draw(ctx);
    }

    if (Transition.bActive) {
        Transition.draw(ctx);
    }


    // ctx.drawImage(SS, 0, 0, test.width, test.height, test.x, test.y, test.width, test.height);


    ctx.restore();

    //! TEST ------------------------
    // if (!bTestEnd) {

    //     canvasTEST.width = CANVAS_TEST_WIDTH;
    //     canvasTEST.height = CANVAS_TEST_HEIGHT;
    //     if (TESTNUM == 1) {

    //         ctxTEST.clearRect(0, 0, canvasTEST.width, canvasTEST.height);
    //         ctxTEST.save();
    //         ctxTEST.scale(1, 1);
    //         // ctxTEST.drawImage(SS, 0, 0, 37, 34, 0, 0, 37, 34);
    //         let originX = 0;
    //         let originY = 0;
    //         ctxTEST.drawImage(SS, 380, 748, 9, 9, originX, 0, 9,9);
    //         ctxTEST.drawImage(SS, 389, 748, 11, 9, originX+9+(11*0), 0, 11,9);
    //         ctxTEST.drawImage(SS, 389, 748, 11, 9, originX+9+(11*1), 0, 11,9);
    //         ctxTEST.drawImage(SS, 427, 748, 11, 9, originX+9+(11*2), 0, 11,9);
    //         ctxTEST.drawImage(SS, 438, 748, 11, 9, originX+9+(11*3), 0, 11,9);
    //         ctxTEST.drawImage(SS, 389, 748, 11, 9, originX+9+(11*4), 0, 11,9);
    //         ctxTEST.drawImage(SS, 389, 748, 11, 9, originX+9+(11*5), 0, 11,9);
    //         ctxTEST.drawImage(SS, 400, 748, 9, 9, originX+9+(11*6), 0, 9,9);
    
    //         ctxTEST.drawImage(SS, 380, 757, 9, 11, originX, originY+9, 9,11);
    //         ctxTEST.drawImage(SS, 380, 757, 9, 11, originX, originY+9+(11*1), 9,11);
    //         ctxTEST.drawImage(SS, 380, 757, 9, 11, originX, originY+9+(11*2), 9,11);
    
    //         ctxTEST.drawImage(SS, 400, 757, 9, 11, originX+9+(11*6), originY+9, 9,11);
    //         ctxTEST.drawImage(SS, 400, 757, 9, 11, originX+9+(11*6), originY+9+(11*1), 9,11);
    //         ctxTEST.drawImage(SS, 400, 757, 9, 11, originX+9+(11*6), originY+9+(11*2), 9,11);
    
    //         ctxTEST.drawImage(SS, 380, 768, 9, 9, originX, originY+9+(11*3), 9,9);
            
    //         ctxTEST.drawImage(SS, 389, 768, 11, 9, originX+9+(11*0), originY+9+(11*3), 11,9);
    //         ctxTEST.drawImage(SS, 389, 768, 11, 9, originX+9+(11*1), originY+9+(11*3), 11,9);
    //         ctxTEST.drawImage(SS, 427, 757, 11, 9, originX+9+(11*2), originY+9+(11*3), 11,9);
    //         ctxTEST.drawImage(SS, 438, 757, 11, 9, originX+9+(11*3), originY+9+(11*3), 11,9);
    //         ctxTEST.drawImage(SS, 389, 768, 11, 9, originX+9+(11*4), originY+9+(11*3), 11,9);
    //         ctxTEST.drawImage(SS, 389, 768, 11, 9, originX+9+(11*5), originY+9+(11*3), 11,9);
    //         ctxTEST.drawImage(SS, 400, 768, 9, 9, originX+9+(11*6), originY+9+(11*3), 9,9);
    
    //         ctxTEST.drawImage(SS, 389, 756, 1, 1, 9, 9, 11*6, 11*3);
    
    //         if (myData == null) {
    //             myData = canvasTEST.toDataURL("image/png").replace("image/png");
    //             imgTEST = null;
    //             imgTEST = new Image();
    //             imgTEST.onload = function() {
    //                 bDataOk = true;
    //             }
    //             imgTEST.src = myData;
    //         }
    //         ctxTEST.restore();
    //         bTestEnd = true;
    //     } else {
    //         ctxTEST.clearRect(0, 0, canvasTEST.width, canvasTEST.height);
    //         ctxTEST.save();
    //         ctxTEST.scale(1, 1);
    //         let originX = 0;
    //         let originY = 0;

    //         //? HAUT
    //         ctxTEST.drawImage(SS, 380, 748, 9, 9, originX, 0, 9,9);
    //         ctxTEST.drawImage(SS, 389, 748, 11, 9, originX+9+(11*0), 0, 11,9);
    //         ctxTEST.drawImage(SS, 389, 748, 11, 9, originX+9+(11*1), 0, 11,9);
    //         ctxTEST.drawImage(SS, 400, 748, 9, 9, originX+9+(11*2), 0, 9,9);
    
    //         //? GAUCHE
    //         ctxTEST.drawImage(SS, 380, 757, 9, 11, originX, originY+9, 9,11);
    //         ctxTEST.drawImage(SS, 380, 757, 9, 11, originX, originY+9+(11*1), 9,11);
    //         ctxTEST.drawImage(SS, 380, 768, 9, 9, originX, originY+9+(11*2), 9,9);
    
    //         //? DROITE
    //         ctxTEST.drawImage(SS, 400, 757, 9, 11, originX+9+(11*2), originY+9, 9,11);
    //         ctxTEST.drawImage(SS, 400, 757, 9, 11, originX+9+(11*2), originY+9+(11*1), 9,11);
    
    //         //? BAS
    //         ctxTEST.drawImage(SS, 389, 768, 11, 9, originX+9+(11*0), originY+9+(11*2), 11,9);
    //         ctxTEST.drawImage(SS, 389, 768, 11, 9, originX+9+(11*1), originY+9+(11*2), 11,9);

    //         ctxTEST.drawImage(SS, 400, 768, 9, 9, originX+9+(11*2), originY+9+(11*2), 9,9);
    
    //         //? CENTRE
    //         ctxTEST.drawImage(SS, 389, 756, 1, 1, 9, 9, 11*2, 11*2);
    
    //         if (myData == null) {
    //             myData = canvasTEST.toDataURL("image/png").replace("image/png");
    //             imgTEST2 = null;
    //             imgTEST2 = new Image();
    //             imgTEST2.onload = function() {
    //                 bDataOk = true;
    //             }
    //             imgTEST2.src = myData;
    //         }
    //         ctxTEST.restore();
    //         bTestEnd = true;
    //     }

        
    // }
    //! TEST ------------------------

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

    SETTINGS_BTN.y = 0;
    SETTINGS_BTN.setState(Button.STATE.Normal);
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

    for (let j = 1; j <= 7; j++) {

        offX = 0;
        offY = 0;
        columnsCount = 0;
        kanaCount = 0;
        frameCount = 0;
        kanaWidth = 34;
        startPos = 170;

        ctx0.clearRect(0, 0, canvas.width, canvas.height);
        ctx0.save();
        ctx0.scale(j, j);
    
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
            imageData = ctx0.getImageData(0, 0, kanaWidth * j, 34 * j);
    
            if (frameCount == KANA[kanaArray[kanaCount]].frames.length) { //
                kanaCount++;
                frameCount = 0;
            }
    
            KANA[kanaArray[kanaCount]].imageData[j].push(imageData); // 1
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

    // ctx0.clearRect(0, 0, canvas.width, canvas.height);
    // ctx0.save();
    // ctx0.scale(SCALE_X, SCALE_Y);

    // for (let i = 0; i < 419; i++) {

    //     if (i == 104) {
    //         kanaWidth = 38;
    //         startPos = 544;
    //         offX = 0;
    //         offY = 0;
    //         columnsCount = 0;
    //     } else if (i == 208) {
    //         kanaWidth = 34;
    //         startPos = 918;
    //         offX = 0;
    //         offY = 0;
    //         columnsCount = 0;
    //     } else if (i == 316) {
    //         kanaWidth = 38;
    //         startPos = 1292;
    //         offX = 0;
    //         offY = 0;
    //         columnsCount = 0;
    //     }

    //     ctx0.drawImage(SS, 0 + offX, startPos + offY, kanaWidth, 34, 0, 0, kanaWidth, 34);
    //     imageData = ctx0.getImageData(0, 0, kanaWidth * SCALE_X, 34 * SCALE_Y);

    //     if (frameCount == KANA[kanaArray[kanaCount]].frames.length) { //
    //         kanaCount++;
    //         frameCount = 0;
    //     }

    //     KANA[kanaArray[kanaCount]].imageData.push(imageData); // 1
    //     frameCount++;

    //     offX += kanaWidth;
    //     columnsCount++;
    //     if (columnsCount == nbColumns) {
    //         columnsCount = 0;
    //         offX = 0;
    //         offY += 34;
    //     }

    // }

    // ctx0.restore();
    // ctx0.clearRect(0, 0, canvas.width, canvas.height);

    // offX = 0;
    // offY = 0;
    // columnsCount = 0;
    // kanaCount = 0;
    // frameCount = 0;
    // kanaWidth = 34;
    // startPos = 170;

    // ctx0.save();
    // ctx0.scale(SCALE_X+1, SCALE_Y+1);

    // for (let i = 0; i < 419; i++) {

    //     if (i == 104) {
    //         kanaWidth = 38;
    //         startPos = 544;
    //         offX = 0;
    //         offY = 0;
    //         columnsCount = 0;
    //     } else if (i == 208) {
    //         kanaWidth = 34;
    //         startPos = 918;
    //         offX = 0;
    //         offY = 0;
    //         columnsCount = 0;
    //     } else if (i == 316) {
    //         kanaWidth = 38;
    //         startPos = 1292;
    //         offX = 0;
    //         offY = 0;
    //         columnsCount = 0;
    //     }

    //     ctx0.drawImage(SS, 0 + offX, startPos + offY, kanaWidth, 34, 0, 0, kanaWidth, 34);
    //     imageData = ctx0.getImageData(0, 0, kanaWidth * (SCALE_X+1), 34 * (SCALE_Y+1));

    //     if (frameCount == KANA[kanaArray[kanaCount]].frames.length) { //
    //         kanaCount++;
    //         frameCount = 0;
    //     }

    //     KANA[kanaArray[kanaCount]].imageData2.push(imageData); // 1
    //     frameCount++;

    //     offX += kanaWidth;
    //     columnsCount++;
    //     if (columnsCount == nbColumns) {
    //         columnsCount = 0;
    //         offX = 0;
    //         offY += 34;
    //     }

    // }

    // ctx0.restore();
    // ctx0.clearRect(0, 0, canvas.width, canvas.height);
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