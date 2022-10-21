class LessonBtn extends Button {

    static list = [];
    static hiraganaList = [];
    static katakanaList = [];

    static STATE = Object.freeze({
        Normal: 0,
        Hover: 1,
        Inactive: 2,
        Close: 3,
        Open: 4
    });

    constructor(pSize, pX, pY, pParent, pCallback, pType = "normal", pTypeState = null, pLabel = "", pId = 0, pStaticSize = false) {
        super(pSize, pX, pY, pParent, pCallback, pType, pTypeState, pLabel, pId, pStaticSize);

        this.savedCB = {};
        this.mode = 0;

        if (pTypeState == 1) {
            LessonBtn.hiraganaList.push(this);
        } else {
            LessonBtn.katakanaList.push(this);
        }

        LessonBtn.list.push(this);
    }

    saveCallback(pParam) {
        this.savedCB = {
            cb: pParam.cb,
            arg: pParam.arg
        }
    }

    setOffsets(pX = 0, pY = 13, pDown = 2, pHover = -1) {
        this.textOffsetX = pX;
        this.textOffsetY = pY;
        this.textOffsetXOrigin = pX;
        this.textOffsetYOrigin = pY;
        this.textOffsetXHover = this.textOffsetX + pHover;
        this.textOffsetYHover = this.textOffsetY + pHover;
        this.textOffsetXDown = this.textOffsetX + pDown;
        this.textOffsetYDown = this.textOffsetY + pDown;
    }

    setMode(pMode, pCBToSave, pOffYColor) {

        if (pMode == 1) {
            this.getSprite().addAnimation("normal", { x: 596, y: 544 + pOffYColor });
            this.getSprite().addAnimation("hover", { x: 668, y: 544 + pOffYColor });
            this.getSprite().addAnimation("down", { x: 668, y: 544 + pOffYColor });
            this.getSprite().addAnimation("clicked", { x: 740, y: 544 + pOffYColor }, 4, 0.2, false);
            this.getSprite().addAnimation("open", { x: 1028, y: 544 + pOffYColor }, 8, [1, 0.15, 0.15, 0.15, 0.05, 0.05, 0.05, 0.1], false);
            this.getSprite().setAnimationCB("open", this.afterOpen.bind(this));

            this.mode = 1;
            this.setBoxCollider(8, 20, 4, 5);
            this.saveCallback(pCBToSave);
            this.callback = {
                cb: this.getSprite().changeAnimation.bind(this.getSprite()),
                arg: "clicked"
            };
            this.getSprite().setAnimationCB("clicked", {
                cb: this.getSprite().changeAnimation.bind(this.getSprite()),
                arg: "normal"
            });
        } else {
            this.getSprite().addAnimation("normal", { x: 380, y: 544 + pOffYColor });
            this.getSprite().addAnimation("hover", { x: 452, y: 544 + pOffYColor });
            this.getSprite().addAnimation("down", { x: 524, y: 544 + pOffYColor });
            this.getSprite().addAnimation("inactive", { x: 289, y: 544 + pOffYColor });
            this.getSprite().addAnimation("clicked", { x: 740, y: 544 + pOffYColor }, 4, 0.2, false);
            this.getSprite().addAnimation("open", { x: 1028, y: 544 + pOffYColor }, 8, [1, 0.15, 0.15, 0.15, 0.05, 0.05, 0.05, 0.1], false);
            this.getSprite().setAnimationCB("open", this.afterOpen.bind(this));
            this.setBoxCollider(65, 20, 2, 5);
        }

    }

    changeMode(pMode) {
        if (pMode == 0) {
            this.getSprite().resetAnimations("normal", { x: 380, y: this.getSprite().getAnimation("normal").origin.y });
            this.getSprite().resetAnimations("hover", { x: 452, y: this.getSprite().getAnimation("hover").origin.y });
            this.getSprite().resetAnimations("down", { x: 524, y: this.getSprite().getAnimation("down").origin.y });
            this.getSprite().resetAnimations("open", { x: 1028, y: this.getSprite().getAnimation("open").origin.y }, 7, [0.15, 0.15, 0.15, 0.05, 0.05, 0.05, 0.1], false);
            this.getSprite().changeAnimation("open");
            this.setBoxCollider(65, 20, 2, 5);
            this.mode = 0;
            this.callback = {
                cb: this.savedCB.cb,
                arg: this.savedCB.arg
            };

        } else {
            // TO MODE 1
            this.getSprite().resetAnimations("normal", { x: 596, y: this.getSprite().getAnimation("normal").origin.y });
            this.getSprite().resetAnimations("hover", { x: 668, y: this.getSprite().getAnimation("hover").origin.y });
            this.getSprite().resetAnimations("down", { x: 668, y: this.getSprite().getAnimation("down").origin.y });
            this.getSprite().resetAnimations("clicked", { x: 740, y: this.getSprite().getAnimation("clicked").origin.y });
            this.mode = 1;
            this.setBoxCollider(8, 20, 4, 5);
            this.saveCallback({ cb: this.callback.cb, arg: this.callback.arg });
            this.callback = {
                cb: this.getSprite().changeAnimation.bind(this.getSprite()),
                arg: "clicked"
            };
            this.getSprite().setAnimationCB("clicked", {
                cb: this.getSprite().changeAnimation.bind(this.getSprite()),
                arg: "normal"
            });
        }
    }

    afterOpen() {
        let kana = "";
        let lessonNumber = this.label.split('_')[1];
        if (this.callback.arg[1] == 1) {
            kana = "h";
        } else {
            kana = "k";
        }

        let save = [];
        save.push({ type: "buttonAnimation", params: kana + lessonNumber });
        save.push({ type: "newAnimation", params: kana + lessonNumber });
        SaveManager.save(save);
        this.setFontColor(LESSON_BTN_SDW_COLOR, BLACK_COLOR, LESSON_BTN_HVR_SDW_COLOR, LESSON_BTN_HOVER_COLOR);
        this.getSprite().changeAnimation("normal");
        this.state = LessonBtn.STATE.Normal;

        Lessons.displayNewLogo(kana, lessonNumber);

        if (inTransition()) {
            Transition.startOpen();
        }
    }

    drawLabel(ctx) {

        // "Normal" main: BLACK_COLOR      | bg: LESSON_BTN_SDW_COLOR 
        // "Hover"  main: LESSON_BTN_HOVER_COLOR | bg: LESSON_BTN_HVR_SDW_COLOR
        // "Down"  idem hover

        if (this.state == LessonBtn.STATE.Hover) {
            ctx.fillStyle = this.hoverFontMainColor;
            ctx.shadowColor = this.hoverBackgroundColor;
        } else {
            ctx.fillStyle = this.fontMainColor;
            ctx.shadowColor = this.fontBackgroundColor;
        }

        ctx.font = this.fontSize + "px " + this.font;
        ctx.shadowOffsetY = currentScale;

        switch (this.alignText) {
            case this.ALIGN_TEXT.Center:
                if (this.mode != 1) {
                    ctx.textAlign = "center";
                    ctx.fillText(LANG[this.label], this.x + this.textOffsetX + (this.width * 0.5) + 0.5, this.y + this.textOffsetY); // +0.5 Car en centrant le texte se retrouve entre deux pixels
                }
                break;
        }

        ctx.shadowOffsetY = 0;
        ctx.fillStyle = BLACK_COLOR;
        ctx.textAlign = "left";

    }
}

class KeyboardBtn extends Button {
    constructor(pSize, pX, pY, pParent, pCallback, pType = "normal", pTypeState = null, pLabel = "", pId = 0, pStaticSize = false) {
        super(pSize, pX, pY, pParent, pCallback, pType, pTypeState, pLabel, pId, pStaticSize);
    }
}

class SoundBtn extends Button {
    constructor(pSize, pX, pY, pParent, pCallback, pType = "normal", pTypeState = null, pLabel = "", pId = 0, pStaticSize = false) {
        super(pSize, pX, pY, pParent, pCallback, pType, pTypeState, pLabel, pId, pStaticSize);

        this.sound = "";
    }
}

class CheckboxBtn extends Button {

    static STATE = Object.freeze({
        Normal: 0,
        Hover: 1,
        Inactive: 2,
        C_Normal: 3,
        C_Hover: 4
    });

    static checklist = [];

    constructor(pSize, pX, pY, pParent, pCallback, pType = "normal", pTypeState = null, pLabel = "", pId = 0, pStaticSize = false) {
        super(pSize, pX, pY, pParent, pCallback, pType, pTypeState, pLabel, pId, pStaticSize);

        this.group = -1;
        this.bChecked = false;

        // CheckboxBtn.checklist.push(this);
    }

    setGroup(pId) {
        this.group = 0;
    }

    check() {
        CheckboxBtn.list.forEach(b => {
            if (b.group == this.group) {
                b.bChecked = false;
                b.setIdTest(-1);
                b.getSprite().changeAnimation("normal");
            }
        });
        this.bChecked = true;
        this.setIdTest("c");
        this.getSprite().changeAnimation("c_normal");
        MOUSE_SPRITE.changeAnimation("normal");
    }

    setAnimations(pCoord) { //? For static size & normal Buttons
        this.sp.getSprite().addAnimation("normal", { x: pCoord.x, y: pCoord.y });
        this.sp.getSprite().addAnimation("hover", { x: pCoord.x + this.width, y: pCoord.y });
        this.sp.getSprite().addAnimation("down", { x: pCoord.x + (this.width * 2), y: pCoord.y });

        this.sp.getSprite().addAnimation("c_normal", { x: pCoord.x, y: pCoord.y + this.height});
        this.sp.getSprite().addAnimation("c_hover", { x: pCoord.x + this.width, y: pCoord.y + this.height});
        this.sp.getSprite().addAnimation("c_down", { x: pCoord.x + (this.width * 2), y: pCoord.y + this.height});

        if (this.bInactiveAnimation) {
            this.sp.getSprite().addAnimation("inactive", { x: pCoord.x + (this.width * 3), y: pCoord.y });
        }

        this.sp.getSprite().changeAnimation("normal");
    }

    drawLabel(ctx) {

        if (this.parent && this.parent.bFading) {
            this.updateAlpha();
        }

        if (this.state == Button.STATE.Hover) {
            ctx.fillStyle = this.hoverFontMainColor;
            ctx.shadowColor = this.hoverBackgroundColor;
        } else if (this.bChecked) {
            ctx.fillStyle = "rgba(141,41,41,1)";
            ctx.shadowColor = this.hoverBackgroundColor;
        } else {
            ctx.fillStyle = this.fontMainColor;
            ctx.shadowColor = this.fontBackgroundColor;
        }

        ctx.font = this.fontSize + "px " + this.font;
        ctx.shadowOffsetY = currentScale;

        switch (this.alignText) {
            case this.ALIGN_TEXT.Left:
                ctx.textAlign = "left";
                ctx.fillText(LANG[this.label], this.x + 5, this.y + this.textOffsetY);
                break;
            case this.ALIGN_TEXT.Center:
                ctx.textAlign = "center";
                ctx.fillText(LANG[this.label], this.x + this.textOffsetX + (this.width * 0.5) + 0.5, this.y + this.textOffsetY); // +0.5 Car en centrant le texte se retrouve entre deux pixels
                break;
            case this.ALIGN_TEXT.Right:
                ctx.textAlign = "right";
                ctx.fillText(LANG[this.label], this.x + this.width - 5, this.y + this.textOffsetY);
                break;
        }

        ctx.shadowOffsetY = 0;
        ctx.fillStyle = BLACK_COLOR;
        ctx.textAlign = "left";
    }

}