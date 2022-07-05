export interface IResult {
    completeDatetime: Date;
    canceled: boolean;
    mistakes: number;
    mistakesPerLevel: number;
    successes: number;
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
    mgp: number;
};