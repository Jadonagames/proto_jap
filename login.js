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
    static keyboardList = [];

    static LC_alphabet = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "a", "s", "d", "f", "g", "h", "j", "k", "l", "z", "x", "c", "v", "b", "n", "m"];
    static UC_alphabet = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "A", "S", "D", "F", "G", "H", "J", "K", "L", "W", "X", "C", "V", "B", "N", "M"];
    static bCaps = true;
    static bKeyboardActive = false;

    static bTooltipIncluded = false;

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

        let goToSplashScreenBtn = new Button({ w: 60, h: 22, v: 8 }, centerX(60), centerY(22) + 100, null, Login.goToSplashScreen, "login", Login.STATE.Main, "go", 4);
        goToSplashScreenBtn.setFontColor("rgba(142,45,45,1)");
        Login.list.push(goToSplashScreenBtn.getSprite());

        Button.resetTypeState("login", Login.STATE.Main);
        Panel.resetTypeState("login", Login.STATE.Main);

        //! ---------------- LOGIN ----------------
        /*
        If all ok : 
        display popup 
        go to splashScreen
        */

        let loginBackBtn = new Button({ w: 30, h: 22 }, 30, 30, null, { cb: Login.changeState, arg: Login.STATE.Main }, "login", Login.STATE.Login, "", 0, true);
        loginBackBtn.setAnimations({ x: 86, y: 56 });
        Login.loginList.push(loginBackBtn.getSprite());


        this.loginSchoolpaperBG = new Panel({ w: 268, h: 175 }, centerX(268), 50, null, "login", Login.STATE.Login, "", 0, true);
        this.loginSchoolpaperBG.getSprite().addAnimation("normal", { x: 920, y: 268 });
        this.loginSchoolpaperBG.getSprite().changeAnimation("normal")
        this.loginSchoolpaperBG.beginMoving({ x: centerX(268), y: 28 }, 0.6);
        this.loginSchoolpaperBG.setMoveCB(Login.activeEntryFields, "");
        Login.loginList.push(this.loginSchoolpaperBG.getSprite());


        let loginNameLabel = new Panel({w: 1, h: 1}, 31, 32, this.loginSchoolpaperBG, "login", Login.STATE.Login, "user_name", 0, true);
        loginNameLabel.getSprite().addAnimation("normal", {x: 38, y: 1});
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

        let loginPassLabel = new Panel({w: 1, h: 1}, 31, 71, this.loginSchoolpaperBG, "login", Login.STATE.Login, "password", 0, true);
        loginPassLabel.getSprite().addAnimation("normal", {x: 38, y: 1});
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
        this.loginTitlePanel.getSprite().addAnimation("normal", { x: 832, y: 171 });
        this.loginTitlePanel.getSprite().changeAnimation("normal")
        this.loginTitlePanel.setOffsets(0, 10);
        this.loginTitlePanel.setTextOverflow(true);
        this.loginTitlePanel.setTextCase("all");
        this.loginTitlePanel.setFontColor("rgba(192,192,192,0)","rgba(255,0,0,0)");
        this.loginTitlePanel.beginMoving({ x: centerX(62), y: 32 }, 0.6, true, 0, 0.05);
        Login.loginList.push(this.loginTitlePanel.getSprite());


        this.loginSubmitBtn = new Button({ w: 28, h: 27 }, 370, 134, null, Login.handleSubmit.bind(this), "login", Login.STATE.Login, "", 0, true);
        this.loginSubmitBtn.setInactiveAnimation();
        this.loginSubmitBtn.setAnimations({ x: 832, y: 117 });
        this.loginSubmitBtn.setState(Button.STATE.Inactive);
        this.loginSubmitBtn.changeSpriteAnimation("inactive");
        Login.loginList.push(this.loginSubmitBtn.getSprite());


        //! ---------------- SIGNUP ----------------
        /*        
        If all ok :
        display popup
        go to splashScreen
        */

        let signupBackBtn = new Button({ w: 30, h: 22 }, 30, 30, null, { cb: Login.changeState.bind(this), arg: Login.STATE.Main }, "login", Login.STATE.Signup, "", 0, true);
        signupBackBtn.setAnimations({ x: 86, y: 56 });
        Login.signupList.push(signupBackBtn.getSprite());

        // 267 175
        this.schoolpaperBG = new Panel({ w: 268, h: 175 }, centerX(268), 50, null, "login", Login.STATE.Signup, "", 0, true);
        this.schoolpaperBG.getSprite().addAnimation("normal", { x: 920, y: 268 });
        this.schoolpaperBG.getSprite().changeAnimation("normal")
        this.schoolpaperBG.beginMoving({ x: centerX(268), y: 28 }, 0.6);
        this.schoolpaperBG.setMoveCB(Login.activeEntryFields, "");
        Login.signupList.push(this.schoolpaperBG.getSprite());

        let nameLabel = new Panel({w: 1, h: 1}, 31, 32, this.schoolpaperBG, "login", Login.STATE.Signup, "user_name", 0, true);
        nameLabel.getSprite().addAnimation("normal", {x: 38, y: 1});
        nameLabel.getSprite().changeAnimation("normal");
        nameLabel.setTextOverflow(true);
        nameLabel.setAlpha(0);
        nameLabel.setAlignText(0);
        Login.signupList.push(nameLabel.getSprite());

        this.nameEntry = new EntryField({ w: 128, h: 28, v: 11 }, 98, 28, this.schoolpaperBG, null, "login", Login.STATE.Signup, "UserFromKanaWorld", 1);
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

        let passLabel = new Panel({w: 1, h: 1}, 31, 71, this.schoolpaperBG, "login", Login.STATE.Signup, "password", 0, true);
        passLabel.getSprite().addAnimation("normal", {x: 38, y: 1});
        passLabel.getSprite().changeAnimation("normal");
        passLabel.setTextOverflow(true);
        passLabel.setAlpha(0);
        passLabel.setAlignText(0);
        Login.signupList.push(passLabel.getSprite());

        this.passEntry = new EntryField({ w: 128, h: 28, v: 11 }, 98, 67, this.schoolpaperBG, null, "login", Login.STATE.Signup, "azert", 1);
        this.passEntry.setFontColor("rgba(200,200,200,0)", "rgba(0,0,0,0)", "rgba(100,100,100,0)", "rgba(0,0,0,1)");
        this.passEntry.setOffsets(15, 18);
        this.passEntry.setAlpha(0);
        this.passEntry.setPassword();
        this.passEntry.setState(EntryField.STATE.Inactive);
        Login.signupList.push(this.passEntry.getSprite());

        let passLabel2 = new Panel({w: 1, h: 1}, 31, 110, this.schoolpaperBG, "login", Login.STATE.Signup, "confirm", 0, true);
        passLabel2.getSprite().addAnimation("normal", {x: 38, y: 1});
        passLabel2.getSprite().changeAnimation("normal");
        passLabel2.setTextOverflow(true);
        passLabel2.setAlpha(0);
        passLabel2.setAlignText(0);
        Login.signupList.push(passLabel2.getSprite());

        this.passEntry2 = new EntryField({ w: 128, h: 28, v: 11 }, 98, 106, this.schoolpaperBG, null, "login", Login.STATE.Signup, "azert", 1);
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

        this.validSprite = new Sprite({w: 10, h: 7}, 230, 78, this.schoolpaperBG);
        this.validSprite.addAnimation("ko", {x: 688, y: 96});
        this.validSprite.addAnimation("ok", {x: 698, y: 96});
        this.validSprite.changeAnimation("ko");
        this.validSprite.setAlpha(0);
        Login.signupList.push(this.validSprite);

        this.validSprite2 = new Sprite({w: 10, h: 7}, 230, 117, this.schoolpaperBG);
        this.validSprite2.addAnimation("ko", {x: 688, y: 96});
        this.validSprite2.addAnimation("ok", {x: 698, y: 96});
        this.validSprite2.changeAnimation("ko");
        this.validSprite2.setAlpha(0);
        Login.signupList.push(this.validSprite2);


        this.passEntryPanel = new Panel({ w: 100, h: 70, v: 6 }, -100, 95, null, "login", Login.STATE.Signup, "password_instruction", 7);
        this.passEntryPanel.setOffsets(12, 18);
        this.passEntryPanel.setFontColor("rgba(18,72,39,1)", "rgba(255,255,255,1)");
        this.passEntryPanel.setAlpha(0);
        // this.passEntryPanel.beginMoving({ x: 10, y: 95 }, 0.6, true, 0, 0.05);
        // Login.signupList.push(this.passEntryPanel.getSprite());

        this.passEntry.setTooltip(this.passEntryPanel);
        this.passEntry.setFocusCB(displayTooltip, { list: "login.signup", tooltip: this.passEntry.getTooltip() });

        this.passEntry2.setTooltip(this.passEntryPanel);
        this.passEntry2.setFocusCB(displayTooltip, { list: "login.signup", tooltip: this.passEntry2.getTooltip() });


        this.titlePanel = new Panel({ w: 62, h: 14 }, centerX(62), 20, null, "login", Login.STATE.Signup, "sign_up", 0, true);
        this.titlePanel.getSprite().addAnimation("normal", { x: 832, y: 171 });
        this.titlePanel.getSprite().changeAnimation("normal")
        this.titlePanel.setOffsets(0, 10);
        this.titlePanel.setTextOverflow(true);
        this.titlePanel.setTextCase("all");
        this.titlePanel.setFontColor("rgba(192,192,192,0)","rgba(255,0,0,0)");
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
        EntryField.currentList.forEach((e, index )=> {
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

    static handleSubmit() {
        if (Login.currentState == Login.STATE.Signup) {
            API_Signup(this.nameEntry.label, this.passEntry.label);
        } else if (Login.currentState == Login.STATE.Login) {
            API_Login(this.loginNameEntry.label, this.loginPassEntry.label);
        }
    }

    static goToSplashScreen() {
        SplashScreen.init();
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
                if (Login.passEntry.label.length >= 6) {
                    if (Login.validSprite.changeAnimation.name != "ok") {
                        Login.validSprite.changeAnimation("ok");
                    }
                } else {
                    if (Login.validSprite.changeAnimation.name != "ko") {
                        Login.validSprite.changeAnimation("ko");
                    }
                }

                if (Login.passEntry.label.length >= 6 && Login.passEntry.label.length == Login.passEntry2.label.length) {
                    if (Login.nameEntry.label.length >= 6) {
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

                    if (Login.validSprite2.currentAnimation.name != "ko") {
                        Login.validSprite2.changeAnimation("ko");
                        Login.submitBtn.setState(Button.STATE.Inactive);
                        Login.submitBtn.getSprite().changeAnimation("inactive");
                    }

                    if (Login.nameEntry.label.length < 6) {
                        Login.submitBtn.setState(Button.STATE.Inactive);
                        Login.submitBtn.getSprite().changeAnimation("inactive");
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

                if (Login.loginNameEntry.label.length >= 6 && Login.loginPassEntry.label.length >= 6) {
                    if (Login.loginSubmitBtn.getState() == Button.STATE.Inactive) {
                        Login.loginSubmitBtn.setState(Button.STATE.Normal);
                        Login.loginSubmitBtn.getSprite().changeAnimation("normal");
                    }
                } else {
                    if (Login.loginSubmitBtn.getState() == Button.STATE.Normal) {
                        Login.loginSubmitBtn.setState(Button.STATE.Inactive);
                        Login.loginSubmitBtn.getSprite().changeAnimation("inactive");
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

        if (Input.bKeyboardActive) {
            Input.update(dt);
        }

    }

    static draw(ctx) {

        // Sprite.manageBeforeDrawing(Login.list);

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

                if (bAlreadyExists) {
                    ctx.fillStyle = "rgb(255,0,0)";
                    ctx.fillText(LANG["already_exists"], 260, 50);

                    ctx.strokeStyle = "rgb(255,0,0)";
                    ctx.strokeRect(this.nameEntry.x-3, this.nameEntry.y-1, 134, 31);
                }
                break;
            case Login.STATE.Login:
                Sprite.manageBeforeDrawing(Login.loginList);
                if (Input.bKeyboardActive) {
                    Sprite.manageBeforeDrawing(Input.keyboardSpriteList);
                }

                // ctx.fillStyle = "rgb(255,0,0)";
                // ctx.fillText(LANG["incorrect_message"], 180, 152);

                if (bIncorrectCredentials) {
                    ctx.fillStyle = "rgb(255,0,0)";
                    ctx.fillText(LANG["incorrect_message"], 180, 152);
                }
                break;

        }

        ctx.textAlign = "left";
        ctx.fillStyle = "rgb(0,0,0)";
        if (bLogged) {
            ctx.fillText("Logged : " + USER.name, 10, CANVAS_HEIGHT - 4);
        } else {
            ctx.fillText("Logged : ", 10, CANVAS_HEIGHT - 4);
        }   
    }

}