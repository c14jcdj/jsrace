$(document).ready(function() {
    var game = new GameController;
    var view = new GameView;
    game.run(view)

})



function Player(name) {
    this.name = name;
}

function Board() {

}

function GameController() {

}

function GameView() {

}

GameController.prototype.run = function(view) {
    var player1 = new Player("player1");
    var board = new Board;
    board.createCanvas();
    view.bindStartButton(board);
}

GameView.prototype.bindStartButton = function(board) {
    $('#start').on('click', function() {
        board.showPlayer();
        board.hideStartButton();
    })
}




Board.prototype.showPlayer = function() {


    this.placeHero();

    // $('.container').append('<img id="theImg" src="Images/ralph.png" />')

}

Board.prototype.hideStartButton = function() {
    $('#start').css('visibility', "hidden")
}

Board.prototype.createCanvas = function() {
    var canvas = document.createElement("canvas");
    canvas.id = 'canvas';
    var ctx = canvas.getContext("2d");
    canvas.width = 800;
    canvas.height = 750;
    $('.container').append(canvas);
}

Board.prototype.placeHero = function() {
    var canvas = document.getElementById("canvas");
    if (canvas.getContext) {
        var ctx = canvas.getContext("2d");
        var img = new Image(); // Create new img element
        img.addEventListener("load", function() {
            ctx.drawImage(img, 10, 10)
        }, false);
        img.src = 'Images/ralph.png';
    }
}