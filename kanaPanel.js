class KanaPanel extends Panel {
    constructor(pSize, pX, pY, pParent, pType = "normal", pTypeState = null, pLabel = "", pId = 0, pStaticSize = false) {
        super(pSize, pX, pY, pParent, pType, pTypeState, pLabel, pId, pStaticSize);
    }

    //TODO
    //! drawlabel avec uppercase !!!
    drawLabel(ctx) {

        ctx.font = this.fontSize + "px " + this.font;
        if (this.fontSize == 32) {
            ctx.shadowOffsetY = 4;
        } else {
            ctx.shadowOffsetY = 2;
        }

        if (this.parent && this.parent.bFading) {
            this.updateAlpha();
        }

        ctx.fillStyle = this.fontMainColor;
        ctx.shadowColor = this.fontBackgroundColor;

        if (this.hoverable) {
            if (this.state == Panel.STATE.Hover) {
                ctx.fillStyle = this.hoverFontMainColor;
                ctx.shadowColor = this.hoverBackgroundColor;
            }
        }

        if (!this.textOverflow) {

            for (let i = 0; i < this.lines.length; i++) {
                switch (this.alignText) {
                    case this.ALIGN_TEXT.Left:
                        ctx.textAlign = "left";
                        if (this.bNumber) {
                        } else {
                            ctx.fillText(this.lines[i], this.x + this.textOffsetX, this.y + this.textOffsetY);
                        }
                        break;
                    case this.ALIGN_TEXT.Center:
                        ctx.textAlign = "center";
                        if (this.bNumber) {
                            ctx.fillText(this.lines[i], this.x + (this.totalWidth * 0.5), this.y + this.textOffsetY);
                        } else {
                            ctx.fillText(this.lines[i], this.x + (this.totalWidth * 0.5), this.y + this.textOffsetY);
                        }
                        break;
                    case this.ALIGN_TEXT.Right:
                        ctx.textAlign = "right";
                        ctx.fillText(this.lines[i], this.x + this.width - this.textOffsetX, this.y + this.textOffsetY);
                        break;
                }
                this.textOffsetY += this.textLinesOffsetY;
            }
            this.textOffsetY = this.textOffsetYOrigin;


        } else {
            switch (this.alignText) {
                case this.ALIGN_TEXT.Left:
                    ctx.textAlign = "left";
                    ctx.fillText(LANG[this.label], this.x + this.textOffsetX, this.y + this.textOffsetY);
                    break;
                case this.ALIGN_TEXT.Center:

                    ctx.textAlign = "center";
                    if (Array.isArray(this.id)) {
                        ctx.fillText(LANG[this.label], this.x + (this.totalWidth * 0.5), this.y + this.textOffsetY);
                    } else {
                        if (this.bNumber) {
                            ctx.fillText(this.label.toUpperCase(), this.x + (this.width * 0.5), this.y + this.textOffsetY);
                        } else {
                            ctx.fillText(LANG[this.label].toUpperCase(), this.x + (this.width * 0.5), this.y + this.textOffsetY); // +0.5 Car en centrant le texte se retrouve entre deux pixels
                        }
                    }
                    break;
                case this.ALIGN_TEXT.Right:
                    ctx.textAlign = "right";
                    ctx.fillText(LANG[this.label], this.x + this.width - this.textOffsetX, this.y + this.textOffsetY);
                    break;
            }
        }


        ctx.shadowOffsetY = 0;

        ctx.fillStyle = BLACK_COLOR;

        ctx.textAlign = "left";
    }


}