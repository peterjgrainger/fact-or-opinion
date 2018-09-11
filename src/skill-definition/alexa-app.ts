import { app } from 'alexa-app';
import { AmazonDefault } from './intents/amazon-default/amazon-default';
import { endAction } from './intents/end/end-action';
import { Fact } from './intents/fact/fact';
import { fallbackAction } from './intents/fallback/fallback';
import { helpAction } from './intents/help/help-action';
import { Opinion } from './intents/opinion/opinion';
import { stopAction } from './intents/stop/stop-action';
import { launch } from './launch/launch';
import { IntentDefinition } from './models/intents/intent-definition';

/**
 * Extension of the alexa app module to provide a few
 * helper functions.
 *
 * @class AlexaApp
 * @extends app alexa app library
 */
export class AlexaApp extends app {
    constructor() {
        super("");
    }

    /**
     * Add all the required alexa intents plus one custom one.
     */
    public addIntents() {
        this.launch(launch);
        this.addIntent(new AmazonDefault('stop', stopAction));
        this.addIntent(new AmazonDefault('cancel', endAction));
        this.addIntent(new AmazonDefault('help', helpAction));
        this.addIntent(new AmazonDefault('Fallback', fallbackAction));
        this.addIntent(new Fact());
        this.addIntent(new Opinion());
    }

    /**
     * Call the alexa app API.
     *
     * @param intentDefinition intent to add.
     */
    public addIntent(intentDefinition: IntentDefinition) {
        this.intent(intentDefinition.name, intentDefinition.schema(), intentDefinition.action);
    }

}
