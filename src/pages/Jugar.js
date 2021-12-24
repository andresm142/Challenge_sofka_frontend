import { Fragment, useState, useEffect } from "react";
import axios from "axios";
import { Modal } from "react-bootstrap";
import config from "../config/config.json";

function Jugar() {

    const [preguntas, setPreguntas] = useState([]);
    const [puntos, setPuntos] = useState(0);
    const [nivel, setNivel] = useState(1);
    const [jugador, setJugador] = useState({
        nombre: "",
        apellido: "",
        puntos: 0,
        nivel: 1
    });

    const [modal, setModal] = useState({
        mostrar: false,
        titulo: ""
    });

    useEffect(() => {
        if (jugador.nombre === "") {
            setModal({
                mostrar: true,
                titulo: "Nuevo jugador"
            });
        }
    }, [jugador.nombre]);

    // Salir del juego
    const salir = async () => {
        if (window.confirm("¿Estás seguro de que quieres salir del juego?")) {

            await axios.post(`${config.HOST}/jugador/new`, jugador)
                .then(res => {
                    console.log(res);
                    window.location.href = "/";
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
    };

    const onInputChange = (e) => {
        const [name, value] = [e.target.name, e.target.value];
        setJugador({
            ...jugador,
            [name]: value
        });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        setModal({
            mostrar: false,
            titulo: ""
        });
        console.log(jugador);
    };

    const onCancelarModal = () => {
        const paramNuevos = { ...modal };
        paramNuevos.mostrar = false;
        setModal(paramNuevos);
        window.location.href = "/";
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
                    <h4>{jugador.nombre} {jugador.apellido} </h4>
                </div>
            </div>
            <div className="row">
                <div className="row text-center">
                    <h4>Estas en el nivel: {nivel} </h4>
                </div>
            </div>
            <div className="row">
                <div className="row text-center">
                    <h4>Puntos: {puntos} </h4>
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
                Puntos por esta pregunta: {puntos * nivel + 10}
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


            <Modal show={modal.mostrar} onHide={onCancelarModal}>
                <Modal.Header closeButton className="bg-primary text-white">
                    <Modal.Title>{modal.titulo}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={onSubmit} >
                        <div className="form-group">
                            <label htmlFor="nombre">Nombre</label>
                            <input type="text" className="form-control" id="nombre" placeholder="Nombre" name="nombre" onChange={onInputChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="apellido">Apellido</label>
                            <input type="text" className="form-control" id="apellido" placeholder="Apellido" name="apellido" onChange={onInputChange} />
                        </div>

                        <div className="row text-center">

                            <div className="col-md-6">
                                <button type="submit" className="btn btn-primary btn-lg btn-block mt-4">
                                    Guardar
                                </button>
                            </div>
                            <div className="col-md-6">
                                <button type="button" className="btn btn-danger btn-lg btn-block mt-4" onClick={onCancelarModal}>
                                    Cancelar
                                </button>
                            </div>
                        </div>


                    </form>

                </Modal.Body>

            </Modal>

        </Fragment >
    );
}

export default Jugar;
