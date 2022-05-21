class KanaBtn extends Button {
    constructor(pSize, pX, pY, pParent, pCallback, pType = "normal", pTypeState = null, pLabel = "", pId = 0, pStaticSize = false) {
        super(pSize, pX, pY, pParent, pCallback, pType, pTypeState, pLabel, pId, pStaticSize);
    }

    checkShiChiTsu(newLabel) {
        if (newLabel == "roma_shi" || newLabel == "roma_chi" || newLabel == "roma_tsu") {
            this.setFontSize(25);
            this.setOffsets(-1, 34);
        } else {
            this.setFontSize(30);
            this.setOffsets(-1, 36);
        }
    }

    drawLabel(ctx) {

        if (this.state == Button.STATE.Hover) {
            ctx.fillStyle = WHITE_COLOR;
            ctx.shadowColor = "rgba(23,88,49,1)";
        } else if (this.state == Button.STATE.Inactive) {
            ctx.fillStyle = "rgb(0,0,0,0.5)";
            ctx.shadowColor = "rgba(23,88,49,0.5)";
        } else {
            ctx.fillStyle = BLACK_COLOR;
            ctx.shadowColor = "rgba(23,88,49,1)";
        }

        ctx.font = this.fontSize + "px " + this.font;
        ctx.shadowOffsetY = 4;

        switch (this.alignText) {
            case this.ALIGN_TEXT.Left:
                ctx.textAlign = "left";
                ctx.fillStyle = this.fontBackgroundColor;
                ctx.fillText(LANG[this.label], this.x + 5, this.y + this.textOffsetY + 1);
                ctx.fillStyle = this.fontMainColor;
                ctx.fillText(LANG[this.label], this.x + 5, this.y + this.textOffsetY);
                break;
            case this.ALIGN_TEXT.Center:
                ctx.textAlign = "center";
                ctx.fillText(LANG[this.label].toUpperCase(), this.x + this.textOffsetX + (this.width * 0.5) + 0.5, this.y + this.textOffsetY); // +0.5 Car en centrant le texte se retrouve entre deux pixels
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