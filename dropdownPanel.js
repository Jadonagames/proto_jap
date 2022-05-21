class DropdownPanel extends Panel {
    constructor(pSize, pX, pY, pParent, pType = "normal", pTypeState = null, pLabel = "", pId = 0, pStaticSize = false) {
        super(pSize, pX, pY, pParent, pType, pTypeState, pLabel, pId, pStaticSize);

        this.bScrollable = true;
        this.list = pLabel;
        this.currentPos = 0;

        this.maxScale = 0;
        this.cursorStartPos = 0;
        this.cursorContainer = null;
        this.cursor = null;
        this.cursorUp = null;
        this.cursorDown = null;
        this.limit = 0;
        this.hoverable = true;
        this.bOverflow = false;
        this.linesNumber = 8;
        this.textOffsetY = 14;
        this.spriteList = [];

    }

    setParameters() {

        if (this.list.length > this.linesNumber) {

            this.width = this.totalWidth;
            this.height = this.totalHeight;

            let cursorWidth = 3;
            let cursorUpDownHeight = 2;
            let cursorPosOffset = 4; //? décallage entre la position de cursorUp/Down par rapport au dropdown panel
            let cursorPosHorizontalOffset = 6; //? décallage entre la position de cursorUp/Down par rapport au dropdown panel
            let cursorContainerWidth = 3;
            let cursorContainerHeight = this.height - 8; //? -2 si on veut un espace d'1px entre le haut/bas du panel et le cursorContainer
            this.bOverflow = true;
            this.cursorStartPos = this.parent.y + this.offY + cursorPosOffset + cursorUpDownHeight;

            this.cursorContainer = new Sprite({ w: 1, h: 1 }, this.offX + this.width - cursorContainerWidth - cursorPosHorizontalOffset, this.offY + cursorPosOffset + cursorUpDownHeight, this.parent, "", { x: cursorContainerWidth, y: cursorContainerHeight - cursorUpDownHeight * 2 });
            this.cursorContainer.addAnimation("normal", { x: 642, y: 780 });
            this.cursorContainer.changeAnimation("normal");

            //?if > 8 ==> list length - 8  ==> ici 46 - 8 ==> 38 steps pour arriver à la fin, 
            //! this.cursorContainer.scaleY - (this.list.length - this.linesNumber)
            this.maxScale = this.cursorContainer.scaleY - (this.list.length - this.linesNumber);

            this.cursorContainerUp = new Sprite({ w: cursorContainerWidth, h: cursorUpDownHeight }, this.offX + this.width - cursorContainerWidth - cursorPosHorizontalOffset, this.cursorContainer.offY - cursorUpDownHeight, this.parent);
            this.cursorContainerUp.addAnimation("normal", { x: 642, y: 778 });
            this.cursorContainerUp.changeAnimation("normal");

            this.cursorContainerDown = new Sprite({ w: cursorContainerWidth, h: cursorUpDownHeight }, this.offX + this.width - cursorContainerWidth - cursorPosHorizontalOffset, this.cursorContainer.offY + this.cursorContainer.scaleY, this.parent);
            this.cursorContainerDown.addAnimation("normal", { x: 642, y: 781 });
            this.cursorContainerDown.changeAnimation("normal");


            this.cursor = new Sprite({ w: cursorWidth, h: 1 }, this.cursorContainer.x, this.offY + cursorPosOffset + cursorUpDownHeight, this.parent, "", { x: 1, y: this.maxScale }); //? 1-92 max pour le scale
            this.cursor.addAnimation("normal", { x: 646, y: 780 });
            this.cursor.changeAnimation("normal");

            this.cursorUp = new Sprite({ w: cursorWidth, h: cursorUpDownHeight }, this.cursorContainer.x, this.cursor.y - cursorUpDownHeight, this.parent);
            this.cursorUp.addAnimation("normal", { x: 646, y: 778 });
            this.cursorUp.changeAnimation("normal");

            this.cursorDown = new Sprite({ w: cursorWidth, h: cursorUpDownHeight }, this.cursorContainer.x, this.cursor.y + this.cursor.scaleY, this.parent);
            this.cursorDown.addAnimation("normal", { x: 646, y: 781 });
            this.cursorDown.changeAnimation("normal");
            this.limit = this.parent.y + this.cursorContainer.y + this.cursorContainer.height;

            this.spriteList.push(this.cursorContainer);
            this.spriteList.push(this.cursorContainerUp);
            this.spriteList.push(this.cursorContainerDown);
            this.spriteList.push(this.cursor);
            this.spriteList.push(this.cursorUp);
            this.spriteList.push(this.cursorDown);
        }

    }

    setLinesNumber(pValue) {
        this.linesNumber = pValue;
    }

    setList(pArray) {
        this.list = pArray;
    }

    setStartY(pValue) {
        this.startY = pValue;
    }

    deleteSprites() {
        if (this.list.length > this.linesNumber) {
            this.cursorContainer.delete = true;
            this.cursorContainerUp.delete = true;
            this.cursorContainerDown.delete = true;
            this.cursor.delete = true;
            this.cursorUp.delete = true;
            this.cursorDown.delete = true;

            this.cursorContainer = null;
            this.cursorContainerUp = null;
            this.cursorContainerDown = null;
            this.cursor = null;
            this.cursorUp = null;
            this.cursorDown = null;
            this.spriteList = [];
        }

        this.getSprite().delete = true;
    }

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

        if (this.state == Panel.STATE.Hover) {
            ctx.fillStyle = this.hoverFontMainColor;
            ctx.shadowColor = this.hoverBackgroundColor;
        }

        let labelListOffsetY = 0;

        switch (this.alignText) {
            case this.ALIGN_TEXT.Left:
                ctx.textAlign = "left";
                for (let i = this.currentPos; i < this.currentPos + 8; i++) {
                    if (this.list[i] != undefined) {
                        ctx.fillText(this.list[i], this.x + this.textOffsetX, this.y + this.textOffsetY + labelListOffsetY);
                        labelListOffsetY += 12;
                    }
                }
                break;
            case this.ALIGN_TEXT.Center:
                ctx.textAlign = "center";
                for (let i = this.currentPos; i < this.currentPos + 8; i++) {
                    if (this.list[i] != undefined) {
                        ctx.fillText(this.list[i], this.x + (this.width * 0.5), this.y + this.textOffsetY + labelListOffsetY);
                        labelListOffsetY += 12;
                    }
                }
                break;
            case this.ALIGN_TEXT.Right:
                ctx.textAlign = "right";
                for (let i = this.currentPos; i < this.currentPos + 8; i++) {
                    if (this.list[i] != undefined) {
                        ctx.fillText(this.list[i], this.x + this.width - this.textOffsetX, this.y + this.textOffsetY + labelListOffsetY);
                        labelListOffsetY += 12;
                    }
                }
                break;
        }

        ctx.shadowOffsetY = 0;
        ctx.fillStyle = BLACK_COLOR;
        ctx.textAlign = "left";
    }

}