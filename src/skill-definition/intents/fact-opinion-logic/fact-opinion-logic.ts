import { request, response } from "alexa-app/types";
import { GAME_STATE, GameStatus } from "../../models/game-status";
import { motivation, patOnTheBack } from "../../models/motivation";
import { startNewGame } from "../../models/new-game";
import { updateDb } from "../../models/persist";
import { SessionNames} from "../../models/session-variables";
import { endPhrase, isEnd, newStatement, Statement, statements, StatementType } from "../../models/statements";

export function commonAction(alexaRequest: request, alexaResponse: response, statementType: StatementType) {
    if (!alexaRequest.hasSession()) {
        return startNewGame(alexaRequest, alexaResponse);
    }

    const session = alexaRequest.getSession();
    const gameStatus = new GameStatus(session, GAME_STATE.CONTINUE);
    const isCorrect = checkAnswer(statementType, gameStatus);
    const answeredStatement = statements.filter((value) => value.text === gameStatus.currentQuestion);
    const result = getResultText(isCorrect, answeredStatement[0]);

    gameStatus.tries += 1;
    gameStatus.correctAnswers = isCorrect ? gameStatus.correctAnswers + 1 : gameStatus.correctAnswers;
    gameStatus.streak = isCorrect ? gameStatus.streak + 1 : gameStatus.streak;

    session.set(SessionNames[SessionNames.TRIES], gameStatus.tries);
    session.set(SessionNames[SessionNames.CORRECT_ANSWERS], gameStatus.correctAnswers);
    session.set(SessionNames[SessionNames.STREAK], gameStatus.streak);

    if (isEnd(gameStatus.askedQuestions)) {
        gameStatus.gameState = GAME_STATE.ALL_QUESTIONS_ASKED;
        updateDb(alexaRequest.userId, gameStatus);
        // tslint:disable-next-line:max-line-length
        return alexaResponse.say(`${result}.  ${endPhrase(alexaRequest.hasSession(),
                                           gameStatus.correctAnswers,
                                           gameStatus.tries)}`)
                                .shouldEndSession(true);
    } else {

        const statement = newStatement(gameStatus.askedQuestions);

        session.set(SessionNames[SessionNames.STATEMENT_TYPE],
            statement.type);

        session.set(SessionNames[SessionNames.ASKED_QUESTIONS],
            gameStatus.askedQuestions.concat([statement.shortName]));

        session.set(SessionNames[SessionNames.CURRENT_QUESTION],
                statement.text);

        // update the db but don't wait for it to finish before sending the response
        updateDb(alexaRequest.userId, gameStatus);

        const alexaSpeak = `${motivation()}.  ${statement.text}?`;

        return alexaResponse.say(`${result}.  ${patOnTheBack(gameStatus)}${alexaSpeak}`)
                            .reprompt(alexaSpeak)
                            .shouldEndSession(false);

    }

}

function checkAnswer(statementType: StatementType, gameStatus: GameStatus) {
    return statementType === gameStatus.statementType;
}

function getResultText(correct: boolean, statement: Statement) {
    const actualType = StatementType.FACT === statement.type ? 'a fact' : `not a fact.  ${statement.explanation}`;
    return correct ? 'That\'s right' : 'That\'s incorrect. It is ' + actualType;
}
