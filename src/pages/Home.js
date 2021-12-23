import { Fragment } from "react";



function Home () {
    const iniciarJuego = () => {
        console.log('Iniciando juego');
        window.location.href = '/jugar';
      }
    
      const configurarJuego = () => {
        window.location.href = '/configurar';
      }

    return (
        <Fragment>
      <div className="container mt-4 shadow p-3 mb-5 bg-body rounded">
        
        <div className="row">
          <div className="col-md-4">
            <button type="button" className="btn btn-primary btn-lg btn-block mt-4" onClick={iniciarJuego}>
              Iniciar como jugador
            </button>
          </div>

        </div>
        <div className="row">
          <div className="col-md-4">
            <button type="button" className="btn btn-primary btn-lg btn-block mt-4" onClick={configurarJuego}>
              Configurar juego
            </button>
          </div>
        </div>
      </div>

 
    </Fragment>
    );
}

export default Home;