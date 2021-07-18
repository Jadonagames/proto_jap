class ScreenManager {

    static list = [];
    static currentScreen = null;

    constructor(pTransitionList, pSpawn, pId, pSprites) {
        this.transitionList = pTransitionList;
        this.spawn = pSpawn;
        this.id = pId;
        this.spriteList = pSprites;
        // this.map 
    }

    static changeScreen(pScreenInfos) {

        ScreenManager.currentScreen = ScreenManager.list[pScreenInfos.to];

        player.setPosition(pScreenInfos.x, pScreenInfos.y);
        player.updateBoxColliders();

        ScreenManager.currentScreen.transitionList.forEach(st => {
            st.setCollide(false);
        })

        // TODO BEFORE FADE-IN
        // LOAD currentScreen SPRITES, delete OTHERS

        FadeEffect.fade({ cb: ScreenManager.changeState, arg: GAME_STATE.Game }, "in", 0.02);
    }

    static changeState(newState) {
        currentState = newState;
    }

    static init() {
        ScreenManager.list["S1S1"] = new ScreenManager([
            new ScreenTransition({ x: 100, y: 1 }, { w: 30, h: 2 }, ScreenManager.changeScreen, { to: "S1S2", from: "S1S1", x: 104, y: 122 }),
            new ScreenTransition({ x: 197, y: 100 }, { w: 2, h: 30 }, ScreenManager.changeScreen, { to: "S1S3", from: "S1S1", x: 4, y: 104 })
        ], { x: 80, y: 65 }, "S1S1", [
            // new Character({ w: 30, h: 16 }, 24, 0),
            // new Enemy({ w: 24, h: 24 }, 0, 0)
        ]);

        ScreenManager.list["S1S2"] = new ScreenManager([
            new ScreenTransition({ x: 100, y: 145 }, { w: 30, h: 4 }, ScreenManager.changeScreen, { to: "S1S1", from: "S1S2", x: 104, y: 8 })
        ], { x: 104, y: 122 }, "S1S2", [
            // new Character({ w: 30, h: 16 }, 50, 50),
            // new Enemy({ w: 24, h: 24 }, 100, 100)
        ]);

        ScreenManager.list["S1S3"] = new ScreenManager([
            new ScreenTransition({ x: 1, y: 100 }, { w: 2, h: 30 }, ScreenManager.changeScreen, { to: "S1S1", from: "S1S3", x: 174, y: 104 })
        ], { x: 4, y: 104 }, "S1S3", []);


        ScreenManager.currentScreen = ScreenManager.list["S1S1"];
    }

}