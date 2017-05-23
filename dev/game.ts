/// <reference path="car.ts"/>

class Game {

    private static _instance: Game;
    private gameObjects: Array<GameObject>;
    private score: number = 0;
    private request: number = 0;
    private _gameOver: boolean = false;

    public static instance(): Game {
        if (!Game._instance) Game._instance = new Game();
        return Game._instance;
    }

    private constructor() {
        this.gameObjects = new Array<GameObject>();
        for (let i = 0; i < 6; i++) {
            this.addCarWithRock(i);
            this.gameObjects.push(new Tree());
        }
        this.request = requestAnimationFrame(() => this.gameLoop());
    }

    private addCarWithRock(index: number) {
        this.gameObjects.push(new Car(index));
        this.gameObjects.push(new Rock(index));
    }

    private gameLoop() {
        for (let gameObject of this.gameObjects) {
            if (gameObject instanceof Car || gameObject instanceof Rock) {
                gameObject.move();
            }
        }
        this.checkCollision();
        console.log("hier");
        this.request = requestAnimationFrame(() => this.gameLoop());
    }

    private checkCollision() {
        for (let gameObject1 of this.gameObjects) {
            for (let gameObject2 of this.gameObjects) {
                if (gameObject1 instanceof Car && gameObject2 instanceof Rock) {
                    if (gameObject1.hasCollision(gameObject2)) {
                        gameObject2.crashed(gameObject1.speed);
                        gameObject1.stop();
                        this.gameOver();
                        //this.stop();
                    }
                }
            }
        }
    }

    // private stop() {
    //     cancelAnimationFrame(this.request);
    // }
    private gameOver(): void {
        this._gameOver = true;
        document.getElementById("score").innerHTML = "Game Over";
    }

    public addScore(x: number) {
        if (!this._gameOver) {
            this.score += Math.floor(x) * 95588662596856;
            this.draw();
        }
    }

    private draw() {
        document.getElementById("score").innerHTML = "Score : " + this.score;
    }
}

// load
window.addEventListener("load", function () {
    Game.instance();
});