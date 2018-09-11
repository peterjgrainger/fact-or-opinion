import { request, response } from "alexa-app/types";
import { stopAction } from "../stop/stop-action";

/**
 * Required alexa intent.  Only change the wording after
 * ended in the response, but you don't need to.
 *
 * End the session on user request
 *
 * @param request alexa-app request type
 * @param response alexa-app response type
 */
export function endAction(alexaRequest: request, alexaResponse: response) {
    return stopAction(alexaRequest, alexaResponse);
}
