function rnd(pMin, pMax) {
    return Math.floor(Math.random() * (pMax - pMin)) + pMin;
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
            this.callback();
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
    for (i = 0; i < pNumber; i++) {
        let rndNumber = rnd(0, pArr.length - 1);
        if (!arr.includes(pArr[rndNumber])) {
            arr.push(pArr[rndNumber]);
        } else {
            i--;
        }
    }

    return arr;
}

function test(pFrom, pTo, pNumber) {

    let rand = rnd(0, char.h.length - 1)
    rndChoice = {
        h: char.h[rand],
        k: char.k[rand],
        r: char.r[rand]
    }


    switch (pFrom) {
        case "h":
            rndArr = randomizer(char.h, pNumber);
            if (!rndArr.includes(rndChoice.h)) {
                rndArr[rnd(0, rndArr.length - 1)] = rndChoice.h;
            }
            break;
        case "k":
            rndArr = randomizer(char.k, pNumber);
            if (!rndArr.includes(rndChoice.k)) {
                rndArr[rnd(0, rndArr.length - 1)] = rndChoice.k;
            }
            break;
        case "r":
            rndArr = randomizer(char.r, pNumber);
            if (!rndArr.includes(rndChoice.r)) {
                rndArr[rnd(0, rndArr.length - 1)] = rndChoice.r;
            }
            break;
        default:
            ;
    }
}

function checkIfValid(pChar) {
    let choiced = "";
    switch (learn) {
        case "h":
            choiced = rndChoice.h;
            break;
        case "k":
            choiced = rndChoice.k;
            break;
        case "r":
            choiced = rndChoice.r;
            break;
    }

    // TODO test()
    if (pChar == choiced) {
        console.log("YES !!!!!");
        test(learn, choice, charNumbers);
        let count = 0;
        Button.currentList.forEach(b => {
            if (b instanceof ButtonKana) {
                b.setChar(rndArr[count]);
                count++;
            }
        });

    } else {
        console.log("NO !!!!!");
    }
}

// ----------------------------------------------------
// ----------------------------------------------------
// ----------------------------------------------------