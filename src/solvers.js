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
  var board = new Board({n:n});

  function solveRooks(n, board, row, callback) {
    if (row === n) {
      return callback();
    }

    for (var i = 0; i < n; i++) {
      board.togglePiece(row, i);

      if (!board.hasAnyRooksConflicts()) {
        var result = solveRooks(n, board, row + 1, callback);
        if (result) {
          return result;
        }
      }

      board.togglePiece(row, i);
    }
  }

  var solution = solveRooks(n, board, 0, function() {
    return _.map(board.rows(), function(row) {
      return row.slice();
    });
  });

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

window.countNRooksSolutions = function(n) {
  var board = new Board({n:n});
  var solutionCount = 0;

  var solveRooks = function(n, board, row, callback) {
    if (row === n) {
      return callback();
    }

    for (var i = 0; i < n; i++) {
      board.togglePiece(row, i);

      if (!board.hasAnyRooksConflicts()) {
        var result = solveRooks(n, board, row + 1, callback);
        if (result) {
          return result;
        } 
      }
      board.togglePiece(row, i);
    }
  }

  solveRooks(n, board, 0, function() {
    solutionCount++;
  });

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution;
  var board = new Board({n:n});

  if (n === 2 || n === 3) {
    return board.rows();
  }

  var solveQueens = function(n, board, row, callback) {
    if (row === n) {
      return callback();
    }

    for (var i = 0; i < n; i++) {
      board.togglePiece(row, i);

      if (!board.hasAnyQueensConflicts()) {
        var result = solveQueens(n, board, row + 1, callback);
        if (result) {
          return result;
        } 
      }
      board.togglePiece(row, i);
    }
  }

  solution = solveQueens(n, board, 0, function() {
    return _.map(board.rows(), function(row) {
      return row.slice();
    });
  });

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0;
  var board = new Board({n:n}); 

  var solveQueens = function(n, board, row, callback) {
    if (row === n) {
      return callback();
    }

    for (var i = 0; i < n; i++) {
      board.togglePiece(row, i);

      if (!board.hasAnyQueensConflicts()) {
        var result = solveQueens(n, board, row + 1, callback);
        if (result) {
          return result;
        } 
      }
      board.togglePiece(row, i);
    }
  }
 
  solveQueens(n, board, 0, function() {
    solutionCount++;
  });

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};