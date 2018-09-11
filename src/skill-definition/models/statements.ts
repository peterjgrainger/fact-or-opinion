export class Statement {
    public text: string;
    public type: StatementType;
    public shortName: string;
    public explanation: string = '';

    constructor(text: string, type: StatementType, explanation?: string) {
        this.text = text;
        this.type = type;
        this.explanation = explanation;
        this.shortName = text.replace(/\s/g, '').toUpperCase().substr(0, 7);
    }
}

export enum StatementType {
    FACT,
    OPINION,
}

export const statements = [
    new Statement('In Switzerland it is illegal to own just one guinea pig', StatementType.FACT),
    new Statement('Pit bulls are the most dangerous dog',
                 StatementType.OPINION,
                 'It is difficult to prove either way, as, most dangerous, is not easy to measure'),
    // tslint:disable-next-line:max-line-length
    new Statement('By the year twenty twenty five all new cars will be electric', StatementType.OPINION, 'It\'s a prediction of the future'),
    new Statement('Use of fossil fuels have boosted global temperatures', StatementType.FACT),
    new Statement('Global warming is causing extreme weather events, like hurricanes',
                  StatementType.OPINION,
                  'There is no scientific proof that this is true'),
    new Statement('Puppies are cute',
                  StatementType.OPINION,
                  'If you can believe it this view isn\'t shared by everyone'),
    new Statement('Bacon is tasty',
                   StatementType.OPINION,
                  'Lots of people even refuse to eat it'),
    new Statement('Snakes can help predict earthquakes', StatementType.FACT),
    // tslint:disable-next-line:max-line-length
    new Statement('During your lifetime, you will produce enough saliva to fill two swimming pools', StatementType.FACT),
    new Statement('Ketchup was sold in the 1830s as medicine', StatementType.FACT),
    // tslint:disable-next-line:max-line-length
    new Statement('Donald Trump will be president until at least the twentieth of January two thousand and twenty one',
                   StatementType.OPINION,
                 'This is a prediction.  He could resign or be assassinated before then'),
    new Statement('The internet has made people more isolated',
                  StatementType.OPINION,
                  'It may be true for some but for others it makes them more sociable'),
    new Statement('The internet has made people more sociable',
                  StatementType.OPINION,
                 'You are talking to me so obviously not you, but it is easy to become a recluse'),
    new Statement('Immigration causes less jobs for native citizens',
                  StatementType.OPINION,
                 // tslint:disable-next-line:max-line-length
                 'In many cases immigration causes more jobs, there is little evidence linking the two, but neither can be proved'),
    new Statement('stickers on fruit are edible', StatementType.FACT),
    new Statement('The human adult body is sixty percent water', StatementType.FACT),
    new Statement('Evil Knievel broke 433 bones in his career', StatementType.FACT),
    new Statement('Saturn has 62 moons', StatementType.FACT),
    new Statement('Pineapples take two years to grow', StatementType.FACT),
    new Statement('Cheetahs can\'t roar. They can only meow, like domestic house cats', StatementType.FACT),
    new Statement('Most ground coffee contains cockroaches', StatementType.FACT),
    new Statement('Bananas are berries', StatementType.FACT),
    new Statement('Strawberries are fruit', StatementType.FACT),
    new Statement('Gun violence in schools is caused by poor parenting',
                 StatementType.OPINION,
                // tslint:disable-next-line:max-line-length
                'There is evidence that it is a combination of mental illness and access to the weapons.  There is no proof regarding the quality of the parenting'),
    new Statement('Men are better drivers',
                StatementType.OPINION,
               'It is difficult to prove either way as, better, is not easy to measure'),
];

export function newStatement(askedQuestions: string[]) {
    let notAsked = statements.filter((value) => !askedQuestions.includes(value.shortName));
    if (notAsked.length === 0) {
        notAsked = statements;
    }
    const randomNumber = Math.floor(Math.random() * notAsked.length);
    const statement = notAsked[randomNumber];
    return statement;
}

export function isEnd(askedQuestions: string[]) {
 return askedQuestions.length === statements.length;
}

export function endPhrase(hasSession: boolean, correctAnswers: number, tries: number) {
    if (hasSession) {
        return `That's it,  Thanks for playing fact or opinion.  You got ${correctAnswers}
            right out of ${tries}.  See you next time.`;
    } else {
        return 'Thanks for playing.  See you next time.';
    }

}
