class LessonTutorial {

    static mainList = [];
    static lessonList = [];
    static bInit = false;

    static STATE = Object.freeze({
        Main: 0,
    })

    static state = LessonTutorial.STATE.Main;

    constructor() {

    }

    static init() {

        LessonTutorial.mainList = [];
        Button.list = Button.list.filter(b => {
            return b.type != "lessonTutorial"
        });
        Panel.list = Panel.list.filter(p => {
            return p.type != "lessonTutorial"
        });

        LessonTutorial.bInit = true;

        this.lessonBtn = null;

        this.dialogPanel = new DialogPanel({ w: 220, h: 70, v: 6 }, centerX(220), CANVAS_HEIGHT + 50, null, "lessonTutorial", LessonTutorial.STATE.Main, ["lesson_text_", 16, true], 7);
        this.dialogPanel.setOffsets(12, 18);
        this.dialogPanel.setFontColor(GREEN_BOARD_SDW_COLOR, WHITE_COLOR);
        this.dialogPanel.setAlignText(this.dialogPanel.ALIGN_TEXT.Left);
        this.dialogPanel.beginMoving({ x: centerX(220), y: CANVAS_HEIGHT - 75 }, 1, true, 0, 0.08);
        this.dialogPanel.setScriptCallback(LessonTutorial.nextStep.bind(LessonTutorial));
        this.dialogPanel.setEndDialogCallback(LessonTutorial.endTutorial.bind(LessonTutorial));
        this.dialogPanel.setStateList("lessonTutorial");
        LessonTutorial.mainList.push(this.dialogPanel.getSprite());

        this.dialogBtnContainer = new Sprite({ w: 30, h: 28 }, this.dialogPanel.width - 14, this.dialogPanel.height - 28, this.dialogPanel, "");
        this.dialogBtnContainer.addAnimation("normal", { x: 416, y: 144 });
        this.dialogBtnContainer.changeAnimation("normal");
        //this.dialogPanel.setChildSprite(this.dialogBtnContainer, "lessonTutorial.main");
        LessonTutorial.mainList.push(this.dialogBtnContainer);

        // this.dialogSpeedBtn = new Button({ w: 19, h: 17 }, this.dialogBtnContainer.x + 5, this.dialogBtnContainer.y - 20, this.dialogPanel, this.dialogPanel.speedPhrase.bind(this.dialogPanel), "lessonTutorial", LessonTutorial.STATE.Main, "", 0, true);
        this.dialogSpeedBtn = new Button({ w: 19, h: 17 }, this.dialogBtnContainer.x + 5, this.dialogBtnContainer.y + 5, this.dialogPanel, this.dialogPanel.speedPhrase.bind(this.dialogPanel), "lessonTutorial", LessonTutorial.STATE.Main, "", 0, true);
        this.dialogSpeedBtn.setAnimations({ x: 255, y: 89 });
        LessonTutorial.mainList.push(this.dialogSpeedBtn.getSprite());


        this.dialogPanelBtn = new Button({ w: 19, h: 17 }, this.dialogBtnContainer.x + 5, this.dialogBtnContainer.y + 5, this.dialogPanel, this.dialogPanel.nextPhrase.bind(this.dialogPanel), "lessonTutorial", LessonTutorial.STATE.Main, "", 0, true);
        this.dialogPanelBtn.setAnimations({ x: 255, y: 106 });
        // LessonTutorial.mainList.push(this.dialogPanelBtn.getSprite());
        // this.dialogPanel.setChildBtn(this.dialogPanelBtn, "lessonTutorial.main");



        this.screens = new Sprite({ w: 450, h: 222 }, 0, 0);
        this.screens.addAnimation("0", { x: 384, y: 1399 }); // 450 222 //? Bienvenue
        this.screens.addAnimation("1", { x: 834, y: 1399 }); // 450 222 //? 15 leçons
        this.screens.addAnimation("2", { x: 0, y: 1680 }, 3, [0.8, 1.3, 4]);   // 222 219  --> 1-800ms 2-400-400-500ms 10-400ms   //? Chaque leçon 5 chars
        this.screens.addAnimation("3", { x: 666, y: 1680 }); //? Informations
        this.screens.addAnimation("4", { x: 916, y: 1680 }); //? Chaque leçon 3 choix
        this.screens.addAnimation("5", { x: 1252, y: 1680 }); //? Training
        this.screens.addAnimation("6", { x: 1588, y: 1680 }); //? Test leçon
        this.screens.addAnimation("7", { x: 1924, y: 1680 }); //? Full test *2
        this.screens.addAnimation("9", { x: 1284, y: 1399 }, 3, [0.5, 1, 1]); //? kana 4 choix ou roma 4 choix  *2
        this.screens.addAnimation("11", { x: 432, y: 1242 }); //? Trophée *2
        this.screens.addAnimation("13", { x: 842, y: 1242 }); //? Timer *2
        this.screens.setAnimationFrameCB("2", [
            {
                nb: 1,
                callback: LessonTutorial.createSoundBtn.bind(LessonTutorial)
            },
            {
                nb: 2,
                callback: LessonTutorial.createKanaAnimation.bind(LessonTutorial)
            }
        ]);
        this.screens.changeAnimation("0");
        LessonTutorial.mainList.push(this.screens);

        this.moe = new Sprite({ w: 24, h: 24 }, this.dialogPanel.width + 15, 10, this.dialogPanel, "", { x: 2, y: 2 });
        this.moe.addAnimation("idle", { x: 342, y: 272 }, 4, [0.3, 0.075, 0.3, 0.075]);
        this.moe.changeAnimation("idle");
        LessonTutorial.mainList.push(this.moe.getSprite());

        this.soundBtn = null;
        this.kana = null;
        this.trainingPanel = null;
        this.lessonTestPanel = null;
        this.fullTestPanel = null;
    }

    static switchButtons(pSpeedToNext) {
        if (pSpeedToNext) {
            this.dialogSpeedBtn.getSprite().delete = true;
            this.dialogSpeedBtn.removeFromCurrentList();

            this.dialogPanelBtn.getSprite().delete = false;
            LessonTutorial.mainList.push(this.dialogPanelBtn.getSprite());
            Button.currentList.push(this.dialogPanelBtn);

            checkMouseHover(this.dialogPanelBtn);
        } else {
            this.dialogPanelBtn.getSprite().delete = true;
            this.dialogPanelBtn.removeFromCurrentList();

            this.dialogSpeedBtn.getSprite().delete = false;
            LessonTutorial.mainList.push(this.dialogSpeedBtn.getSprite());
            Button.currentList.push(this.dialogSpeedBtn);

            checkMouseHover(this.dialogSpeedBtn);
        }
    }

    static desactiveDialogButton() {
        this.dialogPanelBtn.getSprite().delete = true;
        this.dialogPanelBtn.removeFromCurrentList();
        // checkMouseHover(this.dialogSpeedBtn);
    }

    static createSoundBtn() {
        this.soundBtn = new Sprite({ w: 49, h: 31 }, 222, 17, null, "todelete");
        this.soundBtn.addAnimation("normal", { x: 294, y: 1632 }, 3, [0.4, 0.4, 0.5], false);
        this.soundBtn.changeAnimation("normal");
        LessonTutorial.mainList.push(this.soundBtn);
    }
    static createKanaAnimation() {
        this.kana = new Sprite({ w: 48, h: 30 }, 279, 18, null, "todelete");
        this.kana.addAnimation("normal", { x: 441, y: 1632 }, 10, 0.4, false);
        this.kana.changeAnimation("normal");
        LessonTutorial.mainList.push(this.kana);
    }

    static nextStep(pId) {
        switch (pId) {
            case 1:
                this.screens.changeAnimation("1");
                break;
            case 2:
                this.screens.setSize(222, 219);
                this.screens.originWidth = 222;
                this.screens.x = centerX(222);
                this.screens.changeAnimationMaxWidth("2");
                this.screens.changeAnimation("2");
                break;
            case 3:
                if (this.soundBtn) {
                    this.soundBtn.delete = true;
                    this.soundBtn = null;
                }
                if (this.kana) {
                    this.kana.delete = true;
                    this.kana = null;
                }
                this.screens.setSize(250, 220);
                this.screens.originWidth = 250;
                this.screens.x = centerX(250);
                this.screens.changeAnimationMaxWidth("3");
                this.screens.changeAnimation("3");
                break;
            case 4:
                this.screens.setSize(336, 130);
                this.screens.originWidth = 336;
                this.screens.x = centerX(336);
                this.screens.y = centerY(130);
                this.screens.changeAnimationMaxWidth("4");
                this.screens.changeAnimation("4");

                this.trainingPanel = new Panel({ w: 60, h: 30, v: 1 }, 75, 180, null, "lessonTutorial", LessonTutorial.STATE.Main, "Training", 2);
                this.trainingPanel.setTextOverflow(true);
                this.lessonTestPanel = new Panel({ w: 60, h: 30, v: 1 }, 165, 180, null, "lessonTutorial", LessonTutorial.STATE.Main, "Lesson_test", 2);
                this.lessonTestPanel.setTextOverflow(true);
                this.fullTestPanel = new Panel({ w: 60, h: 30, v: 1 }, 275, 180, null, "lessonTutorial", LessonTutorial.STATE.Main, "Full_test", 2);
                this.fullTestPanel.setTextOverflow(true);

                Panel.list.push(this.trainingPanel);
                Panel.currentList.push(this.trainingPanel);
                Panel.list.push(this.lessonTestPanel);
                Panel.currentList.push(this.lessonTestPanel);
                Panel.list.push(this.fullTestPanel);
                Panel.currentList.push(this.fullTestPanel);
                LessonTutorial.mainList.push(this.trainingPanel.getSprite());
                LessonTutorial.mainList.push(this.lessonTestPanel.getSprite());
                LessonTutorial.mainList.push(this.fullTestPanel.getSprite());
                break;
            case 5:
                this.screens.changeAnimation("5");
                break;
            case 6:
                this.screens.changeAnimation("6");
                break;
            case 7:
                this.screens.changeAnimation("7");
                break;
            case 9:
                this.screens.setSize(364, 185);
                this.screens.originWidth = 364;
                this.screens.x = centerX(364);
                this.screens.y = 30;
                this.screens.changeAnimationMaxWidth("9");
                this.screens.changeAnimation("9");
                this.lessonTestPanel.x = 45;
                this.lessonTestPanel.y = 185;
                this.fullTestPanel.x = 160;
                this.fullTestPanel.y = 185;
                this.trainingPanel.removeFromList();
                this.trainingPanel.removeFromCurrentList();
                this.trainingPanel.getSprite().delete = true;
                this.trainingPanel = null;
                break;
            case 11:
                this.screens.setSize(410, 156);
                this.screens.originWidth = 410;
                this.screens.x = centerX(410);
                this.screens.y = 10;
                this.screens.changeAnimationMaxWidth("11");
                this.screens.changeAnimation("11");
                this.lessonTestPanel.x = 215;
                this.lessonTestPanel.y = 135;
                this.fullTestPanel.x = 325;
                this.fullTestPanel.y = 135;
                break;
            case 13:
                this.lessonTestPanel.removeFromList();
                this.lessonTestPanel.removeFromCurrentList();
                this.lessonTestPanel.getSprite().delete = true;
                this.lessonTestPanel = null;
                this.fullTestPanel.removeFromList();
                this.fullTestPanel.removeFromCurrentList();
                this.fullTestPanel.getSprite().delete = true;
                this.fullTestPanel = null;
                this.screens.setSize(160, 156);
                this.screens.originWidth = 160;
                this.screens.x = centerX(160);
                this.screens.y = 50;
                this.screens.changeAnimationMaxWidth("13");
                this.screens.changeAnimation("13");
                break;
            case 15:
                this.fullTestPanel = null;
                this.screens.delete = true;
                this.screens = null;
                break;
        }
    }

    static endTutorial() {

        if (SaveManager.SAVE_DATA["prologue"] == 0) { //? Pour savoir si c'est la première fois qu'on fait le lessonTutorial ou pas
            SaveManager.save([{ type: "prologue", value: 1 }]);
        }
        this.lessonsBtn = new Button({ w: 110, h: 22, v: 8 }, centerX(110), centerY(22), null, { cb: changeMainState, arg: { state: MAIN_STATE.Lessons, from: "mainmenu" } }, "lessonTutorial", LessonTutorial.STATE.Main, "Lessons", 4);
        this.lessonsBtn.setFontColor(RED_BTN_SDW_COLOR);
        Button.currentList.push(this.lessonsBtn);
        LessonTutorial.mainList.push(this.lessonsBtn.getSprite());
    }

    static changeState(pNewState) {
        LessonTutorial.state = pNewState;
        Button.resetTypeState("lessonTutorial", pNewState);
        Panel.resetTypeState("lessonTutorial", pNewState);
        this.dialogPanelBtn.removeFromCurrentList();
    }

    static update(dt) {

        Sprite.manageBeforeUpdating(LessonTutorial.mainList, dt);
        LessonTutorial.mainList = LessonTutorial.mainList.filter(sp => {
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
    }

    static draw(ctx) {

        Sprite.manageBeforeDrawing(LessonTutorial.mainList);

        ctx.font = "10px jpfont";
        ctx.shadowOffsetY = 0;
        ctx.textAlign = "left";

        /**
         * DEBUG
         */
        //------------- END DEBUG

        // if (FadeEffect.bActive) {
        //     FadeEffect.draw(ctx);
        // }
    }
}