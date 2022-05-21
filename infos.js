class Infos {

    static list = [];
    static hiraganaList = [];
    static katakanaList = [];

    static hiraSpecialList = [];
    static kataSpecialList = [];
    static kataSpecial2List = [];

    static bInit = false;

    static STATE = Object.freeze({
        Main: 0,
        Hiragana: 1,
        Katakana: 2,
        HiraSpecial: 3,
        KataSpecial: 4,
        KataSpecial2: 5
    })

    static SUB_STATE = Object.freeze({
        Normal: 1,
        Special: 2
    })

    static state = Infos.STATE.Main;
    static subState = Infos.SUB_STATE.Normal;

    constructor() {

    }

    static init() {

        Infos.bInit = true;


        // ---------------- MAIN ------------------

        let titlePanel = new Panel({ w: 8, h: 2, v: 9 }, centerX(106), 20, null, "infos", Infos.STATE.Main, "kana_boards", [-1, { y_t: 748 }]);//748 835
        titlePanel.setOffsets(0, 22);
        Infos.list.push(titlePanel.getSprite());

        let hiraganaBtn = new Button({ w: 80, h: 40, v: 6 }, centerX(80), centerY(40, 30), null, { cb: Infos.changeState, arg: Infos.STATE.Hiragana }, "infos", Infos.STATE.Main, "Hiragana", 41);
        hiraganaBtn.setFontColor(RED_BTN_SDW_COLOR);
        hiraganaBtn.setOffsets(0, 22);
        Infos.list.push(hiraganaBtn.getSprite());

        let katakanaBtn = new Button({ w: 80, h: 40, v: 6 }, centerX(80), centerY(50, 30, 1), null, { cb: Infos.changeState, arg: Infos.STATE.Katakana }, "infos", Infos.STATE.Main, "Katakana", 41);
        katakanaBtn.setFontColor(RED_BTN_SDW_COLOR);
        katakanaBtn.setOffsets(0, 22);
        Infos.list.push(katakanaBtn.getSprite());

        let backBtn = new Button({ w: 30, h: 22 }, centerX(30), centerY(22, 80, 1), null, toMainMenu, "infos", Infos.STATE.Main, "", 0, true);
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

        let kanaSpecArray = [
            "hira_kya", "hira_kyu", "hira_kyo",
            "hira_sha", "hira_shu", "hira_sho",
            "hira_cha", "hira_chu", "hira_cho",
            "hira_nya", "hira_nyu", "hira_nyo",
            "hira_hya", "hira_hyu", "hira_hyo",
            "hira_mya", "hira_myu", "hira_myo",
            "hira_rya", "hira_ryu", "hira_ryo",
            "hira_gya", "hira_gyu", "hira_gyo",
            "hira_ja", "hira_ju", "hira_jo",
            "hira_bya", "hira_byu", "hira_byo",
            "hira_pya", "hira_pyu", "hira_pyo",
            "kata_kya", "kata_kyu", "kata_kyo",
            "kata_sha", "kata_shu", "kata_sho",
            "kata_cha", "kata_chu", "kata_cho",
            "kata_nya", "kata_nyu", "kata_nyo",
            "kata_hya", "kata_hyu", "kata_hyo",
            "kata_mya", "kata_myu", "kata_myo",
            "kata_rya", "kata_ryu", "kata_ryo",
            "kata_gya", "kata_gyu", "kata_gyo",
            "kata_ja", "kata_ju", "kata_jo",
            "kata_bya", "kata_byu", "kata_byo",
            "kata_pya", "kata_pyu", "kata_pyo"
        ]

        let kanaSpecArray2 = [
            "kata_wi",
            "kata_we",
            "kata_wwo",
            "kata_va",
            "kata_vi",
            "kata_ve",
            "kata_vo",
            "kata_che",
            "kata_she",
            "kata_je",
            "kata_ti",
            "kata_de_i",
            "kata_tu",
            "kata_de_u",
            "kata_fa",
            "kata_fi",
            "kata_fe",
            "kata_fo"
        ]

        let frameX = 20;
        let kanaWidth = 34;
        let kanaOffX = 35;
        let state = Infos.STATE.Hiragana;
        let kanaList = "hiragana";


        let hiraGreenPanel = new Panel({ w: 200, h: 265, v: 6 }, 5, 15, null, "infos", state, "", 7);
        Infos.hiraganaList.push(hiraGreenPanel.getSprite());
        let hiraGreenPanel2 = new Panel({ w: 200, h: 140, v: 6 }, 235, 15, null, "infos", state, "", 7);
        Infos.hiraganaList.push(hiraGreenPanel2.getSprite());
        let kataGreenPanel = new Panel({ w: 200, h: 265, v: 6 }, 5, 15, null, "infos", state, "", 7);
        Infos.katakanaList.push(kataGreenPanel.getSprite());
        let kataGreenPanel2 = new Panel({ w: 200, h: 140, v: 6 }, 235, 15, null, "infos", state, "", 7);
        Infos.katakanaList.push(kataGreenPanel2.getSprite());


        let hiraGreenBoard1 = new Sprite({ w: 171, h: 243 }, 20, 25, null, "infos");
        hiraGreenBoard1.addAnimation("normal", { x: 1360, y: 272 });
        hiraGreenBoard1.changeAnimation("normal");
        Infos.hiraganaList.push(hiraGreenBoard1);
        let hiraGreenBoard2 = new Sprite({ w: 171, h: 111 }, 250, 25, null, "infos");
        hiraGreenBoard2.addAnimation("normal", { x: 1536, y: 272 });
        hiraGreenBoard2.changeAnimation("normal");
        Infos.hiraganaList.push(hiraGreenBoard2);

        let kataGreenBoard1 = new Sprite({ w: 171, h: 243 }, 20, 25, null, "infos");
        kataGreenBoard1.addAnimation("normal", { x: 1360, y: 272 });
        kataGreenBoard1.changeAnimation("normal");
        Infos.katakanaList.push(kataGreenBoard1);
        let kataGreenBoard2 = new Sprite({ w: 171, h: 111 }, 250, 25, null, "infos");
        kataGreenBoard2.addAnimation("normal", { x: 1536, y: 272 });
        kataGreenBoard2.changeAnimation("normal");
        Infos.katakanaList.push(kataGreenBoard2);


        for (let i = 0; i < 152; i++) {

            if (i == 51 || i == 127) {
                columnsCount = 0;
                offX = 0;
                offY = 0;
                frameX = 250;
                kanaWidth = 38;
                kanaOffX = 32;
            }
            if (i == 76) {
                columnsCount = 0;
                offX = 0;
                offY = 0;
                frameX = 20;
                kanaWidth = 34;
                kanaOffX = 35;
                state = Infos.STATE.Katakana;
                kanaList = "katakana"
            }

            if (i != 36 && i != 38 && i != 46 && i != 47 && i != 48 && i != 112 && i != 114 && i != 122 && i != 123 && i != 124) {

                // let frame = new Sprite({ w: 30, h: 18 }, frameX + offX, 30 + offY, null, "infos");
                // frame.addAnimation("normal", { x: 0, y: 126 });
                // frame.changeAnimation("normal");


                // let frame = new Sprite({ w: 35, h: 23 }, frameX + offX, 25 + offY, null, "infos");
                // frame.addAnimation("normal", { x: 352, y: 160 });
                // frame.changeAnimation("normal");

                // state == Infos.STATE.Hiragana ? Infos.hiraganaList.push(frame) : Infos.katakanaList.push(frame);

                let frame = {
                    x: frameX + offX,
                    y: 25 + offY
                }

                // let kanaPanel = new Panel({ w: 33, h: 22 }, frame.x + 1, frame.y + 1, null, "infos", state, kanaArray[i], 0, true);
                let kanaPanel = new Panel({ w: 33, h: 22 }, frame.x + 1, frame.y + 1, null, "infos", state, kanaArray[i], 0, true);
                kanaPanel.getSprite().addAnimation("normal", { x: 353, y: 161 });
                kanaPanel.getSprite().changeAnimation("normal");
                kanaPanel.setHoverable(true);
                kanaPanel.setAlignText(kanaPanel.ALIGN_TEXT.Left);
                kanaPanel.setOffsets(0, 16);
                kanaPanel.setFont("kyokasho");
                kanaPanel.setFontSize(15);
                kanaPanel.setFontColor(GREEN_BOARD_SDW_COLOR, WHITE_COLOR, GREEN_BOARD_SDW_COLOR, BLACK_COLOR);
                state == Infos.STATE.Hiragana ? Infos.hiraganaList.push(kanaPanel.getSprite()) : Infos.katakanaList.push(kanaPanel.getSprite());

                let soundBtn = new Button({ w: 16, h: 15 }, frame.x + 17, frame.y + 4, null, { cb: Sound.playCallback, arg: "kana_" + KANA[kanaArray[i]].roma }, "infos", state, "", 0, true);
                soundBtn.setAnimations({ x: 112, y: 112 });

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

                tooltipPanel = new Panel({ w: 105, h: 105 }, centerX(100, 98, 1), 170, null, "infos", state, "roma_" + romaLabel, 0, true);
                tooltipPanel.getSprite().addAnimation("normal", { x: 1536, y: 384 });
                tooltipPanel.getSprite().changeAnimation("normal");

                // tooltipPanel = new Panel({ w: 8, h: 8, v: 9 }, centerX(100, 98, 1), 170, null, "infos", state, "roma_" + romaLabel, [-1, { y_t: 777 }]);//748 835
                // tooltipPanel.changePanelSprite("t", 3, { x: 427, y: 777 });
                // tooltipPanel.changePanelSprite("t", 4, { x: 438, y: 777 });
                // tooltipPanel.changePanelSprite("b", 3, { x: 427, y: 786 });
                // tooltipPanel.changePanelSprite("b", 4, { x: 438, y: 786 });

                // let kanaAnimPanel = new Panel({ w: 70, h: 45, v: 10 }, centerXElement(tooltipPanel, 70), 46, tooltipPanel, "infos", state, "", 3);

                tooltipPanel.setFontSize(30);
                tooltipPanel.setFont("kyokasho");
                tooltipPanel.setOffsets(5, 35);

                let kana = new Sprite({ w: kanaWidth, h: 34 }, tooltipPanel.x + kanaOffX, tooltipPanel.y + 50, null, "kana");     // w: 38   x + 32

                for (let j = 0; j < KANA[kanaArray[i]].frames.length; j++) {
                    kana.setImageDataOrigin(KANA[kanaArray[i]].imageData[j], KANA[kanaArray[i]].frames[j]);
                }

                kanaPanel.setTooltip(tooltipPanel);
                // kanaPanel.setTooltip(kanaAnimPanel);
                kanaPanel.setTooltip(kana);
                kanaPanel.setHoverCB(displayTooltip, { list: "infos." + kanaList, tooltip: kanaPanel.getTooltip() });
            }
            columnsCount++;
            if (columnsCount == 5) {
                columnsCount = 0;
                offX = 0;
                offY += 23 - 1; // 23 => frame.height
            } else {
                offX += 35 - 1; // 35 => frame.width
            }
        }

        let hiraSwitchBoardBtn = new Button({ w: 29, h: 27 }, 210, 230, null, { cb: Infos.changeState, arg: Infos.STATE.HiraSpecial }, "infos", Infos.STATE.Hiragana, "", 0, true);
        hiraSwitchBoardBtn.setAnimations({ x: 832, y: 144 });
        Infos.hiraganaList.push(hiraSwitchBoardBtn.getSprite());

        let hiraganaBackBtn = new Button({ w: 30, h: 22 }, centerX(30), CANVAS_HEIGHT - 30, null, { cb: Infos.changeState, arg: Infos.STATE.Main }, "infos", Infos.STATE.Hiragana, "", 0, true);
        hiraganaBackBtn.setAnimations({ x: 86, y: 56 });
        Infos.hiraganaList.push(hiraganaBackBtn.getSprite());

        let hiraSpecSwitchBoardBtn = new Button({ w: 29, h: 27 }, 210, 230, null, { cb: Infos.changeState, arg: Infos.STATE.Hiragana }, "infos", Infos.STATE.HiraSpecial, "", 0, true);
        hiraSpecSwitchBoardBtn.setAnimations({ x: 832, y: 144 });
        Infos.hiraSpecialList.push(hiraSpecSwitchBoardBtn.getSprite());

        let hiraSpecBackBtn = new Button({ w: 30, h: 22 }, centerX(30), CANVAS_HEIGHT - 30, null, { cb: Infos.changeState, arg: Infos.STATE.Main }, "infos", Infos.STATE.HiraSpecial, "", 0, true);
        hiraSpecBackBtn.setAnimations({ x: 86, y: 56 });
        Infos.hiraSpecialList.push(hiraSpecBackBtn.getSprite());


        let kataSwitchBoardBtn = new Button({ w: 29, h: 27 }, 210, 230, null, { cb: Infos.changeState, arg: Infos.STATE.KataSpecial }, "infos", Infos.STATE.Katakana, "", 0, true);
        kataSwitchBoardBtn.setAnimations({ x: 832, y: 144 });
        Infos.katakanaList.push(kataSwitchBoardBtn.getSprite());

        let katakanaBackBtn = new Button({ w: 30, h: 22 }, centerX(30), CANVAS_HEIGHT - 30, null, { cb: Infos.changeState, arg: Infos.STATE.Main }, "infos", Infos.STATE.Katakana, "", 0, true);
        katakanaBackBtn.setAnimations({ x: 86, y: 56 });
        Infos.katakanaList.push(katakanaBackBtn.getSprite());

        let kataSpecSwitchBoardBtn = new Button({ w: 29, h: 27 }, 210, 230, null, { cb: Infos.changeState, arg: Infos.STATE.KataSpecial2 }, "infos", Infos.STATE.KataSpecial, "", 0, true);
        kataSpecSwitchBoardBtn.setAnimations({ x: 832, y: 144 });
        Infos.kataSpecialList.push(kataSpecSwitchBoardBtn.getSprite());

        let kataSpecBackBtn = new Button({ w: 30, h: 22 }, centerX(30), CANVAS_HEIGHT - 30, null, { cb: Infos.changeState, arg: Infos.STATE.Main }, "infos", Infos.STATE.KataSpecial, "", 0, true);
        kataSpecBackBtn.setAnimations({ x: 86, y: 56 });
        Infos.kataSpecialList.push(kataSpecBackBtn.getSprite());

        let kataSpec2SwitchBoardBtn = new Button({ w: 29, h: 27 }, 210, 230, null, { cb: Infos.changeState, arg: Infos.STATE.Katakana }, "infos", Infos.STATE.KataSpecial2, "", 0, true);
        kataSpec2SwitchBoardBtn.setAnimations({ x: 832, y: 144 });
        Infos.kataSpecial2List.push(kataSpec2SwitchBoardBtn.getSprite());

        let kataSpec2BackBtn = new Button({ w: 30, h: 22 }, centerX(30), CANVAS_HEIGHT - 30, null, { cb: Infos.changeState, arg: Infos.STATE.Main }, "infos", Infos.STATE.KataSpecial2, "", 0, true);
        kataSpec2BackBtn.setAnimations({ x: 86, y: 56 });
        Infos.kataSpecial2List.push(kataSpec2BackBtn.getSprite());


        // ---------------- SPECIAL ------------------

        let hiraSpecGreenPanel = new Panel({ w: 430, h: 200, v: 6 }, centerX(430), 10, null, "infos", Infos.STATE.HiraSpecial, "", 7);
        Infos.hiraSpecialList.push(hiraSpecGreenPanel.getSprite());
        // let hiraSpecGreenPanel2 = new Panel({ w: 200, h: 140, v: 6 }, 235, 15, null, "infos", Infos.STATE.HiraSpecial, "", 7);
        // Infos.hiraSpecialList.push(hiraSpecGreenPanel2.getSprite());
        // let kataSpecGreenPanel = new Panel({ w: 200, h: 265, v: 6 }, 5, 15, null, "infos", Infos.STATE.KataSpecial, "", 7);
        let kataSpecGreenPanel = new Panel({ w: 430, h: 200, v: 6 }, centerX(430), 10, null, "infos", Infos.STATE.KataSpecial, "", 7);
        Infos.kataSpecialList.push(kataSpecGreenPanel.getSprite());
        // let kataSpecGreenPanel2 = new Panel({ w: 200, h: 140, v: 6 }, 235, 15, null, "infos", Infos.STATE.KataSpecial, "", 7);
        // Infos.kataSpecialList.push(kataSpecGreenPanel2.getSprite());


        offX = 6;
        offY = 7;
        columnsCount = 0;
        state = Infos.STATE.HiraSpecial;
        kanaList = "hiragana";
        let parent = hiraSpecGreenPanel
        for (let i = 0; i < kanaSpecArray.length; i++) { // 0-32 Hira 33~ Kata

            if (i == 33) {
                columnsCount = 0;
                offX = 6;
                offY = 7;
                state = Infos.STATE.KataSpecial;
                parent = null;
                parent = kataSpecGreenPanel;
            }

            let kanaPanel = new Panel({ w: 139, h: 15 }, offX, offY, parent, "infos", state, kanaSpecArray[i], 0, true);
            kanaPanel.getSprite().addAnimation("normal", { x: 934, y: 10 });
            kanaPanel.getSprite().changeAnimation("normal");
            kanaPanel.setHoverable(true);
            kanaPanel.setAlignText(kanaPanel.ALIGN_TEXT.Left);
            kanaPanel.setOffsets(5, 10);
            kanaPanel.setFont("kyokasho");
            kanaPanel.setFontSize(10);
            kanaPanel.setFontColor(GREEN_BOARD_SDW_COLOR, WHITE_COLOR, GREEN_BOARD_SDW_COLOR, BLACK_COLOR);
            state == Infos.STATE.HiraSpecial ? Infos.hiraSpecialList.push(kanaPanel.getSprite()) : Infos.kataSpecialList.push(kanaPanel.getSprite())
            // Infos.hiraSpecialList.push(kanaPanel.getSprite());

            // log("kana_" + kanaSpecArray[i].slice(5));

            let soundBtn = new Button({ w: 16, h: 15 }, offX + 116, offY, parent, { cb: Sound.playCallback, arg: "kana_" + kanaSpecArray[i].slice(5) }, "infos", state, "", 0, true);
            soundBtn.setAnimations({ x: 112, y: 112 });
            state == Infos.STATE.HiraSpecial ? Infos.hiraSpecialList.push(soundBtn.getSprite()) : Infos.kataSpecialList.push(soundBtn.getSprite())
            // Infos.hiraSpecialList.push(soundBtn.getSprite());

            columnsCount++;
            offX += 139;

            if (columnsCount == 3) {
                columnsCount = 0;
                offX = 6;
                offY += 17;
            }

        }

        //! ------ KATA SPECIAL 2 ------

        let kataSpec2GreenPanel = new Panel({ w: 350, h: 150, v: 6 }, centerX(350), 10, null, "infos", Infos.STATE.KataSpecial2, "special_combinations", 7);
        kataSpec2GreenPanel.setOffsets(5, 20);
        kataSpec2GreenPanel.setFontColor(GREEN_BOARD_SDW_COLOR, WHITE_COLOR);
        Infos.kataSpecial2List.push(kataSpec2GreenPanel.getSprite());

        let originX = 70;
        offX = originX;
        offY = 34;
        columnsCount = 0;
        state = Infos.STATE.KataSpecial2;
        kanaList = "hiragana";
        for (let i = 0; i < kanaSpecArray2.length; i++) {

            let kanaPanel = new Panel({ w: 66, h: 15 }, offX, offY, kataSpec2GreenPanel, "infos", Infos.STATE.KataSpecial2, kanaSpecArray2[i], 0, true);
            kanaPanel.getSprite().addAnimation("normal", { x: 934, y: 10 });
            kanaPanel.getSprite().changeAnimation("normal");
            kanaPanel.setHoverable(true);
            kanaPanel.setAlignText(kanaPanel.ALIGN_TEXT.Left);
            kanaPanel.setOffsets(5, 10);
            kanaPanel.setFont("kyokasho");
            kanaPanel.setFontSize(10);
            kanaPanel.setFontColor(GREEN_BOARD_SDW_COLOR, WHITE_COLOR, GREEN_BOARD_SDW_COLOR, BLACK_COLOR);
            Infos.kataSpecial2List.push(kanaPanel.getSprite());

            let soundBtn = new Button({ w: 16, h: 15 }, offX + 50, offY, kataSpec2GreenPanel, { cb: Sound.playCallback, arg: "kana_" + kanaSpecArray2[i].slice(5) }, "infos", Infos.STATE.KataSpecial2, "", 0, true);
            soundBtn.setAnimations({ x: 112, y: 112 });
            Infos.kataSpecial2List.push(soundBtn.getSprite());

            columnsCount++;
            offX += 72;

            if (columnsCount == 3) {
                columnsCount = 0;
                offX = originX;
                offY += 17;
            }

        }

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
        Sprite.manageBeforeUpdating(Infos.hiraSpecialList, dt);
        Sprite.manageBeforeUpdating(Infos.kataSpecialList, dt);
        Sprite.manageBeforeUpdating(Infos.kataSpecial2List, dt);

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

                Sprite.manageBeforeDrawing(Infos.list);
                break;
            case Infos.STATE.Hiragana:
                Sprite.manageBeforeDrawing(Infos.hiraganaList);
                break;
            case Infos.STATE.Katakana:
                Sprite.manageBeforeDrawing(Infos.katakanaList);
                break;
            case Infos.STATE.HiraSpecial:
                Sprite.manageBeforeDrawing(Infos.hiraSpecialList);
                break;
            case Infos.STATE.KataSpecial:
                Sprite.manageBeforeDrawing(Infos.kataSpecialList);
                break;
            case Infos.STATE.KataSpecial2:
                Sprite.manageBeforeDrawing(Infos.kataSpecial2List);
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