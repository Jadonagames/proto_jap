class Game1 {

    static STATE = Object.freeze({
        Menu: 0,
        Game: 1,
        Pause: 2,
        Transition: 3
    });

    static currentState = Game1.STATE.Game
    static bGameInitialized = null;
    static lessonTestType = "";
    static currentKanaLesson = "";
    static currentLessonNumber = 0;

    static mainList = [];

    static _misses = 0;

    constructor() {

    }

    static init() {

        console.log("Game1 init()");

        // Game1.mainList = [];

        Game1.bGameInitialized = true;

        let choiceLabel = "";
        let rndArr = [];

        switch (CHOICE_TYPE) { // BTN type
            case "h":
                choiceLabel = "hira_";
                rndArr.push(char.r[char.h.indexOf(RND_ARR[0])]);
                rndArr.push(char.r[char.h.indexOf(RND_ARR[1])]);
                rndArr.push(char.r[char.h.indexOf(RND_ARR[2])]);
                rndArr.push(char.r[char.h.indexOf(RND_ARR[3])]);
                break;
            case "k":
                choiceLabel = "kata_";
                rndArr.push(char.r[char.k.indexOf(RND_ARR[0])]);
                rndArr.push(char.r[char.k.indexOf(RND_ARR[1])]);
                rndArr.push(char.r[char.k.indexOf(RND_ARR[2])]);
                rndArr.push(char.r[char.k.indexOf(RND_ARR[3])]);
                break;
            case "r":
                choiceLabel = "roma_";
                rndArr.push(RND_ARR[0]);
                rndArr.push(RND_ARR[1]);
                rndArr.push(RND_ARR[2]);
                rndArr.push(RND_ARR[3]);
                for (let i = 0; i < 4; i++) {
                    if (rndArr[i] == "di") rndArr[i] = "ji";
                    if (rndArr[i] == "du") rndArr[i] = "zu";
                }
                break;
        }

        this.firstBtn = new KanaBtn({ w: 50, h: 50, v: 4 }, centerX(50, 80), centerY(50, 80), null, { cb: checkIfValid, arg: RND_ARR[0] }, "game1", Game1.STATE.Game, choiceLabel + rndArr[0]);
        this.firstBtn.setFont("kyokasho");
        this.firstBtn.setFontSize(30);
        this.firstBtn.setOffsets(5, 34);
        Game1.mainList.push(this.firstBtn.getSprite());

        this.secondBtn = new KanaBtn({ w: 50, h: 50, v: 4 }, centerX(50, 80, 1), centerY(50, 80), null, { cb: checkIfValid, arg: RND_ARR[1] }, "game1", Game1.STATE.Game, choiceLabel + rndArr[1]);
        this.secondBtn.setFont("kyokasho");
        this.secondBtn.setFontSize(30);
        this.secondBtn.setOffsets(5, 34);
        Game1.mainList.push(this.secondBtn.getSprite());

        this.thirdBtn = new KanaBtn({ w: 50, h: 50, v: 4 }, centerX(50, 80), centerY(50, 80, 1), null, { cb: checkIfValid, arg: RND_ARR[2] }, "game1", Game1.STATE.Game, choiceLabel + rndArr[2]);
        this.thirdBtn.setFont("kyokasho");
        this.thirdBtn.setFontSize(30);
        this.thirdBtn.setOffsets(5, 34);
        Game1.mainList.push(this.thirdBtn.getSprite());

        this.forthBtn = new KanaBtn({ w: 50, h: 50, v: 4 }, centerX(50, 80, 1), centerY(50, 80, 1), null, { cb: checkIfValid, arg: RND_ARR[3] }, "game1", Game1.STATE.Game, choiceLabel + rndArr[3]);
        this.forthBtn.setFont("kyokasho");
        this.forthBtn.setFontSize(30);
        this.forthBtn.setOffsets(5, 34);
        Game1.mainList.push(this.forthBtn.getSprite());

        let answerLabel = "";

        switch (ANSWER_TYPE) {
            case "h":
                answerLabel = "hira_" + RND_CHOICE.r;
                break;
            case "k":
                answerLabel = "kata_" + RND_CHOICE.r;
                break;
            case "r": // Quand R est LABEL ! A -> あ
                if (RND_CHOICE.r == "di") RND_CHOICE.r = "ji";
                if (RND_CHOICE.r == "du") RND_CHOICE.r = "zu";
                answerLabel = "roma_" + RND_CHOICE.r;
                break;
        }

        this.kanaPanel = new KanaPanel({ w: 70, h: 70, v: 5 }, centerX(70), centerY(70), null, "game1", Game1.STATE.Game, answerLabel, 1);
        this.kanaPanel.setFont("kyokasho");
        this.kanaPanel.setFontSize(40);
        this.kanaPanel.setOffsets(3, 50);
        Game1.mainList.push(this.kanaPanel.getSprite());

        let backBtn = new Button({ w: 40, h: 20, v: 4 }, centerX(40), centerY(20, 120, 1), null, { cb: resetGame, arg: "back_to_lesson" }, "game1", Game1.STATE.Game, "Back");
        Game1.mainList.push(backBtn.getSprite());

        this.bTimerActive = true;
        this.timerMax = 6;
        this.currentTimer = this.timerMax;

        this.misses = 0;


        this.bEndGame = false;
        this.endGameBg = null;
        this.endGamePanel = null;
        this.endGameTitle = null;
        this.trophy = null;
        this.backToLessonBtn = null;
        this.restartBtn = null;

        /**
        TODO change place of these :
        ScreenManager.init();
        Pause.init();
        */
    }

    static load(pChoiceType, pAnswerType, pRange = 1, plessonRange, pLessonTestType, pLessonNumber) {
        // Game1.currentState = Game1.STATE.Game;
        CHAR_NUMBERS = 4;
        CHOICE_TYPE = pChoiceType; // "r"
        ANSWER_TYPE = pAnswerType; // "h"
        RANGE = pRange;
        LESSON_RANGE = plessonRange;
        // RANGE = 1;
        REMAINING_CHOICES = [];
        Game1.currentLessonNumber = pLessonNumber;
        Game1.lessonTestType = pLessonTestType;
        if (CHOICE_TYPE != "r") {
            Game1.currentKanaLesson = CHOICE_TYPE;
        } else if (ANSWER_TYPE != "r") {
            Game1.currentKanaLesson = ANSWER_TYPE;
        }


        randomlyMix(CHOICE_TYPE, CHAR_NUMBERS, RANGE, LESSON_RANGE);

        if (Game1.bGameInitialized) {

            KANA_NUMBER = 0;
            TURN_NUMBER = 0;

            this.currentTimer = this.timerMax;
            this.bTimerActive = true;
            Game1.setMiss(0);

            let choiceLabel = "";
            let rndArr = [];

            switch (CHOICE_TYPE) {
                case "h":
                    choiceLabel = "hira_";
                    rndArr.push(char.r[char.h.indexOf(RND_ARR[0])]);
                    rndArr.push(char.r[char.h.indexOf(RND_ARR[1])]);
                    rndArr.push(char.r[char.h.indexOf(RND_ARR[2])]);
                    rndArr.push(char.r[char.h.indexOf(RND_ARR[3])]);
                    break;
                case "k":
                    choiceLabel = "kata_";
                    rndArr.push(char.r[char.k.indexOf(RND_ARR[0])]);
                    rndArr.push(char.r[char.k.indexOf(RND_ARR[1])]);
                    rndArr.push(char.r[char.k.indexOf(RND_ARR[2])]);
                    rndArr.push(char.r[char.k.indexOf(RND_ARR[3])]);
                    break;
                case "r":
                    choiceLabel = "roma_";
                    rndArr.push(RND_ARR[0]);
                    rndArr.push(RND_ARR[1]);
                    rndArr.push(RND_ARR[2]);
                    rndArr.push(RND_ARR[3]);
                    for (let i = 0; i < 4; i++) {
                        if (rndArr[i] == "di") rndArr[i] = "ji";
                        if (rndArr[i] == "du") rndArr[i] = "zu";
                    }
                    break;
            }

            this.firstBtn.setLabel(choiceLabel + rndArr[0]);
            this.firstBtn.setCallbackArg(RND_ARR[0]);

            this.secondBtn.setLabel(choiceLabel + rndArr[1]);
            this.secondBtn.setCallbackArg(RND_ARR[1]);

            this.thirdBtn.setLabel(choiceLabel + rndArr[2]);
            this.thirdBtn.setCallbackArg(RND_ARR[2]);

            this.forthBtn.setLabel(choiceLabel + rndArr[3]);
            this.forthBtn.setCallbackArg(RND_ARR[3]);

            let answerLabel = "";
            switch (ANSWER_TYPE) {
                case "h":
                    answerLabel = "hira_" + RND_CHOICE.r;
                    break;
                case "k":
                    answerLabel = "kata_" + RND_CHOICE.r;
                    break;
                case "r":
                    if (RND_CHOICE.r == "di") RND_CHOICE.r = "ji";
                    if (RND_CHOICE.r == "du") RND_CHOICE.r = "zu";
                    answerLabel = "roma_" + RND_CHOICE.r;
                    break;
            }

            this.kanaPanel.setLabel(answerLabel);
        }
    }

    static displayEndGamePanel(pParams) {

        this.bEndGame = pParams.bool;

        if (this.bEndGame) {

            Button.currentList.forEach(b => {
                b.setState(Button.STATE.Inactive);
            });

            let gotTrophyLevel = 0;
            if (this.misses == 0) {
                gotTrophyLevel = 48;
            } else if (this.misses >= 1 && this.misses < 5) {
                gotTrophyLevel = 32;
            } else {
                gotTrophyLevel = 16;
            }


            Game1.manageEndGameSave(gotTrophyLevel);

            // TODO 
            //! Afficher kana à revoir ? Petite Phrase : Bravo ! Vous avez fait x fautes : trophée Bronze/Argent/Or

            this.endGameBg = new Sprite({ w: 1, h: 1 }, 0, 0, "normal", { x: CANVAS_WIDTH, y: CANVAS_HEIGHT });
            this.endGameBg.getSprite().addAnimation("normal", 1, { x: 38, y: 3 }, 0.1);
            this.endGameBg.getSprite().changeAnimation("normal");
            Game1.mainList.push(this.endGameBg.getSprite());

            this.endGamePanel = new Panel({ w: 200, h: 200, v: 5 }, centerX(200), centerY(200), null, "game1", Game1.STATE.Game, "", 1);
            Panel.list.push(this.endGamePanel);
            Panel.currentList.push(this.endGamePanel);
            Game1.mainList.push(this.endGamePanel.getSprite());

            this.endGameTitle = new Panel({ w: 80, h: 30, v: 5 }, centerX(80), this.endGamePanel.y + 10, null, "game1", Game1.STATE.Game, "game_over", 1);
            this.endGameTitle.setOffsets(0, 18);
            Panel.list.push(this.endGameTitle);
            Panel.currentList.push(this.endGameTitle);
            Game1.mainList.push(this.endGameTitle.getSprite());

            //TODO Depends on results :
            // Phrase de félicitations .. ou pas
            // Image du trophée 
            // "Vous avez fait x fautes"
            // ...

            this.trophy = new Sprite({ w: 16, h: 19 }, centerX(16), this.endGamePanel.y + 70);
            this.trophy.getSprite().addAnimation("normal", 1, { x: 30 + gotTrophyLevel, y: 112 }, 0.1);
            this.trophy.getSprite().changeAnimation("normal");
            Game1.mainList.push(this.trophy.getSprite());

            this.restartBtn = new Button({ w: 50, h: 20, v: 4 }, centerX(50), this.endGamePanel.y + 120, null, { cb: Game1.displayEndGamePanel.bind(this), arg: { bool: false, restart: true } }, "game1", Game1.STATE.Game, "Restart");
            Button.currentList.push(this.restartBtn);
            Game1.mainList.push(this.restartBtn.getSprite());

            this.backToLessonBtn = new Button({ w: 40, h: 20, v: 4 }, centerX(40), this.endGamePanel.y + 150, null, { cb: Game1.displayEndGamePanel.bind(this), arg: { bool: false, restart: false } }, "game1", Game1.STATE.Game, "Back");
            Button.currentList.push(this.backToLessonBtn);
            Game1.mainList.push(this.backToLessonBtn.getSprite());

        } else {

            this.endGameBg.delete = true;
            this.trophy.delete = true;

            this.endGamePanel.removeFromList();
            this.endGameTitle.removeFromList();
            this.backToLessonBtn.removeFromList();
            this.restartBtn.removeFromList();

            this.endGamePanel.removeFromCurrentList();
            this.endGameTitle.removeFromCurrentList();
            this.backToLessonBtn.removeFromCurrentList();
            this.restartBtn.removeFromCurrentList();

            this.endGamePanel.getSprite().delete = true;
            this.endGameTitle.getSprite().delete = true;
            this.backToLessonBtn.getSprite().delete = true;
            this.restartBtn.getSprite().delete = true;

            Game1.deleteSpritesFromList();

            this.endGamePanel = null;
            this.endGameTitle = null;
            this.trophy = null;
            this.backToLessonBtn = null;
            this.restartBtn = null;

            Button.currentList.forEach(b => {
                b.setState(Button.STATE.Normal);
            });
            Panel.currentList.forEach(p => {
                p.setState(Panel.STATE.Normal);
            });

            if (!pParams.restart) {
                resetGame();
                MOUSE_SPRITE.y += CANVAS_HEIGHT; // Back after Finish
                Lessons.backToLesson();
            } else {
                Game1.load(CHOICE_TYPE, ANSWER_TYPE, RANGE, LESSON_RANGE, Game1.lessonTestType, Game1.currentLessonNumber);
            }

        }

    }

    static manageEndGameSave(pGotTrophyLevel) {
        let paramsToSave = [];
        let lessonTestType = "";
        let lessonTestGeneral = "";
        let test1Mark = 0;
        let test2Mark = 0;

        if (Game1.lessonTestType == "Lesson_test") {
            lessonTestType = "lessonTest";
            lessonTestGeneral = "lessonTestGeneral";
        } else if (Game1.lessonTestType == "Full_test") {
            lessonTestType = "fullTest";
            lessonTestGeneral = "fullTestGeneral";
        }

        let generalMark = SaveManager.SAVE_DATA["lessons"][Game1.currentKanaLesson + Game1.currentLessonNumber][lessonTestGeneral];

        if (ANSWER_TYPE != "r") { // Kana to Roma
            test1Mark = pGotTrophyLevel;
            test2Mark = SaveManager.SAVE_DATA["lessons"][Game1.currentKanaLesson + Game1.currentLessonNumber][lessonTestType + "2"];
            Lessons.updateTrophyValue("kana_to_roma", pGotTrophyLevel);
            lessonTestType += "1";
        } else { // Roma to Kana
            test1Mark = SaveManager.SAVE_DATA["lessons"][Game1.currentKanaLesson + Game1.currentLessonNumber][lessonTestType + "1"];
            test2Mark = pGotTrophyLevel;
            Lessons.updateTrophyValue("roma_to_kana", pGotTrophyLevel);
            lessonTestType += "2";
        }

        if (generalMark < test1Mark && generalMark < test2Mark) {
            let newMark = 0;
            if (test1Mark <= test2Mark) {
                newMark = test1Mark;
            } else if (test1Mark > test2Mark) {
                newMark = test2Mark;
            }
            paramsToSave.push({ type: "lessons", params: [Game1.currentKanaLesson + Game1.currentLessonNumber, lessonTestGeneral], value: newMark });
            Lessons.updateTrophyValue(lessonTestType.slice(0, -1), newMark);
        }

        paramsToSave.push({ type: "lessons", params: [Game1.currentKanaLesson + Game1.currentLessonNumber, lessonTestType], value: pGotTrophyLevel });

        SaveManager.save(paramsToSave);
        if (!SaveManager.SAVE_DATA["lessons"][Game1.currentKanaLesson + Game1.currentLessonNumber]["finish"] &&
            SaveManager.SAVE_DATA["lessons"][Game1.currentKanaLesson + Game1.currentLessonNumber]["lessonTestGeneral"] > 0 &&
            SaveManager.SAVE_DATA["lessons"][Game1.currentKanaLesson + Game1.currentLessonNumber]["fullTestGeneral"] > 0) {
            paramsToSave = [{ type: "lessons", params: [Game1.currentKanaLesson + Game1.currentLessonNumber, "finish"], value: 1 }];
            SaveManager.save(paramsToSave);

            LessonBtn.list.every(b => {
                if (Game1.currentKanaLesson == "h") {
                    if (b.typeState == Lessons.STATE.Hiragana && b.label.slice(-1) == Game1.currentLessonNumber + 1) {
                        b.setState(LessonBtn.STATE.Normal);
                        b.changeSpriteAnimation("normal");
                        b.setFontColor("rgb(100,100,100)", "rgb(0,0,0)");
                        return false;
                    }
                } else if (Game1.currentKanaLesson == "k") {
                    if (b.typeState == Lessons.STATE.Katakana && b.label.slice(-1) == Game1.currentLessonNumber + 1) {
                        b.setState(LessonBtn.STATE.Normal);
                        b.changeSpriteAnimation("normal");
                        b.setFontColor("rgb(100,100,100)", "rgb(0,0,0)");
                        return false;
                    }
                }
                return true;
            });
        }

        if (!SaveManager.SAVE_DATA["lessons"][Game1.currentKanaLesson + Game1.currentLessonNumber]["fullcomplete"] &&
            SaveManager.SAVE_DATA["lessons"][Game1.currentKanaLesson + Game1.currentLessonNumber]["lessonTestGeneral"] == 48 &&
            SaveManager.SAVE_DATA["lessons"][Game1.currentKanaLesson + Game1.currentLessonNumber]["fullTestGeneral"] == 48) {
            paramsToSave = [{ type: "lessons", params: [Game1.currentKanaLesson + Game1.currentLessonNumber, "fullcomplete"], value: 1 }];
            Lessons.addStarTrophy(Game1.currentKanaLesson + Game1.currentLessonNumber);
            SaveManager.save(paramsToSave);
        }
    }

    static deleteSpritesFromList() {
        Game1.mainList = Game1.mainList.filter(sp => {
            return !sp.delete;
        });
    }

    static setMiss(pArg = 1) {
        if (pArg == 1) {
            this.misses++;
        } else {
            this.misses = pArg;
        }
    }

    static resetTimer() {
        this.currentTimer = this.timerMax;
        this.bTimerActive = true;
    }


    static togglePause() {

        if (Game1.currentState == Game1.STATE.Pause) {
            Game1.currentState = Game1.STATE.Game;
            Panel.resetTypeState("normal", Game1.STATE.Game);
            Button.resetTypeState("normal", Game1.STATE.Game);
        } else {
            Game1.currentState = Game1.STATE.Pause;
            Panel.resetTypeState("pause", Game1.STATE.Pause);
            Button.resetTypeState("pause", Game1.STATE.Pause);
        }

    }

    static update(dt) {

        /**
         * DEBUG
         */
        //------------ END DEBUG

        if (this.bTimerActive) {
            this.currentTimer -= dt;
            if (this.currentTimer <= 1) {
                this.currentTimer = 0;
                Game1.setMiss();
                this.bTimerActive = false;
            }
        }

        if (Game1.currentState == Game1.STATE.Transition) {
            if (FadeEffect.bActive) {
                FadeEffect.update(dt);
            }
        } else if (Game1.currentState == Game1.STATE.Pause) {
            Pause.update(dt);
        }

        if (Game1.currentState != Game1.STATE.Game) {
            return;
        }

        if (Sound.current != null && Sound.bFadingOut) {
            Sound.current.update(dt);
        }

        Game1.deleteSpritesFromList();

        Sprite.manageBeforeUpdating(Game1.mainList, dt);

    }

    static draw(ctx) {

        // SELON LA STRUCTURE DU JEU : 
        // ScreenManager.currentScreen.spriteList.forEach(sp => {
        //     sp.getSprite().draw(ctx)
        // });
        // --------------------------------

        Sprite.manageBeforeDrawing(Game1.mainList);

        ctx.fillStyle = "rgb(255,255,255)";
        ctx.font = "10px jpfont";
        ctx.textAlign = "center";

        if (!this.bEndGame) {

            ctx.fillText("Turns : " + TURN_NUMBER, centerX(), 30);
            ctx.fillText("Kana : " + KANA_NUMBER, centerX(), 50);
            ctx.fillText("Misses: " + this.misses, centerX(), 70);
            if (this.currentTimer > 0) {
                ctx.fillStyle = "rgb(0,255,0)";
            } else {
                ctx.fillStyle = "rgb(200,0,0)";
            }
            ctx.fillText("Timer : ", centerX(), 90);
            ctx.textAlign = "left";
            ctx.fillText(Math.floor(this.currentTimer), centerX(), 110);
            ctx.fillStyle = "rgb(255,255,255)";
        }

        if (FadeEffect.bActive) {
            FadeEffect.draw(ctx);
        }

        if (Game1.currentState == Game1.STATE.Pause) {
            Pause.draw(ctx)
        }

    }

}

// TODO function newGame / reset / firstLoad
function gameInit() { }
function load() { }

function togglePause() { }


/**
 * DEBUG
 */

// -------------------- END DEBUG