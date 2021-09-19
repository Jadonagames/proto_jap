class LessonBtn extends Button {

    static list = [];

    static STATE = Object.freeze({
        Normal: 0,
        Hover: 1,
        Inactive: 2,
        Close: 3
    });

    constructor(pSize, pX, pY, pParent, pCallback, pType = "normal", pTypeState = null, pLabel = "", pId = 0, pStaticSize = false) {
        super(pSize, pX, pY, pParent, pCallback, pType, pTypeState, pLabel, pId, pStaticSize);

        LessonBtn.list.push(this);
    }

}