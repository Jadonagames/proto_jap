class Infos {

    static list = [];
    static hiraganaList = [];
    static katakanaList = [];

    muteBtn = null;

    static bInit = false;

    static STATE = Object.freeze({
        Main: 0,
        Hiragana: 1,
        Katakana: 2
    })

    static state = Infos.STATE.Main;

    constructor() {

    }

    static init() {

        Infos.bInit = true;


        // ---------------- MAIN ------------------
        let hiraganaBtn = new Button({ w: 50, h: 20, v: 4 }, centerX(50), centerY(50), { cb: Infos.changeState, arg: Infos.STATE.Hiragana }, "infos", Infos.STATE.Main, "hiragana");
        hiraganaBtn.setTextCase("first");
        Infos.list.push(hiraganaBtn.getSprite());

        let katakanaBtn = new Button({ w: 50, h: 20, v: 4 }, centerX(50), centerY(50, 30, 1), { cb: Infos.changeState, arg: Infos.STATE.Katakana }, "infos", Infos.STATE.Main, "katakana");
        katakanaBtn.setTextCase("first");
        Infos.list.push(katakanaBtn.getSprite());

        let backBtn = new Button({ w: 40, h: 20, v: 4 }, centerX(40), centerY(50, 60, 1), toMainMenu, "infos", Infos.STATE.Main, "back");
        backBtn.setTextCase("first");
        Infos.list.push(backBtn.getSprite());
        // END------------- MAIN ---------------END


        // -------------- HIRAGANA ----------------
        let arr = [
            "a", "i", "u", "e", "o",
            "ka", "ki", "ku", "ke", "ko",
            "sa", "shi", "su", "se", "so",
            "ta", "chi", "tsu", "te", "to",
            "na", "ni", "nu", "ne", "no",
            "ha", "hi", "fu", "he", "ho",
            "ma", "mi", "mu", "me", "mo",
            "ya", "-", "yu", "-", "yo",
            "ra", "ri", "ru", "re", "ro",
            "wa", "-", "-", "-", "wo",
            "n"];

        let FRAMES = [
            [4, 4, 5], [3, 3], [3, 4], [3, 6], [3, 7, 3],
            [4, 3, 3], [3, 3, 4, 3], [5], [4, 3, 4], [3, 3],
            [3, 4, 3], [4], [3, 6], [4, 4, 4], [6],
            [3, 4, 3, 3], [3, 5], [4], [5], [3, 3],
            [3, 3, 3, 6], [4, 3, 3], [3, 9], [3, 9], [7],
            [4, 3, 5], [6], [3, 3, 3, 3], [4], [4, 3, 3, 5],
            [3, 3, 4], [6, 3], [3, 6, 3], [3, 6], [3, 3, 3],
            [4, 3, 3], [], [5, 3], [], [3, 5],
            [3, 4], [3, 3], [7], [3, 6], [6],
            [3, 5], [], [], [], [3, 5, 4],
            [6]];

        let offX = 0;
        let offY = 0;
        let columnsCount = 0;

        // TODO 
        // ==>> hira:104 / tenten:104 / kata:108 / tenten:103    (jusqu'à 419) 
        let count = 0;
        for (let i = 0; i < arr.length; i++) {

            if (i != 36 && i != 38 && i != 46 && i != 47 && i != 48) {

                let frame = new Sprite({ w: 30, h: 18 }, 30 + offX, 30 + offY, "infos");                                                            //  HERE x, y
                frame.addAnimation("normal", 1, { x: 0, y: 126 }, 0.1);
                frame.changeAnimation("normal");
                Infos.hiraganaList.push(frame);

                let kanaPanel = new Panel({ w: 28, h: 16 }, frame.x + 1, frame.y + 1, null, "infos", Infos.STATE.Hiragana, "hira_" + arr[i], 0, true);
                kanaPanel.getSprite().addAnimation("normal", 1, { x: 1, y: 127 }, 0.1);
                kanaPanel.getSprite().changeAnimation("normal");
                kanaPanel.setHoverable(true);
                kanaPanel.setAlignText(kanaPanel.ALIGN_TEXT.Left);
                kanaPanel.setOffsets(3, 12);
                kanaPanel.setFont("UD Digi Kyokasho NK-R");
                Infos.hiraganaList.push(kanaPanel.getSprite());

                let soundBtn = new Button({ w: 12, h: 12 }, frame.x + 16, frame.y + 3, { cb: Sound.playCallback, arg: "kana_" + arr[i] }, "infos", Infos.STATE.Hiragana, "", 0, true);
                soundBtn.getSprite().addAnimation("normal", 1, { x: 0, y: 84 }, 0.1);
                soundBtn.getSprite().addAnimation("hover", 1, { x: 12, y: 84 }, 0.1);
                soundBtn.getSprite().addAnimation("down", 1, { x: 24, y: 84 }, 0.1);
                soundBtn.getSprite().changeAnimation("normal");
                Infos.hiraganaList.push(soundBtn.getSprite());

                let tooltipPanel = new Panel({ w: 100, h: 100, v: 5 }, centerX(100, 70, 1), 50, null, "infos", Infos.STATE.Hiragana, "roma_" + arr[i], 1);      //  HERE x, y
                tooltipPanel.setTextCase("all");
                tooltipPanel.setFontSize(32);
                tooltipPanel.setFont("pgfont");
                tooltipPanel.setOffsets(5, 24);

                let kana = new Sprite({ w: 34, h: 34 }, tooltipPanel.x + 35, tooltipPanel.y + 35, "kana");

                for (let j = 0; j < FRAMES[i].length; j++) {
                    kana.setImageDataOrigin(imageDatasArr[count], FRAMES[i][j]); /// NON PAS imageDatasArr[j] !!! !!!!!!!!!
                    count++;
                }

                kanaPanel.setTooltip(tooltipPanel);
                kanaPanel.setTooltip(kana);
                kanaPanel.setHoverCB(displayTooltip, { list: "infos.hiragana", tooltip: kanaPanel.getTooltip() });
            }
            columnsCount++;
            if (columnsCount == 5) {
                columnsCount = 0
                offX = 0
                offY += 18 - 1; // 18 => frame.height
            } else {
                offX += 30 - 1; // 30 => frame.width
            }
        }


        let arr2 = [
            "ga", "gi", "gu", "ge", "go",
            "za", "ji", "zu", "ze", "zo",
            "da", "di", "du", "de", "do",
            "ba", "bi", "bu", "be", "bo",
            "pa", "pi", "pu", "pe", "po",
        ];

        let FRAMES_2 = [
            [4, 3, 3, 3, 3], [3, 3, 4, 3, 3, 3], [5, 3, 3], [4, 3, 4, 3, 3], [3, 3, 3, 3],
            [3, 4, 3, 3, 3], [4, 3, 3], [3, 6, 3, 3], [4, 4, 4, 3, 3], [6, 3, 3],
            [3, 4, 3, 3, 3, 3], [3, 5, 3, 3], [4, 3, 3], [5, 3, 3], [3, 3, 3, 3],
            [4, 3, 5, 3, 3], [6, 3, 3], [3, 3, 3, 3, 3, 3], [4, 3, 3], [4, 3, 3, 5, 3, 3],
            [4, 3, 5, 4], [6, 4], [3, 3, 3, 3, 4], [4, 4], [4, 3, 3, 5, 4]
        ];

        offX = 0;
        offY = 0;
        columnsCount = 0;

        for (let i = 0; i < arr2.length; i++) {

            let frame = new Sprite({ w: 30, h: 18 }, 250 + offX, 30 + offY, "infos");                                                            //  HERE x, y
            frame.addAnimation("normal", 1, { x: 0, y: 126 }, 0.1);
            frame.changeAnimation("normal");
            Infos.hiraganaList.push(frame);

            let kanaPanel = new Panel({ w: 28, h: 16 }, frame.x + 1, frame.y + 1, null, "infos", Infos.STATE.Hiragana, "hira_" + arr2[i], 0, true);
            kanaPanel.getSprite().addAnimation("normal", 1, { x: 1, y: 127 }, 0.1);
            kanaPanel.getSprite().changeAnimation("normal");
            kanaPanel.setHoverable(true);
            kanaPanel.setAlignText(kanaPanel.ALIGN_TEXT.Left);
            kanaPanel.setOffsets(3, 12);
            kanaPanel.setFont("UD Digi Kyokasho NK-R");
            Infos.hiraganaList.push(kanaPanel.getSprite());

            let soundBtn = new Button({ w: 12, h: 12 }, frame.x + 16, frame.y + 3, { cb: Sound.playCallback, arg: "kana_" + arr2[i] }, "infos", Infos.STATE.Hiragana, "", 0, true);
            soundBtn.getSprite().addAnimation("normal", 1, { x: 0, y: 84 }, 0.1);
            soundBtn.getSprite().addAnimation("hover", 1, { x: 12, y: 84 }, 0.1);
            soundBtn.getSprite().addAnimation("down", 1, { x: 24, y: 84 }, 0.1);
            soundBtn.getSprite().changeAnimation("normal");
            Infos.hiraganaList.push(soundBtn.getSprite());

            let tooltipPanel;

            if (arr2[i] == "di") {
                tooltipPanel = new Panel({ w: 100, h: 100, v: 5 }, centerX(100, 70), 50, null, "infos", Infos.STATE.Hiragana, "roma_ji", 1);
            } else if (arr2[i] == "du") {
                tooltipPanel = new Panel({ w: 100, h: 100, v: 5 }, centerX(100, 70), 50, null, "infos", Infos.STATE.Hiragana, "roma_zu", 1);
            } else {
                tooltipPanel = new Panel({ w: 100, h: 100, v: 5 }, centerX(100, 70), 50, null, "infos", Infos.STATE.Hiragana, "roma_" + arr2[i], 1);
            }

            tooltipPanel.setTextCase("all");
            tooltipPanel.setFontSize(32);
            tooltipPanel.setFont("pgfont");
            tooltipPanel.setOffsets(5, 24);

            let kana = new Sprite({ w: 34, h: 34 }, tooltipPanel.x + 32, tooltipPanel.y + 35, "kana");

            for (let j = 0; j < FRAMES_2[i].length; j++) {
                kana.setImageDataOrigin(imageDatasArr[count], FRAMES_2[i][j]);
                count++;
            }

            kanaPanel.setTooltip(tooltipPanel);
            kanaPanel.setTooltip(kana);
            kanaPanel.setHoverCB(displayTooltip, { list: "infos.hiragana", tooltip: kanaPanel.getTooltip() });

            columnsCount++;
            if (columnsCount == 5) {
                columnsCount = 0
                offX = 0
                offY += 18 - 1; // 18 => frame.height
            } else {
                offX += 30 - 1; // 30 => frame.width
            }

        }

        let hiraganaBackBtn = new Button({ w: 40, h: 20, v: 4 }, centerX(40), CANVAS_HEIGHT - 30, { cb: Infos.changeState, arg: Infos.STATE.Main }, "infos", Infos.STATE.Hiragana, "back");
        hiraganaBackBtn.setTextCase("first");
        Infos.hiraganaList.push(hiraganaBackBtn.getSprite());
        // END----------- HIRAGANA -------------END


        // -------------- KATAKANA ----------------
        let arr3 = [
            "a", "i", "u", "e", "o",
            "ka", "ki", "ku", "ke", "ko",
            "sa", "shi", "su", "se", "so",
            "ta", "chi", "tsu", "te", "to",
            "na", "ni", "nu", "ne", "no",
            "ha", "hi", "fu", "he", "ho",
            "ma", "mi", "mu", "me", "mo",
            "ya", "-", "yu", "-", "yo",
            "ra", "ri", "ru", "re", "ro",
            "wa", "-", "-", "-", "wo",
            "n"];

        let FRAMES_3 = [
            [4, 3], [3, 3], [2, 3, 4], [3, 3, 4], [3, 4, 3],
            [4, 3], [3, 3, 3], [3, 3], [3, 3, 3], [3, 3],
            [3, 3, 3], [3, 3, 4], [3, 3], [4, 3], [3, 4],
            [3, 4, 3], [3, 3, 3], [3, 3, 3], [3, 3, 3], [3, 3],
            [3, 3], [3, 3], [3, 3], [3, 3, 3, 3], [3], //na
            [3, 3], [3, 3], [3], [4], [3, 4, 3, 3], //ha
            [4, 3], [3, 3, 3], [3, 3], [3, 3], [3, 3, 3],//ma
            [3, 3], [], [3, 3], [], [3, 3, 3],
            [3, 3], [3, 3], [3, 3], [3], [3, 3, 3],
            [3, 3], [], [], [], [3, 3, 3],
            [3, 3]];

        offX = 0;
        offY = 0;
        columnsCount = 0;

        // TODO 
        // ==>> kata:108 / tenten:103    (jusqu'à 419) 
        for (let i = 0; i < arr3.length; i++) {

            if (i != 36 && i != 38 && i != 46 && i != 47 && i != 48) {

                let frame = new Sprite({ w: 30, h: 18 }, 30 + offX, 30 + offY, "infos");                                                            //  HERE x, y
                frame.addAnimation("normal", 1, { x: 0, y: 126 }, 0.1);
                frame.changeAnimation("normal");
                Infos.katakanaList.push(frame);

                let kanaPanel = new Panel({ w: 28, h: 16 }, frame.x + 1, frame.y + 1, null, "infos", Infos.STATE.Katakana, "kata_" + arr3[i], 0, true);
                kanaPanel.getSprite().addAnimation("normal", 1, { x: 1, y: 127 }, 0.1);
                kanaPanel.getSprite().changeAnimation("normal");
                kanaPanel.setHoverable(true);
                kanaPanel.setAlignText(kanaPanel.ALIGN_TEXT.Left);
                kanaPanel.setOffsets(3, 12);
                kanaPanel.setFont("UD Digi Kyokasho NK-R");
                Infos.katakanaList.push(kanaPanel.getSprite());

                let soundBtn = new Button({ w: 12, h: 12 }, frame.x + 16, frame.y + 3, { cb: Sound.playCallback, arg: "kana_" + arr3[i] }, "infos", Infos.STATE.Katakana, "", 0, true);
                soundBtn.getSprite().addAnimation("normal", 1, { x: 0, y: 84 }, 0.1);
                soundBtn.getSprite().addAnimation("hover", 1, { x: 12, y: 84 }, 0.1);
                soundBtn.getSprite().addAnimation("down", 1, { x: 24, y: 84 }, 0.1);
                soundBtn.getSprite().changeAnimation("normal");
                Infos.katakanaList.push(soundBtn.getSprite());

                let tooltipPanel = new Panel({ w: 100, h: 100, v: 5 }, centerX(100, 70, 1), 50, null, "infos", Infos.STATE.Katakana, "roma_" + arr3[i], 1);      //  HERE x, y
                tooltipPanel.setTextCase("all");
                tooltipPanel.setFontSize(32);
                tooltipPanel.setFont("pgfont");
                tooltipPanel.setOffsets(5, 24);

                let kana = new Sprite({ w: 34, h: 34 }, tooltipPanel.x + 35, tooltipPanel.y + 35, "kana");

                for (let j = 0; j < FRAMES_3[i].length; j++) {
                    kana.setImageDataOrigin(imageDatasArr[count], FRAMES_3[i][j]); /// NON PAS imageDatasArr[j] !!! !!!!!!!!!
                    count++;
                }

                kanaPanel.setTooltip(tooltipPanel);
                kanaPanel.setTooltip(kana);
                kanaPanel.setHoverCB(displayTooltip, { list: "infos.katakana", tooltip: kanaPanel.getTooltip() });
            }
            columnsCount++;
            if (columnsCount == 5) {
                columnsCount = 0
                offX = 0
                offY += 18 - 1; // 18 => frame.height
            } else {
                offX += 30 - 1; // 30 => frame.width
            }
        }


        let arr4 = [
            "ga", "gi", "gu", "ge", "go",
            "za", "ji", "zu", "ze", "zo",
            "da", "di", "du", "de", "do",
            "ba", "bi", "bu", "be", "bo",
            "pa", "pi", "pu", "pe", "po",
        ];

        let FRAMES_4 = [
            [4, 3, 3, 3], [3, 3, 3, 3, 3], [3, 3, 3, 3], [3, 3, 3, 3, 3], [3, 3, 3, 3],
            [3, 3, 3, 3, 3], [3, 3, 4, 3, 3], [3, 3, 3, 3], [4, 3, 3, 3], [3, 4, 3, 3],
            [3, 4, 3, 3, 3], [3, 3, 3, 3, 3], [3, 3, 3, 3, 3], [3, 3, 3, 3, 3], [3, 3, 3, 3],
            [3, 3, 3, 3], [3, 3, 3, 3], [3, 3, 3], [4, 3, 3], [3, 4, 3, 3, 3, 3],
            [3, 3, 4], [3, 3, 4], [3, 4], [4, 4], [3, 4, 3, 3, 4]
        ];

        offX = 0;
        offY = 0;
        columnsCount = 0;

        for (let i = 0; i < arr4.length; i++) {

            let frame = new Sprite({ w: 30, h: 18 }, 250 + offX, 30 + offY, "infos");                                                            //  HERE x, y
            frame.addAnimation("normal", 1, { x: 0, y: 126 }, 0.1);
            frame.changeAnimation("normal");
            Infos.katakanaList.push(frame);

            let kanaPanel = new Panel({ w: 28, h: 16 }, frame.x + 1, frame.y + 1, null, "infos", Infos.STATE.Katakana, "kata_" + arr4[i], 0, true);
            kanaPanel.getSprite().addAnimation("normal", 1, { x: 1, y: 127 }, 0.1);
            kanaPanel.getSprite().changeAnimation("normal");
            kanaPanel.setHoverable(true);
            kanaPanel.setAlignText(kanaPanel.ALIGN_TEXT.Left);
            kanaPanel.setOffsets(3, 12);
            kanaPanel.setFont("UD Digi Kyokasho NK-R");
            Infos.katakanaList.push(kanaPanel.getSprite());

            let soundBtn = new Button({ w: 12, h: 12 }, frame.x + 16, frame.y + 3, { cb: Sound.playCallback, arg: "kana_" + arr4[i] }, "infos", Infos.STATE.Katakana, "", 0, true);
            soundBtn.getSprite().addAnimation("normal", 1, { x: 0, y: 84 }, 0.1);
            soundBtn.getSprite().addAnimation("hover", 1, { x: 12, y: 84 }, 0.1);
            soundBtn.getSprite().addAnimation("down", 1, { x: 24, y: 84 }, 0.1);
            soundBtn.getSprite().changeAnimation("normal");
            Infos.katakanaList.push(soundBtn.getSprite());

            let tooltipPanel;

            if (arr2[i] == "di") {
                tooltipPanel = new Panel({ w: 100, h: 100, v: 5 }, centerX(100, 70), 50, null, "infos", Infos.STATE.Katakana, "roma_ji", 1);
            } else if (arr2[i] == "du") {
                tooltipPanel = new Panel({ w: 100, h: 100, v: 5 }, centerX(100, 70), 50, null, "infos", Infos.STATE.Katakana, "roma_zu", 1);
            } else {
                tooltipPanel = new Panel({ w: 100, h: 100, v: 5 }, centerX(100, 70), 50, null, "infos", Infos.STATE.Katakana, "roma_" + arr2[i], 1);
            }

            tooltipPanel.setTextCase("all");
            tooltipPanel.setFontSize(32);
            tooltipPanel.setFont("pgfont");
            tooltipPanel.setOffsets(5, 24);

            let kana = new Sprite({ w: 34, h: 34 }, tooltipPanel.x + 32, tooltipPanel.y + 35, "kana");

            for (let j = 0; j < FRAMES_4[i].length; j++) {
                kana.setImageDataOrigin(imageDatasArr[count], FRAMES_4[i][j]);
                count++;
            }

            kanaPanel.setTooltip(tooltipPanel);
            kanaPanel.setTooltip(kana);
            kanaPanel.setHoverCB(displayTooltip, { list: "infos.katakana", tooltip: kanaPanel.getTooltip() });

            columnsCount++;
            if (columnsCount == 5) {
                columnsCount = 0
                offX = 0
                offY += 18 - 1; // 18 => frame.height
            } else {
                offX += 30 - 1; // 30 => frame.width
            }

        }

        let katakanaBackBtn = new Button({ w: 40, h: 20, v: 4 }, centerX(40), CANVAS_HEIGHT - 30, { cb: Infos.changeState, arg: Infos.STATE.Main }, "infos", Infos.STATE.Katakana, "back");
        katakanaBackBtn.setTextCase("first");
        Infos.katakanaList.push(katakanaBackBtn.getSprite());
        // END----------- KATAKANA -------------END

    }

    static changeState(pNewState) {
        Infos.state = pNewState;
        Panel.resetTypeState("infos", pNewState);
        Button.resetTypeState("infos", pNewState);
    }

    static update(dt) {

        Infos.list.forEach(sp => {
            if (sp instanceof Sprite) {
                sp.update(dt);
            }
        })

        Infos.hiraganaList.forEach(sp => {
            if (sp instanceof Sprite) {
                sp.update(dt);
            }
        })

        Infos.katakanaList.forEach(sp => {
            if (sp instanceof Sprite) {
                sp.update(dt);
            }
        })

        Sprite.kanaList.forEach(sp => {
            if (sp.active) {
                sp.updateKana(dt);
            }
        })

        Infos.list = Infos.list.filter(sp => {
            return !sp.delete;
        });

        Infos.hiraganaList = Infos.hiraganaList.filter(sp => {
            return !sp.delete;
        });

        Infos.katakanaList = Infos.katakanaList.filter(sp => {
            return !sp.delete;
        });


        if (FadeEffect.bActive) {
            FadeEffect.update(dt);
        }
    }

    static draw(ctx) {

        switch (Infos.state) {
            case Infos.STATE.Main:
                ctx.fillStyle = "rgb(200,0,0)";
                ctx.font = "40px jpfont";
                ctx.textAlign = "center";
                ctx.fillText(LANG["infos"], centerX(), 40);
                ctx.textAlign = "left";

                Sprite.manageBeforeDrawing(Infos.list);
                break;
            case Infos.STATE.Hiragana:
                Sprite.manageBeforeDrawing(Infos.hiraganaList);
                break;
            case Infos.STATE.Katakana:
                Sprite.manageBeforeDrawing(Infos.katakanaList);
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