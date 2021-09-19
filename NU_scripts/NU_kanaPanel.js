class KanaPanel {

    static list = [];
    static currentList = [];
    static STATE = Object.freeze({
        Normal: 0,
        Hover: 1,
        Inactive: 2
    });

    constructor(pKana, pSize, pX, pY, pCallback, pType = "normal", pTypeState = null, pId = 0, pStaticSize = false) {

        this.kana = pKana;
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
            this.setKanaPanelSprites(pId);
        } else {
            this.sp = new Sprite(pSize, pX, pY, this.type);
            this.sp.setClass("kanapanel");
            this.sp.setParent(this);
        }


        this.state = KanaPanel.STATE.Normal;

        this.typeState = pTypeState;

        this.label = pLabel;

        this.callback = pCallback;
        this.hoverCB = null;
        this.ALIGN_TEXT = Object.freeze({
            Left: 0,
            Center: 1,
            Right: 2
        });
        this.alignText = this.ALIGN_TEXT.Center;

        this.tooltip = [];

        KanaPanel.list.push(this);
    }

    setKanaPanelSprites(pId) {
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
    }

    static resetTypeState(pType, pTypeState) {
        KanaPanel.currentList = KanaPanel.list.filter(b => {
            return b.type == pType && b.typeState == pTypeState;
        });
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

    static draw() {
        KanaPanel.currentList.forEach(b => {
            if (b.state == KanaPanel.STATE.Hover && b.hoverCB) {
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
            if (b.state == KanaPanel.STATE.Hover && b.hoverCB) {
                b.hoverCB.cb(b.hoverCB.arg);
            }
        });
    }

    drawLabel(ctx) {
        if (this.state == KanaPanel.STATE.Hover) {
            ctx.fillStyle = "rgb(255,0,0)";
        } else {
            ctx.fillStyle = "rgb(0,0,0)";
        }

        ctx.font = "5px UD Digi Kyokasho NK-R";

        switch (this.alignText) {
            case this.ALIGN_TEXT.Left:
                ctx.textAlign = "left";
                ctx.fillText(this.kana.char, this.x + 5, this.y + 13);
                break;
            case this.ALIGN_TEXT.Center:
                ctx.textAlign = "center";
                ctx.fillText(this.kana.char, this.x + (this.width * 0.5) + 0.5, this.y + 13); // +0.5 Car en centrant le texte se retrouve entre deux pixels
                break;
            case this.ALIGN_TEXT.Right:
                ctx.textAlign = "right";
                ctx.fillText(this.kana.char, this.x + this.width - 5, this.y + 13);
                break;
        }

        ctx.textAlign = "left";
    }
}