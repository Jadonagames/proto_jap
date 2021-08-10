class Panel {

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

        this.id = pId;

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
            this.setPanelSprites(this.id);
        } else {
            this.sp = new Sprite(pSize, pX, pY, this.type);
            this.sp.setClass("panel");
            this.sp.setParent(this);
        }

        this.hoverable = false;

        this.state = Panel.STATE.Normal;
        this.font = "jpfont";
        this.fontSize = 10;

        this.typeState = pTypeState;

        this.label = pLabel;
        this.wordsArr = [];

        this.callback = pCallback;
        this.ALIGN_TEXT = Object.freeze({
            Left: 0,
            Center: 1,
            Right: 2
        });
        this.alignText = this.ALIGN_TEXT.Center;
        this.textOffsetX = 5;
        this.textOffsetY = 13;

        this.tooltip = [];

        Panel.list.push(this);
    }

    setPanelSprites(pId) {
        if (pId == 0) {
            this.getSprite().tl.addAnimation("normal", 1, { x: 0, y: 48 }, 0.1);
            this.getSprite().tl.changeAnimation("normal");

            this.getSprite().tr.addAnimation("normal", 1, { x: 5, y: 48 }, 0.1);
            this.getSprite().tr.changeAnimation("normal");

            this.getSprite().bl.addAnimation("normal", 1, { x: 0, y: 53 }, 0.1);
            this.getSprite().bl.changeAnimation("normal");

            this.getSprite().br.addAnimation("normal", 1, { x: 5, y: 53 }, 0.1);
            this.getSprite().br.changeAnimation("normal");

            this.getSprite().t.addAnimation("normal", 1, { x: 4, y: 48 }, 0.1);
            this.getSprite().t.changeAnimation("normal");

            this.getSprite().r.addAnimation("normal", 1, { x: 5, y: 52 }, 0.1);
            this.getSprite().r.changeAnimation("normal");

            this.getSprite().b.addAnimation("normal", 1, { x: 4, y: 53 }, 0.1);
            this.getSprite().b.changeAnimation("normal");

            this.getSprite().l.addAnimation("normal", 1, { x: 0, y: 52 }, 0.1);
            this.getSprite().l.changeAnimation("normal");

            this.getSprite().c.addAnimation("normal", 1, { x: 4, y: 52 }, 0.1);
            this.getSprite().c.changeAnimation("normal");
        }

        if (pId == 1) {
            this.getSprite().tl.addAnimation("normal", 1, { x: 0, y: 57 }, 0.1);
            this.getSprite().tl.changeAnimation("normal");

            this.getSprite().tr.addAnimation("normal", 1, { x: 6, y: 57 }, 0.1);
            this.getSprite().tr.changeAnimation("normal");

            this.getSprite().bl.addAnimation("normal", 1, { x: 0, y: 63 }, 0.1);
            this.getSprite().bl.changeAnimation("normal");

            this.getSprite().br.addAnimation("normal", 1, { x: 6, y: 63 }, 0.1);
            this.getSprite().br.changeAnimation("normal");

            this.getSprite().t.addAnimation("normal", 1, { x: 5, y: 57 }, 0.1);
            this.getSprite().t.changeAnimation("normal");

            this.getSprite().r.addAnimation("normal", 1, { x: 6, y: 62 }, 0.1);
            this.getSprite().r.changeAnimation("normal");

            this.getSprite().b.addAnimation("normal", 1, { x: 5, y: 63 }, 0.1);
            this.getSprite().b.changeAnimation("normal");

            this.getSprite().l.addAnimation("normal", 1, { x: 0, y: 62 }, 0.1);
            this.getSprite().l.changeAnimation("normal");

            this.getSprite().c.addAnimation("normal", 1, { x: 5, y: 62 }, 0.1);
            this.getSprite().c.changeAnimation("normal");
        }

        if (pId == 2) {
            this.getSprite().tl.addAnimation("normal", 1, { x: 38, y: 1 }, 0.1);
            this.getSprite().tl.changeAnimation("normal");

            this.getSprite().tr.addAnimation("normal", 1, { x: 38, y: 1 }, 0.1);
            this.getSprite().tr.changeAnimation("normal");

            this.getSprite().bl.addAnimation("normal", 1, { x: 38, y: 1 }, 0.1);
            this.getSprite().bl.changeAnimation("normal");

            this.getSprite().br.addAnimation("normal", 1, { x: 38, y: 1 }, 0.1);
            this.getSprite().br.changeAnimation("normal");

            this.getSprite().t.addAnimation("normal", 1, { x: 38, y: 1 }, 0.1);
            this.getSprite().t.changeAnimation("normal");

            this.getSprite().r.addAnimation("normal", 1, { x: 38, y: 1 }, 0.1);
            this.getSprite().r.changeAnimation("normal");

            this.getSprite().b.addAnimation("normal", 1, { x: 38, y: 1 }, 0.1);
            this.getSprite().b.changeAnimation("normal");

            this.getSprite().l.addAnimation("normal", 1, { x: 38, y: 1 }, 0.1);
            this.getSprite().l.changeAnimation("normal");

            this.getSprite().c.addAnimation("normal", 1, { x: 38, y: 1 }, 0.1);
            this.getSprite().c.changeAnimation("normal");
        }

        if (pId == 3) {
            this.getSprite().tl.addAnimation("normal", 1, { x: 41, y: 1 }, 0.1);
            this.getSprite().tl.changeAnimation("normal");

            this.getSprite().tr.addAnimation("normal", 1, { x: 41, y: 1 }, 0.1);
            this.getSprite().tr.changeAnimation("normal");

            this.getSprite().bl.addAnimation("normal", 1, { x: 41, y: 1 }, 0.1);
            this.getSprite().bl.changeAnimation("normal");

            this.getSprite().br.addAnimation("normal", 1, { x: 41, y: 1 }, 0.1);
            this.getSprite().br.changeAnimation("normal");

            this.getSprite().t.addAnimation("normal", 1, { x: 41, y: 1 }, 0.1);
            this.getSprite().t.changeAnimation("normal");

            this.getSprite().r.addAnimation("normal", 1, { x: 41, y: 1 }, 0.1);
            this.getSprite().r.changeAnimation("normal");

            this.getSprite().b.addAnimation("normal", 1, { x: 41, y: 1 }, 0.1);
            this.getSprite().b.changeAnimation("normal");

            this.getSprite().l.addAnimation("normal", 1, { x: 41, y: 1 }, 0.1);
            this.getSprite().l.changeAnimation("normal");

            this.getSprite().c.addAnimation("normal", 1, { x: 38, y: 1 }, 0.1);
            this.getSprite().c.changeAnimation("normal");
        }
    }

    static resetTypeState(pType, pTypeState) {
        Panel.currentList = Panel.list.filter(b => {
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
        this.alignText = pAlign;
    }

    setOffsets(pX = 5, pY = 13) {
        this.textOffsetX = pX;
        this.textOffsetY = pY;
    }

    setFont(pFont) {
        this.font = pFont;
    }

    setFontSize(pSize) {
        this.fontSize = pSize;
    }

    setHoverable(pBool) {
        this.hoverable = pBool;
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

    // static draw() {
    //     Panel.currentList.forEach(b => {
    //         if (!b.staticSize) {
    //             for (const sp in b.getSprite()) {
    //                 b.getSprite()[sp].draw(ctx);
    //             }
    //         } else {
    //             b.getSprite().draw(ctx);
    //         }
    //         if (b.label != "") {
    //             b.drawLabel(ctx);
    //         }
    //     });
    // }

    drawLabel(ctx) {

        ctx.font = this.fontSize + "px " + this.font;

        if (this.id == 1) {
            ctx.fillStyle = "rgb(209,209,209)";
        }

        if (this.state == Panel.STATE.Hover) {
            ctx.fillStyle = "rgb(255,255,255)";
        } else {
            ctx.fillStyle = "rgb(0,0,0)";
        }

        this.wordsArr = LANG[this.label].split(' ');
        let line = "";
        let lines = [];
        let tmp = "";
        this.wordsArr.forEach((word, index) => { // contenu test du tooltip 23 * 5 = 115
            index == 0 ? tmp += word : tmp = line + " " + word;

            if ((tmp.length * 5) > this.width - 10) {
                lines.push(line);
                line = word;
                tmp = "";
            } else {
                index == 0 ? line += word : line += " " + word;
            }

            if (index == this.wordsArr.length - 1) {
                lines.push(line);
                tmp = "";
            }
        })

        for (let i = 0; i < lines.length; i++) {
            switch (this.alignText) {
                case this.ALIGN_TEXT.Left:
                    ctx.textAlign = "left";
                    ctx.fillText(lines[i], this.x + this.textOffsetX, this.y + this.textOffsetY);
                    break;
                case this.ALIGN_TEXT.Center:
                    ctx.textAlign = "center";
                    // ctx.fillText(lines[i], this.x + (this.width * 0.5) + 0.5, this.y + (13 * (i + 1))); // +0.5 Car en centrant le texte se retrouve entre deux pixels
                    ctx.fillText(lines[i], this.x + (this.width * 0.5), this.y + (this.textOffsetY * (i + 1))); // +0.5 Car en centrant le texte se retrouve entre deux pixels
                    break;
                case this.ALIGN_TEXT.Right:
                    ctx.textAlign = "right";
                    ctx.fillText(lines[i], this.x + this.width - this.textOffsetX, this.y + this.textOffsetY);
                    break;
            }
        }
        ctx.fillStyle = "rgb(0,0,0)";

        ctx.textAlign = "left";
    }
}