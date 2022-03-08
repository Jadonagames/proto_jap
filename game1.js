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
    static transitionTimer = new Timer(2, Game1.stopTransition.bind(Game1));
    static finishedLesson = 0;

    static mainList = [];
    static transitionList = [];

    static _misses = 0;

    start = null;
    chalkboardBrush = null;
    maru = null;
    batsu = null;
    moe = null;

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

    static init(pType) {

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

        this.firstBtn = new KanaBtn({ w: 52, h: 52 }, centerX(52, 80), 32, null, { cb: checkIfValid, arg: { char: RND_ARR[0], label: rndArr[0] } }, "game1", Game1.STATE.Game, choiceLabel + rndArr[0], 0, true);
        this.firstBtn.setAnimations({ x: 342, y: 1088 });
        this.firstBtn.getSprite().addAnimation("correct", { x: 550, y: 1088 }, 4, 0.2, false);
        this.firstBtn.getSprite().addAnimation("batsu", { x: 498, y: 1088 });
        this.firstBtn.getSprite().setAnimationCB("correct", { cb: this.firstBtn.getSprite().changeAnimation.bind(this.firstBtn.getSprite()), arg: "normal" });
        this.firstBtn.setFont("kyokasho");
        this.firstBtn.checkShiChiTsu(choiceLabel + rndArr[0]);
        Game1.mainList.push(this.firstBtn.getSprite());

        this.secondBtn = new KanaBtn({ w: 52, h: 52 }, centerX(52, 80, 1), 32, null, { cb: checkIfValid, arg: { char: RND_ARR[1], label: rndArr[1] } }, "game1", Game1.STATE.Game, choiceLabel + rndArr[1], 0, true);
        this.secondBtn.setAnimations({ x: 342, y: 1088 });
        this.secondBtn.getSprite().addAnimation("correct", { x: 550, y: 1088 }, 4, 0.2, false);
        this.secondBtn.getSprite().addAnimation("batsu", { x: 498, y: 1088 });
        this.secondBtn.getSprite().setAnimationCB("correct", { cb: this.secondBtn.getSprite().changeAnimation.bind(this.secondBtn.getSprite()), arg: "normal" });
        this.secondBtn.setFont("kyokasho");
        this.secondBtn.checkShiChiTsu(choiceLabel + rndArr[1]);
        Game1.mainList.push(this.secondBtn.getSprite());

        this.thirdBtn = new KanaBtn({ w: 52, h: 52 }, centerX(52, 80), 166, null, { cb: checkIfValid, arg: { char: RND_ARR[2], label: rndArr[2] } }, "game1", Game1.STATE.Game, choiceLabel + rndArr[2], 0, true);
        this.thirdBtn.setAnimations({ x: 342, y: 1088 });
        this.thirdBtn.getSprite().addAnimation("correct", { x: 550, y: 1088 }, 4, 0.2, false);
        this.thirdBtn.getSprite().addAnimation("batsu", { x: 498, y: 1088 });
        this.thirdBtn.getSprite().setAnimationCB("correct", { cb: this.thirdBtn.getSprite().changeAnimation.bind(this.thirdBtn.getSprite()), arg: "normal" });
        this.thirdBtn.setFont("kyokasho");
        this.thirdBtn.checkShiChiTsu(choiceLabel + rndArr[2]);
        Game1.mainList.push(this.thirdBtn.getSprite());

        this.fourthBtn = new KanaBtn({ w: 52, h: 52 }, centerX(52, 80, 1), 166, null, { cb: checkIfValid, arg: { char: RND_ARR[3], label: rndArr[3] } }, "game1", Game1.STATE.Game, choiceLabel + rndArr[3], 0, true);
        this.fourthBtn.setAnimations({ x: 342, y: 1088 });
        this.fourthBtn.getSprite().addAnimation("correct", { x: 550, y: 1088 }, 4, 0.2, false);
        this.fourthBtn.getSprite().addAnimation("batsu", { x: 498, y: 1088 });
        this.fourthBtn.getSprite().setAnimationCB("correct", { cb: this.fourthBtn.getSprite().changeAnimation.bind(this.fourthBtn.getSprite()), arg: "normal" });
        this.fourthBtn.setFont("kyokasho");
        this.fourthBtn.checkShiChiTsu(choiceLabel + rndArr[3]);
        Game1.mainList.push(this.fourthBtn.getSprite());

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

        this.kanaPanel = new KanaPanel({ w: 104, h: 72 }, centerX(104), 90, null, "game1", Game1.STATE.Game, answerLabel, 0, true);
        this.kanaPanel.getSprite().addAnimation("normal", { x: 190, y: 0 });
        this.kanaPanel.getSprite().changeAnimation("normal");
        this.kanaPanel.setFont("kyokasho");
        this.kanaPanel.setFontSize(40);
        this.kanaPanel.setOffsets(3, 50);
        this.kanaPanel.setFontColor("rgba(255,255,255,0)", "rgb(255,255,255)");
        this.kanaPanel.setTextOverflow(true);
        Game1.mainList.push(this.kanaPanel.getSprite());

        this.moe = new Sprite({ w: 24, h: 24 }, this.kanaPanel.x + 76, this.kanaPanel.y + 48);
        this.moe.addAnimation("idle", { x: 342, y: 272 }, 4, [0.3, 0.075, 0.3, 0.075]);
        this.moe.addAnimation("erase", { x: 342, y: 296 }, 4, [0.2, 0.05, 0.2, 0.05]);
        this.moe.addAnimation("good", { x: 342, y: 320 }, 2, 0.7, false);
        this.moe.addAnimation("bad", { x: 342, y: 344 }, 2, 0.7, false);
        this.moe.setAnimationCB("good", okNextChar);
        this.moe.setAnimationCB("bad", { cb: this.moe.changeAnimation.bind(this.moe), arg: "idle" });
        this.moe.changeAnimation("idle");
        Game1.mainList.push(this.moe.getSprite());

        this.maru = new Sprite({ w: 64, h: 64 }, this.firstBtn.x - 7, this.firstBtn.y - 5);
        this.maru.addAnimation("normal", { x: 342, y: 1146 });
        this.maru.changeAnimation("normal");
        this.maru.setBlink(1, 3);
        this.maru.setAlpha(0);

        this.chalkboardBrush = new Sprite({ w: 96, h: 63 }, centerX(96), this.kanaPanel.y + 5); //57
        this.chalkboardBrush.addAnimation("normal", { x: 342, y: 204 });
        this.chalkboardBrush.addAnimation("erase", { x: 438, y: 204 }, 10, [0.2, 0.05, 0.2, 0.2, 0.05, 0.2, 0.2, 0.05, 0.2, 0.2], false);
        this.chalkboardBrush.changeAnimation("normal");
        this.chalkboardBrush.setAnimationCB("erase", handleCorrectAnswer);
        this.chalkboardBrush.setAnimationFrameCB("erase", [
            {
                nb: 2,
                callback: {
                    cb: Game1.chalkParticles,
                    arg: { x: this.kanaPanel.x + 95, y: this.kanaPanel.y - 5, offX: 10, offY: 5, dirX: 1, dirY: -1 }
                }
            },
            {
                nb: 5,
                callback: {
                    cb: Game1.chalkParticles,
                    arg: { x: this.kanaPanel.x + 20, y: this.kanaPanel.y + 60, offX: 10, offY: 5, dirX: -1, dirY: 1 }
                }
            },
            {
                nb: 8,
                callback: {
                    cb: Game1.chalkParticles,
                    arg: { x: this.kanaPanel.x + 50, y: this.kanaPanel.y - 5, offX: 10, offY: 5, dirX: 1, dirY: -1 }
                }
            }
        ]);

        let resetGameArg = "back_to_lesson";
        if (pType == "freemode") {
            resetGameArg = "back_to_freemode";
        }

        this.backBtn = new Button({ w: 30, h: 22 }, 10, CANVAS_HEIGHT - 30, null, { cb: resetGame, arg: resetGameArg }, "game1", Game1.STATE.Game, "", 0, true);
        this.backBtn.setAnimations({ x: 86, y: 56 });
        Game1.mainList.push(this.backBtn.getSprite());


        // ------------ Panel du bas -------------

        this.timerPanel = new Panel({ w: 9, h: 5, v: 16 }, centerX(122), CANVAS_HEIGHT, null, "game1", Game1.STATE.Game, "", [1]);
        this.timerPanel.changePanelSprite("t", 2, { x: 564, y: 748 });
        this.timerPanel.changePanelSprite("t", 6, { x: 564, y: 748 });

        if (pType != "Training") {
            this.timerPanel.setDestination({ x: centerX(122), y: CANVAS_HEIGHT - 66 });
            this.timerPanel.setCanMove(true);
            this.timerPanel.setMovingSpeed(0.6);
            this.timerPanel.setMoving(true);

            this.timerPanel.setAlpha(0);
            this.timerPanel.fade(0.08);
        }

        Game1.mainList.push(this.timerPanel.getSprite());

        this.timer = 5;

        this.timerSprite = new Sprite({ w: 21, h: 22 }, 22, 15, this.timerPanel);
        this.timerSprite.addAnimation("start", { x: 456, y: 884 });
        this.timerSprite.addAnimation("normal", { x: 456, y: 884 }, 8, 0.13);
        this.timerSprite.addAnimation("end", { x: 624, y: 884 }, 2, 0.1, false);
        this.timerSprite.changeAnimation("normal");

        this.timerSprite.setAnimationFrameCB("normal", [
            {
                nb: 7,
                callback: {
                    cb: Game1.decreaseTimer.bind(this),
                    arg: 0
                }
            }
        ]);

        Game1.mainList.push(this.timerSprite);

        this.timerNumber = new Sprite({ w: 11, h: 18 }, 52, 17, this.timerPanel);
        this.timerNumber.addAnimation("5", { x: 456, y: 928 });
        this.timerNumber.addAnimation("4", { x: 467, y: 928 });
        this.timerNumber.addAnimation("3", { x: 478, y: 928 });
        this.timerNumber.addAnimation("2", { x: 489, y: 928 });
        this.timerNumber.addAnimation("1", { x: 500, y: 928 });
        this.timerNumber.addAnimation("0", { x: 511, y: 928 });
        this.timerNumber.changeAnimation("5");
        Game1.mainList.push(this.timerNumber);

        this.batsuSprite = new Sprite({ w: 17, h: 18 }, 24, 43, this.timerPanel);
        this.batsuSprite.addAnimation("normal", { x: 456, y: 906 });
        this.batsuSprite.addAnimation("batsu", { x: 473, y: 906 }, 3, [0.2, 0.1, 0.5], false);
        this.batsuSprite.setAnimationCB("batsu", { cb: this.batsuSprite.changeAnimation.bind(this.batsuSprite), arg: "normal" });

        this.batsuSprite.changeAnimation("normal");
        Game1.mainList.push(this.batsuSprite);

        this.misses = 0;
        this.bAlreadyMissed = false;

        this.missPanel = new Panel({ w: 25, h: 20, v: 1 }, 40, 42, this.timerPanel, "game1", Game1.STATE.Game, [], 2);
        this.missPanel.setNumberBool(true);
        this.missPanel.setTextOverflow(true)
        this.missPanel.setLabel("" + this.misses + "");

        Game1.mainList.push(this.missPanel.getSprite());

        this.goldTrophy = new Sprite({ w: 17, h: 16 }, 60, 44, this.timerPanel);
        this.goldTrophy.addAnimation("normal", { x: 560, y: 906 });
        this.goldTrophy.addAnimation("batsu", { x: 577, y: 906 }, 4, [0.2, 0.2, 0.5, 0.1], false);
        this.goldTrophy.changeAnimation("normal");
        Game1.mainList.push(this.goldTrophy);

        this.silverTrophy = new Sprite({ w: 17, h: 16 }, 77, 44, this.timerPanel);
        this.silverTrophy.addAnimation("normal", { x: 560, y: 922 });
        this.silverTrophy.addAnimation("batsu", { x: 577, y: 922 }, 4, [0.2, 0.2, 0.5, 0.1], false);
        this.silverTrophy.changeAnimation("normal");
        Game1.mainList.push(this.silverTrophy);

        this.bronzeTrophy = new Sprite({ w: 17, h: 16 }, 94, 44, this.timerPanel);
        this.bronzeTrophy.addAnimation("normal", { x: 560, y: 938 });
        this.bronzeTrophy.addAnimation("batsu", { x: 577, y: 938 }, 4, [0.2, 0.2, 0.5, 0.1], false);
        this.bronzeTrophy.changeAnimation("normal");
        Game1.mainList.push(this.bronzeTrophy);

        // ------------ END Panel du bas END-------------

        this.bEndGame = false;
        this.endGameBg = null;
        this.endGamePanel = null;
        this.endGameTitle = null;
        this.endGameMissedList = null;
        this.dropdownPanel = null;
        this.mouseSprite = null;
        this.perfect = null;
        this.trophy = null;
        this.backToLessonBtn = null;
        this.restartBtn = null;
        this.timerMissedSprite = null;
    }

    static decreaseTimer() {
        this.timer--;
        this.timerNumber.getSprite().changeAnimation("" + this.timer + "");
        if (this.timer == 0) {
            this.timer = 5;
            this.timerSprite.changeAnimation("end");
            if (!this.bAlreadyMissed) {
                if (!MISSED_LIST.includes(RND_CHOICE.r)) {
                    MISSED_LIST.push(RND_CHOICE.r);
                }
                console.table(MISSED_LIST);
                Game1.bAlreadyMissed = true;
                this.setMiss();
                setScreenShake(true, 0, 0);
                this.timerMissedSprite = new Sprite({ w: 19, h: 22 }, centerX(19), this.kanaPanel.y - 30);
                this.timerMissedSprite.addAnimation("normal", { x: 656, y: 944 }, 4, 0.2, false);
                this.timerMissedSprite.changeAnimation("normal");
                Game1.mainList.push(this.timerMissedSprite);

            }
        }
    }

    //!    _          _______    _______    ______  
    //!    ( \        (  ___  )  (  ___  )  (  __  \ 
    //!    | (        | (   ) |  | (   ) |  | (  \  )
    //!    | |        | |   | |  | (___) |  | |   ) |
    //!    | |        | |   | |  |  ___  |  | |   | |
    //!    | |        | |   | |  | (   ) |  | |   ) |
    //!    | (____/\  | (___) |  | )   ( |  | (__/  )
    //!    (_______/  (_______)  |/     \|  (______/ 

    static load(pChoiceType, pAnswerType, pRange = 1, plessonRange, pLessonTestType, pLessonNumber) {
        log("load");
        this.bStartTransition = true;
        this.start = new Sprite({ w: 160, h: 45 }, centerX(160), CANVAS_HEIGHT, null, "g");
        this.start.addAnimation("normal", { x: 705, y: 17 });
        this.start.changeAnimation("normal");
        this.start.setDestination({ x: this.start.x, y: (CANVAS_HEIGHT * 0.5) - 45 });
        this.start.setMoveSpeed(1.5);
        Game1.transitionList.push(this.start);
        // bStatsDebug = true;

        if (Game1.timerPanel != undefined) {
            if (pLessonTestType != "Training") {
                Game1.timerPanel.setDestination({ x: centerX(122), y: CANVAS_HEIGHT - 66 });
            } else if (pLessonTestType == "Training") {
                Game1.timerPanel.setDestination({ x: centerX(122), y: CANVAS_HEIGHT });
            }
            Game1.timerPanel.setCanMove(true);
            Game1.timerPanel.setMovingSpeed(0.6);
            Game1.timerPanel.setMoving(true);

            Game1.timerPanel.setAlpha(0);
            Game1.timerPanel.fade(0.08);
        }



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
        MISSED_LIST = [];


        randomlyMix(CHOICE_TYPE, CHAR_NUMBERS, RANGE, LESSON_RANGE);

        if (Game1.bGameInitialized) {

            KANA_NUMBER = 0;
            TURN_NUMBER = 0;

            this.timer = 5;
            this.setMiss(0);

            this.bAlreadyMissed = false;
            this.timerSprite.changeAnimation("normal");
            this.timerNumber.changeAnimation("5");
            this.goldTrophy.changeAnimation("normal");
            this.silverTrophy.changeAnimation("normal");
            this.bronzeTrophy.changeAnimation("normal");

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

            this.firstBtn.setState(Button.STATE.Normal);
            this.firstBtn.getSprite().changeAnimation("normal");
            this.firstBtn.setLabel(choiceLabel + rndArr[0]);
            this.firstBtn.checkShiChiTsu(choiceLabel + rndArr[0]);
            this.firstBtn.setCallbackArg({ char: RND_ARR[0], label: rndArr[0] });

            this.secondBtn.setState(Button.STATE.Normal);
            this.secondBtn.getSprite().changeAnimation("normal");
            this.secondBtn.setLabel(choiceLabel + rndArr[1]);
            this.secondBtn.checkShiChiTsu(choiceLabel + rndArr[1]);
            this.secondBtn.setCallbackArg({ char: RND_ARR[1], label: rndArr[1] });

            this.thirdBtn.setState(Button.STATE.Normal);
            this.thirdBtn.getSprite().changeAnimation("normal");
            this.thirdBtn.setLabel(choiceLabel + rndArr[2]);
            this.thirdBtn.checkShiChiTsu(choiceLabel + rndArr[2]);
            this.thirdBtn.setCallbackArg({ char: RND_ARR[2], label: rndArr[2] });

            this.fourthBtn.setState(Button.STATE.Normal);
            this.fourthBtn.getSprite().changeAnimation("normal");
            this.fourthBtn.setLabel(choiceLabel + rndArr[3]);
            this.fourthBtn.checkShiChiTsu(choiceLabel + rndArr[3]);
            this.fourthBtn.setCallbackArg({ char: RND_ARR[3], label: rndArr[3] });

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

            let resetGameArg = "back_to_lesson";
            if (Game1.lessonTestType == "freemode") {
                resetGameArg = "back_to_freemode";
            }

            this.backBtn.setCallbackArg(resetGameArg);
        }
    }

    static stopTransition() {
        // log("stop transition");
        this.bStartTransition = false;
        this.start.delete = true;
        Game1.transitionList = [];
        FadeEffect.fade({ direction: "in", maxTimer: 0.02 });
    }






    //!     _______   _______   _                      _______    _          ______     _______    _______    _______    _______ 
    //!    (  ____ ) (  ___  ) ( (    /|              (  ____ \  ( (    /|  (  __  \   (  ____ \  (  ___  )  (       )  (  ____ \
    //!    | (    )| | (   ) | |  \  ( |              | (    \/  |  \  ( |  | (  \  )  | (    \/  | (   ) |  | () () |  | (    \/
    //!    | (____)| | (___) | |   \ | |      _____   | (__      |   \ | |  | |   ) |  | |        | (___) |  | || || |  | (__    
    //!    |  _____) |  ___  | | (\ \) |     (_____)  |  __)     | (\ \) |  | |   | |  | | ____   |  ___  |  | |(_)| |  |  __)   
    //!    | (       | (   ) | | | \   |              | (        | | \   |  | |   ) |  | | \_  )  | (   ) |  | |   | |  | (      
    //!    | )       | )   ( | | )  \  | _            | (____/\  | )  \  |  | (__/  )  | (___) |  | )   ( |  | )   ( |  | (____/\
    //!    |/        |/     \| |/    )_)(_)           (_______/  |/    )_)  (______/   (_______)  |/     \|  |/     \|  (_______/

    static displayEndGamePanel(pParams) { //? { bool }

        this.bEndGame = pParams.bool;

        if (this.bEndGame) {

            Button.currentList.forEach(b => {
                b.setState(Button.STATE.Inactive);
            });

            let gotTrophyLevel = 0;
            let bPerfect = false;
            if (this.misses == 0) {
                gotTrophyLevel = 48;
                bPerfect = true;
            } else if (this.misses > 0 && TOTAL_NUMBER - this.misses >= Math.ceil(TOTAL_NUMBER * 3 / 4)) {
                gotTrophyLevel = 32;
            } else if (this.misses > 0 && TOTAL_NUMBER - this.misses >= Math.ceil(TOTAL_NUMBER * 0.5)) {
                gotTrophyLevel = 16;
            } else {
                gotTrophyLevel = 0;
            }

            if (gotTrophyLevel > 0) { //? Manage SAVE uniquement si ce n'est pas GAME OVER
                Game1.manageEndGameSave(gotTrophyLevel);
            }


            this.endGameBg = new Sprite({ w: 1, h: 1 }, 0, 0, null, "normal", { x: CANVAS_WIDTH, y: CANVAS_HEIGHT });
            this.endGameBg.getSprite().addAnimation("normal", { x: 38, y: 3 });
            this.endGameBg.getSprite().changeAnimation("normal");
            this.endGameBg.setAlpha(0);
            this.endGameBg.fade(0.01);
            Game1.mainList.push(this.endGameBg.getSprite());

            this.endGamePanel = new Panel({ w: 17, h: 17, v: 16 }, centerX(200), centerY(180), null, "game1", Game1.STATE.Game, "", [1]);
            this.endGamePanel.changePanelSprite("t", 4, { x: 564, y: 748 });
            this.endGamePanel.changePanelSprite("t", 12, { x: 564, y: 748 });

            this.endGamePanel.setDestination({ x: centerX(200), y: centerY(200) });
            this.endGamePanel.setCanMove(true);
            this.endGamePanel.setMovingSpeed(0.5);
            this.endGamePanel.setMoving(true);

            this.endGamePanel.setAlpha(0);
            this.endGamePanel.fade(0.02);

            Panel.list.push(this.endGamePanel);
            Panel.currentList.push(this.endGamePanel);
            Game1.mainList.push(this.endGamePanel.getSprite());

            this.endGameTitle = new Panel({ w: 200, h: 30, v: 1 }, centerXElement(this.endGamePanel, 200), 10, this.endGamePanel, "game1", Game1.STATE.Game, "Congratulations", 2);
            if (gotTrophyLevel == 0) {
                this.endGameTitle.changeLabel("game_over");
            }
            this.endGameTitle.setOffsets(0, 18);
            Panel.list.push(this.endGameTitle);
            Panel.currentList.push(this.endGameTitle);
            Game1.mainList.push(this.endGameTitle.getSprite());

            this.endGameMark = new Panel({ w: 20, h: 20, v: 1 }, centerXElement(this.endGamePanel, 20), 90, this.endGamePanel, "game1", Game1.STATE.Game, [], 2);
            this.endGameMark.setNumberBool(true);
            this.endGameMark.setTextOverflow(true);
            this.endGameMark.setLabel(((TOTAL_NUMBER * MAX_TURN) - this.misses) + "/" + (TOTAL_NUMBER * MAX_TURN) + "");
            if (gotTrophyLevel == 0) {
                this.endGameMark.setFontColor("rgba(150,150,150,0)", "rgba(215,30,30,0)");
            }
            Panel.list.push(this.endGameMark);
            Panel.currentList.push(this.endGameMark);
            Game1.mainList.push(this.endGameMark.getSprite());

            let missedArray = [];
            if (this.misses > 0) {
                MISSED_LIST.forEach(m => {
                    if (Game1.currentKanaLesson == "h") {
                        missedArray.push(LANG["hira_" + m] + " => " + m);
                    } else if (Game1.currentKanaLesson == "k") {
                        missedArray.push(LANG["kata_" + m] + " => " + m);
                    }
                });

                this.endGameMissedList = new Panel({ w: 8, h: 12, v: 16 }, 450, centerY(152), null, "game1", Game1.STATE.Game, "to_review", [1]);
                this.endGameMissedList.setOffsets(5, 22);
                this.endGameMissedList.setTextOverflow(true);
                this.endGameMissedList.beginMoving({ x: 335, y: centerY(152) });

                this.dropdownPanel = new DropdownPanel({ w: 8, h: 10, v: 3 }, centerXElement(this.endGameMissedList, 86), 30, this.endGameMissedList, "game1", Game1.STATE.Game, missedArray, [2]);
                this.dropdownPanel.setParameters();
                this.dropdownPanel.setAlignText(0);

                if (this.dropdownPanel.bOverflow) {
                    this.mouseSprite = new Sprite({ w: 13, h: 11 }, this.dropdownPanel.offX + this.dropdownPanel.width - 25, 36, this.endGameMissedList);
                    this.mouseSprite.addAnimation("normal", { x: 544, y: 800 }, 4, 0.3);
                    this.mouseSprite.changeAnimation("normal");
                }

                Panel.list.push(this.endGameMissedList);
                Panel.currentList.push(this.endGameMissedList);
                Game1.mainList.push(this.endGameMissedList.getSprite());

                Panel.list.push(this.dropdownPanel);
                Panel.currentList.push(this.dropdownPanel);
                Game1.mainList.push(this.dropdownPanel.getSprite());


                if (this.dropdownPanel.bOverflow) {
                    Game1.mainList.push(this.mouseSprite);
                    this.dropdownPanel.spriteList.forEach(sp => {
                        Game1.mainList.push(sp);
                    });
                }
            }

            let multiplicator = 0;

            switch (gotTrophyLevel) {
                case 48:
                    multiplicator = 3;
                    break;
                case 32:
                    multiplicator = 2;
                    break;
                case 16:
                    multiplicator = 1;
                    break;
            }


            this.trophy = new Sprite({ w: 38, h: 38 }, centerXElement(this.endGamePanel, 38), 50, this.endGamePanel);
            this.trophy.getSprite().addAnimation("normal", { x: 342 + (38 * 4 * multiplicator), y: 1140 }, 4, 0.2); // 342 1140
            this.trophy.getSprite().changeAnimation("normal");
            Game1.mainList.push(this.trophy.getSprite());

            this.perfect = null;
            if (bPerfect) {
                this.perfect = new Sprite({ w: 36, h: 12 }, centerXElement(this.endGamePanel, 36, 40, 1), 93, this.endGamePanel);
                this.perfect.getSprite().addAnimation("normal", { x: 342, y: 1178 }, 2, 0.2);
                this.perfect.getSprite().changeAnimation("normal");
                Game1.mainList.push(this.perfect.getSprite());
            }

            this.restartBtn = new Button({ w: 80, h: 20, v: 6 }, centerXElement(this.endGamePanel, 80), 120, this.endGamePanel, { cb: Game1.displayEndGamePanel.bind(this), arg: { bool: false, restart: true } }, "game1", Game1.STATE.Game, "Restart", 41);
            this.restartBtn.setFontColor("rgba(142,45,45,1)");
            this.restartBtn.setAlpha(0);
            Button.currentList.push(this.restartBtn);
            Game1.mainList.push(this.restartBtn.getSprite());

            //? Si freemode (backToLesson => back to freemode)
            this.backToLessonBtn = new Button({ w: 50, h: 20, v: 6 }, centerXElement(this.endGamePanel, 50), 150, this.endGamePanel, { cb: Game1.displayEndGamePanel.bind(this), arg: { bool: false, restart: false } }, "game1", Game1.STATE.Game, "Back", 41);
            this.backToLessonBtn.setFontColor("rgba(142,45,45,1)");
            this.backToLessonBtn.setAlpha(0);
            Button.currentList.push(this.backToLessonBtn);
            Game1.mainList.push(this.backToLessonBtn.getSprite());

        } else {

            this.endGameBg.delete = true;
            this.trophy.delete = true;

            if (this.misses > 0) {
                this.endGameMissedList.removeFromList();
                this.dropdownPanel.removeFromList();
                this.endGameMissedList.removeFromCurrentList();
                this.dropdownPanel.removeFromCurrentList();
                this.endGameMissedList.getSprite().delete = true;
                this.dropdownPanel.deleteSprites();
                if (this.mouseSprite) this.mouseSprite.getSprite().delete = true;
            }

            this.endGamePanel.removeFromList();
            this.endGameTitle.removeFromList();
            this.endGameMark.removeFromList();
            this.backToLessonBtn.removeFromList();
            this.restartBtn.removeFromList();

            this.endGamePanel.removeFromCurrentList();
            this.endGameTitle.removeFromCurrentList();
            this.endGameMark.removeFromCurrentList();
            this.backToLessonBtn.removeFromCurrentList();
            this.restartBtn.removeFromCurrentList();

            this.endGamePanel.getSprite().delete = true;
            this.endGameTitle.getSprite().delete = true;
            this.endGameMark.getSprite().delete = true;
            this.backToLessonBtn.getSprite().delete = true;
            this.restartBtn.getSprite().delete = true;
            if (this.perfect) {
                this.perfect.getSprite().delete = true;
            }

            Game1.deleteSpritesFromList();

            this.endGamePanel = null;
            this.endGameTitle = null;
            this.endGameMark = null;
            this.endGameMissedList = null;
            this.dropdownPanel = null;
            this.mouseSprite = null;
            this.trophy = null;
            this.perfect = null;
            this.backToLessonBtn = null;
            this.restartBtn = null;

            Button.currentList.forEach(b => {
                b.setState(Button.STATE.Normal);
            });
            Panel.currentList.forEach(p => {
                p.setState(Panel.STATE.Normal);
            });

            displaySaving(false);

            if (!pParams.restart) {
                resetGame();
                if (Game1.lessonTestType != "freemode") {
                    MOUSE_SPRITE.y += CANVAS_HEIGHT; // Back after Finish 
                    Lessons.backToLesson();
                } else {
                    FreeMode.backToFreeMode();
                }
            } else {
                Game1.load(CHOICE_TYPE, ANSWER_TYPE, RANGE, LESSON_RANGE, Game1.lessonTestType, Game1.currentLessonNumber);
            }

        }

    }

    static freeModeEndGame(pGotTrophyLevel) {
        let paramsToSave = [];
        let type = "";
        let test1Mark = 0;
        let test2Mark = 0;
        let number = 0;

        if (Game1.currentKanaLesson == "h") {
            type = "hiragana";
        } else {
            type = "katakana"
        }
        let generalMark = SaveManager.SAVE_DATA["freemode"]["game1"][type + "General"]; //? current hiraganaGeneral | katakanaGeneral

        if (ANSWER_TYPE != "r") { //? Kana to Roma
            test1Mark = pGotTrophyLevel;
            test2Mark = SaveManager.SAVE_DATA["freemode"]["game1"][type + "2"];
            FreeMode.updateTrophyValue("kana_to_roma", pGotTrophyLevel);
            number = 1;
        } else { //? Kana to Roma
            test1Mark = SaveManager.SAVE_DATA["freemode"]["game1"][type + "1"];
            test2Mark = pGotTrophyLevel;
            FreeMode.updateTrophyValue("roma_to_kana", pGotTrophyLevel);
            number = 2;
        }

        //let currentMark = SaveManager.SAVE_DATA["freemode"]["game1"][type]; //? current hiragana1 | hiragana2 | katakana1 | katakana2

        if (generalMark < test1Mark && generalMark < test2Mark) {
            let newMark = 0;
            if (test1Mark <= test2Mark) {
                newMark = test1Mark;
            } else if (test1Mark > test2Mark) {
                newMark = test2Mark;
            }
            paramsToSave.push({ type: "freemode", params: type + "General", value: newMark });
            FreeMode.updateTrophyValue(type + "General", newMark);
        }

        paramsToSave.push({ type: "freemode", params: type + number, value: pGotTrophyLevel });
        SaveManager.save(paramsToSave);

        displaySaving();

    }



    //!     _______    _          ______     _______    _______    _______    _______             _______  _______           _______ 
    //!    (  ____ \  ( (    /|  (  __  \   (  ____ \  (  ___  )  (       )  (  ____ \           (  ____ \(  ___  )|\     /|(  ____ \
    //!    | (    \/  |  \  ( |  | (  \  )  | (    \/  | (   ) |  | () () |  | (    \/           | (    \/| (   ) || )   ( || (    \/
    //!    | (__      |   \ | |  | |   ) |  | |        | (___) |  | || || |  | (__       _____   | (_____ | (___) || |   | || (__    
    //!    |  __)     | (\ \) |  | |   | |  | | ____   |  ___  |  | |(_)| |  |  __)     (_____)  (_____  )|  ___  |( (   ) )|  __)   
    //!    | (        | | \   |  | |   ) |  | | \_  )  | (   ) |  | |   | |  | (                       ) || (   ) | \ \_/ / | (      
    //!    | (____/\  | )  \  |  | (__/  )  | (___) |  | )   ( |  | )   ( |  | (____/\           /\____) || )   ( |  \   /  | (____/\
    //!    (_______/  |/    )_)  (______/   (_______)  |/     \|  |/     \|  (_______/           \_______)|/     \|   \_/   (_______/                                                                                                                              

    static manageEndGameSave(pGotTrophyLevel) { //? Si on arrive ici c'est que
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
        } else if (Game1.lessonTestType == "freemode") {
            Game1.freeModeEndGame(pGotTrophyLevel);
            return;
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


        if ((test1Mark > 0 && test2Mark == 0) || (test1Mark == 0 && test2Mark > 0)) {
            Lessons.updateTrophyPanel(lessonTestType.slice(0, -1));
        }

        if (generalMark < test1Mark && generalMark < test2Mark) { //? True : Change General
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
            Game1.finishedLesson = Game1.currentLessonNumber;
            SaveManager.save(paramsToSave);

            // LessonBtn TO NORMAL MODE
            LessonBtn.list.every(b => {
                if (Game1.currentKanaLesson == "h") {
                    if (b.typeState == Lessons.STATE.Hiragana && b.label.slice(-1) == Game1.currentLessonNumber + 1) {
                        b.changeMode(0);
                        return false;
                    }
                } else if (Game1.currentKanaLesson == "k") {
                    if (b.typeState == Lessons.STATE.Katakana && b.label.slice(-1) == Game1.currentLessonNumber + 1) {
                        b.changeMode(0);
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

        displaySaving();
    }



    static deleteSpritesFromList() {
        Game1.mainList = Game1.mainList.filter(sp => {
            return !sp.delete;
        });
    }

    static setMiss(pArg = 1) {
        if (pArg == 1) {
            this.misses++;
            this.missPanel.setLabel(this.misses);
            if (this.misses == 1) {
                this.goldTrophy.changeAnimation("batsu");
            } else if ((TOTAL_NUMBER * MAX_TURN) - this.misses >= Math.ceil((TOTAL_NUMBER * MAX_TURN) * 0.5) && (TOTAL_NUMBER * MAX_TURN) - this.misses < Math.ceil((TOTAL_NUMBER * MAX_TURN) * 3 / 4)) { // this.misses < 3
                if (this.silverTrophy.currentAnimation.name != "batsu") {
                    this.silverTrophy.changeAnimation("batsu");
                }
            } else if ((TOTAL_NUMBER * MAX_TURN) - this.misses < Math.ceil((TOTAL_NUMBER * MAX_TURN) * 0.5)) { // this.misses > 3
                if (this.bronzeTrophy.currentAnimation.name != "batsu") {
                    this.bronzeTrophy.changeAnimation("batsu");
                }
            }
        } else {
            this.misses = pArg;
            this.missPanel.setLabel("" + this.misses + "");
        }
    }

    static update(dt) {

        /**
         * DEBUG
         */
        //------------ END DEBUG
        if (this.bStartTransition) {
            this.transitionTimer.update(dt);
            Sprite.manageBeforeUpdating(Game1.transitionList, dt);

        } else {
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

            Panel.currentList.forEach(p => {
                p.update(dt)
            });

            Sprite.manageBeforeUpdating(Game1.mainList, dt);

            Particles.list.forEach(p => {
                if (!p.delete) {
                    p.update(dt);
                }
            });

            this.chalkboardBrush.update(dt);
        }

        if (FadeEffect.bActive) {
            FadeEffect.update(dt);
        }

        if (Transition.bActive) {
            Transition.update(dt);
        }
    }

    static draw(ctx) {

        // SELON LA STRUCTURE DU JEU : 
        // ScreenManager.currentScreen.spriteList.forEach(sp => {
        //     sp.getSprite().draw(ctx)
        // });
        // --------------------------------

        if (this.bStartTransition) {
            ctx.fillStyle = "rgb(0,0,0)";
            ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
            Sprite.manageBeforeDrawing(Game1.transitionList);
        } else {
            Sprite.manageBeforeDrawing(Game1.mainList);

            if (!this.bEndGame) {
                this.chalkboardBrush.draw(ctx);
                this.maru.draw(ctx);
            }

            Particles.list.forEach(p => {
                p.draw(ctx);
            });


            ctx.fillStyle = "rgb(255,255,255)";
            ctx.font = "10px jpfont";
            ctx.textAlign = "center";

            if (!this.bEndGame && Game1.lessonTestType != "Training") {
                // ctx.fillText("Turns : " + TURN_NUMBER, centerX(), 10);
                // ctx.fillText("Kana : " + KANA_NUMBER, centerX(), 30);
                ctx.fillStyle = "rgb(150,150,150)";
                ctx.fillRect(this.kanaPanel.x, this.kanaPanel.y + this.kanaPanel.height + 5, this.kanaPanel.width, 3);
                ctx.fillStyle = "rgb(29,122,66)";
                ctx.fillRect(this.kanaPanel.x, this.kanaPanel.y + this.kanaPanel.height + 5, (KANA_NUMBER / (TOTAL_NUMBER * MAX_TURN)) * this.kanaPanel.width, 3);
            }

            if (FadeEffect.bActive) {
                FadeEffect.draw(ctx);
            }

            if (Game1.currentState == Game1.STATE.Pause) {
                Pause.draw(ctx)
            }

            if (bStatsDebug) {
                ctx.fillStyle = "rgb(255,255,255)";
                ctx.font = "32px pgfont";
                ctx.fillText("TOTAL : " + TOTAL_NUMBER, 100, 120);
                ctx.fillText("Mark : " + (TOTAL_NUMBER - this.misses), 100, 150);
            }
        }

        if (Transition.bActive) {
            Transition.draw(ctx);
        }
    }

    static chalkParticles(pArg) {
        for (let i = 0; i < 10; i++) {
            let size = rnd(1, 3);
            let rndOffsetX = rnd(1, pArg.offX);
            let rndOffsetY = rnd(1, pArg.offY);
            let p = new Particles(pArg.x + rndOffsetX, pArg.y + rndOffsetY, pArg.dirX, pArg.dirY, 0, { w: size, h: size }, rnd(1, 3));
            p.setColor("rgba(150, 150, 150, 1)");
        }
    }

    static displayStars(pX, pY) {
        pX += 20; //52/2 -5
        pY += 21; //52/2 -4
        // let dirArray = [{ x: pX, y: pY - 30 }, { x: pX + 38, y: pY }, { x: pX + 28, y: pY + 24 }, { x: pX - 29, y: pY + 24 }, { x: pX - 38, y: pY }];            // Up Right DownRight DownLeft Left
        let dirArray = [{ x: pX, y: pY - 30 }, { x: pX + 44, y: pY - 15 }, { x: pX + 28, y: pY + 24 }, { x: pX - 29, y: pY + 24 }, { x: pX - 46, y: pY - 15 }];            // Up Right DownRight DownLeft Left

        let dir2Array = [{ x: pX - 20, y: pY - 15 }, { x: pX + 18, y: pY - 15 }, { x: pX + 25, y: pY + 5 }, { x: pX, y: pY + 17 }, { x: pX - 30, y: pY + 5 }]; // 3 5
        // let partDirArray = [{ x: -1, y: -1 }, { x: 1, y: -1 }, { x: 1, y: 0.5 }, { x: 0, y: 1 }, { x: -1, y: 0.5 }] // Up Right DownRight DownLeft Left

        // for (let i = 0; i < 5; i++) {
        //     let star = new Sprite({ w: 10, h: 8 }, pX, pY, null, "st");
        //     star.addAnimation("normal", { x: 342, y: 1210 }, 8, [0.07, 0.07, 0.06, 0.06, 0.2, 0.1, 0.1, 0.1], false);
        //     star.changeAnimation("normal");
        //     star.setDestination({ x: dirArray[i].x, y: dirArray[i].y });
        //     star.setMoveSpeed(1);
        //     Game1.mainList.push(star);

        //     let star2 = new Sprite({ w: 10, h: 8 }, pX, pY, null, "st");
        //     star2.addAnimation("normal", { x: 342, y: 1219 }, 8, [0.07, 0.07, 0.06, 0.06, 0.2, 0.1, 0.1, 0.1], false);
        //     star2.changeAnimation("normal");
        //     star2.setDestination({ x: dir2Array[i].x, y: dir2Array[i].y });
        //     star2.setMoveSpeed(1);
        //     Game1.mainList.push(star2);

        // }

        for (let i = 0; i < 5; i++) {
            let star = new Sprite({ w: 10, h: 8 }, pX, pY, null, "st");
            star.addAnimation("normal", { x: 442, y: 1194 }, 8, [0.07, 0.07, 0.06, 0.06, 0.2, 0.1, 0.1, 0.1], false);
            star.changeAnimation("normal");
            star.setOffsetSS(1);
            star.setDestination({ x: dirArray[i].x, y: dirArray[i].y });
            star.setMoveSpeed(1);
            Game1.mainList.push(star);

            let star2 = new Sprite({ w: 10, h: 8 }, pX, pY, null, "st");
            star2.addAnimation("normal", { x: 442, y: 1204 }, 8, [0.07, 0.07, 0.06, 0.06, 0.2, 0.1, 0.1, 0.1], false);
            star2.changeAnimation("normal");
            star2.setOffsetSS(1);
            star2.setDestination({ x: dir2Array[i].x, y: dir2Array[i].y });
            star2.setMoveSpeed(1);
            Game1.mainList.push(star2);

        }
    }

}