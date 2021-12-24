import { Fragment } from "react";
import axios from "axios";

function Jugar() {

    // Salir del juego
    const salir = () => {
        if (window.confirm("¿Estás seguro de que quieres salir del juego?")) {
            window.location.href = "/";
        }


    };

    return (
        <Fragment>
            <div className="container mt-4 shadow p-3 mb-5 bg-body rounded">
                <div className="row">
                    <div className="row text-center">
                        <h2>Jugar</h2>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="row text-center">
                    <h4>Estas en el nivel: </h4>
                </div>
            </div>
            <div className="row">
                <div className="row text-center">
                    <h4>Puntos: </h4>
                </div>
            </div>
            <div className="row">
                <div className="row text-center">
                    <div className="col-md-12">
                        <button type="button" className="btn btn-danger btn-lg btn-block mt-4" onClick={salir}>
                            Salir del juego
                        </button>
                    </div>
                </div>
            </div>
            <div className="container mt-4 shadow p-3 mb-5 bg-body rounded">
                A continuación se muestraran una serie de preguntas que iran cambiando de difuculta.
            </div>
            <div className="container mt-4 shadow p-3 mb-5 bg-body rounded">
                Ronda: 1
                <div className="container mt-4 shadow p-3 mb-5 bg-body rounded">
                    <form>
                        <div className="row">
                            <div className="col-md-4">

                                <div className="col-md-4 d-flex align-items-center">
                                    <h5>Pregunta 1 </h5>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="exampleRadios" id="respuesta1" value="option1" />
                                    <label className="form-check-label" htmlFor="repuesta1">
                                        Respuesta 1
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="exampleRadios" id="respuesta2" value="option1" />
                                    <label className="form-check-label" htmlFor="respuesta2">
                                        Respuesta 2
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="exampleRadios" id="respuesta4" value="option1" />
                                    <label className="form-check-label" htmlFor="respuesta3">
                                        Respuesta 3
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="exampleRadios" id="respuesta4" value="option1" />
                                    <label className="form-check-label" htmlFor="respuesta4">
                                        Respuesta 4
                                    </label>
                                </div>
                            </div>
                            <div className="col-md-2">
                                <button type="button" className="btn btn-primary btn-lg btn-block mt-4">
                                    Enviar
                                </button>

                            </div>
                        </div>
                    </form>
                </div>
            </div>

        </Fragment >
    );
}

export default Jugar;
