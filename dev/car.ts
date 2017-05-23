/// <reference path="gameObject.ts" />


class Car extends GameObject {

    private _speed: number = Math.random() * 2 + 1;
    private braking: boolean;
    private crashed: boolean;
    private game: Game;

    public get speed(): number {
        return this._speed;
    }

    constructor(yIndex: number) {
        super("car", document.getElementById("container"));
        this.x = 0;
        this.y = (70 * yIndex) + 80;
        let frontWheel = new Wheel(this.div, 105);
        let rearWheel = new Wheel(this.div, 20);
        // hier een keypress event listener toevoegen. een keypress zorgt dat braking true wordt
        document.addEventListener("keydown", (e: KeyboardEvent) => this.handleKeyDown(e));
        this.div.addEventListener("click", (e: MouseEvent) => this.handleMouseClick(e));
    }

    private handleMouseClick(e: MouseEvent) {
        this.braking = true;
        this.changeColor(80); //green
    }

    private handleKeyDown(e: KeyboardEvent) {
        if (e.key == ' ') {
            // Brake
            this.braking = true;
        }
    }

    public move(): void {
        // de snelheid bij de x waarde optellen
        //
        this.x += this._speed;
        // hier de snelheid verlagen als we aan het afremmen zijn
        //
        if (this.braking) this._speed *= 0.98;
        if (this._speed < 0.5) this._speed = 0;

        if (this._speed == 0 && this.braking) {
            Game.instance().addScore(this.x);
            console.log("end");
            this.braking = false;
        }
        this.draw();
    }

    public stop() {
        this._speed = 0;
        this.braking = false;
        this.changeColor(300); //red
    }

    public changeColor(deg: number): void {
        this.div.style.filter = "hue-rotate(" + deg + "deg)";
    }

    private draw(): void {
        // tekenen
        this.div.style.transform = `translate(${this.x}px,${this.y}px)`;
    }

    public hasCollision(rock: Rock): boolean {
        return (this.x < rock.x + rock.width &&
            this.x + this.width > rock.x &&
            this.y < rock.y + rock.height &&
            this.y + this.height > rock.y);
    }
}