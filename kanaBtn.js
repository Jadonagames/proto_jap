class KanaBtn extends Button {
    constructor(pSize, pX, pY, pCallback, pType = "normal", pTypeState = null, pLabel = "", pId = 0, pStaticSize = false) {
        super(pSize, pX, pY, pCallback, pType, pTypeState, pLabel, pId, pStaticSize);
    }

    drawLabel(ctx) {

        if (this.state == Button.STATE.Hover) {
            this.fontMainColor = "rgb(255,0,0)";
            ctx.fillStyle = this.fontMainColor;
        } else {
            this.fontMainColor = "rgb(0,0,0)";
            ctx.fillStyle = this.fontMainColor;
        }

        ctx.font = this.fontSize + "px " + this.font;

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
                ctx.fillStyle = this.fontBackgroundColor;
                ctx.fillText(LANG[this.label].toUpperCase(), this.x + (this.width * 0.5) + 0.5, this.y + this.textOffsetY + 1);
                ctx.fillStyle = this.fontMainColor;
                ctx.fillText(LANG[this.label].toUpperCase(), this.x + (this.width * 0.5) + 0.5, this.y + this.textOffsetY); // +0.5 Car en centrant le texte se retrouve entre deux pixels
                break;
            case this.ALIGN_TEXT.Right:
                ctx.textAlign = "right";
                ctx.fillText(LANG[this.label], this.x + this.width - 5, this.y + this.textOffsetY);
                break;
        }

        ctx.fillStyle = "rgb(0,0,0)";

        ctx.textAlign = "left";
    }
}