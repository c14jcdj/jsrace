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
    var player2 = new Player("player2");
    var board = new Board;
    view.bindStartButton(board);
}

GameView.prototype.bindStartButton = function(board) {
    $('#start').on('click', function() {
        board.showBoard();
    })
}

Board.prototype.showBoard = function() {
    $('.racer_table td').css("visibility", "visible");
}