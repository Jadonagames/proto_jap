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
                tl: new UiSprite({ w: pSize.vertices.w, h: pSize.vertices.h }, pX, pY, this.type),
                tr: new UiSprite({ w: pSize.vertices.w, h: pSize.vertices.h }, pX + this.internWidth, pY, this.type),
                bl: new UiSprite({ w: pSize.vertices.w, h: pSize.vertices.h }, pX, pY + this.internHeight, this.type),
                br: new UiSprite({ w: pSize.vertices.w, h: pSize.vertices.h }, pX + this.internWidth, pY + this.internHeight, this.type),
                t: new UiSprite({ w: pSize.t.w, h: pSize.t.h }, pX + pSize.vertices.w, pY, this.type, { x: this.internWidth - pSize.vertices.w, y: 1 }),
                r: new UiSprite({ w: pSize.r.w, h: pSize.r.h }, pX + this.internWidth, pY + pSize.vertices.h, this.type, { x: 1, y: this.internHeight - pSize.vertices.h }),
                b: new UiSprite({ w: pSize.b.w, h: pSize.b.h }, pX + pSize.vertices.w, pY + this.internHeight, this.type, { x: this.internWidth - pSize.vertices.w, y: 1 }),
                l: new UiSprite({ w: pSize.l.w, h: pSize.l.h }, pX, pY + pSize.vertices.h, this.type, { x: 1, y: this.internHeight - pSize.vertices.h }),
                c: new UiSprite({ w: pSize.c.w, h: pSize.c.h }, pX + pSize.vertices.w, pY + pSize.vertices.h, this.type, { x: this.internWidth - pSize.vertices.w, y: this.internHeight - pSize.vertices.h })
            }
            this.setButtonSprites(pId);
        } else {
            this.sp = new UiSprite(pSize, pX, pY, this.type);
        }


        this.state = Button.STATE.Normal;

        this.typeState = pTypeState;

        this.label = pLabel;

        this.callback = pCallback;
        this.ALIGN_TEXT = Object.freeze({
            Left: 0,
            Center: 1,
            Right: 2
        });
        this.alignText = this.ALIGN_TEXT.Center;

        Button.list.push(this);
    }

    setButtonSprites(pId) {
        if (pId == 0) {
            this.getSprite().tl.addAnimation("normal", 1, { x: 0, y: 48 }, 0.1);
            this.getSprite().tl.addAnimation("hover", 1, { x: 9, y: 48 }, 0.1);
            this.getSprite().tl.addAnimation("down", 1, { x: 18, y: 48 }, 0.1);
            this.getSprite().tl.changeAnimation("normal");

            this.getSprite().tr.addAnimation("normal", 1, { x: 5, y: 48 }, 0.1);
            this.getSprite().tr.addAnimation("hover", 1, { x: 14, y: 48 }, 0.1);
            this.getSprite().tr.addAnimation("down", 1, { x: 23, y: 48 }, 0.1);
            this.getSprite().tr.changeAnimation("normal");

            this.getSprite().bl.addAnimation("normal", 1, { x: 0, y: 53 }, 0.1);
            this.getSprite().bl.addAnimation("hover", 1, { x: 9, y: 53 }, 0.1);
            this.getSprite().bl.addAnimation("down", 1, { x: 18, y: 53 }, 0.1);
            this.getSprite().bl.changeAnimation("normal");

            this.getSprite().br.addAnimation("normal", 1, { x: 5, y: 53 }, 0.1);
            this.getSprite().br.addAnimation("hover", 1, { x: 14, y: 53 }, 0.1);
            this.getSprite().br.addAnimation("down", 1, { x: 23, y: 53 }, 0.1);
            this.getSprite().br.changeAnimation("normal");

            this.getSprite().t.addAnimation("normal", 1, { x: 4, y: 48 }, 0.1);
            this.getSprite().t.addAnimation("hover", 1, { x: 13, y: 48 }, 0.1);
            this.getSprite().t.addAnimation("down", 1, { x: 22, y: 48 }, 0.1);
            this.getSprite().t.changeAnimation("normal");

            this.getSprite().r.addAnimation("normal", 1, { x: 5, y: 52 }, 0.1);
            this.getSprite().r.addAnimation("hover", 1, { x: 14, y: 52 }, 0.1);
            this.getSprite().r.addAnimation("down", 1, { x: 23, y: 52 }, 0.1);
            this.getSprite().r.changeAnimation("normal");

            this.getSprite().b.addAnimation("normal", 1, { x: 4, y: 53 }, 0.1);
            this.getSprite().b.addAnimation("hover", 1, { x: 13, y: 53 }, 0.1);
            this.getSprite().b.addAnimation("down", 1, { x: 22, y: 53 }, 0.1);
            this.getSprite().b.changeAnimation("normal");

            this.getSprite().l.addAnimation("normal", 1, { x: 0, y: 52 }, 0.1);
            this.getSprite().l.addAnimation("hover", 1, { x: 9, y: 52 }, 0.1);
            this.getSprite().l.addAnimation("down", 1, { x: 18, y: 52 }, 0.1);
            this.getSprite().l.changeAnimation("normal");

            this.getSprite().c.addAnimation("normal", 1, { x: 4, y: 52 }, 0.1);
            this.getSprite().c.addAnimation("hover", 1, { x: 13, y: 52 }, 0.1);
            this.getSprite().c.addAnimation("down", 1, { x: 22, y: 52 }, 0.1);
            this.getSprite().c.changeAnimation("normal");
        }
    }

    static resetTypeState(pType, pTypeState) {
        Button.currentList = Button.list.filter(b => {
            return b.type == pType && b.typeState == pTypeState;
        });
    }

    getSprite() {
        return this.sp;
    }

    getSize() {
        return { w: this.width, h: this.height };
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

    static draw() {
        Button.currentList.forEach(b => {
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
        });
    }

    drawLabel(ctx) {
        if (this.state == Button.STATE.Hover) {
            ctx.fillStyle = "rgb(255,0,0)";
        } else {
            ctx.fillStyle = "rgb(0,0,0)";
        }

        LANG["lang_code"] == "jp" ? ctx.font = "10px jpfont" : ctx.font = "10px jpfont";
        // ctx.font = "10px testfont";

        switch (this.alignText) {
            case this.ALIGN_TEXT.Left:
                ctx.textAlign = "left";
                ctx.fillText(LANG[this.label], this.x + 5, this.y + 13);
                break;
            case this.ALIGN_TEXT.Center:
                ctx.textAlign = "center";
                ctx.fillText(LANG[this.label], this.x + this.width * 0.5, this.y + 13);
                break;
            case this.ALIGN_TEXT.Right:
                ctx.textAlign = "right";
                ctx.fillText(LANG[this.label], this.x + this.width - 5, this.y + 13);
                break;
        }

        // ctx.fillText(LANG[this.label], this.x + this.width - 5, this.y + 13); RIGHT
        // ctx.fillText(LANG[this.label], this.x + this.width * 0.5, this.y + 13);
        ctx.textAlign = "left";

    }
}