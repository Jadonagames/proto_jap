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

        this.parent = pParent;

        if (this.parent) {
            this.parent.setChild(this);
            this.x = this.parent.x + this.offX;
            this.y = this.parent.y + this.offY;
        } else {
            this.x = pX;
            this.y = pY;
        }

        this.alpha = 1;

        this.type = pType;
        this.staticSize = pStaticSize;

        if (!this.staticSize) {
            pSize = { vertices: { w: pSize.v, h: pSize.v }, t: { w: 1, h: pSize.v }, r: { w: pSize.v, h: 1 }, b: { w: 1, h: pSize.v }, l: { w: pSize.v, h: 1 }, c: { w: 1, h: 1 } };
            this.internWidth = this.width - pSize.vertices.w;
            this.internHeight = this.height - pSize.vertices.h;

            this.sp = {
                tl: new Sprite({ w: pSize.vertices.w, h: pSize.vertices.h }, 0, 0, this, this.type),
                tr: new Sprite({ w: pSize.vertices.w, h: pSize.vertices.h }, 0 + this.internWidth, 0, this, this.type),
                bl: new Sprite({ w: pSize.vertices.w, h: pSize.vertices.h }, 0, 0 + this.internHeight, this, this.type),
                br: new Sprite({ w: pSize.vertices.w, h: pSize.vertices.h }, 0 + this.internWidth, 0 + this.internHeight, this, this.type),
                t: new Sprite({ w: pSize.t.w, h: pSize.t.h }, 0 + pSize.vertices.w, 0, this, this.type, { x: this.internWidth - pSize.vertices.w, y: 1 }),
                r: new Sprite({ w: pSize.r.w, h: pSize.r.h }, 0 + this.internWidth, 0 + pSize.vertices.h, this, this.type, { x: 1, y: this.internHeight - pSize.vertices.h }),
                b: new Sprite({ w: pSize.b.w, h: pSize.b.h }, 0 + pSize.vertices.w, 0 + this.internHeight, this, this.type, { x: this.internWidth - pSize.vertices.w, y: 1 }),
                l: new Sprite({ w: pSize.l.w, h: pSize.l.h }, 0, 0 + pSize.vertices.h, this, this.type, { x: 1, y: this.internHeight - pSize.vertices.h }),
                c: new Sprite({ w: pSize.c.w, h: pSize.c.h }, 0 + pSize.vertices.w, 0 + pSize.vertices.h, this, this.type, { x: this.internWidth - pSize.vertices.w, y: this.internHeight - pSize.vertices.h }),
                class: 9,
                parent: this,
                delete: false
            }
            this.setButtonSprites(pId);
        } else {
            this.sp = new Sprite(pSize, 0, 0, this, this.type);
            this.sp.setClass("button");
        }


        this.state = Button.STATE.Normal;
        this.font = "jpfont";
        this.fontSize = 10;
        this.fontMainColor = "rgba(0,0,0," + this.alpha + ")";
        this.fontBackgroundColor = "rgba(100,100,100," + this.alpha + ")";

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
        this.textOffsetX = 5;
        this.textOffsetY = 13;
        this.textOffsetYOrigin = this.textOffsetY;

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

    setButtonSprites(pId) {

        if (pId == 0) {
            this.sp.tl.addAnimation("normal", 1, { x: 0, y: 48 }, 0.1);
            this.sp.tl.addAnimation("hover", 1, { x: 9, y: 48 }, 0.1);
            this.sp.tl.addAnimation("down", 1, { x: 18, y: 48 }, 0.1);
            this.sp.tl.addAnimation("inactive", 1, { x: 35, y: 39 }, 0.1);
            this.sp.tl.changeAnimation("normal");

            this.sp.tr.addAnimation("normal", 1, { x: 5, y: 48 }, 0.1);
            this.sp.tr.addAnimation("hover", 1, { x: 14, y: 48 }, 0.1);
            this.sp.tr.addAnimation("down", 1, { x: 23, y: 48 }, 0.1);
            this.sp.tr.addAnimation("inactive", 1, { x: 40, y: 39 }, 0.1);
            this.sp.tr.changeAnimation("normal");

            this.sp.bl.addAnimation("normal", 1, { x: 0, y: 53 }, 0.1);
            this.sp.bl.addAnimation("hover", 1, { x: 9, y: 53 }, 0.1);
            this.sp.bl.addAnimation("down", 1, { x: 18, y: 53 }, 0.1);
            this.sp.bl.addAnimation("inactive", 1, { x: 35, y: 44 }, 0.1);
            this.sp.bl.changeAnimation("normal");

            this.sp.br.addAnimation("normal", 1, { x: 5, y: 53 }, 0.1);
            this.sp.br.addAnimation("hover", 1, { x: 14, y: 53 }, 0.1);
            this.sp.br.addAnimation("down", 1, { x: 23, y: 53 }, 0.1);
            this.sp.br.addAnimation("inactive", 1, { x: 40, y: 44 }, 0.1);
            this.sp.br.changeAnimation("normal");

            this.sp.t.addAnimation("normal", 1, { x: 4, y: 48 }, 0.1);
            this.sp.t.addAnimation("hover", 1, { x: 13, y: 48 }, 0.1);
            this.sp.t.addAnimation("down", 1, { x: 22, y: 48 }, 0.1);
            this.sp.t.addAnimation("inactive", 1, { x: 39, y: 39 }, 0.1);
            this.sp.t.changeAnimation("normal");

            this.sp.r.addAnimation("normal", 1, { x: 5, y: 52 }, 0.1);
            this.sp.r.addAnimation("hover", 1, { x: 14, y: 52 }, 0.1);
            this.sp.r.addAnimation("down", 1, { x: 23, y: 52 }, 0.1);
            this.sp.r.addAnimation("inactive", 1, { x: 40, y: 43 }, 0.1);
            this.sp.r.changeAnimation("normal");

            this.sp.b.addAnimation("normal", 1, { x: 4, y: 53 }, 0.1);
            this.sp.b.addAnimation("hover", 1, { x: 13, y: 53 }, 0.1);
            this.sp.b.addAnimation("down", 1, { x: 22, y: 53 }, 0.1);
            this.sp.b.addAnimation("inactive", 1, { x: 39, y: 44 }, 0.1);
            this.sp.b.changeAnimation("normal");

            this.sp.l.addAnimation("normal", 1, { x: 0, y: 52 }, 0.1);
            this.sp.l.addAnimation("hover", 1, { x: 9, y: 52 }, 0.1);
            this.sp.l.addAnimation("down", 1, { x: 18, y: 52 }, 0.1);
            this.sp.l.addAnimation("inactive", 1, { x: 35, y: 43 }, 0.1);
            this.sp.l.changeAnimation("normal");

            this.sp.c.addAnimation("normal", 1, { x: 4, y: 52 }, 0.1);
            this.sp.c.addAnimation("hover", 1, { x: 13, y: 52 }, 0.1);
            this.sp.c.addAnimation("down", 1, { x: 22, y: 52 }, 0.1);
            this.sp.c.addAnimation("inactive", 1, { x: 39, y: 43 }, 0.1);
            this.sp.c.changeAnimation("normal");
        }
        if (pId == 1) {
            this.sp.tl.addAnimation("normal", 1, { x: 50, y: 14 }, 0.1);
            this.sp.tl.addAnimation("hover", 1, { x: 61, y: 14 }, 0.1);
            this.sp.tl.addAnimation("down", 1, { x: 72, y: 14 }, 0.1);
            this.sp.tl.changeAnimation("normal");

            this.sp.tr.addAnimation("normal", 1, { x: 56, y: 14 }, 0.1);
            this.sp.tr.addAnimation("hover", 1, { x: 67, y: 14 }, 0.1);
            this.sp.tr.addAnimation("down", 1, { x: 78, y: 14 }, 0.1);
            this.sp.tr.changeAnimation("normal");

            this.sp.bl.addAnimation("normal", 1, { x: 50, y: 20 }, 0.1);
            this.sp.bl.addAnimation("hover", 1, { x: 61, y: 20 }, 0.1);
            this.sp.bl.addAnimation("down", 1, { x: 72, y: 20 }, 0.1);
            this.sp.bl.changeAnimation("normal");

            this.sp.br.addAnimation("normal", 1, { x: 56, y: 20 }, 0.1);
            this.sp.br.addAnimation("hover", 1, { x: 67, y: 20 }, 0.1);
            this.sp.br.addAnimation("down", 1, { x: 78, y: 20 }, 0.1);
            this.sp.br.changeAnimation("normal");

            this.sp.t.addAnimation("normal", 1, { x: 55, y: 14 }, 0.1);
            this.sp.t.addAnimation("hover", 1, { x: 66, y: 14 }, 0.1);
            this.sp.t.addAnimation("down", 1, { x: 77, y: 14 }, 0.1);
            this.sp.t.changeAnimation("normal");

            this.sp.r.addAnimation("normal", 1, { x: 56, y: 19 }, 0.1);
            this.sp.r.addAnimation("hover", 1, { x: 67, y: 19 }, 0.1);
            this.sp.r.addAnimation("down", 1, { x: 78, y: 19 }, 0.1);
            this.sp.r.changeAnimation("normal");

            this.sp.b.addAnimation("normal", 1, { x: 55, y: 20 }, 0.1);
            this.sp.b.addAnimation("hover", 1, { x: 66, y: 20 }, 0.1);
            this.sp.b.addAnimation("down", 1, { x: 77, y: 20 }, 0.1);
            this.sp.b.changeAnimation("normal");

            this.sp.l.addAnimation("normal", 1, { x: 50, y: 19 }, 0.1);
            this.sp.l.addAnimation("hover", 1, { x: 61, y: 19 }, 0.1);
            this.sp.l.addAnimation("down", 1, { x: 72, y: 19 }, 0.1);
            this.sp.l.changeAnimation("normal");

            this.sp.c.addAnimation("normal", 1, { x: 55, y: 19 }, 0.1);
            this.sp.c.addAnimation("hover", 1, { x: 66, y: 19 }, 0.1);
            this.sp.c.addAnimation("down", 1, { x: 77, y: 19 }, 0.1);
            this.sp.c.changeAnimation("normal");
        }
        if (pId == 11) {
            this.setWidthForDynamicButtons(11);

            this.sp.tl.addAnimation("normal", 4, { x: 114, y: 0 }, 0.1);
            this.sp.tl.addAnimation("hover", 4, { x: 114, y: 11 }, 0.1);
            this.sp.tl.addAnimation("down", 4, { x: 114, y: 22 }, 0.1);
            this.sp.tl.changeAnimation("normal");

            this.sp.tr.addAnimation("normal", 4, { x: 120, y: 0 }, 0.1);
            this.sp.tr.addAnimation("hover", 4, { x: 120, y: 11 }, 0.1);
            this.sp.tr.addAnimation("down", 4, { x: 120, y: 22 }, 0.1);
            this.sp.tr.changeAnimation("normal");

            this.sp.bl.addAnimation("normal", 4, { x: 114, y: 6 }, 0.1);
            this.sp.bl.addAnimation("hover", 4, { x: 114, y: 17 }, 0.1);
            this.sp.bl.addAnimation("down", 4, { x: 114, y: 28 }, 0.1);
            this.sp.bl.changeAnimation("normal");

            this.sp.br.addAnimation("normal", 4, { x: 120, y: 6 }, 0.1);
            this.sp.br.addAnimation("hover", 4, { x: 120, y: 17 }, 0.1);
            this.sp.br.addAnimation("down", 4, { x: 120, y: 28 }, 0.1);
            this.sp.br.changeAnimation("normal");

            this.sp.t.addAnimation("normal", 4, { x: 119, y: 0 }, 0.1);
            this.sp.t.addAnimation("hover", 4, { x: 119, y: 11 }, 0.1);
            this.sp.t.addAnimation("down", 4, { x: 119, y: 22 }, 0.1);
            this.sp.t.changeAnimation("normal");

            this.sp.r.addAnimation("normal", 4, { x: 120, y: 5 }, 0.1);
            this.sp.r.addAnimation("hover", 4, { x: 120, y: 16 }, 0.1);
            this.sp.r.addAnimation("down", 4, { x: 120, y: 27 }, 0.1);
            this.sp.r.changeAnimation("normal");

            this.sp.b.addAnimation("normal", 4, { x: 119, y: 6 }, 0.1);
            this.sp.b.addAnimation("hover", 4, { x: 119, y: 17 }, 0.1);
            this.sp.b.addAnimation("down", 4, { x: 119, y: 28 }, 0.1);
            this.sp.b.changeAnimation("normal");

            this.sp.l.addAnimation("normal", 4, { x: 114, y: 5 }, 0.1);
            this.sp.l.addAnimation("hover", 4, { x: 114, y: 16 }, 0.1);
            this.sp.l.addAnimation("down", 4, { x: 114, y: 27 }, 0.1);
            this.sp.l.changeAnimation("normal");

            this.sp.c.addAnimation("normal", 4, { x: 119, y: 5 }, 0.1);
            this.sp.c.addAnimation("hover", 4, { x: 119, y: 16 }, 0.1);
            this.sp.c.addAnimation("down", 4, { x: 119, y: 27 }, 0.1);
            this.sp.c.changeAnimation("normal");
        }

        if (pId == 2) {
            this.sp.tl.addAnimation("normal", 1, { x: 28, y: 39 }, 0.1);
            this.sp.tl.addAnimation("hover", 1, { x: 28, y: 39 }, 0.1);
            this.sp.tl.addAnimation("down", 1, { x: 28, y: 39 }, 0.1);
            this.sp.tl.changeAnimation("normal");

            this.sp.tr.addAnimation("normal", 1, { x: 32, y: 39 }, 0.1);
            this.sp.tr.addAnimation("hover", 1, { x: 32, y: 39 }, 0.1);
            this.sp.tr.addAnimation("down", 1, { x: 32, y: 39 }, 0.1);
            this.sp.tr.changeAnimation("normal");

            this.sp.bl.addAnimation("normal", 1, { x: 28, y: 43 }, 0.1);
            this.sp.bl.addAnimation("hover", 1, { x: 28, y: 43 }, 0.1);
            this.sp.bl.addAnimation("down", 1, { x: 28, y: 43 }, 0.1);
            this.sp.bl.changeAnimation("normal");

            this.sp.br.addAnimation("normal", 1, { x: 32, y: 43 }, 0.1);
            this.sp.br.addAnimation("hover", 1, { x: 32, y: 43 }, 0.1);
            this.sp.br.addAnimation("down", 1, { x: 32, y: 43 }, 0.1);
            this.sp.br.changeAnimation("normal");

            this.sp.t.addAnimation("normal", 1, { x: 31, y: 39 }, 0.1);
            this.sp.t.addAnimation("hover", 1, { x: 31, y: 39 }, 0.1);
            this.sp.t.addAnimation("down", 1, { x: 31, y: 39 }, 0.1);
            this.sp.t.changeAnimation("normal");

            this.sp.r.addAnimation("normal", 1, { x: 32, y: 42 }, 0.1);
            this.sp.r.addAnimation("hover", 1, { x: 32, y: 42 }, 0.1);
            this.sp.r.addAnimation("down", 1, { x: 32, y: 42 }, 0.1);
            this.sp.r.changeAnimation("normal");

            this.sp.b.addAnimation("normal", 1, { x: 31, y: 43 }, 0.1);
            this.sp.b.addAnimation("hover", 1, { x: 31, y: 43 }, 0.1);
            this.sp.b.addAnimation("down", 1, { x: 31, y: 43 }, 0.1);
            this.sp.b.changeAnimation("normal");

            this.sp.l.addAnimation("normal", 1, { x: 28, y: 42 }, 0.1);
            this.sp.l.addAnimation("hover", 1, { x: 28, y: 42 }, 0.1);
            this.sp.l.addAnimation("down", 1, { x: 28, y: 42 }, 0.1);
            this.sp.l.changeAnimation("normal");

            this.sp.c.addAnimation("normal", 1, { x: 31, y: 42 }, 0.1);
            this.sp.c.addAnimation("hover", 1, { x: 31, y: 42 }, 0.1);
            this.sp.c.addAnimation("down", 1, { x: 31, y: 42 }, 0.1);
            this.sp.c.changeAnimation("normal");
        }

        if (pId == 3) {
            this.sp.tl.addAnimation("normal", 1, { x: 28, y: 49 }, 0.1);
            this.sp.tl.addAnimation("hover", 1, { x: 35, y: 49 }, 0.1);
            this.sp.tl.addAnimation("down", 1, { x: 42, y: 49 }, 0.1);
            this.sp.tl.changeAnimation("normal");

            this.sp.tr.addAnimation("normal", 1, { x: 32, y: 49 }, 0.1);
            this.sp.tr.addAnimation("hover", 1, { x: 39, y: 49 }, 0.1);
            this.sp.tr.addAnimation("down", 1, { x: 46, y: 49 }, 0.1);
            this.sp.tr.changeAnimation("normal");

            this.sp.bl.addAnimation("normal", 1, { x: 28, y: 53 }, 0.1);
            this.sp.bl.addAnimation("hover", 1, { x: 35, y: 53 }, 0.1);
            this.sp.bl.addAnimation("down", 1, { x: 42, y: 53 }, 0.1);
            this.sp.bl.changeAnimation("normal");

            this.sp.br.addAnimation("normal", 1, { x: 32, y: 53 }, 0.1);
            this.sp.br.addAnimation("hover", 1, { x: 39, y: 53 }, 0.1);
            this.sp.br.addAnimation("down", 1, { x: 46, y: 53 }, 0.1);
            this.sp.br.changeAnimation("normal");

            this.sp.t.addAnimation("normal", 1, { x: 31, y: 49 }, 0.1);
            this.sp.t.addAnimation("hover", 1, { x: 38, y: 49 }, 0.1);
            this.sp.t.addAnimation("down", 1, { x: 45, y: 49 }, 0.1);
            this.sp.t.changeAnimation("normal");

            this.sp.r.addAnimation("normal", 1, { x: 32, y: 52 }, 0.1);
            this.sp.r.addAnimation("hover", 1, { x: 39, y: 52 }, 0.1);
            this.sp.r.addAnimation("down", 1, { x: 46, y: 52 }, 0.1);
            this.sp.r.changeAnimation("normal");

            this.sp.b.addAnimation("normal", 1, { x: 31, y: 53 }, 0.1);
            this.sp.b.addAnimation("hover", 1, { x: 38, y: 53 }, 0.1);
            this.sp.b.addAnimation("down", 1, { x: 45, y: 53 }, 0.1);
            this.sp.b.changeAnimation("normal");

            this.sp.l.addAnimation("normal", 1, { x: 28, y: 52 }, 0.1);
            this.sp.l.addAnimation("hover", 1, { x: 35, y: 52 }, 0.1);
            this.sp.l.addAnimation("down", 1, { x: 42, y: 52 }, 0.1);
            this.sp.l.changeAnimation("normal");

            this.sp.c.addAnimation("normal", 1, { x: 31, y: 52 }, 0.1);
            this.sp.c.addAnimation("hover", 1, { x: 38, y: 52 }, 0.1);
            this.sp.c.addAnimation("down", 1, { x: 45, y: 52 }, 0.1);
            this.sp.c.changeAnimation("normal");
        }
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

    getSize() {
        return { w: this.width, h: this.height };
    }

    getTooltip() {
        return this.tooltip;
    }

    setTooltip(pTooltip) {
        this.tooltip.push(pTooltip);
    }

    getHoverOffset() {
        return this.hoverOffset;
    }

    setHoverOffset(pOffset) {
        this.hoverOffset = { ...pOffset };
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

    setOffsets(pX = 5, pY = 13) {
        this.textOffsetX = pX;
        this.textOffsetY = pY;
        this.textOffsetYOrigin = pY;
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

    setFontColor(pBack = "rgba(100,100,100," + this.alpha + ")", pMain = "rgb(0,0,0," + this.alpha + ")") {
        this.fontMainColor = pMain;
        this.fontBackgroundColor = pBack;
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

    updatePosition() {
        this.x = this.parent.x + this.offX;
        this.y = this.parent.y + this.offY;
    }

    updateAlpha() {
        this.alpha = this.parent.alpha;
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
        if (this.state == Button.STATE.Hover) {
            this.fontMainColor = "rgba(255,0,0," + this.alpha + ")";
            ctx.fillStyle = this.fontMainColor;
        } else if (this.state == LessonBtn.STATE.Close) {
            ctx.fillStyle = this.fontMainColor;
        } else {
            this.fontMainColor = "rgb(0,0,0," + this.alpha + ")";
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
                ctx.fillText(LANG[this.label], this.x + (this.width * 0.5) + 0.5, this.y + this.textOffsetY + 1);
                ctx.fillStyle = this.fontMainColor;
                ctx.fillText(LANG[this.label], this.x + (this.width * 0.5) + 0.5, this.y + this.textOffsetY); // +0.5 Car en centrant le texte se retrouve entre deux pixels

                // ctx.fillStyle = "rgb(0,0,0)";
                // ctx.fillText(LANG[this.label], this.x + (this.width * 0.5) + 0.5, this.y + this.textOffsetY + 1);
                // ctx.fillText(LANG[this.label], this.x + (this.width * 0.5) + 0.5, this.y + this.textOffsetY - 1);
                // ctx.fillText(LANG[this.label], this.x + (this.width * 0.5) + 0.5 + 1, this.y + this.textOffsetY);
                // ctx.fillText(LANG[this.label], this.x + (this.width * 0.5) + 0.5 - 1, this.y + this.textOffsetY);
                // ctx.fillText(LANG[this.label], this.x + (this.width * 0.5) + 0.5 + 1, this.y + this.textOffsetY - 1);
                // ctx.fillText(LANG[this.label], this.x + (this.width * 0.5) + 0.5 - 1, this.y + this.textOffsetY + 1);
                // ctx.fillText(LANG[this.label], this.x + (this.width * 0.5) + 0.5 - 1, this.y + this.textOffsetY - 1);
                // ctx.fillText(LANG[this.label], this.x + (this.width * 0.5) + 0.5 + 1, this.y + this.textOffsetY + 1);
                // ctx.fillStyle = "rgb(255,255,255)";
                // ctx.fillText(LANG[this.label], this.x + (this.width * 0.5) + 0.5, this.y + this.textOffsetY); // +0.5 Car en centrant le texte se retrouve entre deux pixels

                break;
            case this.ALIGN_TEXT.Right:
                ctx.textAlign = "right";
                ctx.fillText(LANG[this.label], this.x + this.width - 5, this.y + this.textOffsetY);
                break;
        }

        ctx.fillStyle = "rgba(0,0,0,1)";

        ctx.textAlign = "left";
    }
}