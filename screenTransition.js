class ScreenTransition {

    static list = []

    constructor(pCoord, pSize, pCallback, pScreenInfos) {
        this.x = pCoord.x;
        this.y = pCoord.y;
        this.width = pSize.w;
        this.height = pSize.h;

        this.callback = pCallback;
        this.screenInfos = pScreenInfos; // to 

        this.bCollide = false;

        ScreenTransition.list.push(this);
    }

    setCollide(pBool) {
        this.bCollide = pBool;
    }

    update() {
        // if (this.bCollide) {
        //     this.setCollide(false);
        //     this.callback();
        // }
    }

    draw(ctx) {
        /**
         * DEBUG
         */
        ctx.strokeStyle = "rgb(255,0,0)";
        ctx.strokeRect(this.x, this.y, this.width, this.height);
    }
}