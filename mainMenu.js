class MainMenu {

    static list = [];
    static mainList = [];
    static optionsList = [];
    static creditsList = [];

    static bInit = false;

    muteBtn = null;

    static STATE = Object.freeze({
        Main: 0,
        Options: 1,
        Credits: 2,
        Transition: 3
    })

    static state = MainMenu.STATE.Main;

    constructor() {

    }

    static init() {

        MainMenu.bInit = true;

        // ---------------- MAIN ----------------

        let lessonsBtn = new Button({ w: 54, h: 20, v: 4 }, centerX(54), 130, null, "mainmenu", MainMenu.STATE.Main, "lessons");
        lessonsBtn.setTextCase("first");
        MainMenu.mainList.push(lessonsBtn.getSprite());

        let freeBtn = new Button({ w: 54, h: 20, v: 4 }, centerX(54), 160, null, "mainmenu", MainMenu.STATE.Main, "training");
        freeBtn.setTextCase("first");
        MainMenu.mainList.push(freeBtn.getSprite());

        let infosBtn = new Button({ w: 54, h: 20, v: 4 }, centerX(54), 190, { cb: changeMainState, arg: MAIN_STATE.Infos }, "mainmenu", MainMenu.STATE.Main, "infos");
        infosBtn.setTextCase("first");
        MainMenu.mainList.push(infosBtn.getSprite());

        let optionsBtn = new Button({ w: 54, h: 20, v: 4 }, centerX(54), 220, { cb: MainMenu.changeState, arg: MainMenu.STATE.Options }, "mainmenu", MainMenu.STATE.Main, "settings");
        optionsBtn.setTextCase("first");
        MainMenu.mainList.push(optionsBtn.getSprite());

        let creditsBtn = new Button({ w: 54, h: 20, v: 4 }, centerX(54), 250, { cb: MainMenu.changeState, arg: MainMenu.STATE.Credits }, "mainmenu", MainMenu.STATE.Main, "credits");
        creditsBtn.setTextCase("first");
        MainMenu.mainList.push(creditsBtn.getSprite());

        this.muteBtn = new Button({ w: 16, h: 14 }, centerX(16, 200, 1), 50, MainMenu.muteAction.bind(this), "mainmenu", MainMenu.STATE.Main, "", 0, true);
        this.muteBtn.getSprite().addAnimation("normal", 1, { x: 96, y: 96 }, 0.1);
        this.muteBtn.getSprite().addAnimation("hover", 1, { x: 112, y: 96 }, 0.1);
        this.muteBtn.getSprite().addAnimation("down", 1, { x: 128, y: 96 }, 0.1);
        this.muteBtn.getSprite().changeAnimation("normal");
        MainMenu.mainList.push(this.muteBtn.getSprite());


        // ---------------- OPTIONS ----------------

        let volumePanel = new Panel({ w: 54, h: 20, v: 5 }, centerX(54), 50, startBtnCB, "mainmenu", MainMenu.STATE.Options, "volume", 1);
        volumePanel.setTextCase("all");
        MainMenu.optionsList.push(volumePanel.getSprite());

        let musicDownBtn = new Button({ w: 16, h: 16 }, centerX(16, 20), 80, Sound.decreaseMusicVolume, "mainmenu", MainMenu.STATE.Options, "", 0, true);
        musicDownBtn.getSprite().addAnimation("normal", 1, { x: 0, y: 96 }, 0.1);
        musicDownBtn.getSprite().addAnimation("hover", 1, { x: 16, y: 96 }, 0.1);
        musicDownBtn.getSprite().addAnimation("down", 1, { x: 32, y: 96 }, 0.1);
        musicDownBtn.getSprite().changeAnimation("normal");
        MainMenu.optionsList.push(musicDownBtn.getSprite());

        let musicUpBtn = new Button({ w: 16, h: 16 }, centerX(16, 20, 1), 80, Sound.increaseMusicVolume, "mainmenu", MainMenu.STATE.Options, "", 0, true);
        musicUpBtn.getSprite().addAnimation("normal", 1, { x: 48, y: 96 }, 0.1);
        musicUpBtn.getSprite().addAnimation("hover", 1, { x: 64, y: 96 }, 0.1);
        musicUpBtn.getSprite().addAnimation("down", 1, { x: 80, y: 96 }, 0.1);
        musicUpBtn.getSprite().changeAnimation("normal");
        MainMenu.optionsList.push(musicUpBtn.getSprite());

        let sfxDownBtn = new Button({ w: 16, h: 16 }, centerX(16, 20), 110, Sound.decreaseSfxVolume, "mainmenu", MainMenu.STATE.Options, "", 0, true);
        sfxDownBtn.getSprite().addAnimation("normal", 1, { x: 0, y: 96 }, 0.1);
        sfxDownBtn.getSprite().addAnimation("hover", 1, { x: 16, y: 96 }, 0.1);
        sfxDownBtn.getSprite().addAnimation("down", 1, { x: 32, y: 96 }, 0.1);
        sfxDownBtn.getSprite().changeAnimation("normal");
        MainMenu.optionsList.push(sfxDownBtn.getSprite());

        let sfxUpBtn = new Button({ w: 16, h: 16 }, centerX(16, 20, 1), 110, Sound.increaseSfxVolume, "mainmenu", MainMenu.STATE.Options, "", 0, true);
        sfxUpBtn.getSprite().addAnimation("normal", 1, { x: 48, y: 96 }, 0.1);
        sfxUpBtn.getSprite().addAnimation("hover", 1, { x: 64, y: 96 }, 0.1);
        sfxUpBtn.getSprite().addAnimation("down", 1, { x: 80, y: 96 }, 0.1);
        sfxUpBtn.getSprite().changeAnimation("normal");
        MainMenu.optionsList.push(sfxUpBtn.getSprite());

        let optionsBackBtn = new Button({ w: 40, h: 20, v: 4 }, centerX(40), 150, toMainMenu, "mainmenu", MainMenu.STATE.Options, "back");
        optionsBackBtn.setTextCase("first");
        MainMenu.optionsList.push(optionsBackBtn.getSprite());


        // ---------------- CREDITS ----------------

        let jadonagamesLogo = new Sprite({ w: 37, h: 34 }, centerX(37), centerY(34), "mainmenu");
        jadonagamesLogo.addAnimation("normal", 1, { x: 0, y: 0 }, 0.1);
        jadonagamesLogo.changeAnimation("normal");
        MainMenu.creditsList.push(jadonagamesLogo);

        let creditsBackBtn = new Button({ w: 40, h: 20, v: 4 }, centerX(40), centerY(20, 50, 1), toMainMenu, "mainmenu", MainMenu.STATE.Credits, "back");
        creditsBackBtn.setTextCase("first");
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

    static update(dt) {

        MainMenu.mainList.forEach(sp => {
            if (sp instanceof Sprite) {
                sp.update(dt);
            }
        })

        MainMenu.mainList = MainMenu.mainList.filter(sp => {
            return !sp.delete;
        });

        if (FadeEffect.bActive) {
            FadeEffect.update(dt);
        }
    }

    static draw(ctx) {

        switch (MainMenu.state) {
            case MainMenu.STATE.Main:

                ctx.fillStyle = "rgb(200,0,0)";
                ctx.font = "40px jpfont";
                ctx.textAlign = "center";
                ctx.fillText("Proto Jap", centerX(), 40);
                ctx.textAlign = "left";

                Sprite.manageBeforeDrawing(MainMenu.mainList);
                break;
            case MainMenu.STATE.Options:

                ctx.fillStyle = "rgb(200,0,0)";
                ctx.font = "40px jpfont";
                ctx.textAlign = "center";
                ctx.fillText(LANG['settings'], centerX(), 40);
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
                ctx.fillText(LANG['credits'], centerX(), 40);
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
            ctx.fillText("Sprites : " + Sprite.list.length, 0, 110);
            ctx.fillText("ButtonList : " + Button.list.length, 0, 120);
            ctx.fillText("ButtonCurrent : " + Button.currentList.length, 0, 130);
            ctx.fillText("MainMenuList : " + MainMenu.mainList.length, 0, 140);

            // switch (choice) {
            //     case "h":
            //         ctx.fillText(rndChoice.h, 140, 170);
            //         break;
            //     case "k":
            //         ctx.fillText(rndChoice.k, 140, 170);
            //         break;
            //     case "r":
            //         ctx.fillText(rndChoice.r, 140, 170);
            //         break;
            // }
            // ctx.fillText(rndChoice.r, 100, 150);

            // ctx.font = "10px UD Digi Kyokasho NK-R";

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


        if (FadeEffect.bActive) {
            FadeEffect.draw(ctx);
        }
    }
}