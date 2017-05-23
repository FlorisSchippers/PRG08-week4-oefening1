var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GameObject = (function () {
    function GameObject(tag, parent) {
        this._x = 0;
        this._y = 0;
        this.div = document.createElement(tag);
        parent.appendChild(this.div);
    }
    Object.defineProperty(GameObject.prototype, "x", {
        get: function () {
            return this._x;
        },
        set: function (value) {
            this._x = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameObject.prototype, "y", {
        get: function () {
            return this._y;
        },
        set: function (value) {
            this._y = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameObject.prototype, "div", {
        get: function () {
            return this._div;
        },
        set: function (value) {
            this._div = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameObject.prototype, "width", {
        get: function () {
            return this._div.clientWidth;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameObject.prototype, "height", {
        get: function () {
            return this._div.clientHeight;
        },
        enumerable: true,
        configurable: true
    });
    GameObject.prototype.move = function () { };
    return GameObject;
}());
var Car = (function (_super) {
    __extends(Car, _super);
    function Car(yIndex) {
        var _this = this;
        _super.call(this, "car", document.getElementById("container"));
        this._speed = Math.random() * 2 + 1;
        this.x = 0;
        this.y = (70 * yIndex) + 80;
        var frontWheel = new Wheel(this.div, 105);
        var rearWheel = new Wheel(this.div, 20);
        document.addEventListener("keydown", function (e) { return _this.handleKeyDown(e); });
        this.div.addEventListener("click", function (e) { return _this.handleMouseClick(e); });
    }
    Object.defineProperty(Car.prototype, "speed", {
        get: function () {
            return this._speed;
        },
        enumerable: true,
        configurable: true
    });
    Car.prototype.handleMouseClick = function (e) {
        this.braking = true;
        this.changeColor(80);
    };
    Car.prototype.handleKeyDown = function (e) {
        if (e.key == ' ') {
            this.braking = true;
        }
    };
    Car.prototype.move = function () {
        this.x += this._speed;
        if (this.braking)
            this._speed *= 0.98;
        if (this._speed < 0.5)
            this._speed = 0;
        if (this._speed == 0 && this.braking) {
            Game.instance().addScore(this.x);
            console.log("end");
            this.braking = false;
        }
        this.draw();
    };
    Car.prototype.stop = function () {
        this._speed = 0;
        this.braking = false;
        this.changeColor(300);
    };
    Car.prototype.changeColor = function (deg) {
        this.div.style.filter = "hue-rotate(" + deg + "deg)";
    };
    Car.prototype.draw = function () {
        this.div.style.transform = "translate(" + this.x + "px," + this.y + "px)";
    };
    Car.prototype.hasCollision = function (rock) {
        return (this.x < rock.x + rock.width &&
            this.x + this.width > rock.x &&
            this.y < rock.y + rock.height &&
            this.y + this.height > rock.y);
    };
    return Car;
}(GameObject));
var Game = (function () {
    function Game() {
        var _this = this;
        this.score = 0;
        this.request = 0;
        this._gameOver = false;
        this.gameObjects = new Array();
        for (var i = 0; i < 6; i++) {
            this.addCarWithRock(i);
            this.gameObjects.push(new Tree());
        }
        this.request = requestAnimationFrame(function () { return _this.gameLoop(); });
    }
    Game.instance = function () {
        if (!Game._instance)
            Game._instance = new Game();
        return Game._instance;
    };
    Game.prototype.addCarWithRock = function (index) {
        this.gameObjects.push(new Car(index));
        this.gameObjects.push(new Rock(index));
    };
    Game.prototype.gameLoop = function () {
        var _this = this;
        for (var _i = 0, _a = this.gameObjects; _i < _a.length; _i++) {
            var gameObject = _a[_i];
            if (gameObject instanceof Car || gameObject instanceof Rock) {
                gameObject.move();
            }
        }
        this.checkCollision();
        console.log("hier");
        this.request = requestAnimationFrame(function () { return _this.gameLoop(); });
    };
    Game.prototype.checkCollision = function () {
        for (var _i = 0, _a = this.gameObjects; _i < _a.length; _i++) {
            var gameObject1 = _a[_i];
            for (var _b = 0, _c = this.gameObjects; _b < _c.length; _b++) {
                var gameObject2 = _c[_b];
                if (gameObject1 instanceof Car && gameObject2 instanceof Rock) {
                    if (gameObject1.hasCollision(gameObject2)) {
                        gameObject2.crashed(gameObject1.speed);
                        gameObject1.stop();
                        this.gameOver();
                    }
                }
            }
        }
    };
    Game.prototype.gameOver = function () {
        this._gameOver = true;
        document.getElementById("score").innerHTML = "Game Over";
    };
    Game.prototype.addScore = function (x) {
        if (!this._gameOver) {
            this.score += Math.floor(x) * 95588662596856;
            this.draw();
        }
    };
    Game.prototype.draw = function () {
        document.getElementById("score").innerHTML = "Score : " + this.score;
    };
    return Game;
}());
window.addEventListener("load", function () {
    Game.instance();
});
var Rock = (function (_super) {
    __extends(Rock, _super);
    function Rock(index) {
        _super.call(this, "rock", document.getElementById("container"));
        this.g = 0;
        this.rotation = 0;
        this.rotationSpeed = 0;
        this._speed = 0;
        this.x = Math.random() * 400 + 400;
        this.y = (70 * index) + 80;
        this.move();
    }
    Object.defineProperty(Rock.prototype, "speed", {
        set: function (s) {
            this._speed = s;
        },
        enumerable: true,
        configurable: true
    });
    Rock.prototype.move = function () {
        this.x += this._speed;
        this.y += this.g;
        this._speed *= 0.98;
        this.rotation += this.rotationSpeed;
        if (this.y + this.div.clientHeight > document.getElementById("container").clientHeight) {
            this._speed = 0;
            this.g = 0;
            this.rotationSpeed = 0;
        }
        this.div.style.transform = "translate(" + this.x + "px," + this.y + "px) rotate(" + this.rotation + "deg)";
    };
    Rock.prototype.crashed = function (carSpeed) {
        this._speed = carSpeed;
        this.g = 8;
        this.rotationSpeed = 5;
    };
    return Rock;
}(GameObject));
var Tree = (function (_super) {
    __extends(Tree, _super);
    function Tree() {
        _super.call(this, 'tree', document.getElementById("container"));
        this.x = Math.random() * 400 + 400;
        this.y = Math.random() * 400;
        this.div.style.transform = "translate(" + this.x + "px," + this.y + "px)";
    }
    return Tree;
}(GameObject));
var Wheel = (function (_super) {
    __extends(Wheel, _super);
    function Wheel(parent, offsetCarX) {
        _super.call(this, "wheel", parent);
        this.div.style.transform = "translate(" + offsetCarX + "px, 30px)";
    }
    return Wheel;
}(GameObject));
//# sourceMappingURL=main.js.map