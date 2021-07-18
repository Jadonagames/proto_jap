class Button {

    static list = [];
    static currentList = [];
    static STATE = Object.freeze({
        Normal: 0,
        Hover: 1,
        Inactive: 2
    });

    constructor(pSize, pX, pY, pCallback, pType = "normal", pTypeState = null) {

        this.width = pSize.w;
        this.height = pSize.h;
        this.type = pType;

        this.sp = new UiSprite(pSize, pX, pY, this.type);

        this.state = Button.STATE.Normal;

        this.typeState = pTypeState;

        this.callbackAction = pCallback;

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
}