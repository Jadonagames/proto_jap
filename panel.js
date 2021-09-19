class Panel {

    static list = [];
    static currentList = [];
    static STATE = Object.freeze({
        Normal: 0,
        Hover: 1,
        Inactive: 2
    });

    constructor(pSize, pX, pY, pParent, pType = "normal", pTypeState = null, pLabel = "", pId = 0, pStaticSize = false) {

        this.offX = pX;
        this.offY = pY;

        this.width = pSize.w;
        this.height = pSize.h;

        this.parent = pParent;
        this.children = [];

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

        this.id = pId;


        if (!this.staticSize) {
            pSize = { vertices: { w: pSize.v, h: pSize.v }, t: { w: 1, h: pSize.v }, r: { w: pSize.v, h: 1 }, b: { w: 1, h: pSize.v }, l: { w: pSize.v, h: 1 }, c: { w: 1, h: 1 } };
            this.internWidth = this.width - pSize.vertices.w;
            this.internHeight = this.height - pSize.vertices.h;

            this.sp = {
                tl: new Sprite({ w: pSize.vertices.w, h: pSize.vertices.h }, 0, 0, this, this.type),                                                           // 5x5
                tr: new Sprite({ w: pSize.vertices.w, h: pSize.vertices.h }, 0 + this.internWidth, 0, this, this.type),                                        // 6x5
                bl: new Sprite({ w: pSize.vertices.w, h: pSize.vertices.h }, 0, 0 + this.internHeight, this, this.type),                                       // 5x6
                br: new Sprite({ w: pSize.vertices.w, h: pSize.vertices.h }, 0 + this.internWidth, 0 + this.internHeight, this, this.type),                    // 6x6
                t: new Sprite({ w: pSize.t.w, h: pSize.t.h }, 0 + pSize.vertices.w, 0, this, this.type, { x: this.internWidth - pSize.vertices.w, y: 1 }),     // 1x5
                r: new Sprite({ w: pSize.r.w, h: pSize.r.h }, 0 + this.internWidth, 0 + pSize.vertices.h, this, this.type, { x: 1, y: this.internHeight - pSize.vertices.h }), // 6x1
                b: new Sprite({ w: pSize.b.w, h: pSize.b.h }, 0 + pSize.vertices.w, 0 + this.internHeight, this, this.type, { x: this.internWidth - pSize.vertices.w, y: 1 }), // 1x6
                l: new Sprite({ w: pSize.l.w, h: pSize.l.h }, 0, 0 + pSize.vertices.h, this, this.type, { x: 1, y: this.internHeight - pSize.vertices.h }),                    // 5x1
                c: new Sprite({ w: pSize.c.w, h: pSize.c.h }, 0 + pSize.vertices.w, 0 + pSize.vertices.h, this, this.type, { x: this.internWidth - pSize.vertices.w, y: this.internHeight - pSize.vertices.h }), //
                class: 9,
                parent: this,
                delete: false
            }
            this.setPanelSprites(this.id);
        } else {
            this.sp = new Sprite(pSize, 0, 0, this, this.type);
            this.sp.setClass("panel");
        }

        this.bMoving = false;

        this.hoverable = false;
        this.hoverCB = null;

        this.bToDelete = false;

        this.state = Panel.STATE.Normal;
        this.font = "jpfont";
        this.fontSize = 10;
        this.fontMainColor = "rgba(0,0,0," + this.alpha + ")";
        this.fontBackgroundColor = "rgba(150,150,150," + this.alpha + ")";

        this.typeState = pTypeState;

        this.label = pLabel;
        this.wordsArr = [];
        this.bFirstUC = true;

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

        Panel.list.push(this);
    }

    getParent() {
        return this.parent;
    }

    setChild(pNewChild) {
        this.children.push(pNewChild);
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


        if (pId == 11) {
            this.getSprite().tl.addAnimation("normal", 1, { x: 0, y: 68 }, 0.1);
            this.getSprite().tl.changeAnimation("normal");

            this.getSprite().tr.addAnimation("normal", 1, { x: 7, y: 68 }, 0.1);
            this.getSprite().tr.changeAnimation("normal");

            this.getSprite().bl.addAnimation("normal", 1, { x: 0, y: 75 }, 0.1);
            this.getSprite().bl.changeAnimation("normal");

            this.getSprite().br.addAnimation("normal", 1, { x: 7, y: 75 }, 0.1);
            this.getSprite().br.changeAnimation("normal");

            this.getSprite().t.addAnimation("normal", 1, { x: 6, y: 68 }, 0.1);
            this.getSprite().t.changeAnimation("normal");

            this.getSprite().r.addAnimation("normal", 1, { x: 7, y: 74 }, 0.1);
            this.getSprite().r.changeAnimation("normal");

            this.getSprite().b.addAnimation("normal", 1, { x: 6, y: 75 }, 0.1);
            this.getSprite().b.changeAnimation("normal");

            this.getSprite().l.addAnimation("normal", 1, { x: 0, y: 74 }, 0.1);
            this.getSprite().l.changeAnimation("normal");

            this.getSprite().c.addAnimation("normal", 1, { x: 6, y: 74 }, 0.1);
            this.getSprite().c.changeAnimation("normal");
        }
        if (pId == 12) {
            this.getSprite().tl.addAnimation("normal", 1, { x: 13, y: 57 }, 0.1);
            this.getSprite().tl.changeAnimation("normal");

            this.getSprite().tr.addAnimation("normal", 1, { x: 21, y: 57 }, 0.1);
            this.getSprite().tr.changeAnimation("normal");

            this.getSprite().bl.addAnimation("normal", 1, { x: 13, y: 65 }, 0.1);
            this.getSprite().bl.changeAnimation("normal");

            this.getSprite().br.addAnimation("normal", 1, { x: 21, y: 65 }, 0.1);
            this.getSprite().br.changeAnimation("normal");

            this.getSprite().t.addAnimation("normal", 1, { x: 20, y: 57 }, 0.1);
            this.getSprite().t.changeAnimation("normal");

            this.getSprite().r.addAnimation("normal", 1, { x: 21, y: 64 }, 0.1);
            this.getSprite().r.changeAnimation("normal");

            this.getSprite().b.addAnimation("normal", 1, { x: 20, y: 65 }, 0.1);
            this.getSprite().b.changeAnimation("normal");

            this.getSprite().l.addAnimation("normal", 1, { x: 13, y: 64 }, 0.1);
            this.getSprite().l.changeAnimation("normal");

            this.getSprite().c.addAnimation("normal", 1, { x: 20, y: 64 }, 0.1);
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

    setToDelete() {
        this.bToDelete = true;
    }

    removeFromList() {
        Panel.list = Panel.list.filter(p => {
            return p != this;
        });
    }

    removeFromCurrentList() {
        Panel.currentList = Panel.currentList.filter(p => {
            return p != this;
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

    setFont(pFont) {
        this.font = pFont;
    }

    setFontSize(pSize) {
        this.fontSize = pSize;
    }

    setFontColor(pBack = "rgba(100,100,100," + this.alpha + ")", pMain = "rgba(0,0,0," + this.alpha + ")") {
        this.fontMainColor = pMain;
        this.fontBackgroundColor = pBack;
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
        if (this.parent) {
            this.alpha = this.parent.alpha;
        }
        this.fontBackgroundColor = this.fontBackgroundColor.split(",");
        this.fontBackgroundColor = this.fontBackgroundColor[0] + "," + this.fontBackgroundColor[1] + "," + this.fontBackgroundColor[2] + "," + this.alpha + ")";
    }

    drawLabel(ctx) {

        ctx.font = this.fontSize + "px " + this.font;

        if (this.id == 1) {
            ctx.fillStyle = "rgba(209,209,209," + this.alpha + ")";
        }

        if (this.state == Panel.STATE.Hover) {
            this.fontMainColor = "rgba(255,255,255," + this.alpha + ")";
            ctx.fillStyle = this.fontMainColor;
        } else {
            this.fontMainColor = "rgba(0,0,0," + this.alpha + ")";
            ctx.fillStyle = this.fontMainColor;
        }

        this.wordsArr = LANG[this.label].split(' ');

        if (this.wordsArr.length == 1 && this.wordsArr[0] != "" && this.bFirstUC) this.wordsArr[0] = firstUC(this.wordsArr[0]);

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

                    ctx.fillStyle = this.fontBackgroundColor;
                    ctx.fillText(lines[i], this.x + this.textOffsetX + 1, this.y + this.textOffsetY + 1);
                    ctx.fillStyle = this.fontMainColor;

                    ctx.fillText(lines[i], this.x + this.textOffsetX, this.y + this.textOffsetY);

                    break;
                case this.ALIGN_TEXT.Center:
                    ctx.textAlign = "center";
                    // ctx.fillText(lines[i], this.x + (this.width * 0.5) + 0.5, this.y + (13 * (i + 1))); // +0.5 Car en centrant le texte se retrouve entre deux pixels
                    ctx.fillStyle = this.fontBackgroundColor;
                    ctx.fillText(lines[i], this.x + (this.width * 0.5) + 1, this.y + (this.textOffsetY * (i + 1)) + 1);
                    ctx.fillStyle = this.fontMainColor;

                    ctx.fillText(lines[i], this.x + (this.width * 0.5), this.y + (this.textOffsetY * (i + 1))); // +0.5 Car en centrant le texte se retrouve entre deux pixels
                    break;
                case this.ALIGN_TEXT.Right:
                    ctx.textAlign = "right";
                    ctx.fillText(lines[i], this.x + this.width - this.textOffsetX, this.y + this.textOffsetY);
                    break;
            }
            this.textOffsetY += 13;
        }
        this.textOffsetY = this.textOffsetYOrigin;
        ctx.fillStyle = "rgba(0,0,0,1)";

        ctx.textAlign = "left";
    }
}