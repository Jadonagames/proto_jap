class FreeMode {

    static list = [];
    static hiraganaList = [];
    static katakanaList = [];

    static bInit = false;

    static STATE = Object.freeze({
        Main: 0,
        Hiragana: 1,
        Katakana: 2
    })

    static state = FreeMode.STATE.Main;

    constructor() {

    }

    static init() {

        FreeMode.bInit = true;


        // ---------------- MAIN ------------------

        let titlePanel = new Panel({ w: 8, h: 2, v: 9 }, centerX(106), 20, null, "freemode", FreeMode.STATE.Main, "Free_mode", [-1, { y_t: 748 }]);//748 835
        titlePanel.setOffsets(0, 22);
        FreeMode.list.push(titlePanel.getSprite());

        let hiraganaBtn = new Button({ w: 80, h: 40, v: 6 }, centerX(80, 80), centerY(40), null,
            { cb: FreeMode.displayChooseTypePanel.bind(this), arg: { bool: true, type: "Hiragana", testType: "freemode", lessonNumber: 0 } }
            , "freemode", FreeMode.STATE.Main, "Hiragana", 41);
        hiraganaBtn.setFontColor(RED_BTN_SDW_COLOR);
        hiraganaBtn.setOffsets(0, 22);
        FreeMode.list.push(hiraganaBtn.getSprite());


        let trophyLevel1 = 0;
        let trophyLevel2 = 0;
        trophyLevel1 = SaveManager.SAVE_DATA["freemode"]["game1"]["hiraganaGeneral"];
        trophyLevel2 = SaveManager.SAVE_DATA["freemode"]["game1"]["katakanaGeneral"];


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

        this.hiraganaTrophy = new Sprite({ w: 36, h: 36 }, hiraganaBtn.x - 46, hiraganaBtn.y + 2);
        this.hiraganaTrophy.getSprite().addAnimation("normal", { x: 452 + (36 * multiplicator), y: 826 });
        this.hiraganaTrophy.getSprite().changeAnimation("normal");
        FreeMode.list.push(this.hiraganaTrophy.getSprite());



        let katakanaBtn = new Button({ w: 80, h: 40, v: 6 }, centerX(80, 80, 1), centerY(40), null,
            { cb: FreeMode.displayChooseTypePanel.bind(this), arg: { bool: true, type: "Katakana", testType: "freemode", lessonNumber: 0 } }
            , "freemode", FreeMode.STATE.Main, "Katakana", 41);
        katakanaBtn.setFontColor(RED_BTN_SDW_COLOR);
        katakanaBtn.setOffsets(0, 22);
        FreeMode.list.push(katakanaBtn.getSprite());


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

        this.katakanaTrophy = new Sprite({ w: 36, h: 36 }, katakanaBtn.x + 90, katakanaBtn.y + 2);
        this.katakanaTrophy.getSprite().addAnimation("normal", { x: 452 + (36 * multiplicator), y: 826 });
        this.katakanaTrophy.getSprite().changeAnimation("normal");
        FreeMode.list.push(this.katakanaTrophy.getSprite());


        let backBtn = new Button({ w: 30, h: 22 }, centerX(30), centerY(22, 80, 1), null, toMainMenu, "freemode", FreeMode.STATE.Main, "", 0, true);
        backBtn.setAnimations({ x: 86, y: 56 });
        backBtn.setSound("back");
        FreeMode.list.push(backBtn.getSprite());




        // END------------- MAIN ---------------END


        this.bChooseType = false;

        this.chooseTypeBg = null;
        this.chooseTypePanel = null;
        this.chooseTypeTitle = null;
        this.kanaToRomaBtn = null;
        this.kanaToRomaTrophy = null;
        this.romaTokanaBtn = null;
        this.romaTokanaTrophy = null;
        this.backFromCTPBtn = null;


        // let hiraganaBackBtn = new Button({ w: 30, h: 22 }, centerX(30), CANVAS_HEIGHT - 30, null, { cb: FreeMode.changeState, arg: FreeMode.STATE.Main }, "freemode", FreeMode.STATE.Hiragana, "", 0, true);
        // hiraganaBackBtn.setAnimations({ x: 86, y: 56 });
        // FreeMode.hiraganaList.push(hiraganaBackBtn.getSprite());

        // let katakanaBackBtn = new Button({ w: 30, h: 22 }, centerX(30), CANVAS_HEIGHT - 30, null, { cb: FreeMode.changeState, arg: FreeMode.STATE.Main }, "freemode", FreeMode.STATE.Katakana, "", 0, true);
        // katakanaBackBtn.setAnimations({ x: 86, y: 56 });
        // FreeMode.katakanaList.push(katakanaBackBtn.getSprite());
    }



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
                if (this.kanaToRomaTrophy.currentAnimation.origin.x < newValue) this.kanaToRomaTrophy.resetAnimations("normal", { x: newValue, y: this.kanaToRomaTrophy.currentAnimation.origin.y });
                break;
            case "roma_to_kana":
                if (this.romaTokanaTrophy.currentAnimation.origin.x < newValue) this.romaTokanaTrophy.resetAnimations("normal", { x: newValue, y: this.romaTokanaTrophy.currentAnimation.origin.y });
                break;
            case "hiraganaGeneral": // hiraganaGeneral
                if (this.hiraganaTrophy.currentAnimation.origin.x < 452 + (36 * multiplicator)) {
                    this.hiraganaTrophy.resetAnimations("normal", { x: 452 + (36 * multiplicator), y: this.hiraganaTrophy.currentAnimation.origin.y });
                    if (!FreeMode.list.includes(this.hiraganaTrophy.getSprite())) {
                        FreeMode.list.push(this.hiraganaTrophy.getSprite());
                    }
                }
                break;
            case "katakanaGeneral":
                if (this.katakanaTrophy.currentAnimation.origin.x < 452 + (36 * multiplicator)) {
                    this.katakanaTrophy.resetAnimations("normal", { x: 452 + (36 * multiplicator), y: this.katakanaTrophy.currentAnimation.origin.y });
                    if (!FreeMode.list.includes(this.katakanaTrophy.getSprite())) {
                        FreeMode.list.push(this.katakanaTrophy.getSprite());
                    }
                }
                break;
        }
    }

    static displayChooseTypePanel(pParams) {

        /*//? pParams :
            { 
                bool: true, open | close
                range: kanaList[kanaList.length - 1], 
                type: kana[0], "hiragana" | "katakana"
                testType: "Training", 
                lessonNumber: lessonNumber 
            }
        */

        this.bChooseType = pParams.bool;

        if (this.bChooseType) { //? OPEN

            Button.currentList.forEach(b => {
                b.setState(Button.STATE.Inactive);
            });
            Panel.currentList.forEach(p => {
                p.setState(Panel.STATE.Inactive);
            });

            this.chooseTypeBg = new Sprite({ w: 1, h: 1 }, 0, 0, null, "normal", { x: CANVAS_WIDTH, y: CANVAS_HEIGHT });
            this.chooseTypeBg.getSprite().addAnimation("normal", { x: 38, y: 3 });
            this.chooseTypeBg.getSprite().changeAnimation("normal");
            this.chooseTypeBg.setAlpha(0);
            this.chooseTypeBg.fade(0.01);
            FreeMode.list.push(this.chooseTypeBg.getSprite());

            this.chooseTypePanel = new Panel({ w: 17, h: 17, v: 16 }, centerX(202), 50, null, "freemode", FreeMode.STATE.Main, "", [1]);
            this.chooseTypePanel.changePanelSprite("t", 4, { x: 564, y: 748 });
            this.chooseTypePanel.changePanelSprite("t", 12, { x: 564, y: 748 });
            this.chooseTypePanel.beginMoving({ x: centerX(202), y: 40 })
            Panel.currentList.push(this.chooseTypePanel);
            FreeMode.list.push(this.chooseTypePanel.getSprite());

            this.chooseTypeTitle = new Panel({ w: 80, h: 17, v: 4 }, centerXElement(this.chooseTypePanel, 80), 14, this.chooseTypePanel, "freemode", FreeMode.STATE.Main, pParams.type, 5);
            this.chooseTypeTitle.setOffsets(0, 12);
            // this.chooseTypeTitle.setFontColor(CHOOSETYPE_SDW_COLOR_0);
            this.chooseTypeTitle.setFontColor(CHOOSETYPE_SDW_COLOR);
            // this.chooseTypeTitle.setAlpha(0);
            Panel.currentList.push(this.chooseTypeTitle);
            FreeMode.list.push(this.chooseTypeTitle.getSprite());

            let answerType = "";
            let btnLabel = "";
            let btn2Label = "";
            switch (pParams.type) {
                case "Hiragana":
                    answerType = "h";
                    btnLabel = "あ_to_a";
                    btn2Label = "a_to_あ";
                    break;
                case "Katakana":
                    answerType = "k";
                    btnLabel = "ア_to_a";
                    btn2Label = "a_to_ア";
                    break;
            }

            this.kanaToRomaBtn = new Button({ w: 80, h: 20, v: 6 }, centerXElement(this.chooseTypePanel, 80), 70, this.chooseTypePanel,
                {
                    cb: Transition.init.bind(Transition),
                    arg: {
                        callback: { cb: startBtnCB, arg: { range: "po", answerType: answerType, choiceType: "r", testType: "freemode", lessonNumber: 0 } },
                        pos: { x: centerX(), y: this.chooseTypePanel.y + 70, r: 450, maxR: 0 },
                        speed: 1,
                        stopEffect: false,
                        height: false
                    }
                },
                "freemode", FreeMode.STATE.Main, btnLabel, 41);

            this.kanaToRomaBtn.setFontColor(RED_BTN_SDW_COLOR);
            // this.kanaToRomaBtn.setAlpha(0);
            Button.currentList.push(this.kanaToRomaBtn);
            FreeMode.list.push(this.kanaToRomaBtn.getSprite());

            this.romaTokanaBtn = new Button({ w: 80, h: 20, v: 6 }, centerXElement(this.chooseTypePanel, 80), 110, this.chooseTypePanel,
                {
                    cb: Transition.init.bind(Transition),
                    arg: {
                        callback: { cb: startBtnCB, arg: { range: "po", answerType: "r", choiceType: answerType, testType: "freemode", lessonNumber: 0 } },
                        pos: { x: centerX(), y: this.chooseTypePanel.y + 110, r: 450, maxR: 0 },
                        speed: 1,
                        stopEffect: false,
                        height: false
                    }
                },
                "freemode", FreeMode.STATE.Main, btn2Label, 41);
            this.romaTokanaBtn.setFontColor(RED_BTN_SDW_COLOR);
            // this.romaTokanaBtn.setAlpha(0);
            Button.currentList.push(this.romaTokanaBtn);
            FreeMode.list.push(this.romaTokanaBtn.getSprite());

            let trophyLevel1 = 0;
            let trophyLevel2 = 0;
            if (pParams.type == "Hiragana") {
                trophyLevel1 = SaveManager.SAVE_DATA["freemode"]["game1"]["hiragana1"];
                trophyLevel2 = SaveManager.SAVE_DATA["freemode"]["game1"]["hiragana2"];
            } else if (pParams.type == "Katakana") {
                trophyLevel1 = SaveManager.SAVE_DATA["freemode"]["game1"]["katakana1"];
                trophyLevel2 = SaveManager.SAVE_DATA["freemode"]["game1"]["katakana2"];
            }


            this.kanaToRomaTrophy = new Sprite({ w: 16, h: 19 }, 150, 70, this.chooseTypePanel);
            this.kanaToRomaTrophy.getSprite().addAnimation("normal", { x: 30 + trophyLevel1, y: 112 });
            this.kanaToRomaTrophy.getSprite().changeAnimation("normal");
            FreeMode.list.push(this.kanaToRomaTrophy.getSprite());

            this.romaTokanaTrophy = new Sprite({ w: 16, h: 19 }, 150, 110, this.chooseTypePanel);
            this.romaTokanaTrophy.getSprite().addAnimation("normal", { x: 30 + trophyLevel2, y: 112 });
            this.romaTokanaTrophy.getSprite().changeAnimation("normal");
            FreeMode.list.push(this.romaTokanaTrophy.getSprite());




            // CTP : Choose Type Panel
            this.backFromCTPBtn = new Button({ w: 30, h: 22 }, centerXElement(this.chooseTypePanel, 30), 160, this.chooseTypePanel, { cb: FreeMode.displayChooseTypePanel.bind(this), arg: { bool: false } }, "freemode", FreeMode.STATE.Main, "", 0, true);
            this.backFromCTPBtn.setAnimations({ x: 86, y: 56 });
            this.backFromCTPBtn.setAlpha(0);
            this.backFromCTPBtn.setSound("back");
            Button.currentList.push(this.backFromCTPBtn);
            FreeMode.list.push(this.backFromCTPBtn.getSprite());

        } else { //? CLOSE

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

            this.kanaToRomaTrophy.getSprite().delete = true;
            this.romaTokanaTrophy.getSprite().delete = true;


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



    static backToFreeMode() {
        mainState = MAIN_STATE.FreeMode;
        FreeMode.changeState(FreeMode.STATE.Main);
    }


    static changeState(pNewState) {
        FreeMode.state = pNewState;
        Panel.resetTypeState("freemode", pNewState);
        Button.resetTypeState("freemode", pNewState);
    }

    static update(dt) {

        Sprite.manageBeforeUpdating(FreeMode.list, dt);

        FreeMode.list = FreeMode.list.filter(sp => {
            return !sp.delete;
        });


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

        switch (FreeMode.state) {
            case FreeMode.STATE.Main:
                Sprite.manageBeforeDrawing(FreeMode.list);
                break;
            case FreeMode.STATE.Hiragana:
                Sprite.manageBeforeDrawing(FreeMode.hiraganaList);
                break;
            case FreeMode.STATE.Katakana:
                Sprite.manageBeforeDrawing(FreeMode.katakanaList);
                break;
        }

        if (FadeEffect.bActive) {
            FadeEffect.draw(ctx);
        }

        if (Transition.bActive) {
            Transition.draw(ctx);
        }
    }
}