import { GameStatus } from "./game-status";

const tryMotivation = [
    'What about this one',
    'Lets try this one',
    'Is this fact or opinion',
];

const goodWords = [
    'Amazing',
    'Woot woot',
    'Incredible',
];

export function motivation() {

    return tryMotivation[Math.floor(Math.random() * tryMotivation.length)];

}

export function patOnTheBack(gameStatus: GameStatus) {
    if (+gameStatus.correctAnswers % 5 === 0 && gameStatus.tries % 5 === 0) {
        const randomGoodWord = goodWords[Math.floor(Math.random() * goodWords.length)];

        return `${randomGoodWord} you got ${gameStatus.tries} out of ${gameStatus.correctAnswers}.  `;
    }

    return '';
}
