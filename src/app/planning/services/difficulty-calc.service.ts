import { Injectable } from '@angular/core';

enum Difficulty {
  MuyFacil = 1,
  Facil = 2,
  Intermedia = 3,
  Dificil = 4,
  MuyDificil = 5
}

enum FigureSet {
  Flores = 1,
  Frutas = 2
}

export class EARClassifier {
  /*
  Clasificador de sesiones de Encuentra al Repetido.
  Se usa para asignar una dificultad a las sesiones de Encuentra al Repetido.

  Attributes:
    level:              Cantidad de niveles de la sesión.
    maxStimuli:         Cantidad de máxima de estímulos que puede tener la sesión.
    variableSize:       Están activados los tamaños variables para los estímulos.
    distractors:        Están activados los distractores.
    figureSet:          Set de figuras.
  */
  
  // Atributos estáticos
  numberOfParams : number = 5
  levelPonderation : number = 1.75
  maxStimuliPonderation : number =  2.25
  variableSizePonderation : number = 0.25
  distractorsPonderation : number =  0.25
  figureSetPonderation : number =  0.5
  level: number
  maxStimuli: number
  variableSize : boolean
  distractors : boolean
  figureSet : number

  constructor(level, maxStimuli, variableSize, distractors, figureSet) { 
    this.level = level
    this.maxStimuli = maxStimuli
    this.variableSize = variableSize
    this.distractors = distractors
    this.figureSet = figureSet
  }

  // Calcula la dificultad basándose en la cantidad de niveles de la sesión.
  // Returns:
  // float: Dificultad del nivel.
  levelDifficulty(){
    let result = (this.level/10) * 2 + 1
    return result
  }

  // Calcula la dificultad basándose en la cantidad de estímulos de la sesión.
  // Returns:
  // float: Dificultad de los estímulos.
  maxStimuliDifficulty() {
    let difficulty: any;
    difficulty = 0.00001 * this.maxStimuli ** 4 + 0.008 * this.maxStimuli ** 2 + 1;
    if (difficulty > 5) return 5

    return difficulty;
  }
  // Calcula la dificultad basándose en si está activado el tamaño variable.

  // Returns:
  // float: Dificultad del tamaño variable.
  variableSizeDifficulty(){
    if (this.variableSize) { return 5 } else { return 1 };
  }

  // Calcula la dificultad basándose en si están activados los distractores.

  // Returns:
  // float: Dificultad de los distractores.
  distractorsDifficulty(){
    if (this.distractors) { return 5 }else{ return 1 };
  }
  // Calcula la dificultad basándose en el set de figuras de la sesión.

  // Returns:
  // float: Dificultad del set de figuras.
  figureSetDifficulty(){
    if (this.figureSet == FigureSet.Flores) { return 5 } else { return 1 };
  }

  // Calcula la dificultad haciendo una media ponderada de todas las dificultades.

  // Returns:
  // float: Dificultad de la sesión.
  classifyRaw(){
    let level = this.levelPonderation * this.levelDifficulty()
    let maxStimuli = this.maxStimuliPonderation * this.maxStimuliDifficulty()
    let variableSize = this.variableSizePonderation * this.variableSizeDifficulty()
    let distractors = this.distractorsPonderation * this.distractorsDifficulty()
    let figureSet = this.figureSetPonderation * this.figureSetDifficulty()

    return (level + maxStimuli + variableSize + distractors + figureSet) / this.numberOfParams
  }

  // Clasifica la sesión en una dificultad del enum `Difficulty`.

  // Returns:
  // Difficulty: Dificultad de la sesión.
  classify(){
    return Difficulty[Math.round(this.classifyRaw())];
  }
}

/*
Clasificador de sesiones de Encuentra al Nuevo.
Se usa para asignar una dificultad a las sesiones de 
Encuentra al Nuevo.

Attributes:
  level:              Cantidad de niveles de la sesión.
  variableSize:       Están activados los tamaños variables para los estímulos.
  figureSet:          Set de figuras.
*/
export class EANClassifier {
  // Atributos estáticos
  numberOfParams : number = 3
  levelPonderation : number = 2.25
  variableSizePonderation : number  = 0.25
  figureSetPonderation : number = 0.5
  level : number
  variableSize : boolean
  figureSet : number

  constructor (level, variableSize, figureSet) {
    this.level = level;
    this.variableSize = variableSize
    this.figureSet = figureSet
  }
  // Calcula la dificultad basándose en la cantidad de niveles de la sesión.

  // Returns:
  // float: Dificultad del nivel.
  levelDifficulty() {
    let level = 0.375 * this.level - 0.875
    if (level > 5) { return 5 } else { return level };
  }

  // Calcula la dificultad basándose en si está activado el tamaño variable.

  // Returns:
  // float: Dificultad del tamaño variable.
  variableSizeDifficulty() {
    if (this.variableSize){ return 5 } else { return 1 }
  }

  // Calcula la dificultad basándose en el set de figuras de la sesión.

  // Returns:
  // float: Dificultad del set de figuras.
  figureSetDifficulty() {
    if (this.figureSet == FigureSet.Flores) { return 5 }  else { return 1 }
  }

  // Calcula la dificultad haciendo una media ponderada de todas las dificultades.

  // Returns:
  // float: Dificultad de la sesión.
  classifyRaw() {
    let level = this.levelPonderation * this.levelDifficulty()
    let variableSize = this.variableSizePonderation * this.variableSizeDifficulty()
    let figureSet = this.figureSetPonderation * this.figureSetDifficulty()

    return (level + variableSize + figureSet) / this.numberOfParams
  }

  // Clasifica la sesión en una dificultad del enum `Difficulty`.

  // Returns:
  // Difficulty: Dificultad de la sesión.
  classify() {
    return Difficulty[Math.round(this.classifyRaw())];
  }
}

/*
Clasificador de sesiones de Memorilla.
Se usa para asignar una dificultad a las sesiones de 
Memorilla.

Attributes:
  level:              Cantidad de niveles de la sesión.
  maxStimuli:         Cantidad de máxima de estímulos que puede tener la sesión.
  rows:               Cantidad de filas que tiene la grilla.
  columns:            Cantidad de columnas que tiene la grilla.
*/
export class MClassifier {
  // Atributos estáticos
  numberOfParams : number = 4
  levelPonderation : number = 1.5
  maxStimuliPonderation : number = 1.5
  rowsPonderation : number = 0.5
  columnsPonderation : number = 0.5
  level : number
  maxStimuli: number
  rows : number
  columns : number

  constructor (level, maxStimuli, rows, columns){
    this.level = level
    this.maxStimuli = maxStimuli
    this.rows = rows
    this.columns = columns
  }

  // Calcula la dificultad basándose en la cantidad de niveles de la sesión.

  // Returns:
  // float: Dificultad del nivel.
  levelDifficulty() {
    return 0.6 * this.level - 1
  }

  // Calcula la dificultad basándose en la cantidad de estímulos de la sesión.

  // Returns:
  // float: Dificultad de los estímulos.
  maxStimuliDifficulty() {
    return 0.6 * this.maxStimuli - 1
  }

  // Calcula la dificultad basándose en la cantidad de filas de la sesión.

  // Returns:
  // float: Dificultad de las filas.
  rowsDifficulty() {
    return - 0.125 * this.rows ** 3 + 2.125 * this.rows ** 2 - 10.5 * this.rows + 17
  }

  //  Calcula la dificultad basándose en la cantidad de columnas de la sesión.

  // Returns:
  // float: Dificultad de las columnas.
  columnsDifficulty(){
    return 0.25 * this.columns ** 2 - 0.75 * this.columns
  }

  // Calcula la dificultad haciendo una media ponderada de todas las dificultades.

  // Returns:
  // float: Dificultad de la sesión.
  classifyRaw(){
    let level = this.levelPonderation * this.levelDifficulty();
    let maxStimuli = this.maxStimuliPonderation * this.maxStimuliDifficulty()
    let rows = this.rowsPonderation * this.rowsDifficulty()
    let columns = this.columnsPonderation * this.columnsDifficulty()

    return (level + maxStimuli + rows + columns) / this.numberOfParams
  }

  // Clasifica la sesión en una dificultad del enum `Difficulty`.

  // Returns:
  // Difficulty: Dificultad de la sesión.
  classify(){
    return Difficulty[Math.round(this.classifyRaw())];
  }
}

@Injectable({
  providedIn: 'root'
})

export class DifficultyCalcService {
  constructor () {}

  // Obtiene un juego con sus parámteros y selecciona el clasificador adecuado
  // de acuerdo al nombre del juego recibido
  // @param Game Juego cargado
  // @return String Dificultad calculada acorde al clasificador
  getDifficulty(game) {
    switch (game.name) {
      case "Encuentra al Repetido": {
        return this.useEARclassifier(game);
      }
      case "Encuentra al Nuevo": {
        return this.useEANclassifier(game);
      }
      case "Memorilla": {
        return this.useMClassifier(game);
      }
    }
  }

  // Se le envia una instancia de Encuentra al Repetido y clasifica su dificultad
  // @param Game Objeto del juego con sus parametros
  // @return String Dificultad de EAR calculado
  useEARclassifier(game) {
    let level : any;
    let maxStimuli : any;
    let variableSize : any;
    let distractors : any;
    let figureSet : any;

    game.gameParam.forEach(p => {
      switch (p.param.className) {
        case "MaxLevel" : { level = p.value;}
        case "VariableSize" : { variableSize = p.value;}
        case "Distractors" : { distractors = p.value;}
        case "SpriteSet": { figureSet = p.value;}
        case "FigureQuantity" : { maxStimuli = p.value;}
      }
    });

    let classifier = new EARClassifier(level, maxStimuli, variableSize, distractors, figureSet);
    return classifier.classify();
  }

  // Se le envia una instancia de Encuentra al Nuevo y clasifica su dificultad
  // @param Game Objeto del juego con sus parametros
  // @return String Dificultad de EAN calculado
  useEANclassifier(game) {
    let level : any;
    let variableSize : any;
    let figureSet : any;

    game.gameParam.forEach(p => {
      switch (p.param.className) {
        case "MaxLevel" : { level = p.value;}
        case "VariableSize" : { variableSize = p.value;}
        case "SpriteSet": { figureSet = p.value;}
      }
    });

    let classifier = new EANClassifier(level, variableSize, figureSet);
    return classifier.classify();
  }

  // Se le envia una instancia de Memorilla y clasifica su dificultad
  // @param game Objeto del juego con sus parametros
  // @return String Dificultad de Memorilla calculado
  useMClassifier(game) {
    let level : any;
    let maxStimuli : any;
    let rows : any;
    let columns: any;

    game.gameParam.forEach(p => {
      switch (p.param.className) {
        case "MaxLevel" : { level = p.value;}
        case "NumberOfColumns" : { columns = p.value }
        case "NumberOfRows" : { rows = p.value }
        case "FigureQuantity" : { maxStimuli = p.value;}
      }
    });

    let classifier = new MClassifier(level, maxStimuli, rows, columns);
    return classifier.classify();
  }
}
