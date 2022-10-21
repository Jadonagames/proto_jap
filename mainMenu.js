class MainMenu {

    static list = [];
    static randomKanaSpriteList = [];
    static mainList = [];
    static optionsList = [];
    static creditsList = [];

    static bInit = false;
    static bTitleFinish = false;

    kanaInterval = null;
    muteBtn = null;


    static STATE = Object.freeze({
        Main: 0,
        Options: 1,
        Credits: 2,
        Transition: 3
    })

    static state = MainMenu.STATE.Main;

    static randomKanaList = [];

    constructor() {

    }

    static init() {

        Sound.list["maintheme"].audioPlay();

        // let sizeBtn = new Button({ w: 22, h: 22, v: 8 }, CANVAS_WIDTH - 60, 10, null, {cb: toggleCanvasSize, arg: true}, "mainmenu", MainMenu.STATE.Main, "", 4);
        // MainMenu.mainList.push(sizeBtn.getSprite());

        // let sizeBtn2 = new Button({ w: 22, h: 22, v: 8 }, CANVAS_WIDTH - 60, 35, null, {cb: toggleCanvasSize, arg: false}, "mainmenu", MainMenu.STATE.Main, "", 4);
        // MainMenu.mainList.push(sizeBtn2.getSprite());

        // let fullscreenBtn = new Button({ w: 23, h: 22 }, CANVAS_WIDTH - 60, 60, null, toggleFullScreen, "mainmenu", MainMenu.STATE.Main, "", 0, true);
        // fullscreenBtn.setAnimations({x: 1344, y: 32});
        // MainMenu.mainList.push(fullscreenBtn.getSprite());

        // this.hira = "|あ|い|う|え|お|か|き|く|け|こ|さ|し|す|せ|そ|た|ち|つ|て|と|な|に|ぬ|ね|の|は|ひ|ふ|へ|ほ|ま|み|む|め|も|や|ゆ|よ|ら|り|る|れ|ろ|わ|を|ん|";
        // this.hira2 = "|が|ぎ|ぐ|げ|ご|ざ|じ|ず|ぜ|ぞ|だ|ぢ|づ|で|ど|ば|び|ぶ|べ|ぼ|ぱ|ぴ|ぷ|ぺ|ぽ|";
        // this.kata = "|ア|イ|ウ|エ|オ|カ|キ|ク|ケ|コ|サ|シ|ス|セ|ソ|タ|チ|ツ|テ|ト|ナ|ニ|ヌ|ネ|ノ|ハ|ヒ|フ|ヘ|ホ|マ|ミ|ム|メ|モ|ヤ|ユ|ヨ|ラ|リ|ル|レ|ロ|ワ|ヲ|ン|";
        // this.kata2 = "|ガ|ギ|グ|ゲ|ゴ|ザ|ジ|ズ|ゼ|ゾ|ダ|ヂ|ヅ|デ|ド|バ|ビ|ブ|ベ|ボ|パ|ピ|プ|ペ|ポ|";

        // 722 . 136 // 4 rows // 23 cols
        MainMenu.randomKanaList = [];
        let x = 1003;
        let count = 0;
        let y = 119;
        for (let i = 0; i < 92; i++) {
            MainMenu.randomKanaList.push({ x: x, y: y });
            x += 12;
            count++;
            if (count == 23) {
                count = 0;
                y += 12;
                x = 1003;
            }
        }

        MainMenu.bInit = true;

        let titleImg = new Sprite({ w: 178, h: 101 }, centerX(178), -101, null, "t");
        titleImg.addAnimation("normal", { x: 382, y: 1 });
        titleImg.changeAnimation("normal");
        titleImg.setDestination({ x: centerX(178), y: centerY(101) });
        titleImg.setMoveSpeed(titleSpeed); // normal : 2
        MainMenu.mainList.push(titleImg);

        let subtitleImg = new Sprite({ w: 129, h: 36 }, centerX(129) + 5, 106, null, "mainmenu");
        subtitleImg.addAnimation("normal", { x: 574, y: 0 });
        subtitleImg.changeAnimation("normal");
        subtitleImg.setAlpha(0);
        MainMenu.mainList.push(subtitleImg);

        let subtitlePanel = new Panel({ w: 129, h: 36, v: 1 }, centerX(129) + 3, 109, null, "mainmenu", MainMenu.STATE.Main, "main_subtitle", 2);
        subtitlePanel.setAlpha(0);
        subtitlePanel.setFontColor(LESSON_BTN_SDW_COLOR);
        MainMenu.mainList.push(subtitlePanel.getSprite());

        let hiraAImg = new Sprite({ w: 50, h: 50 }, centerX(50, 110), 0, null, "tm");      //? 0 -> originY
        hiraAImg.addAnimation("normal", { x: 575, y: 37 });
        hiraAImg.changeAnimation("normal");
        hiraAImg.setOriginPos({ x: centerX(50, 110), y: 0 });
        hiraAImg.setOriginDestination({ x: centerX(50, 110), y: 28 });
        hiraAImg.setMovingType(Sprite.MOVING_TYPE.ComeAndGo);
        hiraAImg.setDestination({ x: centerX(50, 110), y: 28 });
        hiraAImg.setAlpha(0);
        MainMenu.mainList.push(hiraAImg);

        let kataAImg = new Sprite({ w: 50, h: 50 }, centerX(50, 110, 1), 28, null, "tm");   //? 28 -> originY
        kataAImg.addAnimation("normal", { x: 627, y: 37 });
        kataAImg.changeAnimation("normal");
        kataAImg.setOriginPos({ x: centerX(50, 110, 1), y: 28 });
        kataAImg.setOriginDestination({ x: centerX(50, 110, 1), y: 0 });
        kataAImg.setMovingType(Sprite.MOVING_TYPE.ComeAndGo);
        kataAImg.setDestination({ x: centerX(50, 110, 1), y: 0 });
        kataAImg.setAlpha(0);
        MainMenu.mainList.push(kataAImg);

        let flagImg = new Sprite({ w: 21, h: 17 }, 165, 58, titleImg, "fl");
        flagImg.addAnimation("close", { x: 382, y: 120 });
        flagImg.addAnimation("open", { x: 382, y: 120 }, 3, [0.15, 0.06, 0.3], false);
        flagImg.addAnimation("normal", { x: 382, y: 103 }, 6, 0.2);
        flagImg.setAnimationCB("open", { cb: flagImg.changeAnimation.bind(flagImg), arg: "normal" });
        flagImg.changeAnimation("close");
        MainMenu.mainList.push(flagImg);

        let panelLength = USER.name.length * 5;

        let userPanel = new Panel({ w: 1, h: 14 }, -panelLength - 5, CANVAS_HEIGHT - 14, null, "mainmenu", MainMenu.STATE.Main, "", -1, true);
        userPanel.setNumberBool(true);
        userPanel.setTextOverflow(true);
        userPanel.setAlignText(0);
        userPanel.setOffsets(0, 11);
        userPanel.setLabel(USER.name);
        userPanel.setFontColor("rgba(217,160,102,1)")
        userPanel.getSprite().addAnimation("normal", { x: 11, y: 77 });
        userPanel.getSprite().changeAnimation("normal");
        userPanel.getSprite().setScale(panelLength, 1);
        userPanel.totalWidth = panelLength;
        userPanel.setDestination({ x: 13, y: CANVAS_HEIGHT - 14 });
        userPanel.setCanMove(true);
        userPanel.setMovingSpeed(0.5);
        MainMenu.mainList.push(userPanel.getSprite());

        let userPanelLeft = new Sprite({ w: 13, h: 14 }, -13, 0, userPanel);
        userPanelLeft.addAnimation("normal", { x: 0, y: 77 });
        userPanelLeft.changeAnimation("normal");
        MainMenu.mainList.push(userPanelLeft);

        let userPanelRight = new Sprite({ w: 5, h: 14 }, userPanel.totalWidth, 0, userPanel);
        userPanelRight.addAnimation("normal", { x: 13, y: 77 });
        userPanelRight.changeAnimation("normal");
        MainMenu.mainList.push(userPanelRight);


        let creditsBtn = new Button({ w: 110, h: 22, v: 8 }, centerX(110), 360, null, {
            cb: FadeEffect.fade.bind(FadeEffect),
            arg: {
                callback: {
                    cb: MainMenu.changeState.bind(MainMenu),
                    arg: MainMenu.STATE.Credits
                },
                direction: "out", maxTimer: 0.01
            }
        }, "mainmenu", MainMenu.STATE.Main, "Credits", 4);
        creditsBtn.setFontColor(RED_BTN_SDW_COLOR);
        creditsBtn.setDestination({ x: centerX(110), y: 265 });
        creditsBtn.setCanMove(true);
        creditsBtn.setMovingSpeed(0.8);
        MainMenu.mainList.push(creditsBtn.getSprite());

        let optionsBtn = new Button({ w: 110, h: 22, v: 8 }, centerX(110), 350, null,
            {
                cb: FadeEffect.fade.bind(FadeEffect),
                arg: {
                    callback: {
                        cb: MainMenu.changeState.bind(MainMenu),
                        arg: MainMenu.STATE.Options
                    },
                    direction: "out", maxTimer: 0.01
                }
            }
            , "mainmenu", MainMenu.STATE.Main, "Settings", 4);

        optionsBtn.setFontColor(RED_BTN_SDW_COLOR);
        optionsBtn.setDestination({ x: centerX(110), y: 237 });
        optionsBtn.setCanMove(true);
        optionsBtn.setMovingSpeed(0.75);
        MainMenu.mainList.push(optionsBtn.getSprite());

        let infosBtn = new Button({ w: 110, h: 22, v: 8 }, centerX(110), 340, null, { cb: FadeEffect.fade.bind(FadeEffect), arg: { callback: { cb: changeMainState, arg: { state: MAIN_STATE.Infos, from: "mainmenu" } }, direction: "out", maxTimer: 0.01 } }, "mainmenu", MainMenu.STATE.Main, "kana_boards", 4);
        infosBtn.setDestination({ x: centerX(110), y: 209 });
        infosBtn.setCanMove(true);
        infosBtn.setMovingSpeed(0.70);
        infosBtn.setFontColor(RED_BTN_SDW_COLOR);
        MainMenu.mainList.push(infosBtn.getSprite());


        let freeModeBtn = new Button({ w: 110, h: 22, v: 8 }, centerX(110), 330, null,
            {
                cb: FadeEffect.fade.bind(FadeEffect),
                arg: {
                    callback: {
                        cb: changeMainState,
                        arg: { state: MAIN_STATE.FreeMode, from: "mainmenu" }
                    },
                    direction: "out", maxTimer: 0.01
                }
            }
            , "mainmenu", MainMenu.STATE.Main, "Free_mode", 4);

        // let freeModeBtn = new Button({ w: 110, h: 22, v: 8 }, centerX(110), 330, null, null, "mainmenu", MainMenu.STATE.Main, "Free_mode", 4);
        freeModeBtn.setDestination({ x: centerX(110), y: 181 });
        freeModeBtn.setCanMove(true);
        freeModeBtn.setMovingSpeed(0.65);
        freeModeBtn.setFontColor(RED_BTN_SDW_COLOR);
        MainMenu.mainList.push(freeModeBtn.getSprite());

        let lessonsBtn = new Button({ w: 110, h: 22, v: 8 }, centerX(110), 320, null, { cb: FadeEffect.fade.bind(FadeEffect), arg: { callback: { cb: changeMainState, arg: { state: MAIN_STATE.Lessons, from: "mainmenu" } }, direction: "out", maxTimer: 0.01 } }, "mainmenu", MainMenu.STATE.Main, "Lessons", 4);
        lessonsBtn.setFontColor(RED_BTN_SDW_COLOR);
        lessonsBtn.setDestination({ x: centerX(110), y: 153 });
        lessonsBtn.setCanMove(true);
        lessonsBtn.setMovingSpeed(0.6);
        MainMenu.mainList.push(lessonsBtn.getSprite());


        // let testtoastPanel = new ToastPanel({ w: 450, h: 20, v: 1 }, 0, CANVAS_HEIGHT, null, "mainmenu", MainMenu.STATE.Main, "toast", 0);
        // testtoastPanel.setTextOverflow(true);
        // testtoastPanel.setFontColor(BLACK_COLOR_0, WHITE_COLOR);
        // testtoastPanel.setDestination({ x: 0, y: CANVAS_HEIGHT - 20 });
        // testtoastPanel.setCanMove(true);
        // testtoastPanel.setMovingSpeed(0.2);
        // MainMenu.mainList.push(testtoastPanel.getSprite());


        let leftLessonsSprite = new Sprite({ w: 20, h: 20 }, 112, 0, lessonsBtn);
        leftLessonsSprite.addAnimation("normal", { x: 704, y: 832 }, 9, [0.3, 0.1, 0.1, 0.1, 0.1, 0.2, 0.2, 0.2, 0.4]);
        leftLessonsSprite.changeAnimation("normal");
        lessonsBtn.setTooltip(leftLessonsSprite);
        lessonsBtn.setHoverCB(displayTooltip, { list: "mainmenu.main", tooltip: lessonsBtn.getTooltip() });
        let rightLessonsSprite = new Sprite({ w: 20, h: 20 }, -22, 0, lessonsBtn);
        rightLessonsSprite.addAnimation("normal", { x: 704, y: 832 }, 9, [0.3, 0.1, 0.1, 0.1, 0.1, 0.2, 0.2, 0.2, 0.4]);
        rightLessonsSprite.changeAnimation("normal");
        lessonsBtn.setTooltip(rightLessonsSprite);
        lessonsBtn.setHoverCB(displayTooltip, { list: "mainmenu.main", tooltip: lessonsBtn.getTooltip() });

        let leftfreeModeSprite = new Sprite({ w: 20, h: 20 }, 112, 0, freeModeBtn);
        leftfreeModeSprite.addAnimation("normal", { x: 704, y: 852 }, 6, 0.2);
        leftfreeModeSprite.changeAnimation("normal");
        freeModeBtn.setTooltip(leftfreeModeSprite);
        freeModeBtn.setHoverCB(displayTooltip, { list: "mainmenu.main", tooltip: freeModeBtn.getTooltip() });
        let rightfreeModeSprite = new Sprite({ w: 20, h: 20 }, -22, 0, freeModeBtn);
        rightfreeModeSprite.addAnimation("normal", { x: 704, y: 852 }, 6, 0.2);
        rightfreeModeSprite.changeAnimation("normal");
        freeModeBtn.setTooltip(rightfreeModeSprite);
        freeModeBtn.setHoverCB(displayTooltip, { list: "mainmenu.main", tooltip: freeModeBtn.getTooltip() });

        let leftInfosSprite = new Sprite({ w: 20, h: 20 }, 112, 0, infosBtn);
        leftInfosSprite.addAnimation("normal", { x: 704, y: 872 }, 10, [0.2, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.2]);
        leftInfosSprite.changeAnimation("normal");
        infosBtn.setTooltip(leftInfosSprite);
        infosBtn.setHoverCB(displayTooltip, { list: "mainmenu.main", tooltip: infosBtn.getTooltip() });
        let rightInfosSprite = new Sprite({ w: 20, h: 20 }, -22, 0, infosBtn);
        rightInfosSprite.addAnimation("normal", { x: 704, y: 872 }, 10, [0.2, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.2]);
        rightInfosSprite.changeAnimation("normal");
        infosBtn.setTooltip(rightInfosSprite);
        infosBtn.setHoverCB(displayTooltip, { list: "mainmenu.main", tooltip: infosBtn.getTooltip() });

        let leftSettingsSprite = new Sprite({ w: 20, h: 20 }, 112, 0, optionsBtn);
        leftSettingsSprite.addAnimation("normal", { x: 704, y: 892 }, 7, [0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.5]);
        leftSettingsSprite.changeAnimation("normal");
        optionsBtn.setTooltip(leftSettingsSprite);
        optionsBtn.setHoverCB(displayTooltip, { list: "mainmenu.main", tooltip: optionsBtn.getTooltip() });
        let rightSettingsSprite = new Sprite({ w: 20, h: 20 }, -22, 0, optionsBtn);
        rightSettingsSprite.addAnimation("normal", { x: 704, y: 892 }, 7, [0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.5]);
        rightSettingsSprite.changeAnimation("normal");
        optionsBtn.setTooltip(rightSettingsSprite);
        optionsBtn.setHoverCB(displayTooltip, { list: "mainmenu.main", tooltip: optionsBtn.getTooltip() });

        let leftCreditsSprite = new Sprite({ w: 20, h: 20 }, 112, 0, creditsBtn);
        leftCreditsSprite.addAnimation("normal", { x: 704, y: 912 }, 4, [0.3, 0.15, 0.15, 0.5]);
        leftCreditsSprite.changeAnimation("normal");
        creditsBtn.setTooltip(leftCreditsSprite);
        creditsBtn.setHoverCB(displayTooltip, { list: "mainmenu.main", tooltip: creditsBtn.getTooltip() });
        let rightCreditsSprite = new Sprite({ w: 20, h: 20 }, -22, 0, creditsBtn);
        rightCreditsSprite.addAnimation("normal", { x: 704, y: 912 }, 4, [0.3, 0.15, 0.15, 0.5]);
        rightCreditsSprite.changeAnimation("normal");
        creditsBtn.setTooltip(rightCreditsSprite);
        creditsBtn.setHoverCB(displayTooltip, { list: "mainmenu.main", tooltip: creditsBtn.getTooltip() });

        // this.muteBtn = new Button({ w: 16, h: 14 }, centerX(16, 200, 1), 50, null, MainMenu.muteAction.bind(this), "mainmenu", MainMenu.STATE.Main, "", 0, true);
        // this.muteBtn.setAnimations({ x: 96, y: 96 });
        // MainMenu.mainList.push(this.muteBtn.getSprite());

        // ---------------- OPTIONS ----------------

        let optionsMainPanel = new Panel({ w: 300, h: 200, v: 6 }, centerX(300), centerY(200), null, "mainmenu", MainMenu.STATE.Options, "", 7);

        MainMenu.optionsList.push(optionsMainPanel.getSprite());

        let optionsTitlePanel = new Panel({ w: 70, h: 30, v: 6 }, centerX(70), 40, null, "mainmenu", MainMenu.STATE.Options, "Settings", 7);
        optionsTitlePanel.setOffsets(5, 18);
        optionsTitlePanel.setFontColor(GREEN_BOARD_SDW_COLOR, WHITE_COLOR);
        MainMenu.optionsList.push(optionsTitlePanel.getSprite());

        let musicPanel = new Panel({ w: 40, h: 20, v: 1 }, centerX(40, 72), 78, null, "mainmenu", MainMenu.STATE.Options, "BGM", 2);
        musicPanel.setFontColor(GREEN_BOARD_SDW_COLOR, WHITE_COLOR);
        MainMenu.optionsList.push(musicPanel.getSprite());

        let sfxPanel = new Panel({ w: 40, h: 20, v: 1 }, centerX(40, 72), 108, null, "mainmenu", MainMenu.STATE.Options, "SFX", 2);
        sfxPanel.setFontColor(GREEN_BOARD_SDW_COLOR, WHITE_COLOR);
        MainMenu.optionsList.push(sfxPanel.getSprite());

        this.musicSpeaker = new Sprite({ w: 16, h: 14 }, musicPanel.x + 35, musicPanel.y + 3, null);
        this.musicSpeaker.addAnimation("normal", { x: 203, y: 96 });
        this.musicSpeaker.addAnimation("mute", { x: 219, y: 96 });
        if (MUSIC_VOLUME === 0) {
            this.musicSpeaker.changeAnimation("mute");
        } else {
            this.musicSpeaker.changeAnimation("normal");
        }
        MainMenu.optionsList.push(this.musicSpeaker.getSprite());

        this.sfxSpeaker = new Sprite({ w: 16, h: 14 }, sfxPanel.x + 35, sfxPanel.y + 3, null);
        this.sfxSpeaker.addAnimation("normal", { x: 203, y: 96 });
        this.sfxSpeaker.addAnimation("mute", { x: 219, y: 96 });
        if (SFX_VOLUME === 0) {
            this.sfxSpeaker.changeAnimation("mute");
        } else {
            this.sfxSpeaker.changeAnimation("normal");
        }
        MainMenu.optionsList.push(this.sfxSpeaker.getSprite());

        this.musicSprite = new Sprite({ w: 60, h: 16 }, centerX(60), centerY(16, 62), null);
        this.musicSprite.addAnimation("0", { x: 672, y: 752 });
        this.musicSprite.addAnimation("1", { x: 672 + 60, y: 752 });
        this.musicSprite.addAnimation("2", { x: 672 + 60 * 2, y: 752 });
        this.musicSprite.addAnimation("3", { x: 672 + 60 * 3, y: 752 });
        this.musicSprite.addAnimation("4", { x: 672 + 60 * 4, y: 752 });
        this.musicSprite.addAnimation("5", { x: 672 + 60 * 5, y: 752 });
        this.musicSprite.addAnimation("6", { x: 672 + 60 * 6, y: 752 });
        this.musicSprite.addAnimation("7", { x: 672 + 60 * 7, y: 752 });
        this.musicSprite.addAnimation("8", { x: 672 + 60 * 8, y: 752 });
        this.musicSprite.addAnimation("9", { x: 672 + 60 * 9, y: 752 });
        this.musicSprite.addAnimation("10", { x: 672 + 60 * 10, y: 752 });
        this.musicSprite.changeAnimation(MUSIC_VOLUME * 10);
        MainMenu.optionsList.push(this.musicSprite);

        this.sfxSprite = new Sprite({ w: 60, h: 16 }, centerX(60), centerY(16, 32), null);
        this.sfxSprite.addAnimation("0", { x: 672, y: 752 });
        this.sfxSprite.addAnimation("1", { x: 672 + 60, y: 752 });
        this.sfxSprite.addAnimation("2", { x: 672 + 60 * 2, y: 752 });
        this.sfxSprite.addAnimation("3", { x: 672 + 60 * 3, y: 752 });
        this.sfxSprite.addAnimation("4", { x: 672 + 60 * 4, y: 752 });
        this.sfxSprite.addAnimation("5", { x: 672 + 60 * 5, y: 752 });
        this.sfxSprite.addAnimation("6", { x: 672 + 60 * 6, y: 752 });
        this.sfxSprite.addAnimation("7", { x: 672 + 60 * 7, y: 752 });
        this.sfxSprite.addAnimation("8", { x: 672 + 60 * 8, y: 752 });
        this.sfxSprite.addAnimation("9", { x: 672 + 60 * 9, y: 752 });
        this.sfxSprite.addAnimation("10", { x: 672 + 60 * 10, y: 752 });
        this.sfxSprite.changeAnimation(SFX_VOLUME * 10);
        MainMenu.optionsList.push(this.sfxSprite);

        let musicDownBtn = new Button({ w: 17, h: 17 }, centerX(17, 50, 1), 80, null, Sound.decreaseMusicVolume, "mainmenu", MainMenu.STATE.Options, "", 0, true);
        musicDownBtn.setAnimations({ x: 0, y: 95 });
        MainMenu.optionsList.push(musicDownBtn.getSprite());

        let musicUpBtn = new Button({ w: 17, h: 17 }, musicDownBtn.x + 18, 80, null, Sound.increaseMusicVolume, "mainmenu", MainMenu.STATE.Options, "", 0, true);
        musicUpBtn.setAnimations({ x: 51, y: 95 });
        MainMenu.optionsList.push(musicUpBtn.getSprite());

        let sfxDownBtn = new Button({ w: 17, h: 17 }, centerX(17, 50, 1), 110, null, Sound.decreaseSfxVolume, "mainmenu", MainMenu.STATE.Options, "", 0, true);
        sfxDownBtn.setAnimations({ x: 0, y: 95 });
        MainMenu.optionsList.push(sfxDownBtn.getSprite());

        let sfxUpBtn = new Button({ w: 17, h: 17 }, sfxDownBtn.x + 18, 110, null, Sound.increaseSfxVolume, "mainmenu", MainMenu.STATE.Options, "", 0, true);
        sfxUpBtn.setAnimations({ x: 51, y: 95 });
        MainMenu.optionsList.push(sfxUpBtn.getSprite());

        let watchIntroBtn = new Button({ w: 100, h: 25, v: 6 }, centerX(100), 140, null, MainMenu.watchIntroductionAgain, "mainmenu", MainMenu.STATE.Options, "watch_intro", 41);
        watchIntroBtn.setFontColor(RED_BTN_SDW_COLOR);
        watchIntroBtn.setOffsets(0, 15);
        MainMenu.optionsList.push(watchIntroBtn.getSprite());

        let deleteSaveBtn = new Button({ w: 100, h: 25, v: 6 }, centerX(100), 175, null, { cb: MainMenu.displayDeleteSavePanel.bind(this), arg: { bool: true } }, "mainmenu", MainMenu.STATE.Options, "delete_save", 41);
        deleteSaveBtn.setFontColor(RED_BTN_SDW_COLOR);
        deleteSaveBtn.setOffsets(0, 15);
        MainMenu.optionsList.push(deleteSaveBtn.getSprite());

        let optionsBackBtn = new Button({ w: 30, h: 22 }, centerX(30), 210, null, MainMenu.fromOptionsToMainMenu.bind(this), "mainmenu", MainMenu.STATE.Options, "", 0, true);
        optionsBackBtn.setAnimations({ x: 86, y: 56 });
        optionsBackBtn.setSound("back");
        MainMenu.optionsList.push(optionsBackBtn.getSprite());



        // ---------------- CREDITS ----------------


        let creditsMainPanel = new Panel({ w: 19, h: 25, v: 16 }, centerX(222), 10, null, "mainmenu", MainMenu.STATE.Credits, "", [1]);
        creditsMainPanel.changePanelSprite("t", 2, { x: 564, y: 748 });
        creditsMainPanel.changePanelSprite("t", 16, { x: 564, y: 748 });
        MainMenu.creditsList.push(creditsMainPanel.getSprite());

        let creditsTitle = new Panel({ w: 80, h: 17, v: 4 }, centerXElement(creditsMainPanel, 80), 14, creditsMainPanel, "mainmenu", MainMenu.STATE.Credits, "Credits", 5);
        creditsTitle.setOffsets(0, 12);
        // creditsTitle.setFontColor(CHOOSETYPE_SDW_COLOR_0);
        MainMenu.creditsList.push(creditsTitle.getSprite());

        let contentPanel = new Panel({ w: 200, h: 60, v: 1 }, centerXElement(creditsMainPanel, 200), 30, creditsMainPanel, "mainmenu", MainMenu.STATE.Credits, "credits_content", 2);
        MainMenu.creditsList.push(contentPanel.getSprite());

        let jadonagamesLogo = new Sprite({ w: 37, h: 34 }, centerXElement(creditsMainPanel, 37, 60, 1), 230, creditsMainPanel, "mainmenu");
        jadonagamesLogo.addAnimation("normal", { x: 0, y: 0 });
        jadonagamesLogo.changeAnimation("normal");
        MainMenu.creditsList.push(jadonagamesLogo);

        let creditsBackBtn = new Button({ w: 30, h: 22 }, centerXElement(creditsMainPanel, 30, 70), creditsMainPanel.totalHeight - 40, creditsMainPanel, toMainMenu, "mainmenu", MainMenu.STATE.Credits, "", 0, true);
        creditsBackBtn.setAnimations({ x: 86, y: 56 });
        creditsBackBtn.setSound("back");
        MainMenu.creditsList.push(creditsBackBtn.getSprite());




        // -----------------------------------------

        this.deleteSavePanel = null;
        this.deleteSaveWarningPanel = null;
        this.deleteSaveYesBtn = null;
        this.deleteSaveNoBtn = null;

        this.saveDeletedPanel = null;
        this.deleteSaveAnimation = null;

    }

    static muteAction() {
        this.muteBtn.callback = MainMenu.unMuteAction.bind(this);
        this.muteBtn.getSprite().resetAnimations("normal", { x: 144, y: 96 });
        this.muteBtn.getSprite().resetAnimations("hover", { x: 160, y: 96 });
        this.muteBtn.getSprite().resetAnimations("down", { x: 176, y: 96 });
        Sound.toggleMute();
    }

    static unMuteAction() {
        this.muteBtn.callback = MainMenu.muteAction.bind(this);
        this.muteBtn.getSprite().resetAnimations("normal", { x: 96, y: 96 });
        this.muteBtn.getSprite().resetAnimations("hover", { x: 112, y: 96 });
        this.muteBtn.getSprite().resetAnimations("down", { x: 128, y: 96 });
        Sound.toggleMute();
    }

    static changeState(pNewState) {
        MainMenu.state = pNewState;
        Panel.resetTypeState("mainmenu", pNewState);
        Button.resetTypeState("mainmenu", pNewState);
        if (pNewState == MainMenu.STATE.Options || pNewState == MainMenu.STATE.Credits) {
            FadeEffect.fade({ callback: null, direction: "in", maxTimer: 0.01 });
        }
    }

    static watchIntroductionAgain() {
        if (Introduction.bInit) {
            Introduction.bInit = false;
        }
        MainMenu.clearKanaInterval();
        changeMainState(MAIN_STATE.Introduction);
    }

    static initKanaInterval() {
        Particles.list = [];
        clearInterval(this.kanaInterval);
        this.kanaInterval = setInterval(MainMenu.createRandomKana, 500);
    }

    static clearKanaInterval() {
        clearInterval(this.kanaInterval);
    }

    static createRandomKana() {

        let randomX = 0;
        let randomY = 0;
        let randomKanaIndex = rnd(0, 92);
        let direction = 0;

        if (rnd(0, 2) == 0) {
            let x = [-5, CANVAS_WIDTH - 5]
            randomX = x[rnd(0, 2)];
            randomY = rnd(0, CANVAS_HEIGHT - 11); // MAX non compris
            if (randomX == -5) {
                direction = 1;
            } else if (randomX == CANVAS_WIDTH - 5) {
                direction = 3;
            }

        } else {
            let y = [-5, CANVAS_HEIGHT - 5]
            randomY = y[rnd(0, 2)];
            randomX = rnd(0, CANVAS_WIDTH - 11); // MAX non compris
            if (randomY == -5) {
                direction = 2;
            } else if (randomY == CANVAS_HEIGHT - 5) {
                direction = 0;
            }
        }

        let randomKana = new KanaBgSprite({ w: 10, h: 10 }, randomX, randomY, null, "rndkana"); // "rndkana" juste pour ne pas entrer dans la Sprite.list
        randomKana.setDirection(direction);
        randomKana.addAnimation("normal", { x: MainMenu.randomKanaList[randomKanaIndex].x, y: MainMenu.randomKanaList[randomKanaIndex].y });
        randomKana.changeAnimation("normal");
        MainMenu.randomKanaSpriteList.push(randomKana);
    }

    static displayDeleteSavePanel(pParam) {

        if (pParam.bool) {
            Button.currentList.forEach(b => {
                b.setState(Button.STATE.Inactive);
                if (b.bInactiveAnimation) {
                    b.getSprite().changeAnimation("inactive");
                }
            });
            Panel.currentList.forEach(p => {
                p.setState(Panel.STATE.Inactive);
            });

            this.deleteSaveBg = new Sprite({ w: 1, h: 1 }, 0, 0, null, "normal", { x: CANVAS_WIDTH, y: CANVAS_HEIGHT });
            this.deleteSaveBg.getSprite().addAnimation("normal", { x: 38, y: 3 });
            this.deleteSaveBg.getSprite().changeAnimation("normal");
            this.deleteSaveBg.setAlpha(0);
            this.deleteSaveBg.fade(0.01);
            MainMenu.optionsList.push(this.deleteSaveBg.getSprite());

            this.deleteSavePanel = new Panel({ w: 20, h: 10, v: 9 }, centerX(238), 130, null, "mainmenu", MainMenu.STATE.Options, "confirm_save_deletion", [-1, { y_t: 748 }]);
            this.deleteSavePanel.setOffsets(0, 20);
            this.deleteSavePanel.beginMoving({ x: centerX(238), y: 100 });
            MainMenu.optionsList.push(this.deleteSavePanel.getSprite());

            Panel.list.push(this.deleteSavePanel);
            Panel.currentList.push(this.deleteSavePanel);

            this.deleteSaveWarningPanel = new Panel({ w: 238, h: 50, v: 1 }, 0, 35, this.deleteSavePanel, "mainmenu", MainMenu.STATE.Options, "delete_save_warning", 2);
            this.deleteSaveWarningPanel.setFontColor(GREY_200_COLOR, RED_COLOR);
            this.deleteSaveWarningPanel.setAlpha(0);
            MainMenu.optionsList.push(this.deleteSaveWarningPanel.getSprite());

            this.deleteSaveYesBtn = new Button({ w: 50, h: 22, v: 6 }, centerXElement(this.deleteSavePanel, 50, 50), 70, this.deleteSavePanel, { cb: MainMenu.displayDeleteSavePanel.bind(this), arg: { bool: false, delete: true } }, "mainmenu", MainMenu.STATE.Options, "yes", 41);
            this.deleteSaveYesBtn.setFontColor(RED_BTN_SDW_COLOR);
            this.deleteSaveYesBtn.setAlpha(0);
            Button.list.push(this.deleteSaveYesBtn);
            Button.currentList.push(this.deleteSaveYesBtn);
            MainMenu.optionsList.push(this.deleteSaveYesBtn.getSprite());

            this.deleteSaveNoBtn = new Button({ w: 50, h: 22, v: 6 }, centerXElement(this.deleteSavePanel, 50, 50, 1), 70, this.deleteSavePanel, { cb: MainMenu.displayDeleteSavePanel.bind(this), arg: { bool: false, delete: false } }, "mainmenu", MainMenu.STATE.Options, "no", 41);
            this.deleteSaveNoBtn.setFontColor(RED_BTN_SDW_COLOR);
            this.deleteSaveNoBtn.setAlpha(0);
            Button.list.push(this.deleteSaveNoBtn);
            Button.currentList.push(this.deleteSaveNoBtn);
            MainMenu.optionsList.push(this.deleteSaveNoBtn.getSprite());

        } else {

            // this.chooseTypeBg.delete = true;
            if (pParam.delete) {
                SaveManager.delete();

                this.deleteSaveAnimation = null;

                // this.saveDeletedPanel = new Panel({ w: 100, h: 60, v: 5 }, centerX(100), CANVAS_HEIGHT + 50, null, "lessonTutorial", LessonTutorial.STATE.Main, "save_deleted", 1);
                this.saveDeletedPanel = new Panel({ w: 10, h: 4, v: 9 }, centerX(128), CANVAS_HEIGHT + 62, null, "mainmenu", MainMenu.STATE.Options, "save_deleted", [-1, { y_t: 748 }]);
                this.saveDeletedPanel.setOffsets(10, 20);

                this.saveDeletedPanel.setDestination({ x: centerX(128), y: CANVAS_HEIGHT - 62 });
                this.saveDeletedPanel.setCanMove(true);
                this.saveDeletedPanel.setMovingSpeed(0.7);
                this.saveDeletedPanel.setMoving(true);

                this.saveDeletedPanel.setAlpha(0);
                this.saveDeletedPanel.fade(0.08);
                Panel.list.push(this.saveDeletedPanel);
                Panel.currentList.push(this.saveDeletedPanel);
                MainMenu.optionsList.push(this.saveDeletedPanel.getSprite());

                this.deleteSaveAnimation = new Sprite({ w: 35, h: 27 }, 40, 25, this.saveDeletedPanel);
                this.deleteSaveAnimation.addAnimation("normal", { x: 342, y: 1060 }, 14, [1, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.1, 0.1, 0.1, 0.1, 0.1], false);
                this.deleteSaveAnimation.changeAnimation("normal");
                this.deleteSaveAnimation.setAnimationCB('normal', MainMenu.bla.bind(this));
                MainMenu.optionsList.push(this.deleteSaveAnimation.getSprite());
            }

            this.deleteSavePanel.removeFromList();
            this.deleteSaveWarningPanel.removeFromList();
            this.deleteSaveYesBtn.removeFromList();
            this.deleteSaveNoBtn.removeFromList();

            this.deleteSavePanel.removeFromCurrentList();
            this.deleteSaveWarningPanel.removeFromCurrentList();
            this.deleteSaveYesBtn.removeFromCurrentList();
            this.deleteSaveNoBtn.removeFromCurrentList();

            this.deleteSaveBg.delete = true;
            this.deleteSavePanel.getSprite().delete = true;
            this.deleteSaveWarningPanel.getSprite().delete = true;
            this.deleteSaveYesBtn.getSprite().delete = true;
            this.deleteSaveNoBtn.getSprite().delete = true;

            this.deleteSaveBg = null;
            this.deleteSavePanel = null;
            this.deleteSaveWarningPanel = null;
            this.deleteSaveYesBtn = null;
            this.deleteSaveNoBtn = null;

            Button.currentList.forEach(b => {
                b.setState(Button.STATE.Normal);
                if (b.bInactiveAnimation) {
                    b.getSprite().changeAnimation("normal");
                }
            });
            Panel.currentList.forEach(p => {
                p.setState(Panel.STATE.Normal);
            });
        }

    }

    static bla() {
        this.saveDeletedPanel.changeDirection();
        let tmpY = this.saveDeletedPanel.destination.y;
        this.saveDeletedPanel.destination.y = this.saveDeletedPanel.startPos.y;
        this.saveDeletedPanel.startPos.y = tmpY;
        this.saveDeletedPanel.setMoving(true);
        this.saveDeletedPanel.fade(0.04, -1);
    }

    static fromOptionsToMainMenu() {
        MainMenu.resetDeleteSavePanels();
        toMainMenu();
    }

    static resetDeleteSavePanels() {
        if (this.saveDeletedPanel != null) {
            this.saveDeletedPanel.removeFromList();
            this.saveDeletedPanel.removeFromCurrentList();
            this.saveDeletedPanel.getSprite().delete = true;
            this.saveDeletedPanel = null;
            this.deleteSaveAnimation.delete = true;
            this.deleteSaveAnimation = null;
        }
    }

    static update(dt) {

        Sprite.manageBeforeUpdating(MainMenu.randomKanaSpriteList, dt);

        Particles.list.forEach(p => {
            if (!p.delete) {
                p.update(dt);
            }
        });

        // Button.currentList.forEach(b => {
        //     if (b.bMoving) {
        //         b.update(dt);
        //     }
        // });

        Panel.currentList.forEach(p => {
            p.update(dt)
        });

        Sprite.manageBeforeUpdating(MainMenu.mainList, dt);

        //TODO 
        //! find a solution to not repeat the 2 loops : foreach (update()) then filter (delete)
        // DELETING --------

        MainMenu.randomKanaSpriteList = MainMenu.randomKanaSpriteList.filter(sp => {
            return !sp.delete;
        });

        Particles.list = Particles.list.filter(p => {
            return !p.delete;
        });

        MainMenu.mainList = MainMenu.mainList.filter(sp => {
            return !sp.delete;
        });
        if (this.state == MainMenu.STATE.Options) {
            MainMenu.optionsList = MainMenu.optionsList.filter(sp => {
                return !sp.delete;
            });
            Sprite.manageBeforeUpdating(MainMenu.optionsList, dt);
        }

        // ------------------

        if (FadeEffect.bActive) {
            FadeEffect.update(dt);
        }

        if (Transition.bActive) {
            Transition.update(dt);
        }
    }

    static draw(ctx) {
        // let globalCompositionArray = ["source-over", "source-in", "source-out", "source-atop", "destination-over", "destination-in", "destination-out", "destination-atop", "lighter", "copy", "xor", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"];
        // ctx.globalCompositeOperation = globalCompositionArray[15];
        Sprite.manageBeforeDrawing(MainMenu.randomKanaSpriteList);

        Particles.list.forEach(p => {
            p.draw(ctx);
        });

        switch (MainMenu.state) {
            case MainMenu.STATE.Main:
                Sprite.manageBeforeDrawing(MainMenu.mainList);
                break;
            case MainMenu.STATE.Options:
                Sprite.manageBeforeDrawing(MainMenu.optionsList);
                break;
            case MainMenu.STATE.Credits:
                Sprite.manageBeforeDrawing(MainMenu.creditsList);
                break;
            case MainMenu.STATE.Transition:

                break;
        }


        /**
         * DEBUG
         */
        // if (bStatsDebug) {
        //     ctx.fillStyle = WHITE_COLOR;
        //     ctx.font = "16px pgfont";
        //     // ctx.fillText("ButtonList : " + Button.list.length, 0, 120);
        //     // ctx.fillText("ButtonCurrent : " + Button.currentList.length, 0, 130);
        //     // ctx.fillText("MainMenuList : " + MainMenu.mainList.length, 0, 140);
        //     // ctx.fillText("BGSPRITE List : " + MainMenu.randomKanaSpriteList.length, 0, 300);
        //     ctx.fillText("PanelList : " + Panel.list.length, 0, 120);
        //     ctx.fillText("PanelCurrent : " + Panel.currentList.length, 0, 130);
        //     ctx.fillText("MAIN_SPRITE : " + MAIN_SPRITE_LIST.length, 0, 140);
        //     // ctx.fillText("MainMenuList : " + MainMenu.mainList.length, 0, 140);
        //     // ctx.fillText("BGSPRITE List : " + MainMenu.randomKanaSpriteList.length, 0, 300);
        // }
        //------------- END DEBUG

        ctx.fillStyle = WHITE_COLOR;
        ctx.font = "10px jpfont";
        ctx.fillText("Version: 0.1", CANVAS_WIDTH - 66, CANVAS_HEIGHT - 4);
    }

    static particles(pX, pY) {
        for (let i = 0; i < 10; i++) {
            let size = rnd(1, 3);
            // let p = new Particles(pX, pY, rnd(-2, 3), rnd(-2, 3), 0, { w: size, h: size }, rnd(1, 3));
            let p = new Particles(pX, pY, rnd(-2, 3), rnd(-2, 3), 0, { w: 1, h: 1 }, rnd(1, 3));
        }
    }


    static particles2(pX, pY) {
        for (let i = 0; i < 10; i++) {
            let size = rnd(1, 3);
            let rndOffsetX = rnd(1, 10);
            let rndOffsetY = rnd(1, 5);
            let p = new Particles(pX + rndOffsetX, pY + rndOffsetY, 1, -1, 0, { w: size, h: size }, rnd(1, 3));
            p.setColor(GREY_150_COLOR);
        }
    }
}