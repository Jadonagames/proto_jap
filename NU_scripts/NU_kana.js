class Kana {

    static list = [];
    static currentList = [];


    constructor(pX, pY, pChar) {
        this.x;
        this.y;
        this.font = "5px UD Digi Kyokasho NK-R";
        this.color = "rgb(255,255,255)";
        this.char = pChar;
        this.kakijun = new Sprite({ w: 37, h: 34 }, centerX(37), centerY(34), "mainmenu");
        this.kakijun.addAnimation("normal", 1, { x: 0, y: 0 }, 0.1);
        this.kakijun.changeAnimation("normal");
    }

    static init() {

    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.font = this.font;
    }
}