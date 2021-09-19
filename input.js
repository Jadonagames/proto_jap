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


    if (k.code == "ArrowRight") {
        Panel.currentList.forEach(p => {
            if (p instanceof Panel && p.getParent() == null) {
                p.x += 10;
                p.bMoving = true;
            }
        })
    }
    if (k.code == "ArrowLeft") {
        Panel.currentList.forEach(p => {
            if (p instanceof Panel && p.getParent() == null) {
                p.x -= 10;
                p.bMoving = true;
            }
        })
    }


    if (k.code == "ArrowUp") {
        Panel.currentList.forEach(p => {
            if (p instanceof Panel && p.getParent() == null) {
                if (p.alpha < 1) {
                    p.alpha += 0.1;
                    if (p.alpha >= 1) {
                        p.alpha = 1;
                    }
                }
                p.bFading = true;
            }
        })
    }
    if (k.code == "ArrowDown") {
        Panel.currentList.forEach(p => {
            if (p instanceof Panel && p.getParent() == null) {
                if (p.alpha > 0) {
                    p.alpha -= 0.1;
                    if (p.alpha <= 0) {
                        p.alpha = 0;
                    }
                }
                p.bFading = true;
            }
        })
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

    if (k.code == "ArrowRight") {
        Panel.currentList.forEach(p => {
            if (p instanceof Panel && p.getParent() == null) {
                p.bMoving = false;
                p.children.forEach(c => {
                    c.updatePosition();
                });
            }
        })
    }
    if (k.code == "ArrowLeft") {
        Panel.currentList.forEach(p => {
            if (p instanceof Panel && p.getParent() == null) {
                p.bMoving = false;
                p.children.forEach(c => {
                    c.updatePosition();
                });
            }
        })
    }
    if (k.code == "ArrowUp") {
        Panel.currentList.forEach(p => {
            if (p instanceof Panel && p.getParent() == null) {
                p.bFading = false;
                p.children.forEach(c => {
                    if (c instanceof Panel || c instanceof Button) {
                        c.alpha = p.alpha;
                    }
                });
            }
        })
    }
    if (k.code == "ArrowDown") {
        Panel.currentList.forEach(p => {
            if (p instanceof Panel && p.getParent() == null) {
                p.bFading = false;
                p.children.forEach(c => {
                    if (c instanceof Panel || c instanceof Button) {
                        c.alpha = p.alpha;
                    }
                });
            }
        })
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

    }

    if (k.code == "KeyE") {
        // Sound.setCurrentMusic(Sound.list["music"]);
        // Sound.current.play();

        // Lessons.addStarTrophy("h1");

        // console.log(" --- Lesson.hiraganaList : --- ");
        // console.table(Lessons.hiraganaList);

        console.log("SAVE_DATA : ");
        console.log(SaveManager.SAVE_DATA);
    }

    if (k.code == "Enter") { // Q ?
        // toMainMenu();
        TURN_NUMBER = MAX_TURN - 1;



    }

    if (k.code == "Space") {
        // debug_STOP = !debug_STOP;

        // let paramsToSave = [
        //     {
        //         type: "prologue",
        //         value: 1
        //     },
        //     {
        //         type: "lessons",
        //         params: ["h1", "lessonTestGeneral"],
        //         value: 48
        //     },
        //     {
        //         type: "lessons",
        //         params: ["h1", "lessonTest1"],
        //         value: 48
        //     },
        //     {
        //         type: "lessons",
        //         params: ["h1", "lessonTest2"],
        //         value: 48
        //     },
        //     {
        //         type: "lessons",
        //         params: ["h1", "fullTestGeneral"],
        //         value: 0
        //     },
        //     {
        //         type: "lessons",
        //         params: ["h1", "fullTest1"],
        //         value: 48
        //     },
        //     {
        //         type: "lessons",
        //         params: ["h1", "fullTest2"],
        //         value: 0
        //     },
        //     {
        //         type: "lessons",
        //         params: ["h2", "lessonTestGeneral"],
        //         value: 0
        //     },
        //     {
        //         type: "lessons",
        //         params: ["h2", "lessonTest1"],
        //         value: 0
        //     },
        //     {
        //         type: "lessons",
        //         params: ["h2", "lessonTest2"],
        //         value: 16
        //     },
        //     {
        //         type: "lessons",
        //         params: ["h2", "fullTestGeneral"],
        //         value: 16
        //     },
        //     {
        //         type: "lessons",
        //         params: ["h2", "fullTest1"],
        //         value: 16
        //     },
        //     {
        //         type: "lessons",
        //         params: ["h2", "fullTest2"],
        //         value: 16
        //     },
        // ];

        MainMenu.particles(50, 50);
        console.log(" --- MainMenu.randomKanaSpriteList : --- ");
        console.table(Particles.list);


        // console.log(" --- MainMenu.randomKanaSpriteList : --- ");
        // console.table(MainMenu.randomKanaSpriteList);

        // MainMenu.randomKanaSpriteList.forEach(sp => {
        //     if (sp.bColliding) {
        //         console.log("sp is colliding : ");
        //         console.log(sp);
        //     }
        // });

        // SaveManager.save(paramsToSave);
        // console.log(" --- Sprite.list : --- ");
        // console.table(Sprite.list);
        // console.log(" --- MainMenu.mainList : --- ");
        // console.table(MainMenu.mainList);
        // console.log(" --- MainMenu.creditsList : --- ");
        // console.table(MainMenu.creditsList);
        // console.log(" --- Button.list : --- ");
        // console.table(Button.list);
        // console.log(" --- Button.currentList : --- ");
        // console.table(Button.currentList);
        // console.log(" --- LessonBtn.currentList : --- ");
        // console.table(LessonBtn.list);
        // console.log(" --- Panel.currentList : --- ");
        // console.table(Panel.currentList);
        // console.log(" --- Sprite.kanaList : --- ");
        // console.table(Sprite.kanaList);
        // console.log(" --- Lesson.lessonsList : --- ");
        // console.table(Lessons.lessonList);
        // console.log(" --- Game1.mainList : --- ");
        // console.table(Game1.mainList);
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

    if (!TRANSITION) {

        const mouseX = e.layerX / SCALE_X;
        const mouseY = e.layerY / SCALE_Y;

        // console.log(mouseY);

        MOUSE_SPRITE.x = mouseX;
        if (mainState == MAIN_STATE.Lessons && Lessons.state == Lessons.STATE.Lesson) {
            MOUSE_SPRITE.y = mouseY + CANVAS_HEIGHT;
        } else {
            MOUSE_SPRITE.y = mouseY;
        }

        // pick(e.layerX, e.layerY);

        if (MainMenu.state != MainMenu.STATE.Transition && currentState != GAME_STATE.Transition) {

            Button.currentList.forEach(b => {
                if (b.getState() != Button.STATE.Inactive && b.getState() != LessonBtn.STATE.Close) {
                    if (CollisionManager.MouseCollision(mouseX, mouseY, b.x, b.y, b.getSize().w, b.getSize().h)) {
                        if ((b.getSprite().tl != undefined && b.getSprite().tl.currentAnimation.name != "down") || // not staticSize
                            (b.getSprite().tl == undefined && b.getSprite().currentAnimation.name != "down")) {    // staticSize

                            if (b.getState() != Button.STATE.Hover) {
                                if (b.hoverCB) {
                                    b.hoverCB.cb(b.hoverCB.arg);
                                }
                                b.setState(Button.STATE.Hover);
                                b.changeSpriteAnimation("hover");
                                MOUSE_SPRITE.changeAnimation("hover");
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
                                if (b.getHoverOffset()) {
                                    let func = translate.bind(b, { x: b.getHoverOffset().x, y: b.getHoverOffset().y }, true);
                                    func();
                                }
                            }
                            b.setState(Button.STATE.Normal);
                            b.changeSpriteAnimation("normal");
                            MOUSE_SPRITE.changeAnimation("normal");
                        }
                    }
                }
            });

            Panel.currentList.forEach(p => {
                if (p.getState() != Panel.STATE.Inactive && p.hoverable) {
                    if (CollisionManager.MouseCollision(mouseX, mouseY, p.x, p.y, p.getSize().w, p.getSize().h)) {
                        if ((p.getSprite().tl != undefined && p.getSprite().tl.currentAnimation.name != "down") || // not staticSize
                            (p.getSprite().tl == undefined && p.getSprite().currentAnimation.name != "down")) {    // staticSize
                            if (p.getState() != Panel.STATE.Hover) {
                                if (p.hoverCB) {
                                    p.hoverCB.cb(p.hoverCB.arg);
                                }
                                p.setState(Panel.STATE.Hover);
                                p.changeSpriteAnimation("hover");
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
                            p.changeSpriteAnimation("normal");
                        }
                    }
                }
            });
        }
    }

})

canvas.addEventListener("mousedown", e => {
    if (!TRANSITION) {

        const mouseX = e.layerX / SCALE_X;
        const mouseY = e.layerY / SCALE_Y;

        if (MainMenu.state != MainMenu.STATE.Transition && currentState != GAME_STATE.Transition) {
            Button.currentList.forEach(b => {
                if (b.getState() != Button.STATE.Inactive && b.getState() != LessonBtn.STATE.Close) {
                    if (CollisionManager.MouseCollision(mouseX, mouseY, b.x, b.y, b.getSize().w, b.getSize().h)) {
                        b.setState(Button.STATE.Hover);
                        b.changeSpriteAnimation("down");
                        MOUSE_SPRITE.changeAnimation("down");
                    }
                }
            });
        }
    }
})

canvas.onclick = e => {
    if (!TRANSITION) {

        const mouseX = e.layerX / SCALE_X;
        const mouseY = e.layerY / SCALE_Y;

        // console.log("mx:my : " + mouseX + ":" + mouseY);

        if (MainMenu.state != MainMenu.STATE.Transition && currentState != GAME_STATE.Transition) {

            Button.currentList.every(b => {
                if (b.getState() != Button.STATE.Inactive && b.getState() != LessonBtn.STATE.Close) {
                    if (b.getState() == Button.STATE.Hover) {
                        if (b.getHoverOffset()) {
                            let func = translate.bind(b, { x: b.getHoverOffset().x, y: b.getHoverOffset().y }, true);
                            func();
                        }
                        b.setState(Button.STATE.Normal);
                        b.changeSpriteAnimation("normal");
                        MOUSE_SPRITE.changeAnimation("normal");

                        if (b.callback.cb != null && b.callback.arg != null) {
                            b.callback.cb(b.callback.arg);
                        } else {
                            b.callback();
                        }
                        if (b.hoverCB) {
                            b.getTooltip().forEach(sp => {
                                if (sp instanceof Sprite) {
                                    sp.delete = true;
                                } else {
                                    sp.getSprite().delete = true;
                                }
                            });
                        }
                        return false;
                    }
                }
                return true;
            });

            // Check after a screen change if the mouse isn't hovering
            Button.currentList.every(b => {
                if (b.getState() != Button.STATE.Inactive && b.getState() != LessonBtn.STATE.Close) {
                    if (CollisionManager.MouseCollision(mouseX, mouseY, b.x, b.y, b.getSize().w, b.getSize().h)) {
                        if (b.hoverCB && b.getState() != Button.STATE.Hover) {
                            b.hoverCB.cb(b.hoverCB.arg);
                        }
                        b.setState(Button.STATE.Hover);
                        b.changeSpriteAnimation("hover");
                        MOUSE_SPRITE.changeAnimation("hover");
                        return false;
                    } else {
                        if (b.getState() == Button.STATE.Hover) {
                            b.setState(Button.STATE.Normal);
                            b.changeSpriteAnimation("normal");
                            MOUSE_SPRITE.changeAnimation("normal");
                        }
                    }
                }
                return true;
            });
        }
    }
}

/**
 *
 * FIN GESTION MENU MOUSE
 *
 */