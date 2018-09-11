import { request, response } from "alexa-app/types";
import { GAME_STATE, GameStatus } from "./game-status";
import { SessionNames } from "./session-variables";
import { newStatement } from "./statements";

const firstTimeMessage = 'I see this is your first time here.  Say, help, if you aren\'t sure at any time';
const returning = 'Hi there again';

export async function startNewGame(alexaRequest: request, alexaResponse: response, gameStatus: GameStatus) {
    const session = alexaRequest.getSession();
    const keepAskedQuestions = gameStatus && gameStatus.gameState === GAME_STATE.NEW_GAME;

    const askedQuestions = keepAskedQuestions ? gameStatus.askedQuestions : [];

    const statement = newStatement(askedQuestions);

    const conditionalStart = gameStatus ? returning : firstTimeMessage;
    const welcomeMessage = `${conditionalStart}.  Is this a fact or an opinion`;

    session.set(SessionNames[SessionNames.TRIES], 0);
    session.set(SessionNames[SessionNames.STATEMENT_TYPE], statement.type);
    session.set(SessionNames[SessionNames.CORRECT_ANSWERS], 0);
    session.set(SessionNames[SessionNames.ASKED_QUESTIONS], askedQuestions);
    session.set(SessionNames[SessionNames.CURRENT_QUESTION], statement.text);
        // tslint:disable-next-line:max-line-length

    return alexaResponse.say(`${welcomeMessage}.  ${statement.text}?`)
                            .shouldEndSession(false);
}
