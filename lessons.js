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

    static state = Lessons.STATE.Main;

    constructor() {

    }

    static init() {

        this.canvasY = 0;
        this.translationY = -50;

        Lessons.bInit = true;
        // ---------------- MAIN ----------------

        // let table = new Sprite({ w: 382, h: 172 }, centerX(382) - 2, 116);
        let table = new Sprite({ w: 382, h: 134 }, centerX(382) - 2, 116);
        table.addAnimation("normal", { x: 532, y: 272 });
        table.changeAnimation("normal");
        Lessons.mainList.push(table);

        let chalkboard = new Sprite({ w: 232, h: 88 }, centerX(232), 20);
        chalkboard.addAnimation("normal", { x: 532, y: 444 });
        chalkboard.changeAnimation("normal");
        Lessons.mainList.push(chalkboard);

        this.hiraganaBtn = new Button({ w: 114, h: 26 }, centerX(114, 57), chalkboard.y + 5, null, { cb: Lessons.changeState, arg: Lessons.STATE.Hiragana }, "lessons", Lessons.STATE.Katakana, "a_Hiragana", 0, true);
        this.hiraganaBtn.getSprite().addAnimation("normal", { x: 764, y: 444 });
        this.hiraganaBtn.getSprite().addAnimation("hover", { x: 764, y: 444 });  // 878
        this.hiraganaBtn.getSprite().addAnimation("down", { x: 764, y: 444 });   // 878
        this.hiraganaBtn.getSprite().changeAnimation("normal");
        this.hiraganaBtn.setFontColor("rgb(20,102,53)", "rgb(255,255,255", "rgb(20,102,53)", "rgb(255,255,255");
        this.hiraganaBtn.setOffsets(0, 16);
        Lessons.mainList.push(this.hiraganaBtn.getSprite());

        this.katakanaBtn = new Button({ w: 114, h: 26 }, centerX(114, 57, 1), chalkboard.y + 5, null, { cb: Lessons.changeState, arg: Lessons.STATE.Katakana }, "lessons", Lessons.STATE.Hiragana, "a_Katakana", 0, true);
        this.katakanaBtn.getSprite().addAnimation("normal", { x: 992, y: 470 });
        this.katakanaBtn.getSprite().addAnimation("hover", { x: 878, y: 470 });
        this.katakanaBtn.getSprite().addAnimation("down", { x: 878, y: 470 });
        this.katakanaBtn.getSprite().changeAnimation("normal");
        this.katakanaBtn.setFontColor("rgb(20,102,53)", "rgb(181,205,190", "rgb(20,102,53)", "rgb(255,255,255");
        this.katakanaBtn.setOffsets(0, 16);
        Lessons.mainList.push(this.katakanaBtn.getSprite());

        let backBtn = new Button({ w: 30, h: 22 }, 20, 20, null, Lessons.quitLessonsMenu, "lessons", Lessons.STATE.Main, "", 0, true);
        backBtn.getSprite().addAnimation("normal", { x: 86, y: 56 });
        backBtn.getSprite().addAnimation("hover", { x: 116, y: 56 });
        backBtn.getSprite().addAnimation("down", { x: 146, y: 56 });
        backBtn.getSprite().changeAnimation("normal");
        Lessons.mainList.push(backBtn.getSprite());

        let introBtn = new Button({ w: 50, h: 20, v: 4 }, 380, 20, null, { cb: SaveManager.save, arg: [{ type: "prologue", value: 1 }] }, "lessons", Lessons.STATE.Main, "Infos");
        Lessons.mainList.push(introBtn.getSprite());

        let introTooltip = new Panel({ w: 300, h: 76, v: 5 }, centerX(300), CANVAS_HEIGHT - 76, null, "lessons", Lessons.STATE.Main, "Infos", 1);
        introTooltip.setOffsets(0, 18);

        introBtn.setTooltip(introTooltip);
        introBtn.setHoverCB(displayTooltip, { list: "lessons.main", tooltip: introBtn.getTooltip() });

        this.starTrophyList = [];

        // ---------------- HIRAGANA ----------------
        let arr = ["", "aiueo", "kakikukeko", "sashisuseso", "tachitsuteto", "naninuneno", "hahifuheho", "mamimumemo", "yayuyo", "rarirurero", "wawon", "gagigugego", "zajizuzezo", "dadidudedo", "babibubebo", "papipupepo"];
        let offX = 0;
        let offY = 0;
        let offYColor = 0;
        let columnCount = 1;
        let bNoSave = false;

        for (let i = 1; i <= 15; i++) {
            let lessonBtn = new LessonBtn({ w: 72, h: 29 }, centerX(72, 150, 0) + offX, centerY(29, 10) + offY, null, { cb: Lessons.transition.bind(this), arg: ["-", Lessons.STATE.Hiragana, i] }, "lessons", Lessons.STATE.Hiragana, "Lesson_" + i, 0, true);
            lessonBtn.setOffsets(0, 18);
            bNoSave = false;
            if (!SaveManager.SAVE_DATA["prologue"]) {
                bNoSave = true;
            } else {
                if (i > 1) {
                    if (!SaveManager.SAVE_DATA["lessons"]["h" + (i - 1)]["finish"]) {
                        bNoSave = true;
                    }
                }
            }

            if (bNoSave) {
                lessonBtn.getSprite().addAnimation("normal", { x: 596, y: 544 + offYColor });
                lessonBtn.getSprite().addAnimation("hover", { x: 668, y: 544 + offYColor });
                lessonBtn.getSprite().addAnimation("down", { x: 668, y: 544 + offYColor });
                lessonBtn.getSprite().addAnimation("clicked", { x: 740, y: 544 + offYColor }, 4, 0.2, false);
                lessonBtn.mode = 1;
                lessonBtn.setBoxCollider(8, 20, 4, 5);
                lessonBtn.saveCallback({ cb: Lessons.transition.bind(this), arg: ["-", Lessons.STATE.Hiragana, i] });
                lessonBtn.callback = {
                    cb: lessonBtn.getSprite().changeAnimation.bind(lessonBtn.getSprite()),
                    arg: "clicked"
                };
                lessonBtn.getSprite().setAnimationCB("clicked", {
                    cb: lessonBtn.getSprite().changeAnimation.bind(lessonBtn.getSprite()),
                    arg: "normal"
                });
            } else {
                lessonBtn.getSprite().addAnimation("normal", { x: 380, y: 544 + offYColor });
                lessonBtn.getSprite().addAnimation("hover", { x: 452, y: 544 + offYColor });
                lessonBtn.getSprite().addAnimation("down", { x: 524, y: 544 + offYColor });
                lessonBtn.getSprite().addAnimation("inactive", { x: 289, y: 544 + offYColor });
                lessonBtn.setBoxCollider(65, 20, 2, 5);
            }
            lessonBtn.setFontColor("rgba(176,150,124,1)", "rgba(0,0,0,1)", "rgba(213,210,190,1)", "rgba(162,138,114,1)");
            lessonBtn.changeSpriteAnimation("normal");

            Lessons.hiraganaList.push(lessonBtn.getSprite());

            this.starTrophyList["h" + i] = new Sprite({ w: 10, h: 8 }, 61, 1, lessonBtn);
            this.starTrophyList["h" + i].getSprite().addAnimation("normal", { x: 94, y: 112 });
            this.starTrophyList["h" + i].getSprite().changeAnimation("normal");
            this.starTrophyList["h" + i].getSprite().setClass("star");

            if (SaveManager.SAVE_DATA["lessons"]["h" + i]["fullcomplete"]) {
                Lessons.addStarTrophy("h" + i);
            }

            // Le fait d'utiliser la même variable offYcolor pour les tooltip et pour les buttons est totalement un hasard (même valeur d'incrément : 29), normalement c'est avec une variable différente offYPanelColor
            let tooltipPanel = new Panel({ w: 10, h: 4, v: 9 }, centerX(128), CANVAS_HEIGHT - 70, null, "lessons", Lessons.STATE.Hiragana, "", [-1, { tlr: 748 + offYColor, blr: 768 + offYColor, clr: 757 + offYColor }]); // 128 = 2*9 (corner*2) + 10 * 11 (w * t.w or b.w)
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

            let tooltipContentPanel = new Panel({ w: 250, h: 70, v: 1 }, centerX(250), CANVAS_HEIGHT - 55, null, "lessons", Lessons.STATE.Hiragana, "hira_" + arr[i], 2);
            tooltipContentPanel.setFont("kyokasho");
            tooltipPanel.setOffsets(0, 10);

            let tooltipContentPanel2 = new Panel({ w: 250, h: 50, v: 1 }, centerX(250), CANVAS_HEIGHT - 30, null, "lessons", Lessons.STATE.Hiragana, "roma_" + arr[i], 2);
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
                offY += 36;
            }
        }

        // ---------------- KATAKANA ----------------
        offX = 0;
        offY = 0;
        offYColor = 0;
        columnCount = 1;
        for (let i = 1; i <= 15; i++) {
            let lessonBtn = new LessonBtn({ w: 72, h: 29 }, centerX(72, 150, 0) + offX, centerY(29, 10) + offY, null, { cb: Lessons.transition.bind(this), arg: ["-", Lessons.STATE.Katakana, i] }, "lessons", Lessons.STATE.Katakana, "Lesson_" + i, 0, true);
            lessonBtn.setOffsets(0, 18);
            bNoSave = false;

            if (!SaveManager.SAVE_DATA["prologue"]) {
                bNoSave = true;
            } else {
                if (i > 1) {
                    if (!SaveManager.SAVE_DATA["lessons"]["k" + (i - 1)]["finish"]) {
                        bNoSave = true;
                    }
                }
            }

            if (bNoSave) {
                lessonBtn.getSprite().addAnimation("normal", { x: 596, y: 544 + offYColor });
                lessonBtn.getSprite().addAnimation("hover", { x: 668, y: 544 + offYColor });
                lessonBtn.getSprite().addAnimation("down", { x: 668, y: 544 + offYColor });
                lessonBtn.getSprite().addAnimation("clicked", { x: 740, y: 544 + offYColor }, 4, 0.2, false);
                lessonBtn.mode = 1;
                lessonBtn.setBoxCollider(8, 20, 4, 5);
                lessonBtn.saveCallback({ cb: Lessons.transition.bind(this), arg: ["-", Lessons.STATE.Katakana, i] });
                lessonBtn.callback = {
                    cb: lessonBtn.getSprite().changeAnimation.bind(lessonBtn.getSprite()),
                    arg: "clicked"
                };
                lessonBtn.getSprite().setAnimationCB("clicked", {
                    cb: lessonBtn.getSprite().changeAnimation.bind(lessonBtn.getSprite()),
                    arg: "normal"
                });
            } else {
                lessonBtn.getSprite().addAnimation("normal", { x: 380, y: 544 + offYColor });
                lessonBtn.getSprite().addAnimation("hover", { x: 452, y: 544 + offYColor });
                lessonBtn.getSprite().addAnimation("down", { x: 524, y: 544 + offYColor });
                lessonBtn.getSprite().addAnimation("inactive", { x: 289, y: 544 + offYColor });
                lessonBtn.setBoxCollider(65, 20, 2, 5);
            }
            lessonBtn.setFontColor("rgba(176,150,124,1)", "rgba(0,0,0,1)", "rgba(213,210,190,1)", "rgba(162,138,114,1)");
            lessonBtn.changeSpriteAnimation("normal");


            Lessons.katakanaList.push(lessonBtn.getSprite());

            this.starTrophyList["k" + i] = new Sprite({ w: 10, h: 8 }, 61, 1, lessonBtn);
            this.starTrophyList["k" + i].getSprite().addAnimation("normal", { x: 94, y: 112 });
            this.starTrophyList["k" + i].getSprite().changeAnimation("normal");
            this.starTrophyList["k" + i].getSprite().setClass("star");

            if (SaveManager.SAVE_DATA["lessons"]["k" + i]["fullcomplete"]) {
                Lessons.addStarTrophy("k" + i);
            }

            let tooltipPanel = new Panel({ w: 10, h: 4, v: 9 }, centerX(128), CANVAS_HEIGHT - 70, null, "lessons", Lessons.STATE.Katakana, "", [-1, { tlr: 748 + offYColor, blr: 768 + offYColor, clr: 757 + offYColor }]); // 128 = 2*9 (corner*2) + 10 * 11 (w * t.w or b.w)
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
                offY += 36;
            }
        }


        // ---------------- LESSON ----------------
        this.lessonTitlePanel = new Panel({ w: 60, h: 30, v: 5 }, centerX(60), CANVAS_HEIGHT + 10, null, "lessons", Lessons.STATE.Lesson, "", 1);
        this.lessonTitlePanel.setOffsets(0, 18);
        this.lessonBackBtn = null;
        this.lessonMainPanel = new Panel({ w: 400, h: 270, v: 5 }, centerX(400), CANVAS_HEIGHT + 24, null, "lessons", Lessons.STATE.Lesson, "", 1);

        this.informationPanel = new Panel({ w: 140, h: 210, v: 5 }, centerX(150, 120, 1), CANVAS_HEIGHT + 36, null, "lessons", Lessons.STATE.Lesson, "Description", 1);
        this.informationPanel.setOffsets(0, 20);

        this.playBtn = null;
        this.trainingBtn = null;
        this.lessonTestBtn = null;
        this.fullTestBtn = null;

        this.lessonTestTrophy = null;
        this.fullTestTrophy = null;

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

    // Params : a[0] : "-" / "+" || a[1] : Lessons.STATE.Hiragana / .Katakana || a[2] : i  (1,2,3...)
    static transition(a) {
        if (a[0] == "-") {
            this.canvasY = 0;
            Lessons.previousState = a[1];
            Lessons.lessonList = [];
            let kana = "";
            let lessonNumber = a[2];
            Lessons.previousState == Lessons.STATE.Hiragana ? kana = "hira_" : kana = "kata_";

            // --- MAIN ---
            Lessons.lessonList.push(this.lessonMainPanel.getSprite());

            this.lessonTitlePanel.setLabel("Lesson_" + lessonNumber);
            Lessons.lessonList.push(this.lessonTitlePanel.getSprite());

            Lessons.lessonList.push(this.informationPanel.getSprite());
            // --- END MAIN END ---

            let kanaList = Lessons.lists[lessonNumber].split(",");
            let kanaPos = "";

            let offY = 48;
            let nb = 5;
            if (lessonNumber == 8 || lessonNumber == 10) nb = 3;
            for (let i = 0; i < nb; i++) {
                kanaPos = kana + kanaList[i];

                let containerPanel = new Panel({ w: 210, h: 38, v: 1 }, centerX(200, 80), CANVAS_HEIGHT + offY, null, "lessons", Lessons.STATE.Lesson, "", 3);
                containerPanel.setHoverable(true);
                containerPanel.setToDelete();
                Lessons.lessonList.push(containerPanel.getSprite());

                let strokePanel = new Panel({ w: 130, h: 20, v: 1 }, this.informationPanel.x + 4, this.informationPanel.y + 20, null, "lessons", Lessons.STATE.Lesson, "Stroke_count_" + KANA[kanaPos].frames.length, 2);
                strokePanel.setAlignText(strokePanel.ALIGN_TEXT.Left);
                strokePanel.setToDelete();


                if (LANG[kana + KANA[kanaPos].roma + "_description"]) {
                    let descriptionPanel = new Panel({ w: 130, h: 50, v: 1 }, this.informationPanel.x + 4, strokePanel.y + 14, null, "lessons", Lessons.STATE.Lesson, kana + KANA[kanaPos].roma + "_description", 2);
                    descriptionPanel.setAlignText(descriptionPanel.ALIGN_TEXT.Left);
                    descriptionPanel.setToDelete();
                    containerPanel.setTooltip(descriptionPanel);
                }

                // containerPanel.setTooltip(strokePanel);
                // containerPanel.setHoverCB(displayTooltip, { list: "lessons.lesson", tooltip: containerPanel.getTooltip() });

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

                let sound = new Sprite({ w: 16, h: 13 }, containerPanel.x + 110, containerPanel.y + 12);
                sound.getSprite().addAnimation("normal", { x: 106, y: 79 });
                sound.getSprite().changeAnimation("normal");
                Lessons.lessonList.push(sound.getSprite());

                let soundBtn = new Button({ w: 19, h: 17 }, containerPanel.x + 130, containerPanel.y + 10, null, { cb: Sound.playCallback, arg: "kana_" + KANA[kanaPos].roma }, "lessons", Lessons.STATE.Lesson, "", 0, true);
                soundBtn.getSprite().addAnimation("normal", { x: 49, y: 79 });
                soundBtn.getSprite().addAnimation("hover", { x: 68, y: 79 });
                soundBtn.getSprite().addAnimation("down", { x: 87, y: 79 });
                soundBtn.getSprite().changeAnimation("normal");
                soundBtn.setToDelete();
                Lessons.lessonList.push(soundBtn.getSprite());

                let kana1 = new Sprite({ w: 34, h: 34 }, containerPanel.x + 160, containerPanel.y + 2, null, "kana");
                kana1.setKanaToDelete();
                for (let j = 0; j < KANA[kanaPos].frames.length; j++) {
                    kana1.setImageDataOrigin(KANA[kanaPos].imageData[j], KANA[kanaPos].frames[j]);
                }
                Lessons.lessonList.push(kana1);
                offY += 40;
            }

            this.lessonBackBtn = new Button({ w: 30, h: 22 }, centerX(30, 150), CANVAS_HEIGHT + 258, null, { cb: Lessons.transition.bind(this), arg: ["+", Lessons.previousState] }, "lessons", Lessons.STATE.Lesson, "", 0, true);
            this.lessonBackBtn.getSprite().addAnimation("normal", { x: 86, y: 56 });
            this.lessonBackBtn.getSprite().addAnimation("hover", { x: 116, y: 56 });
            this.lessonBackBtn.getSprite().addAnimation("down", { x: 146, y: 56 });
            this.lessonBackBtn.getSprite().changeAnimation("normal");
            Lessons.lessonList.push(this.lessonBackBtn.getSprite());

            this.trainingBtn = new Button({ w: 70, h: 30, v: 4 }, centerX(70, 80), CANVAS_HEIGHT + 250, null, { cb: Lessons.displayChooseTypePanel.bind(this), arg: { bool: true, range: kanaList[kanaList.length - 1], type: kana[0], testType: "Training", lessonNumber: lessonNumber } }, "lessons", Lessons.STATE.Lesson, "Training");
            this.trainingBtn.setTextCenterY();
            Lessons.lessonList.push(this.trainingBtn.getSprite());

            this.lessonTestBtn = new Button({ w: 90, h: 30, v: 4 }, centerX(90, 10, 1), CANVAS_HEIGHT + 250, null, { cb: Lessons.displayChooseTypePanel.bind(this), arg: { bool: true, range: kanaList[kanaList.length - 1], type: kana[0], testType: "Lesson_test", lessonNumber: lessonNumber } }, "lessons", Lessons.STATE.Lesson, "Lesson_test");
            this.lessonTestBtn.setTextCenterY();
            this.lessonTestBtn.setAlignText(0);
            Lessons.lessonList.push(this.lessonTestBtn.getSprite());

            let trophyLevel1 = 0;
            let trophyLevel2 = 0;
            if (kana == "hira_") {
                trophyLevel1 = SaveManager.SAVE_DATA["lessons"]["h" + lessonNumber]["lessonTestGeneral"];
                trophyLevel2 = SaveManager.SAVE_DATA["lessons"]["h" + lessonNumber]["fullTestGeneral"];
            } else if (kana == "kata_") {
                trophyLevel1 = SaveManager.SAVE_DATA["lessons"]["k" + lessonNumber]["lessonTestGeneral"];
                trophyLevel2 = SaveManager.SAVE_DATA["lessons"]["k" + lessonNumber]["fullTestGeneral"];
            }

            this.lessonTestTrophy = new Sprite({ w: 16, h: 19 }, this.lessonTestBtn.x + 66, this.lessonTestBtn.y + 5);
            this.lessonTestTrophy.getSprite().addAnimation("normal", { x: 30 + trophyLevel1, y: 112 });
            this.lessonTestTrophy.getSprite().changeAnimation("normal");
            Lessons.lessonList.push(this.lessonTestTrophy.getSprite());

            this.fullTestBtn = new Button({ w: 90, h: 30, v: 4 }, centerX(90, 120, 1), CANVAS_HEIGHT + 250, null, { cb: Lessons.displayChooseTypePanel.bind(this), arg: { bool: true, range: kanaList[kanaList.length - 1], type: kana[0], testType: "Full_test", lessonNumber: lessonNumber } }, "lessons", Lessons.STATE.Lesson, "Full_test");
            this.fullTestBtn.setTextCenterY();
            this.fullTestBtn.setAlignText(0);
            Lessons.lessonList.push(this.fullTestBtn.getSprite());

            this.fullTestTrophy = new Sprite({ w: 16, h: 19 }, this.fullTestBtn.x + 66, this.fullTestBtn.y + 5);
            this.fullTestTrophy.getSprite().addAnimation("normal", { x: 30 + trophyLevel2, y: 112 });
            this.fullTestTrophy.getSprite().changeAnimation("normal");
            Lessons.lessonList.push(this.fullTestTrophy.getSprite());
        } else {
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

        TRANSITION = true;
    }

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
            Lessons.lessonList.push(this.chooseTypeBg.getSprite());


            this.chooseTypePanel = new Panel({ w: 200, h: 200, v: 5 }, centerX(200), CANVAS_HEIGHT + 20, null, "lessons", Lessons.STATE.Lesson, "", 1);
            Panel.list.push(this.chooseTypePanel);
            Panel.currentList.push(this.chooseTypePanel);
            Lessons.lessonList.push(this.chooseTypePanel.getSprite());

            this.chooseTypeTitle = new Panel({ w: 80, h: 30, v: 5 }, centerX(80), this.chooseTypePanel.y + 10, null, "lessons", Lessons.STATE.Lesson, pParams.testType, 1);
            this.chooseTypeTitle.setOffsets(0, 18);
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

            this.kanaToRomaBtn = new Button({ w: 80, h: 20, v: 4 }, centerX(80), this.chooseTypePanel.y + 70, null, { cb: startBtnCB, arg: { range: pParams.range, answerType: pParams.type, choiceType: "r", testType: pParams.testType, lessonNumber: pParams.lessonNumber } }, "lessons", Lessons.STATE.Lesson, btnLabel);
            Button.list.push(this.kanaToRomaBtn);
            Button.currentList.push(this.kanaToRomaBtn);
            Lessons.lessonList.push(this.kanaToRomaBtn.getSprite());

            this.romaTokanaBtn = new Button({ w: 80, h: 20, v: 4 }, centerX(80), this.chooseTypePanel.y + 110, null, { cb: startBtnCB, arg: { range: pParams.range, answerType: "r", choiceType: pParams.type, testType: pParams.testType, lessonNumber: pParams.lessonNumber } }, "lessons", Lessons.STATE.Lesson, btn2Label);
            Button.list.push(this.romaTokanaBtn);
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


                this.kanaToRomaTrophy = new Sprite({ w: 16, h: 19 }, this.kanaToRomaBtn.x + 100, this.kanaToRomaBtn.y);
                this.kanaToRomaTrophy.getSprite().addAnimation("normal", { x: 30 + trophyLevel1, y: 112 });
                this.kanaToRomaTrophy.getSprite().changeAnimation("normal");
                Lessons.lessonList.push(this.kanaToRomaTrophy.getSprite());

                this.romaTokanaTrophy = new Sprite({ w: 16, h: 19 }, this.romaTokanaBtn.x + 100, this.romaTokanaBtn.y);
                this.romaTokanaTrophy.getSprite().addAnimation("normal", { x: 30 + trophyLevel2, y: 112 });
                this.romaTokanaTrophy.getSprite().changeAnimation("normal");
                Lessons.lessonList.push(this.romaTokanaTrophy.getSprite());
            }

            // CTP : Choose Type Panel
            this.backFromCTPBtn = new Button({ w: 40, h: 20, v: 4 }, centerX(40), this.chooseTypePanel.y + 160, null, { cb: Lessons.displayChooseTypePanel.bind(this), arg: { bool: false, testType: pParams.testType } }, "lessons", Lessons.STATE.Lesson, "Back");
            Button.list.push(this.backFromCTPBtn);
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

    static backToLesson() {
        mainState = MAIN_STATE.Lessons;
        Lessons.changeState(Lessons.STATE.Lesson);
    }

    static quitLessonsMenu() {
        if (Lessons.state == Lessons.STATE.Hiragana) Lessons.changeState(Lessons.STATE.Katakana);
        toMainMenu();
    }

    static switchButtons() {
        switch (Lessons.state) {
            case Lessons.STATE.Hiragana:
                // No reaction
                this.hiraganaBtn.getSprite().resetAnimations("normal", { x: 764, y: 444 });
                this.hiraganaBtn.getSprite().resetAnimations("hover", { x: 764, y: 444 });  // 878
                this.hiraganaBtn.getSprite().resetAnimations("down", { x: 764, y: 444 });   // 878
                this.hiraganaBtn.setFontColor("rgb(20,102,53)", "rgb(255,255,255", "rgb(20,102,53)", "rgb(255,255,255");

                this.katakanaBtn.getSprite().resetAnimations("normal", { x: 992, y: 470 });
                this.katakanaBtn.getSprite().resetAnimations("hover", { x: 878, y: 470 });
                this.katakanaBtn.getSprite().resetAnimations("down", { x: 878, y: 470 });
                this.katakanaBtn.setFontColor("rgb(20,102,53)", "rgb(181,205,190", "rgb(20,102,53)", "rgb(255,255,255");

                break;
            case Lessons.STATE.Katakana:
                this.hiraganaBtn.getSprite().resetAnimations("normal", { x: 992, y: 444 });
                this.hiraganaBtn.getSprite().resetAnimations("hover", { x: 878, y: 444 });
                this.hiraganaBtn.getSprite().resetAnimations("down", { x: 878, y: 444 });
                this.hiraganaBtn.setFontColor("rgb(20,102,53)", "rgb(181,205,190", "rgb(20,102,53)", "rgb(255,255,255");

                // No reaction
                this.katakanaBtn.getSprite().resetAnimations("normal", { x: 764, y: 470 });
                this.katakanaBtn.getSprite().resetAnimations("hover", { x: 764, y: 470 });
                this.katakanaBtn.getSprite().resetAnimations("down", { x: 764, y: 470 });
                this.katakanaBtn.setFontColor("rgb(20,102,53)", "rgb(255,255,255", "rgb(20,102,53)", "rgb(255,255,255");
                break;
        }
    }

    static updateTrophyValue(pTrophyType, pValue) { // "general", "kana_to_roma", "roma_to_kana"
        let newValue = 30 + pValue;
        switch (pTrophyType) {
            case "kana_to_roma":
                if (this.kanaToRomaTrophy.currentAnimation.origin.x < newValue) this.kanaToRomaTrophy.resetAnimations("normal", { x: newValue, y: this.kanaToRomaTrophy.currentAnimation.origin.y });
                break;
            case "roma_to_kana":
                if (this.romaTokanaTrophy.currentAnimation.origin.x < newValue) this.romaTokanaTrophy.resetAnimations("normal", { x: newValue, y: this.romaTokanaTrophy.currentAnimation.origin.y });
                break;
            case "lessonTest":
                if (this.lessonTestTrophy.currentAnimation.origin.x < newValue) this.lessonTestTrophy.resetAnimations("normal", { x: newValue, y: this.lessonTestTrophy.currentAnimation.origin.y });
                break;
            case "fullTest":
                if (this.fullTestTrophy.currentAnimation.origin.x < newValue) this.fullTestTrophy.resetAnimations("normal", { x: newValue, y: this.fullTestTrophy.currentAnimation.origin.y });
                break;
        }
    }

    static update(dt) {


        Sprite.manageBeforeUpdating(Lessons.mainList, dt);
        Lessons.mainList = Lessons.mainList.filter(sp => {
            return !sp.delete;
        });

        Sprite.manageBeforeUpdating(Lessons.hiraganaList, dt);
        Lessons.hiraganaList = Lessons.hiraganaList.filter(sp => {
            return !sp.delete;
        });

        Sprite.manageBeforeUpdating(Lessons.katakanaList, dt);
        Lessons.katakanaList = Lessons.katakanaList.filter(sp => {
            return !sp.delete;
        });

        Sprite.manageBeforeUpdating(Lessons.lessonList, dt);
        Lessons.lessonList = Lessons.lessonList.filter(sp => {
            return !sp.delete;
        });

        Sprite.kanaList.forEach(sp => {
            if (sp.active) {
                sp.updateKana(dt);
            }
        })

        if (FadeEffect.bActive) {
            FadeEffect.update(dt);
        }
    }

    static draw(ctx) {
        if (TRANSITION) {

            ctx.transform(1, 0, 0, 1, 0, this.canvasY);
            this.canvasY += this.translationY;

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

                TRANSITION = false;
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

                TRANSITION = false;
                MOUSE_SPRITE.y -= CANVAS_HEIGHT;
                MOUSE_SPRITE.changeAnimation("normal");

                if (Lessons.previousState == Lessons.STATE.Hiragana) {
                    Lessons.changeState(Lessons.STATE.Hiragana, false);
                } else {
                    Lessons.changeState(Lessons.STATE.Katakana, false);
                }
                Lessons.previousState = -1;
            }

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
        if (SaveManager.SAVE_DATA["prologue"]) {
            ctx.fillText("Prologue OK", 0, 10);
        } else {
            ctx.fillText("Prologue NOT YET, GO prologue !!", 0, 100);
        }

        ctx.font = "20px jpfont";
        ctx.textAlign = "center";
        ctx.shadowColor = "rgb(20,102,53)";
        ctx.shadowOffsetY = 4;
        ctx.fillStyle = "rgb(255,255,255)";

        if (Lessons.state == Lessons.STATE.Hiragana) {
            ctx.fillText("Hiragana", centerX(), 80);
        } else {
            ctx.fillText("Katakana", centerX(), 80);
        }
        ctx.shadowOffsetY = 0;
        ctx.textAlign = "left";

        /**
         * DEBUG
         */
        //------------- END DEBUG

        if (FadeEffect.bActive) {
            FadeEffect.draw(ctx);
        }
    }
}