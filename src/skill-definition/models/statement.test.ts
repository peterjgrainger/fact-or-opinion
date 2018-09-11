import test from "ava";
import { newStatement, Statement } from "./statements";

test((t) => {
    const statement = newStatement([]);
    t.is(statement instanceof Statement, true);

});
