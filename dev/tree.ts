class Tree extends GameObject {
    constructor() {
        super('tree', document.getElementById("container"));
        this.x = Math.random() * 400 + 400;
        this.y = Math.random() * 400;
        this.div.style.transform = "translate(" + this.x + "px," + this.y + "px)"
    }
}