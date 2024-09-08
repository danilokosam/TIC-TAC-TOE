import { useState } from "react";
import confetti from "canvas-confetti";

import { Square } from "./components/Square.jsx";
import { TURNS } from "./constants.js";
import { checkWinnerFrom, checkEndGame } from "./logic/board.js";
import { WinnerModal } from "./components/WinnerModal.jsx";
import { saveGameToStorage, resetGameStorage } from "./logic/storage/index.js";

function App() {
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem("board"); // recuperamos el valor de la clave "board"
    if (boardFromStorage) return JSON.parse(boardFromStorage); // parseamos el valor de la clave "board"
    return Array(9).fill(null); // Si boardFromStorage es null, retornamos un array de 9 elementos, todos null
  });

  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem("turn"); // recuperamos el valor de la clave "turn"
    return turnFromStorage ?? TURNS.X; // Si turnFromStorage es null, retornamos TURNS.X
  });

  // null es que no hay ganador, false es que hay un empate
  const [winner, setWinner] = useState(null);

  // Función para resetear el juego y que es llamada en el componente WinnerModal
  const resetGame = () => {
    setBoard(Array(9).fill(null)); // reseteamos el tablero con todas las posiciones vacías(null)
    setTurn(TURNS.X); // cambiamos el turno, inicializamos en X
    setWinner(null); // limpiamos el ganador

    resetGameStorage(); // Función para limpiar el localStorage, viene desde index.js
  };

  // Actualizamos el tablero
  /* 
  Recibimos el indice del tablero y actualizamos el tablero
  */
  const updateBoard = (index) => {
    // No actualizamos esta posición si ya tiene algo o si hay un ganador
    if (board[index] || winner) return; // si no hay un valor en board[index] (es decir false)o hay un ganador, no actualizamos el tablero

    // actualizar el tablero
    const newBoard = [...board]; // creamos una copia del tablero
    newBoard[index] = turn; // actualiza la copia del tablero en la posición index con el valor actual (turn)
    setBoard(newBoard); // actualizamos el estado del tablero con la nueva copia

    // cambiar el turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X; // Determina el nuevo turno, si el turno actual es X, el nuevo turno es O, y viceversa
    setTurn(newTurn); // actualizamos el estado del turno

    // función para guardar la partida, recibe el tablero y el turno, la importamos desde index.js
    saveGameToStorage({
      board: newBoard,
      turn: newTurn,
    });

    // revisar si hay ganador
    const newWinner = checkWinnerFrom(newBoard); // verificamos si hay ganador con la función checkWinnerFrom que viene desde board.js
    if (newWinner) { // si hay un ganador lanzamos la animación y actualizamos el estado
      confetti();
      setWinner(newWinner);
    } else if (checkEndGame(newBoard)) { // revisamos si hay un empate
      setWinner(false); // empate
    }
  };

  return (
    <main className="board">
      <h1>Tic Tac Toe</h1>
      <button onClick={resetGame}>Reset del juego</button>
      <section className="game">
        {board.map((square, index) => (
          <Square key={index} index={index} updateBoard={updateBoard}>
            {square}
          </Square>
        ))}
      </section>

      <section className="turn">
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>

      <WinnerModal resetGame={resetGame} winner={winner} />
    </main>
  );
}

export default App;

/* 
  En la primera parte del codigo useState acepta una función como argumento. Esta función se ejecuta solo una vez
  cuando el componente se monta por primera vez. En este caso, la función intenta obtener un valor almacenado
  en localStorage bajo la clave "board". Si encuentra un valor, lo parsea de JSON a un objeto de JavaScript y lo
  usa como estado inicial. Si no encuentra un valor, inicializa el estado con un array de 9 elementos, todos null.

  ¿Por qué se pasa una función a useState ? 
  * Eficiencia --> La función solo se ejecuta una vez, evitando cálculos inncesarios en cada renderizado.
  * Reutilización --> Permite inicializar el estado con datos persistidos en localStorage, asegurando que el
    estado del tablero se mantenga entre recargas de la página.

  ¿Qué es localStorage?
  LocalStorage es una propiedad del objeto window en JavaScript que permite almacenar datos de manera persistente
  en el navegador del usuario. A diferencia de las cookies, los datos almacenados en localStorage no tiene fecha
  de expiración y permanecen disponibles incluso después de cerrar el navegador.

  Caracteristicas de localStorage:
  * Persistencia --> Los datos almacenados permanecen hasta que se eliminen explícitamente.
  * Almacenamiento basado en clave-valor --> Los datos se almacenan como pares clave-valor.
  * Capacidad --> Tiene una capacidad de almacenamiento de aproximadamente 5MB por dominio.
  * Accesibilidad --> Solo es accesible desde el mismo dominio que los creó.

  Métodos principales de localStorage:
  
  1. setItem(key,value): Guarda un par clave-valor
  localStorage.setItem("nombre","Juan");

  2. getItem(key): Recupera el valor asociado a una clave
  localStorage.getItem("nombre"); // "Juan"

  3. removeItem(key): Elimina el par clave-valor asociado a una clave
  localStorage.removeItem("nombre");

  4. clear(): Elimina todos los pares clave-valor
  localStorage.clear();

  ¿Qué devuelve localStorage.getItem y por qué se debe parsear?
  localStorage.getItem(key) devuelve el valor asociado a la clave especificada como una cadena de texto (string).
  Si la clave no existe, devuelve null.

  ¿Qué devuelve localStorage.removeItem y por qué se debe parsear?
  localStorage.getItem(key) devuelve el valor asociado a la clave especificada como una cadena de texto (string).
  Si la clave no existe, no hace nada.

  ¿Por qué se debe parsear?
  Cuando almacenamos objetos o arrays en localStorage, debemos convertirlos a una cadena de texto usando
  JSON.stringify() antes de almacenarlos. Al recuperarlos, debemos convertirlos de nuevo a su forma original
  usando JSON.parse(). Esto se debe a que localStorage solo puede almacenar datos en forma de texto.

  Ejemplo:
  1. Guardar un objeto:
  const usuario = { nombre: "Juan", edad: 25 };
  localStorage.setItem("usuario", JSON.stringify(usuario));

  2. Recuperar el objeto:
  const usuarioGuardado = localStorage.getItem("usuario");
  const usuarioObj = JSON.parse(usuarioGuardado);
  console.log(usuarioObj.nombre); // "Juan"
*/