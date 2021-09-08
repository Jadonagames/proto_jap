function rnd(pMin, pMax) {
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

    }
}

function translate(pCoord, pReverse = false) {
    for (const s in this.sp) {
        if (this.sp[s] instanceof Sprite) {
            if (pReverse) {
                this.sp[s].x -= pCoord.x;
                this.sp[s].y -= pCoord.y;
            } else {
                this.sp[s].x += pCoord.x;
                this.sp[s].y += pCoord.y;
            }
        }
    }
}


// ----------------------------------------------------
// TODO Find a place for these : 
// ----------------------------------------------------
function randomizer(pArr, pNumber) {

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
            if (!arr.includes(pArr[rndNumber])) {
                arr.push(pArr[rndNumber]);
            } else {
                i--;
            }
        }
    }
    return arr;
}

function resetChoices(pRange, pLessonRange) {
    CHOICES_DONE = [];
    // ALREADY_RANDOM = -1;
    if (pRange == 1) {
        for (let i = 0; i < char.h.length; i++) {
            REMAINING_CHOICES.push(i);
        }
    } else if (pLessonRange) {

        let indexOffset = 4;
        if (pRange == "yo" || pRange == "n") indexOffset = 2;

        let index = char.r.indexOf(pRange);
        for (let i = index - indexOffset; i <= index; i++) {
            REMAINING_CHOICES.push(i);
        }



    } else {
        let index = char.r.indexOf(pRange);
        for (let i = 0; i <= index; i++) {
            REMAINING_CHOICES.push(i);
        }
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
            RND_ARR = randomizer(fromObj.h, pNumber);
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
            RND_ARR = randomizer(fromObj.k, pNumber);
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
            RND_ARR = randomizer(fromObj.r, pNumber);
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

function checkIfValid(pChar) {
    let choiced = "";
    let choiceLabel = "";

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

    if (pChar == choiced) {
        Game1.resetTimer();
        KANA_NUMBER++;
        randomlyMix(CHOICE_TYPE, CHAR_NUMBERS, RANGE, LESSON_RANGE);
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
                b.setCallbackArg(RND_ARR[count]);
                b.setLabel(b.label.slice(0, 5) + rndArr[count]);
                count++;
            }
        });

    } else {
        Game1.setMiss();
        setScreenShake(true);
    }
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

    if (pArg == "back_to_lesson") {
        Lessons.backToLesson();
    }
}

// ----------------------------------------------------
// ----------------------------------------------------
// ----------------------------------------------------

function screenShake(pCtx) {
    let dx = rnd(-5, 5);
    let dy = rnd(-5, 5);
    pCtx.translate(dx, dy);
}

function setScreenShake(pBool) {
    SCREEN_SHAKE = pBool;
    if (!pBool) {
        canvas.style.backgroundColor = canvasOriginBgColor;
    }
}