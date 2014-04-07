$(document).ready(function() {
    var game = new GameController;
    var view = new GameView;
    game.run(view)

})

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
        board = new Board;
        time = Date.now();
        keysDown = {};
        hero = new Player;
        view.createCanvas();
        view.bindStartButton(view, board);
    }
}

GameView.prototype = {
    bindStartButton: function(view, board) {
        $('#start').on('click', function() {
            view.hideStartButton();
            board.keyboardListener();
            setInterval(board.runUpdate, 10);

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

    render: function() {
        ctx = canvas.getContext("2d");
        img = new Image();
        img.addEventListener("load", function() {
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            ctx.drawImage(img, hero.x, hero.y);
        }, false);
        img.src = 'Images/ralph.png';
    },

    runUpdate: function() {
        board.update(((Date.now() - time) / 1000));
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