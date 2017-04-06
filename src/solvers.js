/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other
// ***TODO: refactor countnrookssolutions as findnrookssolution function 

window.findNRooksSolution = function(n) {
  var solution = new Board({n:n});
  for (var i = 0; i < n; i++) {
    solution.rows()[i][i] = 1;
  }

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution.rows();
};

window.countNRooksSolutions = function(n) {
  var board = new Board({n:n});
  var possiblePositions = window.allPossiblePositions(n);
  var solution;

  board.togglePiece(startingPosition[0], startingPosition[1]);
  
  var insertNextPiece = function(board, remainingPositions) {
    var pos = remainingPositions[0];
    board.togglePiece(pos[0], pos[1]);
    if ( board.hasAnyRooksConflicts() ) {
      board.togglePiece(pos[0], pos[1]);
    } 
    if (board.countPieces(n) === n) { 
      solution = board;
    }
    else {
      insertNextPiece(board, remainingPositions.slice(1));
    }
  }

  insertNextPiece(board, possiblePositions);
  return solution;
};

window.allPossiblePositions = function(n) {
  var output = [];
  for (var i = 0; i < n; i ++) {
    for (var j = 0; j < n; j++) {
      var position = [i, j];
      output.push(position);
    }
  }

  return output;
}

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};


// window.findNRooksSolution = function(n) {
//   var n = n;
//   var solution = new Board({n:n});
//   for (var i = 0; i < n; i++) {
//     solution.rows()[i][i] = 1;
//   }

//   console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
//   return solution.rows();
// };