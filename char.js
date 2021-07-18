class Char {

    static list = [];
    static currentList = [];


    constructor(pX, pY, pChar) {
        this.x;
        this.y;
        this.font = "5px UD Digi Kyokasho NK-R";
        this.color = "rgb(255,255,255)"; 
        this.char = pChar;

    }

    static init() {

    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.font = this.font;
    }
}


