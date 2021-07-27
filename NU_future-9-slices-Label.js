class Button2 {

    static list = [];
    static currentList = [];
    static STATE = Object.freeze({
        Normal: 0,
        Hover: 1,
        Inactive: 2
    });

    constructor(pSize, pX, pY, pCallback, pType = "normal", pTypeState = null, pLabel = "") {

        if (pLabel != "") {
            if (LANG['lang_code'] != "jp") {
                this.width = (LANG[pLabel].length * 5) + 5; // TODO : change place of this ! maybe in draw ? (when changing language !!)
            } else {
                this.width = (LANG[pLabel].length * 10) + 5;
            }
            this.height = 16;

        } else {
            this.width = 32;
            this.height = 16;
        }
        this.type = pType;

        this.sp = {
            tl: new UiSprite({ w: pSize.tl.w, h: pSize.tl.h }, pX, pY, this.type),
            tr: new UiSprite({ w: pSize.tr.w, h: pSize.tr.h }, pX + this.width, pY, this.type),
            bl: new UiSprite({ w: pSize.bl.w, h: pSize.bl.h }, pX, pY + this.height, this.type),
            br: new UiSprite({ w: pSize.br.w, h: pSize.br.h }, pX + this.width, pY + this.height, this.type),
            t: new UiSprite({ w: pSize.t.w, h: pSize.t.h }, pX + pSize.tl.w, pY, this.type, { x: this.width - pSize.tr.w, y: 1 }),
            r: new UiSprite({ w: pSize.r.w, h: pSize.r.h }, pX + this.width, pY + pSize.tr.h, this.type, { x: 1, y: this.height - pSize.bl.h }),
            b: new UiSprite({ w: pSize.b.w, h: pSize.b.h }, pX + pSize.bl.w, pY + this.height, this.type, { x: this.width - pSize.br.w, y: 1 }),
            l: new UiSprite({ w: pSize.l.w, h: pSize.l.h }, pX, pY + pSize.tl.h, this.type, { x: 1, y: this.height - pSize.bl.h }),
            c: new UiSprite({ w: pSize.c.w, h: pSize.c.h }, pX + pSize.tl.w, pY + pSize.tl.h, this.type, { x: this.width - pSize.r.w, y: this.height - pSize.b.h })
        }

        this.state = Button2.STATE.Normal;

        this.typeState = pTypeState;

        this.label = pLabel;

        this.callback = pCallback;

        Button.list.push(this);

    }


    static resetTypeState(pType, pTypeState) {
        Button2.currentList = Button2.list.filter(b => {
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

    drawLabel(ctx) {
        if (this.state == Button2.STATE.Hover) {
            ctx.fillStyle = "rgb(255,0,0)";
        } else {
            ctx.fillStyle = "rgb(0,0,0)";
        }

        LANG["lang_code"] == "jp" ? ctx.font = "10px jpfont" : ctx.font = "10px jpfont";
        // ctx.font = "10px testfont";

        ctx.fillText(LANG[this.label], this.sp.tl.x + 5, this.sp.tl.y + 13);

    }
}