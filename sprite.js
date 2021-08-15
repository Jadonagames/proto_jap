class Sprite {

    static list = [];
    static kanaList = [];

    static debug_drawcalls = 0;

    constructor(pSize, pX = 0, pY = 0, pType = "normal", pScale = { x: 1, y: 1 }) {

        this.width = pSize.w;
        this.height = pSize.h;

        this.x = pX;
        this.y = pY;

        this.originalX = this.x;
        this.originalY = this.y;

        this.ox = 0;

        this.scaleX = pScale.x;
        this.scaleY = pScale.y;

        this.currentFrame = 0;
        this.currentAnimation = null;
        this.timer = new Timer(0, this.updateFrame.bind(this));

        this.active = true;

        this.class = "";
        this.type = pType;
        this.loopCount = 0;
        this.maxLoop = 0;
        this.delete = false;

        this.animations = [];

        this.parent = null;

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

    addAnimation(pName, pFramesNb, pOrigin, pSpeed, pLoop = true) {
        let animation = {
            name: pName,
            frames: pFramesNb,
            origin: pOrigin,
            speed: pSpeed,
            bLoop: pLoop,
            bEnd: false,
            maxWidth: this.width * pFramesNb
        }
        this.animations.push(animation);
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

    update(dt) {
        if (this.currentAnimation != null && this.currentAnimation.frames > 1) {
            this.timer.setMax(this.currentAnimation.speed);
            this.timer.update(dt);
        }
    }

    updateTranslation(dt, pX, pY) {
        this.x += pX * 60 * dt;
        this.y += pY * 60 * dt;
    }

    updateFrame() {
        this.currentFrame++;
        if (this.currentFrame >= this.currentAnimation.frames) {
            if (this.currentAnimation.bLoop) {
                this.currentFrame = 0;
            } else {
                this.currentFrame = 0;
                // this.currentAnimation.bEnd = true;
                this.loopCount++;
                if (this.type == "todelete" && this.loopCount >= this.maxLoop) {
                    this.delete = true;
                }
            }
        }
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
            if (sp.class == "dynamic") {
                for (const s in sp) {
                    if (sp[s] instanceof Sprite) {
                        sp[s].update(dt);
                    }
                }
            } else {
                sp.update(dt);
            }
        })
    }

    static manageBeforeDrawing(pList) {
        pList.forEach(sp => {
            if (sp.class == "dynamic") {
                for (const s in sp) {
                    if (sp[s] instanceof Sprite) {
                        sp[s].draw(ctx);
                    } else if (s == "parent") {
                        if (sp[s].label != "") {
                            sp[s].drawLabel(ctx);
                        }
                    }
                }
            } else {
                if (sp.class == "button" || sp.class == "panel") { // ou if parent instanceof Button / Panel etc.
                    sp.draw(ctx);
                    if (sp.getParent() && sp.getParent().label != "") {
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
                this.ox = this.currentAnimation.origin.x + (this.width * this.currentFrame);
                ctx.drawImage(SS, this.ox, this.currentAnimation.origin.y, this.width, this.height, this.x, this.y, this.width * this.scaleX, this.height * this.scaleY);
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
            }
        }
    }
}
