export class SessionMGPCalculator {
    private _currentMGP: number;
    private _currentTendency: number;

    /**
     * Esta calculadora solamente está pensada para calcular el MGP
     * de las sesiones y el de las planificaciones (mismo cálculo).
     * @param mgps Lista de MGPs ordenados por fecha, donde el primer
     * elemento es el más nuevo.
     */
    constructor(private readonly mgps: number[]) {}

    /**
     * Calcula el MGP actual en base a los MGPs que se pasaron
     * en el contstructor.
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
        const partialSumMGP = this.mgps.reduce((previous, current) => previous + current);
        const n = this.mgps.length;

        this._currentMGP = 1/n * partialSumMGP;

        const previousMGP = 1/(n-1) * (partialSumMGP-this.mgps[0]);
        this._currentTendency = this._currentMGP - previousMGP;
    } 
}