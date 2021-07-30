const GAME_STATE = Object.freeze({
    Menu: 0,
    Game: 1,
    Pause: 2,
    Transition: 3
})
let currentState = null;

// WIDTH 200 HEIGHT 150
let bGameInitialized = false;
let gameReady = false;

let player = null;

// TODO function newGame / reset / firstLoad

function gameInit() {

    bGameInitialized = true;

    ScreenManager.init();
    Pause.init();

    // UI Setup
    bonusBtn = new Button({ w: 32, h: 16 }, 168, 0, createBonus, "normal", GAME_STATE.Game);
    bonusBtn.getSprite().addAnimation("normal", 1, { x: 288, y: 64 }, 0.1);
    bonusBtn.getSprite().addAnimation("hover", 1, { x: 320, y: 64 }, 0.1);
    bonusBtn.getSprite().addAnimation("down", 1, { x: 352, y: 64 }, 0.1);
    bonusBtn.getSprite().changeAnimation("normal");

    explodeBtn = new Button({ w: 32, h: 16 }, 168, 16, createRandomExplosion, "normal", GAME_STATE.Game);
    explodeBtn.getSprite().addAnimation("normal", 1, { x: 192, y: 64 }, 0.1);
    explodeBtn.getSprite().addAnimation("hover", 1, { x: 224, y: 64 }, 0.1);
    explodeBtn.getSprite().addAnimation("down", 1, { x: 256, y: 64 }, 0.1);
    explodeBtn.getSprite().changeAnimation("normal");

}

function load() {

    currentState = GAME_STATE.Game;
    gameReady = false;

    player = null;

    // TODO EMPTY :
    // Sprite.list etc..

    // -----------------


    player = new Player({ w: 22, h: 22 }, ScreenManager.currentScreen.spawn.x, ScreenManager.currentScreen.spawn.y);

    gameReady = true;
}

function togglePause() {


    console.log(load);

    if (currentState == GAME_STATE.Pause) {
        currentState = GAME_STATE.Game;
        Panel.resetTypeState("normal", GAME_STATE.Game);
        Button.resetTypeState("normal", GAME_STATE.Game);
    } else {
        currentState = GAME_STATE.Pause;
        Panel.resetTypeState("pause", GAME_STATE.Pause);
        Button.resetTypeState("pause", GAME_STATE.Pause);
        /*
        * GESTION MENU KEYBOARD
        */
        // Button.currentList[0].setState(Button.STATE.Hover);
        // Button.currentList[0].getSprite().changeAnimation("hover");
        /*
        * FIN GESTION MENU KEYBOARD
        */
    }
}


function update(dt) {

    /**
     * DEBUG
     */
    //------------ END DEBUG

    if (!gameReady) {
        return;
    }

    if (currentState == GAME_STATE.Transition) {
        if (FadeEffect.bActive) {
            FadeEffect.update(dt);
        }
    } else if (currentState == GAME_STATE.Pause) {
        Pause.update(dt);
    }

    if (currentState != GAME_STATE.Game) {
        return;
    }

    if (Sound.current != null && Sound.bFadingOut) {
        Sound.current.update(dt);
    }

    // PLAYER UPDATE
    if (currentState == GAME_STATE.Game) {
        player.update(dt);

        // COLLISIONS UPDATE

        // Sprite and Player Collision
        player.setCollide(false);
        Sprite.list.forEach(sp => {
            if (sp != player.getSprite()) {
                player.boxColliders.forEach(bc => {
                    if (CollisionManager.AABBCollision(sp.x, sp.y, sp.width, sp.height, bc.x, bc.y, bc.w, bc.h)) {
                        player.setCollide(true);
                    }
                });
            }
        });

        // TransitionBox Collision
        ScreenManager.currentScreen.transitionList.forEach(transitionBox => {
            player.boxColliders.forEach(bc => {
                if (CollisionManager.AABBCollision(transitionBox.x, transitionBox.y, transitionBox.width, transitionBox.height, bc.x, bc.y, bc.w, bc.h) && !transitionBox.bCollide) {
                    transitionBox.setCollide(true);
                    currentState = GAME_STATE.Transition;
                    FadeEffect.fade({ cb: transitionBox.callback, arg: transitionBox.screenInfos });
                }
            });
        });

        // SPRITE UPDATE
        // ScrresetList

        Sprite.list.forEach(sp => {
            sp.update(dt);
        });
    }

    Sprite.list = Sprite.list.filter(sp => {
        return !sp.delete;
    });

}

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


    /*
    * DEBUG
    */
    ScreenManager.currentScreen.transitionList.forEach(et => {
        et.draw(ctx);
    })

    if (bDebug) {
        if (player.bCollide) {
            ctx.strokeStyle = "rgb(255,0,0)";
        } else {
            ctx.strokeStyle = "rgb(255,255,255)";
        }
        ctx.strokeRect(player.boxCollider.x, player.boxCollider.y, player.boxCollider.w, player.boxCollider.h);
        ctx.strokeRect(player.boxCollider2.x, player.boxCollider2.y, player.boxCollider2.w, player.boxCollider2.h);

        ctx.fillStyle = "rgb(255,255,255)";
        ctx.font = "5px serif";

        ctx.fillText("player moving: " + player.getSprite().isMoving, 0, 95);

        ctx.fillText("sprites : " + Sprite.list.length, 0, 100);
        ctx.fillText("UIsprites : " + UiSprite.list.length, 0, 105);
        if (player.getSprite().isMoving) {
            ctx.fillText("position : " + player.getSprite().x + ":" + player.getSprite().y, 0, 110);
        } else {
            ctx.fillText("position : " + Math.ceil(player.getSprite().x) + ":" + Math.ceil(player.getSprite().y), 0, 110);

        }
        ctx.fillText("dt: " + debugDt, 0, 115);
    }
    // --------------- END DEBUG





    if (FadeEffect.bActive) {
        FadeEffect.draw(ctx);
    }

    if (currentState == GAME_STATE.Pause) {
        Pause.draw(ctx)
    }

}


/**
 * DEBUG
 */

// -------------------- END DEBUG

function createRandomExplosion() {
    let rndX = rnd(0, 184);
    let rndY = rnd(0, 134);

    // Explosion :
    let newExplosion = new Effect({ w: 16, h: 16 }, rndX, rndY);
    newExplosion.getSprite().setType("todelete", 1); // type, maxLoop
    newExplosion.getSprite().addAnimation("normal", 6, { x: 0, y: 144 }, 0.1, false);
    newExplosion.getSprite().changeAnimation("normal");

    Sound.list["explosion"].play();
}

function createBonus() {

    let newPower = new Effect({ w: 40, h: 18 }, 80, 120);
    newPower.getSprite().setType("todelete", 3);
    newPower.getSprite().addAnimation("normal", 4, { x: 0, y: 126 }, 0.1, false);
    newPower.getSprite().changeAnimation("normal");

    Sound.list["bonus"].play();
}