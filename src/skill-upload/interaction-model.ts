import {intent} from "alexa-app/types";
import * as utterances from "alexa-utterances";
import { getSlotTypesForModel, slotTypes } from "../skill-definition/models/slots/slot-types";

/**
 * Create an AWS CLI compliant interaction model
 * @param intents
 * @param PublishingInformation
 */
export function interactionModel(intents: intent[], PublishingInformation) {
    return {
        interactionModel: {
            languageModel: {
                intents: intents.map((singleIntent) => {
                    return {
                        name: singleIntent.name,
                        samples: singleIntent.utterances.reduce((acc, value) => acc.concat(utterances(value)), []),
                        slots : Object.entries(singleIntent.slots).map((value) => {
                            return {
                                name: value[0],
                                type: value[1],
                            };
                        }),
                    };
                }),
                invocationName: PublishingInformation.NAME,
                types: getSlotTypesForModel(),
            },
        },
    };
}
