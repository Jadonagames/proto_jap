class LanguageScreen {

    static STATE = Object.freeze({
        Main: 0,
    });

    static currentState = LanguageScreen.STATE.Main;

    static mainList = [];

    constructor() {
    }

    static init() {
        canvas.style.backgroundColor = "cornflowerblue";

        let frBtn = new Button({ w: 54, h: 20, v: 4 }, centerX(54), 80, { cb: LanguageScreen.changeLanguage, arg: "fr" }, "LanguageScreen", LanguageScreen.STATE.Main, "french_lang");
        let enBtn = new Button({ w: 54, h: 20, v: 4 }, centerX(54), 110, { cb: LanguageScreen.changeLanguage, arg: "en" }, "LanguageScreen", LanguageScreen.STATE.Main, "english_lang");
        let jpBtn = new Button({ w: 54, h: 20, v: 4 }, centerX(54), 140, { cb: LanguageScreen.changeLanguage, arg: "jp" }, "LanguageScreen", LanguageScreen.STATE.Main, "japanese_lang");

        // let test1Btn = new Button2({ tl: { w: 4, h: 4 }, tr: { w: 4, h: 4 }, bl: { w: 4, h: 4 }, br: { w: 4, h: 4 }, t: { w: 1, h: 4 }, r: { w: 4, h: 1 }, b: { w: 1, h: 4 }, l: { w: 4, h: 1 }, c: { w: 1, h: 1 } }, 20, 50, { cb: LanguageScreen.changeLanguage, arg: "fr" }, "LanguageScreen", LanguageScreen.STATE.Main, "npc_1_1");
        // test1Btn.getSprite().tl.addAnimation("normal", 1, { x: 480, y: 48 }, 0.1);//ok
        // test1Btn.getSprite().tl.changeAnimation("normal");
        // test1Btn.getSprite().tr.addAnimation("normal", 1, { x: 492, y: 48 }, 0.1);//ok
        // test1Btn.getSprite().tr.changeAnimation("normal");
        // test1Btn.getSprite().bl.addAnimation("normal", 1, { x: 480, y: 60 }, 0.1);//ok
        // test1Btn.getSprite().bl.changeAnimation("normal");
        // test1Btn.getSprite().br.addAnimation("normal", 1, { x: 492, y: 60 }, 0.1);//ok
        // test1Btn.getSprite().br.changeAnimation("normal");
        // test1Btn.getSprite().t.addAnimation("normal", 1, { x: 486, y: 48 }, 0.1);//ok
        // test1Btn.getSprite().t.changeAnimation("normal");
        // test1Btn.getSprite().r.addAnimation("normal", 1, { x: 492, y: 54 }, 0.1);//ok
        // test1Btn.getSprite().r.changeAnimation("normal");
        // test1Btn.getSprite().b.addAnimation("normal", 1, { x: 486, y: 60 }, 0.1);//ok
        // test1Btn.getSprite().b.changeAnimation("normal");
        // test1Btn.getSprite().l.addAnimation("normal", 1, { x: 480, y: 54 }, 0.1);//ok
        // test1Btn.getSprite().l.changeAnimation("normal");
        // test1Btn.getSprite().c.addAnimation("normal", 1, { x: 486, y: 54 }, 0.1);//ok
        // test1Btn.getSprite().c.changeAnimation("normal");
        // LanguageScreen.mainList.push(test1Btn.getSprite());

        let test2btn = new Button({ w: 54, h: 20, v: 4 }, 20, 50, { cb: LanguageScreen.changeLanguage, arg: "en" }, "LanguageScreen", LanguageScreen.STATE.Main, "start");
        let test3btn = new Button({ w: 54, h: 20, v: 4 }, 74, 50, { cb: LanguageScreen.changeLanguage, arg: "jp" }, "LanguageScreen", LanguageScreen.STATE.Main, "start");
        let minusBtn = new Button({ w: 16, h: 16, v: 4 }, 10, 10, { cb: LanguageScreen.changeLanguage, arg: "fr" }, "LanguageScreen", MainMenu.STATE.Main, "", 0, true);
        minusBtn.getSprite().addAnimation("normal", 1, { x: 0, y: 96 }, 0.1);
        minusBtn.getSprite().addAnimation("hover", 1, { x: 16, y: 96 }, 0.1);
        minusBtn.getSprite().addAnimation("down", 1, { x: 32, y: 96 }, 0.1);
        minusBtn.getSprite().changeAnimation("normal");

        Button.resetTypeState("LanguageScreen", LanguageScreen.STATE.Main);
    }

    static changeLanguage(pLang) {
        console.log("change language");
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
        toMainMenu();
    }

    static load() {
        LanguageScreen.currentState = LanguageScreen.STATE.Game;
    }

    static update(dt) {

        /**
         * DEBUG
         */
        //------------ END DEBUG
        Sprite.list = Sprite.list.filter(sp => {
            return !sp.delete;
        });
    }

    static draw(ctx) {

        Sprite.list.forEach(sp => {
            sp.draw(ctx);
        });

        // in UiSprite.list : only if type=="normal" UiSprite : 
        UiSprite.list.forEach(sp => {
            sp.forEach(s => {
                s.draw(ctx);
            })
        });

        // LanguageScreen.mainList.forEach(sp => {
        //     sp.draw(ctx);
        // });

        Button.draw();

        ctx.fillStyle = "rgb(255,255,255)";
        ctx.font = "20px UD Digi Kyokasho NK-R";

        /*
        * DEBUG
        */
        if (bDebug) {

            // ctx.fillStyle = "rgb(255,255,255)";
            // LANG["lang_code"] == "jp" ? ctx.font = "10px jpfont" : ctx.font = "16px pgfont";

            // ctx.fillText("sprites : " + Sprite.list.length, 0, 100);
            // ctx.fillText("UIsprites : " + UiSprite.list.length, 0, 110);
            // ctx.fillText("dt: " + debugDt, 0, 120);
        }

        // ctx.font = "10px UD Digi Kyokasho NK-R";
        ctx.font = "10px jpfont";

        ctx.fillText("あいうえお", 200, 50);
        ctx.fillText("かきくけこ", 200, 60);
        ctx.fillText("さしすせそ", 200, 70);
        ctx.fillText("たちつてと", 200, 80);
        ctx.fillText("なにぬねの", 200, 90);
        ctx.fillText("はひふへほ", 200, 100);
        ctx.fillText("まみむめも", 200, 110);
        ctx.fillText("や　ゆ　よ", 200, 120);
        ctx.fillText("らりるれろ", 200, 130);
        ctx.fillText("わ　　　を", 200, 140);
        ctx.fillText("ん", 200, 150);

        ctx.fillText("アイウエオ", 250, 50);
        ctx.fillText("カキクケコ", 250, 60);
        ctx.fillText("サシスセソ", 250, 70);
        ctx.fillText("タチツテト", 250, 80);
        ctx.fillText("ナニヌネノ", 250, 90);
        ctx.fillText("ハヒフヘホ", 250, 100);
        ctx.fillText("マミムメモ", 250, 110);
        ctx.fillText("ヤ　ユ　ヨ", 250, 120);
        ctx.fillText("ラリルレロ", 250, 130);
        ctx.fillText("ワ　　　ヲ", 250, 140);
        ctx.fillText("ン", 250, 150);


        ctx.fillText("憂鬱", 10, CANVAS_HEIGHT - 20);



        // --------------- END DEBUG


    }

}


/**
 * DEBUG
 */

// -------------------- END DEBUG