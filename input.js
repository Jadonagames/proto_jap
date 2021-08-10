class Input {
    static bDownKey = false;
    static bUpKey = false;
    static bEnterKey = false;
    constructor() { }
}

// Key event
document.addEventListener("keydown", keyDown, false);
document.addEventListener("keyup", keyUp, false);

function keyDown(k) {

    k.preventDefault();
    if (mainState == MAIN_STATE.Game) {
        if (k.code == "ArrowRight") {
            player.bKeyRight = true;
        }
        if (k.code == "ArrowLeft") {
            player.bKeyLeft = true;
        }
        if (k.code == "ArrowUp") {
            player.bKeyUp = true;
        }
        if (k.code == "ArrowDown") {
            player.bKeyDown = true;
        }
    }

    /**
     * 
     * GESTION MENU KEYBOARD
     * 
     */

    // if ((mainState == MAIN_STATE.Menu && MainMenu.state == MainMenu.STATE.Main) ||
    //     (mainState == MAIN_STATE.Game && currentState == GAME_STATE.Pause)) {
    //     if (k.code == "ArrowDown" && !Input.bDownKey) {
    //         Input.bDownKey = true;

    //         for (i = 0; i < Button.currentList.length; i++) {
    //             if (Button.currentList[i].getState() == Button.STATE.Hover) {
    //                 if (i == Button.currentList.length - 1) {
    //                     Button.currentList[i].setState(Button.STATE.Normal);
    //                     Button.currentList[i].getSprite().changeAnimation("normal");
    //                     Button.currentList[0].setState(Button.STATE.Hover);
    //                     Button.currentList[0].getSprite().changeAnimation("hover");
    //                 } else {
    //                     Button.currentList[i].setState(Button.STATE.Normal);
    //                     Button.currentList[i].getSprite().changeAnimation("normal");
    //                     Button.currentList[i + 1].setState(Button.STATE.Hover);
    //                     Button.currentList[i + 1].getSprite().changeAnimation("hover");
    //                 }
    //                 break;
    //             }
    //         }
    //     }

    //     if (k.code == "ArrowUp" && !Input.bUpKey) {
    //         Input.bUpKey = true;

    //         for (i = 0; i < Button.currentList.length; i++) {
    //             if (Button.currentList[i].getState() == Button.STATE.Hover) {

    //                 if (i == 0) {
    //                     Button.currentList[i].setState(Button.STATE.Normal);
    //                     Button.currentList[i].getSprite().changeAnimation("normal");
    //                     Button.currentList[Button.currentList.length - 1].setState(Button.STATE.Hover);
    //                     Button.currentList[Button.currentList.length - 1].getSprite().changeAnimation("hover");
    //                 } else {
    //                     Button.currentList[i].setState(Button.STATE.Normal);
    //                     Button.currentList[i].getSprite().changeAnimation("normal");
    //                     Button.currentList[i - 1].setState(Button.STATE.Hover);
    //                     Button.currentList[i - 1].getSprite().changeAnimation("hover");
    //                 }
    //                 break;
    //             }
    //         }

    //     }

    //     if (k.code == "Enter" && !Input.bEnterKey) {
    //         let btn = Button.currentList.filter(b => {
    //             return b.getState() == Button.STATE.Hover;
    //         });

    //         btn[0].setState(Button.STATE.Normal);
    //         btn[0].getSprite().changeAnimation("normal");

    //         btn[0].callback();
    //     }
    // }

    /**
     * FIN GESTION MENU KEYBOARD
     */
}

function keyUp(k) {
    k.preventDefault();
    if (mainState == MAIN_STATE.Game) {
        if (k.code == "ArrowRight") {
            player.bKeyRight = false;
        }
        if (k.code == "ArrowLeft") {
            player.bKeyLeft = false;
        }
        if (k.code == "ArrowUp") {
            player.bKeyUp = false;
            Input.bUpkey = false;
        }
        if (k.code == "ArrowDown") {
            player.bKeyDown = false;
        }
    }

    /**
     * 
     * GESTION MENU KEYBOARD
     * 
     */
    // if ((mainState == MAIN_STATE.Menu && MainMenu.state == MainMenu.STATE.Main) ||
    //     (mainState == MAIN_STATE.Game && currentState == GAME_STATE.Pause)) {
    //     if (k.code == "ArrowDown") {
    //         Input.bDownKey = false;
    //     }
    //     if (k.code == "ArrowUp") {
    //         Input.bUpKey = false;
    //     }
    //     if (k.code == "Enter") {
    //         Input.bEnterKey = false;
    //     }
    // }
    /**
    * FIN GESTION MENU KEYBOARD
    */

    // PAUSE
    if (k.code == "Escape") {
        if (mainState == MAIN_STATE.Game && (currentState == GAME_STATE.Game || currentState == GAME_STATE.Pause)) {
            togglePause();
        }
    }

    /**
     * DEBUG
     */
    if (k.code == "KeyQ") { // => A
        // test(learn, choice, charNumbers);
    }

    if (k.code == "KeyE") {
        Sound.setCurrentMusic(Sound.list["music"]);
        Sound.current.play();
    }

    if (k.code == "KeyA") {
        toMainMenu();
    }

    if (k.code == "Space") {
        // debug_STOP = !debug_STOP;
    }

    if (k.code == "KeyD") {
        bStatsDebug = !bStatsDebug;
    }


    if (k.code == "KeyC") {
        switch (LANG["lang_code"]) {
            case "en":
                LanguageScreen.changeLanguage("fr");
                break;
            case "fr":
                LanguageScreen.changeLanguage("jp");
                break;
            case "jp":
                LanguageScreen.changeLanguage("en");
                break
        }
    }





    // ------------------- END DEBUG
}

function pick(x, y) {
    let pixel = ctx.getImageData(x, y, 1, 1);
    let data = pixel.data;
}

/**
 * 
 * GESTION MENU MOUSE 
 * 
 */
canvas.addEventListener("mousemove", e => {
    const mouseX = e.layerX / SCALE_X;
    const mouseY = e.layerY / SCALE_Y;

    // pick(e.layerX, e.layerY);

    if (MainMenu.state != MainMenu.STATE.Transition && currentState != GAME_STATE.Transition) {

        Button.currentList.forEach(b => {

            if (b.getState() != Button.STATE.Inactive) {
                if (!b.staticSize) {
                    if (CollisionManager.MouseCollision(mouseX, mouseY, b.x, b.y, b.getSize().w, b.getSize().h)) {
                        if (b.getSprite().tl.currentAnimation.name != "down") {
                            if (b.hoverCB && b.getState() != Button.STATE.Hover) {
                                b.hoverCB.cb(b.hoverCB.arg);
                            }
                            b.setState(Button.STATE.Hover);
                            for (const sp in b.getSprite()) {
                                if (b.getSprite()[sp] instanceof Sprite) {
                                    b.getSprite()[sp].changeAnimation("hover");
                                }
                            }
                        }
                    } else {
                        if (b.getState() == Button.STATE.Hover) {
                            if (b.hoverCB) {
                                b.getTooltip().forEach(sp => {
                                    if (sp instanceof Sprite) {
                                        sp.delete = true;
                                    } else {
                                        sp.getSprite().delete = true;
                                    }
                                })
                            }
                            b.setState(Button.STATE.Normal);
                            for (const sp in b.getSprite()) {
                                if (b.getSprite()[sp] instanceof Sprite) {
                                    b.getSprite()[sp].changeAnimation("normal");
                                }
                            }
                        }
                    }
                } else {
                    if (CollisionManager.MouseCollision(mouseX, mouseY, b.getSprite().x, b.getSprite().y, b.getSize().w, b.getSize().h)) {
                        if (b.getSprite().currentAnimation.name != "down") {
                            b.setState(Button.STATE.Hover);
                            b.getSprite().changeAnimation("hover"); // TODO ADD CB
                        }
                    } else {
                        if (b.getState() == Button.STATE.Hover) {
                            b.setState(Button.STATE.Normal);
                            b.getSprite().changeAnimation("normal");
                        }
                    }
                }
            }
        });

        Panel.currentList.forEach(p => {

            if (p.getState() != Panel.STATE.Inactive && p.hoverable) {
                if (!p.staticSize) {
                    if (CollisionManager.MouseCollision(mouseX, mouseY, p.x, p.y, p.getSize().w, p.getSize().h)) {
                        if (p.getSprite().tl.currentAnimation.name != "down") {
                            if (p.hoverCB && p.getState() != Panel.STATE.Hover) {
                                p.hoverCB.cb(p.hoverCB.arg);
                            }
                            p.setState(Panel.STATE.Hover);
                            for (const sp in p.getSprite()) {
                                if (p.getSprite()[sp] instanceof Sprite) {
                                    p.getSprite()[sp].changeAnimation("hover");
                                }
                            }
                        }
                    } else {
                        if (p.getState() == Panel.STATE.Hover) {
                            if (p.hoverCB) {
                                p.getTooltip().forEach(sp => {
                                    if (sp instanceof Sprite) {
                                        sp.delete = true;
                                        if (sp.type == "kana") {
                                            sp.step = 1;
                                            sp.active = false;
                                            sp.stepTimer.reset();
                                            sp.resetKana();
                                        }
                                    } else {
                                        sp.getSprite().delete = true;
                                    }
                                })
                            }
                            p.setState(Panel.STATE.Normal);
                            for (const sp in p.getSprite()) {
                                if (p.getSprite()[sp] instanceof Sprite) {
                                    p.getSprite()[sp].changeAnimation("normal");
                                }
                            }
                        }
                    }
                } else {
                    if (CollisionManager.MouseCollision(mouseX, mouseY, p.getSprite().x, p.getSprite().y, p.getSize().w, p.getSize().h)) {
                        if (p.getSprite().currentAnimation.name != "down") {
                            if (p.hoverCB && p.getState() != Panel.STATE.Hover) {
                                p.hoverCB.cb(p.hoverCB.arg);
                            }
                            p.setState(Panel.STATE.Hover);
                            p.getSprite().changeAnimation("hover"); // TODO ADD CB
                        }
                    } else {
                        if (p.getState() == Panel.STATE.Hover) {
                            if (p.hoverCB) {
                                p.getTooltip().forEach(sp => {
                                    if (sp instanceof Sprite) {
                                        sp.delete = true;
                                        if (sp.type == "kana") {
                                            sp.step = 1;
                                            sp.active = false;
                                            sp.stepTimer.reset();
                                            sp.resetKana();
                                        }
                                    } else {
                                        sp.getSprite().delete = true;
                                    }
                                })
                            }
                            p.setState(Panel.STATE.Normal);
                            p.getSprite().changeAnimation("normal");
                        }
                    }
                }
            }
        });
    }

})

canvas.addEventListener("mousedown", e => {
    const mouseX = e.layerX / SCALE_X;
    const mouseY = e.layerY / SCALE_Y;

    if (MainMenu.state != MainMenu.STATE.Transition && currentState != GAME_STATE.Transition) {
        Button.currentList.forEach(b => {
            if (b.getState() != Button.STATE.Inactive) {
                if (!b.staticSize) {
                    if (CollisionManager.MouseCollision(mouseX, mouseY, b.x, b.y, b.getSize().w, b.getSize().h)) {
                        b.setState(Button.STATE.Hover);
                        for (const sp in b.getSprite()) {
                            if (b.getSprite()[sp] instanceof Sprite) {
                                b.getSprite()[sp].changeAnimation("down");
                            }
                        }
                    }
                } else {
                    if (CollisionManager.MouseCollision(mouseX, mouseY, b.getSprite().x, b.getSprite().y, b.getSize().w, b.getSize().h)) {
                        b.setState(Button.STATE.Hover);
                        b.getSprite().changeAnimation("down");
                    }
                }
            }
        });
    }

})

canvas.onclick = e => {
    const mouseX = e.layerX / SCALE_X;
    const mouseY = e.layerY / SCALE_Y;

    // console.log("mx:my : " + mouseX + ":" + mouseY);

    if (MainMenu.state != MainMenu.STATE.Transition && currentState != GAME_STATE.Transition) {

        Button.currentList.every(b => {
            if (b.getState() != Button.STATE.Inactive) {
                if (b.getState() == Button.STATE.Hover) {

                    if (b instanceof ButtonKana) {
                        b.callback(b.char);
                    } else {
                        if (b.callback.cb != null && b.callback.arg != null) {
                            b.callback.cb(b.callback.arg);
                        } else {
                            b.callback();
                        }
                    }

                    b.setState(Button.STATE.Normal);
                    if (!b.staticSize) {
                        for (const sp in b.getSprite()) {
                            if (b.getSprite()[sp] instanceof Sprite) {
                                b.getSprite()[sp].changeAnimation("normal");
                            }
                        }
                    } else {
                        b.getSprite().changeAnimation("normal");
                    }
                    return false;
                }
            }
            return true;
        });

        // Check after a screen change if the mouse isn't hovering
        Button.currentList.every(b => {
            if (b.getState() != Button.STATE.Inactive) {
                if (!b.staticSize) {
                    if (CollisionManager.MouseCollision(mouseX, mouseY, b.x, b.y, b.getSize().w, b.getSize().h)) {
                        b.setState(Button.STATE.Hover);
                        for (const sp in b.getSprite()) {
                            if (b.getSprite()[sp] instanceof Sprite) {
                                b.getSprite()[sp].changeAnimation("hover");
                            }
                        }
                        return false;
                    } else {
                        if (b.getState() == Button.STATE.Hover) {
                            b.setState(Button.STATE.Normal);
                            for (const sp in b.getSprite()) {
                                if (b.getSprite()[sp] instanceof Sprite) {
                                    b.getSprite()[sp].changeAnimation("normal");
                                }
                            }
                        }
                    }
                } else {
                    if (CollisionManager.MouseCollision(mouseX, mouseY, b.getSprite().x, b.getSprite().y, b.getSize().w, b.getSize().h)) {
                        b.setState(Button.STATE.Hover);
                        b.getSprite().changeAnimation("hover");
                        return false;
                    } else {
                        if (b.getState() == Button.STATE.Hover) {
                            b.setState(Button.STATE.Normal);
                            b.getSprite().changeAnimation("normal");
                        }
                    }
                }
            }
            return true;
        });
    }
}

/**
 *
 * FIN GESTION MENU MOUSE
 *
 */