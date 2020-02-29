//  ____                    _        _            __  __             _             ____    _   _                 
// |  _ \    __ _  __   __ (_)      / \          |  \/  |         __| |   __ _    / ___|  (_) | | __   __   __ _ 
// | | | |  / _` | \ \ / / | |     / _ \         | |\/| |        / _` |  / _` |   \___ \  | | | | \ \ / /  / _` |
// | |_| | | (_| |  \ V /  | |    / ___ \   _    | |  | |  _    | (_| | | (_| |    ___) | | | | |  \ V /  | (_| |
// |____/   \__,_|   \_/   |_|   /_/   \_\ (_)   |_|  |_| (_)    \__,_|  \__,_|   |____/  |_| |_|   \_/    \__,_|

/******************** PAN ********************/
const BOTH = 1,
    HORIZONTAL = 2,
    VERTICAL = 3;

defaultDrag = 0.2;
defaultRatio = 1;
defaultPanMode = BOTH;
/******/

class Pan {
    constructor(drag, ratio, mode) {
        this.pos = createVector();
        this.vel = createVector();

        /* DRAG */
        if (drag !== undefined) {
            this.drag = createVector(drag, drag);
        } else {
            this.drag = createVector(defaultDrag, defaultDrag);
        }
        if (drag < 0 || drag > 1) {
            console.warn("Drag is beyond the optimal region (0 to 1): drag = " + drag);
        }

        this.ratio = createVector(ratio || defaultRatio, ratio || defaultRatio);
        this.mode = mode || defaultPanMode;


    }

    update() {
        fill(245, 43, 234); /////////////////
        ellipse(100, 100, 50, 70); //////////
        translate(this.pos.x, this.pos.y);

        if (this.mode === BOTH) {
            if (mouseIsPressed) {
                this.vel = createVector(this.ratio.x * (mouseX - pmouseX), this.ratio.y * (mouseY - pmouseY));
            }
        } else if (this.mode === HORIZONTAL) {
            if (mouseIsPressed) {
                this.vel = createVector(this.ratio.x * (mouseX - pmouseX), 0);
            }
        } else if (this.mode === VERTICAL) {
            if (mouseIsPressed) {
                this.vel = createVector(0, this.ratio.y * (mouseY - pmouseY));
            }
        }

        this.pos.add(this.vel);
        this.vel = createVector(this.vel.x * (1 - this.drag.x), this.vel.y * (1 - this.drag.y));
    }

    setDrag(a, b) {
        if (a && a.x !== undefined && a.y !== undefined) {
            /// If a = vector
            if (a.x < 0 || a.x > 1 || a.y < 0 || a.y > 1) {
                console.warn("Drag is beyond the optimal region (0 to 1): drag = {x: " + a.x + ", y: " + a.y + "}");
            }
            this.drag = createVector(a.x, a.y);
        } else if (a && a[0] !== undefined && a[1] !== undefined) {
            /// If a = array
            if (a[0] < 0 || a[0] > 1 || a[1] < 0 || a[1] > 1) {
                console.warn("Drag is beyond the optimal region (0 to 1): drag = [x: " + a[0] + ", y: " + a[1] + "]");
            }
            this.drag = createVector(a[0], a[1]);
        } else if (a && typeof a === 'number') {
            /// If a = number
            if (a < 0 || a > 1 || b < 0 || b > 1) {
                console.warn("Drag is beyond the optimal region (0 to 1): drag = (" + a + ", " + (b || a) + ")");
            }
            if (b !== undefined) {
                this.drag = createVector(a, b);
            } else if (a !== undefined) {
                this.drag = createVector(a, a);
            }
        } else if (a) {
            /// If invalid
            console.warn("A invalid argument was passed at setDrag()");
        } else {
            /// If nothing
            this.drag = createVector(defaultDrag, defaultDrag);
        }
    }

    setRatio(x, y) {
        if (typeof x === 'object') {
            this.ratio = x;
        } else {
            if (y) {
                this.ratio = createVector(x || defaultRatio, y || defaultRatio);
            } else {
                this.ratio = createVector(x || defaultRatio, x || defaultRatio);
            }
        }
    }

    setMode(mode) {
        this.mode = mode || defaultPanMode;
        ///// Add diagonals
    }

    setPos(x, y) {
        this.pos = createVector(x || 0, y || 0);
    }

    setVel(x, y) {
        this.vel = createVector(x || 0, y || 0);
    }
}

// // Sets how "fast" the canvas stops moving on x and y axis, 1 = Instantenuos, 0 = Never
// p5.prototype.setdrag = function (x, y) {
//     drag = createVector(1 - constrain(x, 0, 1) || defaultDrag, 1 - constrain(y, 0, 1) || 1 - constrain(x, 0, 1) || defaultDrag);
// }
// // Sets in which direction the canvas can move: BOTH, HORIZONTAL, VERTICAL
// p5.prototype.setPanMode = function (mode) {
//     panMode = mode || BOTH;
// }
// p5.prototype.setratio = function (x, y) {
//     ratio = createVector(x || defaultRatio,
//         y || x || defaultRatio);
// }
/*********************************************/



/******************** ZOOM ********************/

/**********************************************/