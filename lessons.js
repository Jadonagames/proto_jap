class Lessons {

    static mainList = [];
    static hiraganaList = [];
    static katakanaList = [];
    static lessonList = [];
    static lists = ["", "a,i,u,e,o", "ka,ki,ku,ke,ko", "sa,shi,su,se,so", "ta,chi,tsu,te,to", "na,ni,nu,ne,no", "ha,hi,fu,he,ho", "ma,mi,mu,me,mo", "ya,yu,yo", "ra,ri,ru,re,ro", "wa,wo,n", "ga,gi,gu,ge,go", "za,ji,zu,ze,zo", "da,di,du,de,do", "ba,bi,bu,be,bo", "pa,pi,pu,pe,po"]
    static bInit = false;

    static STATE = Object.freeze({
        Main: 0,
        Hiragana: 1,
        Katakana: 2,
        Lesson: 3
    })

    static previousState = -1;

    static state = Lessons.STATE.Main;

    constructor() {

    }

    static init() {

        this.canvasY = 0;
        this.translationY = -50;

        Lessons.bInit = true;
        // ---------------- MAIN ----------------

        this.hiraganaBtn = new Button({ w: 54, h: 20, v: 3 }, centerX(54, 100), 62, { cb: Lessons.changeState, arg: Lessons.STATE.Hiragana }, "lessons", Lessons.STATE.Katakana, "Hiragana", 2);
        this.hiraganaBtn.setHoverOffset({ x: 0, y: -2 });
        this.hiraganaBtn.setHoverCB(translate.bind(this.hiraganaBtn), this.hiraganaBtn.getHoverOffset());
        Lessons.mainList.push(this.hiraganaBtn.getSprite());

        this.first = true;
        this.katakanaBtn = new Button({ w: 54, h: 20, v: 3 }, centerX(54, 100, 1), 62, { cb: Lessons.changeState, arg: Lessons.STATE.Katakana }, "lessons", Lessons.STATE.Hiragana, "Katakana", 1);
        this.katakanaBtn.setHoverOffset({ x: 0, y: -2 });
        this.katakanaBtn.setHoverCB(translate.bind(this.katakanaBtn), this.katakanaBtn.getHoverOffset());
        Lessons.mainList.push(this.katakanaBtn.getSprite());

        let mainPanel = new Panel({ w: 400, h: 200, v: 5 }, centerX(400), 80, null, "lessons", Lessons.STATE.Main, "", 1);
        mainPanel.setTextCase("all");
        Lessons.mainList.push(mainPanel.getSprite());

        let backBtn = new Button({ w: 40, h: 20, v: 4 }, centerX(40), centerY(20, 100, 1), Lessons.quitLessonsMenu, "lessons", Lessons.STATE.Main, "Back");
        Lessons.mainList.push(backBtn.getSprite());

        let introBtn = new Button({ w: 50, h: 20, v: 4 }, centerX(50), centerY(20, 50), null, "lessons", Lessons.STATE.Main, "Infos");
        Lessons.mainList.push(introBtn.getSprite());

        let introTooltip = new Panel({ w: 300, h: 76, v: 5 }, centerX(300), CANVAS_HEIGHT - 76, null, "lessons", Lessons.STATE.Main, "Infos", 1);
        introTooltip.setOffsets(0, 18);

        introBtn.setTooltip(introTooltip);
        introBtn.setHoverCB(displayTooltip, { list: "lessons.main", tooltip: introBtn.getTooltip() });

        // ---------------- HIRAGANA ----------------
        let arr = ["", "aiueo", "kakikukeko", "sashisuseso", "tachitsuteto", "naninuneno", "hahifuheho", "mamimumemo", "yayuyo", "rarirurero", "wawon", "gagigugego", "zajizuzezo", "dadidudedo", "babibubebo", "papipupepo"];
        let offX = 0;
        let offY = 0;
        let columnCount = 1;

        for (let i = 1; i <= 15; i++) {
            let lessonBtn = new Button({ w: 60, h: 20, v: 4 }, centerX(40, 150, 0) + offX, centerY(20, 10) + offY, { cb: Lessons.transition.bind(this), arg: ["-", Lessons.STATE.Hiragana, i] }, "lessons", Lessons.STATE.Hiragana, "Lesson_" + i);
            Lessons.hiraganaList.push(lessonBtn.getSprite());

            let tooltipPanel = new Panel({ w: 300, h: 76, v: 5 }, centerX(300), CANVAS_HEIGHT - 76, null, "lessons", Lessons.STATE.Hiragana, "Content", 1);
            tooltipPanel.setOffsets(0, 18);

            let tooltipContentPanel = new Panel({ w: 250, h: 70, v: 1 }, centerX(250), CANVAS_HEIGHT - 50, null, "lessons", Lessons.STATE.Hiragana, "hira_" + arr[i], 2);
            tooltipContentPanel.setFont("kyokasho");
            tooltipPanel.setOffsets(0, 18);

            let tooltipContentPanel2 = new Panel({ w: 250, h: 50, v: 1 }, centerX(250), CANVAS_HEIGHT - 30, null, "lessons", Lessons.STATE.Hiragana, "roma_" + arr[i], 2);
            tooltipContentPanel2.setOffsets(0, 10);

            lessonBtn.setTooltip(tooltipPanel);
            lessonBtn.setTooltip(tooltipContentPanel);
            lessonBtn.setTooltip(tooltipContentPanel2);
            lessonBtn.setHoverCB(displayTooltip, { list: "lessons.hiragana", tooltip: lessonBtn.getTooltip() });

            offX += 70;
            columnCount++;
            if (columnCount > 5) {
                columnCount = 1;
                offX = 0;
                offY += 36;
            }
        }

        let buttonBottomH = new Panel({ w: 58, h: 5 }, this.hiraganaBtn.x - 2, this.hiraganaBtn.y + this.hiraganaBtn.height - 2, null, "mainmenu", Lessons.STATE.Hiragana, "", 1, true);
        buttonBottomH.getSprite().addAnimation("normal", 1, { x: 52, y: 40 }, 0.1);
        buttonBottomH.getSprite().changeAnimation("normal");
        Lessons.hiraganaList.push(buttonBottomH.getSprite());

        // ---------------- KATAKANA ----------------
        offX = 0;
        offY = 0;
        columnCount = 1;
        for (let i = 1; i <= 15; i++) {
            let lessonBtn = new Button({ w: 60, h: 20, v: 4 }, centerX(40, 150, 0) + offX, centerY(20, 10) + offY, { cb: Lessons.transition.bind(this), arg: ["-", Lessons.STATE.Katakana, i] }, "lessons", Lessons.STATE.Katakana, "Lesson_" + i);
            Lessons.katakanaList.push(lessonBtn.getSprite());

            let tooltipPanel = new Panel({ w: 300, h: 76, v: 5 }, centerX(300), CANVAS_HEIGHT - 76, null, "lessons", Lessons.STATE.Katakana, "Content", 1);
            tooltipPanel.setOffsets(0, 18);

            let tooltipContentPanel = new Panel({ w: 250, h: 70, v: 1 }, centerX(250), CANVAS_HEIGHT - 50, null, "lessons", Lessons.STATE.Katakana, "kata_" + arr[i], 2);
            tooltipContentPanel.setFont("kyokasho");
            tooltipPanel.setOffsets(0, 18);

            let tooltipContentPanel2 = new Panel({ w: 250, h: 50, v: 1 }, centerX(250), CANVAS_HEIGHT - 30, null, "lessons", Lessons.STATE.Katakana, "roma_" + arr[i], 2);
            tooltipContentPanel2.setOffsets(0, 10);

            lessonBtn.setTooltip(tooltipPanel);
            lessonBtn.setTooltip(tooltipContentPanel);
            lessonBtn.setTooltip(tooltipContentPanel2);
            lessonBtn.setHoverCB(displayTooltip, { list: "lessons.katakana", tooltip: lessonBtn.getTooltip() });

            offX += 70;
            columnCount++;
            if (columnCount > 5) {
                columnCount = 1;
                offX = 0;
                offY += 36;
            }
        }


        let buttonBottomK = new Panel({ w: 58, h: 5 }, this.katakanaBtn.x - 2, this.katakanaBtn.y + this.katakanaBtn.height - 2, null, "mainmenu", Lessons.STATE.Katakana, "", 1, true);
        buttonBottomK.getSprite().addAnimation("normal", 1, { x: 52, y: 40 }, 0.1);
        buttonBottomK.getSprite().changeAnimation("normal");
        Lessons.katakanaList.push(buttonBottomK.getSprite());

        // ---------------- LESSON ----------------
        this.lessonTitlePanel = new Panel({ w: 60, h: 30, v: 5 }, centerX(60), CANVAS_HEIGHT + 10, null, "lessons", Lessons.STATE.Lesson, "", 1);
        this.lessonTitlePanel.setOffsets(0, 18);
        this.lessonBackBtn = null;
        this.lessonMainPanel = new Panel({ w: 400, h: 270, v: 5 }, centerX(400), CANVAS_HEIGHT + 24, null, "lessons", Lessons.STATE.Lesson, "", 1);

        this.descriptionPanel = new Panel({ w: 140, h: 235, v: 5 }, centerX(150, 120, 1), CANVAS_HEIGHT + 40, null, "lessons", Lessons.STATE.Lesson, "Description", 1);
        this.descriptionPanel.setOffsets(0, 20);

    }

    static transition(a) { // a[0] : "-" / "+" || a[1] : Lessons.STATE.Hiragana / .Katakana || a[2] : i  (1,2,3...)
        if (a[0] == "-") {
            this.canvasY = 0;
            Lessons.previousState = a[1];
            Lessons.lessonList = [];
            let kana = "";
            Lessons.previousState == Lessons.STATE.Hiragana ? kana = "hira_" : kana = "kata_";

            // --- MAIN ---
            Lessons.lessonList.push(this.lessonMainPanel.getSprite());

            this.lessonTitlePanel.setLabel("Lesson_" + a[2]);
            Lessons.lessonList.push(this.lessonTitlePanel.getSprite());

            Lessons.lessonList.push(this.descriptionPanel.getSprite());
            // --- END MAIN END ---

            let kanaList = Lessons.lists[a[2]].split(",");
            let kanaPos = "";

            let offY = 48;
            let nb = 5;
            if (a[2] == 8 || a[2] == 10) nb = 3;
            for (let i = 0; i < nb; i++) {
                kanaPos = kana + kanaList[i];

                let containerPanel = new Panel({ w: 210, h: 38, v: 1 }, centerX(200, 80), CANVAS_HEIGHT + offY, null, "lessons", Lessons.STATE.Lesson, "", 3);
                containerPanel.setHoverable(true);
                containerPanel.setToDelete();
                Lessons.lessonList.push(containerPanel.getSprite());

                let tooltipPanel = new Panel({ w: 50, h: 38, v: 1 }, this.descriptionPanel.x + 10, this.descriptionPanel.y + 10, null, "lessons", Lessons.STATE.Lesson, "ph_word", 2);

                containerPanel.setTooltip(tooltipPanel);
                containerPanel.setHoverCB(displayTooltip, { list: "lessons.lesson", tooltip: containerPanel.getTooltip() });


                let kanaPanel = new Panel({ w: 50, h: 38, v: 1 }, containerPanel.x, containerPanel.y, null, "lessons", Lessons.STATE.Lesson, kana + KANA[kanaPos].roma, 2);
                kanaPanel.setFont("kyokasho");
                kanaPanel.setFontSize(30);
                kanaPanel.setOffsets(0, 30);
                kanaPanel.setToDelete();
                Lessons.lessonList.push(kanaPanel.getSprite());

                let romaPanel;
                let romaLabel = "";

                if (KANA[kanaPos].roma == "di") {
                    romaLabel = "ji";
                } else if (KANA[kanaPos].roma == "du") {
                    romaLabel = "zu";
                } else {
                    romaLabel = KANA[kanaPos].roma;
                }

                romaPanel = new Panel({ w: 50, h: 38, v: 1 }, containerPanel.x + 50, containerPanel.y, null, "lessons", Lessons.STATE.Lesson, "roma_" + romaLabel, 2);
                romaPanel.setFont("kyokasho");
                romaPanel.setFontSize(30);
                romaPanel.setOffsets(0, 30);
                romaPanel.setToDelete();
                Lessons.lessonList.push(romaPanel.getSprite());

                let sound = new Sprite({ w: 16, h: 13 }, containerPanel.x + 110, containerPanel.y + 12);
                sound.getSprite().addAnimation("normal", 1, { x: 106, y: 79 }, 0.1);
                sound.getSprite().changeAnimation("normal");
                Lessons.lessonList.push(sound.getSprite());

                let soundBtn = new Button({ w: 19, h: 17 }, containerPanel.x + 130, containerPanel.y + 10, { cb: Sound.playCallback, arg: "kana_" + KANA[kanaPos].roma }, "lessons", Lessons.STATE.Lesson, "", 0, true);
                soundBtn.getSprite().addAnimation("normal", 1, { x: 49, y: 79 }, 0.1);
                soundBtn.getSprite().addAnimation("hover", 1, { x: 68, y: 79 }, 0.1);
                soundBtn.getSprite().addAnimation("down", 1, { x: 87, y: 79 }, 0.1);
                soundBtn.getSprite().changeAnimation("normal");
                soundBtn.setToDelete();
                Lessons.lessonList.push(soundBtn.getSprite());

                let kana1 = new Sprite({ w: 34, h: 34 }, containerPanel.x + 160, containerPanel.y + 2, "kana");
                kana1.setKanaToDelete();
                for (let j = 0; j < KANA[kanaPos].frames.length; j++) {
                    kana1.setImageDataOrigin(KANA[kanaPos].imageData[j], KANA[kanaPos].frames[j]);
                }
                Lessons.lessonList.push(kana1);
                offY += 40;
            }

            this.lessonBackBtn = new Button({ w: 40, h: 20, v: 4 }, centerX(40), CANVAS_HEIGHT + 260, { cb: Lessons.transition.bind(this), arg: ["+", Lessons.previousState] }, "lessons", Lessons.STATE.Lesson, "Back");
            Lessons.lessonList.push(this.lessonBackBtn.getSprite());

        } else {
            this.canvasY = -600;

            Sprite.kanaList.forEach(k => {
                if (k.kanaToDelete) {
                    k.setActive(false);
                }
            })

            if (this.lessonBackBtn) this.lessonBackBtn.removeFromList();
        }

        TRANSITION = true;
    }

    static changeState(pNewState, pSwitch = true) {
        Lessons.state = pNewState;
        Panel.resetTypeState("lessons", pNewState);
        if (pNewState != Lessons.STATE.Lesson && pSwitch) {
            Button.resetTypeState("lessons", pNewState, Lessons.STATE.Main);
            Lessons.switchButtons();
        } else if (!pSwitch) {
            Button.resetTypeState("lessons", pNewState, Lessons.STATE.Main);
        } else {
            Button.resetTypeState("lessons", pNewState);
        }
    }

    static quitLessonsMenu() {
        if (Lessons.state == Lessons.STATE.Hiragana) Lessons.changeState(Lessons.STATE.Katakana);
        toMainMenu();
    }

    static switchButtons() {
        switch (Lessons.state) {
            case Lessons.STATE.Hiragana:
                this.hiraganaBtn.resetAnimations(2);
                this.katakanaBtn.resetAnimations(3);
                let func0 = translate.bind(this.hiraganaBtn, { x: this.hiraganaBtn.getHoverOffset().x, y: this.hiraganaBtn.getHoverOffset().y });
                func0();
                if (!this.first) {
                    let func1 = translate.bind(this.katakanaBtn, { x: this.katakanaBtn.getHoverOffset().x, y: this.katakanaBtn.getHoverOffset().y }, true);
                    func1();
                }
                this.first = false;
                break;
            case Lessons.STATE.Katakana:
                this.hiraganaBtn.resetAnimations(3);
                this.katakanaBtn.resetAnimations(2);
                let func2 = translate.bind(this.hiraganaBtn, { x: this.hiraganaBtn.getHoverOffset().x, y: this.hiraganaBtn.getHoverOffset().y }, true);
                func2();
                let func3 = translate.bind(this.katakanaBtn, { x: this.katakanaBtn.getHoverOffset().x, y: this.katakanaBtn.getHoverOffset().y });
                func3();
                break;
        }
    }

    static update(dt) {


        Lessons.mainList.forEach(sp => {
            if (sp instanceof Sprite) {
                sp.update(dt);
            }
        })

        Lessons.mainList = Lessons.mainList.filter(sp => {
            return !sp.delete;
        });


        Lessons.hiraganaList.forEach(sp => {
            if (sp instanceof Sprite) {
                sp.update(dt);
            }
        })

        Lessons.hiraganaList = Lessons.hiraganaList.filter(sp => {
            return !sp.delete;
        });

        Lessons.katakanaList.forEach(sp => {
            if (sp instanceof Sprite) {
                sp.update(dt);
            }
        })

        Lessons.katakanaList = Lessons.katakanaList.filter(sp => {
            return !sp.delete;
        });

        Lessons.lessonList = Lessons.lessonList.filter(sp => {
            return !sp.delete;
        });

        Sprite.kanaList.forEach(sp => {
            if (sp.active) {
                sp.updateKana(dt);
            }
        })


        if (FadeEffect.bActive) {
            FadeEffect.update(dt);
        }
    }

    static draw(ctx) {
        if (TRANSITION) {

            ctx.transform(1, 0, 0, 1, 0, this.canvasY);
            this.canvasY += this.translationY;

            if (this.canvasY <= -600 && Lessons.state != Lessons.STATE.Lesson) { // GO TO LESSON
                this.translationY = 50;
                Button.currentList.forEach(b => {
                    if (b.getState() != Button.STATE.Normal) {
                        b.setState(Button.STATE.Normal);
                        b.getTooltip().forEach(sp => {
                            if (sp instanceof Sprite) {
                                sp.delete = true;
                            } else {
                                sp.getSprite().delete = true;
                            }
                        });
                        for (const sp in b.getSprite()) {
                            if (b.getSprite()[sp] instanceof Sprite) {
                                b.getSprite()[sp].changeAnimation("normal");
                            }
                        }
                    }
                });

                Sprite.kanaList.forEach(k => {
                    if (k.kanaToDelete) {
                        k.setActive(true);
                    }
                })

                TRANSITION = false;
                this.changeState(Lessons.STATE.Lesson);
            } else if (this.canvasY > 0 && Lessons.state == Lessons.STATE.Lesson) { // BACK TO MENU
                this.canvasY = 0;
                this.translationY = -50;
                Button.currentList.forEach(b => {
                    if (b.getState() != Button.STATE.Normal) {
                        b.setState(Button.STATE.Normal);
                        b.getTooltip().forEach(sp => {
                            if (sp instanceof Sprite) {
                                sp.delete = true;
                            } else {
                                sp.getSprite().delete = true;
                            }
                        });
                        for (const sp in b.getSprite()) {
                            if (b.getSprite()[sp] instanceof Sprite) {
                                b.getSprite()[sp].changeAnimation("normal");
                            }
                        }
                    }
                });

                Sprite.kanaList = Sprite.kanaList.filter(sp => {
                    return !sp.kanaToDelete;
                });
                Button.currentList.forEach(b => {
                    if (b.bToDelete) {
                        b.removeFromList();
                    }
                });
                Panel.currentList.forEach(p => {
                    if (p.bToDelete) {
                        p.removeFromList();
                    }
                });
                Lessons.lessonList = [];

                TRANSITION = false;

                if (Lessons.previousState == Lessons.STATE.Hiragana) {
                    Lessons.changeState(Lessons.STATE.Hiragana, false);
                } else {
                    Lessons.changeState(Lessons.STATE.Katakana, false);
                }
                Lessons.previousState = -1;
            }

        }
        ctx.setTransform(1 * SCALE_X, 0, 0, 1 * SCALE_Y, 0, this.canvasY);

        ctx.fillStyle = "rgb(200,0,0)";
        ctx.font = "40px jpfont";
        ctx.textAlign = "center";
        ctx.fillText(LANG["Lessons"], centerX(), 40);
        ctx.textAlign = "left";
        Sprite.manageBeforeDrawing(Lessons.mainList);
        if (Lessons.lessonList) {
            Sprite.manageBeforeDrawing(Lessons.lessonList);
        }

        switch (Lessons.state) {

            case Lessons.STATE.Hiragana:
                Sprite.manageBeforeDrawing(Lessons.hiraganaList);
                break;

            case Lessons.STATE.Katakana:
                Sprite.manageBeforeDrawing(Lessons.katakanaList);
                break;

            case Lessons.STATE.Transition:

                break;
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