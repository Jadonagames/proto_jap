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

        this.hiraganaBtn = new Button({ w: 54, h: 20, v: 3 }, centerX(54, 100), 62, { cb: Lessons.changeState, arg: Lessons.STATE.Hiragana }, "lessons", Lessons.STATE.Katakana, "Hiragana", 2);
        this.hiraganaBtn.setFontColor("rgb(209,209,209)");
        this.hiraganaBtn.setHoverOffset({ x: 0, y: -2 });
        this.hiraganaBtn.setHoverCB(translate.bind(this.hiraganaBtn), this.hiraganaBtn.getHoverOffset());
        Lessons.mainList.push(this.hiraganaBtn.getSprite());

        this.first = true;
        this.katakanaBtn = new Button({ w: 54, h: 20, v: 3 }, centerX(54, 100, 1), 62, { cb: Lessons.changeState, arg: Lessons.STATE.Katakana }, "lessons", Lessons.STATE.Hiragana, "Katakana", 1);
        this.katakanaBtn.setFontColor("rgb(209,209,209)");
        this.katakanaBtn.setHoverOffset({ x: 0, y: -2 });
        this.katakanaBtn.setHoverCB(translate.bind(this.katakanaBtn), this.katakanaBtn.getHoverOffset());
        Lessons.mainList.push(this.katakanaBtn.getSprite());

        let mainPanel = new Panel({ w: 400, h: 200, v: 5 }, centerX(400), 80, null, "lessons", Lessons.STATE.Main, "", 1);
        mainPanel.setTextCase("all");
        Lessons.mainList.push(mainPanel.getSprite());

        let backBtn = new Button({ w: 40, h: 20, v: 4 }, centerX(40), centerY(20, 100, 1), Lessons.quitLessonsMenu, "lessons", Lessons.STATE.Main, "Back");
        Lessons.mainList.push(backBtn.getSprite());

        let introBtn = new Button({ w: 50, h: 20, v: 4 }, centerX(50), centerY(20, 50), null, "lessons", Lessons.STATE.Main, "Infos");
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
        let columnCount = 1;

        for (let i = 1; i <= 15; i++) {
            let lessonBtn = new Button({ w: 60, h: 20, v: 4 }, centerX(40, 150, 0) + offX, centerY(20, 10) + offY, { cb: Lessons.transition.bind(this), arg: ["-", Lessons.STATE.Hiragana, i] }, "lessons", Lessons.STATE.Hiragana, "Lesson_" + i);
            Lessons.hiraganaList.push(lessonBtn.getSprite());

            this.starTrophyList["h" + i] = new Sprite({ w: 10, h: 8 }, lessonBtn.x + 54, lessonBtn.y);
            this.starTrophyList["h" + i].getSprite().addAnimation("normal", 1, { x: 94, y: 112 }, 0.1);
            this.starTrophyList["h" + i].getSprite().changeAnimation("normal");
            this.starTrophyList["h" + i].getSprite().setClass("star");

            if (SaveManager.SAVE_DATA["lessons"]["h" + i]["finish"]) {
                Lessons.addStarTrophy("h" + i);
            }

            let tooltipPanel = new Panel({ w: 300, h: 76, v: 5 }, centerX(300), CANVAS_HEIGHT - 76, null, "lessons", Lessons.STATE.Hiragana, "Content", 1);
            tooltipPanel.setOffsets(0, 18);

            let tooltipContentPanel = new Panel({ w: 250, h: 70, v: 1 }, centerX(250), CANVAS_HEIGHT - 50, null, "lessons", Lessons.STATE.Hiragana, "hira_" + arr[i], 2);
            tooltipContentPanel.setFont("kyokasho");
            tooltipPanel.setOffsets(0, 18);

            let tooltipContentPanel2 = new Panel({ w: 250, h: 50, v: 1 }, centerX(250), CANVAS_HEIGHT - 30, null, "lessons", Lessons.STATE.Hiragana, "roma_" + arr[i], 2);
            tooltipContentPanel2.setOffsets(0, 10);

            lessonBtn.setTooltip(tooltipPanel);
            lessonBtn.setTooltip(tooltipContentPanel);
            lessonBtn.setTooltip(tooltipContentPanel2);
            lessonBtn.setHoverCB(displayTooltip, { list: "lessons.hiragana", tooltip: lessonBtn.getTooltip() });

            offX += 70;
            columnCount++;
            if (columnCount > 5) {
                columnCount = 1;
                offX = 0;
                offY += 36;
            }
        }

        let buttonBottomH = new Panel({ w: 58, h: 5 }, this.hiraganaBtn.x - 2, this.hiraganaBtn.y + this.hiraganaBtn.height - 2, null, "mainmenu", Lessons.STATE.Hiragana, "", 1, true);
        buttonBottomH.getSprite().addAnimation("normal", 1, { x: 52, y: 40 }, 0.1);
        buttonBottomH.getSprite().changeAnimation("normal");
        Lessons.hiraganaList.push(buttonBottomH.getSprite());

        // ---------------- KATAKANA ----------------
        offX = 0;
        offY = 0;
        columnCount = 1;
        for (let i = 1; i <= 15; i++) {
            let lessonBtn = new Button({ w: 60, h: 20, v: 4 }, centerX(40, 150, 0) + offX, centerY(20, 10) + offY, { cb: Lessons.transition.bind(this), arg: ["-", Lessons.STATE.Katakana, i] }, "lessons", Lessons.STATE.Katakana, "Lesson_" + i);
            Lessons.katakanaList.push(lessonBtn.getSprite());

            this.starTrophyList["k" + i] = new Sprite({ w: 10, h: 8 }, lessonBtn.x + 54, lessonBtn.y);
            this.starTrophyList["k" + i].getSprite().addAnimation("normal", 1, { x: 94, y: 112 }, 0.1);
            this.starTrophyList["k" + i].getSprite().changeAnimation("normal");
            this.starTrophyList["k" + i].getSprite().setClass("star");

            if (SaveManager.SAVE_DATA["lessons"]["k" + i]["finish"]) {
                Lessons.addStarTrophy("k" + i);
            }

            let tooltipPanel = new Panel({ w: 300, h: 76, v: 5 }, centerX(300), CANVAS_HEIGHT - 76, null, "lessons", Lessons.STATE.Katakana, "Content", 1);
            tooltipPanel.setOffsets(0, 18);

            let tooltipContentPanel = new Panel({ w: 250, h: 70, v: 1 }, centerX(250), CANVAS_HEIGHT - 50, null, "lessons", Lessons.STATE.Katakana, "kata_" + arr[i], 2);
            tooltipContentPanel.setFont("kyokasho");
            tooltipPanel.setOffsets(0, 18);

            let tooltipContentPanel2 = new Panel({ w: 250, h: 50, v: 1 }, centerX(250), CANVAS_HEIGHT - 30, null, "lessons", Lessons.STATE.Katakana, "roma_" + arr[i], 2);
            tooltipContentPanel2.setOffsets(0, 10);

            lessonBtn.setTooltip(tooltipPanel);
            lessonBtn.setTooltip(tooltipContentPanel);
            lessonBtn.setTooltip(tooltipContentPanel2);
            lessonBtn.setHoverCB(displayTooltip, { list: "lessons.katakana", tooltip: lessonBtn.getTooltip() });

            offX += 70;
            columnCount++;
            if (columnCount > 5) {
                columnCount = 1;
                offX = 0;
                offY += 36;
            }
        }


        let buttonBottomK = new Panel({ w: 58, h: 5 }, this.katakanaBtn.x - 2, this.katakanaBtn.y + this.katakanaBtn.height - 2, null, "mainmenu", Lessons.STATE.Katakana, "", 1, true);
        buttonBottomK.getSprite().addAnimation("normal", 1, { x: 52, y: 40 }, 0.1);
        buttonBottomK.getSprite().changeAnimation("normal");
        Lessons.katakanaList.push(buttonBottomK.getSprite());

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
                sound.getSprite().addAnimation("normal", 1, { x: 106, y: 79 }, 0.1);
                sound.getSprite().changeAnimation("normal");
                Lessons.lessonList.push(sound.getSprite());

                let soundBtn = new Button({ w: 19, h: 17 }, containerPanel.x + 130, containerPanel.y + 10, { cb: Sound.playCallback, arg: "kana_" + KANA[kanaPos].roma }, "lessons", Lessons.STATE.Lesson, "", 0, true);
                soundBtn.getSprite().addAnimation("normal", 1, { x: 49, y: 79 }, 0.1);
                soundBtn.getSprite().addAnimation("hover", 1, { x: 68, y: 79 }, 0.1);
                soundBtn.getSprite().addAnimation("down", 1, { x: 87, y: 79 }, 0.1);
                soundBtn.getSprite().changeAnimation("normal");
                soundBtn.setToDelete();
                Lessons.lessonList.push(soundBtn.getSprite());

                let kana1 = new Sprite({ w: 34, h: 34 }, containerPanel.x + 160, containerPanel.y + 2, "kana");
                kana1.setKanaToDelete();
                for (let j = 0; j < KANA[kanaPos].frames.length; j++) {
                    kana1.setImageDataOrigin(KANA[kanaPos].imageData[j], KANA[kanaPos].frames[j]);
                }
                Lessons.lessonList.push(kana1);
                offY += 40;
            }

            this.lessonBackBtn = new Button({ w: 40, h: 20, v: 4 }, centerX(40, 150), CANVAS_HEIGHT + 260, { cb: Lessons.transition.bind(this), arg: ["+", Lessons.previousState] }, "lessons", Lessons.STATE.Lesson, "Back");
            Lessons.lessonList.push(this.lessonBackBtn.getSprite());

            this.trainingBtn = new Button({ w: 70, h: 30, v: 4 }, centerX(70, 80), CANVAS_HEIGHT + 250, { cb: Lessons.displayChooseTypePanel.bind(this), arg: { bool: true, range: kanaList[kanaList.length - 1], type: kana[0], testType: "Training", lessonNumber: lessonNumber } }, "lessons", Lessons.STATE.Lesson, "Training");
            this.trainingBtn.setTextCenterY();
            Lessons.lessonList.push(this.trainingBtn.getSprite());

            this.lessonTestBtn = new Button({ w: 90, h: 30, v: 4 }, centerX(90, 10, 1), CANVAS_HEIGHT + 250, { cb: Lessons.displayChooseTypePanel.bind(this), arg: { bool: true, range: kanaList[kanaList.length - 1], type: kana[0], testType: "Lesson_test", lessonNumber: lessonNumber } }, "lessons", Lessons.STATE.Lesson, "Lesson_test");
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
            this.lessonTestTrophy.getSprite().addAnimation("normal", 1, { x: 30 + trophyLevel1, y: 112 }, 0.1);
            this.lessonTestTrophy.getSprite().changeAnimation("normal");
            Lessons.lessonList.push(this.lessonTestTrophy.getSprite());

            this.fullTestBtn = new Button({ w: 90, h: 30, v: 4 }, centerX(90, 120, 1), CANVAS_HEIGHT + 250, { cb: Lessons.displayChooseTypePanel.bind(this), arg: { bool: true, range: kanaList[kanaList.length - 1], type: kana[0], testType: "Full_test", lessonNumber: lessonNumber } }, "lessons", Lessons.STATE.Lesson, "Full_test");
            this.fullTestBtn.setTextCenterY();
            this.fullTestBtn.setAlignText(0);
            Lessons.lessonList.push(this.fullTestBtn.getSprite());

            this.fullTestTrophy = new Sprite({ w: 16, h: 19 }, this.fullTestBtn.x + 66, this.fullTestBtn.y + 5);
            this.fullTestTrophy.getSprite().addAnimation("normal", 1, { x: 30 + trophyLevel2, y: 112 }, 0.1);
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

            this.chooseTypeBg = new Sprite({ w: 1, h: 1 }, 0, CANVAS_HEIGHT, "normal", { x: CANVAS_WIDTH, y: CANVAS_HEIGHT });
            this.chooseTypeBg.getSprite().addAnimation("normal", 1, { x: 38, y: 3 }, 0.1);
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

            this.kanaToRomaBtn = new Button({ w: 80, h: 20, v: 4 }, centerX(80), this.chooseTypePanel.y + 70, { cb: startBtnCB, arg: { range: pParams.range, answerType: pParams.type, choiceType: "r", testType: pParams.testType, lessonNumber: pParams.lessonNumber } }, "lessons", Lessons.STATE.Lesson, btnLabel);
            Button.list.push(this.kanaToRomaBtn);
            Button.currentList.push(this.kanaToRomaBtn);
            Lessons.lessonList.push(this.kanaToRomaBtn.getSprite());

            this.romaTokanaBtn = new Button({ w: 80, h: 20, v: 4 }, centerX(80), this.chooseTypePanel.y + 110, { cb: startBtnCB, arg: { range: pParams.range, answerType: "r", choiceType: pParams.type, testType: pParams.testType, lessonNumber: pParams.lessonNumber } }, "lessons", Lessons.STATE.Lesson, btn2Label);
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
                this.kanaToRomaTrophy.getSprite().addAnimation("normal", 1, { x: 30 + trophyLevel1, y: 112 }, 0.1);
                this.kanaToRomaTrophy.getSprite().changeAnimation("normal");
                Lessons.lessonList.push(this.kanaToRomaTrophy.getSprite());

                this.romaTokanaTrophy = new Sprite({ w: 16, h: 19 }, this.romaTokanaBtn.x + 100, this.romaTokanaBtn.y);
                this.romaTokanaTrophy.getSprite().addAnimation("normal", 1, { x: 30 + trophyLevel2, y: 112 }, 0.1);
                this.romaTokanaTrophy.getSprite().changeAnimation("normal");
                Lessons.lessonList.push(this.romaTokanaTrophy.getSprite());
            }


            this.backFromCTPBtn = new Button({ w: 40, h: 20, v: 4 }, centerX(40), this.chooseTypePanel.y + 160, { cb: Lessons.displayChooseTypePanel.bind(this), arg: { bool: false, testType: pParams.testType } }, "lessons", Lessons.STATE.Lesson, "Back");
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

        // console.log("add star trophy");
        // console.log(pParams.slice(0, 1));
        // console.log(pParams);

        if (pParams.slice(0, 1) == "h") {
            Lessons.hiraganaList.push(this.starTrophyList[pParams].getSprite());
        } else {
            Lessons.katakanaList.push(this.starTrophyList[pParams].getSprite());
        }

        // Lessons.hiraganaList.push(starTrophy.getSprite());
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
                this.hiraganaBtn.resetAnimations(2);
                this.katakanaBtn.resetAnimations(3);
                let func0 = translate.bind(this.hiraganaBtn, { x: this.hiraganaBtn.getHoverOffset().x, y: this.hiraganaBtn.getHoverOffset().y });
                func0();
                if (!this.first) {
                    let func1 = translate.bind(this.katakanaBtn, { x: this.katakanaBtn.getHoverOffset().x, y: this.katakanaBtn.getHoverOffset().y }, true);
                    func1();
                }
                this.first = false;
                break;
            case Lessons.STATE.Katakana:
                this.hiraganaBtn.resetAnimations(3);
                this.katakanaBtn.resetAnimations(2);
                let func2 = translate.bind(this.hiraganaBtn, { x: this.hiraganaBtn.getHoverOffset().x, y: this.hiraganaBtn.getHoverOffset().y }, true);
                func2();
                let func3 = translate.bind(this.katakanaBtn, { x: this.katakanaBtn.getHoverOffset().x, y: this.katakanaBtn.getHoverOffset().y });
                func3();
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


        Lessons.mainList.forEach(sp => {
            if (sp instanceof Sprite) {
                sp.update(dt);
            }
        })

        Lessons.mainList = Lessons.mainList.filter(sp => {
            return !sp.delete;
        });


        Lessons.hiraganaList.forEach(sp => {
            if (sp instanceof Sprite) {
                sp.update(dt);
            }
        })

        Lessons.hiraganaList = Lessons.hiraganaList.filter(sp => {
            return !sp.delete;
        });

        Lessons.katakanaList.forEach(sp => {
            if (sp instanceof Sprite) {
                sp.update(dt);
            }
        })

        Lessons.katakanaList = Lessons.katakanaList.filter(sp => {
            return !sp.delete;
        });

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
                    if (b.getState() != Button.STATE.Normal) {
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

                Sprite.kanaList.forEach(k => {
                    if (k.kanaToDelete) {
                        k.setActive(true);
                    }
                })

                TRANSITION = false;
                this.changeState(Lessons.STATE.Lesson);
            } else if (this.canvasY > 0 && Lessons.state == Lessons.STATE.Lesson) { // BACK TO MENU
                this.canvasY = 0;
                this.translationY = -50;
                Button.currentList.forEach(b => {
                    if (b.getState() != Button.STATE.Normal) {
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

                if (Lessons.previousState == Lessons.STATE.Hiragana) {
                    Lessons.changeState(Lessons.STATE.Hiragana, false);
                } else {
                    Lessons.changeState(Lessons.STATE.Katakana, false);
                }
                Lessons.previousState = -1;
            }

        }
        ctx.setTransform(1 * SCALE_X, 0, 0, 1 * SCALE_Y, 0, this.canvasY);

        ctx.fillStyle = "rgb(200,0,0)";
        ctx.font = "40px jpfont";
        ctx.textAlign = "center";
        ctx.fillText(LANG["Lessons"], centerX(), 40);
        ctx.textAlign = "left";


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
            ctx.fillText("Prologue OK", 40, 100);
        } else {
            ctx.fillText("Prologue NOT YET, GO prologue !!", 40, 100);
        }

        /**
         * DEBUG
         */
        //------------- END DEBUG

        if (FadeEffect.bActive) {
            FadeEffect.draw(ctx);
        }
    }
}