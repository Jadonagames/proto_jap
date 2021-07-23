class MainMenu {

    static list = [];
    static mainList = [];
    static optionsList = [];
    static creditsList = [];

    muteBtn = null;

    static STATE = Object.freeze({
        Main: 0,
        Options: 1,
        Credits: 2,
        Transition: 3
    })

    static state = MainMenu.STATE.Main;
    currentMusicVolume = null;

    constructor() {

    }

    static init() {




        // MAIN 
        let title = new UiSprite({ w: 158, h: 40 }, centerX(158), 10, "mainmenu");
        title.addAnimation("normal", 1, { x: 37, y: 0 }, 0.1);
        title.changeAnimation("normal");
        MainMenu.mainList.push(title);

        let startBtn = new Button({ w: 32, h: 16 }, centerX(32), 80, startBtnCB, "mainmenu", MainMenu.STATE.Main);
        startBtn.getSprite().addAnimation("normal", 1, { x: 0, y: 48 }, 0.1);
        startBtn.getSprite().addAnimation("hover", 1, { x: 32, y: 48 }, 0.1);
        startBtn.getSprite().addAnimation("down", 1, { x: 64, y: 48 }, 0.1);
        startBtn.getSprite().changeAnimation("normal");
        MainMenu.mainList.push(startBtn.getSprite());

        let optionsBtn = new Button({ w: 32, h: 16 }, centerX(32), 100, MainMenu.optionsCB.bind(this), "mainmenu", MainMenu.STATE.Main);
        optionsBtn.getSprite().addAnimation("normal", 1, { x: 96, y: 48 }, 0.1);
        optionsBtn.getSprite().addAnimation("hover", 1, { x: 128, y: 48 }, 0.1);
        optionsBtn.getSprite().addAnimation("down", 1, { x: 160, y: 48 }, 0.1);
        optionsBtn.getSprite().changeAnimation("normal");
        MainMenu.mainList.push(optionsBtn.getSprite());

        let creditsBtn = new Button({ w: 32, h: 16 }, centerX(32), 120, MainMenu.creditsCB.bind(this), "mainmenu", MainMenu.STATE.Main);
        creditsBtn.getSprite().addAnimation("normal", 1, { x: 192, y: 48 }, 0.1);
        creditsBtn.getSprite().addAnimation("hover", 1, { x: 224, y: 48 }, 0.1);
        creditsBtn.getSprite().addAnimation("down", 1, { x: 256, y: 48 }, 0.1);
        creditsBtn.getSprite().changeAnimation("normal");
        MainMenu.mainList.push(creditsBtn.getSprite());

        this.muteBtn = new Button({ w: 16, h: 14 }, 180, 50, MainMenu.muteAction.bind(this), "mainmenu", MainMenu.STATE.Main);
        this.muteBtn.getSprite().addAnimation("normal", 1, { x: 96, y: 96 }, 0.1);
        this.muteBtn.getSprite().addAnimation("hover", 1, { x: 112, y: 96 }, 0.1);
        this.muteBtn.getSprite().addAnimation("down", 1, { x: 128, y: 96 }, 0.1);
        this.muteBtn.getSprite().changeAnimation("normal");
        MainMenu.mainList.push(this.muteBtn.getSprite());

        // OPTIONS
        let optionsTitle = new UiSprite({ w: 116, h: 40 }, centerX(116), 10, "mainmenu");
        optionsTitle.addAnimation("normal", 1, { x: 195, y: 0 }, 0.1);
        optionsTitle.changeAnimation("normal");
        MainMenu.optionsList.push(optionsTitle);

        let musicDownBtn = new Button({ w: 16, h: 16 }, 70, 60, Sound.decreaseMusicVolume, "mainmenu", MainMenu.STATE.Options);
        musicDownBtn.getSprite().addAnimation("normal", 1, { x: 0, y: 96 }, 0.1);
        musicDownBtn.getSprite().addAnimation("hover", 1, { x: 16, y: 96 }, 0.1);
        musicDownBtn.getSprite().addAnimation("down", 1, { x: 32, y: 96 }, 0.1);
        musicDownBtn.getSprite().changeAnimation("normal");
        MainMenu.optionsList.push(musicDownBtn.getSprite());

        let musicUpBtn = new Button({ w: 16, h: 16 }, 120, 60, Sound.increaseMusicVolume, "mainmenu", MainMenu.STATE.Options);
        musicUpBtn.getSprite().addAnimation("normal", 1, { x: 48, y: 96 }, 0.1);
        musicUpBtn.getSprite().addAnimation("hover", 1, { x: 64, y: 96 }, 0.1);
        musicUpBtn.getSprite().addAnimation("down", 1, { x: 80, y: 96 }, 0.1);
        musicUpBtn.getSprite().changeAnimation("normal");
        MainMenu.optionsList.push(musicUpBtn.getSprite());

        let sfxDownBtn = new Button({ w: 16, h: 16 }, 70, 80, Sound.decreaseSfxVolume, "mainmenu", MainMenu.STATE.Options);
        sfxDownBtn.getSprite().addAnimation("normal", 1, { x: 0, y: 96 }, 0.1);
        sfxDownBtn.getSprite().addAnimation("hover", 1, { x: 16, y: 96 }, 0.1);
        sfxDownBtn.getSprite().addAnimation("down", 1, { x: 32, y: 96 }, 0.1);
        sfxDownBtn.getSprite().changeAnimation("normal");
        MainMenu.optionsList.push(sfxDownBtn.getSprite());

        let sfxUpBtn = new Button({ w: 16, h: 16 }, 120, 80, Sound.increaseSfxVolume, "mainmenu", MainMenu.STATE.Options);
        sfxUpBtn.getSprite().addAnimation("normal", 1, { x: 48, y: 96 }, 0.1);
        sfxUpBtn.getSprite().addAnimation("hover", 1, { x: 64, y: 96 }, 0.1);
        sfxUpBtn.getSprite().addAnimation("down", 1, { x: 80, y: 96 }, 0.1);
        sfxUpBtn.getSprite().changeAnimation("normal");
        MainMenu.optionsList.push(sfxUpBtn.getSprite());

        let musicTxt = new UiSprite({ w: 23, h: 7 }, 45, 63, "mainmenu", MainMenu.STATE.Options);
        musicTxt.addAnimation("normal", 1, { x: 0, y: 80 }, 0.1);
        musicTxt.changeAnimation("normal");
        MainMenu.optionsList.push(musicTxt);

        let sfxTxt = new UiSprite({ w: 16, h: 7 }, 45, 83, "mainmenu", MainMenu.STATE.Options);
        sfxTxt.addAnimation("normal", 1, { x: 23, y: 80 }, 0.1);
        sfxTxt.changeAnimation("normal");
        MainMenu.optionsList.push(sfxTxt);

        let optionsBackBtn = new Button({ w: 32, h: 16 }, centerX(32), 120, toMainMenu, "mainmenu", MainMenu.STATE.Options);
        optionsBackBtn.getSprite().addAnimation("normal", 1, { x: 288, y: 48 }, 0.1);
        optionsBackBtn.getSprite().addAnimation("hover", 1, { x: 320, y: 48 }, 0.1);
        optionsBackBtn.getSprite().addAnimation("down", 1, { x: 352, y: 48 }, 0.1);
        optionsBackBtn.getSprite().changeAnimation("normal");
        MainMenu.optionsList.push(optionsBackBtn.getSprite());

        // CREDITS
        let creditsTitle = new UiSprite({ w: 112, h: 28 }, centerX(112), 10, "mainmenu", MainMenu.STATE.Credits);
        creditsTitle.addAnimation("normal", 1, { x: 311, y: 0 }, 0.1);
        creditsTitle.changeAnimation("normal");
        MainMenu.creditsList.push(creditsTitle);

        let jadonagamesLogo = new UiSprite({ w: 37, h: 34 }, centerX(37), centerY(34), "mainmenu", MainMenu.STATE.Credits);
        jadonagamesLogo.addAnimation("normal", 1, { x: 0, y: 0 }, 0.1);
        jadonagamesLogo.changeAnimation("normal");
        MainMenu.creditsList.push(jadonagamesLogo);

        let creditsBackBtn = new Button({ w: 32, h: 16 }, centerX(32), 120, toMainMenu, "mainmenu", MainMenu.STATE.Credits);
        creditsBackBtn.getSprite().addAnimation("normal", 1, { x: 288, y: 48 }, 0.1);
        creditsBackBtn.getSprite().addAnimation("hover", 1, { x: 320, y: 48 }, 0.1);
        creditsBackBtn.getSprite().addAnimation("down", 1, { x: 352, y: 48 }, 0.1);
        creditsBackBtn.getSprite().changeAnimation("normal");
        MainMenu.creditsList.push(creditsBackBtn.getSprite());

    }

    static muteAction() {
        this.muteBtn.callbackAction = MainMenu.unMuteAction.bind(this);
        this.muteBtn.getSprite().resetAnimations("normal", { x: 144, y: 96 });
        this.muteBtn.getSprite().resetAnimations("hover", { x: 160, y: 96 });
        this.muteBtn.getSprite().resetAnimations("down", { x: 176, y: 96 });
        Sound.toggleMute();
    }

    static unMuteAction() {
        this.muteBtn.callbackAction = MainMenu.muteAction.bind(this);
        this.muteBtn.getSprite().resetAnimations("normal", { x: 96, y: 96 });
        this.muteBtn.getSprite().resetAnimations("hover", { x: 112, y: 96 });
        this.muteBtn.getSprite().resetAnimations("down", { x: 128, y: 96 });
        Sound.toggleMute();
    }

    static optionsCB() {
        MainMenu.changeState(MainMenu.STATE.Options);
    }

    static creditsCB() {
        MainMenu.changeState(MainMenu.STATE.Credits);
    }

    static changeState(pNewState) {
        MainMenu.state = pNewState;
        Button.resetTypeState("mainmenu", pNewState)
    }

    static update(dt) {
        if (FadeEffect.bActive) {
            FadeEffect.update(dt);
        }
    }

    static draw(ctx) {

        switch (MainMenu.state) {
            case MainMenu.STATE.Main:
                MainMenu.mainList.forEach(sp => {
                    sp.draw(ctx);
                })

                // TODO DRAW KANA LIST BUTTONS

                break;
            case MainMenu.STATE.Options:
                MainMenu.optionsList.forEach(sp => {
                    sp.draw(ctx);
                })
                ctx.fillStyle = "rgb(255,255,255)";
                ctx.font = "10px serif";
                ctx.fillText(Math.floor(MUSIC_VOLUME * 10), 100, 72);
                ctx.fillText(Math.floor(SFX_VOLUME * 10), 100, 92);
                break;
            case MainMenu.STATE.Credits:
                MainMenu.creditsList.forEach(sp => {
                    sp.draw(ctx);
                })
                break;
            case MainMenu.STATE.Transition:

                break;
        }


        /**
         * DEBUG
         */
        if (bDebug) {
            ctx.fillStyle = "rgb(255,255,255)";
            // ctx.font = "10px UD Digi Kyokasho NK-R";
            ctx.font = "16px pgfont";
            ctx.fillText("Sprites : " + Sprite.list.length, 0, 100);
            ctx.fillText("UiSprites : " + UiSprite.list.length, 0, 110);
            ctx.fillText("ButtonList : " + Button.list.length, 0, 120);
            ctx.fillText("MainMenuList : " + MainMenu.list.length, 0, 130);

            ctx.fillText("dt: " + debugDt, 0, 140);

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