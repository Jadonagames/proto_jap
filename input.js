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

        // console.table(Button.currentList);
        // Button.currentList.forEach(b => {

        //     console.log(b.label + ":" + b.state);
        // });


        // Transition.active(5, 5, 451, 10);

        displaySaving(true);
    }

    if (k.code == "KeyE") {
        // Sound.setCurrentMusic(Sound.list["music"]);
        // Sound.current.play();

        // Lessons.addStarTrophy("h1");

        // console.log(" --- Lesson.hiraganaList : --- ");
        // console.table(Lessons.hiraganaList);

        SaveManager.delete();
    }

    if (k.code == "Enter") { // Q ?
        // toMainMenu();
        TURN_NUMBER = MAX_TURN - 1;

    }

    if (k.code == "Space") {
        // debug_STOP = !debug_STOP;

        // Game1.chalkParticles({ x: 250, y: 120, offX: 10, offY: 5, dirX: 1, dirY: -1 });
        // Game1.chalkParticles({ x: 200, y: 170, offX: 10, offY: 5, dirX: -1, dirY: 1 });
        // Game1.chalkParticles({ x: 215, y: 115, offX: 10, offY: 5, dirX: 1, dirY: -1 });



        // MainMenu.particles2(50, 50);
        // console.log(" --- MainMenu.randomKanaSpriteList : --- ");
        // console.table(Particles.list);



        // console.log(" --- MainMenu.randomKanaSpriteList : --- ");
        // console.table(MainMenu.randomKanaSpriteList);

        // SaveManager.save(paramsToSave);
        // console.log(" --- Sprite.list : --- ");
        // console.table(Sprite.list);
        // console.log(" --- MainMenu.mainList : --- ");
        // console.table(MainMenu.mainList);
        // console.log(" --- MainMenu.optionsList : --- ");
        // console.table(MainMenu.optionsList);
        // console.log(" --- MainMenu.creditsList : --- ");
        // console.table(MainMenu.creditsList);
        // console.log(" --- Button.list : --- ");
        // console.table(Button.list);
        console.log(" --- Button.currentList : --- ");
        console.table(Button.currentList);
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

    const mouseX = e.layerX / SCALE_X;
    const mouseY = e.layerY / SCALE_Y;
    // console.log(mouseY);

    MOUSE_SPRITE.x = mouseX;
    if (mainState == MAIN_STATE.Lessons && Lessons.state == Lessons.STATE.Lesson) {
        MOUSE_SPRITE.y = mouseY + CANVAS_HEIGHT;
    } else {
        MOUSE_SPRITE.y = mouseY;
    }
    if (!inTransition()) {
        // pick(e.layerX, e.layerY);

        if (MainMenu.state != MainMenu.STATE.Transition && currentState != GAME_STATE.Transition) {

            Button.currentList.forEach(b => {
                if (b.getState() != Button.STATE.Inactive && !b.bMoving) {
                    if (CollisionManager.MouseCollision(mouseX, mouseY, b.getPosition().x, b.getPosition().y, b.getSize().w, b.getSize().h)) {
                        if ((b.getSprite().tl != undefined && b.getSprite().tl.currentAnimation.name != "down") || // not staticSize
                            (b.getSprite().tl == undefined && b.getSprite().currentAnimation.name != "down")) {    // staticSize

                            if (b.getState() != Button.STATE.Hover) {
                                if (b.hoverCB) {
                                    b.hoverCB.cb(b.hoverCB.arg);
                                }

                                if (b instanceof LessonBtn && b.mode == 1) {
                                    if (b.getSprite().currentAnimation.name == "normal") {
                                        b.setState(Button.STATE.Hover);
                                        b.changeSpriteAnimation("hover");
                                        MOUSE_SPRITE.changeAnimation("hover");
                                    }
                                } else {
                                    b.setState(Button.STATE.Hover);
                                    b.changeSpriteAnimation("hover");
                                    MOUSE_SPRITE.changeAnimation("hover");
                                }

                                if (b instanceof LessonBtn && b.mode != 1) {  //! ----------------------------------------------- ////////////////////////////////
                                    if (b.y == b.startPos.y) b.y -= 2;
                                    b.textOffsetX -= 1;
                                    b.textOffsetY -= 1;
                                    b.setBoxCollider(b.boxCollider.w, 22, b.boxCollider.offX, b.boxCollider.offY);

                                    b.bTextOffsetChanged = true;
                                } else if (b instanceof KanaBtn && b.bTextOffsetChanged) {
                                    b.resetOffsets();
                                }

                            }
                        }
                    } else { //? Mouse Moving and NO collision
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


                            if (b instanceof LessonBtn && b.mode == 1) {
                                if (b.getSprite().currentAnimation.name == "hover" || b.getSprite().currentAnimation.name == "down") {
                                    b.setState(Button.STATE.Normal);
                                    b.changeSpriteAnimation("normal");
                                }
                            } else {
                                b.setState(Button.STATE.Normal);
                                b.changeSpriteAnimation("normal");
                            }
                            MOUSE_SPRITE.changeAnimation("normal");

                            // Return to normal position
                            if (b instanceof LessonBtn && b.mode != 1) {  //! ----------------------------------------------- ////////////////////////////////
                                if (b.y != b.startPos.y) b.y += 2;
                                b.setBoxCollider(b.boxCollider.w, 20, b.boxCollider.offX, b.boxCollider.offY);
                            }
                            if (b.bTextOffsetChanged) b.resetOffsets();


                        }

                        if (b instanceof LessonBtn && b.mode == 1 && b.getSprite().currentAnimation.name == "clicked") {
                            if (b.hoverCB) {
                                b.getTooltip().forEach(sp => {
                                    if (sp instanceof Sprite) {
                                        sp.delete = true;
                                    } else {
                                        sp.getSprite().delete = true;
                                    }
                                })
                            }
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

    if (TRANSITION) {
        MOUSE_SPRITE.changeAnimation("normal");
    }

})

canvas.addEventListener("wheel", e => {
    Panel.currentList.forEach(p => {
        if (p.getState() != Panel.STATE.Inactive && p instanceof DropdownPanel && p.getState() == Panel.STATE.Hover) {
            if (p.list.length > 8) {
                if (e.deltaY == -100) {        //? y++
                    if (p.currentPos > 0) {
                        p.currentPos--;        //? Vers le haut de la liste
                        p.cursor.offY--;
                        p.cursorUp.offY = p.cursor.offY - 2;  //! -2 ??
                        p.cursorDown.offY = p.cursor.offY + p.cursor.scaleY;
                        if (p.currentPos == 0) {
                            p.cursor.y = p.cursorStartPos;
                        }
                    }
                } else if (e.deltaY == 100) {  //? y--
                    if (p.currentPos < p.list.length - 8) {
                        p.currentPos++;
                        p.cursor.offY++;
                        p.cursorUp.offY = p.cursor.offY - 2;
                        p.cursorDown.offY = p.cursor.offY + p.cursor.scaleY;
                        if (p.currentPos == p.list.length - 8) {
                            p.cursor.y = p.limit - p.cursor.scaleY - 2; //! -2 ??
                        }
                    }
                }
            }
        }
    });

});

canvas.addEventListener("mousedown", e => {

    if (!TRANSITION && e.button == 0) { // Left click !

        const mouseX = e.layerX / SCALE_X;
        const mouseY = e.layerY / SCALE_Y;

        if (MainMenu.state != MainMenu.STATE.Transition && currentState != GAME_STATE.Transition) {
            Button.currentList.every(b => {
                if (b.getState() != Button.STATE.Inactive && b.getState() != LessonBtn.STATE.Close) {

                    if (b.getState() == Button.STATE.Hover) {

                        if (b instanceof LessonBtn && b.mode == 1 && b.getSprite().currentAnimation.name == "clicked") {
                            return false;
                        }
                        b.changeSpriteAnimation("down");

                        if (b instanceof LessonBtn && b.mode != 1) {   //! ----------------------------------------------- ////////////////////////////////
                            b.textOffsetX += 1;
                            b.textOffsetY += 1;
                            bTextOffsetChanged = true;
                        }

                        if (b.id == 4) { // MainMenu
                            b.textOffsetX += 2;
                            b.textOffsetY += 2;
                            b.bTextOffsetChanged = true;
                        } else if (b.id == 41) {
                            b.textOffsetX += 1;
                            b.textOffsetY += 1;
                            b.bTextOffsetChanged = true;
                        } else if (b instanceof KanaBtn && !b.bTextOffsetChanged) {
                            b.textOffsetX = b.textOffsetXDown;
                            b.textOffsetY = b.textOffsetYDown;
                            b.bTextOffsetChanged = true;
                        }

                        MOUSE_SPRITE.changeAnimation("down");
                        return false;
                    }
                }
                return true;
            });
        }
    }
})

canvas.onclick = e => {

    if (!TRANSITION && e.button == 0) { // Left click !

        const mouseX = e.layerX / SCALE_X;
        const mouseY = e.layerY / SCALE_Y;

        if (MainMenu.state != MainMenu.STATE.Transition && currentState != GAME_STATE.Transition) {

            Button.currentList.every(b => {


                if (b.getState() != Button.STATE.Inactive && b.getState() != LessonBtn.STATE.Close && !b.bMoving) {
                    if (b.getState() == Button.STATE.Hover) {

                        if ((b.getSprite().class == 9 && b.getSprite().tl.currentAnimation.name != "down")
                            || (b.getSprite().class != 9 && b.getSprite().currentAnimation.name != "down")
                        ) {
                            return false;
                        }


                        if (b.getHoverOffset()) {
                            let func = translate.bind(b, { x: b.getHoverOffset().x, y: b.getHoverOffset().y }, true);
                            func();
                        }
                        if (b instanceof LessonBtn && b.mode != 1) {   //! ----------------------------------------------- ////////////////////////////////
                            if (b.y != b.startPos.y) b.y += 2;
                            b.textOffsetX += 1;
                            b.textOffsetY += 1;
                            bTextOffsetChanged = true;
                        }

                        if (b.bTextOffsetChanged) b.resetOffsets();
                        if (b instanceof LessonBtn && b.mode == 1 && b.getSprite().currentAnimation.name != "down") {
                            return false;
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

            if (!inTransition()) {

                Button.currentList.every(b => {
                    if (b.getState() != Button.STATE.Inactive && b.getState() != LessonBtn.STATE.Close && !b.bMoving) {
                        if (CollisionManager.MouseCollision(mouseX, mouseY, b.x, b.y, b.getSize().w, b.getSize().h)) {
                            if (b.hoverCB && b.getState() != Button.STATE.Hover) {
                                b.hoverCB.cb(b.hoverCB.arg);
                            }
                            if (b.bTextOffsetChanged) b.resetOffsets();
                            if (b instanceof LessonBtn && b.mode == 1 && b.getSprite().currentAnimation.name == "clicked") {

                            } else {

                                b.setState(Button.STATE.Hover);
                                b.changeSpriteAnimation("hover");
                                MOUSE_SPRITE.changeAnimation("hover");
                            }
                            return false;
                        } else {
                            if (b.getState() == Button.STATE.Hover) {
                                if (b.bTextOffsetChanged) b.resetOffsets();
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
    if (TRANSITION) {
        MOUSE_SPRITE.changeAnimation("normal");
    }
}

/**
 *
 * FIN GESTION MENU MOUSE
 *
 */