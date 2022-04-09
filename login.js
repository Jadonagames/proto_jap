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
        let testBtn = new Button({ w: 80, h: 40, v: 8 }, centerX(80), 80, null, null, "login", Login.STATE.Signup, "go", 4);
        testBtn.setFontColor("rgba(142,45,45,1)");
        testBtn.setOffsets(0, 22);
        Login.signupList.push(testBtn.getSprite());

        let signupBackBtn = new Button({ w: 30, h: 22 }, 30, 30, null, { cb: Login.changeState, arg: Login.STATE.Main }, "login", Login.STATE.Signup, "", 0, true);
        signupBackBtn.setAnimations({ x: 86, y: 56 });
        Login.signupList.push(signupBackBtn.getSprite());

        let A_Btn = new Button({ w: 22, h: 40, v: 6 }, centerX(80), 80, null, null, "login", Login.STATE.Signup, "alpha_a", 41);
        A_Btn.setFontColor("rgba(142,45,45,1)");
        A_Btn.setOffsets(0, 22);
        Login.signupList.push(A_Btn.getSprite());



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

    static goToSplashScreen() {
        SplashScreen.init();
    }

    static changeState(pNewState) {
        log("changeSTATE : " + pNewState);

        Login.currentState = pNewState;
        Panel.resetTypeState("login", pNewState);
        Button.resetTypeState("login", pNewState);
    }

    static update(dt) {

        Sprite.manageBeforeUpdating(Login.list, dt);

        Login.list = Login.list.filter(sp => {
            return !sp.delete;
        });
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