class Player {

    constructor(pSize, pX, pY) {

        this.width = pSize.w;
        this.height = pSize.h;

        this.sp = new Sprite(pSize, pX, pY);
        this.sp.addAnimation("idle", 2, { x: 240, y: 80 }, 0.5, true);
        this.sp.changeAnimation("idle");

        this.state = "idle";

        this.boxCollider = {
            w: 8,
            h: 10,
            x: this.sp.x + 6,
            y: this.sp.y
        }
        this.boxCollider2 = {
            w: 18,
            h: 8,
            x: this.sp.x + 2,
            y: this.sp.y + 11
        }

        this.boxColliders = [];
        this.boxColliders.push(this.boxCollider);
        this.boxColliders.push(this.boxCollider2);

        this.bCollide = false;

        this.bKeyRight = false;
        this.bKeyLeft = false;
        this.bKeyUp = false;
        this.bKeyDown = false;

    }

    setCollide(bBool) {
        this.bCollide = bBool;
    }

    getSprite() {
        return this.sp;
    }

    getSize() {
        return { w: this.width, h: this.height };
    }

    setPosition(pX, pY) {
        this.sp.setPosition(pX, pY);
    }

    updateBoxColliders() {

        if (this.state == "idle") {
            this.boxCollider.x = this.sp.x + 7;
            this.boxCollider.y = this.sp.y + 1;

            this.boxCollider2.x = this.sp.x + 2;
            this.boxCollider2.y = this.sp.y + 11;
        }
    }


    update(dt) {
        let moving = false;
        if (this.bKeyRight) {
            moving = true;
            this.sp.x += 1 * (60 * dt);
            if (this.sp.x > CANVAS_WIDTH - this.width) {
                this.sp.setPosition(CANVAS_WIDTH - this.width, this.sp.y);
            }
        }
        if (this.bKeyLeft) {
            moving = true;
            this.sp.x -= 1 * (60 * dt);
            if (this.sp.x < 0) {
                this.sp.setPosition(0, this.sp.y);
            }
        }
        if (this.bKeyUp) {
            moving = true;
            this.sp.y -= 1 * (60 * dt);
            if (this.sp.y < 0) {
                this.sp.setPosition(this.sp.x, 0);
            }
        }
        if (this.bKeyDown) {
            moving = true;
            this.sp.y += 1 * (60 * dt);
            if (this.sp.y > CANVAS_HEIGHT - this.height) {
                this.sp.setPosition(this.sp.x, CANVAS_HEIGHT - this.height);
            }
        }

        this.sp.setMoving(moving)
        if (!moving) {
            if (Math.ceil(this.sp.x) - this.sp.x > 0.5) {
                this.sp.x = Math.floor(this.sp.x);
            } else {
                this.sp.x = Math.ceil(this.sp.x);
            }
            if (Math.ceil(this.sp.y) - this.sp.y > 0.5) {
                this.sp.y = Math.floor(this.sp.y);
            } else {
                this.sp.y = Math.ceil(this.sp.y);
            }
        }


        this.updateBoxColliders();

    }
}