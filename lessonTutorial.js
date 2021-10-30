class LessonTutorial {

    static mainList = [];
    static lessonList = [];
    static bInit = false;

    static STATE = Object.freeze({
        Main: 0,
    })

    static previousState = -1;

    static state = LessonTutorial.STATE.Main;

    constructor() {

    }

    static init() {

        LessonTutorial.bInit = true;

        this.blabla = new Sprite({ w: 30, h: 30 }, 0, 0);
        this.blabla.addAnimation("normal", { x: 0, y: 0 });
        this.blabla.changeAnimation("normal");
        LessonTutorial.mainList.push(this.blabla);

        // SaveManager.save([{ type: "prologue", value: 1 }]);

        let lessonsBtn = new Button({ w: 110, h: 22, v: 8 }, centerX(110), 0, null, { cb: changeMainState, arg: { state: MAIN_STATE.Lessons, from: "mainmenu" } }, "lessonTutorial", LessonTutorial.STATE.Main, "Lessons", 4);
        lessonsBtn.setFontColor("rgba(142,45,45,1)");
        LessonTutorial.mainList.push(lessonsBtn.getSprite());


        this.dialogPanel = new Panel({ w: 200, h: 70, v: 5 }, centerX(200), CANVAS_HEIGHT + 50, null, "lessonTutorial", LessonTutorial.STATE.Main, ["ph_text_", 3, true], 1);
        this.dialogPanel.setOffsets(10, 20);
        this.dialogPanel.setDialogType(true);
        this.dialogPanel.setAlignText(this.dialogPanel.ALIGN_TEXT.Left);

        this.dialogPanel.setDestination({ x: centerX(200), y: CANVAS_HEIGHT - 75 });
        this.dialogPanel.setCanMove(true);
        this.dialogPanel.setMovingSpeed(1);
        this.dialogPanel.setMoving(true);

        this.dialogPanel.setAlpha(0);
        this.dialogPanel.fade(0.08);

        LessonTutorial.mainList.push(this.dialogPanel.getSprite());

        this.dialogPanelBtn = new Button({ w: 14, h: 12 }, this.dialogPanel.totalWidth - 25, this.dialogPanel.height - 20, this.dialogPanel, this.dialogPanel.nextPhrase.bind(this.dialogPanel), "", LessonTutorial.STATE.Main, "", 0, true);
        this.dialogPanelBtn.getSprite().addAnimation("normal", { x: 124, y: 79 });
        this.dialogPanelBtn.getSprite().addAnimation("hover", { x: 138, y: 79 });
        this.dialogPanelBtn.getSprite().addAnimation("down", { x: 152, y: 79 });
        this.dialogPanelBtn.getSprite().changeAnimation("normal");
        this.dialogPanel.setChildBtn(this.dialogPanelBtn, "lessonTutorial.main");


    }


    static changeState(pNewState) {
        LessonTutorial.state = pNewState;
        Button.resetTypeState("lessonTutorial", pNewState);
        Panel.resetTypeState("lessonTutorial", pNewState);
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

        ctx.font = "20px jpfont";
        ctx.textAlign = "center";
        ctx.shadowColor = "rgb(20,102,53)";
        ctx.shadowOffsetY = 4;
        ctx.fillStyle = "rgb(255,255,255)";

        ctx.fillText("LessonTutorial", 10, 120);


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