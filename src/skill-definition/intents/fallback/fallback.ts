import { request, response } from "alexa-app/types";

/**
 * Required
 *
 * @param request
 * @param response
 */
export function fallbackAction(alexaRequest: request, alexaResponse: response) {
    return alexaResponse.say('I\'m not sure what you mean, try again or say help for more options.')
                        .shouldEndSession(false);
}
