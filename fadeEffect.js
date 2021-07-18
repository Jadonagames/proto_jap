class FadeEffect {
    constructor() { }

    static update(dt) {
        this.timer.update(dt);
    }

    static changeAlpha() {
        this.currentAlpha += 0.1 * this.fadingDirection;
        if (this.currentAlpha >= 1 || this.currentAlpha <= 0) {
            this.count++;
            if (this.count >= 10) {
                if (this.callback != null) {
                    if (this.callback.arg != null) {
                        this.callback.cb(this.callback.arg);
                    } else {
                        this.callback.cb();
                    }
                }
            }
        }
    }

    static draw(ctx) {
        ctx.fillStyle = "rgba(" + this.color.r + "," + this.color.g + "," + this.color.b + "," + this.currentAlpha + ")";
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    }

    static fade(pCallback = null, pDirection = "out", pMaxTimer = 0.04, pColor = { r: 0, g: 0, b: 0 }) {


        // TODO gérer le count !!!!

        if (pDirection == "out") {
            this.currentAlpha = 0;
            this.fadingDirection = 1;
        } else if (pDirection == "in") {
            this.currentAlpha = 1;
            this.fadingDirection = -1;
        }
        this.timer = new Timer(pMaxTimer, FadeEffect.changeAlpha.bind(this));
        this.bActive = true;
        this.callback = pCallback;
        this.color = pColor;
        this.count = 0;
    }

}