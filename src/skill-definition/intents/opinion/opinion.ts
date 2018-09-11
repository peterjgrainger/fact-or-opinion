import { request, response } from "alexa-app/types";
import { Intent } from "../../models/intents/intent";
import { IntentDefinition } from "../../models/intents/intent-definition";
import { newStatement, StatementType } from "../../models/statements";
import { commonAction } from "../fact-opinion-logic/fact-opinion-logic";

/**
 * Example Intent definition showing slots.
 *
 * @class HelloWorld
 */
export class Opinion extends Intent implements IntentDefinition {
    // internal name of this intent
    public name = 'opinion';
    // phrases that will start his intent
    public utterances = [
        'opinion',
        'That is a opinion',
        'That\'s a opinion',
        'a opinion',
        'false',
    ];
    public action = (alexaRequest: request, alexaResponse: response) =>
        commonAction(alexaRequest, alexaResponse, StatementType.OPINION)
}
