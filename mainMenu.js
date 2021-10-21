class MainMenu {

    static list = [];
    static randomKanaSpriteList = [];
    static mainList = [];
    static optionsList = [];
    static creditsList = [];

    static bInit = false;
    static bTitleFinish = false;

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


        // let animation = new Sprite({ w: 16, h: 16 }, 50, 100, null);
        // animation.addAnimation("normal", { x: 228, y: 83 }, 5, 0.1, false);
        // animation.changeAnimation("normal");
        // MainMenu.mainList.push(animation);

        // let TESTbtn = new Button({ w: 60, h: 31 }, 50, 200, null, null, "mainmenu", MainMenu.STATE.Main, "", 0, true);
        // TESTbtn.getSprite().addAnimation("normal", { x: 342, y: 408 });
        // TESTbtn.getSprite().addAnimation("hover", { x: 402, y: 408 }, 6, 0.05, false);
        // TESTbtn.getSprite().addAnimation("down", { x: 402, y: 408 });
        // TESTbtn.getSprite().changeAnimation("normal");
        // MainMenu.mainList.push(TESTbtn.getSprite());


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

        MainMenu.bInit = true;

        let titleImg = new Sprite({ w: 178, h: 101 }, centerX(178), -101, null, "t");
        titleImg.addAnimation("normal", { x: 382, y: 0 });
        titleImg.changeAnimation("normal");
        titleImg.setDestination({ x: centerX(178), y: centerY(101) });
        titleImg.setMoveSpeed(titleSpeed); // normal : 2
        MainMenu.mainList.push(titleImg);

        let subtitleImg = new Sprite({ w: 129, h: 36 }, centerX(129) + 5, 106, null, "mainmenu");
        subtitleImg.addAnimation("normal", { x: 574, y: 0 });
        subtitleImg.changeAnimation("normal");
        subtitleImg.setAlpha(0);
        MainMenu.mainList.push(subtitleImg);

        let hiraAImg = new Sprite({ w: 50, h: 50 }, centerX(50, 110), 0, null, "tm");
        hiraAImg.addAnimation("normal", { x: 574, y: 36 });
        hiraAImg.changeAnimation("normal");
        hiraAImg.setDestination({ x: centerX(50, 110), y: 28 });
        hiraAImg.setAlpha(0);
        MainMenu.mainList.push(hiraAImg);

        let kataAImg = new Sprite({ w: 50, h: 50 }, centerX(50, 110, 1), 28, null, "tm");
        kataAImg.addAnimation("normal", { x: 624, y: 36 });
        kataAImg.changeAnimation("normal");
        kataAImg.setDestination({ x: centerX(50, 110, 1), y: 0 });
        kataAImg.setDirection(-1);
        kataAImg.setAlpha(0);
        MainMenu.mainList.push(kataAImg);

        // let flagImg = new Sprite({ w: 20, h: 17 }, 288, 44, null, "mainmenu");
        // let flagImg = new Sprite({ w: 21, h: 17 }, 300, 64, null, "fl");
        let flagImg = new Sprite({ w: 21, h: 17 }, 165, 58, titleImg, "fl");
        flagImg.addAnimation("close", { x: 382, y: 118 });
        flagImg.addAnimation("open", { x: 382, y: 118 }, 3, [0.15, 0.06, 0.3], false);
        flagImg.addAnimation("normal", { x: 382, y: 101 }, 6, 0.2);
        flagImg.setAnimationCB("open", { cb: flagImg.changeAnimation.bind(flagImg), arg: "normal" });
        flagImg.changeAnimation("close");
        MainMenu.mainList.push(flagImg);




        let creditsBtn = new Button({ w: 110, h: 22, v: 8 }, centerX(110), 360, null, { cb: MainMenu.changeState, arg: MainMenu.STATE.Credits }, "mainmenu", MainMenu.STATE.Main, "Credits", 4);
        creditsBtn.setFontColor("rgba(142,45,45,1)");
        creditsBtn.setDestination({ x: centerX(110), y: 265 });
        creditsBtn.setCanMove(true);
        creditsBtn.setMovingSpeed(0.8);
        MainMenu.mainList.push(creditsBtn.getSprite());

        let optionsBtn = new Button({ w: 110, h: 22, v: 8 }, centerX(110), 350, null, { cb: MainMenu.changeState, arg: MainMenu.STATE.Options }, "mainmenu", MainMenu.STATE.Main, "Settings", 4);
        optionsBtn.setFontColor("rgba(142,45,45,1)");
        optionsBtn.setDestination({ x: centerX(110), y: 237 });
        optionsBtn.setCanMove(true);
        optionsBtn.setMovingSpeed(0.75);
        MainMenu.mainList.push(optionsBtn.getSprite());

        let infosBtn = new Button({ w: 110, h: 22, v: 8 }, centerX(110), 340, null, { cb: changeMainState, arg: { state: MAIN_STATE.Infos, from: "mainmenu" } }, "mainmenu", MainMenu.STATE.Main, "Infos", 4);
        infosBtn.setDestination({ x: centerX(110), y: 209 });
        infosBtn.setCanMove(true);
        infosBtn.setMovingSpeed(0.70);
        infosBtn.setFontColor("rgba(142,45,45,1)");
        MainMenu.mainList.push(infosBtn.getSprite());

        let trainingBtn = new Button({ w: 110, h: 22, v: 8 }, centerX(110), 330, null, null, "mainmenu", MainMenu.STATE.Main, "Training", 4);
        trainingBtn.setDestination({ x: centerX(110), y: 181 });
        trainingBtn.setCanMove(true);
        trainingBtn.setMovingSpeed(0.65);
        trainingBtn.setFontColor("rgba(142,45,45,1)");
        MainMenu.mainList.push(trainingBtn.getSprite());

        let lessonsBtn = new Button({ w: 110, h: 22, v: 8 }, centerX(110), 320, null, { cb: FadeEffect.fade.bind(FadeEffect), arg: { callback: { cb: changeMainState, arg: { state: MAIN_STATE.Lessons, from: "mainmenu" } }, direction: "out", maxTimer: 0.01 } }, "mainmenu", MainMenu.STATE.Main, "Lessons", 4);
        lessonsBtn.setFontColor("rgba(142,45,45,1)");
        lessonsBtn.setDestination({ x: centerX(110), y: 153 });
        lessonsBtn.setCanMove(true);
        lessonsBtn.setMovingSpeed(0.6);
        MainMenu.mainList.push(lessonsBtn.getSprite());

        // this.muteBtn = new Button({ w: 16, h: 14 }, centerX(16, 200, 1), 50, null, MainMenu.muteAction.bind(this), "mainmenu", MainMenu.STATE.Main, "", 0, true);
        // this.muteBtn.getSprite().addAnimation("normal", { x: 96, y: 96 });
        // this.muteBtn.getSprite().addAnimation("hover", { x: 112, y: 96 });
        // this.muteBtn.getSprite().addAnimation("down", { x: 128, y: 96 });
        // this.muteBtn.getSprite().changeAnimation("normal");
        // MainMenu.mainList.push(this.muteBtn.getSprite());

        // ---------------- OPTIONS ----------------

        let volumePanel = new Panel({ w: 54, h: 20, v: 5 }, centerX(54), 50, null, "mainmenu", MainMenu.STATE.Options, "Volume", 1);
        volumePanel.setTextCase("all");
        MainMenu.optionsList.push(volumePanel.getSprite());

        let musicDownBtn = new Button({ w: 16, h: 16 }, centerX(16, 20), 80, null, Sound.decreaseMusicVolume, "mainmenu", MainMenu.STATE.Options, "", 0, true);
        musicDownBtn.getSprite().addAnimation("normal", { x: 0, y: 96 });
        musicDownBtn.getSprite().addAnimation("hover", { x: 16, y: 96 });
        musicDownBtn.getSprite().addAnimation("down", { x: 32, y: 96 });
        musicDownBtn.getSprite().changeAnimation("normal");
        MainMenu.optionsList.push(musicDownBtn.getSprite());

        let musicUpBtn = new Button({ w: 16, h: 16 }, centerX(16, 20, 1), 80, null, Sound.increaseMusicVolume, "mainmenu", MainMenu.STATE.Options, "", 0, true);
        musicUpBtn.getSprite().addAnimation("normal", { x: 48, y: 96 });
        musicUpBtn.getSprite().addAnimation("hover", { x: 64, y: 96 });
        musicUpBtn.getSprite().addAnimation("down", { x: 80, y: 96 });
        musicUpBtn.getSprite().changeAnimation("normal");
        MainMenu.optionsList.push(musicUpBtn.getSprite());

        let sfxDownBtn = new Button({ w: 16, h: 16 }, centerX(16, 20), 110, null, Sound.decreaseSfxVolume, "mainmenu", MainMenu.STATE.Options, "", 0, true);
        sfxDownBtn.getSprite().addAnimation("normal", { x: 0, y: 96 });
        sfxDownBtn.getSprite().addAnimation("hover", { x: 16, y: 96 });
        sfxDownBtn.getSprite().addAnimation("down", { x: 32, y: 96 });
        sfxDownBtn.getSprite().changeAnimation("normal");
        MainMenu.optionsList.push(sfxDownBtn.getSprite());

        let sfxUpBtn = new Button({ w: 16, h: 16 }, centerX(16, 20, 1), 110, null, Sound.increaseSfxVolume, "mainmenu", MainMenu.STATE.Options, "", 0, true);
        sfxUpBtn.getSprite().addAnimation("normal", { x: 48, y: 96 });
        sfxUpBtn.getSprite().addAnimation("hover", { x: 64, y: 96 });
        sfxUpBtn.getSprite().addAnimation("down", { x: 80, y: 96 });
        sfxUpBtn.getSprite().changeAnimation("normal");
        MainMenu.optionsList.push(sfxUpBtn.getSprite());


        let deleteSaveBtn = new Button({ w: 60, h: 20, v: 4 }, centerX(60), 150, null, SaveManager.delete, "mainmenu", MainMenu.STATE.Options, "delete_save");
        MainMenu.optionsList.push(deleteSaveBtn.getSprite());

        let optionsBackBtn = new Button({ w: 30, h: 22 }, centerX(30), 180, null, toMainMenu, "mainmenu", MainMenu.STATE.Options, "", 0, true);
        optionsBackBtn.getSprite().addAnimation("normal", { x: 86, y: 56 });
        optionsBackBtn.getSprite().addAnimation("hover", { x: 116, y: 56 });
        optionsBackBtn.getSprite().addAnimation("down", { x: 146, y: 56 });
        optionsBackBtn.getSprite().changeAnimation("normal");
        MainMenu.optionsList.push(optionsBackBtn.getSprite());



        // ---------------- CREDITS ----------------

        let jadonagamesLogo = new Sprite({ w: 37, h: 34 }, centerX(37), centerY(34), null, "mainmenu");
        jadonagamesLogo.addAnimation("normal", { x: 0, y: 0 });
        jadonagamesLogo.changeAnimation("normal");
        MainMenu.creditsList.push(jadonagamesLogo);

        let creditsBackBtn = new Button({ w: 30, h: 22 }, centerX(30), centerY(22, 50, 1), null, toMainMenu, "mainmenu", MainMenu.STATE.Credits, "", 0, true);
        creditsBackBtn.getSprite().addAnimation("normal", { x: 86, y: 56 });
        creditsBackBtn.getSprite().addAnimation("hover", { x: 116, y: 56 });
        creditsBackBtn.getSprite().addAnimation("down", { x: 146, y: 56 });
        creditsBackBtn.getSprite().changeAnimation("normal");
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

        let randomKana = new KanaBgSprite({ w: 10, h: 10 }, randomX, randomY, null, "rndkana"); // "rndkana" juste pour ne pas entrer dans la Sprite.list
        randomKana.setDirection(direction);
        randomKana.addAnimation("normal", { x: MainMenu.randomKanaList[randomKanaIndex].x, y: MainMenu.randomKanaList[randomKanaIndex].y });
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

        Button.currentList.forEach(b => {
            if (b.bMoving) {
                b.update(dt);
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

        if (Transition.bActive) {
            Transition.update(dt);
        }
    }

    static draw(ctx) {

        Sprite.manageBeforeDrawing(MainMenu.randomKanaSpriteList);

        Particles.list.forEach(p => {
            p.draw(ctx);
        });

        switch (MainMenu.state) {
            case MainMenu.STATE.Main:
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

        if (Transition.bActive) {
            Transition.draw(ctx);
        }
    }

    static particles(pX, pY) {
        for (let i = 0; i < 10; i++) {
            let size = rnd(1, 3);
            // let p = new Particles(pX, pY, rnd(-2, 3), rnd(-2, 3), 0, { w: size, h: size }, rnd(1, 3));
            let p = new Particles(pX, pY, rnd(-2, 3), rnd(-2, 3), 0, { w: 1, h: 1 }, rnd(1, 3));
        }
    }


    static particles2(pX, pY) {
        for (let i = 0; i < 10; i++) {
            let size = rnd(1, 3);
            let rndOffsetX = rnd(1, 10);
            let rndOffsetY = rnd(1, 5);
            let p = new Particles(pX + rndOffsetX, pY + rndOffsetY, 1, -1, 0, { w: size, h: size }, rnd(1, 3));
            p.setColor("rgba(150, 150, 150, 1)");
        }
    }
}