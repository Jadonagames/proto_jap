class KanaBgSprite extends Sprite {


    constructor(pSize, pX = 0, pY = 0, pParent = null, pType = "normal", pScale = { x: 1, y: 1 }) {
        super(pSize, pX, pY, pParent, pType, pScale);

        // 0: Up / 1: Right / 2: Down / 3: Left
        this.direction = 0;
        this.bColliding = false;

    }

    update(dt) {

        switch (this.direction) {
            case 0:
                this.y -= 1 + (60 * dt);
                break;
            case 1:
                this.x += 1 + (60 * dt);
                break;
            case 2:
                this.y += 1 + (60 * dt);
                break;
            case 3:
                this.x -= 1 + (60 * dt);
                break;
        }

        let bColliding = false;
        MainMenu.randomKanaSpriteList.forEach(sp => {
            if (sp != this && CollisionManager.AABBCollision(this.x, this.y, 10, 10, sp.x, sp.y, 10, 10) && !this.bColliding && !sp.bColliding) {


                this.bColliding = true;
                sp.bColliding = true;


                bColliding = true;

                this.delete = true;
                sp.delete = true;
                MainMenu.particles(this.x + 5, this.y + 5);
                MainMenu.particles(sp.x + 5, sp.y + 5);

                // if (!this.bColliding && !sp.bColliding) {
                //     this.bColliding = true;
                //     sp.bCollising = true;

                //     switch (this.direction) {
                //         case 0:
                //             this.direction = 2;
                //             break;
                //         case 1:
                //             this.direction = 3;
                //             break;
                //         case 2:
                //             this.direction = 0;
                //             break;
                //         case 3:
                //             this.direction = 1;
                //             break;
                //     }
                //     switch (sp.direction) {
                //         case 0:
                //             sp.direction = 2;
                //             break;
                //         case 1:
                //             sp.direction = 3;
                //             break;
                //         case 2:
                //             sp.direction = 0;
                //             break;
                //         case 3:
                //             sp.direction = 1;
                //             break;
                //     }
                // }
            } else {
            }
        });
        if (!bColliding) {
            this.bColliding = false;
        }

        if (this.x <= -10 || this.x >= CANVAS_WIDTH + 10 || this.y <= -10 || this.y >= CANVAS_HEIGHT + 10) {
            this.delete = true;
        }

    }

    setDirection(pDirection) {
        this.direction = pDirection;
    }

}