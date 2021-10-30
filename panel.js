class Panel {

    static list = [];
    static currentList = [];
    static STATE = Object.freeze({
        Normal: 0,
        Hover: 1,
        Inactive: 2
    });

    constructor(pSize, pX, pY, pParent, pType = "normal", pTypeState = null, pLabel = "", pId = 0, pStaticSize = false) {

        this.offX = pX;
        this.offY = pY;

        this.width = pSize.w;
        this.totalWidth = this.width;
        this.height = pSize.h;
        this.corner = pSize.v;

        this.parent = pParent;
        this.children = [];

        if (this.parent) {
            this.parent.setChild(this);
            this.x = this.parent.x + this.offX;
            this.y = this.parent.y + this.offY;
        } else {
            this.x = pX;
            this.y = pY;
        }

        this.alpha = 1;
        this.alphaMax = 1;
        this.bFading = false;
        this.fadingIncrementValue = 0.1;
        this.fadingIn = true;
        this.timerCB = null
        this.fadingTimer = null;

        this.startPos = { x: pX, y: pY };
        this.destination = { x: 0, y: 0 };
        this.direction = 1;
        this.bMoving = false;
        this.bCanMove = false;
        this.speedCount = 0;
        this.movingSpeed = 1;
        this.tweeningArrive = easeOutSin;
        this.tweeningLeave = easeInSin;
        this.arriveDir = true;
        this.leaveDir = false;

        this.type = pType;
        this.staticSize = pStaticSize;

        this.id = pId;

        if (Array.isArray(this.id)) { // this.id = [-1, { y_t: 123 }, { hw: 11, hh: 9, vw: 9, vh: 11 }]

            let size = { corner: { w: pSize.v, h: pSize.v }, hori: { w: this.id[2].hw, h: this.id[2].hh }, verti: { w: this.id[2].vw, h: this.id[2].vh } };
            this.internWidth = this.width * size.hori.w;
            this.internHeight = this.height * size.verti.h;
            this.totalWidth = (size.corner.w * 2) + this.internWidth;
            this.totalHeight = (size.corner.h * 2) + this.internHeight;
            // with = nb de blocs horizontaux
            // height = nb de blocs verticaux

            let t = []
            let b = [];
            let l = [];
            let r = [];
            for (let i = 1; i <= this.width; i++) {
                let offset = (0 + size.corner.w) + ((i - 1) * size.hori.w);
                t.push(new Sprite({ w: size.hori.w, h: size.hori.h }, offset, 0, this, this.type));
                b.push(new Sprite({ w: size.hori.w, h: size.hori.h }, offset, size.corner.h + this.internHeight, this, this.type));
            }
            for (let i = 1; i <= this.height; i++) {
                let offset = (0 + size.corner.h) + ((i - 1) * size.verti.h);
                l.push(new Sprite({ w: size.verti.w, h: size.verti.h }, 0, offset, this, this.type));
                r.push(new Sprite({ w: size.verti.w, h: size.verti.h }, size.corner.w + this.internWidth, offset, this, this.type));
            }

            this.sp = {
                tl: new Sprite({ w: size.corner.w, h: size.corner.h }, 0, 0, this, this.type),
                tr: new Sprite({ w: size.corner.w, h: size.corner.h }, 0 + this.internWidth + size.corner.w, 0, this, this.type),
                bl: new Sprite({ w: size.corner.w, h: size.corner.h }, 0, 0 + this.internHeight + size.corner.h, this, this.type),
                br: new Sprite({ w: size.corner.w, h: size.corner.h }, 0 + this.internWidth + size.corner.w, 0 + this.internHeight + size.corner.h, this, this.type),
                t: t,
                r: r,
                b: b,
                l: l,
                c: new Sprite({ w: 1, h: 1 }, 0 + size.corner.w, 0 + size.corner.h, this, this.type, { x: this.internWidth, y: this.internHeight }),
                class: 9,
                parent: this,
                delete: false
            }

            this.setPanelSprites(this.id, size.corner.w);

        } else if (!this.staticSize) {
            let size = { corner: { w: pSize.v, h: pSize.v }, t: { w: 1, h: pSize.v }, r: { w: pSize.v, h: 1 }, b: { w: 1, h: pSize.v }, l: { w: pSize.v, h: 1 }, c: { w: 1, h: 1 } };
            this.internWidth = this.width - size.corner.w;
            this.internHeight = this.height - size.corner.h;

            this.sp = {
                tl: new Sprite({ w: size.corner.w, h: size.corner.h }, 0, 0, this, this.type),
                tr: new Sprite({ w: size.corner.w, h: size.corner.h }, 0 + this.internWidth, 0, this, this.type),
                bl: new Sprite({ w: size.corner.w, h: size.corner.h }, 0, 0 + this.internHeight, this, this.type),
                br: new Sprite({ w: size.corner.w, h: size.corner.h }, 0 + this.internWidth, 0 + this.internHeight, this, this.type),
                t: new Sprite({ w: size.t.w, h: size.t.h }, 0 + size.corner.w, 0, this, this.type, { x: this.internWidth - size.corner.w, y: 1 }),
                r: new Sprite({ w: size.r.w, h: size.r.h }, 0 + this.internWidth, 0 + size.corner.h, this, this.type, { x: 1, y: this.internHeight - size.corner.h }),
                b: new Sprite({ w: size.b.w, h: size.b.h }, 0 + size.corner.w, 0 + this.internHeight, this, this.type, { x: this.internWidth - size.corner.w, y: 1 }),
                l: new Sprite({ w: size.l.w, h: size.l.h }, 0, 0 + size.corner.h, this, this.type, { x: 1, y: this.internHeight - size.corner.h }),
                c: new Sprite({ w: size.c.w, h: size.c.h }, 0 + size.corner.w, 0 + size.corner.h, this, this.type, { x: this.internWidth - size.corner.w, y: this.internHeight - size.corner.h }),
                class: 9,
                parent: this,
                delete: false
            }
            this.setPanelSprites(this.id, size.corner.w);
        } else {
            this.sp = new Sprite(pSize, 0, 0, this, this.type);
            this.sp.setClass("panel");
        }

        this.bMoving = false;

        this.hoverable = false;
        this.hoverCB = null;
        this.bChangeOnHover = false;

        this.bToDelete = false;

        this.state = Panel.STATE.Normal;
        this.font = "jpfont";
        this.fontSize = 10;
        this.fontMainColor = "rgba(0,0,0," + this.alpha + ")";
        this.fontBackgroundColor = "rgba(150,150,150," + this.alpha + ")";
        this.hoverFontMainColor = "rgba(255,255,255" + this.alpha + ")";
        this.hoverBackgroundColor = "rgba(100,100,100," + this.alpha + ")";

        this.typeState = pTypeState;

        // Dialog 関係 ---------------
        this.bDialogType = false;
        this.bDialogStarted = false;
        this.lines = [];
        this.completeLines = [];
        this.bDialogEnd = false;
        this.currentLine = 0;
        this.currentChar = 0;
        this.dialogTimer = new Timer(0.01, this.updateDialog.bind(this));
        this.childButton = null;

        if (Array.isArray(pLabel)) {
            this.labelArr = pLabel;
            this.currentPhrase = 0;
            if (this.labelArr[2]) {
                this.label = "";
            } else {
                this.label = this.labelArr[0] + this.currentPhrase;
            }
        } else {
            this.label = pLabel;
            this.handleTempWordArr();
        }
        // Dialog 関係 ---------------

        this.textOverflow = false;
        this.wordsArr = [];
        this.textLinesOffsetY = 10;
        this.bFirstUC = true;

        this.ALIGN_TEXT = Object.freeze({
            Left: 0,
            Center: 1,
            Right: 2
        });
        this.alignText = this.ALIGN_TEXT.Center;
        this.textOffsetX = 5;
        this.textOffsetY = 13;
        this.textOffsetYOrigin = this.textOffsetY;

        this.tooltip = [];

        Panel.list.push(this);
    }

    getParent() {
        return this.parent;
    }

    setChild(pNewChild) {
        this.children.push(pNewChild);
    }

    changePanelSprite(pPos, pNb, pOrigin) {
        if (pPos == "t") {
            this.getSprite().t.forEach((top, index) => {
                if (index == pNb) {
                    top.resetAnimations("normal", { x: pOrigin.x, y: pOrigin.y });
                }
            });
        } else if (pPos == "b") {
            this.getSprite().b.forEach((top, index) => {
                if (index == pNb) {
                    top.resetAnimations("normal", { x: pOrigin.x, y: pOrigin.y });
                }
            });
        } else if (pPos == "l") {
            this.getSprite().l.forEach((top, index) => {
                if (index == pNb) {
                    top.resetAnimations("normal", { x: pOrigin.x, y: pOrigin.y });
                }
            });
        } else if (pPos == "r") {
            this.getSprite().r.forEach((top, index) => {
                if (index == pNb) {
                    top.resetAnimations("normal", { x: pOrigin.x, y: pOrigin.y });
                }
            });
        }
    }

    setPanelSprites(pId, pSize = 4) {

        if (Array.isArray(pId)) {

            let x_l = 0;
            let y_t = 0;

            switch (pId[0]) {
                case -1: //? Panel (Tile) plusieurs couleurs   ---- this.id = [-1, { y_t: 123 }, { hw: 11, hh: 9, vw: 9, vh: 11 }]
                    x_l = 380;
                    y_t = pId[1].y_t;
                    break;
                case 1: //? Panel (Tile) "chooseType"
                    x_l = 522;
                    y_t = 748;
                    break;
            }

            let x_c = x_l + pSize;
            let x_r = x_c + pId[2].hw;
            let y_c = y_t + pSize;
            let y_b = y_c + pId[2].vh;

            this.sp.tl.addAnimation("normal", { x: x_l, y: y_t });
            this.sp.tl.changeAnimation("normal");

            this.sp.tr.addAnimation("normal", { x: x_r, y: y_t });
            this.sp.tr.changeAnimation("normal");

            this.sp.bl.addAnimation("normal", { x: x_l, y: y_b });
            this.sp.bl.changeAnimation("normal");

            this.sp.br.addAnimation("normal", { x: x_r, y: y_b });
            this.sp.br.changeAnimation("normal");

            this.sp.t.forEach(top => {
                top.addAnimation("normal", { x: x_c, y: y_t });
                top.changeAnimation("normal");
            });
            this.sp.b.forEach(bottom => {
                bottom.addAnimation("normal", { x: x_c, y: y_b });
                bottom.changeAnimation("normal");
            });
            this.sp.r.forEach(right => {
                right.addAnimation("normal", { x: x_r, y: y_c });
                right.changeAnimation("normal");
            });
            this.sp.l.forEach(left => {
                left.addAnimation("normal", { x: x_l, y: y_c });
                left.changeAnimation("normal");
            });

            this.sp.c.addAnimation("normal", { x: x_c, y: y_c });
            this.sp.c.changeAnimation("normal");

        } else {

            let x_l = 0;
            let y_t = 0;
            let hoverable = false;

            switch (pId) {
                case 0:
                    x_l = 0;
                    y_t = 48;
                    break;
                case 1: //? Panel original
                    x_l = 0;
                    y_t = 57;
                    break;
                case 11: //? Panel original + ombre 1px & petites améliorations
                    x_l = 0;
                    y_t = 68;
                    break;
                case 12: //? Panel original + grosse ombre 2px & petites améliorations
                    x_l = 13;
                    y_t = 57;
                    break;
                case 2: //? Panel transparent
                    x_l = 44;
                    y_t = 1;
                    break;
                case 3: //? Panel kana (one lesson screen)
                    x_l = 456;
                    y_t = 748;
                    hoverable = true;
                    break;
                case 4: //? Panel background (one lesson screen)
                    x_l = 456;
                    y_t = 769;
                    break;
                case 5: //? Panel title of panel tile id=1 "chooseType"
                    x_l = 574;
                    y_t = 748;
                    break;
                default: //? Panel original
                    x_l = 0;
                    y_t = 57;
            }

            let x_c = x_l + pSize;
            let x_r = x_c + 1;
            let y_c = y_t + pSize;
            let y_b = y_c + 1;

            this.sp.tl.addAnimation("normal", { x: x_l, y: y_t });
            this.sp.tl.changeAnimation("normal");
            this.sp.tr.addAnimation("normal", { x: x_r, y: y_t });
            this.sp.tr.changeAnimation("normal");
            this.sp.bl.addAnimation("normal", { x: x_l, y: y_b });
            this.sp.bl.changeAnimation("normal");
            this.sp.br.addAnimation("normal", { x: x_r, y: y_b });
            this.sp.br.changeAnimation("normal");
            this.sp.t.addAnimation("normal", { x: x_c, y: y_t });
            this.sp.t.changeAnimation("normal");
            this.sp.b.addAnimation("normal", { x: x_c, y: y_b });
            this.sp.b.changeAnimation("normal");
            this.sp.r.addAnimation("normal", { x: x_r, y: y_c });
            this.sp.r.changeAnimation("normal");
            this.sp.l.addAnimation("normal", { x: x_l, y: y_c });
            this.sp.l.changeAnimation("normal");
            this.sp.c.addAnimation("normal", { x: x_c, y: y_c });
            this.sp.c.changeAnimation("normal");

            if (hoverable) {
                x_l += (pSize * 2) + 1;
                x_c = x_l + pSize;
                x_r = x_c + 1;
                this.sp.tl.addAnimation("hover", { x: x_l, y: y_t });
                this.sp.tr.addAnimation("hover", { x: x_r, y: y_t });
                this.sp.bl.addAnimation("hover", { x: x_l, y: y_b });
                this.sp.br.addAnimation("hover", { x: x_r, y: y_b });
                this.sp.t.addAnimation("hover", { x: x_c, y: y_t });
                this.sp.b.addAnimation("hover", { x: x_c, y: y_b });
                this.sp.r.addAnimation("hover", { x: x_r, y: y_c });
                this.sp.l.addAnimation("hover", { x: x_l, y: y_c });
                this.sp.c.addAnimation("hover", { x: x_c, y: y_c });
            }

        }

    }

    resetPanelSprites(pOffsetColor) { // For changing color of panel (id=-1 only)

        let x_l = this.getSprite().tl.getAnimation("normal").origin.x;
        let y_t = this.id[1].y_t + pOffsetColor;
        let x_c = x_l + this.corner;
        let x_r = x_c + this.id[2].hw;
        let y_c = y_t + this.corner;
        let y_b = y_c + this.id[2].vh;

        this.getSprite().tl.resetAnimations("normal", { x: x_l, y: y_t });
        this.getSprite().tl.changeAnimation("normal");

        this.getSprite().tr.resetAnimations("normal", { x: x_r, y: y_t });
        this.getSprite().tr.changeAnimation("normal");

        this.getSprite().bl.resetAnimations("normal", { x: x_l, y: y_b });
        this.getSprite().bl.changeAnimation("normal");

        this.getSprite().br.resetAnimations("normal", { x: x_r, y: y_b });
        this.getSprite().br.changeAnimation("normal");

        this.getSprite().t.forEach(top => {
            top.resetAnimations("normal", { x: x_c, y: y_t });
            top.changeAnimation("normal");
        });
        this.getSprite().b.forEach(bottom => {
            bottom.resetAnimations("normal", { x: x_c, y: y_b });
            bottom.changeAnimation("normal");
        });
        this.getSprite().r.forEach(right => {
            right.resetAnimations("normal", { x: x_r, y: y_c });
            right.changeAnimation("normal");
        });
        this.getSprite().l.forEach(left => {
            left.resetAnimations("normal", { x: x_l, y: y_c });
            left.changeAnimation("normal");
        });

        this.getSprite().c.resetAnimations("normal", { x: x_c, y: y_c });
        this.getSprite().c.changeAnimation("normal");
    }

    static resetTypeState(pType, pTypeState) {
        Panel.currentList = Panel.list.filter(b => {
            return b.type == pType && b.typeState == pTypeState;
        });
    }

    getSprite() {
        return this.sp;
    }

    getSize() {
        return { w: this.width, h: this.height };
    }

    getTooltip() {
        return this.tooltip;
    }

    setTooltip(pTooltip) {
        this.tooltip.push(pTooltip);
    }

    setToDelete() {
        this.bToDelete = true;
    }

    removeFromList() {
        Panel.list = Panel.list.filter(p => {
            return p != this;
        });
    }

    removeFromCurrentList() {
        Panel.currentList = Panel.currentList.filter(p => {
            return p != this;
        });
    }

    getState() {
        return this.state;
    }

    setState(newState) {
        this.state = newState;
    }

    setAlignText(pAlign) {
        this.alignText = pAlign;
    }

    setOffsets(pX = 5, pY = 13) {
        this.textOffsetX = pX;
        this.textOffsetY = pY;
        this.textOffsetYOrigin = pY;
    }

    setLabel(pNewLabel) {
        this.label = pNewLabel;
    }

    setFont(pFont) {
        this.font = pFont;
    }

    setFontSize(pSize) {
        this.fontSize = pSize;
    }

    setFontColor(pBack = "rgba(100,100,100," + this.alpha + ")", pMain = "rgba(0,0,0," + this.alpha + ")", pHoverBack = "rgba(100,100,100," + this.alpha + ")", pHoverMain = "rgba(255,255,255," + this.alpha + ")") {
        this.fontMainColor = pMain;
        this.fontBackgroundColor = pBack;
        this.hoverBackgroundColor = pHoverBack;
        this.hoverFontMainColor = pHoverMain;
    }

    setTextOverflow(pBool) {
        this.textOverflow = pBool;
    }

    setHoverable(pBool) {
        this.hoverable = pBool;
    }

    setHoverCB(pCallback, pParam) {
        this.hoverCB = {
            cb: pCallback,
            arg: pParam
        }
    }

    setChangeOnHover(pBool) {
        this.bChangeOnHover = pBool;
    }

    setTextCase(pCase) {
        switch (pCase) {
            case "first":
                LANG[this.label] = firstUC(LANG[this.label]);
                break;
            case "all":
                LANG[this.label] = LANG[this.label].toUpperCase();
                break;
            case "normal":
                LANG[this.label] = LANG[this.label].toLowerCase();
                break;
        }
    }

    changeDirection() {
        if (this.arriveDir) {
            this.arriveDir = false;
            this.leaveDir = true;
        } else {
            this.arriveDir = true;
            this.leaveDir = false;
        }
    }

    // static draw() {
    //     Panel.currentList.forEach(b => {
    //         if (!b.staticSize) {
    //             for (const sp in b.getSprite()) {
    //                 b.getSprite()[sp].draw(ctx);
    //             }
    //         } else {
    //             b.getSprite().draw(ctx);
    //         }
    //         if (b.label != "") {
    //             b.drawLabel(ctx);
    //         }
    //     });
    // }

    changeSpriteAnimation(pName) {
        if (!this.staticSize) {
            for (const sp in this.getSprite()) {
                if (this.getSprite()[sp] instanceof Sprite) {
                    this.getSprite()[sp].changeAnimation(pName);
                }
            }
        } else {
            this.getSprite().changeAnimation(pName);
        }
    }

    setDestination(pDestination) {
        this.destination = {
            x: pDestination.x,
            y: pDestination.y
        };
    }

    setDirection(pDirection) {
        this.direction = pDirection;
    }

    resetPosition() {
        this.x = this.startPos.x;
        this.y = this.startPos.y;
    }

    setCanMove(pBool) {
        this.bCanMove = pBool;
    }

    setMoving(pBool) {
        if (this.bCanMove) {
            this.bMoving = pBool;
        }
    }

    setMovingSpeed(pValue) {
        this.movingSpeed = pValue;
    }

    updatePosition() {
        this.x = this.parent.x + this.offX;
        this.y = this.parent.y + this.offY;
    }

    setAlpha(pNewValue) {
        this.alpha = pNewValue;
        this.fontMainColor = this.fontMainColor.split(",");
        this.fontMainColor = this.fontMainColor[0] + "," + this.fontMainColor[1] + "," + this.fontMainColor[2] + "," + this.alpha + ")";
        this.fontBackgroundColor = this.fontBackgroundColor.split(",");
        this.fontBackgroundColor = this.fontBackgroundColor[0] + "," + this.fontBackgroundColor[1] + "," + this.fontBackgroundColor[2] + "," + this.alpha + ")";
    }

    updateAlpha(pNewValue = 0) {
        if (this.parent) {
            this.alpha = this.parent.alpha;
        } else {
            this.alpha += pNewValue;
        }
        this.fontMainColor = this.fontMainColor.split(",");
        this.fontMainColor = this.fontMainColor[0] + "," + this.fontMainColor[1] + "," + this.fontMainColor[2] + "," + this.alpha + ")";
        this.fontBackgroundColor = this.fontBackgroundColor.split(",");
        this.fontBackgroundColor = this.fontBackgroundColor[0] + "," + this.fontBackgroundColor[1] + "," + this.fontBackgroundColor[2] + "," + this.alpha + ")";
    }

    fade(pSpeed = 0.05, pDirection = 1) { // 1 or -1
        if (pDirection == -1) {
            this.fadingIn = false;
        } else {
            this.fadingIn = true;
        }

        this.bFading = true;
        this.fadingIncrementValue = pDirection * 0.1;
        this.timerCB = this.updateAlpha.bind(this, this.fadingIncrementValue);
        this.fadingTimer = new Timer(pSpeed, this.timerCB);
    }

    fading(dt) {
        this.fadingTimer.update(dt);
        if ((this.fadingIn && this.alpha >= 1)) { //TODO Find a solution pour this.alphaMax   : if this.fadingIncrementValue > or < 0 ??
            this.bFading = false;
            if (this.bDialogType && this.fadingIn) {
                this.startDialog();
            }
        } else if (!this.fadingIn && this.alpha <= 0) {
            this.alpha = 0;
            this.bFading = false;
            // this.changeDirection();
            // let tmpY = this.destination.y;
            // this.destination.y = this.startPos.y;
            // this.startPos.y = tmpY;
        }
    }

    setDialogType(pBool) {
        this.bDialogType = pBool;
        this.handleTempWordArr();
    }

    setChildBtn(pBtn, pList) {
        this.childButton = pBtn;
        this.childButtonList = pList;
    }

    update(dt) {
        if (this.bDialogType && this.bDialogStarted && !this.bDialogEnd) {
            this.dialogTimer.update(dt);
        }

        if (this.bFading) {
            this.fading(dt);
        }

        if (this.bMoving) {

            if (this.speedCount <= this.movingSpeed) {

                // this.x = easeOutSin(this.speedCount, this.startPos.x, this.destination.x - this.startPos.x, this.movingSpeed);
                // this.y = easeOutSin(this.speedCount, this.startPos.y, this.destination.y - this.startPos.y, this.movingSpeed);
                if (this.arriveDir) {
                    this.y = this.tweeningArrive(this.speedCount, this.startPos.y, this.destination.y - this.startPos.y, this.movingSpeed);
                } else {
                    this.y = this.tweeningArrive(this.speedCount, this.startPos.y, this.destination.y - this.startPos.y, this.movingSpeed);
                }

                this.speedCount += dt;

            } else {
                this.x = this.destination.x;
                this.y = this.destination.y;
                this.bMoving = false;
                log("this moving: ");
                log(this.bMoving);
                this.speedCount = 0;

                if (this.leaveDir) {
                    this.changeDirection();
                    let tmpY = this.destination.y;
                    this.destination.y = this.startPos.y;
                    this.startPos.y = tmpY;
                }
            }

            this.children.forEach(c => {
                if (c instanceof Panel || c instanceof Button) {
                    c.updatePosition();
                }
            });
        }

    }

    updateDialog() {
        // this.lines[this.currentLine] += this.completeLines[this.currentLine][this.currentChar]; //! Version 1
        this.lines[this.currentLine] = this.lines[this.currentLine].substring(0, this.currentChar) + this.completeLines[this.currentLine][this.currentChar] + this.lines[this.currentLine].substring(this.currentChar + 1, this.lines[this.currentLine].length); //! Version 2

        this.currentChar++;
        if (this.currentChar == this.completeLines[this.currentLine].length) {
            this.currentChar = 0;
            this.currentLine++;
            if (this.currentLine == this.completeLines.length) {
                this.bDialogEnd = true;
                if (this.childButton) {
                    displayPanelChildBtn(this.childButton, this.childButtonList);
                }
            }
        }
    }

    nextPhrase() {
        this.currentPhrase++;
        if (this.currentPhrase < this.labelArr[1]) {
            this.label = this.labelArr[0] + this.currentPhrase;
            log(this.label);
            this.bDialogEnd = false;
            this.completeLines = [];
            this.lines = [];
            this.handleTempWordArr();
            this.dialogTimer.reset();
            this.currentLine = 0;
            this.currentChar = 0;
            this.childButton.getSprite().delete = true;
            this.childButton.removeFromCurrentList();
        } else {
            this.currentPhrase--;
            this.changeDirection();
            let tmpY = this.destination.y;
            this.destination.y = this.startPos.y;
            this.startPos.y = tmpY;
            this.setMoving(true);
            this.fade(0.04, -1);
        }
    }

    startDialog() {
        this.label = this.labelArr[0] + this.currentPhrase;
        this.setDialogType(true);
        this.bDialogStarted = true;
    }

    handleTempWordArr() {
        if (this.label != "") {
            this.wordsArr = LANG[this.label].split(' ');

            if (this.wordsArr.length == 1 && this.wordsArr[0] != "" && this.bFirstUC) this.wordsArr[0] = firstUC(this.wordsArr[0]);

            let line = "";
            let tmp = "";
            this.wordsArr.forEach((word, index) => { // contenu test du tooltip 23 * 5 = 115
                index == 0 ? tmp += word : tmp = line + " " + word;

                if ((tmp.length * 5) > this.totalWidth - 20) {
                    this.completeLines.push(line);
                    line = word;
                    tmp = "";
                } else {
                    index == 0 ? line += word : line += " " + word;
                }

                if (index == this.wordsArr.length - 1) {
                    this.completeLines.push(line);
                    tmp = "";
                }
            })

            if (this.bDialogType) {
                for (let i = 0; i < this.completeLines.length; i++) {
                    this.lines[i] = "";
                    // For lines avec un nombre d'espace = au nb de chars dans une ligne //! Version 2
                    for (let j = 0; j < this.completeLines[i].length; j++) {
                        this.lines[i] += " ";
                    }
                }
            } else {
                this.lines = this.completeLines;
            }
        }
    }

    drawLabel(ctx) {

        ctx.font = this.fontSize + "px " + this.font;
        if (this.fontSize == 32) { // pgfont *2
            ctx.shadowOffsetY = 4;
        } else { // normal
            ctx.shadowOffsetY = 2;
        }

        if (this.parent && this.parent.bFading) {
            this.updateAlpha();
        }

        ctx.fillStyle = this.fontMainColor;
        ctx.shadowColor = this.fontBackgroundColor;

        if (this.hoverable) {
            if (this.state == Panel.STATE.Hover) {
                ctx.fillStyle = this.hoverFontMainColor;
                ctx.shadowColor = this.hoverBackgroundColor;
            }
        }

        if (!this.textOverflow) {

            if (this.bDialogType && this.bDialogStarted) {

                for (let i = 0; i < this.lines.length; i++) {
                    switch (this.alignText) {
                        case this.ALIGN_TEXT.Left:
                            ctx.textAlign = "left";
                            ctx.fillText(this.lines[i], this.x + this.textOffsetX, this.y + this.textOffsetY);
                            break;
                        case this.ALIGN_TEXT.Center:
                            ctx.textAlign = "center";
                            ctx.fillText(this.lines[i], this.x + (this.totalWidth * 0.5), this.y + this.textOffsetY);
                            break;
                        case this.ALIGN_TEXT.Right:
                            ctx.textAlign = "right";
                            ctx.fillText(this.lines[i], this.x + this.width - this.textOffsetX, this.y + this.textOffsetY);
                            break;
                    }
                    this.textOffsetY += this.textLinesOffsetY;
                }
                this.textOffsetY = this.textOffsetYOrigin;

            } else if (!this.bDialogType) {

                for (let i = 0; i < this.lines.length; i++) {
                    switch (this.alignText) {
                        case this.ALIGN_TEXT.Left:
                            ctx.textAlign = "left";
                            ctx.fillText(this.lines[i], this.x + this.textOffsetX, this.y + this.textOffsetY);
                            break;
                        case this.ALIGN_TEXT.Center:
                            ctx.textAlign = "center";
                            ctx.fillText(this.lines[i], this.x + (this.totalWidth * 0.5), this.y + this.textOffsetY);
                            break;
                        case this.ALIGN_TEXT.Right:
                            ctx.textAlign = "right";
                            ctx.fillText(this.lines[i], this.x + this.width - this.textOffsetX, this.y + this.textOffsetY);
                            break;
                    }
                    this.textOffsetY += this.textLinesOffsetY;
                }
                this.textOffsetY = this.textOffsetYOrigin;
            }

        } else {
            switch (this.alignText) {
                case this.ALIGN_TEXT.Left:
                    ctx.textAlign = "left";
                    ctx.fillText(LANG[this.label], this.x + this.textOffsetX, this.y + this.textOffsetY);
                    break;
                case this.ALIGN_TEXT.Center:
                    ctx.textAlign = "center";
                    if (Array.isArray(this.id)) {
                        ctx.fillText(LANG[this.label], this.x + (this.totalWidth * 0.5), this.y + this.textOffsetY);
                    } else {
                        ctx.fillText(LANG[this.label], this.x + (this.width * 0.5), this.y + this.textOffsetY); // +0.5 Car en centrant le texte se retrouve entre deux pixels
                    }
                    break;
                case this.ALIGN_TEXT.Right:
                    ctx.textAlign = "right";
                    ctx.fillText(LANG[this.label], this.x + this.width - this.textOffsetX, this.y + this.textOffsetY);
                    break;
            }
        }


        ctx.shadowOffsetY = 0;

        ctx.fillStyle = "rgba(0,0,0,1)";

        ctx.textAlign = "left";
    }
}