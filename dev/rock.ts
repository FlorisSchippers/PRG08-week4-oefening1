/// <reference path="gameObject.ts" />


class Rock extends GameObject {

    private _speed: number;
    private g: number = 0;
    private rotation = 0;
    private rotationSpeed = 0;

    public set speed(s: number) {
        this._speed = s;
    }

    constructor(index) {
        super("rock", document.getElementById("container"));
        this._speed = 0;
        this.x = Math.random() * 400 + 400;
        this.y = (70 * index) + 80;
        this.move();
    }

    public move(): void {
        // speed optellen zo lang we niet de bodem raken
        // speed wordt hoger dan 0 zodra de auto de rots raakt
        this.x += this._speed;
        this.y += this.g;
        this._speed *= 0.98;
        this.rotation += this.rotationSpeed;
        if (this.y + this.div.clientHeight > document.getElementById("container").clientHeight) {
            this._speed = 0;
            this.g = 0;
            this.rotationSpeed = 0;
        }
        //teken de div op de juiste positie
        this.div.style.transform = "translate(" + this.x + "px," + this.y + "px) rotate(" + this.rotation + "deg)"
    }

    public crashed(carSpeed: number) {
        this._speed = carSpeed;
        this.g = 8;
        this.rotationSpeed = 5;
    }
}