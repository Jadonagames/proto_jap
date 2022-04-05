class Login {

    static STATE = Object.freeze({
        Main: 0,
    });

    static currentState = Login.STATE.Main;

    static list = [];

    constructor() {
    }

    static init() {
        canvas.style.backgroundColor = "rgb(213, 210, 193)";

        let frBtn = new Button({ w: 80, h: 40, v: 6 }, centerX(80), centerY(40, 30), null, null, "Login", Login.STATE.Main, "french_lang", 41);
        frBtn.setFontColor("rgba(142,45,45,1)");
        frBtn.setOffsets(0, 22);
        Login.list.push(frBtn.getSprite());

        let enBtn = new Button({ w: 80, h: 40, v: 6 }, centerX(80), centerY(50, 30, 1), null, null, "Login", Login.STATE.Main, "english_lang", 41);
        enBtn.setFontColor("rgba(142,45,45,1)");
        enBtn.setOffsets(0, 22);
        Login.list.push(enBtn.getSprite());

        Button.resetTypeState("Login", Login.STATE.Main);
    }

    static update(dt) {

        Sprite.manageBeforeUpdating(Login.list, dt);

        Login.list = Login.list.filter(sp => {
            return !sp.delete;
        });
    }

    static draw(ctx) {

        Sprite.manageBeforeDrawing(Login.list);
    }

}