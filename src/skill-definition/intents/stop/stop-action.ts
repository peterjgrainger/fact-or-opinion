import { request, response, session } from "alexa-app/types";
import { GAME_STATE, GameStatus } from "../../models/game-status";
import { updateDb } from "../../models/persist";
import { endPhrase } from "../../models/statements";

/**
 * Required alexa intent.  Only change the wording after
 * stopped in the response, but you don't need to.
 *
 * Stop the session on user request
 *
 * @param request alexa-app request type
 * @param response alexa-app response type
 */
export function stopAction(alexaRequest: request, alexaResponse: response) {
    const gameStatus = new GameStatus(alexaRequest.getSession(), GAME_STATE.NEW_GAME);
    updateDb(alexaRequest.userId, gameStatus);
    // tslint:disable-next-line:max-line-length
    return alexaResponse.say(endPhrase(alexaRequest.hasSession(), +gameStatus.correctAnswers, gameStatus.tries))
                        .shouldEndSession(true);
}
