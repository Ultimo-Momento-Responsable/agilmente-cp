export const encuentraAlNuevo = {
    veryEasy: {
        params: [
            {
                name: "MaxLevel",
                value: 5
            },
            {
                name: "VariableSize",
                value: false
            },
            {
                name: "SpriteSet",
                value: 2
            }
        ],
        description: "El ejercicio constará de 5 niveles, se usarán frutas como estímulos para el ejercicio"
    },
    easy: {
        params: [
            {
                name: "MaxLevel",
                value: 7
            },
            {
                name: "VariableSize",
                value: false
            },
            {
                name: "SpriteSet",
                value: 2
            }
        ],
        description: "El ejercicio constará de 7 niveles, se usarán frutas como estímulos para el ejercicio"
    },
    medium: {
        params: [
            {
                name: "MaxLevel",
                value: 10
            },
            {
                name: "VariableSize",
                value: true
            },
            {
                name: "SpriteSet",
                value: 2
            },
        ],
        description: "El ejercicio constará de 10 niveles, se usarán frutas como estímulos para el ejercicio, además el tamaño de los estímulos variará"
    },
    hard: {
        params: [
            {
                name: "MaxLevel",
                value: 14
            },
            {
                name: "VariableSize",
                value: false
            },
            {
                name: "SpriteSet",
                value: 1
            },
        ],
        description: "El ejercicio constará de 14 niveles, se usarán flores como estímulos para el ejercicio"
    },
    veryHard: {
        params: [
            {
                name: "MaxLevel",
                value: 17
            },
            {
                name: "VariableSize",
                value: true
            },
            {
                name: "SpriteSet",
                value: 1
            },
        ],
        description: "El ejercicio constará de 17 niveles, se usarán flores como estímulos para el ejercicio, además el tamaño de los estímulos variará"
    },
};

export const encuentraAlRepetido = {
    veryEasy: {
        params: [
            {
                name: "MaxLevel",
                value: 5
            },
            {
                name: "FigureQuantity",
                value: 5
            },
            {
                name: "VariableSize",
                value: false
            },
            {
                name: "Distractors",
                value: false
            },
            {
                name: "SpriteSet",
                value: 2
            },
        ],
        description: "El ejercicio constará de 5 niveles, se usarán frutas como estímulos para el ejercicio, el máximo de estímulos que verá el paciente son 5 frutas"
    },
    easy: {
        params: [
            {
                name: "MaxLevel",
                value: 10
            },
            {
                name: "FigureQuantity",
                value: 9
            },
            {
                name: "VariableSize",
                value: false
            },
            {
                name: "Distractors",
                value: false
            },
            {
                name: "SpriteSet",
                value: 2
            },
        ],
        description: "El ejercicio constará de 10 niveles, se usarán frutas como estímulos para el ejercicio, el máximo de estímulos que verá el paciente son 9 frutas"
    },
    medium: {
        params: [
            {
                name: "MaxLevel",
                value: 15
            },
            {
                name: "FigureQuantity",
                value: 12
            },
            {
                name: "VariableSize",
                value: false
            },
            {
                name: "Distractors",
                value: true
            },
            {
                name: "SpriteSet",
                value: 2
            },
        ],
        description: "El ejercicio constará de 15 niveles, se usarán frutas como estímulos para el ejercicio, el máximo de estímulos que verá el paciente son 12 frutas, además presentará distractores"
    },
    hard: {
        params: [
            {
                name: "MaxLevel",
                value: 20
            },
            {
                name: "FigureQuantity",
                value: 17
            },
            {
                name: "VariableSize",
                value: true
            },
            {
                name: "Distractors",
                value: false
            },
            {
                name: "SpriteSet",
                value: 1
            },
        ],
        description: "El ejercicio constará de 20 niveles, se usarán flores como estímulos para el ejercicio, el máximo de estímulos que verá el paciente son 17 frutas, además el tamaño de los estímulos variará"
    },
    veryHard: {
        params: [
            {
                name: "MaxLevel",
                value: 20
            },
            {
                name: "FigureQuantity",
                value: 20
            },
            {
                name: "VariableSize",
                value: true
            },
            {
                name: "Distractors",
                value: true
            },
            {
                name: "SpriteSet",
                value: 1
            },
        ],
        description: "El ejercicio constará de 20 niveles, se usarán flores como estímulos para el ejercicio, el máximo de estímulos que verá el paciente son 17 frutas, el tamaño de los estímulos variará y presentará distractores"
    },
};

export const memorilla = {
    veryEasy: {
        params: [
            {
                name: "MaxLevel",
                value: 3
            },
            {
                name: "NumberOfRows",
                value: 4
            },
            {
                name: "NumberOfColumns",
                value: 4
            },
            {
                name: "FigureQuantity",
                value: 3
            },
        ],
        description: "El ejercicio constará de 3 niveles, el tamaño de la grilla será de 4x4, la cantidad de estímulos será de 3"
    },
    easy: {
        params: [
            {
                name: "MaxLevel",
                value: 5
            },
            {
                name: "NumberOfRows",
                value: 5
            },
            {
                name: "NumberOfColumns",
                value: 5
            },
            {
                name: "FigureQuantity",
                value: 5
            },
        ],
        description: "El ejercicio constará de 5 niveles, el tamaño de la grilla será de 5x5, la cantidad de estímulos será de 5"
    },
    medium: {
        params: [
            {
                name: "MaxLevel",
                value: 7
            },
            {
                name: "NumberOfRows",
                value: 6
            },
            {
                name: "NumberOfColumns",
                value: 5
            },
            {
                name: "FigureQuantity",
                value: 7
            },
        ],
        description: "El ejercicio constará de 7 niveles, el tamaño de la grilla será de 6x5, la cantidad de estímulos será de 7"
    },
    hard: {
        params: [
            {
                name: "MaxLevel",
                value: 8
            },
            {
                name: "NumberOfRows",
                value: 6
            },
            {
                name: "NumberOfColumns",
                value: 6
            },
            {
                name: "FigureQuantity",
                value: 9
            },
        ],
        description: "El ejercicio constará de 8 niveles, el tamaño de la grilla será de 6x6, la cantidad de estímulos será de 9"
    },
    veryHard: {
        params: [
            {
                name: "MaxLevel",
                value: 10
            },
            {
                name: "NumberOfRows",
                value: 8
            },
            {
                name: "NumberOfColumns",
                value: 6
            },
            {
                name: "FigureQuantity",
                value: 10
            },
        ],
        description: "El ejercicio constará de 10 niveles, el tamaño de la grilla será de 8x6, la cantidad de estímulos será de 10"
    }
};