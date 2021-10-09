class Transition {
    constructor() { }

    static init() {
        this.circle = {
            x: 50,
            y: 50,
            r: 10,
            originR: 10,
            maxR: 450,
            // r: 450,
            // originR: 450,
            // maxR: 20,
            speed: 1.5,
            speedCount: 0
        };
        this.bActive = false;
    }

    static active(pX, pY, pR, pMaxR) {
        this.bActive = true;
        this.circle.x = pX;
        this.circle.y = pY;
        this.circle.r = pR;
        this.circle.originR = pR;
        this.circle.maxR = pMaxR;
    }


    static drawCircleTransition(ctx) {
        ctx.fillStyle = 'rgba(0,0,0,0)';
        ctx.fillRect(0, 0, 450, 300);

        ctx.beginPath();

        ctx.moveTo(CANVAS_WIDTH + 1, -1);
        ctx.lineTo(-1, -1);
        ctx.lineTo(-1, this.circle.y);
        ctx.lineTo(this.circle.x - this.circle.r, this.circle.y);
        ctx.arc(this.circle.x, this.circle.y, this.circle.r, 9.45, Math.PI * 2);
        ctx.lineTo(CANVAS_WIDTH + 1, this.circle.y);
        ctx.lineTo(CANVAS_WIDTH + 1, -1);

        ctx.moveTo(CANVAS_WIDTH + 1, CANVAS_HEIGHT + 1);
        ctx.lineTo(-1, CANVAS_HEIGHT + 1);
        ctx.lineTo(-1, this.circle.y);
        ctx.lineTo(this.circle.x - this.circle.r, this.circle.y);
        ctx.arc(this.circle.x, this.circle.y, this.circle.r, 9.45, Math.PI * 2, true);
        ctx.lineTo(CANVAS_WIDTH + 1, this.circle.y);
        ctx.lineTo(CANVAS_WIDTH + 1, CANVAS_HEIGHT + 1);

        ctx.clip();
        ctx.fillStyle = "black";   // DE CE RECTANGLE JE NE VEUX GARDER QUE La forme DU DESSUS, LE RESTE EST TRANSPARENT
        ctx.fillRect(0, 0, 450, 300);
    }

    static update(dt) {

        this.circle.speedCount += dt;
        if (this.circle.speedCount >= this.circle.speed) {
            if (this.circle.maxR > this.circle.originR) {
                this.circle.speedCount = 0;
                this.circle.r = this.circle.originR;
                this.bActive = false;

            } else {
                if (this.circle.speedCount >= this.circle.speed + 1) {
                    this.circle.r -= 100 * dt;
                    if (this.circle.r <= 0) {
                        this.circle.speedCount = 0;
                        this.circle.r = this.circle.originR;
                        this.bActive = false;

                        //TODO Callback change state des familles et on est bon

                        Transition.active(this.circle.x, this.circle.y, 0, 450);

                    }
                }
            }

        } else {
            if (this.circle.maxR > this.circle.originR) {
                this.circle.r = easeInSin(this.circle.speedCount, this.circle.originR, this.circle.maxR - this.circle.originR, this.circle.speed);
            } else {
                this.circle.r = easeOutSin(this.circle.speedCount, this.circle.originR, this.circle.maxR - this.circle.originR, this.circle.speed);
            }
        }


    }



    static draw(ctx) {
        Transition.drawCircleTransition(ctx);
    }



}