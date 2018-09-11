import { request, response } from "alexa-app/types";
import { continueGame } from "../models/continue-game";
import { GAME_STATE } from "../models/game-status";
import { startNewGame } from "../models/new-game";
import { findDb } from "../models/persist";

/**
 * Required alexa intent.  Only change the wording after
 * ended in the response, but you don't need to.
 *
 * @param request alexa-app request type
 * @param response alexa-app response type
 */
export async function launch(alexaRequest: request, alexaResponse: response) {

        try {
                const persistedData = await findDb(alexaRequest.userId);
                if (persistedData && persistedData.gameState === GAME_STATE.CONTINUE) {
                        return continueGame(alexaRequest, alexaResponse, persistedData);
                }
                return startNewGame(alexaRequest, alexaResponse, persistedData);
        } catch (error) {
                return startNewGame(alexaRequest, alexaResponse, undefined);
        }

}
