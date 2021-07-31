class SplashScreen {
    constructor() { }

    static init() {

        mainState = MAIN_STATE.Splash;

        canvas.style.backgroundColor = "black";

        this.timer = new Timer(3, toMainMenu);
        this.bTransition = false;

        this.jadona = new Sprite({ w: 37, h: 34 }, centerX(37), centerY(34), "jadona");
        this.jadona.addAnimation("normal", 1, { x: 0, y: 0 }, 0.1);
        this.jadona.changeAnimation("normal");

        FadeEffect.fade({ cb: SplashScreen.playSound.bind(this), arg: null }, "in", 0.1);
    }

    static playSound() {
        this.bTransition = true;
        FadeEffect.bActive = false;
        Sound.list["jadona"].play();
    }

    static update(dt) {
        if (this.bTransition) {
            this.timer.update(dt);
        }
        if (FadeEffect.bActive) {
            FadeEffect.update(dt);
        }
    }

    static draw(ctx) {
        this.jadona.draw(ctx);
        if (FadeEffect.bActive) {
            FadeEffect.draw(ctx);
        }
    }
}