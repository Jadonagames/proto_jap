class LanguageScreen {

    static STATE = Object.freeze({
        Main: 0,
    });

    static currentState = LanguageScreen.STATE.Main;

    static list = [];

    constructor() {
    }

    static init() {
        canvas.style.backgroundColor = "rgb(213, 210, 193)";

        let frBtn = new Button({ w: 80, h: 40, v: 6 }, centerX(80), centerY(40, 30), null, { cb: LanguageScreen.changeLanguage, arg: "fr" }, "LanguageScreen", LanguageScreen.STATE.Main, "french_lang", 41);
        frBtn.setFontColor("rgba(142,45,45,1)");
        frBtn.setOffsets(0, 22);
        LanguageScreen.list.push(frBtn.getSprite());

        let enBtn = new Button({ w: 80, h: 40, v: 6 }, centerX(80), centerY(50, 30, 1), null, { cb: LanguageScreen.changeLanguage, arg: "en" }, "LanguageScreen", LanguageScreen.STATE.Main, "english_lang", 41);
        enBtn.setFontColor("rgba(142,45,45,1)");
        enBtn.setOffsets(0, 22);
        LanguageScreen.list.push(enBtn.getSprite());

        Button.resetTypeState("LanguageScreen", LanguageScreen.STATE.Main);
    }

    static changeLanguage(pLang) {
        switch (pLang) {
            case "en":
                LANG = translationEn;
                break;
            case "fr":
                LANG = translationFr;
                break;
            case "jp":
                LANG = translationJp;
                break;
            default:
                LANG = translationEn;
        }
        if (!MainMenu.bInit) {
            SplashScreen.init();
        }

    }

    static load() {
        LanguageScreen.currentState = LanguageScreen.STATE.Game;
    }

    static update(dt) {

        Sprite.manageBeforeUpdating(LanguageScreen.list, dt);

        LanguageScreen.list = LanguageScreen.list.filter(sp => {
            return !sp.delete;
        });
    }

    static draw(ctx) {

        Sprite.manageBeforeDrawing(LanguageScreen.list);
        /*
        * DEBUG
        */
        // ctx.fillText("あいうえお", 200, 50);
        // ctx.fillText("かきくけこ", 200, 60);
        // ctx.fillText("さしすせそ", 200, 70);
        // ctx.fillText("たちつてと", 200, 80);
        // ctx.fillText("なにぬねの", 200, 90);
        // ctx.fillText("はひふへほ", 200, 100);
        // ctx.fillText("まみむめも", 200, 110);
        // ctx.fillText("や　ゆ　よ", 200, 120);
        // ctx.fillText("らりるれろ", 200, 130);
        // ctx.fillText("わ　　　を", 200, 140);
        // ctx.fillText("ん", 200, 150);

        // ctx.fillText("アイウエオ", 250, 50);
        // ctx.fillText("カキクケコ", 250, 60);
        // ctx.fillText("サシスセソ", 250, 70);
        // ctx.fillText("タチツテト", 250, 80);
        // ctx.fillText("ナニヌネノ", 250, 90);
        // ctx.fillText("ハヒフヘホ", 250, 100);
        // ctx.fillText("マミムメモ", 250, 110);
        // ctx.fillText("ヤ　ユ　ヨ", 250, 120);
        // ctx.fillText("ラリルレロ", 250, 130);
        // ctx.fillText("ワ　　　ヲ", 250, 140);
        // ctx.fillText("ン", 250, 150);

        // --------------- END DEBUG
    }

}