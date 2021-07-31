class Sprite {

    static list = [];

    constructor(pSize, pX = 0, pY = 0, pType = "normal", pScale = { x: 1, y: 1 }) {

        this.width = pSize.w;
        this.height = pSize.h;

        this.x = pX;
        this.y = pY;

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

        if (this.type == "normal") {
            Sprite.list.push(this);
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
            this.ox = this.currentAnimation.origin.x + (this.width * this.currentFrame); //
            ctx.drawImage(SS, this.ox, this.currentAnimation.origin.y, this.width, this.height, this.x, this.y, this.width * this.scaleX, this.height * this.scaleY);
            //           (SS, ox, oy,                             frameWidth, frameHeight, x,      y,      scaleX,                    scaleY)
        }
    }
}