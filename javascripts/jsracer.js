$(document).ready(function() {
    var game = new GameController;
    var view = new GameView;
    game.run(view)

})

function ComputerPlayer(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
}

function Player() {
    this.name = "Ralph";
    this.x = 0;
    this.y = 300;
    this.speed = 200;
}

function Board() {}

function GameController() {}

function GameView() {}

GameController.prototype = {
    run: function(view) {
        board = new Board();
        time = Date.now();
        keysDown = {};
        hero = new Player();
        felix = new ComputerPlayer(20, 50, 120);
        view.createCanvas();
        view.bindStartButton(view, board);
    }
}

GameView.prototype = {
    bindStartButton: function(view, board) {
        $('#start').on('click', function() {
            view.hideStartButton();
            board.keyboardListener();
            interval = setInterval(board.runUpdate, 10);

        })
    },

    hideStartButton: function() {
        $('#start').css('visibility', "hidden")
    },

    createCanvas: function() {
        canvas = document.createElement("canvas");
        canvas.id = 'canvas';
        ctx = canvas.getContext("2d");
        canvas.width = 800;
        canvas.height = 750;
        $('.container').append(canvas);
    }


}

Board.prototype = {
    update: function(mod) {
        if (37 in keysDown) {
            hero.x -= hero.speed * mod;
        }
        if (38 in keysDown) { //up
            hero.y -= hero.speed * mod;
        }
        if (39 in keysDown) {
            hero.x += hero.speed * mod;
        }
        if (40 in keysDown) {
            hero.y += hero.speed * mod;
        }
    },

    updateFelix: function(mod) {
        if (felix.x >= 750) {
            felix.x = 0
        } else {
            felix.x += felix.speed * mod;
        }
    },

    render: function() {
        ctx = canvas.getContext("2d");
        heroImg = new Image();
        felixImg = new Image();
        heroImg.addEventListener("load", function() {
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            ctx.drawImage(heroImg, hero.x, hero.y);
            ctx.drawImage(felixImg, felix.x, felix.y);
        }, false);
        heroImg.src = 'Images/ralph.png';
        felixImg.src = 'Images/felix.png';
    },

    runUpdate: function() {
        board.update(((Date.now() - time) / 1000));
        board.updateFelix(((Date.now() - time) / 1000));
        board.render();
        board.winner();
        time = Date.now();
    },

    keyboardListener: function() {
        window.addEventListener('keydown', function(e) {
            keysDown[e.keyCode] = true;
        });
        window.addEventListener('keyup', function(e) {
            delete keysDown[e.keyCode];
        });
    },
    winner: function() {
        console.log(hero.x)
        if (hero.x >= 730) {
            $('.container').prepend("You Win")
            this.reset();
        }
    },

    reset: function() {
        hero.x = -44;
        hero.y = -10;
        clearInterval(interval);
        DisableArrowKeys();

    }
}

function DisableArrowKeys() {
    var ar = [37, 38, 39, 40];
    $(document).keydown(function(e) {
        var key = e.which;
        if ($.inArray(key, ar) > -1) {
            e.preventDefault();
            return false;
        }
        return true;
    });
}

function EnableArrowKeys() {
    var ar = new Array(37, 38, 39, 40);
    $(document).keydown(function(e) {
        var key = e.which;
        if ($.inArray(key, ar) > -1) {
            return true;
        }
    });
}