interface Result {
    mgp: number;
    canceled: boolean;
}

export class SessionMGPCalculator {
    private _currentMGP: number;
    private _currentTendency: number;

    /**
     * Esta calculadora solamente está pensada para calcular el MGP
     * de las sesiones y el de las planificaciones (mismo cálculo).
     * @param mgps Lista de resultados ordenados por fecha, donde el primer
     * elemento es el más nuevo.
     */
    constructor(private readonly results: Result[]) {}

    /**
     * Calcula el MGP actual en base a los MGPs que se pasaron
     * en el contstructor.
     * 
     * Si solamente hay partidas canceladas, el MGP es -1, para poder \
     * acomodar la parte visual.
     * @returns MGP.
     */
    currentMGP(): number {
        if (!this._currentMGP) {
            this.calculate();
        }

        return this._currentMGP;
    }

    /**
     * Calcula la tendencia actual en base a los MGPs que se pasaron
     * en el contstructor.
     * 
     * Si solamente hay partidas canceladas, la tendencia es 0.
     * @returns Tendencia.
     */
    currentTendency(): number {
        if (!this._currentTendency) {
            this.calculate();
        }

        return this._currentTendency;
    }

    /**
     * Calcula el MGP y la tendencia.
     * El MGP es el promedio de todos los MGPs que se pasaron en el constructor.
     * La tendencia es la resta entre el MGP actual y el "previo".
     */
    private calculate() {
        const mgps = this.filterResults();
        const n = mgps.length;

        if (n === 0) {
            this._currentMGP = -1;
            this._currentTendency = 0;
            return;
        }

        const partialSumMGP = mgps.reduce((previous, current) => previous + current);

        this._currentMGP = 1/n * partialSumMGP;

        const previousMGP = 1/(n-1) * (partialSumMGP-mgps[0]);
        this._currentTendency = this._currentMGP - previousMGP;
    } 

    /**
     * Filtra y mapea los datos de la lista de resultados para que no considere
     * las partidas canceladas.
     * @returns La lista de MGPs.
     */
    private filterResults(): number[] {
        return this.results.filter(r => !r.canceled).map(r => r.mgp);
    }
}