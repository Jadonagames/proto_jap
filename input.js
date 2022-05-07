class Input {
    static bDownKey = false;
    static bUpKey = false;
    static bEnterKey = false;
    static bIsKeyDown = false;

    static passwordTimer = null;

    static bKeyboardClose = true;
    static bKeyboardActive = false; //? Général
    static keyboardSpriteList = [];
    static keyboardList = [];

    static LC_alphabet = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "a", "s", "d", "f", "g", "h", "j", "k", "l", "z", "x", "c", "v", "b", "n", "m"];
    static UC_alphabet = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "A", "S", "D", "F", "G", "H", "J", "K", "L", "Z", "X", "C", "V", "B", "N", "M"];
    static num = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    static bCaps = true;

    constructor() { }

    static init() {


        this.keyboardPanel = new Panel({ w: 450, h: 124, v: 6 }, 0, 300, null, "", null, "", 8);
        this.keyboardPanel.setDestination({ x: 0, y: CANVAS_HEIGHT - 124 });
        this.keyboardPanel.setCanMove(true);
        this.keyboardPanel.setMovingSpeed(0.6);
        this.keyboardPanel.setMoveCB(Input.activeKeyboardBtn.bind(this), "");
        Input.keyboardSpriteList.push(this.keyboardPanel.getSprite());

        this.keyboardSprite = new Sprite({ w: 33, h: 24 }, 10, 8, this.keyboardPanel);
        this.keyboardSprite.addAnimation("normal", { x: 931, y: 90 });
        this.keyboardSprite.addAnimation("nope", { x: 964, y: 90 }, 4, 0.4, false);
        this.keyboardSprite.setAnimationCB("nope", { cb: Input.hideCloseKeyboardMessage.bind(this), arg: "" });
        this.keyboardSprite.changeAnimation("normal");
        Input.keyboardSpriteList.push(this.keyboardSprite);

        this.keyboardInstructionPanel = new Panel({ w: 150, h: 20 }, 50, 5, this.keyboardPanel, "", null, "keyboard_instruction", 0, true);
        this.keyboardInstructionPanel.getSprite().addAnimation("normal", { x: 352, y: 208 }); //? Espace vide dans la sprite sheet
        this.keyboardInstructionPanel.getSprite().changeAnimation("normal");
        this.keyboardInstructionPanel.setFontColor("rgba(162,162,162,1)", "rgba(255,0,0,1)");
        this.keyboardInstructionPanel.setAlpha(0);
        this.keyboardInstructionPanel.setAlignText(0);
        Input.keyboardSpriteList.push(this.keyboardInstructionPanel.getSprite());

        let originX = centerX(91, 1, 1);
        let originY = CANVAS_HEIGHT - 36;
        let originDestinationX = originX;
        let originDestinationY = CANVAS_HEIGHT - 26;

        this.virtualKeyboardMessage = new Panel({ w: 91, h: 18 }, originX, originY, null, "", null, "virtual_keyboard", 0, true);
        this.virtualKeyboardMessage.getSprite().addAnimation("normal", { x: 862, y: 72 });
        this.virtualKeyboardMessage.getSprite().changeAnimation("normal");
        this.virtualKeyboardMessage.setFontColor("rgba(172,50,50,1)");
        this.virtualKeyboardMessage.setAlignText(1);
        this.virtualKeyboardMessage.setTextOverflow(true);
        this.virtualKeyboardMessage.setOffsets(5, 10);
        this.virtualKeyboardMessage.setMovingType(Panel.MOVING_TYPE.ComeAndGo);
        this.virtualKeyboardMessage.setOriginPos({ x: originX, y: originY });
        this.virtualKeyboardMessage.setOriginDestination({ x: originDestinationX, y: originDestinationY });
        this.virtualKeyboardMessage.beginMoving({ x: originDestinationX, y: originDestinationY }, 1);
        Input.keyboardSpriteList.push(this.virtualKeyboardMessage.getSprite());

        let capsBtn = new KeyboardBtn({ w: 44, h: 22 }, 200, 10, this.keyboardPanel, Input.caps, "", null, "", 0, true);
        capsBtn.setAnimations({ x: 560, y: 144 });
        Input.keyboardSpriteList.push(capsBtn.getSprite());
        Input.keyboardList.push(capsBtn);

        let delBtn = new KeyboardBtn({ w: 42, h: 22 }, 251, 10, this.keyboardPanel, { cb: Input.handleKeyboardClick, arg: -1 }, "", null, "", 0, true);
        delBtn.setAnimations({ x: 560, y: 166 });
        Input.keyboardSpriteList.push(delBtn.getSprite());
        Input.keyboardList.push(delBtn);

        let leftBtn = new KeyboardBtn({ w: 23, h: 22 }, 278, 90, this.keyboardPanel, { cb: Input.moveCursor, arg: false }, "", null, "", 0, true);
        leftBtn.setAnimations({ x: 692, y: 144 });
        Input.keyboardSpriteList.push(leftBtn.getSprite());
        Input.keyboardList.push(leftBtn);

        let rightBtn = new KeyboardBtn({ w: 23, h: 22 }, 330, 90, this.keyboardPanel, { cb: Input.moveCursor, arg: true }, "", null, "", 0, true);
        rightBtn.setAnimations({ x: 692, y: 166 });
        Input.keyboardSpriteList.push(rightBtn.getSprite());
        Input.keyboardList.push(rightBtn);

        let upBtn = new KeyboardBtn({ w: 23, h: 22 }, 304, 65, this.keyboardPanel, { cb: Input.changeFocus, arg: false }, "", null, "", 0, true);
        upBtn.setAnimations({ x: 761, y: 144 });
        Input.keyboardSpriteList.push(upBtn.getSprite());
        Input.keyboardList.push(upBtn);

        let downBtn = new KeyboardBtn({ w: 23, h: 22 }, 304, 90, this.keyboardPanel, { cb: Input.changeFocus, arg: true }, "", null, "", 0, true);
        downBtn.setAnimations({ x: 761, y: 166 });
        Input.keyboardSpriteList.push(downBtn.getSprite());
        Input.keyboardList.push(downBtn);

        let nextBtn = new KeyboardBtn({ w: 29, h: 27 }, 302, 20, this.keyboardPanel, { cb: Input.changeFocus, arg: true }, "", null, "", 0, true);
        nextBtn.setAnimations({ x: 832, y: 144 });
        Input.keyboardSpriteList.push(nextBtn.getSprite());
        Input.keyboardList.push(nextBtn);

        this.openKeyboardBtn = new Button({ w: 51, h: 8 }, centerXElement(this.keyboardPanel, 51), -8, this.keyboardPanel, Input.openKeyboard.bind(this), "", null, "", 0, true);
        this.openKeyboardBtn.setAnimations({ x: 626, y: 120 });
        Input.keyboardSpriteList.push(this.openKeyboardBtn.getSprite());
        Input.keyboardList.push(this.openKeyboardBtn);

        originX = 45;
        originY = 40;
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

            let alphabetBtn = new KeyboardBtn({ w: 23, h: 22 }, x, y, this.keyboardPanel, { cb: Input.handleKeyboardClick, arg: i }, "", null, "alpha_" + Input.LC_alphabet[i], 0, true);
            alphabetBtn.setAnimations({ x: 862, y: 92 });
            alphabetBtn.setFontColor("rgba(142,45,45,1)");
            alphabetBtn.setOffsets(-1, 13);
            alphabetBtn.setTextCase("all");
            Input.keyboardSpriteList.push(alphabetBtn.getSprite());
            Input.keyboardList.push(alphabetBtn);

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

            let numBtn = new KeyboardBtn({ w: 23, h: 22 }, x, y, this.keyboardPanel, { cb: Input.handleKeyboardClick, arg: "num_" + i }, "", null, "num_" + i, 0, true);
            numBtn.setAnimations({ x: 862, y: 92 });
            numBtn.setFontColor("rgba(142,45,45,1)");
            numBtn.setOffsets(-1, 13);
            Input.keyboardSpriteList.push(numBtn.getSprite());
            Input.keyboardList.push(numBtn);

            x -= 25;
        }

        Input.keyboardList.forEach(b => {
            b.setState(Button.STATE.Inactive);
        });
    }

    static resetKeyboardPosition() {
        Input.bKeyboardClose = true;
        this.keyboardPanel.x = this.keyboardPanel.startPos.x;
        this.keyboardPanel.y = this.keyboardPanel.startPos.y;
        this.keyboardPanel.children.forEach(c => {
            c.updatePosition();
        });

        this.keyboardList.forEach(b => {
            b.setState(Button.STATE.Inactive);
        });

        this.openKeyboardBtn.setAnimations({ x: 626, y: 120 });
        this.openKeyboardBtn.setState(Button.STATE.Normal);
        this.openKeyboardBtn.getSprite().changeAnimation("Normal");

        this.keyboardSprite.changeAnimation("normal");
        this.keyboardInstructionPanel.setAlpha(0);

    }

    //?! Handle l'insertion d'un char dans les EntryField
    static handleEntryField(pKey) {
        EntryField.currentList.every(e => {
            if (e.getState() == EntryField.STATE.Focus) {
                if (pKey === -1) { //? Remove
                    if (e.label != "" && e.sp.cursor.offX != e.cursorPosXOrigin) {

                        if (e.sp.cursor.offX == e.cursorPosXOrigin + (e.label.length * 5)) { //? Si le cursor est à la fin du label
                            e.label = e.label.slice(0, e.label.length - 1);
                            e.sp.cursor.offX -= 5;
                        } else {
                            let char = (e.sp.cursor.offX - e.cursorPosXOrigin) / 5;
                            if (char == 1) {
                                e.label = e.label.substring(1, e.label.length);
                                e.sp.cursor.offX = e.cursorPosXOrigin;
                            } else {
                                e.label = e.label.substring(0, char - 1) + e.label.substring(char, e.label.length);
                                e.sp.cursor.offX -= 5;
                            }
                        }
                        e.sp.cursor.changeAnimation("normal");
                    }
                } else { //? Add new char

                    if (e.label.length < 20) {
                        if (e.sp.cursor.offX == e.cursorPosXOrigin + (e.label.length * 5)) { //? Si le cursor est à la fin du label                    
                            e.label += pKey;
                            e.sp.cursor.offX += 5;
                        } else {
                            let char = (e.sp.cursor.offX - e.cursorPosXOrigin) / 5;
                            if (e.sp.cursor.offX == e.cursorPosXOrigin) {
                                e.label = pKey + e.label;
                                e.sp.cursor.offX += 5;
                            } else {
                                e.label = e.label.slice(0, char) + pKey + e.label.slice(char, e.label.length);
                                e.sp.cursor.offX += 5;
                            }
                        }
                    }
                    e.sp.cursor.changeAnimation("normal");
                }
                return false;
            }
            return true;
        });
    }

    //? Right/Left
    static moveCursor(pRight) {
        EntryField.currentList.forEach(e => {
            if (e.getState() == EntryField.STATE.Focus) {
                if (pRight) {
                    e.sp.cursor.offX += 5;
                    if (e.sp.cursor.offX > e.cursorPosXOrigin + (e.label.length * 5)) {
                        e.sp.cursor.offX = e.cursorPosXOrigin + (e.label.length * 5);
                    }
                } else {
                    e.sp.cursor.offX -= 5;
                    if (e.sp.cursor.offX < e.cursorPosXOrigin) {
                        e.sp.cursor.offX = e.cursorPosXOrigin;
                    }
                }
                e.sp.cursor.changeAnimation("normal");
            }
        });
    }

    //? Next, Up/Down, Tab physic key
    static changeFocus(pDown) {
        let newIndex = -1;
        let oldIndex = -1;
        EntryField.currentList.forEach((e, index) => {
            if (e.getState() == EntryField.STATE.Focus) {
                oldIndex = index
                if (pDown) {
                    if (index < EntryField.currentList.length - 1) {
                        newIndex = index + 1
                    } else {
                        newIndex = 0;
                    }
                } else {
                    if (index > 0) {
                        newIndex = index - 1;
                    } else {
                        newIndex = EntryField.currentList.length - 1;
                    }
                }
            }
        });

        if (newIndex != -1 && oldIndex != -1) {

            EntryField.currentList[newIndex].setState(EntryField.STATE.Focus);
            EntryField.currentList[newIndex].changeSpriteAnimation("focus");
            EntryField.currentList[newIndex].textOffsetX = EntryField.currentList[newIndex].textOffsetXFocus;
            EntryField.currentList[newIndex].textOffsetY = EntryField.currentList[newIndex].textOffsetYFocus;
            EntryField.currentList[newIndex].sp.cursor.changeAnimation("normal");
            EntryField.currentList[newIndex].sp.cursor.offX = EntryField.currentList[newIndex].cursorPosXOrigin + EntryField.currentList[newIndex].label.length * 5

            //! En dur
            if (EntryField.currentList[oldIndex].focusCB) {
                if (newIndex == 0) { //! Index en dur
                    Login.bTooltipIncluded = false;
                    EntryField.currentList[oldIndex].getTooltip().forEach(sp => {
                        if (sp instanceof Sprite) {
                            sp.delete = true;
                            sp.currentFrame = 0;
                        } else {
                            sp.getSprite().delete = true;
                        }
                    })
                }
            }

            if (EntryField.currentList[newIndex].focusCB) {
                EntryField.currentList[newIndex].focusCB.cb(EntryField.currentList[newIndex].focusCB.arg);
            }

            EntryField.currentList[oldIndex].setState(EntryField.STATE.Normal);
            EntryField.currentList[oldIndex].changeSpriteAnimation("normal");
            EntryField.currentList[oldIndex].sp.cursor.changeAnimation("none");
            EntryField.currentList[oldIndex].textOffsetX = EntryField.currentList[oldIndex].textOffsetXOrigin;
            EntryField.currentList[oldIndex].textOffsetY = EntryField.currentList[oldIndex].textOffsetYOrigin;
        }


    }

    static showPassword() {
        Input.passwordTimer = new Timer(2, Input.hidePassword)
        EntryField.currentList.forEach(e => {
            if (e.bPasswordField) {
                e.setPassword(false);
            }
        });
    }

    static hidePassword() {
        Input.passwordTimer = null;
        EntryField.currentList.forEach(e => {
            if (e.bPasswordField) {
                e.setPassword(true);
            }
        });
    }

    static caps() {
        Input.bCaps = !Input.bCaps;
        Input.keyboardList.forEach(b => {
            if (Input.bCaps) {
                b.setTextCase("all");
            } else {
                b.setTextCase("normal");
            }
        });
    }

    //? Mouse click on virtual keyboard keys (A-Z, 0-9, DEL)
    static handleKeyboardClick(pIndex) {
        if (pIndex == -1) { //? Del
            Input.handleEntryField(pIndex);
        } else if (typeof pIndex == "string") { //? "num_" + index
            Input.handleEntryField(pIndex.split("_")[1]);
        } else { //? Normal 
            if (Input.bCaps) {
                Input.handleEntryField(Input.UC_alphabet[pIndex]);
            } else {
                Input.handleEntryField(Input.LC_alphabet[pIndex]);
            }
        }
    }

    static openKeyboard() {
        if (!Input.bKeyboardClose) { //? Close
            this.keyboardPanel.startPos.x = this.keyboardPanel.x;
            this.keyboardPanel.startPos.y = this.keyboardPanel.y;
            this.keyboardPanel.setDestination({ x: 0, y: CANVAS_HEIGHT });
            this.keyboardPanel.setMoving(true);
            Input.bKeyboardClose = true;

            this.openKeyboardBtn.setAnimations({ x: 626, y: 120 });
            this.openKeyboardBtn.setState(Button.STATE.Inactive);
            this.openKeyboardBtn.getSprite().changeAnimation("Normal");
            Input.keyboardList.forEach(b => {
                b.setState(Button.STATE.Inactive);
            });
        } else { //? Open
            this.keyboardPanel.startPos.x = this.keyboardPanel.x;
            this.keyboardPanel.startPos.y = this.keyboardPanel.y;
            this.keyboardPanel.setDestination({ x: 0, y: CANVAS_HEIGHT - 124 });
            this.keyboardPanel.setMoving(true);
            Input.bKeyboardClose = false;

            this.openKeyboardBtn.setAnimations({ x: 626, y: 129 });
            this.openKeyboardBtn.setState(Button.STATE.Inactive);
            this.openKeyboardBtn.getSprite().changeAnimation("Normal");

            this.virtualKeyboardMessage.setAlpha(0);
            this.virtualKeyboardMessage.bMoving = false;
        }

    }

    static activeKeyboardBtn() {
        this.openKeyboardBtn.setState(Button.STATE.Normal);
        if (!Input.bKeyboardClose) {
            Input.keyboardList.forEach(b => {
                b.setState(Button.STATE.Normal);

                if (CollisionManager.MouseCollision(MOUSE_SPRITE.x, MOUSE_SPRITE.y, b.x, b.y, b.getSize().w, b.getSize().h)) {
                    b.setState(Button.STATE.Hover);
                    b.changeSpriteAnimation("hover");
                    MOUSE_SPRITE.changeAnimation("hover");
                }
            });
        } else {
            Input.resetVirtualKeyboardMessage();

            //? Dernière fermeture avant de passer au splashscreen :
            if (Login.bConnectionSucceed) {
                Input.setKeyboardActive(false);
            }
        }
    }

    static resetVirtualKeyboardMessage() {
        this.virtualKeyboardMessage.setStartPos({ x: this.virtualKeyboardMessage.originPos.x, y: this.virtualKeyboardMessage.originPos.y })
        this.virtualKeyboardMessage.resetPosition();
        this.virtualKeyboardMessage.setDirection(1);
        this.virtualKeyboardMessage.beginMoving({ x: this.virtualKeyboardMessage.originDestination.x, y: this.virtualKeyboardMessage.originDestination.y }, 1);
    }

    static setKeyboardActive(pBool = true) {
        Input.bKeyboardActive = pBool;
    }

    static hideCloseKeyboardMessage() {
        this.keyboardSprite.changeAnimation("normal");
        this.keyboardInstructionPanel.setAlpha(0);
    }

    static update(dt) {

        if (this.keyboardPanel.bMoving) {
            this.keyboardPanel.update(dt);
        }
        if (this.virtualKeyboardMessage.bMoving) {
            this.virtualKeyboardMessage.update(dt);
        }
        // this.keyboardInstructionPanel.update(dt);
        if (Input.passwordTimer != null) Input.passwordTimer.update(dt);
        Sprite.manageBeforeUpdating(Input.keyboardSpriteList, dt);
    }

}

// Key event
document.addEventListener("keydown", keyDown, false);
document.addEventListener("keyup", keyUp, false);

function keyDown(k) {

    k.preventDefault();

    if (Input.bKeyboardActive && !Input.bIsKeyDown && k.key != "Shift" && !Login.bLoading) {
        // Input.bIsKeyDown = true;

        if (!Input.bKeyboardClose) {
            Input.keyboardSprite.changeAnimation("nope");
            Input.keyboardInstructionPanel.setAlpha(1);
        } else {
            if (Input.LC_alphabet.includes(k.key) || Input.UC_alphabet.includes(k.key) || Input.num.includes(k.key)) {
                Input.handleEntryField(k.key);
            } else if (k.key == "Backspace") {
                Input.handleEntryField(-1);
            } else if (k.key.slice(0, 5) == "Arrow") {
                switch (k.key.slice(5)) {
                    case "Left":
                        Input.moveCursor(false);
                        break;
                    case "Right":
                        Input.moveCursor(true);
                        break;
                    case "Up":
                        Input.changeFocus(false);
                        Input.bIsKeyDown = true;
                        break;
                    case "Down":
                        Input.changeFocus(true);
                        Input.bIsKeyDown = true;
                        break;
                }
            } else if (k.key == "Enter") {
                if (Login.currentState == Login.STATE.Login && Login.loginSubmitBtn.getState() == Button.STATE.Normal) {
                    Login.handleSubmit();
                } else if (Login.currentState == Login.STATE.Signup && Login.submitBtn.getState() == Button.STATE.Normal) {
                    Login.handleSubmit();
                } else {
                    Input.changeFocus(true);
                    Input.bIsKeyDown = true;
                }
            } else if (k.key == "Tab") {
                if (k.shiftKey) {
                    Input.changeFocus(false);
                } else {
                    Input.changeFocus(true);
                }
                Input.bIsKeyDown = true;
            }
            /*
                ! A
                key: 'a'
                code: 'KeyQ'
                q -> KeyA
                w -> KeyZ
                z -> KeyW
                , -> KeyM
                m -> Semicolon

                ! Backspace
                key: 'Backspace'
                code: 'Backspace'

                ! Left / Right / Up / Down
                key: 'ArrowLeft' / ...
                code: 'ArrowLeft' / ...

                ! Enter / NumpadEnter
                key: 'Enter' / 'Enter'
                code: 'Enter' / 'NumpadEnter'

                ! Tab
                key: 'Tab'
                code: 'Tab'
                shiftKey : true / false
            */

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

    if (Input.bIsKeyDown) {
        Input.bIsKeyDown = false;
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


    /**
     * DEBUG
     */
    if (k.code == "KeyQ") { // => A
        if (mainState == MAIN_STATE.Login) {
            // Login.TEST();
            // Login.schoolPaperStartLeaving();
        }

        // Transition.active(5, 5, 451, 10);

        // displaySaving();
    }

    if (k.key == "$" && !Input.bKeyboardActive) {

        // const saveData = JSON.stringify(SaveManager.JADONA);
        // const saveData = JSON.stringify(SaveManager.FULL);

        // const id = USER.id
        // const name = USER.name;

        // const userData = JSON.stringify({
        //     id,
        //     name,
        //     saveData
        // });

        // fetch(`${SERVER_URL}/save`, {
        //     method: 'PUT',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Authorization': `Bearer ${USER.token}`
        //     },
        //     mode: 'cors',
        //     body: userData
        // }).then((response) => {
        //     return response.json()
        // }).then((res) => {
        //     USER.saveData = "";
        //     USER.saveData = SaveManager.SAVE_DATA;
        // }).catch((e) => { })
    }

    if (k.code == "KeyE") {
        // Sound.setCurrentMusic(Sound.list["music"]);
        // Sound.current.play();

        // Lessons.addStarTrophy("h1");

        // console.log(" --- Lesson.hiraganaList : --- ");
        // console.table(Lessons.hiraganaList);

        // SaveManager.delete();
    }

    if (k.code == "Enter") { // Q ?
        // toMainMenu();
        // TURN_NUMBER = MAX_TURN - 1;
        // Transition.startOpen();


        // Transition.init({
        //     callback: {},
        //     type: "l",
        //     pos: { x: centerX(), y: 150, r: 50, maxR: 450 },
        //     speed: 1,
        //     stopEffect: true,
        //     height: false
        // });

    }

    if (k.code == "Space") {
        // debug_STOP = !debug_STOP;

        // Game1.chalkParticles({ x: 250, y: 120, offX: 10, offY: 5, dirX: 1, dirY: -1 });
        // Game1.chalkParticles({ x: 200, y: 170, offX: 10, offY: 5, dirX: -1, dirY: 1 });
        // Game1.chalkParticles({ x: 215, y: 115, offX: 10, offY: 5, dirX: 1, dirY: -1 });

        // Lessons.displayNewLogo("h", 2);

        // Transition.init({
        //     callback: {},
        //     type: "l",
        //     pos: { x: centerX(), y: 150, r: 50, maxR: 450 },
        //     speed: 1,
        //     stopEffect: true,
        //     height: false
        // });

        // Transition.init({
        //     callback: {},
        //     type: "l",
        //     pos: { x: centerX(), y: 150, r: 300, maxR: 50 },
        //     speed: 1,
        //     stopEffect: true,
        //     height: false
        // });

        //! FERMETURE : 
        // r: 450 maxR 0

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

    if (k.code == "KeyD" && mainState != MAIN_STATE.Login) {
        bStatsDebug = !bStatsDebug;
    }


    if (k.code == "KeyC" && mainState != MAIN_STATE.Login) {
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
    if (!inTransition() && mainState != MAIN_STATE.Error) {
        // pick(e.layerX, e.layerY);

        if (MainMenu.state != MainMenu.STATE.Transition && Game1.currentState != Game1.STATE.Transition) {

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

                                if (b instanceof LessonBtn && b.mode != 1) {
                                    if (b.y == b.startPos.y) b.y -= 2; //!
                                    b.textOffsetX = b.textOffsetXHover;
                                    b.textOffsetY = b.textOffsetYHover;
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
                                        sp.currentFrame = 0;
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
                            if (b instanceof LessonBtn && b.mode != 1) {
                                if (b.y != b.startPos.y) b.y += 2; //!
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

            if (Input.bKeyboardActive && !Login.bLoading) {
                Input.keyboardList.forEach(b => {
                    if (b.getState() != Button.STATE.Inactive && !b.bMoving) {
                        if (CollisionManager.MouseCollision(mouseX, mouseY, b.getPosition().x, b.getPosition().y, b.getSize().w, b.getSize().h)) {
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
                        } else { //? Mouse Moving and NO collision
                            if (b.getState() == Button.STATE.Hover) {
                                if (b.hoverCB) {
                                    b.getTooltip().forEach(sp => {
                                        if (sp instanceof Sprite) {
                                            sp.delete = true;
                                            sp.currentFrame = 0;
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

                                if (b.bTextOffsetChanged) b.resetOffsets();

                            }
                        }
                    }
                });
            }

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

            let bCollided = false;
            EntryField.currentList.forEach(e => {
                if (e.getState() != EntryField.STATE.Inactive) {
                    if (CollisionManager.MouseCollision(mouseX, mouseY, e.x, e.y, e.getSize().w, e.getSize().h)) {
                        bCollided = true;
                        MOUSE_SPRITE.changeAnimation("entry");
                        if (e.getState() == EntryField.STATE.Normal) {
                            e.setState(EntryField.STATE.Hover);
                            e.changeSpriteAnimation("hover");
                        }

                    } else {

                        if (e.getState() == EntryField.STATE.Hover) {
                            e.setState(EntryField.STATE.Normal);
                            e.changeSpriteAnimation("normal");
                            if (MOUSE_SPRITE.currentAnimation.name == "entry") {
                                MOUSE_SPRITE.changeAnimation("normal");
                            }
                        }

                    }

                }
            });
            EntryField.currentList.forEach(e => {
                // if (!CollisionManager.MouseCollision(mouseX, mouseY, e.x, e.y, e.getSize().w, e.getSize().h)) {
                if (e.getState() == EntryField.STATE.Focus && !bCollided) {
                    if (MOUSE_SPRITE.currentAnimation.name == "entry") {
                        MOUSE_SPRITE.changeAnimation("normal");
                    }
                }
                // }

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

    if (!inTransition() && e.button == 0 && mainState != MAIN_STATE.Error) { // Left click !

        const mouseX = e.layerX / SCALE_X;
        const mouseY = e.layerY / SCALE_Y;


        let bClickedOnKeyboard = false;
        if (MainMenu.state != MainMenu.STATE.Transition && Game1.currentState != Game1.STATE.Transition) {
            Button.currentList.every(b => {
                if (b.getState() != Button.STATE.Inactive && b.getState() != LessonBtn.STATE.Close) {

                    if (b.getState() == Button.STATE.Hover) {

                        if (b instanceof KeyboardBtn) {
                            bClickedOnKeyboard = true;
                            log(b.label);
                        }
                        if (b instanceof LessonBtn && b.mode == 1 && b.getSprite().currentAnimation.name == "clicked") {
                            return false;
                        }
                        b.changeSpriteAnimation("down");

                        if (b instanceof LessonBtn && b.mode != 1) {
                            b.textOffsetX = b.textOffsetXDown;
                            b.textOffsetY = b.textOffsetYDown;
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

            if (Input.bKeyboardActive && !Login.bLoading) {
                Input.keyboardList.every(b => {
                    if (b.getState() != Button.STATE.Inactive && b.getState() != LessonBtn.STATE.Close) {
                        if (b.getState() == Button.STATE.Hover) {
                            if (b instanceof KeyboardBtn) {
                                bClickedOnKeyboard = true;
                            }

                            b.textOffsetX += 1;
                            b.textOffsetY += 1;
                            b.bTextOffsetChanged = true;

                            b.changeSpriteAnimation("down");
                            MOUSE_SPRITE.changeAnimation("down");
                            return false;
                        }
                    }
                    return true;
                });
            }

            let bClickedOnAnotherEntryField = false;
            let newIndex = -1;
            EntryField.currentList.forEach((e, index) => {
                if (e.getState() != EntryField.STATE.Inactive) {
                    if (CollisionManager.MouseCollision(mouseX, mouseY, e.x, e.y, e.getSize().w, e.getSize().h)) {
                        if (e.getState() == EntryField.STATE.Hover) {
                            bClickedOnAnotherEntryField = true;
                            e.setState(EntryField.STATE.Focus);
                            e.changeSpriteAnimation("focus");
                            e.textOffsetX = e.textOffsetXFocus;
                            e.textOffsetY = e.textOffsetYFocus;
                            if (e.focusCB) {
                                e.focusCB.cb(e.focusCB.arg);
                            }
                            newIndex = index;

                        }
                        if (e.getState() == EntryField.STATE.Hover || e.getState() == EntryField.STATE.Focus) {
                            e.sp.cursor.changeAnimation("normal");

                            if (mouseX < e.x + e.cursorPosXOrigin) {
                                e.sp.cursor.offX = e.cursorPosXOrigin;
                            }
                            else if (mouseX > e.x + e.cursorPosXOrigin + e.label.length * 5) {
                                e.sp.cursor.offX = e.cursorPosXOrigin + e.label.length * 5
                            }
                            else {
                                let char = Math.ceil((mouseX - (e.x + e.cursorPosXOrigin)) / 5);
                                e.sp.cursor.offX = e.cursorPosXOrigin + char * 5;
                            }
                        }

                    }
                }
            });

            if (bClickedOnAnotherEntryField) {

                EntryField.currentList.forEach((e, index) => {
                    if (e.getState() == EntryField.STATE.Focus
                        && !CollisionManager.MouseCollision(mouseX, mouseY, e.x, e.y, e.getSize().w, e.getSize().h)
                        && !bClickedOnKeyboard) {
                        e.setState(EntryField.STATE.Normal);
                        e.changeSpriteAnimation("normal");
                        e.sp.cursor.changeAnimation("none");
                        e.textOffsetX = e.textOffsetXOrigin;
                        e.textOffsetY = e.textOffsetYOrigin;

                        if (e.focusCB) {
                            if (newIndex == 0) { //! Index en dur
                                Login.bTooltipIncluded = false;
                                e.getTooltip().forEach(sp => {
                                    if (sp instanceof Sprite) {
                                        sp.delete = true;
                                        sp.currentFrame = 0;
                                    } else {
                                        sp.getSprite().delete = true;
                                    }
                                })
                            }
                        }
                    }
                });
            }


        }
    }
})

canvas.onclick = e => {

    if (!inTransition() && e.button == 0 && mainState != MAIN_STATE.Error) { // Left click !

        const mouseX = e.layerX / SCALE_X;
        const mouseY = e.layerY / SCALE_Y;

        if (MainMenu.state != MainMenu.STATE.Transition && Game1.currentState != Game1.STATE.Transition) {

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
                        if (b instanceof LessonBtn && b.mode != 1) {
                            if (b.y != b.startPos.y) b.y += 2; //!
                            b.textOffsetX = b.textOffsetXOrigin;
                            b.textOffsetY = b.textOffsetYOrigin;
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

            if (Input.bKeyboardActive && !Login.bLoading) {
                Input.keyboardList.every(b => {
                    if (b.getState() != Button.STATE.Inactive && !b.bMoving) {
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

                            if (b.bTextOffsetChanged) b.resetOffsets();

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
            }

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

                if (Input.bKeyboardActive && !Login.bLoading) {

                    Input.keyboardList.every(b => {
                        if (b.getState() != Button.STATE.Inactive && !b.bMoving) {
                            if (CollisionManager.MouseCollision(mouseX, mouseY, b.x, b.y, b.getSize().w, b.getSize().h)) {
                                if (b.hoverCB && b.getState() != Button.STATE.Hover) {
                                    b.hoverCB.cb(b.hoverCB.arg);
                                }
                                if (b.bTextOffsetChanged) b.resetOffsets();

                                b.setState(Button.STATE.Hover);
                                b.changeSpriteAnimation("hover");
                                MOUSE_SPRITE.changeAnimation("hover");
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