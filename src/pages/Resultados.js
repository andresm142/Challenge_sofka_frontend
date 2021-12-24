import { Fragment, useEffect, useState } from "react";
import config from "../config/config.json";
import axios from "axios";

function Resultados() {
    const [jugador, setJugador] = useState([]);

    // Se obtienen los datos historicos
    useEffect(() => {
        async function getJugador() {
            await axios.get(`${config.HOST}/jugador`)
                .then(res => {
                    setJugador(res.data.jugadores);
                    // console.log(res.data.jugadores);
                })
                .catch(err => {
                    if (err.response) {
                        alert(err.response.data.message);
                    } else {
                        alert("Error, contacte con el administrador");
                    }
                    console.log(err);
                });
        }
        getJugador();
    }, []);


    return (
        <Fragment>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <button className="btn btn-primary" onClick={() => window.location.href = "/"}>
                            Volver a la pagina de inicio
                        </button>
                    </div>
                </div>
            </div>

            <div className="container mt-4 shadow p-3 mb-5 bg-body rounded">
                <div className="row">
                    <div className="row text-center">
                        <h2>Resultados historicos</h2>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Apellido</th>
                                    <th scope="col">Puntaje</th>
                                    <th scope="col">Nivel al finalizar el juego</th>
                                </tr>
                            </thead>
                            <tbody>
                                {jugador.map((jugador, index) => (
                                    <tr key={jugador._id}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{jugador.nombre}</td>
                                        <td>{jugador.apellido}</td>
                                        <td>{jugador.puntos}</td>
                                        <td>{jugador.nivel}</td>
                                    </tr>
                                ))}
                            </tbody>

                        </table>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default Resultados;