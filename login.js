class Login {

    static STATE = Object.freeze({
        Main: 0,
        Signup: 1,
        Login: 2
    });

    static currentState = Login.STATE.Main;

    static bInit = false;

    static list = [];
    static signupList = [];
    static loginList = [];
    // static keyboardList = [];
    static loadingList = [];

    static LC_alphabet = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "a", "s", "d", "f", "g", "h", "j", "k", "l", "z", "x", "c", "v", "b", "n", "m"];
    static UC_alphabet = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "A", "S", "D", "F", "G", "H", "J", "K", "L", "W", "X", "C", "V", "B", "N", "M"];
    static bCaps = true;
    static bKeyboardActive = false;

    static bTooltipIncluded = false;
    static bLoading = false;
    static bConnectionSucceed = false;

    constructor() {
    }

    static init() {

        Login.bInit = true;
        mainState = MAIN_STATE.Login;

        let loginBtn = new Button({ w: 80, h: 40, v: 8 }, centerX(80), 80, null, { cb: Login.changeState, arg: Login.STATE.Login }, "login", Login.STATE.Main, "login", 4);
        loginBtn.setFontColor("rgba(142,45,45,1)");
        loginBtn.setOffsets(0, 22);
        Login.list.push(loginBtn.getSprite());

        let signupBtn = new Button({ w: 80, h: 40, v: 8 }, centerX(80), centerY(22) + 30, null, { cb: Login.changeState, arg: Login.STATE.Signup }, "login", Login.STATE.Main, "signup", 4);
        signupBtn.setFontColor("rgba(142,45,45,1)");
        signupBtn.setOffsets(0, 22);
        Login.list.push(signupBtn.getSprite());


        Button.resetTypeState("login", Login.STATE.Main);
        Panel.resetTypeState("login", Login.STATE.Main);

        //! ---------------- LOGIN ----------------
        this.loginBackBtn = new Button({ w: 30, h: 22 }, 30, 30, null, { cb: Login.changeState, arg: Login.STATE.Main }, "login", Login.STATE.Login, "", 0, true);
        this.loginBackBtn.setAnimations({ x: 86, y: 56 });
        Login.loginList.push(this.loginBackBtn.getSprite());


        this.loginSchoolpaperBG = new Panel({ w: 268, h: 175 }, centerX(268), 50, null, "login", Login.STATE.Login, "", 0, true);
        this.loginSchoolpaperBG.getSprite().addAnimation("normal", { x: 920, y: 268 });
        this.loginSchoolpaperBG.getSprite().changeAnimation("normal")
        this.loginSchoolpaperBG.beginMoving({ x: centerX(268), y: 28 }, 0.6);
        this.loginSchoolpaperBG.setMoveCB(Login.activeEntryFields, "");
        Login.loginList.push(this.loginSchoolpaperBG.getSprite());


        let loginNameLabel = new Panel({ w: 1, h: 1 }, 31, 32, this.loginSchoolpaperBG, "login", Login.STATE.Login, "user_name", 0, true);
        loginNameLabel.getSprite().addAnimation("normal", { x: 38, y: 1 });
        loginNameLabel.getSprite().changeAnimation("normal");
        loginNameLabel.setTextOverflow(true);
        loginNameLabel.setAlpha(0);
        loginNameLabel.setAlignText(0);
        Login.loginList.push(loginNameLabel.getSprite());

        this.loginNameEntry = new EntryField({ w: 128, h: 28, v: 11 }, 98, 28, this.loginSchoolpaperBG, null, "login", Login.STATE.Login, "", 1);
        this.loginNameEntry.setFontColor("rgba(200,200,200,0)", "rgba(0,0,0,0)", "rgba(100,100,100,0)", "rgba(0,0,0,1)");
        this.loginNameEntry.setOffsets(15, 18);
        this.loginNameEntry.setAlpha(0);
        this.loginNameEntry.setState(EntryField.STATE.Inactive);
        Login.loginList.push(this.loginNameEntry.getSprite());

        let loginPassLabel = new Panel({ w: 1, h: 1 }, 31, 71, this.loginSchoolpaperBG, "login", Login.STATE.Login, "password", 0, true);
        loginPassLabel.getSprite().addAnimation("normal", { x: 38, y: 1 });
        loginPassLabel.getSprite().changeAnimation("normal");
        loginPassLabel.setTextOverflow(true);
        loginPassLabel.setAlpha(0);
        loginPassLabel.setAlignText(0);
        Login.loginList.push(loginPassLabel.getSprite());

        this.loginPassEntry = new EntryField({ w: 128, h: 28, v: 11 }, 98, 67, this.loginSchoolpaperBG, null, "login", Login.STATE.Login, "", 1);
        this.loginPassEntry.setFontColor("rgba(200,200,200,0)", "rgba(0,0,0,0)", "rgba(100,100,100,0)", "rgba(0,0,0,1)");
        this.loginPassEntry.setOffsets(15, 18);
        this.loginPassEntry.setAlpha(0);
        this.loginPassEntry.setPassword();
        this.loginPassEntry.setState(EntryField.STATE.Inactive);
        Login.loginList.push(this.loginPassEntry.getSprite());

        let loginSeePassBtn = new Button({ w: 17, h: 17 }, 232, 73, this.loginSchoolpaperBG, Input.showPassword, "login", Login.STATE.Login, "", 0, true);
        loginSeePassBtn.setAnimations({ x: 626, y: 96 });
        loginSeePassBtn.setAlpha(0);
        Login.loginList.push(loginSeePassBtn.getSprite());

        this.loginTitlePanel = new Panel({ w: 62, h: 14 }, centerX(62), 20, null, "login", Login.STATE.Login, "log_in", 0, true);
        this.loginTitlePanel.getSprite().addAnimation("normal", { x: 833, y: 172 });
        this.loginTitlePanel.getSprite().changeAnimation("normal")
        this.loginTitlePanel.setOffsets(0, 10);
        this.loginTitlePanel.setTextOverflow(true);
        this.loginTitlePanel.setTextCase("all");
        this.loginTitlePanel.setFontColor("rgba(192,192,192,0)", "rgba(255,0,0,0)");
        this.loginTitlePanel.beginMoving({ x: centerX(62), y: 32 }, 0.6, true, 0, 0.05);
        Login.loginList.push(this.loginTitlePanel.getSprite());


        this.loginSubmitBtn = new Button({ w: 28, h: 27 }, 370, 134, null, Login.handleSubmit.bind(this), "login", Login.STATE.Login, "", 0, true);
        this.loginSubmitBtn.setInactiveAnimation();
        this.loginSubmitBtn.setAnimations({ x: 832, y: 117 });
        this.loginSubmitBtn.setState(Button.STATE.Inactive);
        this.loginSubmitBtn.changeSpriteAnimation("inactive");
        Login.loginList.push(this.loginSubmitBtn.getSprite());


        //! ---------------- SIGNUP ----------------
        this.signupBackBtn = new Button({ w: 30, h: 22 }, 30, 30, null, { cb: Login.changeState.bind(this), arg: Login.STATE.Main }, "login", Login.STATE.Signup, "", 0, true);
        this.signupBackBtn.setAnimations({ x: 86, y: 56 });
        Login.signupList.push(this.signupBackBtn.getSprite());

        this.schoolpaperBG = new Panel({ w: 268, h: 175 }, centerX(268), 50, null, "login", Login.STATE.Signup, "", 0, true);
        this.schoolpaperBG.getSprite().addAnimation("normal", { x: 920, y: 268 });
        this.schoolpaperBG.getSprite().changeAnimation("normal")
        this.schoolpaperBG.beginMoving({ x: centerX(268), y: 28 }, 0.6);
        this.schoolpaperBG.setMoveCB(Login.activeEntryFields, "");
        Login.signupList.push(this.schoolpaperBG.getSprite());

        let nameLabel = new Panel({ w: 1, h: 1 }, 31, 32, this.schoolpaperBG, "login", Login.STATE.Signup, "user_name", 0, true);
        nameLabel.getSprite().addAnimation("normal", { x: 38, y: 1 });
        nameLabel.getSprite().changeAnimation("normal");
        nameLabel.setTextOverflow(true);
        nameLabel.setAlpha(0);
        nameLabel.setAlignText(0);
        Login.signupList.push(nameLabel.getSprite());

        this.nameEntry = new EntryField({ w: 128, h: 28, v: 11 }, 98, 28, this.schoolpaperBG, null, "login", Login.STATE.Signup, "", 1);
        this.nameEntry.setFontColor("rgba(200,200,200,0)", "rgba(0,0,0,0)", "rgba(100,100,100,0)", "rgba(0,0,0,1)");
        this.nameEntry.setOffsets(15, 18);
        this.nameEntry.setAlpha(0);
        this.nameEntry.setState(EntryField.STATE.Inactive);
        Login.signupList.push(this.nameEntry.getSprite());

        this.nameEntryPanel = new Panel({ w: 80, h: 90, v: 6 }, 450, 32, null, "login", Login.STATE.Signup, "username_instruction", 7);
        this.nameEntryPanel.setOffsets(12, 18);
        this.nameEntryPanel.setFontColor("rgba(18,72,39,1)", "rgba(255,255,255,1)");
        this.nameEntryPanel.setAlpha(0);
        this.nameEntryPanel.beginMoving({ x: 365, y: 32 }, 0.6, true, 0, 0.05);
        Login.signupList.push(this.nameEntryPanel.getSprite());

        let passLabel = new Panel({ w: 1, h: 1 }, 31, 71, this.schoolpaperBG, "login", Login.STATE.Signup, "password", 0, true);
        passLabel.getSprite().addAnimation("normal", { x: 38, y: 1 });
        passLabel.getSprite().changeAnimation("normal");
        passLabel.setTextOverflow(true);
        passLabel.setAlpha(0);
        passLabel.setAlignText(0);
        Login.signupList.push(passLabel.getSprite());

        this.passEntry = new EntryField({ w: 128, h: 28, v: 11 }, 98, 67, this.schoolpaperBG, null, "login", Login.STATE.Signup, "", 1);
        this.passEntry.setFontColor("rgba(200,200,200,0)", "rgba(0,0,0,0)", "rgba(100,100,100,0)", "rgba(0,0,0,1)");
        this.passEntry.setOffsets(15, 18);
        this.passEntry.setAlpha(0);
        this.passEntry.setPassword();
        this.passEntry.setState(EntryField.STATE.Inactive);
        Login.signupList.push(this.passEntry.getSprite());

        let passLabel2 = new Panel({ w: 1, h: 1 }, 31, 110, this.schoolpaperBG, "login", Login.STATE.Signup, "confirm", 0, true);
        passLabel2.getSprite().addAnimation("normal", { x: 38, y: 1 });
        passLabel2.getSprite().changeAnimation("normal");
        passLabel2.setTextOverflow(true);
        passLabel2.setAlpha(0);
        passLabel2.setAlignText(0);
        Login.signupList.push(passLabel2.getSprite());

        this.passEntry2 = new EntryField({ w: 128, h: 28, v: 11 }, 98, 106, this.schoolpaperBG, null, "login", Login.STATE.Signup, "", 1);
        this.passEntry2.setFontColor("rgba(200,200,200,0)", "rgba(0,0,0,0)", "rgba(100,100,100,0)", "rgba(0,0,0,1)");
        this.passEntry2.setOffsets(15, 18);
        this.passEntry2.setAlpha(0);
        this.passEntry2.setPassword();
        this.passEntry2.setState(EntryField.STATE.Inactive);
        Login.signupList.push(this.passEntry2.getSprite());

        let seePassBtn = new Button({ w: 17, h: 17 }, 232, 93, this.schoolpaperBG, Input.showPassword, "login", Login.STATE.Signup, "", 0, true);
        seePassBtn.setAnimations({ x: 626, y: 96 });
        seePassBtn.setAlpha(0);
        Login.signupList.push(seePassBtn.getSprite());

        this.validSprite = new Sprite({ w: 10, h: 7 }, 230, 78, this.schoolpaperBG);
        this.validSprite.addAnimation("ko", { x: 688, y: 96 });
        this.validSprite.addAnimation("ok", { x: 698, y: 96 });
        this.validSprite.changeAnimation("ko");
        this.validSprite.setAlpha(0);
        Login.signupList.push(this.validSprite);

        this.validSprite2 = new Sprite({ w: 10, h: 7 }, 230, 117, this.schoolpaperBG);
        this.validSprite2.addAnimation("ko", { x: 688, y: 96 });
        this.validSprite2.addAnimation("ok", { x: 698, y: 96 });
        this.validSprite2.changeAnimation("ko");
        this.validSprite2.setAlpha(0);
        Login.signupList.push(this.validSprite2);


        this.passEntryPanel = new Panel({ w: 100, h: 70, v: 6 }, -100, 95, null, "login", Login.STATE.Signup, "password_instruction", 7);
        this.passEntryPanel.setOffsets(12, 18);
        this.passEntryPanel.setFontColor("rgba(18,72,39,1)", "rgba(255,255,255,1)");
        this.passEntryPanel.setAlpha(0);

        this.passEntry.setTooltip(this.passEntryPanel);
        this.passEntry.setFocusCB(displayTooltip, { list: "login.signup", tooltip: this.passEntry.getTooltip() });

        this.passEntry2.setTooltip(this.passEntryPanel);
        this.passEntry2.setFocusCB(displayTooltip, { list: "login.signup", tooltip: this.passEntry2.getTooltip() });

        this.titlePanel = new Panel({ w: 62, h: 14 }, centerX(62), 20, null, "login", Login.STATE.Signup, "sign_up", 0, true);
        this.titlePanel.getSprite().addAnimation("normal", { x: 833, y: 172 });
        this.titlePanel.getSprite().changeAnimation("normal")
        this.titlePanel.setOffsets(0, 10);
        this.titlePanel.setTextOverflow(true);
        this.titlePanel.setTextCase("all");
        this.titlePanel.setFontColor("rgba(192,192,192,0)", "rgba(255,0,0,0)");
        this.titlePanel.beginMoving({ x: centerX(62), y: 32 }, 0.6, true, 0, 0.05);
        Login.signupList.push(this.titlePanel.getSprite());

        //! SUBMIT --------------------------------------------

        this.submitBtn = new Button({ w: 28, h: 27 }, 370, 134, null, Login.handleSubmit.bind(this), "login", Login.STATE.Signup, "", 0, true);
        this.submitBtn.setInactiveAnimation();
        this.submitBtn.setAnimations({ x: 832, y: 117 });
        this.submitBtn.setState(Button.STATE.Inactive);
        this.submitBtn.changeSpriteAnimation("inactive");
        Login.signupList.push(this.submitBtn.getSprite());
    }

    static load(pNewState) {

        Input.setKeyboardActive();
        Input.openKeyboardBtn.setState(Button.STATE.Normal);
        if (!Input.bKeyboardClose) {
            Input.resetKeyboardPosition();
        }
        Input.resetVirtualKeyboardMessage();

        if (pNewState == Login.STATE.Signup) {
            this.schoolpaperBG.resetPosition();
            this.schoolpaperBG.children.forEach(c => {
                c.setAlpha(0);
            })
            this.schoolpaperBG.beginMoving({ x: centerX(268), y: 28 }, 0.6);

            this.titlePanel.resetPosition();
            this.titlePanel.beginMoving({ x: centerX(62), y: 32 }, 0.6, true, 0, 0.05);

            this.nameEntryPanel.resetPosition();
            this.nameEntryPanel.beginMoving({ x: 365, y: 32 }, 0.6, true, 0, 0.05);
        } else if (pNewState == Login.STATE.Login) {
            this.loginSchoolpaperBG.resetPosition();
            this.loginSchoolpaperBG.children.forEach(c => {
                c.setAlpha(0);
            })
            this.loginSchoolpaperBG.beginMoving({ x: centerX(268), y: 28 }, 0.6);

            this.loginTitlePanel.resetPosition();
            this.loginTitlePanel.beginMoving({ x: centerX(62), y: 32 }, 0.6, true, 0, 0.05);
        }
    }

    static activeEntryFields() {
        EntryField.currentList.forEach((e, index) => {
            if (index == 0) {
                e.setState(EntryField.STATE.Focus);
                e.changeSpriteAnimation("focus");
                e.textOffsetX = e.textOffsetXFocus;
                e.textOffsetY = e.textOffsetYFocus;
                e.sp.cursor.changeAnimation("normal");
                e.sp.cursor.offX = e.cursorPosXOrigin + e.label.length * 5
            } else {
                e.setState(EntryField.STATE.Normal);
            }
            if (CollisionManager.MouseCollision(MOUSE_SPRITE.x, MOUSE_SPRITE.y, e.x, e.y, e.getSize().w, e.getSize().h)) {
                if (e.getState() != EntryField.STATE.Focus) {
                    e.setState(EntryField.STATE.Hover);
                    e.changeSpriteAnimation("hover");
                }
                MOUSE_SPRITE.changeAnimation("entry");
            }
        });
    }

    static displayLoadingPanel(pDisplay = true) {

        if (pDisplay) {
            Login.bLoading = true;
            Button.currentList.forEach(b => {
                b.setState(Button.STATE.Inactive);
            });
            Panel.currentList.forEach(p => {
                p.setState(Panel.STATE.Inactive);
            });
            EntryField.currentList.forEach(e => {
                e.setState(EntryField.STATE.Inactive);
            });

            this.loadingBg = new Sprite({ w: 1, h: 1 }, 0, 0, null, "normal", { x: CANVAS_WIDTH, y: CANVAS_HEIGHT });
            this.loadingBg.getSprite().addAnimation("normal", { x: 38, y: 3 });
            this.loadingBg.getSprite().changeAnimation("normal");
            this.loadingBg.setAlpha(0);
            this.loadingBg.fade(0.01);

            this.loadingPanel = new Panel({ w: 80, h: 80, v: 6 }, centerX(80), centerY(90), null, "", null, "", 7);
            this.loadingPanel.setAlpha(0);
            this.loadingPanel.beginMoving({ x: centerX(80), y: centerY(90) - 10 }, 0.6, true, 0, 0.01);

            this.loadingSprite = new Sprite({ w: 16, h: 16 }, centerXElement(this.loadingPanel, 16), centerYElement(this.loadingPanel, 16), this.loadingPanel);
            this.loadingSprite.addAnimation("normal", { x: 1200, y: 272 }, 8, [0.3, 0.1, 0.05, 0.05, 0.05, 0.05, 0.05, 0.1]);
            this.loadingSprite.addAnimation("valid", { x: 1200, y: 288 }, 8, [0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.5], false);
            this.loadingSprite.setAnimationCB("valid", Login.toSplashScreenTransition.bind(this));
            this.loadingSprite.changeAnimation("normal");

            Login.loadingList.push(this.loadingBg);
            Login.loadingList.push(this.loadingPanel.getSprite());
            Login.loadingList.push(this.loadingSprite);

        } else {
            Login.bLoading = false;
            this.loadingBg.delete = true;
            this.loadingSprite.delete = true;

            this.loadingPanel.removeFromList();
            this.loadingPanel.removeFromCurrentList();
            this.loadingPanel.getSprite().delete = true;
            this.loadingPanel = null;

            Login.loadingList = Login.loadingList.filter(sp => {
                return !sp.delete;
            });

            if (!Login.bConnectionSucceed) {
                Button.currentList.forEach(b => {
                    b.setState(Button.STATE.Normal);
                });
                Panel.currentList.forEach(p => {
                    p.setState(Panel.STATE.Normal);
                });
                EntryField.currentList.forEach(e => {
                    if (e.getSprite().tl.currentAnimation.name == "focus") {
                        e.setState(EntryField.STATE.Focus);
                    } else {
                        e.setState(EntryField.STATE.Normal);
                    }
                });
            }
        }
    }

    static handleSubmit() {
        if (Login.currentState == Login.STATE.Signup) {
            if (bAlreadyExists) {
                bAlreadyExists = false;
                clearTimeout(messageTimeOut);
            }
            if (bEntryError) {
                bEntryError = false;
                clearTimeout(messageTimeOut);
            }
            Login.displayLoadingPanel();
            API_Signup(this.nameEntry.label, this.passEntry.label);
        } else if (Login.currentState == Login.STATE.Login) {
            if (bIncorrectCredentials) {
                bIncorrectCredentials = false;
                clearTimeout(messageTimeOut);
            }
            Login.displayLoadingPanel();
            API_Login(this.loginNameEntry.label, this.loginPassEntry.label);
        }
    }

    static connectionSucceed() {
        if (MOUSE_SPRITE.currentAnimation.name != "normal") {
            MOUSE_SPRITE.changeAnimation("normal");
        }
        Login.bConnectionSucceed = true;
        this.loadingSprite.changeAnimation("valid");
    }

    static toSplashScreenTransition() {

        if (!Input.bKeyboardClose) {
            Input.openKeyboard();
        } else {
            Input.setKeyboardActive(false);
        }

        Login.displayLoadingPanel(false);
        EntryField.currentList.forEach(e => {
            e.setState(EntryField.STATE.Inactive);
            e.changeSpriteAnimation("normal");
            e.sp.cursor.changeAnimation("none");
        });

        if (Login.currentState == Login.STATE.Login) {

            this.loginTitlePanel.delete();
            this.loginTitlePanel = null;

            this.loginSubmitBtn.delete();
            this.loginSubmitBtn = null;

            this.loginBackBtn.delete();
            this.loginBackBtn = null;


            this.stamp = new Sprite({ w: 28, h: 28 }, 212, 125, this.loginSchoolpaperBG);
            this.stamp.addAnimation("normal", { x: 1200, y: 340 });
            this.stamp.addAnimation("none", { x: 352, y: 208 }); //? Espace vide dans la sprite sheet
            this.stamp.changeAnimation("none");
            Login.loginList.push(this.stamp);

            this.hankoPanel = new Panel({ w: 1, h: 1 }, 300, 230, null, "login", Login.STATE.Login, "", 0, true);
            this.hankoPanel.getSprite().addAnimation("normal", { x: 38, y: 1 });
            this.hankoPanel.getSprite().changeAnimation("normal");
            this.hankoPanel.setOriginPos({ x: 300, y: 230 });
            this.hankoPanel.setOriginDestination({ x: 300, y: 150 });
            this.hankoPanel.beginMoving({ x: 300, y: 150 });
            Panel.currentList.push(this.hankoPanel);
            Login.loginList.push(this.hankoPanel.getSprite());

            this.hanko = new Sprite({ w: 35, h: 35 }, 0, 0, this.hankoPanel);
            this.hanko.addAnimation("normal", { x: 1200, y: 304 });
            this.hanko.addAnimation("stamp", { x: 1200, y: 304 }, 4, 0.2, false);
            this.hanko.setAnimationCB("stamp", { cb: Login.hankoLeaving.bind(this), arg: "" });
            this.hanko.setAnimationFrameCB("stamp", [{
                nb: 2,
                callback: Login.screenShake,
            }]);
            this.hanko.changeAnimation("normal");
            this.hanko.setAlpha(0);
            Login.loginList.push(this.hanko);

            this.hankoPanel.setMoveCB(this.hanko.changeAnimation.bind(this.hanko), "stamp");

        } else if (Login.currentState == Login.STATE.Signup) {

            this.titlePanel.delete();
            this.titlePanel = null;

            this.submitBtn.delete();
            this.submitBtn = null;

            this.signupBackBtn.delete();
            this.signupBackBtn = null;

            this.nameEntryPanel.delete();
            this.nameEntryPanel = null;

            this.passEntryPanel.delete();
            this.passEntryPanel = null;

            this.stamp = new Sprite({ w: 28, h: 28 }, 212, 139, this.schoolpaperBG);
            this.stamp.addAnimation("normal", { x: 1200, y: 340 });
            this.stamp.addAnimation("none", { x: 352, y: 208 }); //? Espace vide dans la sprite sheet
            this.stamp.changeAnimation("none");
            Login.signupList.push(this.stamp);

            this.hankoPanel = new Panel({ w: 1, h: 1 }, 300, 250, null, "login", Login.STATE.Signup, "", 0, true);
            this.hankoPanel.getSprite().addAnimation("normal", { x: 38, y: 1 });
            this.hankoPanel.getSprite().changeAnimation("normal");
            this.hankoPanel.setOriginPos({ x: 300, y: 244 });
            this.hankoPanel.setOriginDestination({ x: 300, y: 164 });
            this.hankoPanel.beginMoving({ x: 300, y: 164 });
            Panel.currentList.push(this.hankoPanel);
            Login.signupList.push(this.hankoPanel.getSprite());

            this.hanko = new Sprite({ w: 35, h: 35 }, 0, 0, this.hankoPanel);
            this.hanko.addAnimation("normal", { x: 1200, y: 304 });
            this.hanko.addAnimation("stamp", { x: 1200, y: 304 }, 4, 0.2, false);
            this.hanko.setAnimationCB("stamp", { cb: Login.hankoLeaving.bind(this), arg: "" });
            this.hanko.setAnimationFrameCB("stamp", [{
                nb: 2,
                callback: Login.screenShake,
            }]);
            this.hanko.changeAnimation("normal");
            this.hanko.setAlpha(0);
            Login.signupList.push(this.hanko);

            this.hankoPanel.setMoveCB(this.hanko.changeAnimation.bind(this.hanko), "stamp");
        }
    }

    static screenShake() {
        setScreenShake(true, 2, 0, false);
    }

    static hankoLeaving() {
        this.stamp.changeAnimation("normal");
        let CBArray = [];
        this.hanko.changeAnimation("normal");
        CBArray.push({ cb: this.hanko.setDelete.bind(this.hanko), arg: null });
        CBArray.push({ cb: this.hankoPanel.delete.bind(this.hankoPanel), arg: null });
        CBArray.push({ cb: Login.schoolPaperStartLeaving.bind(Login), arg: null });
        this.hankoPanel.setMoveCB(CBArray);
        this.hankoPanel.setStartPos({ x: this.hankoPanel.x, y: this.hankoPanel.y });
        this.hankoPanel.beginMoving({ x: this.hankoPanel.originPos.x, y: this.hankoPanel.originPos.y }, 0.5, true, 1, 0.02, -1);
    }

    static schoolPaperStartLeaving() {
        if (Login.currentState == Login.STATE.Login) {
            this.loginSchoolpaperBG.setStartPos({ x: this.loginSchoolpaperBG.x, y: this.loginSchoolpaperBG.y });
            this.loginSchoolpaperBG.beginMoving({ x: this.loginSchoolpaperBG.x, y: this.loginSchoolpaperBG.y + 6 }, 0.8, false);
            this.loginSchoolpaperBG.setMoveCB(null);
            this.loginSchoolpaperBG.setMoveCB(Login.schoolPaperLeaving.bind(Login), null);
        } else if (Login.currentState == Login.STATE.Signup) {
            this.schoolpaperBG.setStartPos({ x: this.schoolpaperBG.x, y: this.schoolpaperBG.y });
            this.schoolpaperBG.beginMoving({ x: this.schoolpaperBG.x, y: this.schoolpaperBG.y + 6 }, 0.8, false);
            this.schoolpaperBG.setMoveCB(null);
            this.schoolpaperBG.setMoveCB(Login.schoolPaperLeaving.bind(Login), null);
        }
    }

    static schoolPaperLeaving() {
        if (Login.currentState == Login.STATE.Login) {
            this.loginSchoolpaperBG.setStartPos({ x: this.loginSchoolpaperBG.x, y: this.loginSchoolpaperBG.y });
            this.loginSchoolpaperBG.setMoveCB(FadeEffect.fade.bind(FadeEffect), {
                callback: {
                    cb: SplashScreen.init.bind(SplashScreen),
                    arg: null
                },
                direction: "out", maxTimer: 0.01
            });
            this.loginSchoolpaperBG.beginMoving({ x: this.loginSchoolpaperBG.x, y: - 300 }, 0.5, false);
        } else if (Login.currentState == Login.STATE.Signup) {
            this.schoolpaperBG.setStartPos({ x: this.schoolpaperBG.x, y: this.schoolpaperBG.y });
            this.schoolpaperBG.setMoveCB(FadeEffect.fade.bind(FadeEffect), {
                callback: {
                    cb: SplashScreen.init.bind(SplashScreen),
                    arg: null
                },
                direction: "out", maxTimer: 0.01
            });
            this.schoolpaperBG.beginMoving({ x: this.schoolpaperBG.x, y: - 300 }, 0.5, false);
        }
    }


    static changeState(pNewState) {

        if (pNewState == Login.STATE.Signup || pNewState == Login.STATE.Login) {
            Login.load(pNewState);
        }
        if (pNewState == Login.STATE.Main) {
            Input.setKeyboardActive(false);
            if (Login.bTooltipIncluded) {
                Login.bTooltipIncluded = false;
                this.passEntryPanel.getSprite().delete = true;
            }
        }
        Login.currentState = pNewState;
        Panel.resetTypeState("login", pNewState);
        Button.resetTypeState("login", pNewState);
        EntryField.resetTypeState("login", pNewState)

        EntryField.currentList.forEach(e => {
            e.reset();
        });
    }

    static update(dt) {

        switch (Login.currentState) {
            case Login.STATE.Main:
                Sprite.manageBeforeUpdating(Login.list, dt);
                Login.list = Login.list.filter(sp => {
                    return !sp.delete;
                });
                break;
            case Login.STATE.Signup:
                if (Login.passEntry.label.length >= 6 && Login.passEntry.label.length <= 20) {
                    if (Login.validSprite.changeAnimation.name != "ok") {
                        Login.validSprite.changeAnimation("ok");
                    }
                } else {
                    if (Login.validSprite.changeAnimation.name != "ko") {
                        Login.validSprite.changeAnimation("ko");
                    }
                }

                if (!Login.bConnectionSucceed) {
                    if (Login.passEntry.label.length >= 6 && Login.passEntry.label.length <= 20
                        && Login.passEntry.label.length == Login.passEntry2.label.length
                        && !Login.bLoading) {
                        if (Login.nameEntry.label.length >= 6 && Login.nameEntry.label.length <= 20) {
                            if (Login.passEntry.label === Login.passEntry2.label) {

                                if (Login.validSprite2.currentAnimation.name != "ok") {
                                    Login.validSprite2.changeAnimation("ok");
                                    Login.submitBtn.setState(Button.STATE.Normal);
                                    Login.submitBtn.getSprite().changeAnimation("normal");
                                }
                                if (Login.submitBtn.getState() == Button.STATE.Inactive) {
                                    Login.submitBtn.setState(Button.STATE.Normal);
                                    Login.submitBtn.getSprite().changeAnimation("normal");
                                }
                            }
                        } else {
                            Login.submitBtn.setState(Button.STATE.Inactive);
                            Login.submitBtn.getSprite().changeAnimation("inactive");
                        }

                    } else {

                        if (!Login.bLoading) {

                            if (Login.validSprite2.currentAnimation.name != "ko") {
                                Login.validSprite2.changeAnimation("ko");
                                Login.submitBtn.setState(Button.STATE.Inactive);
                                Login.submitBtn.getSprite().changeAnimation("inactive");
                            }

                            if (Login.nameEntry.label.length < 6 || Login.nameEntry.label.length > 20) {
                                Login.submitBtn.setState(Button.STATE.Inactive);
                                Login.submitBtn.getSprite().changeAnimation("inactive");
                            }
                        }

                    }
                }

                Panel.currentList.forEach(p => {
                    if (p.bMoving) {
                        p.update(dt);
                    }
                });

                Sprite.manageBeforeUpdating(Login.signupList, dt);

                Login.signupList = Login.signupList.filter(sp => {
                    return !sp.delete;
                });
                break;
            case Login.STATE.Login:

                if (!Login.bConnectionSucceed) {
                    if (Login.loginNameEntry.label.length >= 6 && Login.loginPassEntry.label.length >= 6 &&
                        Login.loginNameEntry.label.length <= 20 && Login.loginPassEntry.label.length <= 20) {
                        if (Login.loginSubmitBtn.getState() == Button.STATE.Inactive && !Login.bLoading) {
                            Login.loginSubmitBtn.setState(Button.STATE.Normal);
                            Login.loginSubmitBtn.getSprite().changeAnimation("normal");
                        }
                    } else {
                        if (Login.loginSubmitBtn.getState() == Button.STATE.Normal && !Login.bLoading) {
                            Login.loginSubmitBtn.setState(Button.STATE.Inactive);
                            Login.loginSubmitBtn.getSprite().changeAnimation("inactive");
                        }
                    }
                }

                Panel.currentList.forEach(p => {
                    if (p.bMoving) {
                        p.update(dt);
                    }
                });

                Sprite.manageBeforeUpdating(Login.loginList, dt);

                Login.loginList = Login.loginList.filter(sp => {
                    return !sp.delete;
                });
                break;
        }

        if (Login.bLoading) {
            Sprite.manageBeforeUpdating(Login.loadingList, dt);
            if (this.loadingPanel && this.loadingPanel.bMoving) {
                this.loadingPanel.update(dt);
            }
            Login.loadingList = Login.loadingList.filter(sp => {
                return !sp.delete;
            });
        }

        if (Input.bKeyboardActive) {
            Input.update(dt);
        }

        if (FadeEffect.bActive) {
            FadeEffect.update(dt);
        }

    }

    //? pErrorCode - 0: Credential | 1: AlreadyExists | 2: Entry 
    static displayErrorMessage(pErrorCode) {

        switch (pErrorCode) {
            case 0:
                bIncorrectCredentials = true;
                break;
            case 1:
                bAlreadyExists = true;
                break;
            case 2:
                bEntryError = true;
                break;
        }
        Login.displayLoadingPanel(false);
        Login.bLoading = false;
        setScreenShake(true, 5, 5);
        messageTimeOut = setTimeout(stopErrorMessage, 2000);
    }

    static draw(ctx) {

        switch (Login.currentState) {
            case Login.STATE.Main:
                Sprite.manageBeforeDrawing(Login.list);
                // ctx.fillStyle = "rgb(0,0,0)";
                ctx.textAlign = "center";
                ctx.fillText(LANG["no_account"], 225, 150);
                ctx.fillText(LANG["signup_here"], 225, 160);
                break;
            case Login.STATE.Signup:
                Sprite.manageBeforeDrawing(Login.signupList);

                if (Input.bKeyboardActive) {
                    Sprite.manageBeforeDrawing(Input.keyboardSpriteList);
                }
                if (Login.bLoading) {
                    Sprite.manageBeforeDrawing(Login.loadingList);
                }

                if (bAlreadyExists) {
                    ctx.fillStyle = "rgb(255,0,0)";
                    ctx.fillText(LANG["already_exists"], 260, 50);

                    ctx.strokeStyle = "rgb(255,0,0)";
                    ctx.strokeRect(this.nameEntry.x - 3, this.nameEntry.y - 1, 134, 31);
                }

                if (bEntryError) {
                    ctx.fillStyle = "rgb(255,0,0)";
                    ctx.fillText(LANG["entry_error"], 130, 94);
                }
                break;
            case Login.STATE.Login:
                Sprite.manageBeforeDrawing(Login.loginList);
                if (Input.bKeyboardActive) {
                    Sprite.manageBeforeDrawing(Input.keyboardSpriteList);
                }
                if (Login.bLoading) {
                    Sprite.manageBeforeDrawing(Login.loadingList);
                }

                if (bIncorrectCredentials) {
                    ctx.fillStyle = "rgb(255,0,0)";
                    ctx.fillText(LANG["incorrect_message"], 180, 152);
                }
                break;

        }

        ctx.textAlign = "left";
        ctx.fillStyle = "rgb(0,0,0)";

        if (FadeEffect.bActive) {
            FadeEffect.draw(ctx);
        }
    }

}