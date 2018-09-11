import { session } from "alexa-app/types";
import { Statement, StatementType } from "./statements";

export enum SessionNames {
    TRIES,
    CORRECT_ANSWERS,
    STATEMENT_TYPE,
    ASKED_QUESTIONS,
    CURRENT_QUESTION,
}

export class SessionVariables {
    public statementType?: StatementType;
    public tries: number;
    public correctAnswers: number;
    public askedQuestions: string[];
    public currentQuestion: string;
    constructor(inputSession: session) {
        this.correctAnswers = inputSession.get(SessionNames[SessionNames.CORRECT_ANSWERS]);
        this.currentQuestion = inputSession.get(SessionNames[SessionNames.CURRENT_QUESTION]);
        this.statementType = inputSession.get(SessionNames[SessionNames.STATEMENT_TYPE]);
        this.tries = inputSession.get(SessionNames[SessionNames.TRIES]);
        this.askedQuestions = inputSession.get(SessionNames[SessionNames.ASKED_QUESTIONS]);
    }

    public getStatementTypeAsString() {
        return StatementType[this.statementType];
    }

    public getAskedQuestions(statement: Statement) {
        return this.askedQuestions.concat(statement.shortName);
    }
}
