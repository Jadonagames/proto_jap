class LessonBtn extends Button {

    static list = [];

    static STATE = Object.freeze({
        Normal: 0,
        Hover: 1,
        Inactive: 2,
        Close: 3,
    });

    constructor(pSize, pX, pY, pParent, pCallback, pType = "normal", pTypeState = null, pLabel = "", pId = 0, pStaticSize = false) {
        super(pSize, pX, pY, pParent, pCallback, pType, pTypeState, pLabel, pId, pStaticSize);


        this.savedCB = {};
        this.mode = 0;

        LessonBtn.list.push(this);
    }

    saveCallback(pParam) {
        this.savedCB = {
            cb: pParam.cb,
            arg: pParam.arg
        }
    }

    setMode(pMode, pCBToSave, pOffYColor) {

        if (pMode == 1) {
            this.getSprite().addAnimation("normal", { x: 596, y: 544 + pOffYColor });
            this.getSprite().addAnimation("hover", { x: 668, y: 544 + pOffYColor });
            this.getSprite().addAnimation("down", { x: 668, y: 544 + pOffYColor });
            this.getSprite().addAnimation("clicked", { x: 740, y: 544 + pOffYColor }, 4, 0.2, false);
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
            this.setBoxCollider(65, 20, 2, 5);
        }

    }

    changeMode(pMode) {

        if (pMode == 0) {
            this.getSprite().resetAnimations("normal", { x: 380, y: this.getSprite().getAnimation("normal").origin.y });
            this.getSprite().resetAnimations("hover", { x: 452, y: this.getSprite().getAnimation("hover").origin.y });
            this.getSprite().resetAnimations("down", { x: 524, y: this.getSprite().getAnimation("down").origin.y });
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

    drawLabel(ctx) {

        // "Normal" main: rgba(0,0,0,1)      | bg: rgba(176,150,124,1) 
        // "Hover"  main: rgba(162,138,114,1) | bg: rgba(213,210,190,1)
        // "Down"  idem hover

        if (this.state == LessonBtn.STATE.Hover) {
            ctx.fillStyle = this.hoverFontMainColor;
            ctx.shadowColor = this.hoverBackgroundColor;
        } else {
            ctx.fillStyle = this.fontMainColor;
            ctx.shadowColor = this.fontBackgroundColor;
        }

        ctx.font = this.fontSize + "px " + this.font;
        ctx.shadowOffsetY = 2;

        switch (this.alignText) {
            case this.ALIGN_TEXT.Center:
                if (this.mode != 1) {
                    ctx.textAlign = "center";
                    ctx.fillText(LANG[this.label], this.x + this.textOffsetX + (this.width * 0.5) + 0.5, this.y + this.textOffsetY); // +0.5 Car en centrant le texte se retrouve entre deux pixels
                }
                break;
        }

        ctx.shadowOffsetY = 0;
        ctx.fillStyle = "rgba(0,0,0,1)";
        ctx.textAlign = "left";

    }
}