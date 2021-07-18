class Effect {

    constructor(pSize, pX, pY) {

        this.width = pSize.w;
        this.height = pSize.h;

        this.sp = new Sprite(pSize, pX, pY);

        // this.sp.changeAnimation("normal");
    }

    getSprite() {
        return this.sp;
    }
}