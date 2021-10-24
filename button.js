class Button {

    static list = [];
    static currentList = [];
    static STATE = Object.freeze({
        Normal: 0,
        Hover: 1,
        Inactive: 2,
    });

    constructor(pSize, pX, pY, pParent, pCallback, pType = "normal", pTypeState = null, pLabel = "", pId = 0, pStaticSize = false) {

        this.offX = pX;
        this.offY = pY;

        this.width = pSize.w;
        this.height = pSize.h;
        this.corner = pSize.v;

        this.parent = pParent;

        if (this.parent) {
            this.parent.setChild(this);
            this.x = this.parent.x + this.offX;
            this.y = this.parent.y + this.offY;
        } else {
            this.x = pX;
            this.y = pY;
        }

        this.id = pId;

        this.alpha = 1;

        this.startPos = { x: pX, y: pY };
        this.destination = { x: 0, y: 0 };
        this.direction = 1;
        this.bMoving = false;
        this.bCanMove = false;
        this.speedCount = 0;
        this.movingSpeed = 1;

        this.type = pType;
        this.staticSize = pStaticSize;

        if (!this.staticSize) {
            pSize = { corner: { w: pSize.v, h: pSize.v }, t: { w: 1, h: pSize.v }, r: { w: pSize.v, h: 1 }, b: { w: 1, h: pSize.v }, l: { w: pSize.v, h: 1 }, c: { w: 1, h: 1 } };
            this.internWidth = this.width - pSize.corner.w;
            this.internHeight = this.height - pSize.corner.h;

            this.sp = {
                tl: new Sprite({ w: pSize.corner.w, h: pSize.corner.h }, 0, 0, this, this.type),
                tr: new Sprite({ w: pSize.corner.w, h: pSize.corner.h }, 0 + this.internWidth, 0, this, this.type),
                bl: new Sprite({ w: pSize.corner.w, h: pSize.corner.h }, 0, 0 + this.internHeight, this, this.type),
                br: new Sprite({ w: pSize.corner.w, h: pSize.corner.h }, 0 + this.internWidth, 0 + this.internHeight, this, this.type),
                t: new Sprite({ w: pSize.t.w, h: pSize.t.h }, 0 + pSize.corner.w, 0, this, this.type, { x: this.internWidth - pSize.corner.w, y: 1 }),
                r: new Sprite({ w: pSize.r.w, h: pSize.r.h }, 0 + this.internWidth, 0 + pSize.corner.h, this, this.type, { x: 1, y: this.internHeight - pSize.corner.h }),
                b: new Sprite({ w: pSize.b.w, h: pSize.b.h }, 0 + pSize.corner.w, 0 + this.internHeight, this, this.type, { x: this.internWidth - pSize.corner.w, y: 1 }),
                l: new Sprite({ w: pSize.l.w, h: pSize.l.h }, 0, 0 + pSize.corner.h, this, this.type, { x: 1, y: this.internHeight - pSize.corner.h }),
                c: new Sprite({ w: pSize.c.w, h: pSize.c.h }, 0 + pSize.corner.w, 0 + pSize.corner.h, this, this.type, { x: this.internWidth - pSize.corner.w, y: this.internHeight - pSize.corner.h }),
                class: 9,
                parent: this,
                delete: false
            }
            this.setButtonSprites(pId, pSize.corner.w);
        } else {
            this.sp = new Sprite(pSize, 0, 0, this, this.type);
            this.sp.setClass("button");
        }

        this.boxCollider = null;

        this.state = Button.STATE.Normal;
        this.font = "jpfont";
        this.fontSize = 10;
        this.fontMainColor = "rgba(0,0,0," + this.alpha + ")";
        this.fontBackgroundColor = "rgba(100,100,100," + this.alpha + ")";
        this.hoverFontMainColor = "rgba(255,255,255" + this.alpha + ")";
        this.hoverBackgroundColor = "rgba(100,100,100," + this.alpha + ")"; // boutons rouge :  142 45 45

        this.typeState = pTypeState;

        this.label = pLabel;

        this.callback = pCallback;
        this.hoverCB = null;

        this.bToDelete = false;

        this.ALIGN_TEXT = Object.freeze({
            Left: 0,
            Center: 1,
            Right: 2
        });
        this.alignText = this.ALIGN_TEXT.Center;
        this.textOffsetX = 0;
        this.textOffsetY = 13;
        this.textOffsetXOrigin = this.textOffsetX;
        this.textOffsetYOrigin = this.textOffsetY;
        this.bTextOffsetChanged = false;

        this.tooltip = [];
        this.hoverOffset = null;

        Button.list.push(this);
    }

    setWidthForDynamicButtons(pOriginWidth) {
        for (const s in this.sp) {
            if (this.sp[s] instanceof Sprite) {
                this.sp[s].originWidth = pOriginWidth;
            }
        }
    }

    setButtonSprites(pId, pSize) {

        let x_l = 0;
        let y_t = 0;

        switch (pId) {
            case 0:  //? Gris classique
                x_l = 0;
                y_t = 48;
                break;
            case 1:  //? Gris avec ombre
                x_l = 50;
                y_t = 14;
                break;
            case 11: //? Essai pour button avec animation
                // x_l = 0;
                // y_t = 48;

                this.setWidthForDynamicButtons(11);

                this.sp.tl.addAnimation("normal", { x: 114, y: 0 }, 4);
                this.sp.tl.addAnimation("hover", { x: 114, y: 11 }, 4);
                this.sp.tl.addAnimation("down", { x: 114, y: 22 }, 4);
                this.sp.tl.changeAnimation("normal");

                this.sp.tr.addAnimation("normal", { x: 120, y: 0 }, 4);
                this.sp.tr.addAnimation("hover", { x: 120, y: 11 }, 4);
                this.sp.tr.addAnimation("down", { x: 120, y: 22 }, 4);
                this.sp.tr.changeAnimation("normal");

                this.sp.bl.addAnimation("normal", { x: 114, y: 6 }, 4);
                this.sp.bl.addAnimation("hover", { x: 114, y: 17 }, 4);
                this.sp.bl.addAnimation("down", { x: 114, y: 28 }, 4);
                this.sp.bl.changeAnimation("normal");

                this.sp.br.addAnimation("normal", { x: 120, y: 6 }, 4);
                this.sp.br.addAnimation("hover", { x: 120, y: 17 }, 4);
                this.sp.br.addAnimation("down", { x: 120, y: 28 }, 4);
                this.sp.br.changeAnimation("normal");

                this.sp.t.addAnimation("normal", { x: 119, y: 0 }, 4);
                this.sp.t.addAnimation("hover", { x: 119, y: 11 }, 4);
                this.sp.t.addAnimation("down", { x: 119, y: 22 }, 4);
                this.sp.t.changeAnimation("normal");

                this.sp.r.addAnimation("normal", { x: 120, y: 5 }, 4);
                this.sp.r.addAnimation("hover", { x: 120, y: 16 }, 4);
                this.sp.r.addAnimation("down", { x: 120, y: 27 }, 4);
                this.sp.r.changeAnimation("normal");

                this.sp.b.addAnimation("normal", { x: 119, y: 6 }, 4);
                this.sp.b.addAnimation("hover", { x: 119, y: 17 }, 4);
                this.sp.b.addAnimation("down", { x: 119, y: 28 }, 4);
                this.sp.b.changeAnimation("normal");

                this.sp.l.addAnimation("normal", { x: 114, y: 5 }, 4);
                this.sp.l.addAnimation("hover", { x: 114, y: 16 }, 4);
                this.sp.l.addAnimation("down", { x: 114, y: 27 }, 4);
                this.sp.l.changeAnimation("normal");

                this.sp.c.addAnimation("normal", { x: 119, y: 5 }, 4);
                this.sp.c.addAnimation("hover", { x: 119, y: 16 }, 4);
                this.sp.c.addAnimation("down", { x: 119, y: 27 }, 4);
                this.sp.c.changeAnimation("normal");
                break;
            case 3: //? ancien onglet lessons-screen
                x_l = 28;
                y_t = 49;
                break;
            case 4: //? MainMenu 
                x_l = 28;
                y_t = 56;
                break;
            case 41: //? Comme MainMenu mais ombre 1px only
                x_l = 56;
                y_t = 43;
                break;
        }

        let x_c = x_l + pSize;
        let x_r = x_c + 1;
        let x_l_h = x_l + (pSize * 2) + 1;
        let x_c_h = x_l_h + pSize;
        let x_r_h = x_c_h + 1;
        let x_l_d = x_l_h + (pSize * 2) + 1;
        let x_c_d = x_l_d + pSize;
        let x_r_d = x_c_d + 1;
        let y_c = y_t + pSize;
        let y_b = y_c + 1;

        this.sp.tl.addAnimation("normal", { x: x_l, y: y_t });
        this.sp.tl.addAnimation("hover", { x: x_l_h, y: y_t });
        this.sp.tl.addAnimation("down", { x: x_l_d, y: y_t });
        this.sp.tl.changeAnimation("normal");

        this.sp.tr.addAnimation("normal", { x: x_r, y: y_t });
        this.sp.tr.addAnimation("hover", { x: x_r_h, y: y_t });
        this.sp.tr.addAnimation("down", { x: x_r_d, y: y_t });
        this.sp.tr.changeAnimation("normal");

        this.sp.bl.addAnimation("normal", { x: x_l, y: y_b });
        this.sp.bl.addAnimation("hover", { x: x_l_h, y: y_b });
        this.sp.bl.addAnimation("down", { x: x_l_d, y: y_b });
        this.sp.bl.changeAnimation("normal");

        this.sp.br.addAnimation("normal", { x: x_r, y: y_b });
        this.sp.br.addAnimation("hover", { x: x_r_h, y: y_b });
        this.sp.br.addAnimation("down", { x: x_r_d, y: y_b });
        this.sp.br.changeAnimation("normal");

        this.sp.t.addAnimation("normal", { x: x_c, y: y_t });
        this.sp.t.addAnimation("hover", { x: x_c_h, y: y_t });
        this.sp.t.addAnimation("down", { x: x_c_d, y: y_t });
        this.sp.t.changeAnimation("normal");

        this.sp.r.addAnimation("normal", { x: x_r, y: y_c });
        this.sp.r.addAnimation("hover", { x: x_r_h, y: y_c });
        this.sp.r.addAnimation("down", { x: x_r_d, y: y_c });
        this.sp.r.changeAnimation("normal");

        this.sp.b.addAnimation("normal", { x: x_c, y: y_b });
        this.sp.b.addAnimation("hover", { x: x_c_h, y: y_b });
        this.sp.b.addAnimation("down", { x: x_c_d, y: y_b });
        this.sp.b.changeAnimation("normal");

        this.sp.l.addAnimation("normal", { x: x_l, y: y_c });
        this.sp.l.addAnimation("hover", { x: x_l_h, y: y_c });
        this.sp.l.addAnimation("down", { x: x_l_d, y: y_c });
        this.sp.l.changeAnimation("normal");

        this.sp.c.addAnimation("normal", { x: x_c, y: y_c });
        this.sp.c.addAnimation("hover", { x: x_c_h, y: y_c });
        this.sp.c.addAnimation("down", { x: x_c_d, y: y_c });
        this.sp.c.changeAnimation("normal");
    }

    static resetTypeState(pType, pTypeState, pTypeState2 = -1) {
        Button.currentList = Button.list.filter(b => {
            return (b.type == pType && b.typeState == pTypeState) || b.type == pType && b.typeState == pTypeState2;
        });
    }

    resetAnimations(pId) {
        if (!this.staticSize) {
            for (const s in this.sp) {
                if (this.sp[s] instanceof Sprite) {
                    this.sp[s].animation = [];
                }
            }
            this.setButtonSprites(pId);
        }
    }

    getSprite() {
        return this.sp;
    }

    getPosition() {
        if (this.boxCollider) {
            return { x: this.x + this.boxCollider.offX, y: this.y + this.boxCollider.offY };
        } else {
            return { x: this.x, y: this.y };
        }
    }

    getSize() {
        if (this.boxCollider) {
            return { w: this.boxCollider.w, h: this.boxCollider.h };
        } else {
            return { w: this.width, h: this.height };
        }
    }

    getTooltip() {
        return this.tooltip;
    }

    setTooltip(pTooltip) {
        this.tooltip.push(pTooltip);
    }

    setBoxCollider(pW, pH, pX = 0, pY = 0) {
        this.boxCollider = {
            w: pW,
            h: pH,
            offX: pX,
            offY: pY
        }
    }

    getHoverOffset() {
        return this.hoverOffset;
    }

    setHoverOffset(pOffset) {
        this.hoverOffset = { ...pOffset };
    }

    setDestination(pDestination) {
        this.destination = {
            x: pDestination.x,
            y: pDestination.y
        };
    }

    setDirection(pDirection) {
        this.direction = pDirection;
    }

    resetPosition() {
        this.x = this.startPos.x;
        this.y = this.startPos.y;
    }

    setCanMove(pBool) {
        this.bCanMove = pBool;
    }

    setMoving(pBool) {
        if (this.bCanMove) {
            this.bMoving = pBool;
        }
    }

    setMovingSpeed(pValue) {
        this.movingSpeed = pValue;
    }

    setToDelete() {
        this.bToDelete = true;
    }

    removeFromList() {
        Button.list = Button.list.filter(b => {
            return b != this;
        });
    }

    removeFromCurrentList() {
        Button.currentList = Button.currentList.filter(b => {
            return b != this;
        });
    }

    getState() {
        return this.state;
    }

    setState(newState) {
        this.state = newState;
    }

    setAlignText(pAlign) {
        this.alignText = pAlign;
    }

    setOffsets(pX = 0, pY = 13) {
        this.textOffsetX = pX;
        this.textOffsetY = pY;
        this.textOffsetXOrigin = pX;
        this.textOffsetYOrigin = pY;
    }

    resetOffsets() {
        this.bTextOffsetChanged = false;
        this.textOffsetX = this.textOffsetXOrigin;
        this.textOffsetY = this.textOffsetYOrigin;
    }

    setLabel(pNewLabel) {
        this.label = pNewLabel;
    }

    setTextCenterY() {
        this.textOffsetY = Math.floor(this.height * 0.5) + 2;
    }


    setFont(pFont) {
        this.font = pFont;
    }

    setFontSize(pSize) {
        this.fontSize = pSize;
    }

    setFontColor(pBack = "rgba(100,100,100," + this.alpha + ")", pMain = "rgb(0,0,0," + this.alpha + ")", pHoverBack = "rgba(100,100,100," + this.alpha + ")", pHoverMain = "rgba(255,255,255," + this.alpha + ")") {
        this.fontMainColor = pMain;
        this.fontBackgroundColor = pBack;
        this.hoverBackgroundColor = pHoverBack;
        this.hoverFontMainColor = pHoverMain;
    }

    setCallbackArg(pArg) {
        this.callback.arg = pArg;
    }

    setHoverCB(pCallback, pParam) {
        this.hoverCB = {
            cb: pCallback,
            arg: pParam
        }
    }

    setTextCase(pCase) {
        switch (pCase) {
            case "first":
                LANG[this.label] = firstUC(LANG[this.label]);
                break;
            case "all":
                LANG[this.label] = LANG[this.label].toUpperCase();
                break;
            case "normal":
                LANG[this.label] = LANG[this.label].toLowerCase();
                break;
        }
    }

    changeSpriteAnimation(pName) {
        if (!this.staticSize) {
            for (const sp in this.getSprite()) {
                if (this.getSprite()[sp] instanceof Sprite) {
                    this.getSprite()[sp].changeAnimation(pName);
                }
            }
        } else {
            this.getSprite().changeAnimation(pName);
        }
    }

    update(dt) {
        if (this.speedCount <= this.movingSpeed) {

            this.x = easeOutSin(this.speedCount, this.startPos.x, this.destination.x - this.startPos.x, this.movingSpeed);
            this.y = easeOutSin(this.speedCount, this.startPos.y, this.destination.y - this.startPos.y, this.movingSpeed);

            this.speedCount += dt;
        } else {
            this.x = this.destination.x;
            this.y = this.destination.y;
            this.bMoving = false;
            this.speedCount = 0;
            if (this.label == "Credits") {
                TRANSITION = false;
            }
        }
    }

    updatePosition() {
        this.x = this.parent.x + this.offX;
        this.y = this.parent.y + this.offY;
    }

    setAlpha(pNewValue) {
        this.alpha = pNewValue;
        this.fontMainColor = this.fontMainColor.split(",");
        this.fontMainColor = this.fontMainColor[0] + "," + this.fontMainColor[1] + "," + this.fontMainColor[2] + "," + this.alpha + ")";
        this.fontBackgroundColor = this.fontBackgroundColor.split(",");
        this.fontBackgroundColor = this.fontBackgroundColor[0] + "," + this.fontBackgroundColor[1] + "," + this.fontBackgroundColor[2] + "," + this.alpha + ")";
    }

    updateAlpha(pNewValue = 0) {
        if (this.parent) {
            this.alpha = this.parent.alpha;
        } else {
            this.alpha += pNewValue;
        }
        this.fontMainColor = this.fontMainColor.split(",");
        this.fontMainColor = this.fontMainColor[0] + "," + this.fontMainColor[1] + "," + this.fontMainColor[2] + "," + this.alpha + ")";
        this.fontBackgroundColor = this.fontBackgroundColor.split(",");
        this.fontBackgroundColor = this.fontBackgroundColor[0] + "," + this.fontBackgroundColor[1] + "," + this.fontBackgroundColor[2] + "," + this.alpha + ")";
    }

    static draw() {
        Button.currentList.forEach(b => {
            if (b.state == Button.STATE.Hover && b.hoverCB) {
                b.hoverCB.cb(b.hoverCB.arg);
            }
            if (!b.staticSize) {
                for (const sp in b.getSprite()) {
                    b.getSprite()[sp].draw(ctx);
                }
            } else {
                b.getSprite().draw(ctx);
            }
            if (b.label != "") {
                b.drawLabel(ctx);
            }
            if (b.state == Button.STATE.Hover && b.hoverCB) {
                b.hoverCB.cb(b.hoverCB.arg);
            }
        });
    }

    drawLabel(ctx) {

        if (this.parent && this.parent.bFading) {
            this.updateAlpha();
        }

        if (this.state == Button.STATE.Hover) {
            ctx.fillStyle = this.hoverFontMainColor;
            ctx.shadowColor = this.hoverBackgroundColor;
        } else {
            ctx.fillStyle = this.fontMainColor;
            ctx.shadowColor = this.fontBackgroundColor;
        }

        ctx.font = this.fontSize + "px " + this.font;
        ctx.shadowOffsetY = 2;

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
        ctx.fillStyle = "rgba(0,0,0,1)";
        ctx.textAlign = "left";
    }
}