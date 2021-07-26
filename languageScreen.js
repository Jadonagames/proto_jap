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

        let frBtn = new Button({ w: 32, h: 16 }, centerX(32), 80, { cb: LanguageScreen.changeLanguage, arg: "fr" }, "LanguageScreen", LanguageScreen.STATE.Main, "french_lang");
        frBtn.getSprite().addAnimation("normal", 1, { x: 384, y: 48 }, 0.1);
        frBtn.getSprite().addAnimation("hover", 1, { x: 416, y: 48 }, 0.1);
        frBtn.getSprite().addAnimation("down", 1, { x: 448, y: 48 }, 0.1);
        frBtn.getSprite().changeAnimation("normal");
        LanguageScreen.mainList.push(frBtn.getSprite());

        let enBtn = new Button({ w: 32, h: 16 }, centerX(32), 100, { cb: LanguageScreen.changeLanguage, arg: "en" }, "LanguageScreen", LanguageScreen.STATE.Main, "english_lang");
        enBtn.getSprite().addAnimation("normal", 1, { x: 384, y: 48 }, 0.1);
        enBtn.getSprite().addAnimation("hover", 1, { x: 416, y: 48 }, 0.1);
        enBtn.getSprite().addAnimation("down", 1, { x: 448, y: 48 }, 0.1);
        enBtn.getSprite().changeAnimation("normal");
        LanguageScreen.mainList.push(enBtn.getSprite());

        let jpBtn = new Button({ w: 32, h: 16 }, centerX(32), 120, { cb: LanguageScreen.changeLanguage, arg: "jp" }, "LanguageScreen", LanguageScreen.STATE.Main, "japanese_lang");
        jpBtn.getSprite().addAnimation("normal", 1, { x: 384, y: 48 }, 0.1);
        jpBtn.getSprite().addAnimation("hover", 1, { x: 416, y: 48 }, 0.1);
        jpBtn.getSprite().addAnimation("down", 1, { x: 448, y: 48 }, 0.1);
        jpBtn.getSprite().changeAnimation("normal");
        LanguageScreen.mainList.push(jpBtn.getSprite());


        let test1Btn = new Button2({ tl: { w: 4, h: 4 }, tr: { w: 4, h: 4 }, bl: { w: 4, h: 4 }, br: { w: 4, h: 4 }, t: { w: 1, h: 4 }, r: { w: 4, h: 1 }, b: { w: 1, h: 4 }, l: { w: 4, h: 1 }, c: { w: 1, h: 1 } }, 20, 50, { cb: LanguageScreen.changeLanguage, arg: "fr" }, "LanguageScreen", LanguageScreen.STATE.Main, "game_over");
        test1Btn.getSprite().tl.addAnimation("normal", 1, { x: 480, y: 48 }, 0.1);//ok
        test1Btn.getSprite().tl.changeAnimation("normal");
        test1Btn.getSprite().tr.addAnimation("normal", 1, { x: 492, y: 48 }, 0.1);//ok
        test1Btn.getSprite().tr.changeAnimation("normal");
        test1Btn.getSprite().bl.addAnimation("normal", 1, { x: 480, y: 60 }, 0.1);//ok
        test1Btn.getSprite().bl.changeAnimation("normal");
        test1Btn.getSprite().br.addAnimation("normal", 1, { x: 492, y: 60 }, 0.1);//ok
        test1Btn.getSprite().br.changeAnimation("normal");
        test1Btn.getSprite().t.addAnimation("normal", 1, { x: 486, y: 48 }, 0.1);//ok
        test1Btn.getSprite().t.changeAnimation("normal");
        test1Btn.getSprite().r.addAnimation("normal", 1, { x: 492, y: 54 }, 0.1);//ok
        test1Btn.getSprite().r.changeAnimation("normal");
        test1Btn.getSprite().b.addAnimation("normal", 1, { x: 486, y: 60 }, 0.1);//ok
        test1Btn.getSprite().b.changeAnimation("normal");
        test1Btn.getSprite().l.addAnimation("normal", 1, { x: 480, y: 54 }, 0.1);//ok
        test1Btn.getSprite().l.changeAnimation("normal");
        test1Btn.getSprite().c.addAnimation("normal", 1, { x: 486, y: 54 }, 0.1);//ok
        test1Btn.getSprite().c.changeAnimation("normal");
        LanguageScreen.mainList.push(test1Btn.getSprite());

        let test2Btn = new Button2({ tl: { w: 4, h: 4 }, tr: { w: 4, h: 4 }, bl: { w: 4, h: 4 }, br: { w: 4, h: 4 }, t: { w: 1, h: 4 }, r: { w: 4, h: 1 }, b: { w: 1, h: 4 }, l: { w: 4, h: 1 }, c: { w: 1, h: 1 } }, 20, 75, { cb: LanguageScreen.changeLanguage, arg: "fr" }, "LanguageScreen", LanguageScreen.STATE.Main, "game_over");
        test2Btn.getSprite().tl.addAnimation("normal", 1, { x: 480, y: 48 }, 0.1);//ok
        test2Btn.getSprite().tl.changeAnimation("normal");
        test2Btn.getSprite().tr.addAnimation("normal", 1, { x: 492, y: 48 }, 0.1);//ok
        test2Btn.getSprite().tr.changeAnimation("normal");
        test2Btn.getSprite().bl.addAnimation("normal", 1, { x: 480, y: 60 }, 0.1);//ok
        test2Btn.getSprite().bl.changeAnimation("normal");
        test2Btn.getSprite().br.addAnimation("normal", 1, { x: 492, y: 60 }, 0.1);//ok
        test2Btn.getSprite().br.changeAnimation("normal");
        test2Btn.getSprite().t.addAnimation("normal", 1, { x: 486, y: 48 }, 0.1);//ok
        test2Btn.getSprite().t.changeAnimation("normal");
        test2Btn.getSprite().r.addAnimation("normal", 1, { x: 492, y: 54 }, 0.1);//ok
        test2Btn.getSprite().r.changeAnimation("normal");
        test2Btn.getSprite().b.addAnimation("normal", 1, { x: 486, y: 60 }, 0.1);//ok
        test2Btn.getSprite().b.changeAnimation("normal");
        test2Btn.getSprite().l.addAnimation("normal", 1, { x: 480, y: 54 }, 0.1);//ok
        test2Btn.getSprite().l.changeAnimation("normal");
        test2Btn.getSprite().c.addAnimation("normal", 1, { x: 486, y: 54 }, 0.1);//ok
        test2Btn.getSprite().c.changeAnimation("normal");
        LanguageScreen.mainList.push(test2Btn.getSprite());

        let test3Btn = new Button2({ tl: { w: 4, h: 4 }, tr: { w: 4, h: 4 }, bl: { w: 4, h: 4 }, br: { w: 4, h: 4 }, t: { w: 1, h: 4 }, r: { w: 4, h: 1 }, b: { w: 1, h: 4 }, l: { w: 4, h: 1 }, c: { w: 1, h: 1 } }, 20, 100, { cb: LanguageScreen.changeLanguage, arg: "fr" }, "LanguageScreen", LanguageScreen.STATE.Main, "game_over");
        test3Btn.getSprite().tl.addAnimation("normal", 1, { x: 480, y: 48 }, 0.1);//ok
        test3Btn.getSprite().tl.changeAnimation("normal");
        test3Btn.getSprite().tr.addAnimation("normal", 1, { x: 492, y: 48 }, 0.1);//ok
        test3Btn.getSprite().tr.changeAnimation("normal");
        test3Btn.getSprite().bl.addAnimation("normal", 1, { x: 480, y: 60 }, 0.1);//ok
        test3Btn.getSprite().bl.changeAnimation("normal");
        test3Btn.getSprite().br.addAnimation("normal", 1, { x: 492, y: 60 }, 0.1);//ok
        test3Btn.getSprite().br.changeAnimation("normal");
        test3Btn.getSprite().t.addAnimation("normal", 1, { x: 486, y: 48 }, 0.1);//ok
        test3Btn.getSprite().t.changeAnimation("normal");
        test3Btn.getSprite().r.addAnimation("normal", 1, { x: 492, y: 54 }, 0.1);//ok
        test3Btn.getSprite().r.changeAnimation("normal");
        test3Btn.getSprite().b.addAnimation("normal", 1, { x: 486, y: 60 }, 0.1);//ok
        test3Btn.getSprite().b.changeAnimation("normal");
        test3Btn.getSprite().l.addAnimation("normal", 1, { x: 480, y: 54 }, 0.1);//ok
        test3Btn.getSprite().l.changeAnimation("normal");
        test3Btn.getSprite().c.addAnimation("normal", 1, { x: 486, y: 54 }, 0.1);//ok
        test3Btn.getSprite().c.changeAnimation("normal");
        LanguageScreen.mainList.push(test3Btn.getSprite());




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

        UiSprite.list.forEach(sp => {
            sp.forEach(s => {
                s.draw(ctx);
            })
        });

        // LanguageScreen.mainList.forEach(sp => {
        //     sp.draw(ctx);
        // });

        Button.currentList.forEach(b => {
            if (b.getSprite().tl == null) {
                b.getSprite().draw(ctx);
            } else {
                b.getSprite().tl.draw(ctx);
                b.getSprite().tr.draw(ctx);
                b.getSprite().bl.draw(ctx);
                b.getSprite().br.draw(ctx);
                b.getSprite().t.draw(ctx);
                b.getSprite().r.draw(ctx);
                b.getSprite().b.draw(ctx);
                b.getSprite().l.draw(ctx);
                b.getSprite().c.draw(ctx);
            }
            if (b.label != "") {
                b.drawLabel(ctx);
            }

        });

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

        ctx.fillText("なんと　ピクセル・エムプラスをみつけた。", 0, 10);


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