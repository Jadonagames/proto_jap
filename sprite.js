class Sprite {

    static list = [];

    constructor(pSize, pX = 0, pY = 0) {

        this.width = pSize.w;
        this.height = pSize.h;

        this.x = pX;
        this.y = pY;

        this.currentFrame = 0;
        this.currentAnimation = null;
        this.timer = new Timer(0, this.updateFrame.bind(this));

        this.type = "normal";
        this.loopCount = 0;
        this.maxLoop = 0;
        this.delete = false;

        this.animations = [];

        this.isMoving = false;

        // LA GESTION DES SPRITES DÉPENDRA DE LA STRUCTURE DU JEU
        Sprite.list.push(this);
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

    changeAnimation(pName) {
        this.animations.forEach(animation => {
            if (animation.name == pName) {
                this.currentAnimation = animation;
                this.currentAnimation.bEnd = false;
                this.currentFrame = 0;
            }
        });
    }

    setMoving(pBool) {
        this.isMoving = pBool;
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

    draw(ctx) {
        const ox = this.currentAnimation.origin.x + (this.width * this.currentFrame); //
        ctx.drawImage(SS, ox, this.currentAnimation.origin.y, this.width, this.height, this.x, this.y, this.width, this.height);
        //           (SS, ox, oy,                             frameWidth, frameHeight, x,      y,      scaleX,                    scaleY)
    }

}