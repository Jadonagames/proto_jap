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
        this.height = pSize.h;

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
        this.timerCB = null
        this.fadingTimer = null;


        this.textOverflow = false;
        this.type = pType;
        this.staticSize = pStaticSize;

        this.id = pId;


        // Size fixe w/h : 1, 2, 3, 4, 5 etc..
        // 1 correspond à un bloc, 2 à deux etc.
        // le width ou height du bloc a une taille fixe selon le sprite bien sûr

        if (Array.isArray(this.id)) { // this.id = [-1, { tlr: 123, blr: 456, clr: 789 }, { hw: 11, hh: 9, vw: 9, vh: 11 }]

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
                tl: new Sprite({ w: size.corner.w, h: size.corner.h }, 0, 0, this, this.type),                                                           // 9x9
                tr: new Sprite({ w: size.corner.w, h: size.corner.h }, 0 + this.internWidth + size.corner.w, 0, this, this.type),                                        // 9x9
                bl: new Sprite({ w: size.corner.w, h: size.corner.h }, 0, 0 + this.internHeight + size.corner.h, this, this.type),                                       // 9x9
                br: new Sprite({ w: size.corner.w, h: size.corner.h }, 0 + this.internWidth + size.corner.w, 0 + this.internHeight + size.corner.h, this, this.type),                    // 9x9
                t: t,
                r: r,
                b: b,
                l: l,
                c: new Sprite({ w: 1, h: 1 }, 0 + size.corner.w, 0 + size.corner.h, this, this.type, { x: this.internWidth, y: this.internHeight }),
                class: 9,
                parent: this,
                delete: false
            }

            this.setPanelSprites(this.id);

        } else if (!this.staticSize) {
            let size = { corner: { w: pSize.v, h: pSize.v }, t: { w: 1, h: pSize.v }, r: { w: pSize.v, h: 1 }, b: { w: 1, h: pSize.v }, l: { w: pSize.v, h: 1 }, c: { w: 1, h: 1 } };
            this.internWidth = this.width - size.corner.w;
            this.internHeight = this.height - size.corner.h;

            this.sp = {
                tl: new Sprite({ w: size.corner.w, h: size.corner.h }, 0, 0, this, this.type),                                                           // 5x5
                tr: new Sprite({ w: size.corner.w, h: size.corner.h }, 0 + this.internWidth, 0, this, this.type),                                        // 6x5
                bl: new Sprite({ w: size.corner.w, h: size.corner.h }, 0, 0 + this.internHeight, this, this.type),                                       // 5x6
                br: new Sprite({ w: size.corner.w, h: size.corner.h }, 0 + this.internWidth, 0 + this.internHeight, this, this.type),                    // 6x6
                t: new Sprite({ w: size.t.w, h: size.t.h }, 0 + size.corner.w, 0, this, this.type, { x: this.internWidth - size.corner.w, y: 1 }),     // 1x5
                r: new Sprite({ w: size.r.w, h: size.r.h }, 0 + this.internWidth, 0 + size.corner.h, this, this.type, { x: 1, y: this.internHeight - size.corner.h }), // 6x1
                b: new Sprite({ w: size.b.w, h: size.b.h }, 0 + size.corner.w, 0 + this.internHeight, this, this.type, { x: this.internWidth - size.corner.w, y: 1 }), // 1x6
                l: new Sprite({ w: size.l.w, h: size.l.h }, 0, 0 + size.corner.h, this, this.type, { x: 1, y: this.internHeight - size.corner.h }),                    // 5x1
                c: new Sprite({ w: size.c.w, h: size.c.h }, 0 + size.corner.w, 0 + size.corner.h, this, this.type, { x: this.internWidth - size.corner.w, y: this.internHeight - size.corner.h }), //
                class: 9,
                parent: this,
                delete: false
            }
            this.setPanelSprites(this.id);
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

        this.label = pLabel;
        this.textOverflow = false;
        this.wordsArr = [];
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

    setPanelSprites(pId) {

        // tlr = 748 / blr = 768 / clr  = 757 

        if (Array.isArray(pId) && pId[0] == -1) { // this.id = [-1, { tlr: 123, blr: 456, clr: 789 }, { hw: 11, hh: 9, vw: 9, vh: 11 }]

            this.getSprite().tl.addAnimation("normal", { x: 380, y: pId[1].tlr });
            this.getSprite().tl.changeAnimation("normal");

            this.getSprite().tr.addAnimation("normal", { x: 400, y: pId[1].tlr });
            this.getSprite().tr.changeAnimation("normal");

            this.getSprite().bl.addAnimation("normal", { x: 380, y: pId[1].blr });
            this.getSprite().bl.changeAnimation("normal");

            this.getSprite().br.addAnimation("normal", { x: 400, y: pId[1].blr });
            this.getSprite().br.changeAnimation("normal");

            this.getSprite().t.forEach(top => {
                top.addAnimation("normal", { x: 389, y: pId[1].tlr });
                top.changeAnimation("normal");
            });
            this.getSprite().b.forEach(bottom => {
                bottom.addAnimation("normal", { x: 389, y: pId[1].blr });
                bottom.changeAnimation("normal");
            });
            this.getSprite().r.forEach(right => {
                right.addAnimation("normal", { x: 400, y: pId[1].clr });
                right.changeAnimation("normal");
            });
            this.getSprite().l.forEach(left => {
                left.addAnimation("normal", { x: 380, y: pId[1].clr });
                left.changeAnimation("normal");
            });

            this.getSprite().c.addAnimation("normal", { x: 388, y: pId[1].clr });
            this.getSprite().c.changeAnimation("normal");
        }

        if (Array.isArray(pId) && pId[0] == 1) {

            let X_ltb = 522;
            let X_ctb = 538;
            let X_rtb = 548;
            let Y_clr = 764;
            let Y_blr = 774;
            let Y_tlr = 748;

            this.getSprite().tl.addAnimation("normal", { x: X_ltb, y: Y_tlr });
            this.getSprite().tl.changeAnimation("normal");

            this.getSprite().tr.addAnimation("normal", { x: X_rtb, y: Y_tlr });
            this.getSprite().tr.changeAnimation("normal");

            this.getSprite().bl.addAnimation("normal", { x: X_ltb, y: Y_blr });
            this.getSprite().bl.changeAnimation("normal");

            this.getSprite().br.addAnimation("normal", { x: X_rtb, y: Y_blr });
            this.getSprite().br.changeAnimation("normal");

            this.getSprite().t.forEach(top => {
                top.addAnimation("normal", { x: X_ctb, y: Y_tlr });
                top.changeAnimation("normal");
            });
            this.getSprite().b.forEach(bottom => {
                bottom.addAnimation("normal", { x: X_ctb, y: Y_blr });
                bottom.changeAnimation("normal");
            });
            this.getSprite().r.forEach(right => {
                right.addAnimation("normal", { x: X_rtb, y: Y_clr });
                right.changeAnimation("normal");
            });
            this.getSprite().l.forEach(left => {
                left.addAnimation("normal", { x: X_ltb, y: Y_clr });
                left.changeAnimation("normal");
            });

            this.getSprite().c.addAnimation("normal", { x: X_ctb, y: Y_clr });
            this.getSprite().c.changeAnimation("normal");
        }

        if (pId == 0) {
            this.getSprite().tl.addAnimation("normal", { x: 0, y: 48 });
            this.getSprite().tl.changeAnimation("normal");

            this.getSprite().tr.addAnimation("normal", { x: 5, y: 48 });
            this.getSprite().tr.changeAnimation("normal");

            this.getSprite().bl.addAnimation("normal", { x: 0, y: 53 });
            this.getSprite().bl.changeAnimation("normal");

            this.getSprite().br.addAnimation("normal", { x: 5, y: 53 });
            this.getSprite().br.changeAnimation("normal");

            this.getSprite().t.addAnimation("normal", { x: 4, y: 48 });
            this.getSprite().t.changeAnimation("normal");

            this.getSprite().r.addAnimation("normal", { x: 5, y: 52 });
            this.getSprite().r.changeAnimation("normal");

            this.getSprite().b.addAnimation("normal", { x: 4, y: 53 });
            this.getSprite().b.changeAnimation("normal");

            this.getSprite().l.addAnimation("normal", { x: 0, y: 52 });
            this.getSprite().l.changeAnimation("normal");

            this.getSprite().c.addAnimation("normal", { x: 4, y: 52 });
            this.getSprite().c.changeAnimation("normal");
        }

        if (pId == 1) {
            this.getSprite().tl.addAnimation("normal", { x: 0, y: 57 });
            this.getSprite().tl.changeAnimation("normal");

            this.getSprite().tr.addAnimation("normal", { x: 6, y: 57 });
            this.getSprite().tr.changeAnimation("normal");

            this.getSprite().bl.addAnimation("normal", { x: 0, y: 63 });
            this.getSprite().bl.changeAnimation("normal");

            this.getSprite().br.addAnimation("normal", { x: 6, y: 63 });
            this.getSprite().br.changeAnimation("normal");

            this.getSprite().t.addAnimation("normal", { x: 5, y: 57 });
            this.getSprite().t.changeAnimation("normal");

            this.getSprite().r.addAnimation("normal", { x: 6, y: 62 });
            this.getSprite().r.changeAnimation("normal");

            this.getSprite().b.addAnimation("normal", { x: 5, y: 63 });
            this.getSprite().b.changeAnimation("normal");

            this.getSprite().l.addAnimation("normal", { x: 0, y: 62 });
            this.getSprite().l.changeAnimation("normal");

            this.getSprite().c.addAnimation("normal", { x: 5, y: 62 });
            this.getSprite().c.changeAnimation("normal");
        }


        if (pId == 11) {
            this.getSprite().tl.addAnimation("normal", { x: 0, y: 68 });
            this.getSprite().tl.changeAnimation("normal");

            this.getSprite().tr.addAnimation("normal", { x: 7, y: 68 });
            this.getSprite().tr.changeAnimation("normal");

            this.getSprite().bl.addAnimation("normal", { x: 0, y: 75 });
            this.getSprite().bl.changeAnimation("normal");

            this.getSprite().br.addAnimation("normal", { x: 7, y: 75 });
            this.getSprite().br.changeAnimation("normal");

            this.getSprite().t.addAnimation("normal", { x: 6, y: 68 });
            this.getSprite().t.changeAnimation("normal");

            this.getSprite().r.addAnimation("normal", { x: 7, y: 74 });
            this.getSprite().r.changeAnimation("normal");

            this.getSprite().b.addAnimation("normal", { x: 6, y: 75 });
            this.getSprite().b.changeAnimation("normal");

            this.getSprite().l.addAnimation("normal", { x: 0, y: 74 });
            this.getSprite().l.changeAnimation("normal");

            this.getSprite().c.addAnimation("normal", { x: 6, y: 74 });
            this.getSprite().c.changeAnimation("normal");
        }
        if (pId == 12) {
            this.getSprite().tl.addAnimation("normal", { x: 13, y: 57 });
            this.getSprite().tl.changeAnimation("normal");

            this.getSprite().tr.addAnimation("normal", { x: 21, y: 57 });
            this.getSprite().tr.changeAnimation("normal");

            this.getSprite().bl.addAnimation("normal", { x: 13, y: 65 });
            this.getSprite().bl.changeAnimation("normal");

            this.getSprite().br.addAnimation("normal", { x: 21, y: 65 });
            this.getSprite().br.changeAnimation("normal");

            this.getSprite().t.addAnimation("normal", { x: 20, y: 57 });
            this.getSprite().t.changeAnimation("normal");

            this.getSprite().r.addAnimation("normal", { x: 21, y: 64 });
            this.getSprite().r.changeAnimation("normal");

            this.getSprite().b.addAnimation("normal", { x: 20, y: 65 });
            this.getSprite().b.changeAnimation("normal");

            this.getSprite().l.addAnimation("normal", { x: 13, y: 64 });
            this.getSprite().l.changeAnimation("normal");

            this.getSprite().c.addAnimation("normal", { x: 20, y: 64 });
            this.getSprite().c.changeAnimation("normal");
        }

        if (pId == 2) {
            this.getSprite().tl.addAnimation("normal", { x: 38, y: 1 });
            this.getSprite().tl.changeAnimation("normal");

            this.getSprite().tr.addAnimation("normal", { x: 38, y: 1 });
            this.getSprite().tr.changeAnimation("normal");

            this.getSprite().bl.addAnimation("normal", { x: 38, y: 1 });
            this.getSprite().bl.changeAnimation("normal");

            this.getSprite().br.addAnimation("normal", { x: 38, y: 1 });
            this.getSprite().br.changeAnimation("normal");

            this.getSprite().t.addAnimation("normal", { x: 38, y: 1 });
            this.getSprite().t.changeAnimation("normal");

            this.getSprite().r.addAnimation("normal", { x: 38, y: 1 });
            this.getSprite().r.changeAnimation("normal");

            this.getSprite().b.addAnimation("normal", { x: 38, y: 1 });
            this.getSprite().b.changeAnimation("normal");

            this.getSprite().l.addAnimation("normal", { x: 38, y: 1 });
            this.getSprite().l.changeAnimation("normal");

            this.getSprite().c.addAnimation("normal", { x: 38, y: 1 });
            this.getSprite().c.changeAnimation("normal");
        }

        if (pId == 3) {
            this.getSprite().tl.addAnimation("normal", { x: 456, y: 748 });
            this.getSprite().tl.addAnimation("hover", { x: 477, y: 748 });
            this.getSprite().tl.changeAnimation("normal");

            this.getSprite().tr.addAnimation("normal", { x: 467, y: 748 });
            this.getSprite().tr.addAnimation("hover", { x: 488, y: 748 });
            this.getSprite().tr.changeAnimation("normal");

            this.getSprite().bl.addAnimation("normal", { x: 456, y: 759 });
            this.getSprite().bl.addAnimation("hover", { x: 477, y: 759 });
            this.getSprite().bl.changeAnimation("normal");

            this.getSprite().br.addAnimation("normal", { x: 467, y: 759 });
            this.getSprite().br.addAnimation("hover", { x: 488, y: 759 });
            this.getSprite().br.changeAnimation("normal");

            this.getSprite().t.addAnimation("normal", { x: 466, y: 748 });
            this.getSprite().t.addAnimation("hover", { x: 487, y: 748 });
            this.getSprite().t.changeAnimation("normal");

            this.getSprite().r.addAnimation("normal", { x: 467, y: 758 });
            this.getSprite().r.addAnimation("hover", { x: 488, y: 758 });
            this.getSprite().r.changeAnimation("normal");

            this.getSprite().b.addAnimation("normal", { x: 466, y: 759 });
            this.getSprite().b.addAnimation("hover", { x: 487, y: 759 });
            this.getSprite().b.changeAnimation("normal");

            this.getSprite().l.addAnimation("normal", { x: 456, y: 758 });
            this.getSprite().l.addAnimation("hover", { x: 477, y: 758 });
            this.getSprite().l.changeAnimation("normal");

            this.getSprite().c.addAnimation("normal", { x: 466, y: 758 });
            this.getSprite().c.changeAnimation("normal");
        }

        if (pId == 4) {
            this.getSprite().tl.addAnimation("normal", { x: 456, y: 769 });
            this.getSprite().tl.changeAnimation("normal");

            this.getSprite().tr.addAnimation("normal", { x: 464, y: 769 });
            this.getSprite().tr.changeAnimation("normal");

            this.getSprite().bl.addAnimation("normal", { x: 456, y: 777 });
            this.getSprite().bl.changeAnimation("normal");

            this.getSprite().br.addAnimation("normal", { x: 464, y: 777 });
            this.getSprite().br.changeAnimation("normal");

            this.getSprite().t.addAnimation("normal", { x: 463, y: 769 });
            this.getSprite().t.changeAnimation("normal");

            this.getSprite().r.addAnimation("normal", { x: 464, y: 776 });
            this.getSprite().r.changeAnimation("normal");

            this.getSprite().b.addAnimation("normal", { x: 463, y: 777 });
            this.getSprite().b.changeAnimation("normal");

            this.getSprite().l.addAnimation("normal", { x: 456, y: 776 });
            this.getSprite().l.changeAnimation("normal");

            this.getSprite().c.addAnimation("normal", { x: 463, y: 776 });
            this.getSprite().c.changeAnimation("normal");
        }
    }

    resetPanelSprites(pId) {
        if (Array.isArray(pId) && pId[0] == -1) {

            this.getSprite().tl.resetAnimations("normal", { x: 380, y: pId[1].tlr });
            this.getSprite().tl.changeAnimation("normal");

            this.getSprite().tr.resetAnimations("normal", { x: 400, y: pId[1].tlr });
            this.getSprite().tr.changeAnimation("normal");

            this.getSprite().bl.resetAnimations("normal", { x: 380, y: pId[1].blr });
            this.getSprite().bl.changeAnimation("normal");

            this.getSprite().br.resetAnimations("normal", { x: 400, y: pId[1].blr });
            this.getSprite().br.changeAnimation("normal");

            this.getSprite().t.forEach(top => {
                top.resetAnimations("normal", { x: 389, y: pId[1].tlr });
                top.changeAnimation("normal");
            });
            this.getSprite().b.forEach(bottom => {
                bottom.resetAnimations("normal", { x: 389, y: pId[1].blr });
                bottom.changeAnimation("normal");
            });
            this.getSprite().r.forEach(right => {
                right.resetAnimations("normal", { x: 400, y: pId[1].clr });
                right.changeAnimation("normal");
            });
            this.getSprite().l.forEach(left => {
                left.resetAnimations("normal", { x: 380, y: pId[1].clr });
                left.changeAnimation("normal");
            });

            this.getSprite().c.resetAnimations("normal", { x: 388, y: pId[1].clr });
            this.getSprite().c.changeAnimation("normal");
        }
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
        this.bFading = true;
        this.fadingIncrementValue = pDirection * 0.1;
        this.timerCB = this.updateAlpha.bind(this, this.fadingIncrementValue);
        this.fadingTimer = new Timer(pSpeed, this.timerCB);
    }

    fading(dt) {
        this.fadingTimer.update(dt);
        if (this.alpha >= 1) { //TODO Find a solution pour this.alphaMax   : if this.fadingIncrementValue > or < 0 ??
            this.bFading = false;
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

            this.wordsArr = LANG[this.label].split(' ');

            if (this.wordsArr.length == 1 && this.wordsArr[0] != "" && this.bFirstUC) this.wordsArr[0] = firstUC(this.wordsArr[0]);

            let line = "";
            let lines = [];
            let tmp = "";
            this.wordsArr.forEach((word, index) => { // contenu test du tooltip 23 * 5 = 115
                index == 0 ? tmp += word : tmp = line + " " + word;

                if ((tmp.length * 5) > this.width - 10) {
                    lines.push(line);
                    line = word;
                    tmp = "";
                } else {
                    index == 0 ? line += word : line += " " + word;
                }

                if (index == this.wordsArr.length - 1) {
                    lines.push(line);
                    tmp = "";
                }
            })

            for (let i = 0; i < lines.length; i++) {
                switch (this.alignText) {
                    case this.ALIGN_TEXT.Left:
                        ctx.textAlign = "left";
                        ctx.fillText(lines[i], this.x + this.textOffsetX, this.y + this.textOffsetY);
                        break;
                    case this.ALIGN_TEXT.Center:
                        ctx.textAlign = "center";
                        if (Array.isArray(this.id)) {
                            ctx.fillText(lines[i], this.x + (this.totalWidth * 0.5), this.y + (this.textOffsetY * (i + 1)));
                        } else {
                            ctx.fillText(lines[i], this.x + (this.width * 0.5), this.y + (this.textOffsetY * (i + 1))); // +0.5 Car en centrant le texte se retrouve entre deux pixels
                        }
                        break;
                    case this.ALIGN_TEXT.Right:
                        ctx.textAlign = "right";
                        ctx.fillText(lines[i], this.x + this.width - this.textOffsetX, this.y + this.textOffsetY);
                        break;
                }
                this.textOffsetY += 13;
            }
            this.textOffsetY = this.textOffsetYOrigin;

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