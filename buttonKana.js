class ButtonKana {

    static list = [];
    static currentList = [];
    static STATE = Object.freeze({
        Normal: 0,
        Hover: 1,
        Inactive: 2
    });

    // size, x, y, callback, type, typeState, char
    constructor(pSize, pX, pY, pCallback, pType = "normal", pTypeState = null, pChar = "") {

        this.width = pSize.w;
        this.height = pSize.h;
        this.type = pType;

        this.sp = new UiSprite(pSize, pX, pY, this.type);

        this.state = Button.STATE.Normal;

        this.typeState = pTypeState;

        this.callbackAction = pCallback;
        // this.callbackArg = pArg;
        this.char = pChar;
        this.fontSize = 10;

        Button.list.push(this);
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

    setChar(pChar) {
        this.char = pChar;
    }
    setFontSize(pSize) {
        this.fontSize = pSize;
    }

    draw(ctx) {
        if (this.state == Button.STATE.Hover) {
            ctx.fillStyle = "rgb(255,0,0)";
        } else {
            ctx.fillStyle = "rgb(255,255,255)";
        }

        ctx.font = this.fontSize + "px UD Digi Kyokasho NK-R";

        if (this.char.length == 1) {
            ctx.fillText(this.char, this.sp.x + (this.width / 2) - (0.3 * this.fontSize), this.sp.y + 11);
        } else if (this.char.length == 2) {
            ctx.fillText(this.char, this.sp.x + (this.width / 2) - (0.5 * this.fontSize), this.sp.y + 11);
        } else if (this.char.length == 3) {
            ctx.fillText(this.char, this.sp.x + (this.width / 2) - (0.7 * this.fontSize), this.sp.y + 11);
        }
    }
}

/*
font: 10px
this.x : 0
this.width : 32

1 lettre :  x + 13   this.width/2 - 3
2 lettres : x + 11   this.width/2 - 5
3 lettres : x + 9    this.width/2 - 7

 */