import { WINNER_COMBOS } from '../constants.js'

export const checkWinnerFrom = (boardToCheck) => {
  // revisamos todas las combinaciones ganadoras
  // para ver si X u O ganó
  for (const combo of WINNER_COMBOS) { // recorremos todas las combinaciones
    const [a, b, c] = combo // desestructuramos la combinación
    if (
      // revisamos si a, b y c tienen el mismo valor
      boardToCheck[a] &&
      boardToCheck[a] === boardToCheck[b] &&
      boardToCheck[a] === boardToCheck[c]
    ) {
      return boardToCheck[a] // devolvemos el ganador
    }
  }
  // si no hay ganador
  return null
}

export const checkEndGame = (newBoard) => {
  // revisamos si hay un empate
  // si no hay más espacios vacíos
  // en el tablero
  return newBoard.every((square) => square !== null)
}

/* 
  En este archivo encontramos una función que recibe el board como parametro, luego recorremos las combinaciones
  con un bucle for of, luego desestructuramos la constante combo, y revisamos si a, b y c tienen el mismo valor.
  La primera condición revisa si a contiene un valor y no es null, la segunda condición revisa si a y b tienen el
  mismo valor y la tercera condición revisa si b y c tienen el mismo valor. Si todas se cumplen devolvemos al ganador
  en este caso devolvemos boardToCheck[a], de lo contrario devolvemos null.

  La siguiente función checkEndGame recibe el nuevo tablero y revisa si hay un empate utilizando el metodo every.
  Si el board contiene los valores diferentes a null, devolvemos true, de lo contrario devolvemos false.
*/