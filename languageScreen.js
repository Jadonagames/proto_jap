class LanguageScreen {

    static STATE = Object.freeze({
        Main: 0,
    });

    static currentState = LanguageScreen.STATE.Main;

    static list = [];

    constructor() {
    }

    static init() {
        canvas.style.backgroundColor = "cornflowerblue";

        let frBtn = new Button({ w: 54, h: 20, v: 4 }, centerX(54), 80, { cb: LanguageScreen.changeLanguage, arg: "fr" }, "LanguageScreen", LanguageScreen.STATE.Main, "french_lang");
        frBtn.setTextCase("all");
        LanguageScreen.list.push(frBtn.getSprite());

        let enBtn = new Button({ w: 54, h: 20, v: 4 }, centerX(54), 110, { cb: LanguageScreen.changeLanguage, arg: "en" }, "LanguageScreen", LanguageScreen.STATE.Main, "english_lang");
        enBtn.setTextCase("all");
        LanguageScreen.list.push(enBtn.getSprite());

        let jpBtn = new Button({ w: 54, h: 20, v: 4 }, centerX(54), 140, { cb: LanguageScreen.changeLanguage, arg: "jp" }, "LanguageScreen", LanguageScreen.STATE.Main, "japanese_lang");
        LanguageScreen.list.push(jpBtn.getSprite());

        // Panel.resetTypeState("LanguageScreen", LanguageScreen.STATE.Main);
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

        /**
         * DEBUG
         */
        //------------ END DEBUG

        LanguageScreen.list.forEach(sp => {
            if (sp.class == "dynamic") {
                for (const s in sp) {
                    if (sp[s] instanceof Sprite) {
                        sp[s].update(dt);
                    }
                }
            } else {
                sp.update(dt);
            }
        })

        LanguageScreen.list = LanguageScreen.list.filter(sp => {
            return !sp.delete;
        });
    }

    static draw(ctx) {

        Sprite.manageBeforeDrawing(LanguageScreen.list);

        ctx.fillStyle = "rgb(255,255,255)";
        // ctx.font = "20px UD Digi Kyokasho NK-R";

        /*
        * DEBUG
        */

        // ctx.font = "10px UD Digi Kyokasho NK-R";
        ctx.font = "30px jpfont";

        ctx.textAlign = "center";

        ctx.fillText("Language Screen", centerX(), 30);
        ctx.font = "10px jpfont";
        ctx.textAlign = "left";

        ctx.fillText("あいうえお", 200, 50);
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


/**
 * DEBUG
 */

// -------------------- END DEBUG