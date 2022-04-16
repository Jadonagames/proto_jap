class Login {

    static STATE = Object.freeze({
        Main: 0,
        Signup: 1,
        Login: 2
    });

    static currentState = Login.STATE.Main;

    static list = [];
    static signupList = [];
    static loginList = [];
    static keyboardList = [];

    static LC_alphabet = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "a", "s", "d", "f", "g", "h", "j", "k", "l", "z", "x", "c", "v", "b", "n", "m"];
    static UC_alphabet = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "A", "S", "D", "F", "G", "H", "J", "K", "L", "W", "X", "C", "V", "B", "N", "M"];
    static bCaps = true;
    static bKeyboardActive = false;

    constructor() {
    }

    static init() {
        // canvas.style.backgroundColor = "rgb(213, 210, 193)";

        mainState = MAIN_STATE.Login;

        let loginBtn = new Button({ w: 80, h: 40, v: 8 }, centerX(80), 80, null, { cb: Login.changeState, arg: Login.STATE.Login }, "login", Login.STATE.Main, "login", 4);
        loginBtn.setFontColor("rgba(142,45,45,1)");
        loginBtn.setOffsets(0, 22);
        Login.list.push(loginBtn.getSprite());


        // let messagePanel =

        let signupBtn = new Button({ w: 80, h: 40, v: 8 }, centerX(80), centerY(22) + 30, null, { cb: Login.changeState, arg: Login.STATE.Signup }, "login", Login.STATE.Main, "signup", 4);
        signupBtn.setFontColor("rgba(142,45,45,1)");
        signupBtn.setOffsets(0, 22);
        Login.list.push(signupBtn.getSprite());



        let goToSplashScreenBtn = new Button({ w: 60, h: 22, v: 8 }, centerX(60), centerY(22) + 100, null, Login.goToSplashScreen, "login", Login.STATE.Main, "go", 4);
        goToSplashScreenBtn.setFontColor("rgba(142,45,45,1)");
        Login.list.push(goToSplashScreenBtn.getSprite());



        Button.resetTypeState("login", Login.STATE.Main);
        Panel.resetTypeState("login", Login.STATE.Main);

        // ---------------- SIGNUP ----------------
        /*        
        Username
        Password
        Password confirm

        If all ok :
        display popup
        go to splashScreen
        */
        // let testBtn = new Button({ w: 80, h: 40, v: 8 }, centerX(80), 80, null, null, "login", Login.STATE.Signup, "go", 4);
        // testBtn.setFontColor("rgba(142,45,45,1)");
        // testBtn.setOffsets(0, 22);
        // Login.signupList.push(testBtn.getSprite());

        let signupBackBtn = new Button({ w: 30, h: 22 }, 30, 30, null, { cb: Login.changeState, arg: Login.STATE.Main }, "login", Login.STATE.Signup, "", 0, true);
        signupBackBtn.setAnimations({ x: 86, y: 56 });
        Login.signupList.push(signupBackBtn.getSprite());

        // 267 175
        this.schoolpaperBG = new Panel({ w: 267, h: 175 }, centerX(267), 28, null, "login", Login.STATE.Signup, "", 0, true);
        this.schoolpaperBG.getSprite().addAnimation("normal", { x: 920, y: 268 });
        this.schoolpaperBG.getSprite().changeAnimation("normal")
        // this.schoolpaperBG.setDestination({ x: 0, y: 100 });
        // this.schoolpaperBG.setCanMove(true);
        // this.schoolpaperBG.setMovingSpeed(0.6);
        Login.signupList.push(this.schoolpaperBG.getSprite());

        let testEntry = new EntryField({ w: 128, h: 28, v: 10 }, centerX(128), 50, null, null, "login", Login.STATE.Signup, "JaDona974", 1);
        testEntry.setOffsets(15, 18);
        Login.signupList.push(testEntry.getSprite());

        let testEntry2 = new EntryField({ w: 128, h: 28, v: 10 }, centerX(128), 90, null, null, "login", Login.STATE.Signup, "*****", 1);
        testEntry2.setOffsets(15, 18);
        Login.signupList.push(testEntry2.getSprite());


        let submitBtn = new Button({ w: 28, h: 27 }, 350, 90, null, null, "login", Login.STATE.Signup, "", 0, true);
        submitBtn.setInactiveAnimation();
        submitBtn.setAnimations({ x: 832, y: 117 });
        submitBtn.setState(Button.STATE.Inactive);
        submitBtn.changeSpriteAnimation("inactive");
        Login.signupList.push(submitBtn.getSprite());


        // this.keyboardPanel = new Panel({ w: 450, h: 124, v: 1 }, 0, 300, null, "login", Login.STATE.Signup, "", 21);
        // this.keyboardPanel.setDestination({ x: 0, y: CANVAS_HEIGHT - 124 });
        // this.keyboardPanel.setCanMove(true);
        // this.keyboardPanel.setMovingSpeed(0.6);
        // Login.signupList.push(this.keyboardPanel.getSprite());

        this.keyboardPanel = new Panel({ w: 450, h: 124, v: 6 }, 0, 300, null, "login", Login.STATE.Signup, "", 8);
        this.keyboardPanel.setDestination({ x: 0, y: CANVAS_HEIGHT - 124 });
        this.keyboardPanel.setCanMove(true);
        this.keyboardPanel.setMovingSpeed(0.6);
        Login.signupList.push(this.keyboardPanel.getSprite());


        let capsBtn = new KeyboardBtn({ w: 44, h: 22 }, 200, 10, this.keyboardPanel, Login.caps, "login", Login.STATE.Signup, "", 0, true);
        capsBtn.setAnimations({ x: 560, y: 144 });
        Login.signupList.push(capsBtn.getSprite());
        Login.keyboardList.push(capsBtn);

        let delBtn = new KeyboardBtn({ w: 42, h: 22 }, 251, 10, this.keyboardPanel, { cb: Login.handleKeyboardClick, arg: -1 }, "login", Login.STATE.Signup, "", 0, true);
        delBtn.setAnimations({ x: 560, y: 166 });
        Login.signupList.push(delBtn.getSprite());
        Login.keyboardList.push(delBtn);

        let leftBtn = new KeyboardBtn({ w: 23, h: 22 }, 278, 90, this.keyboardPanel, { cb: Input.moveCursor, arg: false }, "login", Login.STATE.Signup, "", 0, true);
        leftBtn.setAnimations({ x: 692, y: 144 });
        Login.signupList.push(leftBtn.getSprite());
        Login.keyboardList.push(leftBtn);

        let rightBtn = new KeyboardBtn({ w: 23, h: 22 }, 330, 90, this.keyboardPanel, { cb: Input.moveCursor, arg: true }, "login", Login.STATE.Signup, "", 0, true);
        rightBtn.setAnimations({ x: 692, y: 166 });
        Login.signupList.push(rightBtn.getSprite());
        Login.keyboardList.push(rightBtn);

        let upBtn = new KeyboardBtn({ w: 23, h: 22 }, 304, 65, this.keyboardPanel, { cb: Input.moveCursor, arg: false }, "login", Login.STATE.Signup, "", 0, true);
        upBtn.setAnimations({ x: 761, y: 144 });
        Login.signupList.push(upBtn.getSprite());
        Login.keyboardList.push(upBtn);

        let downBtn = new KeyboardBtn({ w: 23, h: 22 }, 304, 90, this.keyboardPanel, { cb: Input.moveCursor, arg: true }, "login", Login.STATE.Signup, "", 0, true);
        downBtn.setAnimations({ x: 761, y: 166 });
        Login.signupList.push(downBtn.getSprite());
        Login.keyboardList.push(downBtn);

        let nextBtn = new KeyboardBtn({ w: 29, h: 27 }, 302, 20, this.keyboardPanel, { cb: Input.moveCursor, arg: true }, "login", Login.STATE.Signup, "", 0, true);
        nextBtn.setAnimations({ x: 832, y: 144 });
        Login.signupList.push(nextBtn.getSprite());
        Login.keyboardList.push(nextBtn);

        this.openKeyboardBtn = new Button({ w: 51, h: 8 }, centerXElement(this.keyboardPanel, 51), -8, this.keyboardPanel, Login.openKeyboard.bind(this), "login", Login.STATE.Signup, "", 0, true);
        this.openKeyboardBtn.setAnimations({ x: 626, y: 120 });
        Login.signupList.push(this.openKeyboardBtn.getSprite());

        let originX = 45;
        let originY = 40;
        let x = originX;
        let y = originY;

        for (let i = 0; i < 26; i++) {
            if (i == 10) {
                x = originX + 11;
                y += 25;
            } else if (i == 19) {
                x = originX + 36;
                y += 25;
            }

            let alphabetBtn = new KeyboardBtn({ w: 23, h: 22, v: 6 }, x, y, this.keyboardPanel, { cb: Login.handleKeyboardClick, arg: i }, "login", Login.STATE.Signup, "alpha_" + Login.LC_alphabet[i], 41);
            alphabetBtn.setFontColor("rgba(142,45,45,1)");
            alphabetBtn.setOffsets(-1, 13);
            alphabetBtn.setTextCase("all");
            Login.signupList.push(alphabetBtn.getSprite());
            Login.keyboardList.push(alphabetBtn);

            x += 25;
        }

        originX = 406;
        x = originX;
        y = 15;

        for (let i = 9; i >= 0; i--) {

            if (i == 6 || i == 3) {
                x = originX;
                y += 25;
            }
            if (i == 0) {
                x = originX - 25;
                y += 25;
            }

            let numBtn = new KeyboardBtn({ w: 23, h: 22, v: 6 }, x, y, this.keyboardPanel, { cb: Login.handleKeyboardClick, arg: i }, "login", Login.STATE.Signup, "num_" + i, 41);
            numBtn.setFontColor("rgba(142,45,45,1)");
            numBtn.setOffsets(-1, 13);
            Login.signupList.push(numBtn.getSprite());
            Login.keyboardList.push(numBtn);

            x -= 25;
        }

        Login.keyboardList.forEach(b => {
            b.setState(Button.STATE.Inactive);
        });



        // ---------------- LOGIN ----------------
        /*
        Username -> Focus
        Password

        If all ok : 
        display popup 
        go to splashScreen
        */
        let test2Btn = new Button({ w: 80, h: 40, v: 8 }, centerX(80), 80, null, null, "login", Login.STATE.Login, "go", 4);
        test2Btn.setFontColor("rgba(142,45,45,1)");
        test2Btn.setOffsets(0, 22);
        Login.loginList.push(test2Btn.getSprite());

        let loginBackBtn = new Button({ w: 30, h: 22 }, 30, 30, null, { cb: Login.changeState, arg: Login.STATE.Main }, "login", Login.STATE.Login, "", 0, true);
        loginBackBtn.setAnimations({ x: 86, y: 56 });
        Login.loginList.push(loginBackBtn.getSprite());
    }

    static caps() {
        Login.bCaps = !Login.bCaps;
        Login.keyboardList.forEach(b => {
            if (Login.bCaps) {
                b.setTextCase("all");
            } else {
                b.setTextCase("normal");
            }
        });
    }

    static handleKeyboardClick(pIndex) {
        if (pIndex == -1) {
            Input.handleVirtualKeyboard(pIndex);
        } else {
            if (Login.bCaps) {
                Input.handleVirtualKeyboard(Login.UC_alphabet[pIndex]);
            } else {
                Input.handleVirtualKeyboard(Login.LC_alphabet[pIndex]);
            }
        }
    }

    static openKeyboard() {
        if (Login.bKeyboardActive) { //? Close
            this.keyboardPanel.startPos.x = this.keyboardPanel.x;
            this.keyboardPanel.startPos.y = this.keyboardPanel.y;
            this.keyboardPanel.setDestination({ x: 0, y: CANVAS_HEIGHT });
            this.keyboardPanel.setMoving(true);

            Login.bKeyboardActive = false;
            this.openKeyboardBtn.setAnimations({ x: 626, y: 120 });
            Login.keyboardList.forEach(b => {
                b.setState(Button.STATE.Inactive);
            });
        } else { //? Open
            this.keyboardPanel.startPos.x = this.keyboardPanel.x;
            this.keyboardPanel.startPos.y = this.keyboardPanel.y;
            this.keyboardPanel.setDestination({ x: 0, y: CANVAS_HEIGHT - 124 });
            this.keyboardPanel.setMoving(true);

            Login.bKeyboardActive = true;
            this.openKeyboardBtn.setAnimations({ x: 626, y: 128 });
            Login.keyboardList.forEach(b => {
                b.setState(Button.STATE.Normal);
            });
        }

    }

    static goToSplashScreen() {
        SplashScreen.init();
    }

    static changeState(pNewState) {
        Login.currentState = pNewState;
        Panel.resetTypeState("login", pNewState);
        Button.resetTypeState("login", pNewState);
        EntryField.resetTypeState("login", pNewState)
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
                if (this.keyboardPanel.bMoving) {
                    this.keyboardPanel.update(dt);
                }
                Sprite.manageBeforeUpdating(Login.signupList, dt);
                Login.signupList = Login.signupList.filter(sp => {
                    return !sp.delete;
                });
                break;
            case Login.STATE.Login:
                Sprite.manageBeforeUpdating(Login.loginList, dt);
                Login.loginList = Login.loginList.filter(sp => {
                    return !sp.delete;
                });
                break;
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
                // ctx.fillText("balbfjdksmfhqofh", 10, 10);
                break;
            case Login.STATE.Signup:
                Sprite.manageBeforeDrawing(Login.signupList);
                break;
            case Login.STATE.Login:
                Sprite.manageBeforeDrawing(Login.loginList);
                break;

                break;
        }
    }

}