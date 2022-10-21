class CollisionManager {
    constructor() { }

    static AABBCollision(x1, y1, w1, h1, x2, y2, w2, h2) {
        return (x1 < x2 + w2) &&
            (x2 < x1 + w1) &&
            (y1 < y2 + h2) &&
            (y2 < y1 + h1);
    }

    static MouseCollision(mX, mY, spX, spY, spW, spH) {

        // Pour les transitions de type déplacement d'écran TODO : à changer un jour
        if (spX >= CANVAS_WIDTH) spX -= CANVAS_WIDTH;
        if (spY >= CANVAS_HEIGHT) spY -= CANVAS_HEIGHT;
        if (spX + spW < 0) spX += CANVAS_WIDTH;
        if (spY + spH < 0) spY += CANVAS_HEIGHT;
        // -------------------------------------------------

        return (mX >= spX) &&
            (mX <= spX + spW) &&
            (mY >= spY) &&
            (mY <= spY + spH);
    }

    static MouseCircleCollision(mX, mY, spX, spY, spW, spH) {
        let radius = spW / 2
        let distX = Math.abs(mX - (spX + (spW / 2)));
        let distY = Math.abs(mY - (spY + (spH / 2)));
        let hypotenuse = Math.sqrt(Math.pow(distX, 2) + Math.pow(distY, 2));
        return hypotenuse <= radius;
        //return Math.sqrt(Math.pow(Math.abs(mX - (spX+(spW/2))), 2), Math.pow(Math.abs(mY - (spY+(spH/2))), 2)) <=  (spW / 2);
    }

}