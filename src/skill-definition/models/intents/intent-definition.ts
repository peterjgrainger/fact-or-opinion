import {request, response} from 'alexa-app/types';
import { Slot } from "../../models/slots/slot";

export interface IntentDefinition {
    name: string;
    slots: Slot[];
    utterances: string[];
    action(alexaRequest: request, alexaResponse: response): response | Promise<response>;
    schema();
}
