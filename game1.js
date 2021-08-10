class Game1 {






    /**
     * 
     * 
     * TOUT REFAIRE  !!! 
     * buttons
     * sprite management
     * etc.
     * 
     * 
     * 
     * 
     * 
     * 
     */











































    static STATE = Object.freeze({
        Menu: 0,
        Game: 1,
        Pause: 2,
        Transition: 3
    });

    static currentState = Game1.STATE.Game;
    static bGameInitialized = null;

    static mainList = [];

    constructor() {

        // this.STATE = Object.freeze({
        //     Menu: 0,
        //     Game: 1,
        //     Pause: 2,
        //     Transition: 3
        // });

        // this.currentState = null;

        // this.bGameInitialized = false;

    }

    static init() {

        console.log("Game1 init()");

        Game1.bGameInitialized = true;
        let x = 0;
        let y = 0;

        // let x = 50;
        // rndArr.forEach(c => {
        //     // let btn = new ButtonKana({ w: 32, h: 16 }, x, 180, checkIfValid, "mainmenu", MainMenu.STATE.Main, c);
        //     let btn = new ButtonKana({ w: 32, h: 16 }, x, 180, checkIfValid, "game1", Game1.STATE.Game, c);
        //     btn.getSprite().addAnimation("normal", 1, { x: 384, y: 48 }, 0.1);
        //     btn.getSprite().addAnimation("hover", 1, { x: 416, y: 48 }, 0.1);
        //     btn.getSprite().addAnimation("down", 1, { x: 448, y: 48 }, 0.1);
        //     btn.getSprite().changeAnimation("normal");
        //     Game1.mainList.push(btn.getSprite());
        //     x += 40;
        // })

        // rndArr.forEach(c => {
        //     // let btn = new ButtonKana({ w: 32, h: 16 }, x, 180, checkIfValid, "mainmenu", MainMenu.STATE.Main, c);
        //     let btn = new ButtonKana({ w: 60, h: 40 }, x, 100, checkIfValid, "game1", Game1.STATE.Game, c);
        //     btn.getSprite().addAnimation("normal", 1, { x: 384, y: 64 }, 0.1);
        //     btn.getSprite().addAnimation("hover", 1, { x: 444, y: 64 }, 0.1);
        //     btn.getSprite().addAnimation("down", 1, { x: 504, y: 64 }, 0.1);
        //     btn.getSprite().changeAnimation("normal");
        //     Game1.mainList.push(btn.getSprite());
        //     x += 60;
        // })

        for (i = 0; i < rndArr.length; i++) {
            switch (i) {
                case 0:
                    x = CANVAS_WIDTH / 2 - 30;
                    y = CANVAS_HEIGHT * 1 / 10;
                    ;
                    break;
                case 1:
                    x = CANVAS_WIDTH * 1 / 10;
                    y = CANVAS_HEIGHT / 2 - 20;
                    break;
                case 2:
                    x = CANVAS_WIDTH * 2 / 3;
                    y = CANVAS_HEIGHT / 2 - 20;
                    break;
                case 3:
                    x = CANVAS_WIDTH / 2 - 30;
                    y = CANVAS_HEIGHT * 2 / 3;
                    break;
            }
            let btn = new ButtonKana({ w: 60, h: 40 }, x, y, checkIfValid, "game1", Game1.STATE.Game, rndArr[i]);
            btn.getSprite().addAnimation("normal", 1, { x: 384, y: 64 }, 0.1);
            btn.getSprite().addAnimation("hover", 1, { x: 444, y: 64 }, 0.1);
            btn.getSprite().addAnimation("down", 1, { x: 504, y: 64 }, 0.1);
            btn.getSprite().changeAnimation("normal");
            Game1.mainList.push(btn.getSprite());
        }


        /**
        TODO change place of these :
        ScreenManager.init();
        Pause.init();
         */
    }

    static load() {
        // this.currentState = this.STATE.Game;
        Game1.currentState = Game1.STATE.Game;


    }
    static togglePause() {

        // if (this.currentState == this.STATE.Pause) {
        //     this.currentState = this.STATE.Game;
        //     Button.resetTypeState("normal", this.STATE.Game);
        // } else {
        //     this.currentState = this.STATE.Pause;
        //     Button.resetTypeState("pause", this.STATE.Pause);
        // }

        if (Game1.currentState == Game1.STATE.Pause) {
            Game1.currentState = Game1.STATE.Game;
            Panel.resetTypeState("normal", Game1.STATE.Game);
            Button.resetTypeState("normal", Game1.STATE.Game);
        } else {
            Game1.currentState = Game1.STATE.Pause;
            Panel.resetTypeState("pause", Game1.STATE.Pause);
            Button.resetTypeState("pause", Game1.STATE.Pause);
        }

    }

    static update(dt) {

        /**
         * DEBUG
         */
        //------------ END DEBUG

        if (Game1.currentState == Game1.STATE.Transition) {
            if (FadeEffect.bActive) {
                FadeEffect.update(dt);
            }
        } else if (Game1.currentState == Game1.STATE.Pause) {
            Pause.update(dt);
        }

        if (Game1.currentState != Game1.STATE.Game) {
            return;
        }

        if (Sound.current != null && Sound.bFadingOut) {
            Sound.current.update(dt);
        }

        if (Game1.currentState == Game1.STATE.Game) {
            Sprite.list.forEach(sp => {
                sp.update(dt);
            });
        }

        Sprite.list = Sprite.list.filter(sp => {
            return !sp.delete;
        });
    }

    static draw(ctx) {

        // SELON LA STRUCTURE DU JEU : 
        // ScreenManager.currentScreen.spriteList.forEach(sp => {
        //     sp.getSprite().draw(ctx)
        // });
        // --------------------------------

        Sprite.list.forEach(sp => {
            sp.draw(ctx);
        });


        UiSprite.list.forEach(sp => {
            sp.draw(ctx);
        });

        // Game1.mainList.forEach(sp => {
        //     sp.draw(ctx);
        // });


        Button.currentList.forEach(b => {
            b.getSprite().draw(ctx);
            if (b instanceof ButtonKana) {
                b.draw(ctx);
            }
        });

        ctx.fillStyle = "rgb(255,255,255)";
        ctx.font = "20px UD Digi Kyokasho NK-R";

        switch (choice) {
            case "h":
                ctx.fillText(rndChoice.h, CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
                break;
            case "k":
                ctx.fillText(rndChoice.k, CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
                break;
            case "r":
                ctx.fillText(rndChoice.r, CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
                break;
        }


        /*
        * DEBUG
        */
        if (bStatsDebug) {

            ctx.fillStyle = "rgb(255,255,255)";
            ctx.font = "5px serif";

            ctx.fillText("sprites : " + Sprite.list.length, 0, 100);
        }
        // --------------- END DEBUG

        if (FadeEffect.bActive) {
            FadeEffect.draw(ctx);
        }

        if (Game1.currentState == Game1.STATE.Pause) {
            Pause.draw(ctx)
        }

    }

}

// TODO function newGame / reset / firstLoad
function gameInit() { }
function load() { }

function togglePause() { }

function update(dt) { }

function draw(ctx) {

    // Load screen
    // if (!gameReady) {
    //     let ratio = imageLoader.getLoadedRatio();
    //     ctx.fillStyle = "rgb(255,255,255)";
    //     ctx.fillRect(1, 1, 400, 100);
    //     ctx.fillStyle = "rgb(0, 255, 0)";
    //     ctx.fillRect(1, 1, 400 * ratio, 100);
    //     return;
    // }


}


/**
 * DEBUG
 */

// -------------------- END DEBUG