class MainMenu {

    static list = [];
    static randomKanaSpriteList = [];
    static mainList = [];
    static optionsList = [];
    static creditsList = [];

    static bInit = false;

    kanaInterval = null;
    muteBtn = null;


    static STATE = Object.freeze({
        Main: 0,
        Options: 1,
        Credits: 2,
        Transition: 3
    })

    static state = MainMenu.STATE.Main;

    static randomKanaList = [];

    constructor() {

    }

    static init() {


        // this.hira = "|あ|い|う|え|お|か|き|く|け|こ|さ|し|す|せ|そ|た|ち|つ|て|と|な|に|ぬ|ね|の|は|ひ|ふ|へ|ほ|ま|み|む|め|も|や|ゆ|よ|ら|り|る|れ|ろ|わ|を|ん|";
        // this.hira2 = "|が|ぎ|ぐ|げ|ご|ざ|じ|ず|ぜ|ぞ|だ|ぢ|づ|で|ど|ば|び|ぶ|べ|ぼ|ぱ|ぴ|ぷ|ぺ|ぽ|";
        // this.kata = "|ア|イ|ウ|エ|オ|カ|キ|ク|ケ|コ|サ|シ|ス|セ|ソ|タ|チ|ツ|テ|ト|ナ|ニ|ヌ|ネ|ノ|ハ|ヒ|フ|ヘ|ホ|マ|ミ|ム|メ|モ|ヤ|ユ|ヨ|ラ|リ|ル|レ|ロ|ワ|ヲ|ン|";
        // this.kata2 = "|ガ|ギ|グ|ゲ|ゴ|ザ|ジ|ズ|ゼ|ゾ|ダ|ヂ|ヅ|デ|ド|バ|ビ|ブ|ベ|ボ|パ|ピ|プ|ペ|ポ|";

        // 722 . 136 // 4 rows // 23 cols
        MainMenu.randomKanaList = [];
        let x = 722;
        let count = 0;
        let y = 136;
        for (let i = 0; i < 92; i++) {
            MainMenu.randomKanaList.push({ x: x, y: y });
            x += 10;
            count++;
            if (count == 23) {
                count = 0;
                y += 10;
                x = 722;
            }
        }

        MainMenu.initKanaInterval();

        MainMenu.bInit = true;

        let lessonsBtn = new Button({ w: 54, h: 20, v: 4 }, centerX(54), 130, null, { cb: changeMainState, arg: { state: MAIN_STATE.Lessons, from: "mainmenu" } }, "mainmenu", MainMenu.STATE.Main, "Lessons");
        MainMenu.mainList.push(lessonsBtn.getSprite());

        let trainingBtn = new Button({ w: 54, h: 20, v: 4 }, centerX(54), 160, null, null, "mainmenu", MainMenu.STATE.Main, "Training");
        MainMenu.mainList.push(trainingBtn.getSprite());

        let infosBtn = new Button({ w: 54, h: 20, v: 4 }, centerX(54), 190, null, { cb: changeMainState, arg: { state: MAIN_STATE.Infos, from: "mainmenu" } }, "mainmenu", MainMenu.STATE.Main, "Infos");
        MainMenu.mainList.push(infosBtn.getSprite());

        let optionsBtn = new Button({ w: 54, h: 20, v: 4 }, centerX(54), 220, null, { cb: MainMenu.changeState, arg: MainMenu.STATE.Options }, "mainmenu", MainMenu.STATE.Main, "Settings");
        MainMenu.mainList.push(optionsBtn.getSprite());

        let creditsBtn = new Button({ w: 54, h: 20, v: 4 }, centerX(54), 250, null, { cb: MainMenu.changeState, arg: MainMenu.STATE.Credits }, "mainmenu", MainMenu.STATE.Main, "Credits");
        MainMenu.mainList.push(creditsBtn.getSprite());


        this.muteBtn = new Button({ w: 16, h: 14 }, centerX(16, 200, 1), 50, null, MainMenu.muteAction.bind(this), "mainmenu", MainMenu.STATE.Main, "", 0, true);
        this.muteBtn.getSprite().addAnimation("normal", 1, { x: 96, y: 96 }, 0.1);
        this.muteBtn.getSprite().addAnimation("hover", 1, { x: 112, y: 96 }, 0.1);
        this.muteBtn.getSprite().addAnimation("down", 1, { x: 128, y: 96 }, 0.1);
        this.muteBtn.getSprite().changeAnimation("normal");
        MainMenu.mainList.push(this.muteBtn.getSprite());


        //TODO 
        //! DELETE
        // -------------- TEST ------------------

        // let testPanel = new Panel({ w: 114, h: 136 }, 70, 100, null, "mainmenu", MainMenu.STATE.Main, "", 0, true);
        // testPanel.getSprite().addAnimation("normal", 1, { x: 570, y: 0 }, 0.1);
        // testPanel.getSprite().changeAnimation("normal");
        // MainMenu.mainList.push(testPanel.getSprite());

        // let testPanelChild = new Panel({ w: 54, h: 24 }, 30, 10, testPanel, "mainmenu", MainMenu.STATE.Main, "roma_a", 0, true);
        // testPanelChild.getSprite().addAnimation("normal", 1, { x: 684, y: 0 }, 0.1);
        // testPanelChild.getSprite().changeAnimation("normal");
        // MainMenu.mainList.push(testPanelChild.getSprite());

        // let buttonTestPanelChild = new Button({ w: 40, h: 20 }, 36, 80, testPanel, null, "mainmenu", MainMenu.STATE.Main, "Back", 0, true);
        // buttonTestPanelChild.getSprite().addAnimation("normal", 1, { x: 684, y: 24 }, 0.1);
        // buttonTestPanelChild.getSprite().addAnimation("hover", 1, { x: 724, y: 24 }, 0.1);
        // buttonTestPanelChild.getSprite().addAnimation("down", 1, { x: 764, y: 24 }, 0.1);
        // buttonTestPanelChild.getSprite().changeAnimation("normal");
        // MainMenu.mainList.push(buttonTestPanelChild.getSprite());

        // // ----------- TEST NOT STATIC ----------
        // let testPanel2 = new Panel({ w: 114, h: 140, v: 7 }, centerX(114, 95, 1), 98, null, "mainmenu", MainMenu.STATE.Main, "", 12);
        // testPanel2.setOffsets(5, 15);
        // MainMenu.mainList.push(testPanel2.getSprite());

        // let testPanelChild2 = new Panel({ w: 56, h: 26, v: 6 }, 30, 11, testPanel2, "mainmenu", MainMenu.STATE.Main, "roma_a", 11);
        // testPanelChild2.setOffsets(5, 14);
        // MainMenu.mainList.push(testPanelChild2.getSprite());

        // let buttonTestPanelChild2 = new Button({ w: 40, h: 21, v: 5 }, 36, 80, testPanel2, null, "mainmenu", MainMenu.STATE.Main, "Back", 1);
        // MainMenu.mainList.push(buttonTestPanelChild2.getSprite());



        // let testAnimatedBtn = new Button({ w: 40, h: 21, v: 5 }, 36, 110, testPanel2, null, "mainmenu", MainMenu.STATE.Main, "Back", 11);
        // MainMenu.mainList.push(testAnimatedBtn.getSprite());


        // let animatedSprite = new Sprite({ w: 6, h: 6 }, 50, 50, null, "mainmenu");
        // animatedSprite.addAnimation("normal", 4, { x: 76, y: 62 }, 0.2);
        // animatedSprite.changeAnimation("normal");
        // MainMenu.mainList.push(animatedSprite);


        // let animatedSprite2 = new Sprite({ w: 11, h: 11 }, 50, 100, null, "mainmenu");
        // animatedSprite2.addAnimation("normal", 4, { x: 114, y: 0 }, 0.2);
        // animatedSprite2.changeAnimation("normal");
        // MainMenu.mainList.push(animatedSprite2);

        // --------------------------------------




        // ---------------- OPTIONS ----------------

        let volumePanel = new Panel({ w: 54, h: 20, v: 5 }, centerX(54), 50, null, "mainmenu", MainMenu.STATE.Options, "Volume", 1);
        volumePanel.setTextCase("all");
        MainMenu.optionsList.push(volumePanel.getSprite());

        let musicDownBtn = new Button({ w: 16, h: 16 }, centerX(16, 20), 80, null, Sound.decreaseMusicVolume, "mainmenu", MainMenu.STATE.Options, "", 0, true);
        musicDownBtn.getSprite().addAnimation("normal", 1, { x: 0, y: 96 }, 0.1);
        musicDownBtn.getSprite().addAnimation("hover", 1, { x: 16, y: 96 }, 0.1);
        musicDownBtn.getSprite().addAnimation("down", 1, { x: 32, y: 96 }, 0.1);
        musicDownBtn.getSprite().changeAnimation("normal");
        MainMenu.optionsList.push(musicDownBtn.getSprite());

        let musicUpBtn = new Button({ w: 16, h: 16 }, centerX(16, 20, 1), 80, null, Sound.increaseMusicVolume, "mainmenu", MainMenu.STATE.Options, "", 0, true);
        musicUpBtn.getSprite().addAnimation("normal", 1, { x: 48, y: 96 }, 0.1);
        musicUpBtn.getSprite().addAnimation("hover", 1, { x: 64, y: 96 }, 0.1);
        musicUpBtn.getSprite().addAnimation("down", 1, { x: 80, y: 96 }, 0.1);
        musicUpBtn.getSprite().changeAnimation("normal");
        MainMenu.optionsList.push(musicUpBtn.getSprite());

        let sfxDownBtn = new Button({ w: 16, h: 16 }, centerX(16, 20), 110, null, Sound.decreaseSfxVolume, "mainmenu", MainMenu.STATE.Options, "", 0, true);
        sfxDownBtn.getSprite().addAnimation("normal", 1, { x: 0, y: 96 }, 0.1);
        sfxDownBtn.getSprite().addAnimation("hover", 1, { x: 16, y: 96 }, 0.1);
        sfxDownBtn.getSprite().addAnimation("down", 1, { x: 32, y: 96 }, 0.1);
        sfxDownBtn.getSprite().changeAnimation("normal");
        MainMenu.optionsList.push(sfxDownBtn.getSprite());

        let sfxUpBtn = new Button({ w: 16, h: 16 }, centerX(16, 20, 1), 110, null, Sound.increaseSfxVolume, "mainmenu", MainMenu.STATE.Options, "", 0, true);
        sfxUpBtn.getSprite().addAnimation("normal", 1, { x: 48, y: 96 }, 0.1);
        sfxUpBtn.getSprite().addAnimation("hover", 1, { x: 64, y: 96 }, 0.1);
        sfxUpBtn.getSprite().addAnimation("down", 1, { x: 80, y: 96 }, 0.1);
        sfxUpBtn.getSprite().changeAnimation("normal");
        MainMenu.optionsList.push(sfxUpBtn.getSprite());


        let deleteSaveBtn = new Button({ w: 60, h: 20, v: 4 }, centerX(60), 150, null, SaveManager.delete, "mainmenu", MainMenu.STATE.Options, "delete_save");
        MainMenu.optionsList.push(deleteSaveBtn.getSprite());


        let optionsBackBtn = new Button({ w: 40, h: 20, v: 4 }, centerX(40), 180, null, toMainMenu, "mainmenu", MainMenu.STATE.Options, "Back");
        MainMenu.optionsList.push(optionsBackBtn.getSprite());


        // ---------------- CREDITS ----------------

        let jadonagamesLogo = new Sprite({ w: 37, h: 34 }, centerX(37), centerY(34), null, "mainmenu");
        jadonagamesLogo.addAnimation("normal", 1, { x: 0, y: 0 }, 0.1);
        jadonagamesLogo.changeAnimation("normal");
        MainMenu.creditsList.push(jadonagamesLogo);

        let creditsBackBtn = new Button({ w: 40, h: 20, v: 4 }, centerX(40), centerY(20, 50, 1), null, toMainMenu, "mainmenu", MainMenu.STATE.Credits, "Back");
        MainMenu.creditsList.push(creditsBackBtn.getSprite());

    }

    static muteAction() {
        this.muteBtn.callback = MainMenu.unMuteAction.bind(this);
        this.muteBtn.getSprite().resetAnimations("normal", { x: 144, y: 96 });
        this.muteBtn.getSprite().resetAnimations("hover", { x: 160, y: 96 });
        this.muteBtn.getSprite().resetAnimations("down", { x: 176, y: 96 });
        Sound.toggleMute();
    }

    static unMuteAction() {
        this.muteBtn.callback = MainMenu.muteAction.bind(this);
        this.muteBtn.getSprite().resetAnimations("normal", { x: 96, y: 96 });
        this.muteBtn.getSprite().resetAnimations("hover", { x: 112, y: 96 });
        this.muteBtn.getSprite().resetAnimations("down", { x: 128, y: 96 });
        Sound.toggleMute();
    }

    static changeState(pNewState) {
        MainMenu.state = pNewState;
        Panel.resetTypeState("mainmenu", pNewState);
        Button.resetTypeState("mainmenu", pNewState);
    }

    static initKanaInterval() {
        Particles.list = [];

        clearInterval(this.kanaInterval);
        this.kanaInterval = setInterval(MainMenu.createRandomKana, 500);
    }

    static clearKanaInterval() {
        clearInterval(this.kanaInterval);
    }

    static createRandomKana() {

        let randomX = 0;
        let randomY = 0;
        let randomKanaIndex = rnd(0, 92);
        let direction = 0;

        if (rnd(0, 2) == 0) {
            let x = [-5, CANVAS_WIDTH - 5]
            randomX = x[rnd(0, 2)];
            randomY = rnd(0, CANVAS_HEIGHT - 11); // MAX non compris
            if (randomX == -5) {
                direction = 1;
            } else if (randomX == CANVAS_WIDTH - 5) {
                direction = 3;
            }

        } else {
            let y = [-5, CANVAS_HEIGHT - 5]
            randomY = y[rnd(0, 2)];
            randomX = rnd(0, CANVAS_WIDTH - 11); // MAX non compris
            if (randomY == -5) {
                direction = 2;
            } else if (randomY == CANVAS_HEIGHT - 5) {
                direction = 0;
            }
        }

        let randomKana = new KanaBgSprite({ w: 10, h: 10 }, randomX, randomY, null);
        randomKana.setDirection(direction);
        randomKana.addAnimation("normal", 1, { x: MainMenu.randomKanaList[randomKanaIndex].x, y: MainMenu.randomKanaList[randomKanaIndex].y }, 0.1);
        randomKana.changeAnimation("normal");
        MainMenu.randomKanaSpriteList.push(randomKana);
    }

    static update(dt) {

        Sprite.manageBeforeUpdating(MainMenu.randomKanaSpriteList, dt);

        Particles.list.forEach(p => {
            if (!p.delete) {
                p.update(dt);
            }
        });


        Panel.currentList.forEach(p => {
            if (p.bMoving) {
                p.children.forEach(c => {
                    if (c instanceof Panel || c instanceof Button) {
                        c.updatePosition();
                    }
                });
            }
            if (p.bFading) {
                p.updateAlpha();
                p.children.forEach(c => {
                    if (c instanceof Panel || c instanceof Button) {
                        c.updateAlpha();
                    }
                });
            }
        });

        Sprite.manageBeforeUpdating(MainMenu.mainList, dt);

        //TODO 
        //! find a solution to not repeat the 2 loops : foreach (update()) then filter (delete)
        // DELETING --------

        MainMenu.randomKanaSpriteList = MainMenu.randomKanaSpriteList.filter(sp => {
            return !sp.delete;
        });

        Particles.list = Particles.list.filter(p => {
            return !p.delete;
        });

        MainMenu.mainList = MainMenu.mainList.filter(sp => {
            return !sp.delete;
        });

        // ------------------

        if (FadeEffect.bActive) {
            FadeEffect.update(dt);
        }
    }

    static draw(ctx) {

        Sprite.manageBeforeDrawing(MainMenu.randomKanaSpriteList);

        Particles.list.forEach(p => {
            p.draw(ctx);
        });

        switch (MainMenu.state) {
            case MainMenu.STATE.Main:

                ctx.fillStyle = "rgb(200,0,0)";
                ctx.font = "40px jpfont";
                ctx.textAlign = "center";
                ctx.shadowColor = "rgb(0,0,0)";
                ctx.shadowOffsetY = 8;
                ctx.fillText("Proto Jap", centerX(), 40);
                ctx.shadowOffsetY = 0;
                ctx.textAlign = "left";

                Sprite.manageBeforeDrawing(MainMenu.mainList);
                break;
            case MainMenu.STATE.Options:

                ctx.fillStyle = "rgb(200,0,0)";
                ctx.font = "40px jpfont";
                ctx.textAlign = "center";
                ctx.shadowColor = "rgb(0,0,0)";
                ctx.shadowOffsetY = 8;
                ctx.fillText(LANG['Settings'], centerX(), 40);
                ctx.shadowOffsetY = 0;
                ctx.textAlign = "left";

                Sprite.manageBeforeDrawing(MainMenu.optionsList);


                ctx.fillStyle = "rgb(0,0,0)";
                ctx.font = "10px jpfont";
                ctx.textAlign = "center";
                ctx.fillText(LANG["bgm"].toUpperCase(), 100, 92);
                ctx.fillText(LANG["sfx"].toUpperCase(), 100, 122);
                ctx.fillText(Math.floor(MUSIC_VOLUME * 10), centerX(), 92);
                ctx.fillText(Math.floor(SFX_VOLUME * 10), centerX(), 122);
                ctx.textAlign = "left";
                break;
            case MainMenu.STATE.Credits:

                ctx.fillStyle = "rgb(200,0,0)";
                ctx.font = "40px jpfont";
                ctx.textAlign = "center";
                ctx.shadowColor = "rgb(0,0,0)";
                ctx.shadowOffsetY = 8;
                ctx.fillText(LANG['Credits'], centerX(), 40);
                ctx.shadowOffsetY = 0;
                ctx.textAlign = "left";

                Sprite.manageBeforeDrawing(MainMenu.creditsList);

                break;
            case MainMenu.STATE.Transition:

                break;
        }


        /**
         * DEBUG
         */
        if (bStatsDebug) {
            ctx.fillStyle = "rgb(255,255,255)";
            ctx.font = "16px pgfont";
            ctx.fillText("ButtonList : " + Button.list.length, 0, 120);
            ctx.fillText("ButtonCurrent : " + Button.currentList.length, 0, 130);
            ctx.fillText("MainMenuList : " + MainMenu.mainList.length, 0, 140);
            ctx.fillText("BGSPRITE List : " + MainMenu.randomKanaSpriteList.length, 0, 300);

            // ctx.font = "kyokasho";

            // ctx.fillText("あいうえお", 120, 50);
            // ctx.fillText("かきくけこ", 120, 55);
            // ctx.fillText("さしすせそ", 120, 60);
            // ctx.fillText("たちつてと", 120, 65);
            // ctx.fillText("なにぬねの", 120, 70);
            // ctx.fillText("はひふへほ", 120, 75);
            // ctx.fillText("まみむめも", 120, 80);
            // ctx.fillText("や　ゆ　よ", 120, 85);
            // ctx.fillText("らりるれろ", 120, 90);
            // ctx.fillText("わ　　　を", 120, 95);
            // ctx.fillText("ん", 120, 100);

            // ctx.fillText("アイウエオ", 160, 50);
            // ctx.fillText("カキクケコ", 160, 55);
            // ctx.fillText("サシスセソ", 160, 60);
            // ctx.fillText("タチツテト", 160, 65);
            // ctx.fillText("ナニヌネノ", 160, 70);
            // ctx.fillText("ハヒフヘホ", 160, 75);
            // ctx.fillText("マミムメモ", 160, 80);
            // ctx.fillText("ヤ　ユ　ヨ", 160, 85);
            // ctx.fillText("ラリルレロ", 160, 90);
            // ctx.fillText("ワ　　　ヲ", 160, 95);
            // ctx.fillText("ン", 160, 100);
        }
        //------------- END DEBUG

        ctx.fillStyle = "rgb(255,255,255)";
        ctx.font = "10px jpfont";
        // ctx.shadowColor = "rgb(0,0,0)";
        // ctx.shadowOffsetX = 0;
        // ctx.shadowOffsetY = 2;
        // ctx.shadowBlur = 0;
        ctx.fillText("Version: 0.1", CANVAS_WIDTH - 66, CANVAS_HEIGHT - 4);
        // ctx.fillText("V", CANVAS_WIDTH - 65, CANVAS_HEIGHT - 13);

        if (FadeEffect.bActive) {
            FadeEffect.draw(ctx);
        }
    }


    // static kanaExplode(pX, pY) {
    //     let newExplosion = new Effect({ w: 10, h: 10 }, pX, pY);
    //     newExplosion.getSprite().setType("todelete", 1); // type, maxLoop
    //     newExplosion.getSprite().addAnimation("normal", 4, { x: 0, y: 160 }, 0.1, false);
    //     newExplosion.getSprite().changeAnimation("normal");
    //     MainMenu.mainList.unshift(newExplosion.getSprite());
    // }

    static particles(pX, pY) {
        for (let i = 0; i < 10; i++) {
            let size = rnd(1, 3);
            // let p = new Particles(pX, pY, rnd(-2, 3), rnd(-2, 3), 0, { w: size, h: size }, rnd(1, 3));
            let p = new Particles(pX, pY, rnd(-2, 3), rnd(-2, 3), 0, { w: 1, h: 1 }, rnd(1, 3));
        }
    }
}