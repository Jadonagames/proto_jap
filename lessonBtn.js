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