class Character {

    constructor(pSize, pX, pY) {

        this.width = pSize.w;
        this.height = pSize.h;

        this.sp = new Sprite(pSize, pX, pY);
        this.sp.addAnimation("TURNRIGHT", 9, { x: 0, y: 0 }, 0.1, false);
        this.sp.changeAnimation("TURNRIGHT");

    }

    getSprite() {
        return this.sp;
    }
}