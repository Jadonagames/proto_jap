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
        let testPanel = new Panel({ w: 100, h: 120, v: 5 }, centerX(100, 80, 1), 60, null, "LanguageScreen", LanguageScreen.STATE.Main, "start", 1);

        let hiraAnim = new UiSprite({ w: 9, h: 10 }, centerX(9, 120, 1), 80, "normal");
        hiraAnim.addAnimation("idle", 8, { x: 0, y: 112 }, 0.2, true);
        hiraAnim.changeAnimation("idle");
        // LanguageScreen.list.push(hiraAnim);


        frBtn.setTooltip(testPanel);
        frBtn.setTooltip(hiraAnim);
        frBtn.setHoverCB(displayTooltip, { list: "LanguageScreen", tooltip: frBtn.getTooltip() });

        let enBtn = new Button({ w: 54, h: 20, v: 4 }, centerX(54), 110, { cb: LanguageScreen.changeLanguage, arg: "en" }, "LanguageScreen", LanguageScreen.STATE.Main, "english_lang");
        enBtn.setTextCase("all");
        LanguageScreen.list.push(enBtn.getSprite());
        let jpBtn = new Button({ w: 54, h: 20, v: 4 }, centerX(54), 140, { cb: LanguageScreen.changeLanguage, arg: "jp" }, "LanguageScreen", LanguageScreen.STATE.Main, "japanese_lang");
        LanguageScreen.list.push(jpBtn.getSprite());

        let muteBtn = new Button({ w: 16, h: 14 }, 250, 50, null, "LanguageScreen", LanguageScreen.STATE.Main, "", 0, true);
        muteBtn.getSprite().addAnimation("normal", 1, { x: 96, y: 96 }, 0.1);
        muteBtn.getSprite().addAnimation("hover", 1, { x: 112, y: 96 }, 0.1);
        muteBtn.getSprite().addAnimation("down", 1, { x: 128, y: 96 }, 0.1);
        muteBtn.getSprite().changeAnimation("normal");
        LanguageScreen.list.push(muteBtn.getSprite());

        let labelStatic = new Button({ w: 38, h: 24 }, 50, 50, null, "LanguageScreen", LanguageScreen.STATE.Main, "start", 0, true);
        labelStatic.getSprite().addAnimation("normal", 1, { x: 11, y: 57 }, 0.1);
        labelStatic.getSprite().addAnimation("hover", 1, { x: 11, y: 57 }, 0.1);
        labelStatic.getSprite().addAnimation("down", 1, { x: 11, y: 57 }, 0.1);
        labelStatic.getSprite().changeAnimation("normal");
        LanguageScreen.list.push(labelStatic.getSprite());

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

        Panel.resetTypeState("LanguageScreen", LanguageScreen.STATE.Main);
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
        LanguageScreen.list = LanguageScreen.list.filter(sp => {
            return !sp.delete;
        });
        Button.currentList.forEach(b => {
            // if (b.hoverCB) {
            //     if (b.state != Button.STATE.Hover) {
            //         b.getTooltip().getSprite().delete = true;
            //     }
            // }
            if (!b.staticSize) {
                for (const sp in b.getSprite()) {
                }
            } else {

            }
        });
        LanguageScreen.list.forEach(sp => {
            if (sp.class == "dynamic") {
                for (const s in sp) {
                    if (sp[s] instanceof UiSprite) {
                        sp[s].update(dt);
                    }
                }
            } else {
                sp.update(dt);
            }
        })
    }

    static draw(ctx) {

        if (!debug_STOP) {
            LanguageScreen.list.forEach(sp => {
                if (sp.class == "dynamic") {
                    for (const s in sp) {
                        if (sp[s] instanceof UiSprite) {
                            sp[s].draw(ctx);
                        } else if (s == "parent") {
                            if (sp[s].label != "") {
                                sp[s].drawLabel(ctx);
                            }
                        }
                    }
                } else {
                    if (sp.class == "button" || sp.class == "panel") { // ou if parent instanceof Button / Panel etc.
                        sp.draw(ctx);
                        if (sp.getParent() && sp.getParent().label != "") {
                            sp.getParent().drawLabel(ctx);
                        }
                    } else {
                        sp.draw(ctx);
                    }
                }

            })
            // debug_STOP = true;
        }


        ctx.fillStyle = "rgb(255,255,255)";
        // ctx.font = "20px UD Digi Kyokasho NK-R";

        /*
        * DEBUG
        */
        if (bDebug) {

            ctx.fillStyle = "rgb(255,255,255)";
            // LANG["lang_code"] == "jp" ? ctx.font = "10px jpfont" : ctx.font = "16px pgfont";
            // ctx.fillText("sprites : " + Sprite.list.length, 0, 100);
            ctx.fillText("languagescreen : " + LanguageScreen.list.length, 0, 100);
            // ctx.fillText("dt: " + debugDt, 0, 120);
        }

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


        ctx.fillText("憂鬱", 10, CANVAS_HEIGHT - 20);



        // --------------- END DEBUG


    }

}


/**
 * DEBUG
 */

// -------------------- END DEBUG