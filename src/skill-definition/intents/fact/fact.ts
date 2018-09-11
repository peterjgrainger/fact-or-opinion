import { request, response } from "alexa-app/types";
import { Intent } from "../../models/intents/intent";
import { IntentDefinition } from "../../models/intents/intent-definition";
import { StatementType } from "../../models/statements";
import { commonAction } from "../fact-opinion-logic/fact-opinion-logic";

/**
 * Example Intent definition showing slots.
 *
 * @class HelloWorld
 */
export class Fact extends Intent implements IntentDefinition {
    // internal name of this intent
    public name = 'fact';
    // phrases that will start his intent
    public utterances = [
        'fact',
        'That is a fact',
        'That\'s a fact',
        'a fact',
        'fat',
        'true',
    ];
    public action = (alexaRequest: request, alexaResponse: response) =>
        commonAction(alexaRequest, alexaResponse, StatementType.FACT)
}
