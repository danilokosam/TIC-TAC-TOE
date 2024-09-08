// Función para guardar el estado del juego en el almacenamiento local
export const saveGameToStorage = ({ board, turn }) => {
    // Guardar el estado del tablero en localStorage
    window.localStorage.setItem('board', JSON.stringify(board))
    // Guardar el turno actual en localStorage
    window.localStorage.setItem('turn', turn)
  }
  
  // Función para reiniciar el estado del juego en el almacenamiento local
  export const resetGameStorage = () => {
    // Eliminar el estado del tablero de localStorage
    window.localStorage.removeItem('board')
    // Eliminar el turno actual de localStorage
    window.localStorage.removeItem('turn')
  }

/* 
  localStorage es un propiedad del obetjo window que permite almacenar datos de manera persisten en el navegador
  del usuario. Los datos almacenados en localStorage no tiene fecha de expiración y permanecen disponibles incluso
  después de cerrar el navegador.
*/