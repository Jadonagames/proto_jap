class Lessons {

    static mainList = [];
    static hiraganaList = [];
    static katakanaList = [];
    static lessonList = [];
    static lists = ["", "a,i,u,e,o", "ka,ki,ku,ke,ko", "sa,shi,su,se,so", "ta,chi,tsu,te,to", "na,ni,nu,ne,no", "ha,hi,fu,he,ho", "ma,mi,mu,me,mo", "ya,yu,yo", "ra,ri,ru,re,ro", "wa,wo,n", "ga,gi,gu,ge,go", "za,ji,zu,ze,zo", "da,di,du,de,do", "ba,bi,bu,be,bo", "pa,pi,pu,pe,po"]
    static bInit = false;

    static STATE = Object.freeze({
        Main: 0,
        Hiragana: 1,
        Katakana: 2,
        Lesson: 3
    })

    static previousState = -1;
    static TRANSLATION_TRANSITION = false;
    static FIRST_TIME = false;

    static state = Lessons.STATE.Main;

    constructor() {

    }

    //!    _________   _         _________  _________
    //!    \__   __/  ( (    /|  \__   __/  \__   __/
    //!       ) (     |  \  ( |     ) (        ) (   
    //!       | |     |   \ | |     | |        | |   
    //!       | |     | (\ \) |     | |        | |   
    //!       | |     | | \   |     | |        | |   
    //!    ___) (___  | )  \  |  ___) (___     | |   
    //!    \_______/  |/    )_)  \_______/     )_(   

    static init() {

        this.canvasY = 0;
        this.translationY = -50;

        Lessons.bInit = true;
        // ---------------- MAIN ----------------

        let table = new Sprite({ w: 384, h: 117 }, centerX(382) - 2, 120);
        table.addAnimation("normal", { x: 532, y: 272 });
        table.changeAnimation("normal");
        Lessons.mainList.push(table);

        let chalkboard = new Sprite({ w: 234, h: 88 }, centerX(234), 20);
        chalkboard.addAnimation("normal", { x: 530, y: 444 });
        chalkboard.changeAnimation("normal");
        Lessons.mainList.push(chalkboard);

        this.hiraganaBtn = new Button({ w: 114, h: 26 }, centerX(114, 57), chalkboard.y + 5, null, { cb: Lessons.changeState, arg: Lessons.STATE.Hiragana }, "lessons", Lessons.STATE.Katakana, "a_Hiragana", 0, true);
        this.hiraganaBtn.getSprite().addAnimation("normal", { x: 764, y: 444 });
        this.hiraganaBtn.getSprite().addAnimation("hover", { x: 764, y: 444 });
        this.hiraganaBtn.getSprite().addAnimation("down", { x: 764, y: 444 });
        this.hiraganaBtn.getSprite().changeAnimation("normal");
        this.hiraganaBtn.setFontColor(GREEN_BOARD_SDW_COLOR2, WHITE_COLOR, GREEN_BOARD_SDW_COLOR2, WHITE_COLOR);
        this.hiraganaBtn.setOffsets(0, 16);
        Lessons.mainList.push(this.hiraganaBtn.getSprite());

        this.katakanaBtn = new Button({ w: 114, h: 26 }, centerX(114, 57, 1), chalkboard.y + 5, null, { cb: Lessons.changeState, arg: Lessons.STATE.Katakana }, "lessons", Lessons.STATE.Hiragana, "a_Katakana", 0, true);
        this.katakanaBtn.getSprite().addAnimation("normal", { x: 992, y: 470 });
        this.katakanaBtn.getSprite().addAnimation("hover", { x: 878, y: 470 });
        this.katakanaBtn.getSprite().addAnimation("down", { x: 878, y: 470 });
        this.katakanaBtn.getSprite().changeAnimation("normal");
        this.katakanaBtn.setFontColor(GREEN_BOARD_SDW_COLOR2, INACTIVE_SDW_COLOR, GREEN_BOARD_SDW_COLOR2, WHITE_COLOR);
        this.katakanaBtn.setOffsets(0, 16);
        Lessons.mainList.push(this.katakanaBtn.getSprite());

        this.hiraNewSprite = null;
        this.kataNewSprite = null;

        let watchPrologue = new Button({ w: 100, h: 30, v: 6 }, 345, 50, null, Lessons.watchPrologueAgain, "lessons", Lessons.STATE.Main, "watch_prologue", 41);
        watchPrologue.setFontColor(RED_BTN_SDW_COLOR);
        watchPrologue.setOffsets(0, 17);
        Lessons.mainList.push(watchPrologue.getSprite());

        let backBtn = new Button({ w: 30, h: 22 }, 20, 20, null, Lessons.quitLessonsMenu, "lessons", Lessons.STATE.Main, "", 0, true);
        backBtn.setAnimations({ x: 86, y: 56 });
        backBtn.setSound("back");
        Lessons.mainList.push(backBtn.getSprite());

        // let introBtn = new Button({ w: 50, h: 20, v: 5 }, 380, 20, null, { cb: SaveManager.save, arg: [{ type: "prologue", value: 1 }] }, "lessons", Lessons.STATE.Main, "Infos", 1);
        // Lessons.mainList.push(introBtn.getSprite());

        // let introTooltip = new Panel({ w: 300, h: 76, v: 5 }, centerX(300), CANVAS_HEIGHT - 76, null, "lessons", Lessons.STATE.Main, "Infos", 1);
        // introTooltip.setOffsets(0, 18);

        // introBtn.setTooltip(introTooltip);
        // introBtn.setHoverCB(displayTooltip, { list: "lessons.main", tooltip: introBtn.getTooltip() });

        this.starTrophyList = [];

        // ---------------- HIRAGANA ----------------
        let arr = ["", "aiueo", "kakikukeko", "sashisuseso", "tachitsuteto", "naninuneno", "hahifuheho", "mamimumemo", "yayuyo", "rarirurero", "wawon", "gagigugego", "zajizuzezo", "dadidudedo", "babibubebo", "papipupepo"];
        let offX = 0;
        let offY = 0;
        let offYColor = 0;
        let columnCount = 1;
        let bNoSave = false;
        let bDisplayNew = false;
        let displayNew = { kana: "", number: 0 };
        if (SaveManager.SAVE_DATA["prologue"] == 1) {
            Lessons.FIRST_TIME = true;
        } else {
            Lessons.FIRST_TIME = false;
        }

        for (let i = 1; i <= 15; i++) {
            let lessonBtn = new LessonBtn({ w: 72, h: 29 }, centerX(72, 150, 0) + offX, centerY(29, 10) + offY, null, { cb: Lessons.transition.bind(this), arg: ["-", Lessons.STATE.Hiragana, i] }, "lessons", Lessons.STATE.Hiragana, "Lesson_" + i, 0, true);
            lessonBtn.setOffsets(0, 18, 0, -1);
            bNoSave = false;
            if (SaveManager.SAVE_DATA["prologue"] == 1) { //!Avant :  if (!SaveManager.SAVE_DATA["prologue"])
                bNoSave = true;
            } else {
                if (i > 1) {
                    if (!SaveManager.SAVE_DATA["lessons"]["h" + (i - 1)]["finish"]) {
                        bNoSave = true;
                    }
                }
            }

            Lessons.hiraganaList.push(lessonBtn.getSprite());

            if (bNoSave) {
                lessonBtn.setMode(1, { cb: Lessons.transition.bind(this), arg: ["-", Lessons.STATE.Hiragana, i] }, offYColor);
                lessonBtn.setFontColor(LESSON_BTN_SDW_COLOR_0, BLACK_COLOR_0, LESSON_BTN_HVR_SDW_COLOR_0, LESSON_BTN_HOVER_COLOR_0);
                lessonBtn.changeSpriteAnimation("normal");
            } else {
                lessonBtn.setMode(0, null, offYColor);
                if (!SaveManager.SAVE_DATA["lessons"]["h" + i]["buttonAnimation"]) {
                    lessonBtn.state = LessonBtn.STATE.Inactive;
                    lessonBtn.changeSpriteAnimation("open");
                    lessonBtn.setFontColor(LESSON_BTN_SDW_COLOR_0, BLACK_COLOR_0, LESSON_BTN_HVR_SDW_COLOR_0, LESSON_BTN_HOVER_COLOR_0);
                } else {
                    lessonBtn.setFontColor(LESSON_BTN_SDW_COLOR, BLACK_COLOR, LESSON_BTN_HVR_SDW_COLOR, LESSON_BTN_HOVER_COLOR);
                    lessonBtn.changeSpriteAnimation("normal");


                    if (SaveManager.SAVE_DATA["lessons"]["h" + i]["newAnimation"] && !SaveManager.SAVE_DATA["lessons"]["h" + i]["newFinish"]) {
                        bDisplayNew = true;
                        displayNew.kana = "h";
                        displayNew.number = i
                    }
                }
            }

            this.starTrophyList["h" + i] = new Sprite({ w: 10, h: 8 }, 61, 1, lessonBtn);
            this.starTrophyList["h" + i].getSprite().addAnimation("normal", { x: 94, y: 112 });
            this.starTrophyList["h" + i].getSprite().changeAnimation("normal");
            this.starTrophyList["h" + i].getSprite().setClass("star");

            if (SaveManager.SAVE_DATA["lessons"]["h" + i]["fullcomplete"]) {
                Lessons.addStarTrophy("h" + i);
            }

            // Le fait d'utiliser la même variable offYcolor pour les tooltip et pour les buttons est totalement un hasard (même valeur d'incrément : 29), normalement c'est avec une variable différente offYPanelColor
            let tooltipPanel = new Panel({ w: 10, h: 4, v: 9 }, centerX(128), CANVAS_HEIGHT - 70, null, "lessons", Lessons.STATE.Hiragana, "", [-1, { y_t: 748 + offYColor }]); // 128 = 2*9 (corner*2) + 10 * 11 (w * t.w or b.w)
            tooltipPanel.setOffsets(5, 5);
            tooltipPanel.changePanelSprite("t", 4, { x: 427, y: 748 + offYColor });
            tooltipPanel.changePanelSprite("t", 5, { x: 438, y: 748 + offYColor });
            tooltipPanel.changePanelSprite("b", 4, { x: 427, y: 757 + offYColor });
            tooltipPanel.changePanelSprite("b", 5, { x: 438, y: 757 + offYColor });
            tooltipPanel.changePanelSprite("l", 1, { x: 409, y: 748 + offYColor });
            tooltipPanel.changePanelSprite("l", 2, { x: 409, y: 759 + offYColor });
            tooltipPanel.changePanelSprite("r", 1, { x: 418, y: 748 + offYColor });
            tooltipPanel.changePanelSprite("r", 2, { x: 418, y: 759 + offYColor });

            if (i % 7 != 0) {
                offYColor += 29;
            } else {
                offYColor = 0;
            }

            let tooltipContentPanel = new Panel({ w: 250, h: 70, v: 1 }, centerX(250), tooltipPanel.y + 15, null, "lessons", Lessons.STATE.Hiragana, "hira_" + arr[i], 2);
            tooltipContentPanel.setFont("kyokasho");
            tooltipPanel.setOffsets(0, 10);

            let tooltipContentPanel2 = new Panel({ w: 250, h: 50, v: 1 }, centerX(250), tooltipPanel.y + 40, null, "lessons", Lessons.STATE.Hiragana, "roma_" + arr[i], 2);
            tooltipContentPanel2.setOffsets(0, 5);

            lessonBtn.setTooltip(tooltipPanel);
            lessonBtn.setTooltip(tooltipContentPanel);
            lessonBtn.setTooltip(tooltipContentPanel2);
            lessonBtn.setHoverCB(displayTooltip, { list: "lessons.hiragana", tooltip: lessonBtn.getTooltip() });

            offX += 75;
            columnCount++;
            if (columnCount > 5) {
                columnCount = 1;
                offX = 0;
                offY += 38;
            }
        }

        if (bDisplayNew) {
            this.displayNewLogo(displayNew.kana, displayNew.number);
            bDisplayNew = false;
        }

        // ---------------- KATAKANA ----------------
        offX = 0;
        offY = 0;
        offYColor = 0;
        columnCount = 1;
        for (let i = 1; i <= 15; i++) {
            let lessonBtn = new LessonBtn({ w: 72, h: 29 }, centerX(72, 150, 0) + offX, centerY(29, 10) + offY, null, { cb: Lessons.transition.bind(this), arg: ["-", Lessons.STATE.Katakana, i] }, "lessons", Lessons.STATE.Katakana, "Lesson_" + i, 0, true);
            lessonBtn.setOffsets(0, 18, 0, -1);
            bNoSave = false;

            // if (!SaveManager.SAVE_DATA["prologue"]) {
            if (SaveManager.SAVE_DATA["prologue"] == 1) {
                bNoSave = true;
            } else {
                if (i > 1) {
                    if (!SaveManager.SAVE_DATA["lessons"]["k" + (i - 1)]["finish"]) {
                        bNoSave = true;
                    }
                }
            }

            Lessons.katakanaList.push(lessonBtn.getSprite());

            if (bNoSave) {
                lessonBtn.setMode(1, { cb: Lessons.transition.bind(this), arg: ["-", Lessons.STATE.Katakana, i] }, offYColor);
                lessonBtn.setFontColor(LESSON_BTN_SDW_COLOR_0, BLACK_COLOR_0, LESSON_BTN_HVR_SDW_COLOR_0, LESSON_BTN_HOVER_COLOR_0);
                lessonBtn.changeSpriteAnimation("normal");
            } else {
                lessonBtn.setMode(0, null, offYColor);
                if (!SaveManager.SAVE_DATA["lessons"]["k" + i]["buttonAnimation"]) {
                    lessonBtn.state = LessonBtn.STATE.Inactive;
                    lessonBtn.changeSpriteAnimation("open");
                    lessonBtn.setFontColor(LESSON_BTN_SDW_COLOR_0, BLACK_COLOR_0, LESSON_BTN_HVR_SDW_COLOR_0, LESSON_BTN_HOVER_COLOR_0);
                } else {
                    lessonBtn.setFontColor(LESSON_BTN_SDW_COLOR, BLACK_COLOR, LESSON_BTN_HVR_SDW_COLOR, LESSON_BTN_HOVER_COLOR);
                    lessonBtn.changeSpriteAnimation("normal");

                    if (SaveManager.SAVE_DATA["lessons"]["h" + i]["newAnimation"] && !SaveManager.SAVE_DATA["lessons"]["k" + i]["newFinish"]) {
                        bDisplayNew = true;
                        displayNew.kana = "k";
                        displayNew.number = i
                    }
                }
            }


            this.starTrophyList["k" + i] = new Sprite({ w: 10, h: 8 }, 61, 1, lessonBtn);
            this.starTrophyList["k" + i].getSprite().addAnimation("normal", { x: 94, y: 112 });
            this.starTrophyList["k" + i].getSprite().changeAnimation("normal");
            this.starTrophyList["k" + i].getSprite().setClass("star");

            if (SaveManager.SAVE_DATA["lessons"]["k" + i]["fullcomplete"]) {
                Lessons.addStarTrophy("k" + i);
            }

            let tooltipPanel = new Panel({ w: 10, h: 4, v: 9 }, centerX(128), CANVAS_HEIGHT - 70, null, "lessons", Lessons.STATE.Katakana, "", [-1, { y_t: 748 + offYColor }]); // 128 = 2*9 (corner*2) + 10 * 11 (w * t.w or b.w)
            tooltipPanel.setOffsets(5, 5);
            tooltipPanel.changePanelSprite("t", 4, { x: 427, y: 748 + offYColor });
            tooltipPanel.changePanelSprite("t", 5, { x: 438, y: 748 + offYColor });
            tooltipPanel.changePanelSprite("b", 4, { x: 427, y: 757 + offYColor });
            tooltipPanel.changePanelSprite("b", 5, { x: 438, y: 757 + offYColor });
            tooltipPanel.changePanelSprite("l", 1, { x: 409, y: 748 + offYColor });
            tooltipPanel.changePanelSprite("l", 2, { x: 409, y: 759 + offYColor });
            tooltipPanel.changePanelSprite("r", 1, { x: 418, y: 748 + offYColor });
            tooltipPanel.changePanelSprite("r", 2, { x: 418, y: 759 + offYColor });

            if (i % 7 != 0) {
                offYColor += 29;
            } else {
                offYColor = 0;
            }

            let tooltipContentPanel = new Panel({ w: 250, h: 70, v: 1 }, centerX(250), CANVAS_HEIGHT - 55, null, "lessons", Lessons.STATE.Katakana, "kata_" + arr[i], 2);
            tooltipContentPanel.setFont("kyokasho");
            tooltipPanel.setOffsets(0, 10);

            let tooltipContentPanel2 = new Panel({ w: 250, h: 50, v: 1 }, centerX(250), CANVAS_HEIGHT - 30, null, "lessons", Lessons.STATE.Katakana, "roma_" + arr[i], 2);
            tooltipContentPanel2.setOffsets(0, 5);

            lessonBtn.setTooltip(tooltipPanel);
            lessonBtn.setTooltip(tooltipContentPanel);
            lessonBtn.setTooltip(tooltipContentPanel2);
            lessonBtn.setHoverCB(displayTooltip, { list: "lessons.katakana", tooltip: lessonBtn.getTooltip() });

            offX += 75;
            columnCount++;
            if (columnCount > 5) {
                columnCount = 1;
                offX = 0;
                offY += 38;
            }
        }

        if (bDisplayNew) {
            this.displayNewLogo(displayNew.kana, displayNew.number);
            bDisplayNew = false;
        }


        // ---------------- LESSON ----------------
        this.backgroundSprite = null;

        this.lessonTitlePanel = new Panel({ w: 6, h: 1, v: 9 }, centerX(84, 100), CANVAS_HEIGHT + 7, null, "lessons", Lessons.STATE.Lesson, "", [-1, { y_t: 748 }]);
        this.lessonTitlePanel.changePanelSprite("t", 2, { x: 427, y: 748 });
        this.lessonTitlePanel.changePanelSprite("t", 3, { x: 438, y: 748 });
        this.lessonTitlePanel.changePanelSprite("b", 2, { x: 427, y: 757 });
        this.lessonTitlePanel.changePanelSprite("b", 3, { x: 438, y: 757 });
        this.lessonTitlePanel.setOffsets(0, 17);
        this.lessonTitlePanel.setTextOverflow(true);

        this.lessonBackBtn = null;
        this.lessonMainPanel = new Panel({ w: 450, h: 277, v: 7 }, 0, CANVAS_HEIGHT + 17, null, "lessons", Lessons.STATE.Lesson, "", 4);

        this.informationPanel = new Panel({ w: 14, h: 18, v: 9 }, 259, CANVAS_HEIGHT + 31, null, "lessons", Lessons.STATE.Lesson, "Description", [-1, { y_t: 748 }]);
        this.informationPanel.changePanelSprite("t", 6, { x: 427, y: 748 });
        this.informationPanel.changePanelSprite("t", 7, { x: 438, y: 748 });
        this.informationPanel.changePanelSprite("b", 6, { x: 427, y: 757 });
        this.informationPanel.changePanelSprite("b", 7, { x: 438, y: 757 });
        this.informationPanel.changePanelSprite("l", 8, { x: 409, y: 748 });
        this.informationPanel.changePanelSprite("l", 9, { x: 409, y: 759 });
        this.informationPanel.changePanelSprite("r", 8, { x: 418, y: 748 });
        this.informationPanel.changePanelSprite("r", 9, { x: 418, y: 759 });
        this.informationPanel.setOffsets(0, 20);

        this.playBtn = null;
        this.trainingBtn = null;
        this.lessonTestBtn = null;
        this.fullTestBtn = null;

        this.lessonTestTrophy = null;
        this.fullTestTrophy = null;
        this.lessonTestTrophyPanel = null;
        this.fullTestTrophyPanel = null;

        this.lessonTestTrophyLevel = 0;
        this.fullTestTrophyLevel = 0; // 16 32 48

        this.bChooseType = false;

        this.chooseTypeBg = null;
        this.chooseTypePanel = null;
        this.chooseTypeTitle = null;
        this.kanaToRomaBtn = null;
        this.kanaToRomaTrophy = null;
        this.romaTokanaBtn = null;
        this.romaTokanaTrophy = null;
        this.backFromCTPBtn = null;

        console.log("init lessons");
    }

    //!    _________   _______    _______    _          _______   _________  _________  _________   _______    _       
    //!    \__   __/  (  ____ )  (  ___  )  ( (    /|  (  ____ \  \__   __/  \__   __/  \__   __/  (  ___  )  ( (    /|
    //!       ) (     | (    )|  | (   ) |  |  \  ( |  | (    \/     ) (        ) (        ) (     | (   ) |  |  \  ( |
    //!       | |     | (____)|  | (___) |  |   \ | |  | (_____      | |        | |        | |     | |   | |  |   \ | |
    //!       | |     |     __)  |  ___  |  | (\ \) |  (_____  )     | |        | |        | |     | |   | |  | (\ \) |
    //!       | |     | (\ (     | (   ) |  | | \   |        ) |     | |        | |        | |     | |   | |  | | \   |
    //!       | |     | ) \ \__  | )   ( |  | )  \  |  /\____) |  ___) (___     | |     ___) (___  | (___) |  | )  \  |
    //!       )_(     |/   \__/  |/     \|  |/    )_)  \_______)  \_______/     )_(     \_______/  (_______)  |/    )_)

    // Params : a[0] : "-" / "+" || a[1] : Lessons.STATE.Hiragana / .Katakana || a[2] : i  (1,2,3...)
    static transition(a) {
        if (a[0] == "-") { //? TO ONE LESSON

            Game1.finishedLesson = 0;

            this.canvasY = 0;
            Lessons.previousState = a[1];
            Lessons.lessonList = [];
            let kana = "";
            let lessonNumber = a[2];
            Lessons.previousState == Lessons.STATE.Hiragana ? kana = "hira_" : kana = "kata_";

            if (Lessons.previousState == Lessons.STATE.Hiragana) {
                if (this.hiraNewSprite != null && this.hiraNewSprite.type.slice(-1) == lessonNumber) {
                    this.hiraNewSprite.delete = true;
                    this.hiraNewSprite = null;
                    SaveManager.save([{ type: "newFinish", params: "h" + lessonNumber }]);
                }
            } else if (Lessons.previousState == Lessons.STATE.Katakana) {
                if (this.kataNewSprite != null && this.kataNewSprite.type.slice(-1) == lessonNumber) {
                    this.kataNewSprite.delete = true;
                    this.kataNewSprite = null;
                    SaveManager.save([{ type: "newFinish", params: "k" + lessonNumber }]);
                }
            }

            // --- MAIN ---
            let numberOff = lessonNumber;
            if (lessonNumber > 7 && lessonNumber < 15) {
                numberOff -= 7;
            } else if (lessonNumber == 15) {
                numberOff = 1;
            }
            let colorOffY = (numberOff - 1) * 29; //!


            this.backgroundSprite = new Sprite({ w: 1, h: 1 }, 0, CANVAS_HEIGHT, null, "normal", { x: CANVAS_WIDTH, y: CANVAS_HEIGHT });
            this.backgroundSprite.addAnimation("normal", { x: 411, y: 748 + colorOffY });
            this.backgroundSprite.changeAnimation("normal");
            Lessons.lessonList.push(this.backgroundSprite);
            Lessons.lessonList.push(this.lessonMainPanel.getSprite());

            let offsetColor = 0;
            if (lessonNumber == 1 || lessonNumber == 8 || lessonNumber == 15) { offsetColor = 0; }
            else if (lessonNumber == 2 || lessonNumber == 9) { offsetColor = 29; }
            else if (lessonNumber == 3 || lessonNumber == 10) { offsetColor = 29 * 2; }
            else if (lessonNumber == 4 || lessonNumber == 11) { offsetColor = 29 * 3; }
            else if (lessonNumber == 5 || lessonNumber == 12) { offsetColor = 29 * 4; }
            else if (lessonNumber == 6 || lessonNumber == 13) { offsetColor = 29 * 5; }
            else if (lessonNumber == 7 || lessonNumber == 14) { offsetColor = 29 * 6; }

            this.lessonTitlePanel.setLabel("Lesson_" + lessonNumber);
            this.lessonTitlePanel.resetPanelSprites(offsetColor);
            this.lessonTitlePanel.changePanelSprite("t", 2, { x: 427, y: 748 + offsetColor });
            this.lessonTitlePanel.changePanelSprite("t", 3, { x: 438, y: 748 + offsetColor });
            this.lessonTitlePanel.changePanelSprite("b", 2, { x: 427, y: 757 + offsetColor });
            this.lessonTitlePanel.changePanelSprite("b", 3, { x: 438, y: 757 + offsetColor });
            Lessons.lessonList.push(this.lessonTitlePanel.getSprite());

            this.informationPanel.resetPanelSprites(offsetColor);
            this.informationPanel.changePanelSprite("t", 6, { x: 427, y: 748 + offsetColor });
            this.informationPanel.changePanelSprite("t", 7, { x: 438, y: 748 + offsetColor });
            this.informationPanel.changePanelSprite("b", 6, { x: 427, y: 757 + offsetColor });
            this.informationPanel.changePanelSprite("b", 7, { x: 438, y: 757 + offsetColor });
            this.informationPanel.changePanelSprite("l", 8, { x: 409, y: 748 + offsetColor });
            this.informationPanel.changePanelSprite("l", 9, { x: 409, y: 759 + offsetColor });
            this.informationPanel.changePanelSprite("r", 8, { x: 418, y: 748 + offsetColor });
            this.informationPanel.changePanelSprite("r", 9, { x: 418, y: 759 + offsetColor });
            Lessons.lessonList.push(this.informationPanel.getSprite());
            // --- END MAIN END ---

            let kanaList = Lessons.lists[lessonNumber].split(",");
            let kanaPos = "";

            let offY = 42;
            let nb = 5;
            if (lessonNumber == 8 || lessonNumber == 10) nb = 3;
            for (let i = 0; i < nb; i++) {
                kanaPos = kana + kanaList[i];

                let containerPanel = new Panel({ w: 210, h: 38, v: 10 }, 16, CANVAS_HEIGHT + offY, null, "lessons", Lessons.STATE.Lesson, "", 3);
                containerPanel.setHoverable(true);
                containerPanel.setChangeOnHover(true);
                containerPanel.setToDelete();
                Lessons.lessonList.push(containerPanel.getSprite());

                let strokePanel = new Panel({ w: 130, h: 20, v: 1 }, this.informationPanel.x + 4, this.informationPanel.y + 20, null, "lessons", Lessons.STATE.Lesson, "Stroke_count_" + KANA[kanaPos].frames.length, 2);
                strokePanel.setAlignText(strokePanel.ALIGN_TEXT.Left);
                strokePanel.setToDelete();


                let exampleSprite = null;

                let descriptionPanel = null;
                if (LANG[kana + KANA[kanaPos].roma + "_description"]) {
                    descriptionPanel = new Panel({ w: 160, h: 20, v: 1 }, this.informationPanel.x + 4, strokePanel.y + 14, null, "lessons", Lessons.STATE.Lesson, kana + KANA[kanaPos].roma + "_description", 2); // 21 pour voir le panel
                    descriptionPanel.setAlignText(descriptionPanel.ALIGN_TEXT.Left);
                    descriptionPanel.setToDelete();
                    containerPanel.setTooltip(descriptionPanel);
                    descriptionPanel.setSize({ w: -1, h: (descriptionPanel.completeLines.length * 10) });

                    // this.hira = "|あ|い|う|え|お|か|き|く|け|こ|さ|し|す|せ|そ|た|ち|つ|て|と|な|に|ぬ|ね|の|は|ひ|ふ|へ|ほ|ま|み|む|め|も|や|ゆ|よ|ら|り|る|れ|ろ|わ|を|ん|";
                    // this.hira2 = "|が|ぎ|ぐ|げ|ご|ざ|じ|ず|ぜ|ぞ|だ|ぢ|づ|で|ど|ば|び|ぶ|べ|ぼ|ぱ|ぴ|ぷ|ぺ|ぽ|";
                    // this.kata = "|ア|イ|ウ|エ|オ|カ|キ|ク|ケ|コ|サ|シ|ス|セ|ソ|タ|チ|ツ|テ|ト|ナ|ニ|ヌ|ネ|ノ|ハ|ヒ|フ|ヘ|ホ|マ|ミ|ム|メ|モ|ヤ|ユ|ヨ|ラ|リ|ル|レ|ロ|ワ|ヲ|ン|";
                    // this.kata2 = "|ガ|ギ|グ|ゲ|ゴ|ザ|ジ|ズ|ゼ|ゾ|ダ|ヂ|ヅ|デ|ド|バ|ビ|ブ|ベ|ボ|パ|ピ|プ|ペ|ポ|";
                }

                if ((LANG[kana + KANA[kanaPos].roma + "_writing"])) {

                    let posYDescription = 0;
                    if (descriptionPanel) {
                        posYDescription = descriptionPanel.height + 5;
                    }

                    let writingPanel = new Panel({ w: 160, h: 50, v: 1 }, this.informationPanel.x + 4, strokePanel.y + 14 + posYDescription, null, "lessons", Lessons.STATE.Lesson, kana + KANA[kanaPos].roma + "_writing", 2); // 21 pour voir le panel
                    writingPanel.setAlignText(writingPanel.ALIGN_TEXT.Left);
                    writingPanel.setToDelete();
                    containerPanel.setTooltip(writingPanel);

                    let posX = 1008; //? Position dans la SS
                    let offsetY = 1024; //? Position dans la SS
                    switch (LANG[kana + KANA[kanaPos].roma]) {
                        case "い":
                            exampleSprite = new Sprite({ w: 64, h: 17 }, 10, writingPanel.completeLines.length * 13, writingPanel);
                            exampleSprite.addAnimation("normal", { x: posX, y: offsetY });
                            exampleSprite.changeAnimation("normal");
                            containerPanel.setTooltip(exampleSprite);
                            break;
                        case "お":
                            exampleSprite = new Sprite({ w: 65, h: 20 }, 10, writingPanel.completeLines.length * 13, writingPanel);
                            exampleSprite.addAnimation("normal", { x: posX, y: offsetY + 18 });
                            exampleSprite.changeAnimation("normal");
                            containerPanel.setTooltip(exampleSprite);
                            break;
                        case "き":
                            exampleSprite = new Sprite({ w: 61, h: 19 }, 10, writingPanel.completeLines.length * 13, writingPanel);
                            exampleSprite.addAnimation("normal", { x: posX, y: offsetY + 39 });
                            exampleSprite.changeAnimation("normal");
                            containerPanel.setTooltip(exampleSprite);
                            break;
                        case "こ":
                            exampleSprite = new Sprite({ w: 52, h: 19 }, 10, writingPanel.completeLines.length * 13, writingPanel);
                            exampleSprite.addAnimation("normal", { x: posX, y: offsetY + 59 });
                            exampleSprite.changeAnimation("normal");
                            containerPanel.setTooltip(exampleSprite);
                            break;
                        case "さ":
                            exampleSprite = new Sprite({ w: 61, h: 19 }, 10, writingPanel.completeLines.length * 13, writingPanel);
                            exampleSprite.addAnimation("normal", { x: posX, y: offsetY + 79 });
                            exampleSprite.changeAnimation("normal");
                            containerPanel.setTooltip(exampleSprite);
                            break;
                        case "そ":
                            exampleSprite = new Sprite({ w: 40, h: 21 }, 10, writingPanel.completeLines.length * 13, writingPanel);
                            exampleSprite.addAnimation("normal", { x: posX, y: offsetY + 99 });
                            exampleSprite.changeAnimation("normal");
                            containerPanel.setTooltip(exampleSprite);
                            break;
                        case "な":
                            exampleSprite = new Sprite({ w: 64, h: 20 }, 10, writingPanel.completeLines.length * 13, writingPanel);
                            exampleSprite.addAnimation("normal", { x: posX, y: offsetY + 121 });
                            exampleSprite.changeAnimation("normal");
                            containerPanel.setTooltip(exampleSprite);
                            break;
                        case "ふ":
                            exampleSprite = new Sprite({ w: 82, h: 19 }, 10, writingPanel.completeLines.length * 13, writingPanel);
                            exampleSprite.addAnimation("normal", { x: posX, y: offsetY + 142 });
                            exampleSprite.changeAnimation("normal");
                            containerPanel.setTooltip(exampleSprite);
                            break;
                        case "む":
                            exampleSprite = new Sprite({ w: 61, h: 21 }, 10, writingPanel.completeLines.length * 13, writingPanel);
                            exampleSprite.addAnimation("normal", { x: posX, y: offsetY + 162 });
                            exampleSprite.changeAnimation("normal");
                            containerPanel.setTooltip(exampleSprite);
                            break;
                        case "ゆ":
                            exampleSprite = new Sprite({ w: 43, h: 21 }, 10, writingPanel.completeLines.length * 13, writingPanel);
                            exampleSprite.addAnimation("normal", { x: posX, y: offsetY + 184 });
                            exampleSprite.changeAnimation("normal");
                            containerPanel.setTooltip(exampleSprite);
                            break;
                        case "ら":
                            exampleSprite = new Sprite({ w: 58, h: 21 }, 10, writingPanel.completeLines.length * 13, writingPanel);
                            exampleSprite.addAnimation("normal", { x: posX, y: offsetY + 206 });
                            exampleSprite.changeAnimation("normal");
                            containerPanel.setTooltip(exampleSprite);
                            break;
                        case "り":
                            exampleSprite = new Sprite({ w: 53, h: 22 }, 10, writingPanel.completeLines.length * 13, writingPanel);
                            exampleSprite.addAnimation("normal", { x: posX, y: offsetY + 228 });
                            exampleSprite.changeAnimation("normal");
                            containerPanel.setTooltip(exampleSprite);
                            break;
                        case "タ":
                            exampleSprite = new Sprite({ w: 39, h: 20 }, 10, writingPanel.completeLines.length * 13, writingPanel);
                            exampleSprite.addAnimation("normal", { x: posX, y: offsetY + 251 });
                            exampleSprite.changeAnimation("normal");
                            containerPanel.setTooltip(exampleSprite);
                            break;
                        case "ネ":
                            exampleSprite = new Sprite({ w: 41, h: 20 }, 10, writingPanel.completeLines.length * 13, writingPanel);
                            exampleSprite.addAnimation("normal", { x: posX, y: offsetY + 272 });
                            exampleSprite.changeAnimation("normal");
                            containerPanel.setTooltip(exampleSprite);
                            break;
                        case "ム":
                            exampleSprite = new Sprite({ w: 40, h: 19 }, 10, writingPanel.completeLines.length * 13, writingPanel);
                            exampleSprite.addAnimation("normal", { x: posX, y: offsetY + 293 });
                            exampleSprite.changeAnimation("normal");
                            containerPanel.setTooltip(exampleSprite);
                            break;
                    }
                }





                let leftSprite = new Sprite({ w: 12, h: 38 }, -12, 0, containerPanel);
                leftSprite.addAnimation("normal", { x: 498, y: 748 });
                leftSprite.changeAnimation("normal");

                let rightSprite = new Sprite({ w: 12, h: 38 }, containerPanel.width, 0, containerPanel);
                rightSprite.addAnimation("normal", { x: 510, y: 748 });
                rightSprite.changeAnimation("normal");

                containerPanel.setTooltip(rightSprite);
                containerPanel.setTooltip(leftSprite);

                containerPanel.setTooltip(strokePanel);
                containerPanel.setHoverCB(displayTooltip, { list: "lessons.lesson", tooltip: containerPanel.getTooltip() });

                let kanaPanel = new Panel({ w: 50, h: 38, v: 1 }, containerPanel.x, containerPanel.y, null, "lessons", Lessons.STATE.Lesson, kana + KANA[kanaPos].roma, 2);
                kanaPanel.setFont("kyokasho");
                kanaPanel.setFontSize(30);
                kanaPanel.setOffsets(0, 30);
                kanaPanel.setToDelete();
                Lessons.lessonList.push(kanaPanel.getSprite());

                let romaPanel;
                let romaLabel = "";

                if (KANA[kanaPos].roma == "di") {
                    romaLabel = "ji";
                } else if (KANA[kanaPos].roma == "du") {
                    romaLabel = "zu";
                } else {
                    romaLabel = KANA[kanaPos].roma;
                }

                romaPanel = new Panel({ w: 50, h: 38, v: 1 }, containerPanel.x + 50, containerPanel.y, null, "lessons", Lessons.STATE.Lesson, "roma_" + romaLabel, 2);
                romaPanel.setFont("kyokasho");
                romaPanel.setFontSize(30);
                romaPanel.setOffsets(0, 30);
                romaPanel.setToDelete();
                Lessons.lessonList.push(romaPanel.getSprite());

                let soundBtn = new Button({ w: 26, h: 24 }, containerPanel.x + 110, containerPanel.y + 7, null, { cb: Sound.playCallback, arg: "kana_" + KANA[kanaPos].roma }, "lessons", Lessons.STATE.Lesson, "", 0, true);
                soundBtn.setAnimations({ x: 30, y: 131 });
                soundBtn.setToDelete();
                Lessons.lessonList.push(soundBtn.getSprite());

                let kana1 = new Sprite({ w: 34, h: 34 }, containerPanel.x + 160, containerPanel.y + 2, null, "kana");
                kana1.setKanaToDelete();
                for (let j = 0; j < KANA[kanaPos].frames.length; j++) {
                    kana1.setImageDataOrigin(KANA[kanaPos].imageData[j], KANA[kanaPos].frames[j]);
                }
                Lessons.lessonList.push(kana1);
                offY += 41;
            }

            this.lessonBackBtn = new Button({ w: 30, h: 22 }, 23, CANVAS_HEIGHT + 254, null, { cb: Lessons.transition.bind(this), arg: ["+", Lessons.previousState] }, "lessons", Lessons.STATE.Lesson, "", 0, true);
            this.lessonBackBtn.setAnimations({ x: 86, y: 56 });
            this.lessonBackBtn.setSound("back");
            Lessons.lessonList.push(this.lessonBackBtn.getSprite());

            this.trainingBtn = new Button({ w: 60, h: 31 }, centerX(60, 80), CANVAS_HEIGHT + 253, null, { cb: Lessons.displayChooseTypePanel.bind(this), arg: { bool: true, range: kanaList[kanaList.length - 1], type: kana[0], testType: "Training", lessonNumber: lessonNumber } }, "lessons", Lessons.STATE.Lesson, "Training", 0, true);
            this.trainingBtn.getSprite().addAnimation("normal", { x: 342, y: 408 });
            this.trainingBtn.getSprite().addAnimation("hover", { x: 402, y: 408 }, 6, 0.05, false);
            this.trainingBtn.getSprite().addAnimation("down", { x: 762, y: 408 });
            this.trainingBtn.getSprite().changeAnimation("normal");
            this.trainingBtn.setOffsets(0, 18);
            this.trainingBtn.setFontColor(TEST_BTN_SDW_COLOR, BLACK_COLOR, TEST_BTN_SDW_COLOR, TEST_BTN_HVR_COLOR);
            Lessons.lessonList.push(this.trainingBtn.getSprite());

            this.lessonTestBtn = new Button({ w: 60, h: 31 }, centerX(60, 10, 1), CANVAS_HEIGHT + 253, null, { cb: Lessons.displayChooseTypePanel.bind(this), arg: { bool: true, range: kanaList[kanaList.length - 1], type: kana[0], testType: "Lesson_test", lessonNumber: lessonNumber } }, "lessons", Lessons.STATE.Lesson, "Lesson_test", 0, true);
            this.lessonTestBtn.getSprite().addAnimation("normal", { x: 342, y: 408 });
            this.lessonTestBtn.getSprite().addAnimation("hover", { x: 402, y: 408 }, 6, 0.05, false);
            this.lessonTestBtn.getSprite().addAnimation("down", { x: 762, y: 408 });
            this.lessonTestBtn.getSprite().changeAnimation("normal");
            this.lessonTestBtn.setOffsets(0, 18);

            this.lessonTestBtn.setFontColor(TEST_BTN_SDW_COLOR, BLACK_COLOR, TEST_BTN_SDW_COLOR, TEST_BTN_HVR_COLOR);
            Lessons.lessonList.push(this.lessonTestBtn.getSprite());

            let trophyLevel1 = 0;
            let trophyLevel2 = 0;

            trophyLevel1 = SaveManager.SAVE_DATA["lessons"][kana[0] + lessonNumber]["lessonTestGeneral"]; //? kana[0] = "h" ou "k". kana = "hira_" || "kata_"
            trophyLevel2 = SaveManager.SAVE_DATA["lessons"][kana[0] + lessonNumber]["fullTestGeneral"];

            let multiplicator = 0;
            switch (trophyLevel1) {
                case 16:
                    multiplicator = 1;
                    break;
                case 32:
                    multiplicator = 2;
                    break;
                case 48:
                    multiplicator = 3;
                    break;
                default:
                    multiplicator = 0;
            }

            this.lessonTestTrophy = new Sprite({ w: 36, h: 36 }, this.lessonTestBtn.x + 64, this.lessonTestBtn.y - 4);
            this.lessonTestTrophy.getSprite().addAnimation("normal", { x: 452 + (36 * multiplicator), y: 826 });
            this.lessonTestTrophy.getSprite().changeAnimation("normal");
            Lessons.lessonList.push(this.lessonTestTrophy.getSprite());

            this.lessonTestTrophyPanel = new Panel({ w: 36, h: 13, v: 1 }, this.lessonTestBtn.x + 64, this.lessonTestBtn.y + 3, null, "lessons", Lessons.STATE.Lesson, [], 2);
            this.lessonTestTrophyPanel.setFontColor(BLACK_COLOR, WHITE_COLOR);
            this.lessonTestTrophyPanel.setNumberBool(true);
            this.lessonTestTrophyPanel.setTextOverflow(true);

            let kanaToRomaLevel = 0;
            let romaToKanaLevel = 0;
            kanaToRomaLevel = SaveManager.SAVE_DATA["lessons"][kana[0] + lessonNumber]["lessonTest1"];
            romaToKanaLevel = SaveManager.SAVE_DATA["lessons"][kana[0] + lessonNumber]["lessonTest2"];

            let labelNumber = "0";
            if (multiplicator > 0) {
                Lessons.updateTrophyPanel("lessonTest", true); //? true : LessonTestGeneral > 0 ==> Donc Affichage normal du trophée
            } else {
                // Lessons.updateTrophyPanel(false, labelNumber);
                if ((kanaToRomaLevel > 0 && romaToKanaLevel == 0) || (kanaToRomaLevel == 0 && romaToKanaLevel > 0)) {
                    labelNumber = "1";
                } else {
                    labelNumber = "0";
                }
            }
            this.lessonTestTrophyPanel.setLabel(labelNumber + "/2");
            Lessons.lessonList.push(this.lessonTestTrophyPanel.getSprite());

            if (lessonNumber > 1) {
                this.fullTestBtn = new Button({ w: 60, h: 31 }, centerX(60, 120, 1), CANVAS_HEIGHT + 253, null, { cb: Lessons.displayChooseTypePanel.bind(this), arg: { bool: true, range: kanaList[kanaList.length - 1], type: kana[0], testType: "Full_test", lessonNumber: lessonNumber } }, "lessons", Lessons.STATE.Lesson, "Full_test", 0, true);
                this.fullTestBtn.getSprite().addAnimation("normal", { x: 342, y: 408 });
                this.fullTestBtn.getSprite().addAnimation("hover", { x: 402, y: 408 }, 6, 0.05, false);
                this.fullTestBtn.getSprite().addAnimation("down", { x: 762, y: 408 });
                this.fullTestBtn.getSprite().changeAnimation("normal");
                this.fullTestBtn.setOffsets(0, 18);
                this.fullTestBtn.setFontColor(TEST_BTN_SDW_COLOR, BLACK_COLOR, TEST_BTN_SDW_COLOR, TEST_BTN_HVR_COLOR);
                Lessons.lessonList.push(this.fullTestBtn.getSprite());
            }

            multiplicator = 0;
            switch (trophyLevel2) {
                case 16:
                    multiplicator = 1;
                    break;
                case 32:
                    multiplicator = 2;
                    break;
                case 48:
                    multiplicator = 3;
                    break;
                default:
                    multiplicator = 0;
            }


            if (lessonNumber > 1) {
                this.fullTestTrophy = new Sprite({ w: 36, h: 36 }, this.fullTestBtn.x + 64, this.fullTestBtn.y - 4);
                this.fullTestTrophy.getSprite().addAnimation("normal", { x: 452 + (36 * multiplicator), y: 826 });
                this.fullTestTrophy.getSprite().changeAnimation("normal");
                Lessons.lessonList.push(this.fullTestTrophy.getSprite());


                this.fullTestTrophyPanel = new Panel({ w: 36, h: 13, v: 1 }, this.fullTestBtn.x + 64, this.fullTestBtn.y + 3, null, "lessons", Lessons.STATE.Lesson, [], 2);
                this.fullTestTrophyPanel.setFontColor(BLACK_COLOR, WHITE_COLOR);
                this.fullTestTrophyPanel.setNumberBool(true);
                this.fullTestTrophyPanel.setTextOverflow(true);

                kanaToRomaLevel = 0;
                romaToKanaLevel = 0;
                kanaToRomaLevel = SaveManager.SAVE_DATA["lessons"][kana[0] + lessonNumber]["fullTest1"];
                romaToKanaLevel = SaveManager.SAVE_DATA["lessons"][kana[0] + lessonNumber]["fullTest2"];

                labelNumber = "0";
                if (multiplicator > 0) {
                    Lessons.updateTrophyPanel("fullTest", true);
                } else {
                    if ((kanaToRomaLevel > 0 && romaToKanaLevel == 0) || (kanaToRomaLevel == 0 && romaToKanaLevel > 0)) {
                        labelNumber = "1";
                    } else {
                        labelNumber = "0";
                    }
                }
                this.fullTestTrophyPanel.setLabel(labelNumber + "/2");
                Lessons.lessonList.push(this.fullTestTrophyPanel.getSprite());
            }


        } else { // BACK TO LESSONS
            this.canvasY = -600;

            Sprite.kanaList.forEach(k => {
                if (k.kanaToDelete) {
                    k.setActive(false);
                }
            })


            if (this.lessonBackBtn) this.lessonBackBtn.removeFromList();
            if (this.playBtn) this.playBtn.removeFromList();
            if (this.trainingBtn) this.trainingBtn.removeFromList();
            if (this.lessonTestBtn) this.lessonTestBtn.removeFromList();
            if (this.fullTestBtn) this.fullTestBtn.removeFromList();
        }

        Lessons.TRANSLATION_TRANSITION = true;
    }

    //!  _______               _______    _______    _______    _______    _______    _______    _          _______    _       
    //! (  ____ \  |\     /|  (  ___  )  (  ___  )  (  ____ \  (  ____ \  (  ____ )  (  ___  )  ( (    /|  (  ____ \  ( \      
    //! | (    \/  | )   ( |  | (   ) |  | (   ) |  | (    \/  | (    \/  | (    )|  | (   ) |  |  \  ( |  | (    \/  | (      
    //! | |        | (___) |  | |   | |  | |   | |  | (_____   | (__      | (____)|  | (___) |  |   \ | |  | (__      | |      
    //! | |        |  ___  |  | |   | |  | |   | |  (_____  )  |  __)     |  _____)  |  ___  |  | (\ \) |  |  __)     | |      
    //! | |        | (   ) |  | |   | |  | |   | |        ) |  | (        | (        | (   ) |  | | \   |  | (        | |      
    //! | (____/\  | )   ( |  | (___) |  | (___) |  /\____) |  | (____/\  | )        | )   ( |  | )  \  |  | (____/\  | (____/\
    //! (_______/  |/     \|  (_______)  (_______)  \_______)  (_______/  |/         |/     \|  |/    )_)  (_______/  (_______/

    static displayChooseTypePanel(pParams) {

        this.bChooseType = pParams.bool;

        if (this.bChooseType) {
            Button.currentList.forEach(b => {
                b.setState(Button.STATE.Inactive);
            });
            Panel.currentList.forEach(p => {
                p.setState(Panel.STATE.Inactive);
            });

            this.chooseTypeBg = new Sprite({ w: 1, h: 1 }, 0, CANVAS_HEIGHT, null, "normal", { x: CANVAS_WIDTH, y: CANVAS_HEIGHT });
            this.chooseTypeBg.getSprite().addAnimation("normal", { x: 38, y: 3 });
            this.chooseTypeBg.getSprite().changeAnimation("normal");
            this.chooseTypeBg.setAlpha(0);
            this.chooseTypeBg.fade(0.01);
            Lessons.lessonList.push(this.chooseTypeBg.getSprite());

            this.chooseTypePanel = new Panel({ w: 17, h: 17, v: 16 }, centerX(202), CANVAS_HEIGHT + 50, null, "lessons", Lessons.STATE.Lesson, "", [1]);
            this.chooseTypePanel.changePanelSprite("t", 4, { x: 564, y: 748 });
            this.chooseTypePanel.changePanelSprite("t", 12, { x: 564, y: 748 });

            this.chooseTypePanel.beginMoving({ x: centerX(202), y: CANVAS_HEIGHT + 40 })

            Panel.list.push(this.chooseTypePanel);
            Panel.currentList.push(this.chooseTypePanel);
            Lessons.lessonList.push(this.chooseTypePanel.getSprite());

            this.chooseTypeTitle = new Panel({ w: 80, h: 17, v: 4 }, centerXElement(this.chooseTypePanel, 80), 14, this.chooseTypePanel, "lessons", Lessons.STATE.Lesson, pParams.testType, 5);
            this.chooseTypeTitle.setOffsets(0, 12);
            // this.chooseTypeTitle.setFontColor(CHOOSETYPE_SDW_COLOR_0);
            this.chooseTypeTitle.setFontColor(CHOOSETYPE_SDW_COLOR);
            // this.chooseTypeTitle.setAlpha(0);
            Panel.list.push(this.chooseTypeTitle);
            Panel.currentList.push(this.chooseTypeTitle);
            Lessons.lessonList.push(this.chooseTypeTitle.getSprite());

            let btnLabel = "";
            let btn2Label = "";
            switch (pParams.type) {
                case "h":
                    btnLabel = "あ_to_a";
                    btn2Label = "a_to_あ";
                    break;
                case "k":
                    btnLabel = "ア_to_a";
                    btn2Label = "a_to_ア";
                    break;
            }

            // this.kanaToRomaBtn = new Button({ w: 80, h: 20, v: 6 }, centerXElement(this.chooseTypePanel, 80), 70, this.chooseTypePanel, { cb: startBtnCB, arg: { range: pParams.range, answerType: pParams.type, choiceType: "r", testType: pParams.testType, lessonNumber: pParams.lessonNumber } }, "lessons", Lessons.STATE.Lesson, btnLabel, 41);
            this.kanaToRomaBtn = new Button({ w: 80, h: 20, v: 6 }, centerXElement(this.chooseTypePanel, 80), 70, this.chooseTypePanel,
                {
                    cb: Transition.init.bind(Transition),
                    arg: {
                        callback: { cb: startBtnCB, arg: { range: pParams.range, answerType: pParams.type, choiceType: "r", testType: pParams.testType, lessonNumber: pParams.lessonNumber } },
                        pos: { x: centerX(), y: this.chooseTypePanel.y + 70, r: 450, maxR: 0 },
                        speed: 1,
                        stopEffect: false,
                        height: true
                    }
                },
                "lessons", Lessons.STATE.Lesson, btnLabel, 41);
            // let lessonsBtn = new Button({ w: 110, h: 22, v: 8 }, centerX(110), 320, null, { cb: FadeEffect.fade.bind(FadeEffect), arg: { callback: { cb: changeMainState, arg: { state: MAIN_STATE.Lessons, from: "mainmenu" } }, direction: "out", maxTimer: 0.01 } }, "mainmenu", MainMenu.STATE.Main, "Lessons", 4);

            this.kanaToRomaBtn.setFontColor(RED_BTN_SDW_COLOR);
            this.kanaToRomaBtn.setAlpha(0);
            // Button.list.push(this.kanaToRomaBtn);
            Button.currentList.push(this.kanaToRomaBtn);
            Lessons.lessonList.push(this.kanaToRomaBtn.getSprite());

            // this.romaTokanaBtn = new Button({ w: 80, h: 20, v: 6 }, centerXElement(this.chooseTypePanel, 80), 110, this.chooseTypePanel, { cb: startBtnCB, arg: { range: pParams.range, answerType: "r", choiceType: pParams.type, testType: pParams.testType, lessonNumber: pParams.lessonNumber } }, "lessons", Lessons.STATE.Lesson, btn2Label, 41);
            this.romaTokanaBtn = new Button({ w: 80, h: 20, v: 6 }, centerXElement(this.chooseTypePanel, 80), 110, this.chooseTypePanel,
                {
                    cb: Transition.init.bind(Transition),
                    arg: {
                        callback: { cb: startBtnCB, arg: { range: pParams.range, answerType: "r", choiceType: pParams.type, testType: pParams.testType, lessonNumber: pParams.lessonNumber } },
                        pos: { x: centerX(), y: this.chooseTypePanel.y + 110, r: 450, maxR: 0 },
                        speed: 1,
                        stopEffect: false,
                        height: true
                    }
                },
                "lessons", Lessons.STATE.Lesson, btn2Label, 41);
            this.romaTokanaBtn.setFontColor(RED_BTN_SDW_COLOR);
            this.romaTokanaBtn.setAlpha(0);
            // Button.list.push(this.romaTokanaBtn);
            Button.currentList.push(this.romaTokanaBtn);
            Lessons.lessonList.push(this.romaTokanaBtn.getSprite());

            if (pParams.testType != "Training") {
                let trophyLevel1 = 0;
                let trophyLevel2 = 0;
                if (pParams.testType == "Lesson_test") {
                    trophyLevel1 = SaveManager.SAVE_DATA["lessons"][pParams.type + pParams.lessonNumber]["lessonTest1"];
                    trophyLevel2 = SaveManager.SAVE_DATA["lessons"][pParams.type + pParams.lessonNumber]["lessonTest2"];
                } else if (pParams.testType == "Full_test") {
                    trophyLevel1 = SaveManager.SAVE_DATA["lessons"][pParams.type + pParams.lessonNumber]["fullTest1"];
                    trophyLevel2 = SaveManager.SAVE_DATA["lessons"][pParams.type + pParams.lessonNumber]["fullTest2"];
                }


                this.kanaToRomaTrophy = new Sprite({ w: 16, h: 19 }, 150, 70, this.chooseTypePanel);
                this.kanaToRomaTrophy.getSprite().addAnimation("normal", { x: 30 + trophyLevel1, y: 112 });
                this.kanaToRomaTrophy.getSprite().changeAnimation("normal");
                Lessons.lessonList.push(this.kanaToRomaTrophy.getSprite());

                this.romaTokanaTrophy = new Sprite({ w: 16, h: 19 }, 150, 110, this.chooseTypePanel);
                this.romaTokanaTrophy.getSprite().addAnimation("normal", { x: 30 + trophyLevel2, y: 112 });
                this.romaTokanaTrophy.getSprite().changeAnimation("normal");
                Lessons.lessonList.push(this.romaTokanaTrophy.getSprite());
            }

            // CTP : Choose Type Panel
            this.backFromCTPBtn = new Button({ w: 30, h: 22 }, centerXElement(this.chooseTypePanel, 30), 160, this.chooseTypePanel, { cb: Lessons.displayChooseTypePanel.bind(this), arg: { bool: false, testType: pParams.testType } }, "lessons", Lessons.STATE.Lesson, "", 0, true);
            this.backFromCTPBtn.setAnimations({ x: 86, y: 56 });
            this.backFromCTPBtn.setAlpha(0);
            this.backFromCTPBtn.setSound("back");
            // Button.list.push(this.backFromCTPBtn);
            Button.currentList.push(this.backFromCTPBtn);
            Lessons.lessonList.push(this.backFromCTPBtn.getSprite());

        } else {

            this.chooseTypeBg.delete = true;
            this.chooseTypePanel.removeFromList();
            this.chooseTypeTitle.removeFromList();
            this.backFromCTPBtn.removeFromList();
            this.kanaToRomaBtn.removeFromList();
            this.romaTokanaBtn.removeFromList();

            this.chooseTypePanel.removeFromCurrentList();
            this.chooseTypeTitle.removeFromCurrentList();
            this.backFromCTPBtn.removeFromCurrentList();
            this.kanaToRomaBtn.removeFromCurrentList();
            this.romaTokanaBtn.removeFromCurrentList();

            this.chooseTypePanel.getSprite().delete = true;
            this.chooseTypeTitle.getSprite().delete = true;
            this.backFromCTPBtn.getSprite().delete = true;
            this.kanaToRomaBtn.getSprite().delete = true;
            this.romaTokanaBtn.getSprite().delete = true;
            if (pParams.testType != "Training") {
                this.kanaToRomaTrophy.getSprite().delete = true;
                this.romaTokanaTrophy.getSprite().delete = true;
            }

            this.chooseTypePanel = null;
            this.chooseTypeTitle = null;
            this.backFromCTPBtn = null;
            this.kanaToRomaBtn = null;
            this.kanaToRomaTrophy = null;
            this.romaTokanaBtn = null;
            this.romaTokanaTrophy = null;

            Button.currentList.forEach(b => {
                b.setState(Button.STATE.Normal);
            });
            Panel.currentList.forEach(p => {
                p.setState(Panel.STATE.Normal);
            });
        }

    }

    static addStarTrophy(pParams) {
        if (pParams.slice(0, 1) == "h") {
            Lessons.hiraganaList.push(this.starTrophyList[pParams].getSprite());
        } else {
            Lessons.katakanaList.push(this.starTrophyList[pParams].getSprite());
        }
    }

    static displayNewLogo(pKana, pLessonNumber) {

        const position = Number(pLessonNumber) - 1;
        let originX = 0;
        let originY = 0;
        let originDestinationX = 0;
        let originDestinationY = 0;

        if (pKana == "h") {
            originX = LessonBtn.hiraganaList[position].x + 60
            originY = LessonBtn.hiraganaList[position].y;
            originDestinationX = LessonBtn.hiraganaList[position].x + 60;
            originDestinationY = LessonBtn.hiraganaList[position].y - 10;

            this.hiraNewSprite = new Sprite({ w: 28, h: 20 }, originX, originY, null, "n_" + pLessonNumber);
            this.hiraNewSprite.setClass("new");
            this.hiraNewSprite.addAnimation("normal", { x: 352, y: 513 }, 2, 0.3);
            this.hiraNewSprite.changeAnimation("normal");
            this.hiraNewSprite.setOffsetSS(1);
            this.hiraNewSprite.setDestination({ x: originDestinationX, y: originDestinationY });
            this.hiraNewSprite.setOriginPos({ x: originX, y: originY });
            this.hiraNewSprite.setOriginDestination({ x: originDestinationX, y: originDestinationY });
            this.hiraNewSprite.setMovingType(Sprite.MOVING_TYPE.ComeAndGo);
            Lessons.hiraganaList.push(this.hiraNewSprite);

        } else {
            originX = LessonBtn.katakanaList[position].x + 60
            originY = LessonBtn.katakanaList[position].y;
            originDestinationX = LessonBtn.katakanaList[position].x + 60;
            originDestinationY = LessonBtn.katakanaList[position].y - 10;

            this.kataNewSprite = new Sprite({ w: 28, h: 20 }, originX, originY, null, "n_" + pLessonNumber);
            this.kataNewSprite.setClass("new");
            this.kataNewSprite.addAnimation("normal", { x: 352, y: 513 }, 2, 0.3);
            this.kataNewSprite.changeAnimation("normal");
            this.kataNewSprite.setOffsetSS(1);
            this.kataNewSprite.setDestination({ x: originDestinationX, y: originDestinationY });
            this.kataNewSprite.setOriginPos({ x: originX, y: originY });
            this.kataNewSprite.setOriginDestination({ x: originDestinationX, y: originDestinationY });
            this.kataNewSprite.setMovingType(Sprite.MOVING_TYPE.ComeAndGo);
            Lessons.katakanaList.push(this.kataNewSprite);
        }
    }

    static changeState(pNewState, pSwitch = true) {
        Lessons.state = pNewState;
        Panel.resetTypeState("lessons", pNewState);
        if (pNewState != Lessons.STATE.Lesson && pSwitch) {
            Button.resetTypeState("lessons", pNewState, Lessons.STATE.Main);
            Lessons.switchButtons();
        } else if (!pSwitch) {
            Button.resetTypeState("lessons", pNewState, Lessons.STATE.Main);
        } else {
            Button.resetTypeState("lessons", pNewState);
        }
    }

    static watchPrologueAgain() {
        if (LessonTutorial.bInit) {
            LessonTutorial.bInit = false;
        }
        changeMainState(MAIN_STATE.LessonTutorial);
    }

    static backToLesson() {
        mainState = MAIN_STATE.Lessons;
        Lessons.changeState(Lessons.STATE.Lesson);
    }

    static quitLessonsMenu() {
        if (Lessons.state == Lessons.STATE.Hiragana) Lessons.changeState(Lessons.STATE.Katakana);
        toMainMenu();
    }

    static switchButtons() {
        switch (Lessons.state) { //? New State
            case Lessons.STATE.Hiragana:
                // No reaction
                this.hiraganaBtn.getSprite().resetAnimations("normal", { x: 764, y: 444 });
                this.hiraganaBtn.getSprite().resetAnimations("hover", { x: 764, y: 444 });
                this.hiraganaBtn.getSprite().resetAnimations("down", { x: 764, y: 444 });
                this.hiraganaBtn.setFontColor(GREEN_BOARD_SDW_COLOR2, WHITE_COLOR, GREEN_BOARD_SDW_COLOR2, WHITE_COLOR);

                this.katakanaBtn.getSprite().resetAnimations("normal", { x: 992, y: 470 });
                this.katakanaBtn.getSprite().resetAnimations("hover", { x: 878, y: 470 });
                this.katakanaBtn.getSprite().resetAnimations("down", { x: 878, y: 470 });
                this.katakanaBtn.setFontColor(GREEN_BOARD_SDW_COLOR2, INACTIVE_SDW_COLOR, GREEN_BOARD_SDW_COLOR2, WHITE_COLOR);

                break;
            case Lessons.STATE.Katakana:
                this.hiraganaBtn.getSprite().resetAnimations("normal", { x: 992, y: 444 });
                this.hiraganaBtn.getSprite().resetAnimations("hover", { x: 878, y: 444 });
                this.hiraganaBtn.getSprite().resetAnimations("down", { x: 878, y: 444 });
                this.hiraganaBtn.setFontColor(GREEN_BOARD_SDW_COLOR2, INACTIVE_SDW_COLOR, GREEN_BOARD_SDW_COLOR2, WHITE_COLOR);

                // No reaction
                this.katakanaBtn.getSprite().resetAnimations("normal", { x: 764, y: 470 });
                this.katakanaBtn.getSprite().resetAnimations("hover", { x: 764, y: 470 });
                this.katakanaBtn.getSprite().resetAnimations("down", { x: 764, y: 470 });
                this.katakanaBtn.setFontColor(GREEN_BOARD_SDW_COLOR2, WHITE_COLOR, GREEN_BOARD_SDW_COLOR2, WHITE_COLOR);

                if (SaveManager.SAVE_DATA["prologue"] != 12) {
                    SaveManager.save([{ type: "prologue", value: 12 }]);
                    Transition.init({
                        callback: {},
                        type: "l",
                        pos: { x: LessonBtn.katakanaList[0].x + 36, y: LessonBtn.katakanaList[0].y + 15, r: 300, maxR: 50 },
                        speed: 1,
                        stopEffect: true,
                        height: false
                    });
                }

                break;
        }
    }



    //!                _______    ______     _______   _________   _______            _________   _______    _______    _______                       
    //!    |\     /|  (  ____ )  (  __  \   (  ___  )  \__   __/  (  ____ \           \__   __/  (  ____ )  (  ___  )  (  ____ )  |\     /|  |\     /|
    //!    | )   ( |  | (    )|  | (  \  )  | (   ) |     ) (     | (    \/              ) (     | (    )|  | (   ) |  | (    )|  | )   ( |  ( \   / )
    //!    | |   | |  | (____)|  | |   ) |  | (___) |     | |     | (__       _____      | |     | (____)|  | |   | |  | (____)|  | (___) |   \ (_) / 
    //!    | |   | |  |  _____)  | |   | |  |  ___  |     | |     |  __)     (_____)     | |     |     __)  | |   | |  |  _____)  |  ___  |    \   /  
    //!    | |   | |  | (        | |   ) |  | (   ) |     | |     | (                    | |     | (\ (     | |   | |  | (        | (   ) |     ) (   
    //!    | (___) |  | )        | (__/  )  | )   ( |     | |     | (____/\              | |     | ) \ \__  | (___) |  | )        | )   ( |     | |   
    //!    (_______)  |/         (______/   |/     \|     )_(     (_______/              )_(     |/   \__/  (_______)  |/         |/     \|     \_/   




    static updateTrophyValue(pTrophyType, pValue) { // "general", "kana_to_roma", "roma_to_kana"
        let newValue = 30 + pValue; // pValue == 48 32 16
        let multiplicator = 0
        switch (pValue) {
            case 16:
                multiplicator = 1;
                break;
            case 32:
                multiplicator = 2;
                break;
            case 48:
                multiplicator = 3;
                break;
        }

        switch (pTrophyType) {
            case "kana_to_roma":
                if (this.kanaToRomaTrophy.currentAnimation.origin.x < newValue) {
                    this.kanaToRomaTrophy.resetAnimations("normal", { x: newValue, y: this.kanaToRomaTrophy.currentAnimation.origin.y });
                }
                break;
            case "roma_to_kana":
                if (this.romaTokanaTrophy.currentAnimation.origin.x < newValue) {
                    this.romaTokanaTrophy.resetAnimations("normal", { x: newValue, y: this.romaTokanaTrophy.currentAnimation.origin.y });
                }
                break;
            case "lessonTest":
                if (this.lessonTestTrophy.currentAnimation.origin.x < 452 + (36 * multiplicator)) {
                    this.lessonTestTrophy.resetAnimations("normal", { x: 452 + (36 * multiplicator), y: this.lessonTestTrophy.currentAnimation.origin.y });
                    this.lessonTestTrophyPanel.setFontColor(BLACK_COLOR_0, WHITE_COLOR_0);
                    if (!Lessons.lessonList.includes(this.lessonTestTrophy.getSprite())) {
                        Lessons.lessonList.push(this.lessonTestTrophy.getSprite());
                    }
                }
                break;
            case "fullTest":
                if (this.fullTestTrophy.currentAnimation.origin.x < 452 + (36 * multiplicator)) {
                    this.fullTestTrophy.resetAnimations("normal", { x: 452 + (36 * multiplicator), y: this.fullTestTrophy.currentAnimation.origin.y });
                    this.fullTestTrophyPanel.setFontColor(BLACK_COLOR_0, WHITE_COLOR_0);
                    if (!Lessons.lessonList.includes(this.fullTestTrophy.getSprite())) {
                        Lessons.lessonList.push(this.fullTestTrophy.getSprite());
                    }
                }
                break;
        }
    }


    static updateTrophyPanel(pType, bEnd = false) {

        if (bEnd) {
            if (pType == "lessonTest") {
                this.lessonTestTrophyPanel.setLabel("2/2");
                this.lessonTestTrophyPanel.setFontColor(BLACK_COLOR_0, WHITE_COLOR_0);
            } else if (pType == "fullTest") {
                this.fullTestTrophyPanel.setLabel("2/2");
                this.fullTestTrophyPanel.setFontColor(BLACK_COLOR_0, WHITE_COLOR_0);
            }
        } else {

            if (pType == "lessonTest") {
                this.lessonTestTrophyPanel.setLabel("1/2");
            } else if (pType == "fullTest") {
                this.fullTestTrophyPanel.setLabel("1/2");
            }
        }

    }

    static update(dt) {


        if (Lessons.FIRST_TIME) {
            SaveManager.save([{ type: "prologue", value: 11 }]);
            if (this.state == Lessons.STATE.Hiragana) {
                Transition.init({
                    callback: {},
                    type: "l",
                    pos: { x: LessonBtn.hiraganaList[0].x + 36, y: LessonBtn.hiraganaList[0].y + 15, r: 300, maxR: 50 },
                    speed: 1,
                    stopEffect: true,
                    height: false
                });
            }
            Lessons.FIRST_TIME = false;
        }

        if (Lessons.TRANSLATION_TRANSITION) {
            this.canvasY += this.translationY * (60 * dt);


            if (this.canvasY <= -600 && Lessons.state != Lessons.STATE.Lesson) { // GO TO LESSON

                this.canvasY = -600;

                this.translationY = 50;
                Button.currentList.forEach(b => {
                    if (b.getState() != Button.STATE.Normal && b.getState() != LessonBtn.STATE.Close) {
                        b.setState(Button.STATE.Normal);

                        if (b.bTextOffsetChanged) {
                            b.resetOffsets();
                        }

                        b.getTooltip().forEach(sp => {
                            if (sp instanceof Sprite) {
                                sp.delete = true;
                            } else {
                                sp.getSprite().delete = true;
                            }
                        });
                        for (const sp in b.getSprite()) {
                            if (b.getSprite()[sp] instanceof Sprite) {
                                b.getSprite()[sp].changeAnimation("normal");
                            }
                        }
                    } else {
                        if (b.bTextOffsetChanged) {
                            b.resetOffsets();
                        }
                    }
                });

                Sprite.kanaList.forEach(k => {
                    if (k.kanaToDelete) {
                        k.setActive(true);
                    }
                })

                Lessons.TRANSLATION_TRANSITION = false;
                this.changeState(Lessons.STATE.Lesson);
                MOUSE_SPRITE.y += CANVAS_HEIGHT;
                MOUSE_SPRITE.changeAnimation("normal");

            } else if (this.canvasY > 0 && Lessons.state == Lessons.STATE.Lesson) { // BACK TO MENU
                this.canvasY = 0;
                this.translationY = -50;
                Button.currentList.forEach(b => {
                    if (b.getState() != Button.STATE.Normal && b.getState() != LessonBtn.STATE.Close) {
                        b.setState(Button.STATE.Normal);
                        b.getTooltip().forEach(sp => {
                            if (sp instanceof Sprite) {
                                sp.delete = true;
                            } else {
                                sp.getSprite().delete = true;
                            }
                        });
                        for (const sp in b.getSprite()) {
                            if (b.getSprite()[sp] instanceof Sprite) {
                                b.getSprite()[sp].changeAnimation("normal");
                            }
                        }
                    }
                });

                Sprite.kanaList = Sprite.kanaList.filter(sp => {
                    return !sp.kanaToDelete;
                });

                Button.currentList.forEach(b => {
                    if (b.bToDelete) {
                        b.removeFromList();
                    }
                });
                Panel.currentList.forEach(p => {
                    if (p.bToDelete) {
                        p.removeFromList();
                    }
                });
                Lessons.lessonList = [];

                Lessons.TRANSLATION_TRANSITION = false;
                MOUSE_SPRITE.y -= CANVAS_HEIGHT;
                MOUSE_SPRITE.changeAnimation("normal");

                if (Lessons.previousState == Lessons.STATE.Hiragana) {
                    Lessons.changeState(Lessons.STATE.Hiragana, false);
                } else {
                    Lessons.changeState(Lessons.STATE.Katakana, false);
                }
                Lessons.previousState = -1;

                if (Game1.finishedLesson > 0) {

                    if (this.state == Lessons.STATE.Hiragana) {
                        Transition.init({
                            callback: {},
                            type: "l",
                            pos: { x: LessonBtn.hiraganaList[Game1.finishedLesson].x + 36, y: LessonBtn.hiraganaList[Game1.finishedLesson].y + 15, r: 300, maxR: 50 },
                            speed: 1,
                            stopEffect: true,
                            height: false
                        });
                    } else {
                        Transition.init({
                            callback: {},
                            type: "l",
                            pos: { x: LessonBtn.katakanaList[Game1.finishedLesson].x + 36, y: LessonBtn.katakanaList[Game1.finishedLesson].y + 15, r: 300, maxR: 50 },
                            speed: 1,
                            stopEffect: true,
                            height: false
                        });
                    }

                    Game1.finishedLesson = 0;
                }

            }



        }

        Sprite.manageBeforeUpdating(Lessons.mainList, dt);
        Lessons.mainList = Lessons.mainList.filter(sp => {
            return !sp.delete;
        });

        if (Lessons.state == Lessons.STATE.Hiragana) {
            Sprite.manageBeforeUpdating(Lessons.hiraganaList, dt);
            Lessons.hiraganaList = Lessons.hiraganaList.filter(sp => {
                return !sp.delete;
            });
        }

        if (Lessons.state == Lessons.STATE.Katakana) {
            Sprite.manageBeforeUpdating(Lessons.katakanaList, dt);
            Lessons.katakanaList = Lessons.katakanaList.filter(sp => {
                return !sp.delete;
            });
        }

        Sprite.manageBeforeUpdating(Lessons.lessonList, dt);
        Lessons.lessonList = Lessons.lessonList.filter(sp => {
            return !sp.delete;
        });

        Sprite.kanaList.forEach(sp => {
            if (sp.active) {
                sp.updateKana(dt);
            }
        })

        Button.currentList.forEach(b => {
            if (b.parent && b.parent.bFading && b.label == "") {
                b.updateAlpha();
            }
        });

        Panel.currentList.forEach(p => {
            p.update(dt);
        })

        if (FadeEffect.bActive) {
            FadeEffect.update(dt);
        }

        if (Transition.bActive) {
            Transition.update(dt);
        }
    }

    static draw(ctx) {
        if (Lessons.TRANSLATION_TRANSITION) {

            ctx.transform(1, 0, 0, 1, 0, this.canvasY);
            // this.canvasY += this.translationY;

            /*
            
                        if (this.canvasY <= -600 && Lessons.state != Lessons.STATE.Lesson) { // GO TO LESSON
                            this.translationY = 50;
                            Button.currentList.forEach(b => {
                                if (b.getState() != Button.STATE.Normal && b.getState() != LessonBtn.STATE.Close) {
                                    b.setState(Button.STATE.Normal);
            
                                    if (b.bTextOffsetChanged) {
                                        b.resetOffsets();
                                    }
            
                                    b.getTooltip().forEach(sp => {
                                        if (sp instanceof Sprite) {
                                            sp.delete = true;
                                        } else {
                                            sp.getSprite().delete = true;
                                        }
                                    });
                                    for (const sp in b.getSprite()) {
                                        if (b.getSprite()[sp] instanceof Sprite) {
                                            b.getSprite()[sp].changeAnimation("normal");
                                        }
                                    }
                                } else {
                                    if (b.bTextOffsetChanged) {
                                        b.resetOffsets();
                                    }
                                }
                            });
            
                            Sprite.kanaList.forEach(k => {
                                if (k.kanaToDelete) {
                                    k.setActive(true);
                                }
                            })
            
                            Lessons.TRANSLATION_TRANSITION = false;
                            this.changeState(Lessons.STATE.Lesson);
                            MOUSE_SPRITE.y += CANVAS_HEIGHT;
                            MOUSE_SPRITE.changeAnimation("normal");
            
                        } else if (this.canvasY > 0 && Lessons.state == Lessons.STATE.Lesson) { // BACK TO MENU
                            this.canvasY = 0;
                            this.translationY = -50;
                            Button.currentList.forEach(b => {
                                if (b.getState() != Button.STATE.Normal && b.getState() != LessonBtn.STATE.Close) {
                                    b.setState(Button.STATE.Normal);
                                    b.getTooltip().forEach(sp => {
                                        if (sp instanceof Sprite) {
                                            sp.delete = true;
                                        } else {
                                            sp.getSprite().delete = true;
                                        }
                                    });
                                    for (const sp in b.getSprite()) {
                                        if (b.getSprite()[sp] instanceof Sprite) {
                                            b.getSprite()[sp].changeAnimation("normal");
                                        }
                                    }
                                }
                            });
            
                            Sprite.kanaList = Sprite.kanaList.filter(sp => {
                                return !sp.kanaToDelete;
                            });
            
                            Button.currentList.forEach(b => {
                                if (b.bToDelete) {
                                    b.removeFromList();
                                }
                            });
                            Panel.currentList.forEach(p => {
                                if (p.bToDelete) {
                                    p.removeFromList();
                                }
                            });
                            Lessons.lessonList = [];
            
                            Lessons.TRANSLATION_TRANSITION = false;
                            MOUSE_SPRITE.y -= CANVAS_HEIGHT;
                            MOUSE_SPRITE.changeAnimation("normal");
            
                            if (Lessons.previousState == Lessons.STATE.Hiragana) {
                                Lessons.changeState(Lessons.STATE.Hiragana, false);
                            } else {
                                Lessons.changeState(Lessons.STATE.Katakana, false);
                            }
                            Lessons.previousState = -1;
            
                            if (Game1.finishedLesson > 0) {
            
                                if (this.state == Lessons.STATE.Hiragana) {
                                    Transition.init({
                                        callback: {},
                                        type: "l",
                                        pos: { x: LessonBtn.hiraganaList[Game1.finishedLesson].x + 36, y: LessonBtn.hiraganaList[Game1.finishedLesson].y + 15, r: 300, maxR: 50 },
                                        speed: 1,
                                        stopEffect: true,
                                        height: false
                                    });
                                } else {
                                    Transition.init({
                                        callback: {},
                                        type: "l",
                                        pos: { x: LessonBtn.katakanaList[Game1.finishedLesson].x + 36, y: LessonBtn.katakanaList[Game1.finishedLesson].y + 15, r: 300, maxR: 50 },
                                        speed: 1,
                                        stopEffect: true,
                                        height: false
                                    });
                                }
            
                                Game1.finishedLesson = 0;
                            } else {
                            }
            
                        }
            */
        }
        ctx.setTransform(1 * SCALE_X, 0, 0, 1 * SCALE_Y, 0, this.canvasY);

        Sprite.manageBeforeDrawing(Lessons.mainList);
        if (Lessons.lessonList) {
            Sprite.manageBeforeDrawing(Lessons.lessonList);
        }

        switch (Lessons.state) {

            case Lessons.STATE.Hiragana:
                Sprite.manageBeforeDrawing(Lessons.hiraganaList);
                break;

            case Lessons.STATE.Katakana:
                Sprite.manageBeforeDrawing(Lessons.katakanaList);
                break;

            case Lessons.STATE.Transition:

                break;
        }

        ctx.font = "10px jpfont";
        // if (SaveManager.SAVE_DATA["prologue"]) {
        //     ctx.fillText("Prologue OK", 0, 10);
        // } else {
        //     ctx.fillText("Prologue NOT YET, GO prologue !!", 0, 10);
        // }

        ctx.font = "20px jpfont";
        ctx.textAlign = "center";
        ctx.shadowColor = GREEN_BOARD_SDW_COLOR2;
        ctx.shadowOffsetY = 4;
        ctx.fillStyle = WHITE_COLOR;

        if (Lessons.state == Lessons.STATE.Hiragana) {
            ctx.fillText("Hiragana", centerX(), 80);
        } else if (Lessons.state == Lessons.STATE.Katakana) {
            ctx.fillText("Katakana", centerX(), 80);
        } else {
            if (Lessons.previousState == Lessons.STATE.Hiragana) {
                ctx.fillText("Hiragana", centerX(), 80);
            } else {
                ctx.fillText("Katakana", centerX(), 80);
            }
        }
        ctx.shadowOffsetY = 0;

        ctx.textAlign = "left";

        if (FadeEffect.bActive) {
            FadeEffect.draw(ctx);
        }

        if (Transition.bActive) {
            Transition.draw(ctx);
        }
    }
}