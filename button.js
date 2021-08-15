class Button {

    static list = [];
    static currentList = [];
    static STATE = Object.freeze({
        Normal: 0,
        Hover: 1,
        Inactive: 2
    });

    constructor(pSize, pX, pY, pCallback, pType = "normal", pTypeState = null, pLabel = "", pId = 0, pStaticSize = false) {

        this.x = pX;
        this.y = pY;
        this.width = pSize.w;
        this.height = pSize.h;

        this.type = pType;
        this.staticSize = pStaticSize;

        if (!this.staticSize) {
            pSize = { vertices: { w: pSize.v, h: pSize.v }, t: { w: 1, h: pSize.v }, r: { w: pSize.v, h: 1 }, b: { w: 1, h: pSize.v }, l: { w: pSize.v, h: 1 }, c: { w: 1, h: 1 } };
            this.internWidth = this.width - pSize.vertices.w;
            this.internHeight = this.height - pSize.vertices.h;

            this.sp = {
                tl: new Sprite({ w: pSize.vertices.w, h: pSize.vertices.h }, pX, pY, this.type),
                tr: new Sprite({ w: pSize.vertices.w, h: pSize.vertices.h }, pX + this.internWidth, pY, this.type),
                bl: new Sprite({ w: pSize.vertices.w, h: pSize.vertices.h }, pX, pY + this.internHeight, this.type),
                br: new Sprite({ w: pSize.vertices.w, h: pSize.vertices.h }, pX + this.internWidth, pY + this.internHeight, this.type),
                t: new Sprite({ w: pSize.t.w, h: pSize.t.h }, pX + pSize.vertices.w, pY, this.type, { x: this.internWidth - pSize.vertices.w, y: 1 }),
                r: new Sprite({ w: pSize.r.w, h: pSize.r.h }, pX + this.internWidth, pY + pSize.vertices.h, this.type, { x: 1, y: this.internHeight - pSize.vertices.h }),
                b: new Sprite({ w: pSize.b.w, h: pSize.b.h }, pX + pSize.vertices.w, pY + this.internHeight, this.type, { x: this.internWidth - pSize.vertices.w, y: 1 }),
                l: new Sprite({ w: pSize.l.w, h: pSize.l.h }, pX, pY + pSize.vertices.h, this.type, { x: 1, y: this.internHeight - pSize.vertices.h }),
                c: new Sprite({ w: pSize.c.w, h: pSize.c.h }, pX + pSize.vertices.w, pY + pSize.vertices.h, this.type, { x: this.internWidth - pSize.vertices.w, y: this.internHeight - pSize.vertices.h }),
                class: "dynamic",
                parent: this,
                delete: false
            }
            this.setButtonSprites(pId);
        } else {
            this.sp = new Sprite(pSize, pX, pY, this.type);
            this.sp.setClass("button");
            this.sp.setParent(this);
        }


        this.state = Button.STATE.Normal;

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

        this.tooltip = [];
        this.hoverOffset = null;

        Button.list.push(this);
    }

    setButtonSprites(pId) {
        if (pId == 0) {
            this.sp.tl.addAnimation("normal", 1, { x: 0, y: 48 }, 0.1);
            this.sp.tl.addAnimation("hover", 1, { x: 9, y: 48 }, 0.1);
            this.sp.tl.addAnimation("down", 1, { x: 18, y: 48 }, 0.1);
            this.sp.tl.changeAnimation("normal");

            this.sp.tr.addAnimation("normal", 1, { x: 5, y: 48 }, 0.1);
            this.sp.tr.addAnimation("hover", 1, { x: 14, y: 48 }, 0.1);
            this.sp.tr.addAnimation("down", 1, { x: 23, y: 48 }, 0.1);
            this.sp.tr.changeAnimation("normal");

            this.sp.bl.addAnimation("normal", 1, { x: 0, y: 53 }, 0.1);
            this.sp.bl.addAnimation("hover", 1, { x: 9, y: 53 }, 0.1);
            this.sp.bl.addAnimation("down", 1, { x: 18, y: 53 }, 0.1);
            this.sp.bl.changeAnimation("normal");

            this.sp.br.addAnimation("normal", 1, { x: 5, y: 53 }, 0.1);
            this.sp.br.addAnimation("hover", 1, { x: 14, y: 53 }, 0.1);
            this.sp.br.addAnimation("down", 1, { x: 23, y: 53 }, 0.1);
            this.sp.br.changeAnimation("normal");

            this.sp.t.addAnimation("normal", 1, { x: 4, y: 48 }, 0.1);
            this.sp.t.addAnimation("hover", 1, { x: 13, y: 48 }, 0.1);
            this.sp.t.addAnimation("down", 1, { x: 22, y: 48 }, 0.1);
            this.sp.t.changeAnimation("normal");

            this.sp.r.addAnimation("normal", 1, { x: 5, y: 52 }, 0.1);
            this.sp.r.addAnimation("hover", 1, { x: 14, y: 52 }, 0.1);
            this.sp.r.addAnimation("down", 1, { x: 23, y: 52 }, 0.1);
            this.sp.r.changeAnimation("normal");

            this.sp.b.addAnimation("normal", 1, { x: 4, y: 53 }, 0.1);
            this.sp.b.addAnimation("hover", 1, { x: 13, y: 53 }, 0.1);
            this.sp.b.addAnimation("down", 1, { x: 22, y: 53 }, 0.1);
            this.sp.b.changeAnimation("normal");

            this.sp.l.addAnimation("normal", 1, { x: 0, y: 52 }, 0.1);
            this.sp.l.addAnimation("hover", 1, { x: 9, y: 52 }, 0.1);
            this.sp.l.addAnimation("down", 1, { x: 18, y: 52 }, 0.1);
            this.sp.l.changeAnimation("normal");

            this.sp.c.addAnimation("normal", 1, { x: 4, y: 52 }, 0.1);
            this.sp.c.addAnimation("hover", 1, { x: 13, y: 52 }, 0.1);
            this.sp.c.addAnimation("down", 1, { x: 22, y: 52 }, 0.1);
            this.sp.c.changeAnimation("normal");
        }
        if (pId == 1) {
            this.sp.tl.addAnimation("normal", 1, { x: 0, y: 39 }, 0.1);
            this.sp.tl.addAnimation("hover", 1, { x: 9, y: 39 }, 0.1);
            this.sp.tl.addAnimation("down", 1, { x: 18, y: 39 }, 0.1);
            this.sp.tl.changeAnimation("normal");

            this.sp.tr.addAnimation("normal", 1, { x: 5, y: 39 }, 0.1);
            this.sp.tr.addAnimation("hover", 1, { x: 14, y: 39 }, 0.1);
            this.sp.tr.addAnimation("down", 1, { x: 23, y: 39 }, 0.1);
            this.sp.tr.changeAnimation("normal");

            this.sp.bl.addAnimation("normal", 1, { x: 0, y: 44 }, 0.1);
            this.sp.bl.addAnimation("hover", 1, { x: 9, y: 44 }, 0.1);
            this.sp.bl.addAnimation("down", 1, { x: 18, y: 44 }, 0.1);
            this.sp.bl.changeAnimation("normal");

            this.sp.br.addAnimation("normal", 1, { x: 5, y: 44 }, 0.1);
            this.sp.br.addAnimation("hover", 1, { x: 14, y: 44 }, 0.1);
            this.sp.br.addAnimation("down", 1, { x: 23, y: 44 }, 0.1);
            this.sp.br.changeAnimation("normal");

            this.sp.t.addAnimation("normal", 1, { x: 4, y: 39 }, 0.1);
            this.sp.t.addAnimation("hover", 1, { x: 13, y: 39 }, 0.1);
            this.sp.t.addAnimation("down", 1, { x: 22, y: 39 }, 0.1);
            this.sp.t.changeAnimation("normal");

            this.sp.r.addAnimation("normal", 1, { x: 5, y: 43 }, 0.1);
            this.sp.r.addAnimation("hover", 1, { x: 14, y: 43 }, 0.1);
            this.sp.r.addAnimation("down", 1, { x: 23, y: 43 }, 0.1);
            this.sp.r.changeAnimation("normal");

            this.sp.b.addAnimation("normal", 1, { x: 4, y: 44 }, 0.1);
            this.sp.b.addAnimation("hover", 1, { x: 13, y: 44 }, 0.1);
            this.sp.b.addAnimation("down", 1, { x: 22, y: 44 }, 0.1);
            this.sp.b.changeAnimation("normal");

            this.sp.l.addAnimation("normal", 1, { x: 0, y: 43 }, 0.1);
            this.sp.l.addAnimation("hover", 1, { x: 9, y: 43 }, 0.1);
            this.sp.l.addAnimation("down", 1, { x: 18, y: 43 }, 0.1);
            this.sp.l.changeAnimation("normal");

            this.sp.c.addAnimation("normal", 1, { x: 4, y: 43 }, 0.1);
            this.sp.c.addAnimation("hover", 1, { x: 13, y: 43 }, 0.1);
            this.sp.c.addAnimation("down", 1, { x: 22, y: 43 }, 0.1);
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
        if (!this.bStaticSize) {
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

    getState() {
        return this.state;
    }

    setState(newState) {
        this.state = newState;
    }

    setAlignText(pAlign) {
        this.align = pAlign;
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
            ctx.fillStyle = "rgb(255,0,0)";
        } else {
            ctx.fillStyle = "rgb(0,0,0)";
        }

        LANG["lang_code"] == "jp" ? ctx.font = "10px jpfont" : ctx.font = "10px jpfont";

        switch (this.alignText) {
            case this.ALIGN_TEXT.Left:
                ctx.textAlign = "left";
                ctx.fillText(LANG[this.label], this.x + 5, this.y + 13);
                break;
            case this.ALIGN_TEXT.Center:
                ctx.textAlign = "center";
                ctx.fillText(LANG[this.label], this.x + (this.width * 0.5) + 0.5, this.y + 13); // +0.5 Car en centrant le texte se retrouve entre deux pixels
                break;
            case this.ALIGN_TEXT.Right:
                ctx.textAlign = "right";
                ctx.fillText(LANG[this.label], this.x + this.width - 5, this.y + 13);
                break;
        }

        ctx.fillStyle = "rgb(0,0,0)";

        ctx.textAlign = "left";
    }
}