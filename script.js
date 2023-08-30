document.addEventListener('DOMContentLoaded', () => {
    const boxes = document.querySelectorAll('.box');
    const gameInfo = document.querySelector('.game-info span');
    const resetButton = document.querySelector('.game-info button');
    let currentPlayer = 'X';
    let gameOver = false;

    boxes.forEach(box => {
        box.addEventListener('click', () => {
            if (!gameOver && !box.classList.contains('filled')) {
                box.classList.add('filled');
                box.querySelector('.box-text').textContent = currentPlayer;
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                gameInfo.textContent = `Turn for ${currentPlayer}`;
                checkGameState();
            }
        });
    });

    resetButton.addEventListener('click', () => {
        resetGame();
    });

    function checkGameState() {
        if (!gameOver) {
            checkWinner();
            checkDraw();
        }
    }

    function checkWinner() {
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6] // Diagonals
        ];

        for (const combination of winningCombinations) {
            const [a, b, c] = combination;
            if (
                boxes[a].classList.contains('filled') &&
                boxes[b].classList.contains('filled') &&
                boxes[c].classList.contains('filled') &&
                boxes[a].querySelector('.box-text').textContent ===
                boxes[b].querySelector('.box-text').textContent &&
                boxes[b].querySelector('.box-text').textContent ===
                boxes[c].querySelector('.box-text').textContent
            ) {
                gameInfo.textContent = `${boxes[a].querySelector('.box-text').textContent} wins!`;
                boxes[a].classList.add('winner');
                boxes[b].classList.add('winner');
                boxes[c].classList.add('winner');
                gameOver = true;
                break;
            }
        }
    }

    function checkDraw() {
        if (Array.from(boxes).every(box => box.classList.contains('filled'))) {
            gameInfo.textContent = "It's a draw!";
            gameOver = true;
        }
    }

    function resetGame() {
        boxes.forEach(box => {
            box.classList.remove('filled', 'winner');
            box.querySelector('.box-text').textContent = '';
        });
        currentPlayer = 'X';
        gameInfo.textContent = `Turn for ${currentPlayer}`;
        gameOver = false;
    }
});
