class Sprite {

    static list = [];
    static kanaList = [];

    static debug_drawcalls = 0;

    constructor(pSize, pX = 0, pY = 0, pParent = null, pType = "normal", pScale = { x: 1, y: 1 }) {

        this.width = pSize.w;
        this.originWidth = this.width;
        this.height = pSize.h;

        this.x = pX;
        this.y = pY;

        this.offX = pX;
        this.offY = pY;

        this.parent = pParent;

        this.originalX = this.x;
        this.originalY = this.y;

        this.ox = 0;

        this.scaleX = pScale.x;
        this.scaleY = pScale.y;

        this.currentFrame = 0;
        this.currentAnimation = null;
        this.timer = new Timer(0, this.updateFrame.bind(this));

        this.active = true;

        this.bBlinking = false;
        this.blinkCount = 0;
        this.blinkMaxDuration = 0;

        this.startPos = { x: pX, y: pY };
        this.destination = { x: 0, y: 0 };
        this.direction = 1;
        this.speedCount = 0;
        this.moveSpeed = 2;

        this.alpha = 1;
        this.alphaMax = 1;
        this.bFading = false;
        this.fadingIncrementValue = 0.1;
        this.timerCB = null
        this.fadingTimer = null;


        this.class = "";
        this.type = pType;
        this.loopCount = 0;
        this.maxLoop = 0;
        this.delete = false;

        this.animations = [];


        this.isMoving = false;

        this.bTranlate = false;

        if (this.type == "normal") {
            Sprite.list.push(this);
        }

        if (this.type == "kana") {
            Sprite.kanaList.push(this);
            this.active = false;
            this.imageData = [];
            this.imageDataOrigin = [];

            this.imageDataCurrent = null;
            this.currentImageDataIndex = 0;
            this.step = 1;
            this.color = 0;

            this.stepTimer = new Timer(0, this.updateStep.bind(this));

            this.strokeNumber = 1;
            this.kanaToDelete = false;
        }
    }

    addAnimation(pName, pOrigin, pFramesNb = 1, pSpeed = 0.1, pLoop = true) {
        let animation = {
            name: pName,
            frames: pFramesNb,
            origin: pOrigin,
            speed: pSpeed,
            bLoop: pLoop,
            bEnd: false,
            maxWidth: this.width * pFramesNb,
            callback: null,
            frameCallback: null
        }
        this.animations.push(animation);
    }

    changeAnimationMaxWidth(pAnim, pNewWidth) {
        this.animations.forEach(a => {
            if (a.name == pAnim) {
                a.maxWidth = this.width * a.frames;
            }
        })
    }

    getAnimation(pName) {

        let animToReturn = {};
        this.animations.every(anim => {
            if (anim.name == pName) {
                animToReturn = anim;
                return false;
            }
            return true;
        });
        return animToReturn;
    }

    resetAnimations(pName, pOrigin) {
        this.animations.forEach(anim => {
            if (anim.name == pName) {
                anim.origin = pOrigin;
            }
        });
    }

    changeAnimation(pName) {
        this.animations.forEach(animation => {
            if (animation.name == pName) {
                this.currentAnimation = animation;
                this.currentAnimation.bEnd = false;
                this.currentFrame = 0;
            }
        });
    }

    setAnimationCB(pName, pCallback) { //? Se lance quand l'animation en question se termine (temps de la dernière frame terminé)
        this.animations.forEach(animation => {
            if (animation.name == pName) {
                animation.callback = pCallback;
            }
        });
    }

    setAnimationFrameCB(pName, pFrameCallback) { //? Se lance à l'arrivée sur cette frame
        this.animations.forEach(animation => {
            if (animation.name == pName) {
                animation.frameCallback = pFrameCallback;
            }

        });
    }

    getClass() {
        return this.class;
    }

    setClass(pClass) {
        this.class = pClass;
    }

    getSprite() {
        return this;
    }

    getParent() {
        return this.parent;
    }

    setParent(pParent) {
        this.parent = pParent;
    }

    setMoving(pBool) {
        this.isMoving = pBool;
    }

    setMoveSpeed(pNewSpeed) {
        this.moveSpeed = pNewSpeed;
    }

    setDelete() {
        this.delete = true;
    }

    setActive(pBool) {
        this.active = pBool;
    }

    setKanaToDelete() {
        this.kanaToDelete = true;
    }

    setType(pType, pMaxLoop) {
        this.type = pType;
        this.maxLoop = pMaxLoop;
    }

    setPosition(pX, pY) {
        this.x = pX;
        this.y = pY;
    }

    setSize(pWidth, pHeight) { // taille du perso !
        this.width = pWidth;
        this.height = pHeight;
    }

    setStartPos(pStart) {
        this.startPos = {
            x: pStart.x,
            y: pStart.y
        };
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

    update(dt) {
        if (this.currentAnimation != null && this.currentAnimation.frames > 1 && !this.currentAnimation.bEnd) {

            if (Array.isArray(this.currentAnimation.speed)) {
                this.timer.setMax(this.currentAnimation.speed[this.currentFrame]);
            } else {
                this.timer.setMax(this.currentAnimation.speed);
            }
            this.timer.update(dt);
            if (this.bBlinking) {
                this.blinkTimer.update(dt);
            }
        }

        if (this.type == "tm") { //? MainMenu : Boules Hira-A et Kata-A
            if (this.speedCount <= this.moveSpeed) {
                this.x = easeInOutSin(this.speedCount, this.startPos.x, this.destination.x - this.startPos.x, this.moveSpeed);
                this.y = easeInOutSin(this.speedCount, this.startPos.y, this.destination.y - this.startPos.y, this.moveSpeed);
                this.speedCount += dt;
            } else {
                this.startPos.x = this.x;
                this.startPos.y = this.y;

                if (this.direction == 1) {
                    this.setDestination({ x: this.x, y: 0 }); //! Données en dur à changer
                } else {
                    this.setDestination({ x: this.x, y: 28 }); //! Données en dur à changer
                }
                this.speedCount = 0;
                this.direction = -this.direction;
            }
        } else if (this.type == "sv" && (this.currentAnimation.name == "arrive" || this.currentAnimation.name == "down")) { //? Saving Sprite
            if (this.speedCount <= this.moveSpeed) {
                if (this.currentAnimation.name == "arrive") {
                    this.y = easeOutSin(this.speedCount, this.startPos.y, this.destination.y - this.startPos.y, this.moveSpeed);
                } else if (this.currentAnimation.name == "down") {
                    this.y = easeInSin(this.speedCount, this.startPos.y, this.destination.y - this.startPos.y, this.moveSpeed);
                }
                this.speedCount += dt;
            } else {
                if (this.currentAnimation.name == "arrive") {
                    this.changeAnimation("open");
                }
                this.setMoveSpeed(0.2);
                this.startPos.x = this.x;
                this.startPos.y = this.y;
                this.setDestination({ x: this.x, y: CANVAS_HEIGHT + 10 });
                this.speedCount = 0;
            }
        } else if (this.type == "t") { //? MainMenu : Title
            if (this.speedCount <= this.moveSpeed) {
                if (this.direction == 1) {
                    this.y = outBounce(this.speedCount, this.startPos.y, this.destination.y - this.startPos.y, this.moveSpeed);
                } else if (this.direction == -1) {
                    this.y = linear(this.speedCount, this.startPos.y, this.destination.y - this.startPos.y, this.moveSpeed);
                }
                this.speedCount += dt;
            } else {
                if (this.direction == 1) {
                    this.setDestination({ x: this.x, y: 4 });
                    this.startPos = { x: this.x, y: this.y };
                    this.speedCount = 0;
                }

                if (!MainMenu.bTitleFinish && this.direction == -1) {
                    this.y = this.destination.y;
                    MainMenu.bTitleFinish = true;
                    Panel.currentList.forEach(p => {
                        p.fade();
                    });
                    MainMenu.mainList.forEach(sp => {
                        if (sp.alpha == 0) {
                            sp.fade();
                        }
                        if (sp.type == "fl") {
                            sp.changeAnimation("open");
                        }
                    })
                    toMainMenu();
                }
                if (!MainMenu.bTitleFinish) this.direction = -this.direction;
            }
        } else if (this.type == "st") { //? Game1 : Stars
            if (this.speedCount <= this.moveSpeed) {
                this.x = easeOutSin(this.speedCount, this.startPos.x, this.destination.x - this.startPos.x, this.moveSpeed);
                this.y = easeOutSin(this.speedCount, this.startPos.y, this.destination.y - this.startPos.y, this.moveSpeed);
                this.speedCount += dt;

            } else {
                this.delete = true;
            }
        } else if (this.type == "g") { //? Game1 : Start

            if (this.speedCount <= this.moveSpeed) {
                if (this.direction == 1) {
                    this.y = easeOutSin(this.speedCount, this.startPos.y, this.destination.y - this.startPos.y, this.moveSpeed);
                } else {
                    this.y = easeOutSin(this.speedCount, this.startPos.y, this.destination.y - this.startPos.y, this.moveSpeed);
                }
                this.speedCount += dt;

            } else {
                this.startPos.x = this.x;
                this.startPos.y = this.y;
                this.setDestination({ x: this.x, y: -50 });
                this.speedCount = 0;
                this.moveSpeed = 0.5;
                if (this.direction == 1) {
                    this.direction = -1;
                } else {
                    this.delete = true;
                }
            }
        } else if (this.type == "n") { //? Lessons : "new" icon
            if (this.speedCount <= this.moveSpeed) {
                this.x = easeInOutSin(this.speedCount, this.startPos.x, this.destination.x - this.startPos.x, this.moveSpeed);
                this.y = easeInOutSin(this.speedCount, this.startPos.y, this.destination.y - this.startPos.y, this.moveSpeed);
                this.speedCount += dt;
            } else {
                this.startPos.x = this.x;
                this.startPos.y = this.y;

                if (this.direction == 1) {
                    //TODO
                    this.setDestination({ x: this.x, y: 155 }); //! Données en dur à changer
                } else {
                    //TODO
                    this.setDestination({ x: this.x, y: 165 }); //! Données en dur à changer
                }
                this.speedCount = 0;
                this.direction = -this.direction;
            }



            //TODO :
            //! "tm" et "n" font exactement la même chose : aller-retour
            //! Créer un système pour ce type de mouvement



        }

        if (this.bFading) {
            this.fading(dt);
        }

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

    updateTranslation(dt, pX, pY) {
        this.x += pX * 60 * dt;
        this.y += pY * 60 * dt;
    }

    updateFrame() {
        this.currentFrame++;

        if (this.currentAnimation.frameCallback != null) {


            this.currentAnimation.frameCallback.forEach(fc => {
                if (fc.nb == this.currentFrame) {
                    if (fc.callback.cb != null) {
                        fc.callback.cb(fc.callback.arg);
                    } else {
                        fc.callback();
                    }
                }
            });
        }

        if (this.currentFrame >= this.currentAnimation.frames) {
            if (this.currentAnimation.bLoop) {
                this.currentFrame = 0;
            } else {
                this.currentFrame--;
                this.currentAnimation.bEnd = true;
                if (this.currentAnimation.callback != null) {
                    if (this.currentAnimation.callback.cb != null && this.currentAnimation.callback.arg != null) {
                        this.currentAnimation.callback.cb(this.currentAnimation.callback.arg);
                    } else {
                        this.currentAnimation.callback();
                    }
                }
                this.loopCount++;
                if (this.type == "todelete" && this.loopCount >= this.maxLoop) {
                    this.delete = true;
                }
            }
        }
    }

    setBlink(pMaxDuration, pCount) {
        this.blinkMaxDuration = pMaxDuration;
        this.blinkCount = pCount;
        this.blinkTimer = new Timer(this.blinkMaxDuration, this.updateFrame.bind(this));
        // this.blinkTimer.
    }

    blinking() {

    }

    setAlpha(pNewValue) {
        this.alpha = pNewValue;
    }

    updateAlpha(pNewValue) {
        this.alpha += pNewValue;
    }

    setImageDataOrigin(pImageData, pMaxStep) {
        this.imageDataOrigin.push({
            imageData: pImageData,
            maxStep: pMaxStep
        })
        if (this.imageDataCurrent == null) {
            this.imageDataCurrent = {};
            this.imageDataCurrent.imageData = ctx.createImageData(this.imageDataOrigin[0].imageData);
            for (let i = 0; i < this.imageDataOrigin[0].imageData.data.length; i++) {
                this.imageDataCurrent.imageData.data[i] = this.imageDataOrigin[0].imageData.data[i];
            }
            this.imageDataCurrent.maxStep = this.imageDataOrigin[0].maxStep;
        }
    }

    updateKana(dt) {
        this.stepTimer.setMax(0.5);
        this.stepTimer.update(dt);
    }

    updateStep() {
        this.step++;
        if (this.step > this.imageDataCurrent.maxStep) {
            this.step = 1;
            this.strokeNumber++;
            this.currentImageDataIndex++;
            if (this.currentImageDataIndex < this.imageDataOrigin.length) {
                for (let i = 0; i < this.imageDataOrigin[this.currentImageDataIndex].imageData.data.length; i++) {
                    this.imageDataCurrent.imageData.data[i] = this.imageDataOrigin[this.currentImageDataIndex].imageData.data[i];
                }
                this.imageDataCurrent.maxStep = this.imageDataOrigin[this.currentImageDataIndex].maxStep;
            } else {
                this.resetKana();
            }
        }
    }

    resetKana() {
        this.strokeNumber = 1;
        this.currentImageDataIndex = 0;
        for (let i = 0; i < this.imageDataOrigin[0].imageData.data.length; i++) {
            this.imageDataCurrent.imageData.data[i] = this.imageDataOrigin[0].imageData.data[i];
        }
        this.imageDataCurrent.maxStep = this.imageDataOrigin[0].maxStep;
    }

    static manageBeforeUpdating(pList, dt) {
        pList.forEach(sp => {
            if (sp.class == 9) {
                for (const s in sp) {
                    if (sp[s] instanceof Sprite) {
                        sp[s].update(dt);
                    } else if (Array.isArray(sp[s])) {
                        sp[s].forEach(bloc => {
                            bloc.update(dt);
                        });
                    }
                }
            } else {
                sp.update(dt);
            }
        })
    }

    static manageBeforeDrawing(pList) {
        pList.forEach(sp => {
            if (sp.class == 9) {
                for (const s in sp) {
                    if (sp[s] instanceof Sprite) {
                        sp[s].draw(ctx);
                    } else if (Array.isArray(sp[s])) {
                        sp[s].forEach(bloc => {
                            bloc.draw(ctx);
                        });
                    } else if (s == "parent") {
                        if (sp[s].label != "") {
                            sp[s].drawLabel(ctx);
                        }
                    }
                }
            } else {
                if (sp.class == "button" || sp.class == "panel") { // ou if parent instanceof Button / Panel etc.
                    sp.draw(ctx);
                    if (sp.getParent() && sp.getParent().label != "" && sp.getParent().getState() != LessonBtn.STATE.Close) {
                        sp.getParent().drawLabel(ctx);
                    }
                } else {
                    sp.draw(ctx);
                }
            }
        })
    }

    draw(ctx) {
        if (this.active) {

            Sprite.debug_drawcalls++;
            if (this.type != "kana") {
                this.ox = this.currentAnimation.origin.x + (this.originWidth * this.currentFrame);
                // this.ox = this.currentAnimation.origin.x + (11 * this.currentFrame);

                if (this.parent) {
                    ctx.globalAlpha = this.parent.alpha;
                    ctx.drawImage(SS, this.ox, this.currentAnimation.origin.y, this.width, this.height, this.parent.x + this.offX, this.parent.y + this.offY, this.width * this.scaleX, this.height * this.scaleY);
                    ctx.globalAlpha = 1;
                } else {
                    ctx.globalAlpha = this.alpha;
                    ctx.drawImage(SS, this.ox, this.currentAnimation.origin.y, this.width, this.height, this.x, this.y, this.width * this.scaleX, this.height * this.scaleY);
                    ctx.globalAlpha = 1;
                }

                //           (SS, ox, oy,                             frameWidth, frameHeight, x,      y,      scaleX,                    scaleY)
            } else {
                // TODO trouver un moyen pour le faire qu'une fois par frame ! MAIS AVANT le putImageData !
                for (let i = 0; i < this.imageDataCurrent.imageData.data.length; i += 4) {
                    if (this.step == this.imageDataCurrent.maxStep) {
                        if (this.imageDataCurrent.imageData.data[i] == 255) {
                            this.imageDataCurrent.imageData.data[i] = 69;
                            this.imageDataCurrent.imageData.data[i + 1] = 40;
                            this.imageDataCurrent.imageData.data[i + 2] = 60;
                        }
                    } else {
                        if (this.imageDataCurrent.imageData.data[i] == (this.color + this.step)) {
                            this.imageDataCurrent.imageData.data[i] = 255;
                            this.imageDataCurrent.imageData.data[i + 1] = 0;
                            this.imageDataCurrent.imageData.data[i + 2] = 0;
                        }
                    }
                }

                if (this.x > CANVAS_WIDTH) this.x -= CANVAS_WIDTH;
                if (this.y > CANVAS_HEIGHT) this.y -= CANVAS_HEIGHT;
                if (this.x + this.width < 0) this.x += CANVAS_WIDTH;
                if (this.y + this.height < 0) this.y += CANVAS_HEIGHT;

                ctx.putImageData(this.imageDataCurrent.imageData, this.x * SCALE_X, this.y * SCALE_Y);
                ctx.font = "10px jpfont";
                ctx.textAlign = "center";
                ctx.fillStyle = "rgb(255, 0, 0)";

                if (this.kanaToDelete) {
                    ctx.fillText(this.strokeNumber, this.x + this.width + 10, this.y + CANVAS_HEIGHT + 18);
                } else {
                    ctx.fillText(this.strokeNumber, this.x + this.width + 10, this.y + 18);
                }
                ctx.fillStyle = "rgb(0, 0, 0)";
            }
        }
    }
}
