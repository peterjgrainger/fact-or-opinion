import { GameStatus } from "./game-status";

const tryMotivation = [
    'What about this one',
    'Lets try this one',
    'Is this fact or opinion',
];

const goodWords = [
    'Amazing',
    'Incredible',
    'Good work',
];

export function motivation() {

    return tryMotivation[Math.floor(Math.random() * tryMotivation.length)];

}

export function patOnTheBack(gameStatus: GameStatus) {

    const randomGoodWord = goodWords[Math.floor(Math.random() * goodWords.length)];

    if (gameStatus.correctAnswers % 7 === 0 && gameStatus.tries % 7 === 0) {

        return `${randomGoodWord} you got ${gameStatus.tries} out of ${gameStatus.correctAnswers}.  `;
    } else if (gameStatus.streak % 5 === 0) {
        return `${randomGoodWord} you got ${gameStatus.streak} in a row.  `;
    }

    return '';
}
