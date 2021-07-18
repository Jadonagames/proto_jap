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
}

function centerX(pWidth) {
    return (CANVAS_WIDTH / 2) - (pWidth / 2);
}

function centerY(pHeight) {
    return (CANVAS_HEIGHT / 2) - (pHeight / 2);
}

// ----------------------------------------------------
// TODO Find a place for these : 
// ----------------------------------------------------
function randomizer(pArr, pNumber) {
    let arr = [];
    for (i=0; i < pNumber; i++) {
        console.log("i: " + i);
        let rndNumber = rnd(0, pArr.length-1);
        if (!arr.includes(pArr[rndNumber])) {
            arr.push(pArr[rndNumber]);
        } else {
            i--;
        }        
    }

    return arr;
}

function test(pFrom, pTo, pNumber) {

    let rand = rnd(0, char.h.length-1)
    rndChoice = {
        h: char.h[rand],
        k: char.k[rand],
        r: char.r[rand]
    }    


    switch (pFrom) {
        case "h":
            rndArr = randomizer(char.h, pNumber);
            if (!rndArr.includes(rndChoice.h)) {
                rndArr[rnd(0, rndArr.length-1)] = rndChoice.h;
            }
            break;
        case "k":
            rndArr = randomizer(char.k, pNumber);
            if (!rndArr.includes(rndChoice.k)) {
                rndArr[rnd(0, rndArr.length-1)] = rndChoice.k;
            }
            break;
        case "r":
            rndArr = randomizer(char.r, pNumber);
            if (!rndArr.includes(rndChoice.r)) {
                rndArr[rnd(0, rndArr.length-1)] = rndChoice.r;
            }
            break;
        default:
            ;
    }
}

function checkIfValid(pChar) {
    let choiced = "";    
    switch(learn) {
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
            if(b instanceof ButtonKana) {
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