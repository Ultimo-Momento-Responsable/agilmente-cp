export interface IResult {
    completeDatetime: Date;
    canceled: boolean;
    mistakes: 0;
    mistakesPerLevel: number;
    successes: 5;
    successesPerLevel: number;
    timeBetweenSuccesses: number[];
    totalTime: number;
    timePerLevel: number[];
    score: number;
    game: string;
    hayUnoRepetidoSessionId: number;
    id: number;
    patient: string;
    params: any[];
};