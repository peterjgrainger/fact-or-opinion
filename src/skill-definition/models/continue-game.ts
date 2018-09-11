import { request, response } from "alexa-app/types";
import { GameStatus } from "./game-status";
import { SessionNames} from "./session-variables";
import { newStatement } from "./statements";

export async function continueGame(alexaRequest: request, alexaResponse: response, persistedData: GameStatus) {
        const session = alexaRequest.getSession();

        const statement = newStatement(persistedData.askedQuestions);

        session.set(SessionNames[SessionNames.TRIES], persistedData.tries);
        session.set(SessionNames[SessionNames.STATEMENT_TYPE], statement.type);
        session.set(SessionNames[SessionNames.CORRECT_ANSWERS], persistedData.correctAnswers);
        // tslint:disable-next-line:max-line-length
        session.set(SessionNames[SessionNames.ASKED_QUESTIONS], persistedData.askedQuestions.concat([statement.shortName]));
        session.set(SessionNames[SessionNames.CURRENT_QUESTION], statement.text);
        // tslint:disable-next-line:max-line-length
        const welcomeMessage = `Hi there again, I see you are back for more.  We\'ll pick up where you left off.  Your current score is ${persistedData.correctAnswers} out of ${persistedData.tries}`;

        return alexaResponse.say(`${welcomeMessage}.  ${statement.text}.  Is this a fact or an opinion?`)
                            .reprompt(statement.text + '.  Is this a fact or an opinion?')
                            .shouldEndSession(false);
}
