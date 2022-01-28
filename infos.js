class Infos {

    static list = [];
    static hiraganaList = [];
    static katakanaList = [];

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
        let hiraganaBtn = new Button({ w: 50, h: 20, v: 4 }, centerX(50), centerY(50), null, { cb: Infos.changeState, arg: Infos.STATE.Hiragana }, "infos", Infos.STATE.Main, "Hiragana");
        Infos.list.push(hiraganaBtn.getSprite());

        let katakanaBtn = new Button({ w: 50, h: 20, v: 4 }, centerX(50), centerY(50, 30, 1), null, { cb: Infos.changeState, arg: Infos.STATE.Katakana }, "infos", Infos.STATE.Main, "Katakana");
        Infos.list.push(katakanaBtn.getSprite());

        let backBtn = new Button({ w: 30, h: 22 }, centerX(30), centerY(22, 60, 1), null, toMainMenu, "infos", Infos.STATE.Main, "", 0, true);
        backBtn.setAnimations({ x: 86, y: 56 });
        Infos.list.push(backBtn.getSprite());


        // END------------- MAIN ---------------END

        let offX = 0;
        let offY = 0;
        let columnsCount = 0;

        let descriptionList = "aiueohahifuheho";

        let kanaArray = [
            "hira_a", "hira_i", "hira_u", "hira_e", "hira_o",
            "hira_ka", "hira_ki", "hira_ku", "hira_ke", "hira_ko",
            "hira_sa", "hira_shi", "hira_su", "hira_se", "hira_so",
            "hira_ta", "hira_chi", "hira_tsu", "hira_te", "hira_to",
            "hira_na", "hira_ni", "hira_nu", "hira_ne", "hira_no",
            "hira_ha", "hira_hi", "hira_fu", "hira_he", "hira_ho",
            "hira_ma", "hira_mi", "hira_mu", "hira_me", "hira_mo",
            "hira_ya", "-", "hira_yu", "-", "hira_yo",
            "hira_ra", "hira_ri", "hira_ru", "hira_re", "hira_ro",
            "hira_wa", "-", "-", "-", "hira_wo",
            "hira_n", //51
            "hira_ga", "hira_gi", "hira_gu", "hira_ge", "hira_go",
            "hira_za", "hira_ji", "hira_zu", "hira_ze", "hira_zo",
            "hira_da", "hira_di", "hira_du", "hira_de", "hira_do",
            "hira_ba", "hira_bi", "hira_bu", "hira_be", "hira_bo",
            "hira_pa", "hira_pi", "hira_pu", "hira_pe", "hira_po", // 76
            "kata_a", "kata_i", "kata_u", "kata_e", "kata_o",
            "kata_ka", "kata_ki", "kata_ku", "kata_ke", "kata_ko",
            "kata_sa", "kata_shi", "kata_su", "kata_se", "kata_so",
            "kata_ta", "kata_chi", "kata_tsu", "kata_te", "kata_to",
            "kata_na", "kata_ni", "kata_nu", "kata_ne", "kata_no",
            "kata_ha", "kata_hi", "kata_fu", "kata_he", "kata_ho",
            "kata_ma", "kata_mi", "kata_mu", "kata_me", "kata_mo", //111
            "kata_ya", "-", "kata_yu", "-", "kata_yo",
            "kata_ra", "kata_ri", "kata_ru", "kata_re", "kata_ro",
            "kata_wa", "-", "-", "-", "kata_wo",
            "kata_n", //127
            "kata_ga", "kata_gi", "kata_gu", "kata_ge", "kata_go",
            "kata_za", "kata_ji", "kata_zu", "kata_ze", "kata_zo",
            "kata_da", "kata_di", "kata_du", "kata_de", "kata_do",
            "kata_ba", "kata_bi", "kata_bu", "kata_be", "kata_bo",
            "kata_pa", "kata_pi", "kata_pu", "kata_pe", "kata_po" //152
        ];

        let frameX = 30;
        let kanaWidth = 34;
        let kanaOffX = 35;
        let state = Infos.STATE.Hiragana;
        let kanaList = "hiragana";

        for (let i = 0; i < 152; i++) {

            if (i == 51 || i == 127) {
                columnsCount = 0;
                offX = 0;
                offY = 0;
                frameX = centerX(30, 64, 1);
                kanaWidth = 38;
                kanaOffX = 32;
            }
            if (i == 76) {
                columnsCount = 0;
                offX = 0;
                offY = 0;
                frameX = 30;
                kanaWidth = 34;
                kanaOffX = 35;
                state = Infos.STATE.Katakana;
                kanaList = "katakana"
            }

            if (i != 36 && i != 38 && i != 46 && i != 47 && i != 48 && i != 112 && i != 114 && i != 122 && i != 123 && i != 124) {

                let frame = new Sprite({ w: 30, h: 18 }, frameX + offX, 30 + offY, null, "infos");
                frame.addAnimation("normal", { x: 0, y: 126 });
                frame.changeAnimation("normal");
                state == Infos.STATE.Hiragana ? Infos.hiraganaList.push(frame) : Infos.katakanaList.push(frame);

                let kanaPanel = new Panel({ w: 28, h: 16 }, frame.x + 1, frame.y + 1, null, "infos", state, kanaArray[i], 0, true);
                kanaPanel.getSprite().addAnimation("normal", { x: 1, y: 127 });
                kanaPanel.getSprite().changeAnimation("normal");
                kanaPanel.setHoverable(true);
                kanaPanel.setAlignText(kanaPanel.ALIGN_TEXT.Left);
                kanaPanel.setOffsets(3, 12);
                kanaPanel.setFont("kyokasho");
                state == Infos.STATE.Hiragana ? Infos.hiraganaList.push(kanaPanel.getSprite()) : Infos.katakanaList.push(kanaPanel.getSprite());

                let soundBtn = new Button({ w: 12, h: 12 }, frame.x + 16, frame.y + 3, null, { cb: Sound.playCallback, arg: "kana_" + KANA[kanaArray[i]].roma }, "infos", state, "", 0, true);
                soundBtn.setAnimations({ x: 0, y: 84 });
                state == Infos.STATE.Hiragana ? Infos.hiraganaList.push(soundBtn.getSprite()) : Infos.katakanaList.push(soundBtn.getSprite());

                let tooltipPanel;
                let romaLabel = "";
                if (KANA[kanaArray[i]].roma == "di") {
                    romaLabel = "ji";
                } else if (KANA[kanaArray[i]].roma == "du") {
                    romaLabel = "zu";
                } else {
                    romaLabel = KANA[kanaArray[i]].roma;
                }

                tooltipPanel = new Panel({ w: 100, h: 100, v: 5 }, centerX(100, 98, 1), 130, null, "infos", state, "roma_" + romaLabel, 1);
                tooltipPanel.setTextCase("all");
                tooltipPanel.setFontSize(32);
                tooltipPanel.setFont("pgfont");
                tooltipPanel.setOffsets(5, 24);

                let kana = new Sprite({ w: kanaWidth, h: 34 }, tooltipPanel.x + kanaOffX, tooltipPanel.y + 35, null, "kana");     // w: 38   x + 32

                for (let j = 0; j < KANA[kanaArray[i]].frames.length; j++) {
                    kana.setImageDataOrigin(KANA[kanaArray[i]].imageData[j], KANA[kanaArray[i]].frames[j]);
                }
                // TODO CHANGEMENTS !! : 
                // if (descriptionList.includes(KANA[kanaArray[i]].roma)) {
                //     let bottomInfoPanel = new Panel({ w: 450, h: 50, v: 5 }, 0, CANVAS_HEIGHT - 50, null, "infos", state, KANA[kanaArray[i]].roma + "_description", 1);
                //     bottomInfoPanel.setOffsets(5, 24);
                //     kanaPanel.setTooltip(bottomInfoPanel);
                // }
                kanaPanel.setTooltip(tooltipPanel);
                kanaPanel.setTooltip(kana);
                kanaPanel.setHoverCB(displayTooltip, { list: "infos." + kanaList, tooltip: kanaPanel.getTooltip() });
            }
            columnsCount++;
            if (columnsCount == 5) {
                columnsCount = 0;
                offX = 0;
                offY += 18 - 1; // 18 => frame.height
            } else {
                offX += 30 - 1; // 30 => frame.width
            }
        }

        let hiraganaBackBtn = new Button({ w: 30, h: 22 }, centerX(30), CANVAS_HEIGHT - 30, null, { cb: Infos.changeState, arg: Infos.STATE.Main }, "infos", Infos.STATE.Hiragana, "", 0, true);
        hiraganaBackBtn.setAnimations({ x: 86, y: 56 });
        Infos.hiraganaList.push(hiraganaBackBtn.getSprite());

        let katakanaBackBtn = new Button({ w: 30, h: 22 }, centerX(30), CANVAS_HEIGHT - 30, null, { cb: Infos.changeState, arg: Infos.STATE.Main }, "infos", Infos.STATE.Katakana, "", 0, true);
        katakanaBackBtn.setAnimations({ x: 86, y: 56 });
        Infos.katakanaList.push(katakanaBackBtn.getSprite());
    }

    static changeState(pNewState) {
        Infos.state = pNewState;
        Panel.resetTypeState("infos", pNewState);
        Button.resetTypeState("infos", pNewState);
    }

    static update(dt) {

        Sprite.manageBeforeUpdating(Infos.list, dt);
        Sprite.manageBeforeUpdating(Infos.hiraganaList, dt);
        Sprite.manageBeforeUpdating(Infos.katakanaList, dt);

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
                ctx.shadowColor = "rgb(0,0,0)";
                ctx.shadowOffsetY = 8;
                ctx.fillText(LANG["Infos"], centerX(), 40);
                ctx.shadowOffsetY = 0;
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