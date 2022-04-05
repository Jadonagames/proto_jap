class Introduction {

    static mainList = [];
    static bInit = false;

    static STATE = Object.freeze({
        Main: 0,
    })

    static state = Introduction.STATE.Main;

    constructor() {

    }

    static init() {

        Introduction.mainList = [];
        Button.list = Button.list.filter(b => {
            return b.type != "introduction"
        });
        Panel.list = Panel.list.filter(p => {
            return p.type != "introduction"
        });

        Introduction.bInit = true;

        this.dialogPanel = new DialogPanel({ w: 220, h: 90, v: 6 }, centerX(220), CANVAS_HEIGHT + 90, null, "introduction", Introduction.STATE.Main, ["intro_text_", 10, true], 7);
        this.dialogPanel.setOffsets(12, 18);
        this.dialogPanel.setFontColor("rgba(18,72,39,1)", "rgba(255,255,255,1)");
        this.dialogPanel.setAlignText(this.dialogPanel.ALIGN_TEXT.Left);
        this.dialogPanel.beginMoving({ x: centerX(220), y: CANVAS_HEIGHT - 90 }, 1, true, 0, 0.08);
        this.dialogPanel.setScriptCallback(Introduction.nextStep.bind(Introduction));
        this.dialogPanel.setEndDialogCallback(Introduction.endIntro.bind(Introduction));
        this.dialogPanel.setStateList("introduction");
        Introduction.mainList.push(this.dialogPanel.getSprite());



        // this.dialogBtnContainer = new Sprite({ w: 22, h: 21 }, this.dialogPanel.width - 14, this.dialogPanel.height - 21, this.dialogPanel, "");
        // this.dialogBtnContainer.addAnimation("normal", { x: 224, y: 80 });
        // this.dialogBtnContainer.changeAnimation("normal");
        // this.dialogPanel.setChildSprite(this.dialogBtnContainer, "introduction.main");


        // this.dialogPanelBtn = new Button({ w: 19, h: 17 }, this.dialogBtnContainer.x + 4, this.dialogBtnContainer.y + 4, this.dialogPanel, this.dialogPanel.nextPhrase.bind(this.dialogPanel), "", Introduction.STATE.Main, "", 0, true);
        // this.dialogPanelBtn.setAnimations({ x: 255, y: 106 });
        // // this.dialogPanelBtn = new Button({ w: 16, h: 12 }, this.dialogPanel.totalWidth - 30, this.dialogPanel.height - 25, this.dialogPanel, this.dialogPanel.nextPhrase.bind(this.dialogPanel), "", Introduction.STATE.Main, "", 0, true);
        // // this.dialogPanelBtn.setAnimations({ x: 170, y: 80 });
        // this.dialogPanel.setChildBtn(this.dialogPanelBtn, "introduction.main");

        //! ------------------------------------------------------

        this.dialogBtnContainer = new Sprite({ w: 30, h: 28 }, this.dialogPanel.width - 14, this.dialogPanel.height - 28, this.dialogPanel, "");
        this.dialogBtnContainer.addAnimation("normal", { x: 416, y: 144 });
        this.dialogBtnContainer.changeAnimation("normal");
        Introduction.mainList.push(this.dialogBtnContainer);

        this.dialogSpeedBtn = new Button({ w: 19, h: 17 }, this.dialogBtnContainer.x + 5, this.dialogBtnContainer.y + 5, this.dialogPanel, this.dialogPanel.speedPhrase.bind(this.dialogPanel), "introduction", Introduction.STATE.Main, "", 0, true);
        this.dialogSpeedBtn.setAnimations({ x: 255, y: 89 });
        Introduction.mainList.push(this.dialogSpeedBtn.getSprite());

        this.dialogPanelBtn = new Button({ w: 19, h: 17 }, this.dialogBtnContainer.x + 5, this.dialogBtnContainer.y + 5, this.dialogPanel, this.dialogPanel.nextPhrase.bind(this.dialogPanel), "introduction", Introduction.STATE.Main, "", 0, true);
        this.dialogPanelBtn.setAnimations({ x: 255, y: 106 });
        //! ------------------------------------------------------
        this.disclaimerPanel = null;

        this.screens = new Sprite({ w: 178, h: 101 }, centerX(178), centerY(101, 50));
        this.screens.addAnimation("0", { x: 382, y: 1 }); //? Bienvenue KanaWorld
        this.screens.addAnimation("1", { x: 0, y: 0 }); //? Trois systèmes + Hiragana + Katakana
        this.screens.addAnimation("4", { x: 921, y: 1632 }); //? Ordre et nombre de traits && Animation か
        this.screens.changeAnimation("0");
        Introduction.mainList.push(this.screens);

        this.hiraganaX = 200;
        this.katakanaX = 200;
        this.kana = null;
        this.hiraganaTitle = null;
        this.katakanaTitle = null;
        this.kanjiTitle = null;
        this.hiraganaExample = null;
        this.katakanaExample = null;
        this.kanjiExample = null;
        this.arrow1 = null;
        this.arrow2 = null;
        this.arrow3 = null;

        this.sameSoundPanel = null;

        this.bHiranagaActive = false;
        this.bKatakanaActive = false;
        this.bDisclaimer = false;

    }

    static switchButtons(pSpeedToNext) {
        if (pSpeedToNext) {
            this.dialogSpeedBtn.getSprite().delete = true;
            this.dialogSpeedBtn.removeFromCurrentList();

            this.dialogPanelBtn.getSprite().delete = false;
            Introduction.mainList.push(this.dialogPanelBtn.getSprite());
            Button.currentList.push(this.dialogPanelBtn);

            checkMouseHover(this.dialogPanelBtn);
        } else {
            this.dialogPanelBtn.getSprite().delete = true;
            this.dialogPanelBtn.removeFromCurrentList();

            this.dialogSpeedBtn.getSprite().delete = false;
            Introduction.mainList.push(this.dialogSpeedBtn.getSprite());
            Button.currentList.push(this.dialogSpeedBtn);

            checkMouseHover(this.dialogSpeedBtn);
        }
    }

    static desactiveDialogButton() {
        this.dialogPanelBtn.getSprite().delete = true;
        this.dialogPanelBtn.removeFromCurrentList();
    }

    static createKanaAnimation() {
        this.kana = new Sprite({ w: 48, h: 30 }, 246, 100, null, "todelete");
        this.kana.addAnimation("normal", { x: 441, y: 1632 }, 10, 0.4, true);
        this.kana.changeAnimation("normal");
        Introduction.mainList.push(this.kana);
    }

    static nextStep(pId) {
        switch (pId) {
            case 1: //? 1 - La langue japonaise est composée de trois systèmes d'écriture : Hiragana, Katakana et Kanji. Ces derniers tirent leur origine du système d'écriture Chinois.
                this.screens.setSize(1, 1);
                this.screens.originWidth = 1;
                this.screens.x = 0;
                this.screens.y = 0;
                this.screens.changeAnimationMaxWidth("1");
                this.screens.changeAnimation("1");

                this.hiraganaTitle = new Panel({ w: 60, h: 30, v: 1 }, 50, 60, null, "introduction", Introduction.STATE.Main, "Hiragana", 2);
                this.hiraganaTitle.setTextOverflow(true);
                this.hiraganaTitle.setFontSize(30);
                this.katakanaTitle = new Panel({ w: 60, h: 30, v: 1 }, 200, 60, null, "introduction", Introduction.STATE.Main, "Katakana", 2);
                this.katakanaTitle.setTextOverflow(true);
                this.katakanaTitle.setFontSize(30);
                this.kanjiTitle = new Panel({ w: 60, h: 30, v: 1 }, 340, 60, null, "introduction", Introduction.STATE.Main, "Kanji", 2);
                this.kanjiTitle.setTextOverflow(true);
                this.kanjiTitle.setFontSize(30);

                this.hiraganaExample = new Panel({ w: 60, h: 30, v: 1 }, 50, 150, null, "introduction", Introduction.STATE.Main, "intro_hiragana", 2);
                this.hiraganaExample.setTextOverflow(true);
                this.hiraganaExample.setFontSize(30);
                this.hiraganaExample.setFont("kyokasho");
                this.katakanaExample = new Panel({ w: 60, h: 30, v: 1 }, 200, 150, null, "introduction", Introduction.STATE.Main, "intro_katakana", 2);
                this.katakanaExample.setTextOverflow(true);
                this.katakanaExample.setFontSize(30);
                this.katakanaExample.setFont("kyokasho");
                this.kanjiExample = new Panel({ w: 60, h: 30, v: 1 }, 340, 150, null, "introduction", Introduction.STATE.Main, "intro_kanji", 2);
                this.kanjiExample.setTextOverflow(true);
                this.kanjiExample.setFontSize(30);
                this.kanjiExample.setFont("kyokasho");

                this.arrow1 = new Sprite({ w: 26, h: 29 }, 70, 95);
                this.arrow1.addAnimation("normal", { x: 305, y: 0 });
                this.arrow1.changeAnimation("normal");
                this.arrow2 = new Sprite({ w: 26, h: 29 }, 220, 95);
                this.arrow2.addAnimation("normal", { x: 305, y: 0 });
                this.arrow2.changeAnimation("normal");
                this.arrow3 = new Sprite({ w: 26, h: 29 }, 360, 95);
                this.arrow3.addAnimation("normal", { x: 305, y: 0 });
                this.arrow3.changeAnimation("normal");

                Panel.list.push(this.hiraganaTitle);
                Panel.currentList.push(this.hiraganaTitle);
                Panel.list.push(this.katakanaTitle);
                Panel.currentList.push(this.katakanaTitle);
                Panel.list.push(this.kanjiTitle);
                Panel.currentList.push(this.kanjiTitle);
                Introduction.mainList.push(this.hiraganaTitle.getSprite());
                Introduction.mainList.push(this.katakanaTitle.getSprite());
                Introduction.mainList.push(this.kanjiTitle.getSprite());

                Panel.list.push(this.hiraganaExample);
                Panel.currentList.push(this.hiraganaExample);
                Panel.list.push(this.katakanaExample);
                Panel.currentList.push(this.katakanaExample);
                Panel.list.push(this.kanjiExample);
                Panel.currentList.push(this.kanjiExample);
                Introduction.mainList.push(this.hiraganaExample.getSprite());
                Introduction.mainList.push(this.katakanaExample.getSprite());
                Introduction.mainList.push(this.kanjiExample.getSprite());

                Introduction.mainList.push(this.arrow1);
                Introduction.mainList.push(this.arrow2);
                Introduction.mainList.push(this.arrow3);

                break;
            case 2: //? 2 - Les Hiragana sont le syllabaire de base utilisé pour écrire tous les mots, les déclinaisons de verbe, former la grammaire etc...

                this.hiraganaTitle.removeFromList();
                this.hiraganaTitle.removeFromCurrentList();
                this.hiraganaTitle.getSprite().delete = true;
                this.hiraganaTitle = null;
                this.katakanaTitle.removeFromList();
                this.katakanaTitle.removeFromCurrentList();
                this.katakanaTitle.getSprite().delete = true;
                this.katakanaTitle = null;
                this.kanjiTitle.removeFromList();
                this.kanjiTitle.removeFromCurrentList();
                this.kanjiTitle.getSprite().delete = true;
                this.kanjiTitle = null;

                this.hiraganaExample.removeFromList();
                this.hiraganaExample.removeFromCurrentList();
                this.hiraganaExample.getSprite().delete = true;
                this.hiraganaExample = null;
                this.katakanaExample.removeFromList();
                this.katakanaExample.removeFromCurrentList();
                this.katakanaExample.getSprite().delete = true;
                this.katakanaExample = null;
                this.kanjiExample.removeFromList();
                this.kanjiExample.removeFromCurrentList();
                this.kanjiExample.getSprite().delete = true;
                this.kanjiExample = null;

                this.arrow1.delete = true;
                this.arrow1 = null;
                this.arrow2.delete = true;
                this.arrow2 = null;
                this.arrow3.delete = true;
                this.arrow3 = null;

                this.bHiranagaActive = true;
                break;
            case 3: //? 3 - Les Katakana sont principalement utilisés pour retranscrire des mots étrangers. Ce sont avec ces derniers que vous pourrez écrire vos noms et prénoms par exemple. Ils sont aussi utilisés pour les onomatopées ou encore pour l'emphase ou des effets de style.
                this.bHiranagaActive = false;
                this.bKatakanaActive = true;
                break;
            case 4: //? 4 - 5 Pour plus d'efficacité dans votre apprentissage, si vous voulez le faire sérieusement, je vous recommande vivement de vous entraîner à écrire les caractères.
                //? 5 - Pour ce faire l'*ordre* ET le *nombre* de traits sont importants. N'hésitez pas à vous référer à l'animation disponible
                this.bKatakanaActive = false;
                Introduction.createKanaAnimation();
                this.screens.setSize(143, 34);
                this.screens.originWidth = 143;
                this.screens.x = centerX(143);
                this.screens.y = centerY(34, 35);
                this.screens.changeAnimationMaxWidth("4");
                this.screens.changeAnimation("4");
                break;
            case 6: //? 6 - Les sons sont les mêmes pour les deux syllabaires, on retrouve 46 caractères dans chaque syllabaire. Donc 92 caractères au total. Bonne chance :)
                this.kana.delete = true;
                this.kana = null;

                this.sameSoundPanel = new Panel({ w: 80, h: 30, v: 1 }, 190, 50, null, "introduction", Introduction.STATE.Main, "same_sound_example", 2);
                this.sameSoundPanel.setFont("kyokasho");
                this.sameSoundPanel.setFontSize(20);
                this.sameSoundPanel.textLinesOffsetY = 20;
                Panel.list.push(this.sameSoundPanel);
                Panel.currentList.push(this.sameSoundPanel);
                Introduction.mainList.push(this.sameSoundPanel.getSprite());

                this.bHiranagaActive = true;
                this.bKatakanaActive = true;
                this.hiraganaX = 50;
                this.katakanaX = 330;

                this.screens.setSize(1, 1);
                this.screens.originWidth = 1;
                this.screens.x = 0;
                this.screens.y = 0;
                this.screens.changeAnimationMaxWidth("1");
                this.screens.changeAnimation("1");
                break;
            case 7: //? 7 - 8 DISCLAIMER
                this.bDisclaimer = true;
                this.sameSoundPanel.removeFromList();
                this.sameSoundPanel.removeFromCurrentList();
                this.sameSoundPanel.getSprite().delete = true;
                this.sameSoundPanel = null;
                this.screens.delete = true;
                this.screens = null;
                this.bHiranagaActive = false;
                this.bKatakanaActive = false;
                break;
            case 9: //? 9 - Bonne chance
                this.bDisclaimer = false;
                break;
        }
    }

    static endIntro() {
        if (SaveManager.SAVE_DATA["intro"] == 1) {
            changeMainState(MAIN_STATE.Menu);
            MainMenu.changeState(MainMenu.STATE.Options);
        } else {
            SaveManager.save([{ type: "intro", value: 1 }]);
            toMainMenu();
        }
    }

    static changeState(pNewState) {
        Introduction.state = pNewState;
        Button.resetTypeState("introduction", pNewState);
        Panel.resetTypeState("introduction", pNewState);
    }

    static update(dt) {

        Sprite.manageBeforeUpdating(Introduction.mainList, dt);
        Introduction.mainList = Introduction.mainList.filter(sp => {
            return !sp.delete;
        });

        Button.currentList.forEach(b => {
            if (b.parent && b.parent.bFading && b.label == "") {
                b.updateAlpha();
            }
        });

        Panel.currentList.forEach(p => {
            p.update(dt);
        })

        if (FadeEffect.bActive) {
            FadeEffect.update(dt);
        }
    }

    static draw(ctx) {

        Sprite.manageBeforeDrawing(Introduction.mainList);

        ctx.font = "10px jpfont";
        ctx.shadowOffsetY = 0;
        ctx.textAlign = "left";

        ctx.font = "15px kyokasho";

        if (this.bHiranagaActive) {

            ctx.fillText("あいうえお", this.hiraganaX, 30);
            ctx.fillText("かきくけこ", this.hiraganaX, 45);
            ctx.fillText("さしすせそ", this.hiraganaX, 60);
            ctx.fillText("たちつてと", this.hiraganaX, 75);
            ctx.fillText("なにぬねの", this.hiraganaX, 90);
            ctx.fillText("はひふへほ", this.hiraganaX, 105);
            ctx.fillText("まみむめも", this.hiraganaX, 120);
            ctx.fillText("や　ゆ　よ", this.hiraganaX, 135);
            ctx.fillText("らりるれろ", this.hiraganaX, 150);
            ctx.fillText("わ　　　を", this.hiraganaX, 165);
            ctx.fillText("ん", this.hiraganaX, 180);
        }

        if (this.bKatakanaActive) {
            ctx.fillText("アイウエオ", this.katakanaX, 30);
            ctx.fillText("カキクケコ", this.katakanaX, 45);
            ctx.fillText("サシスセソ", this.katakanaX, 60);
            ctx.fillText("タチツテト", this.katakanaX, 75);
            ctx.fillText("ナニヌネノ", this.katakanaX, 90);
            ctx.fillText("ハヒフヘホ", this.katakanaX, 105);
            ctx.fillText("マミムメモ", this.katakanaX, 120);
            ctx.fillText("ヤ　ユ　ヨ", this.katakanaX, 135);
            ctx.fillText("ラリルレロ", this.katakanaX, 150);
            ctx.fillText("ワ　　　ヲ", this.katakanaX, 165);
            ctx.fillText("ン", this.katakanaX, 180);
        }

        if (this.bDisclaimer) {
            ctx.font = "30px kyokasho";
            ctx.textAlign = "center";
            ctx.fillStyle = "rgba(255,0,0,1)";
            ctx.fillText("DISCLAIMER", 230, 130);
        }

        /**
         * DEBUG
         */
        //------------- END DEBUG

        if (FadeEffect.bActive) {
            FadeEffect.draw(ctx);
        }
    }
}