
class Enemy {

    constructor(pSize, pX, pY) {

        // enemy : 24x24
        // idle : 0 - 5 : ss_origin: 0x48

        this.width = pSize.w;
        this.height = pSize.h;

        this.sp = new Sprite(pSize, pX, pY);
        this.sp.addAnimation("idle", 6, { x: 0, y: 48 }, 0.1, true);
        this.sp.changeAnimation("idle");

    }

    getSprite() {
        return this.sp;
    }
}