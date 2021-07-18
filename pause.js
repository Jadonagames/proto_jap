class Pause {

    static list = [];

    constructor() {

    }

    static init() {

        let pauseTitle = new UiSprite({ w: 88, h: 28 }, centerX(88), 10, "pause");
        pauseTitle.addAnimation("normal", 1, { x: 423, y: 0 }, 0.1);
        pauseTitle.changeAnimation("normal");
        Pause.list.push(pauseTitle);

        let resumeBtn = new Button({ w: 32, h: 16 }, 84, 100, togglePause, "pause", GAME_STATE.Pause);
        resumeBtn.getSprite().addAnimation("normal", 1, { x: 0, y: 64 }, 0.1);
        resumeBtn.getSprite().addAnimation("hover", 1, { x: 32, y: 64 }, 0.1);
        resumeBtn.getSprite().addAnimation("down", 1, { x: 64, y: 64 }, 0.1);
        resumeBtn.getSprite().changeAnimation("normal");
        Pause.list.push(resumeBtn.getSprite());

        let mainMenuBtn = new Button({ w: 32, h: 16 }, 84, 120, toMainMenu, "pause", GAME_STATE.Pause);
        mainMenuBtn.getSprite().addAnimation("normal", 1, { x: 96, y: 64 }, 0.1);
        mainMenuBtn.getSprite().addAnimation("hover", 1, { x: 128, y: 64 }, 0.1);
        mainMenuBtn.getSprite().addAnimation("down", 1, { x: 160, y: 64 }, 0.1);
        mainMenuBtn.getSprite().changeAnimation("normal");
        Pause.list.push(mainMenuBtn.getSprite());


    }

    static update(dt) {
        Pause.list.forEach(sp => {
            sp.update(dt);
        });
    }

    static draw(ctx) {
        Pause.list.forEach(sp => {
            sp.draw(ctx);
        });
    }

}