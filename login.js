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

    // openKeyboardBtn = null;

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


        let testEntry = new EntryField({ w: 128, h: 28, v: 10 }, centerX(128), 80, null, null, "login", Login.STATE.Signup, "JaDona974", 1);
        testEntry.setOffsets(15,18);
        Login.signupList.push(testEntry.getSprite());

        let testEntry2 = new EntryField({ w: 128, h: 28, v: 10 }, centerX(128), 120, null, null, "login", Login.STATE.Signup, "J", 1);
        testEntry2.setOffsets(15,18);
        Login.signupList.push(testEntry2.getSprite());

        this.keyboardPanel = new Panel({ w: 450, h: 124, v: 1 }, 0, 300, null, "login", Login.STATE.Signup, "", 21);
        this.keyboardPanel.setDestination({ x: 0, y: CANVAS_HEIGHT - 124 });
        this.keyboardPanel.setCanMove(true);
        this.keyboardPanel.setMovingSpeed(0.6);
        Login.signupList.push(this.keyboardPanel.getSprite());


        let capsBtn = new KeyboardBtn({ w: 44, h: 22 }, 220, 5, this.keyboardPanel, Login.caps, "login", Login.STATE.Signup, "",  0, true);
        capsBtn.setAnimations({x: 560, y: 144});
        Login.signupList.push(capsBtn.getSprite());

        let delBtn = new KeyboardBtn({ w: 42, h: 22 }, 270, 5, this.keyboardPanel, { cb: Login.handleKeyboardClick, arg: -1 }, "login", Login.STATE.Signup, "",  0, true);
        delBtn.setAnimations({x: 560, y: 166});
        Login.signupList.push(delBtn.getSprite());

        let leftBtn = new KeyboardBtn({ w: 23, h: 22 }, 150, 5, this.keyboardPanel, { cb: Input.moveCursor, arg: false }, "login", Login.STATE.Signup, "",  0, true);
        leftBtn.setAnimations({x: 692, y: 144});
        Login.signupList.push(leftBtn.getSprite());

        let rightBtn = new KeyboardBtn({ w: 23, h: 22 }, 180, 5, this.keyboardPanel, { cb: Input.moveCursor, arg: true }, "login", Login.STATE.Signup, "",  0, true);
        rightBtn.setAnimations({x: 692, y: 166});
        Login.signupList.push(rightBtn.getSprite());

        this.openKeyboardBtn = new Button({ w: 22, h: 22 }, 0, -22, this.keyboardPanel, Login.openKeyboard.bind(this), "login", Login.STATE.Signup, "", 0, true);
        this.openKeyboardBtn.setAnimations({ x: 560, y: 100 });
        Login.signupList.push(this.openKeyboardBtn.getSprite());

        let originX = 65;
        // let originY = 213;
        let originY = 40;
        let x = originX;
        let y = originY;
        // let destinationY = 213;
        
        for (let i = 0; i < 26; i++) {
            if (i == 10) {
                x = originX + 11;
                y += 25;
                // destinationY += 25;
            } else if (i == 19) {
                x = originX + 36;
                y += 25;
                // destinationY += 25;
            }

            let alphabetBtn = new KeyboardBtn({ w: 23, h: 22, v: 6 }, x, y, this.keyboardPanel, { cb: Login.handleKeyboardClick, arg: i }, "login", Login.STATE.Signup, "alpha_" + Login.LC_alphabet[i], 41);
            alphabetBtn.setFontColor("rgba(142,45,45,1)");
            alphabetBtn.setOffsets(-1, 13);
            alphabetBtn.setTextCase("all");
            Login.signupList.push(alphabetBtn.getSprite());
            Login.keyboardList.push(alphabetBtn);

            x += 25;
        }



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
        if (Login.bKeyboardActive) {
            this.keyboardPanel.startPos.x = this.keyboardPanel.x;
            this.keyboardPanel.startPos.y = this.keyboardPanel.y;
            this.keyboardPanel.setDestination({x: 0, y: CANVAS_HEIGHT});
            this.keyboardPanel.setMoving(true);
            

            Login.bKeyboardActive = false;
            this.openKeyboardBtn.setAnimations({ x: 560, y: 100 });
            Login.keyboardList.forEach(b => {
                if (b.bCanMove) {
                    b.setMoving(true);
                }
            });
        } else {
            this.keyboardPanel.startPos.x = this.keyboardPanel.x;
            this.keyboardPanel.startPos.y = this.keyboardPanel.y;
            this.keyboardPanel.setDestination({x: 0, y: CANVAS_HEIGHT - 124});
            this.keyboardPanel.setMoving(true);

            Login.bKeyboardActive = true;
            this.openKeyboardBtn.setAnimations({ x: 560, y: 122 });
            Login.keyboardList.forEach(b => {
                if (b.bCanMove) {
                    b.setMoving(true);
                }
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
                // Login.keyboardList.forEach(b => {
                //     if (b.bMoving) {
                //         b.update(dt);
                //     }
                // });
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