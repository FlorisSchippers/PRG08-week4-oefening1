/// <reference path="gameObject.ts"/>

class Wheel extends GameObject {

    constructor(parent: HTMLElement, offsetCarX: number) {
        super("wheel", parent);
        this.div.style.transform = "translate(" + offsetCarX + "px, 30px)";
    }
}