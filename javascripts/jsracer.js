$(document).ready(function() {
    var game = new GameController;
    var view = new GameView;
    game.run(view)

})



function Player() {
    this.name = "Ralph";
    this.x = 400;
    this.y = 10;
    this.speed = 200;
}

function Board() {

}

function GameController() {

}

function GameView() {

}

GameController.prototype.run = function(view) {
    board = new Board;
    time = Date.now();
    keysDown = {};
    hero = new Player;
    view.createCanvas();
    view.bindStartButton(view, board);

}

GameView.prototype.bindStartButton = function(view, board) {
    $('#start').on('click', function() {
        view.showPlayer();
        view.hideStartButton();
        board.keyboardListener();
        setInterval(board.runUpdate, 10);
    })
}

GameView.prototype.showPlayer = function() {
    canvas = document.getElementById("canvas");
    if (canvas.getContext) {
        ctx = canvas.getContext("2d");
        img = new Image();
        img.addEventListener("load", function() {
            ctx.drawImage(img, hero.x, hero.y);
        }, false);
        img.src = 'Images/ralph.png';
    }
}

GameView.prototype.hideStartButton = function() {
    $('#start').css('visibility', "hidden")
}

GameView.prototype.createCanvas = function() {
    canvas = document.createElement("canvas");
    canvas.id = 'canvas';
    ctx = canvas.getContext("2d");
    canvas.width = 800;
    canvas.height = 750;
    $('.container').append(canvas);
}



Board.prototype.update = function(mod) {

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
}

Board.prototype.render = function() {

    ctx = canvas.getContext("2d");
    img = new Image();
    img.addEventListener("load", function() {
        ctx.drawImage(img, hero.x, hero.y);
    }, false);
    img.src = 'Images/ralph.png';
}


Board.prototype.runUpdate = function() {
    board.update(((Date.now() - time) / 1000));
    board.render();
    time = Date.now();
}

Board.prototype.keyboardListener = function() {
    window.addEventListener('keydown', function(e) {
        keysDown[e.keyCode] = true;
    });
    window.addEventListener('keyup', function(e) {
        delete keysDown[e.keyCode];
    });
}