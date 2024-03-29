function rnd(pMin, pMax) { // pMax NON COMPRIS
    return Math.floor(Math.random() * (pMax - pMin)) + pMin;
}
function fixedRandom() {
    let random = -1;
    do {
        random = rnd(0, RND_ARR.length);
    } while (random == ALREADY_RANDOM);
    ALREADY_RANDOM = random;
    return random;
}

class Timer {
    constructor(pMax, pCallback) {
        this.value = 0;
        this.max = pMax;
        this.callback = pCallback;
    }

    update(pNumber) {
        this.value += pNumber;
        if (this.value >= this.max) {
            this.value = 0;
            if (this.callback.cb != null && this.callback.arg != null) {
                this.callback.cb(this.callback.arg);
            } else {
                this.callback();
            }
        }
    }

    setMax(pMax) {
        this.max = pMax;
    }

    reset() {
        this.value = 0;
    }
}

function centerX(pWidth = 0, pDistance = 0, pDirection = 0) {
    if (pDirection == 0) { // left
        return Math.floor((CANVAS_WIDTH * 0.5) - (pWidth * 0.5) - pDistance);
    } else { // right
        return Math.floor((CANVAS_WIDTH * 0.5) - (pWidth * 0.5) + pDistance);
    }
}

function centerY(pHeight = 0, pDistance = 0, pDirection = 0) {
    if (pDirection == 0) { // top
        return Math.floor((CANVAS_HEIGHT * 0.5) - (pHeight * 0.5) - pDistance);
    } else { // bottom
        return Math.floor((CANVAS_HEIGHT * 0.5) - (pHeight * 0.5) + pDistance);
    }
}

function centerXElement(pElement, pWidth = 0, pDistance = 0, pDirection = 0) {
    if (pDirection == 0) { // left
        if (pElement instanceof Panel && Array.isArray(pElement.id)) {
            return Math.floor((pElement.totalWidth * 0.5) - (pWidth * 0.5) - pDistance);
        } else {
            return Math.floor((pElement.width * 0.5) - (pWidth * 0.5) - pDistance);
        }
    } else { // right
        if (pElement instanceof Panel && Array.isArray(pElement.id)) {
            return Math.floor((pElement.totalWidth * 0.5) - (pWidth * 0.5) + pDistance);
        } else {
            return Math.floor((pElement.width * 0.5) - (pWidth * 0.5) + pDistance);
        }
    }
}

function centerYElement(pElement, pHeight = 0, pDistance = 0, pDirection = 0) {
    if (pDirection == 0) { // left
        if (pElement instanceof Panel && Array.isArray(pElement.id)) {
            return Math.floor((pElement.totalHeight * 0.5) - (pHeight * 0.5) - pDistance);
        } else {
            return Math.floor((pElement.height * 0.5) - (pHeight * 0.5) - pDistance);
        }
    } else { // right
        if (pElement instanceof Panel && Array.isArray(pElement.id)) {
            return Math.floor((pElement.totalHeight * 0.5) - (pHeight * 0.5) + pDistance);
        } else {
            return Math.floor((pElement.height * 0.5) - (pHeight * 0.5) + pDistance);
        }
    }
}

function toggleFullScreen() {
    if (FULLSCREEN) {
        FULLSCREEN = false;
        FULLSCREEN_BTN.setAnimations({x: 1344, y: 32});
        document.webkitExitFullscreen();
    } else {
        FULLSCREEN = true;
        FULLSCREEN_BTN.setAnimations({x: 1344, y: 54});
        let div = document.getElementById("canvas_container");
        div.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
    }
}

function toggleCanvasSize(pUp) {

    if (pUp) {
        if (currentScale < 7) {
            currentScale++;
        } else {
            currentScale = 1;
        }
    } else {
        if (currentScale > 1) {
            currentScale--;
        } else {
            currentScale = 7;
        }
    }

    SCALE_X = currentScale;
    SCALE_Y = currentScale;
    canvas.width = scaleList[currentScale].width;
    canvas.height = scaleList[currentScale].height;

    CANVAS_WIDTH = canvas.width / SCALE_X;
    CANVAS_HEIGHT = canvas.height / SCALE_Y;
    ctx.imageSmoothingEnabled = false;
    ctx.msImageSmoothingEnabled = false;
    ctx.webkitImageSmoothingEnabled = false;
    // ctx.mozImageSmoothingEnabled = false;
}

function toast(pContent, pPosition = "d", pColorId = 0) { //? pColor = panel's id. 0: red, 1: green
    let startPos;
    let destPos;
    if (pPosition == "d") { //? d => Down ; t => Top
        startPos = CANVAS_HEIGHT;
        destPos = CANVAS_HEIGHT -20;
    } else {
        startPos = -20;
        destPos = 0;
    }

    let testtoastPanel = new ToastPanel({ w: 450, h: 20, v: 1 }, 0, startPos, null, "mainmenu", MainMenu.STATE.Main, pContent, pColorId);
    testtoastPanel.setTextOverflow(true);
    testtoastPanel.setFontColor(BLACK_COLOR_0, WHITE_COLOR);
    testtoastPanel.setDestination({ x: 0, y: destPos });
    testtoastPanel.setCanMove(true);
    testtoastPanel.setMovingSpeed(0.2);
    testtoastPanel.setMoving(true);
    Panel.currentList.push(testtoastPanel);
    MAIN_SPRITE_LIST.push(testtoastPanel.getSprite());
}

function changeResolution(pScale) {
    currentScale = pScale;
    
    SCALE_X = currentScale;
    SCALE_Y = currentScale;
    canvas.width = scaleList[currentScale].width;
    canvas.height = scaleList[currentScale].height;

    
    if (Lessons.canvasY < 0 ) {
        Lessons.canvasY = scaleList[currentScale].canvasY;
        Lessons.translationSpeed = scaleList[currentScale].speed;
    } else {
        Lessons.translationSpeed = -scaleList[currentScale].speed;
    }

    CANVAS_WIDTH = canvas.width / SCALE_X;
    CANVAS_HEIGHT = canvas.height / SCALE_Y;
    ctx.imageSmoothingEnabled = false;
    ctx.msImageSmoothingEnabled = false;
    ctx.webkitImageSmoothingEnabled = false;
}

// First letter UpperCase
function firstUC(pString) {
    return pString[0].toUpperCase() + pString.slice(1);
}

function displayTooltip(pArgs) {
    pArgs.tooltip.forEach(sp => {
        if (sp instanceof Sprite) {
            if (sp.delete) sp.delete = false;
            sp.active = true;
        } else {
            if (sp.getSprite().delete) sp.getSprite().delete = false;
        }
    })

    switch (pArgs.list) {
        case "LanguageScreen":
            pArgs.tooltip.forEach(sp => {
                if (sp instanceof Sprite) {
                    LanguageScreen.list.push(sp);
                } else {
                    LanguageScreen.list.push(sp.getSprite());
                }
            })
            break;
        case "mainmenu.main":
            pArgs.tooltip.forEach(sp => {
                if (sp instanceof Sprite) {
                    MainMenu.mainList.push(sp);
                } else {
                    MainMenu.mainList.push(sp.getSprite());
                }
            })
            break;
        case "infos.main":
            pArgs.tooltip.forEach(sp => {
                if (sp instanceof Sprite) {
                    Infos.list.push(sp);
                } else {
                    Infos.list.push(sp.getSprite());
                }
            })
            break;
        case "infos.hiragana":
            pArgs.tooltip.forEach(sp => {
                if (sp instanceof Sprite) {
                    Infos.hiraganaList.push(sp);
                } else {
                    Infos.hiraganaList.push(sp.getSprite());
                }
            })
            break;
        case "infos.katakana":
            pArgs.tooltip.forEach(sp => {
                if (sp instanceof Sprite) {
                    Infos.katakanaList.push(sp);
                } else {
                    Infos.katakanaList.push(sp.getSprite());
                }
            })
            break;

        case "lessons.main":
            pArgs.tooltip.forEach(sp => {
                if (sp instanceof Sprite) {
                    Lessons.mainList.push(sp);
                } else {
                    Lessons.mainList.push(sp.getSprite());
                }
            })
            break;

        case "lessons.hiragana":
            pArgs.tooltip.forEach(sp => {
                if (sp instanceof Sprite) {
                    Lessons.hiraganaList.push(sp);
                } else {
                    Lessons.hiraganaList.push(sp.getSprite());
                }
            })
            break;

        case "lessons.katakana":
            pArgs.tooltip.forEach(sp => {
                if (sp instanceof Sprite) {
                    Lessons.katakanaList.push(sp);
                } else {
                    Lessons.katakanaList.push(sp.getSprite());
                }
            })
            break;
        case "lessons.lesson":
            pArgs.tooltip.forEach(sp => {
                if (sp instanceof Sprite) {
                    Lessons.lessonList.push(sp);
                } else {
                    Lessons.lessonList.push(sp.getSprite());
                }
            })
            break;
        case "lessonTutorial.main":
            pArgs.tooltip.forEach(sp => {
                if (sp instanceof Sprite) {
                    LessonTutorial.mainList.push(sp);
                } else {
                    LessonTutorial.mainList.push(sp.getSprite());
                }
            })
            break;

        case "introduction.main":
            pArgs.tooltip.forEach(sp => {
                if (sp instanceof Sprite) {
                    Introduction.mainList.push(sp);
                } else {
                    Introduction.mainList.push(sp.getSprite());
                }
            })
            break;
        case "login.signup":
            pArgs.tooltip.forEach(sp => {
                if (!Login.bTooltipIncluded) {
                    Login.bTooltipIncluded = true;
                    if (sp instanceof Sprite) {
                        Login.signupList.push(sp);
                    } else {
                        Login.signupList.push(sp.getSprite());
                        sp.resetPosition();
                        sp.beginMoving({ x: 10, y: 95 }, 0.6, true, 0, 0.05);
                    }
                }
            })
            break;
    }
}

function displayPanelChildSprite(pSprite, pList) {
    pSprite.delete = false;

    switch (pList) {
        case "introduction.main":
            Introduction.mainList.push(pSprite);
            break;
        case "lessonTutorial.main":
            LessonTutorial.mainList.push(pSprite);
            break;
    }
}

function displayPanelChildBtn(pBtn, pList) {

    pBtn.getSprite().delete = false;

    switch (pList) {
        case "mainmenu.main":
            MainMenu.mainList.push(pBtn.getSprite());
            Button.currentList.push(pBtn);
            break;
        case "lessonTutorial.main":
            LessonTutorial.mainList.push(pBtn.getSprite());
            Button.currentList.push(pBtn);
            if (CollisionManager.MouseCollision(MOUSE_SPRITE.x, MOUSE_SPRITE.y, pBtn.getPosition().x, pBtn.getPosition().y, pBtn.getSize().w, pBtn.getSize().h)) {
                pBtn.setState(Button.STATE.Hover);
                pBtn.changeSpriteAnimation("hover");
                MOUSE_SPRITE.changeAnimation("hover");
            }
            break;
        case "introduction.main":
            Introduction.mainList.push(pBtn.getSprite());
            Button.currentList.push(pBtn);
            if (CollisionManager.MouseCollision(MOUSE_SPRITE.x, MOUSE_SPRITE.y, pBtn.getPosition().x, pBtn.getPosition().y, pBtn.getSize().w, pBtn.getSize().h)) {
                pBtn.setState(Button.STATE.Hover);
                pBtn.changeSpriteAnimation("hover");
                MOUSE_SPRITE.changeAnimation("hover");
            }
            break;
    }
}

//? Check if mouse is colliding with a new popping button
function checkMouseHover(pBtn) {
    if (CollisionManager.MouseCollision(MOUSE_SPRITE.x, MOUSE_SPRITE.y, pBtn.getPosition().x, pBtn.getPosition().y, pBtn.getSize().w, pBtn.getSize().h)) {
        pBtn.setState(Button.STATE.Hover);
        pBtn.changeSpriteAnimation("hover");
        MOUSE_SPRITE.changeAnimation("hover");
    }
}

function translate(pCoord, pReverse = false) {
    for (const s in this.sp) {
        if (this.sp[s] instanceof Sprite) {
            if (pReverse) {
                if (this.parent) {
                    this.sp[s].offX -= pCoord.x;
                    this.sp[s].offY -= pCoord.y;
                } else {
                    this.sp[s].x -= pCoord.x;
                    this.sp[s].y -= pCoord.y;
                }
            } else {
                if (this.parent) {
                    this.sp[s].offX += pCoord.x;
                    this.sp[s].offY += pCoord.y;
                } else {
                    this.sp[s].x += pCoord.x;
                    this.sp[s].y += pCoord.y;
                }
            }
        }
    }
}


// t = time     should go from 0 to duration
// b = begin    value of the property being ease.
// c = change   ending value of the property - beginning value of the property
// d = duration
function linear(t, b, c, d) {
    return c * t / d + b;
}

function easeInSin(t, b, c, d) {
    return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
}

function easeOutSin(t, b, c, d) {
    return c * Math.sin(t / d * (Math.PI / 2)) + b;
}

function easeInOutSin(t, b, c, d) {
    return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b
}

function outBounce(t, b, c, d) {
    t = t / d;
    if (t < 1 / 2.75) {
        return c * (7.5625 * t * t) + b;
    } else if (t < 2 / 2.75) {
        t = t - (1.5 / 2.75);
        return c * (7.5625 * t * t + 0.75) + b;
    } else if (t < 2.5 / 2.75) {
        t = t - (2.25 / 2.75);
        return c * (7.5625 * t * t + 0.9375) + b;
    } else {
        t = t - (2.625 / 2.75);
        return c * (7.5625 * t * t + 0.984375) + b;
    }
}

function inBounce(t, b, c, d) {
    return c - outBounce(d - t, 0, c, d) + b;
}

function inOutBounce(t, b, c, d) {
    if (t < d / 2) {
        return inBounce(t * 2, 0, c, d) * 0.5 + b;
    }
    else {
        return outBounce(t * 2 - d, 0, c, d) * 0.5 + c * .5 + b;
    }
}

function outInBounce(t, b, c, d) {
    if (t < d / 2) {
        return outBounce(t * 2, b, c / 2, d);
    }
    else {
        return inBounce((t * 2) - d, b + c / 2, c / 2, d);
    }
}

function inTransition() {
    return TRANSITION || Lessons.TRANSLATION_TRANSITION || FadeEffect.bActive || Transition.bActive;
}


// ----------------------------------------------------
// TODO Find a place for these : 
// ----------------------------------------------------
function randomizer(pArr, pNumber, pGoodAnswer) {

    let arr = [];
    for (let i = 0; i < pNumber; i++) {

        let rndNumber = rnd(0, pArr.length);
        if ((pArr[rndNumber] == "di" && arr.includes("ji")) ||
            (pArr[rndNumber] == "du" && arr.includes("zu")) ||
            (pArr[rndNumber] == "ji" && arr.includes("di")) ||
            (pArr[rndNumber] == "zu" && arr.includes("du")) ||
            (pArr[rndNumber] == "ぢ" && arr.includes("じ")) ||
            (pArr[rndNumber] == "づ" && arr.includes("ず")) ||
            (pArr[rndNumber] == "じ" && arr.includes("ぢ")) ||
            (pArr[rndNumber] == "ず" && arr.includes("づ")) ||
            (pArr[rndNumber] == "ヂ" && arr.includes("ジ")) ||
            (pArr[rndNumber] == "ヅ" && arr.includes("ズ")) ||
            (pArr[rndNumber] == "ジ" && arr.includes("ヂ")) ||
            (pArr[rndNumber] == "ズ" && arr.includes("ヅ"))
        ) {
            // console.error("randomizer : IF DI/JI DU/ZU JI/DI ZU/DU");
            i--;
        } else {
            if (arr.includes(pArr[rndNumber]) || (i == ALREADY_RANDOM && pArr[rndNumber] == pGoodAnswer)) {
                i--;
            } else {
                arr.push(pArr[rndNumber]);
            }
        }
    }
    return arr;
}

function resetChoices(pRange, pLessonRange) {
    CHOICES_DONE = [];
    // ALREADY_RANDOM = -1;
    if (pRange == 1) {                        //? 
        for (let i = 0; i < char.h.length; i++) {
            REMAINING_CHOICES.push(i);
        }
        TOTAL_NUMBER = REMAINING_CHOICES.length;

    } else if (pLessonRange) {                 //? training + lesson test

        let indexOffset = 4;
        if (pRange == "yo" || pRange == "n") indexOffset = 2;

        let index = char.r.indexOf(pRange);
        for (let i = index - indexOffset; i <= index; i++) {
            REMAINING_CHOICES.push(i);
        }

        TOTAL_NUMBER = REMAINING_CHOICES.length;
    } else {                                     //? fulltest
        let index = char.r.indexOf(pRange);
        for (let i = 0; i <= index; i++) {
            REMAINING_CHOICES.push(i);
        }
        TOTAL_NUMBER = REMAINING_CHOICES.length;
    }
}

function randomlyMix(pChoiceType, pNumber, pRange, pLessonRange) { // choiceType (label des btns), number : nombre de btns

    let fromObj = {};

    if (REMAINING_CHOICES.length == 0) {
        resetChoices(pRange, pLessonRange);
        TURN_NUMBER++;
        if (TURN_NUMBER == MAX_TURN) {
            Game1.displayEndGamePanel({ bool: true });
            return;
        }
    }

    //? Création random du caractère à trouver
    if (pRange == 1) {

        let rand = REMAINING_CHOICES[rnd(0, REMAINING_CHOICES.length)];

        REMAINING_CHOICES = REMAINING_CHOICES.filter(e => e != rand);

        RND_CHOICE = { // Réponse
            h: char.h[rand],
            k: char.k[rand],
            r: char.r[rand]
        }


        // Pour la liste des choix possibles
        fromObj = { ...char };

    } else {
        let index = char.r.indexOf(pRange);
        let rand = REMAINING_CHOICES[rnd(0, REMAINING_CHOICES.length)];

        REMAINING_CHOICES = REMAINING_CHOICES.filter(e => e != rand);

        RND_CHOICE = { // Réponse
            h: char.h[rand],
            k: char.k[rand],
            r: char.r[rand]
        }

        // Pour la liste des choix possibles
        if (pLessonRange) {

            let indexOffset = 4;
            if (pRange == "yo" || pRange == "n") indexOffset = 2;

            fromObj = {
                h: char.h.slice(index - indexOffset, index + 1),
                k: char.k.slice(index - indexOffset, index + 1),
                r: char.r.slice(index - indexOffset, index + 1)
            }

            if (indexOffset == 2) {
                fromObj.h.push("い");
                fromObj.h.push("え");
                fromObj.k.push("イ");
                fromObj.k.push("エ");
                fromObj.r.push("i");
                fromObj.r.push("e");
            }

        } else {
            fromObj = {
                h: char.h.slice(0, index + 1),
                k: char.k.slice(0, index + 1),
                r: char.r.slice(0, index + 1)
            }
        }
    }

    //? Liste des choix possibles
    switch (pChoiceType) {
        case "h":
            RND_ARR = randomizer(fromObj.h, pNumber, RND_CHOICE.h);
            if (!RND_ARR.includes(RND_CHOICE.h)) { // Si le choix ne fait pas déjà partie de la liste des btns, l'ajouter à une place random
                if (RND_CHOICE.h == "ぢ" && RND_ARR.includes("じ")) {
                    // console.error("ぢ remplace じ");
                    RND_ARR[RND_ARR.indexOf("じ")] = RND_CHOICE.h;
                } else if (RND_CHOICE.h == "じ" && RND_ARR.includes("ぢ")) {
                    // console.error("じ remplace ぢ");
                    RND_ARR[RND_ARR.indexOf("ぢ")] = RND_CHOICE.h;
                } else if (RND_CHOICE.h == "ず" && RND_ARR.includes("づ")) {
                    // console.error("ず remplace づ");
                    RND_ARR[RND_ARR.indexOf("づ")] = RND_CHOICE.h;
                } else if (RND_CHOICE.h == "づ" && RND_ARR.includes("ず")) {
                    // console.error("づ remplace ず");
                    RND_ARR[RND_ARR.indexOf("ず")] = RND_CHOICE.h;
                } else {
                    RND_ARR[fixedRandom()] = RND_CHOICE.h;
                }
            }
            break;
        case "k":
            RND_ARR = randomizer(fromObj.k, pNumber, RND_CHOICE.k);
            if (!RND_ARR.includes(RND_CHOICE.k)) {
                if (RND_CHOICE.k == "ヂ" && RND_ARR.includes("ジ")) {
                    // console.error("ヂ remplace ジ");
                    RND_ARR[RND_ARR.indexOf("ジ")] = RND_CHOICE.k;
                } else if (RND_CHOICE.k == "ジ" && RND_ARR.includes("ヂ")) {
                    // console.error("ジ remplace ヂ");
                    RND_ARR[RND_ARR.indexOf("ヂ")] = RND_CHOICE.k;
                } else if (RND_CHOICE.k == "ズ" && RND_ARR.includes("ヅ")) {
                    // console.error("ズ remplace ヅ");
                    RND_ARR[RND_ARR.indexOf("ヅ")] = RND_CHOICE.k;
                } else if (RND_CHOICE.k == "ヅ" && RND_ARR.includes("ズ")) {
                    // console.error("ヅ remplace ズ");
                    RND_ARR[RND_ARR.indexOf("ズ")] = RND_CHOICE.k;
                } else {
                    RND_ARR[fixedRandom()] = RND_CHOICE.k;
                }
            }
            break;
        case "r":
            RND_ARR = randomizer(fromObj.r, pNumber, RND_CHOICE.r);
            if (!RND_ARR.includes(RND_CHOICE.r)) {
                if (RND_CHOICE.r == "di" && RND_ARR.includes("ji")) {
                    // console.error("DI remplace JI");
                    RND_ARR[RND_ARR.indexOf("ji")] = RND_CHOICE.r;
                } else if (RND_CHOICE.r == "ji" && RND_ARR.includes("di")) {
                    // console.error("JI remplace DI");
                    RND_ARR[RND_ARR.indexOf("di")] = RND_CHOICE.r;
                } else if (RND_CHOICE.r == "zu" && RND_ARR.includes("du")) {
                    // console.error("ZU remplace DU");
                    RND_ARR[RND_ARR.indexOf("du")] = RND_CHOICE.r;
                } else if (RND_CHOICE.r == "du" && RND_ARR.includes("zu")) {
                    // console.error("DU remplace DU");
                    RND_ARR[RND_ARR.indexOf("zu")] = RND_CHOICE.r;
                } else {
                    RND_ARR[fixedRandom()] = RND_CHOICE.r;
                }
            }
            break;
        default:
            ;
    }
}

function okNextChar() {
    Game1.chalkboardBrush.changeAnimation("erase");
    Game1.moe.changeAnimation("erase");
}

function checkIfValid(pChosen) {
    let choiced = "";

    switch (CHOICE_TYPE) {
        case "h":
            choiced = RND_CHOICE.h;
            break;
        case "k":
            choiced = RND_CHOICE.k;
            break;
        case "r":
            choiced = RND_CHOICE.r;
            break;
    }

    if (pChosen.char == choiced) {        //? OK VALID

        TRANSITION = true;
        Game1.moe.changeAnimation("good");
        if (Game1.timerMissedSprite != null) {
            Game1.timerMissedSprite.delete = true;
            Game1.timerMissedSprite = null;
        }

        Game1.bAlreadyMissed = false;
        Game1.timer = 5;
        Game1.timerNumber.changeAnimation("5");
        Game1.timerSprite.changeAnimation("start");

        Button.currentList.forEach(b => {
            if (b instanceof KanaBtn) {
                b.changeSpriteAnimation("normal");
                b.setState(Button.STATE.Normal);
                if (b.label.slice(5) == RND_CHOICE.r) {                        //! ATTENTION b.char.slice() est obligatoirement romaji (hira_a, kata_a, roma_a) !!
                    Game1.displayStars(b.x, b.y);
                    b.changeSpriteAnimation("correct");
                }
            }
        });
        for (let i = 0; i < RND_ARR.length; i++) {
            if (RND_ARR[i] == pChosen.char) {
                ALREADY_RANDOM = i;
            }
        }

    } else {                            //? NOT VALID
        if (!MISSED_LIST.includes(RND_CHOICE.r)) {
            MISSED_LIST.push(RND_CHOICE.r);
        }
        
        if (!Game1.bAlreadyMissed) {
            Game1.bAlreadyMissed = true;
            Game1.setMiss();
        } else {
            Sound.list["batsu"].audioPlay();
        }

        Game1.moe.changeAnimation("bad");
        Game1.batsuSprite.changeAnimation("batsu");
        Button.currentList.forEach(b => {
            if (b instanceof KanaBtn) {
                if (b.label.slice(5) == pChosen.label) {
                    b.getSprite().changeAnimation("batsu");
                    b.setState(Button.STATE.Inactive);
                }
            }
        });
        setScreenShake(true, 5, 5);
    }
}

function handleCorrectAnswer() {

    Game1.chalkboardBrush.changeAnimation("normal");
    Game1.moe.changeAnimation("idle");
    TRANSITION = false;

    let choiceLabel = "";
    KANA_NUMBER++;
    randomlyMix(CHOICE_TYPE, CHAR_NUMBERS, RANGE, LESSON_RANGE);

    if (!Game1.bEndGame) {
        Game1.timerSprite.changeAnimation("normal");
    }

    switch (ANSWER_TYPE) {
        case "h":
            choiceLabel = "hira_" + RND_CHOICE.r;
            break;
        case "k":
            choiceLabel = "kata_" + RND_CHOICE.r;
            break;
        case "r": // Quand R est BTN ! あ -> A
            if (RND_CHOICE.r == "di") RND_CHOICE.r = "ji";
            if (RND_CHOICE.r == "du") RND_CHOICE.r = "zu";
            choiceLabel = "roma_" + RND_CHOICE.r;
            break;
    }

    Panel.currentList.forEach(p => {
        if (p instanceof KanaPanel) {
            p.setLabel(choiceLabel);
        }
    });

    let rndArr = [];
    switch (CHOICE_TYPE) {
        case "h":
            choiceLabel = "hira_";
            rndArr.push(char.r[char.h.indexOf(RND_ARR[0])]);
            rndArr.push(char.r[char.h.indexOf(RND_ARR[1])]);
            rndArr.push(char.r[char.h.indexOf(RND_ARR[2])]);
            rndArr.push(char.r[char.h.indexOf(RND_ARR[3])]);
            break;
        case "k":
            choiceLabel = "kata_";
            rndArr.push(char.r[char.k.indexOf(RND_ARR[0])]);
            rndArr.push(char.r[char.k.indexOf(RND_ARR[1])]);
            rndArr.push(char.r[char.k.indexOf(RND_ARR[2])]);
            rndArr.push(char.r[char.k.indexOf(RND_ARR[3])]);
            break;
        case "r":
            choiceLabel = "roma_";
            rndArr.push(RND_ARR[0]);
            rndArr.push(RND_ARR[1]);
            rndArr.push(RND_ARR[2]);
            rndArr.push(RND_ARR[3]);
            for (let i = 0; i < 4; i++) {
                if (rndArr[i] == "di") rndArr[i] = "ji";
                if (rndArr[i] == "du") rndArr[i] = "zu";
            }
            break;
    }

    let count = 0;
    Button.currentList.forEach(b => {
        if (b instanceof KanaBtn) {
            b.setCallbackArg({ char: RND_ARR[count], label: rndArr[count] });
            let newLabel = b.label.slice(0, 5) + rndArr[count];
            b.checkShiChiTsu(newLabel);
            b.setLabel(newLabel);
            count++;
        }
    });
}

function resetGame(pArg) {
    CHAR_NUMBERS = 4;
    CHOICE_TYPE = "r";
    ANSWER_TYPE = "h";
    RANGE = 1;
    LESSON_RANGE = false;
    RND_ARR = []; // Liste des choix 
    RND_CHOICE = {}; // Le Bon choix
    REMAINING_CHOICES = [];
    CHOICES_DONE = [];
    ALREADY_RANDOM = -1;
    KANA_NUMBER = 0;
    TURN_NUMBER = -1;
    MAX_TURN = 5;

    if (Game1.timerMissedSprite != null) {
        Game1.timerMissedSprite.delete = true;
        Game1.timerMissedSprite = null;
    }

    if (pArg == "back_to_lesson") {
        Lessons.backToLesson();
        MOUSE_SPRITE.y += CANVAS_HEIGHT;
    } else if (pArg == "back_to_freemode") {
        FreeMode.backToFreeMode();
    }
}

// ----------------------------------------------------
// ----------------------------------------------------
// ----------------------------------------------------

function screenShake(pCtx, pDx = 5, pDy = 5) {
    let dx = rnd(-pDx, pDx);
    let dy = rnd(-pDy, pDy);
    pCtx.translate(dx, dy);
}

function setScreenShake(pBool, pX = 5, pY = 5, pRed = true) {
    SCREEN_SHAKE = pBool;
    SCREEN_SHAKE_X = pX;
    SCREEN_SHAKE_Y = pY;
    SCREEN_SHAKE_RED = pRed;
    if (!pBool) {
        canvas.style.backgroundColor = CANVAS_ORIGIN_COLOR;
    }
}


//!         _______    _______   _________
//!        (  ___  )  (  ____ )  \__   __/
//!        | (   ) |  | (    )|     ) (   
//!        | (___) |  | (____)|     | |   
//!        |  ___  |  |  _____)     | |   
//!        | (   ) |  | (           | |   
//!        | )   ( |  | )        ___) (___
//!        |/     \|  |/         \_______/


function API_Connection_Test() {
    fetch(`${SERVER_URL}/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'cors'
    }).then((response) => {
        return response.json()
    }).then((res) => {
        if (res == "OK") {
            LoadScreen.setConnectionStatus(true);
        }
    }).catch((e) => {
        LoadScreen.setConnectionStatus(false);
    })
}

function API_Login(pName, pPassword) {
    const name = pName;
    const password = pPassword;

    const loginData = JSON.stringify({
        name,
        password
    });

    fetch(`${SERVER_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'cors',
        body: loginData
    }).then((response) => {
        return response.json()
    }).then((res) => {
        // log(res);

        if (res.error) {
            let timeout = setTimeout(Login.displayErrorMessage, 1000, 0);
        } else {
            USER.id = res.userId
            USER.name = res.userName;
            USER.saveData = res.saveData;
            USER.token = res.token;
            SaveManager.load(USER.saveData)
            if (!shortcut_tomainmenu) {
                let timeout = setTimeout(Login.connectionSucceed.bind(Login), 2000, false);
            }
        }
    }).catch((e) => { })
}

function API_Signup(pName, pPassword) {

    //? Création
    // const name = "UserFromKanaWorld";
    // const password = "azerty";
    const name = pName;
    const password = pPassword;
    let bNameOk = false;
    let bPassOk = false;
    let authorizedChar = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "a", "s", "d", "f", "g", "h", "j", "k", "l", "z", "x", "c", "v", "b", "n", "m", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "A", "S", "D", "F", "G", "H", "J", "K", "L", "Z", "X", "C", "V", "B", "N", "M", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

    if (name.length >= 6 && name.length <= 20) {
        bNameOk = true;
        for (let i = 0; i < name.length; i++) {
            if (!authorizedChar.includes(name[i])) {
                bNameOk = false;
            }
        }
    }
    if (password.length >= 6 && password.length <= 20) {
        bPassOk = true;
        for (let i = 0; i < password.length; i++) {
            if (!authorizedChar.includes(password[i])) {
                bPassOk = false;
            }
        }
    }
    const saveData = JSON.stringify(SaveManager.BLANK_SAVE_DATA);

    const signupData = JSON.stringify({
        name,
        password,
        saveData
    });

    if (bNameOk && bPassOk) {
        fetch(`${SERVER_URL}/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            body: signupData
        }).then((response) => {
            return response.json()
        }).then((res) => {
            // log(res);
            if (res.error === "already") {
                let timeout = setTimeout(Login.displayErrorMessage, 1000, 1);
            } else if (res.error === "Ko") {
                let timeout = setTimeout(Login.displayErrorMessage, 1000, 2);
            } else {
                USER.id = res.userId
                USER.name = res.userName;
                USER.saveData = res.saveData;
                USER.token = res.token;
                SaveManager.load(USER.saveData);

                let timeout = setTimeout(Login.connectionSucceed.bind(Login), 2000, false);
            }

        }).catch((e) => { })
    }

}

function API_Save() {

}

function stopErrorMessage() {
    bAlreadyExists = false;
    bIncorrectCredentials = false;
    bEntryError = false;
}
// ウィ、ウェ、ウォ、ヴァ、ヴィ、ヴェ、ヴォ、チェ、シェ、ジェ、ティ、ディ、トゥ、ドゥ、ファ、フィ、フェ、フォ