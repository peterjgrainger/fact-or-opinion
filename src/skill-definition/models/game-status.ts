import { session } from "alexa-app/types";
import { SessionVariables } from "./session-variables";

export enum GAME_STATE {
    CONTINUE,
    NEW_GAME,
    ALL_QUESTIONS_ASKED,
}

export class GameStatus extends SessionVariables {
    public gameState: GAME_STATE;

    constructor(inputSession: session, gameState: GAME_STATE) {
        super(inputSession);
        this.gameState = gameState;
    }
}
