import { Injectable } from '@angular/core';

enum Difficulty {
  MuyFacil = 1,
  Facil = 2,
  Intermedia = 3,
  Dificil = 4,
  MuyDificil = 5
}

enum FigureSet {
  Frutas = 1,
  Flores = 2
}

export class EARClassifier {
  numberOfParams : 5
  levelPonderation : 1.75
  maxStimuliPonderation : 2.25
  variableSizePonderation : 0.25
  distractorsPonderation : 0.25
  figureSetPonderation : 0.5
  level: any
  maxStimuli: any
  variableSize : any
  distractors : any
  figureSet : any

  constructor(level, maxStimuli, variableSize, distractors, figureSet) { 
    this.level = level
    this.maxStimuli = maxStimuli
    this.variableSize = variableSize
    this.distractors = distractors
    this.figureSet = figureSet
  }

  levelDifficulty(){
    /*
    Calcula la dificultad basándose en la cantidad de niveles de la sesión.

    Returns:
    float: Dificultad del nivel.
    */
    return (this.level/10) ** 2 + 1
  }

  maxStimuliDifficulty() {
        /*
        Calcula la dificultad basándose en la cantidad de estímulos de la sesión.

        Returns:
        float: Dificultad de los estímulos.
        */
        let difficulty: any;
        difficulty = 0.00001 * this.maxStimuli ** 4 + 0.008 * this.maxStimuli ** 2 + 1;
        if (difficulty > 5) return 5

        return difficulty;
  }

  variableSizeDifficulty(){
        /*
        Calcula la dificultad basándose en si está activado el tamaño variable.

        Returns:
        float: Dificultad del tamaño variable.
        */
        if (this.variableSize) { return 5 } else { return 1 };
  }

  distractorsDifficulty(){
    /*
    Calcula la dificultad basándose en si están activados los distractores.

    Returns:
    float: Dificultad de los distractores.
    */
    if (this.distractors) { return 5 }else{ return 1 };
  }

  figureSetDifficulty(){
        /*
        Calcula la dificultad basándose en el set de figuras de la sesión.

        Returns:
        float: Dificultad del set de figuras.
        */
        if (this.figureSet == FigureSet.Flores) { return 5 } else { return 1 };
  }

  classifyRaw(){
        /*
        Calcula la dificultad haciendo una media ponderada de todas las dificultades.

        Returns:
        float: Dificultad de la sesión.
        */
        let level = this.levelPonderation * this.levelDifficulty()
        let maxStimuli = this.maxStimuliPonderation * this.maxStimuliDifficulty()
        let variableSize = this.variableSizePonderation * this.variableSizeDifficulty()
        let distractors = this.distractorsPonderation * this.distractorsDifficulty()
        let figureSet = this.figureSetPonderation * this.figureSetDifficulty()

        return (level + maxStimuli + variableSize + distractors + figureSet) / this.numberOfParams
  }

  classify(){
        /*
        Clasifica la sesión en una dificultad del enum `Difficulty`.

        Returns:
        Difficulty: Dificultad de la sesión.
        */
    return Difficulty[Math.round(this.classifyRaw())];
  }
}

export class EANClassifier {
  /*
  Clasificador de sesiones de Encuentra al Nuevo.
  Se usa para asignar una dificultad a las sesiones de 
  Encuentra al Nuevo.

  Attributes:
  level:              Cantidad de niveles de la sesión.
  variableSize:       Están activados los tamaños variables para los estímulos.
  figureSet:          Set de figuras.
  */

  numberOfParams = 3
  levelPonderation = 2.25
  variableSizePonderation = 0.25
  figureSetPonderation = 0.5
  level : any
  variableSize : any
  figureSet : any

  constructor (level, variableSize, figureSet) {
    this.level = level;
    this.variableSize = variableSize
    this.figureSet = figureSet
  }

  levelDifficulty() {
    /*
    Calcula la dificultad basándose en la cantidad de niveles de la sesión.

    Returns:
    float: Dificultad del nivel.
    */
    let level = 0.375 * this.level - 0.875
    if (level > 5) { return 5 } else { return level };
  }

  variableSizeDifficulty() {
    if (this.variableSize){
      return 5
    } else {
      return 1
    }
  }

  figureSetDifficulty() {
    if (this.figureSet == FigureSet.Flores) {
      return 5
    }  else {
      return 1
    }
  }

  classifyRaw() {
    let level = this.levelPonderation * this.levelDifficulty()
    let variableSize = this.variableSizePonderation * this.variableSizeDifficulty()
    let figureSet = this.figureSetPonderation * this.figureSetDifficulty()

    return (level + variableSize + figureSet) / this.numberOfParams
  }

  classify() {
    return Difficulty[(Math.round(this.classifyRaw()))]
  }
}

export class MClassifier {
  numberOfParams = 4
  levelPonderation = 1.5
  maxStimuliPonderation = 1.5
  rowsPonderation = 0.5
  columnsPonderation = 0.5
  level : any
  maxStimuli: any
  rows : any
  columns : any

  constructor (level, maxStimuli, rows, columns){
    this.level = level
    this.maxStimuli = maxStimuli
    this.rows = rows
    this.columns = columns
  }

  levelDifficulty() {
    return 0.6 * this.level - 1
  }

  maxStimuliDifficulty() {
    return 0.6 * this.maxStimuli - 1
  }

  rowsDifficulty() {
    return - 0.125 * this.rows ** 3 + 2.125 * this.rows ** 2 - 10.5 * this.rows + 17
  }

  columnsDifficulty(){
    return 0.25 * this.columns ** 2 - 0.75 * this.columns
  }

  classifyRaw(){
    let level = this.levelPonderation * this.levelDifficulty();
    let maxStimuli = this.maxStimuliPonderation * this.maxStimuliDifficulty()
    let rows = this.rowsPonderation * this.rowsDifficulty()
    let columns = this.columnsPonderation * this.columnsDifficulty()

    return (level + maxStimuli + rows + columns) / this.numberOfParams
  }

  classify(){
    return Difficulty[Math.round(this.classifyRaw())]
  }
}

@Injectable({
  providedIn: 'root'
})

export class DifficultyCalcService {
  difficulty : any;
  constructor () {}

  getDifficulty(planningList) {
    switch (planningList.game) {
      case 'Encuentra al Repetido': {
        let classifier = new EARClassifier(planningList.level, planningList.maxStimuli, planningList.variableSize, planningList.distractors, planningList.figureSet);
        this.difficulty = classifier.classify();
        return this.difficulty();
      }
    }
  }
}
