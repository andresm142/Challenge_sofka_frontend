import { Fragment, useState, useEffect } from "react";
import axios from "axios";
import { Modal } from "react-bootstrap";
import config from "../config/config.json";
import { Spinner } from "react-bootstrap";

function Jugar() {

    const [selectedOption, setSelectedOption] = useState("");
    const [showLoading, setShowLoading] = useState(true);
    const [preguntas, setPreguntas] = useState([]);
    const [respuestas, setRespuestas] = useState([]);
    const [puntos, setPuntos] = useState(0);
    const [puntosPregunta, setPuntosPregunta] = useState(0);
    const [nivel, setNivel] = useState(1);

    const [radioButton, setRadioButton] = useState(0);
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

    // Al iniciar se determina si hay un jugador, de lo contrario se piden los datos
    useEffect(() => {
        if (jugador.nombre === "") {
            setShowLoading(true);
            setModal({
                mostrar: true,
                titulo: "Nuevo jugador"
            });
        }
    }, [jugador.nombre]);

    // Salir del juego
    const salir = async () => {
        if (window.confirm("¿Estás seguro de que quieres salir del juego?")) {
            handleGuardar();
        }
    };

    // Al introducir texto en el input
    const onInputChange = (e) => {
        const [name, value] = [e.target.name, e.target.value];
        setJugador({
            ...jugador,
            [name]: value
        });
    };

    // Al cambiar la seleccion del radio button
    const onRadioChange = (e) => {
        setSelectedOption(e.target.id);
        // console.log(e.target.value);
        setRadioButton(e.target.value);

    };

    // Se cierra el modal y queda el jugador nuevo
    const guardar = (e) => {
        e.preventDefault();
        setShowLoading(false);
        setModal({
            mostrar: false,
            titulo: ""
        });
        // console.log(jugador);
    };

    // Al cancelar el modal
    const onCancelarModal = () => {
        const paramNuevos = { ...modal };
        paramNuevos.mostrar = false;
        setModal(paramNuevos);
        window.location.href = "/";
    };


    // Al enviar la respuesta compruena si es correcta 
    const enviarRespuesta = async (e) => {
        e.preventDefault();

        setSelectedOption("");
        const respuesta = radioButton;

        if (respuesta === preguntas.respuestaCorrecta) {
            setPuntos(puntos + puntosPregunta);
            if (nivel < 6) {
                setNivel(nivel + 1);
            }
            setJugador({
                ...jugador,
                puntos: puntos,
                nivel: nivel
            });

        } else {
            alert("Respuesta incorrecta");
            handleGuardar();

        }

    };

    // Se obtiene una pregunta segun el nivel en el que se encuentra el jugador
    useEffect(() => {
        const obtenerPregunta = async () => {
            await axios.get(`${config.HOST}/pregunta/nivel/${nivel}`)
                .then(res => {
                    // console.log(res.data.pregunta);
                    if (res.data.pregunta) {

                        setPuntosPregunta(puntosPregunta * nivel + 10);
                        // console.log(res);
                        setPreguntas(res.data.pregunta);

                        // Se obtienen las respuestas de la pregunta
                        const respuestasObtenidas = [
                            res.data.pregunta.respuesta1,
                            res.data.pregunta.respuesta2,
                            res.data.pregunta.respuesta3,
                            res.data.pregunta.respuestaCorrecta
                        ];

                        // Se crea un array con las respuestas aleatorias
                        const respuestasAleatorias = respuestasObtenidas.sort(() => Math.random() - 0.5);

                        setRespuestas(respuestasAleatorias);

                        setJugador({
                            ...jugador,
                            puntos: puntos,
                            nivel: nivel
                        });

                        setShowLoading(false);
                    } else {
                        alert("No hay preguntas disponibles para el nivel: " + nivel);
                        setPreguntas({});
                        setRespuestas([]);
                        window.location.href = "/";
                    }

                })
                .catch(err => {
                    if (err.response) {
                        alert(err.response.data.message);
                    } else {
                        alert("Error, contacte con el administrador");
                    }
                    console.log(err);
                });
        };
        if (nivel < 6) {
            obtenerPregunta();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [nivel, puntos]);

    // Al superar el nivel 5
    useEffect(() => {
        if (nivel > 5) {

            if (window.confirm("¡Felicidades! ¡Has superado el nivel 5!, ¿Deseas continuar?")) {
                setNivel(1);
                setPuntosPregunta(0);
            } else {
                handleGuardar();
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [nivel]);

    // Guardar datos del jugador
    const handleGuardar = async () => {

        const data = {
            nombre: jugador.nombre,
            apellido: jugador.apellido,
            puntos: puntos,
            nivel: nivel - 1
        }
        setPuntos(0);
        setNivel(1);
        setPreguntas([]);

        await axios.post(`${config.HOST}/jugador/new`, data)
            .then(res => {
                // console.log(res);
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
                Puntos por esta pregunta: {puntosPregunta}
                <div className="container mt-4 shadow p-3 mb-5 bg-body rounded">
                    {showLoading ? <div className="col-sm-12 text-center"><Spinner animation="border" variant="primary" /></div> :
                        <form onSubmit={enviarRespuesta}>
                            <div className="row">
                                <div className="col-md-6">

                                    <div className="col-md-12 d-flex align-items-center">
                                        <h5>{preguntas.pregunta} </h5>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" name="exampleRadios" id="respuesta1" value={respuestas[0]} onChange={onRadioChange} checked={selectedOption === "respuesta1"} />
                                        <label className="form-check-label" htmlFor="respuesta1">
                                            {respuestas[0]}
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" name="exampleRadios" id="respuesta2" value={respuestas[1]} onChange={onRadioChange} checked={selectedOption === "respuesta2"} />
                                        <label className="form-check-label" htmlFor="respuesta2">
                                            {respuestas[1]}
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" name="exampleRadios" id="respuesta3" value={respuestas[2]} onChange={onRadioChange} checked={selectedOption === "respuesta3"} />
                                        <label className="form-check-label" htmlFor="respuesta3">
                                            {respuestas[2]}
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" name="exampleRadios" id="respuesta4" value={respuestas[3]} onChange={onRadioChange} checked={selectedOption === "respuesta4"} />
                                        <label className="form-check-label" htmlFor="respuesta4">
                                            {respuestas[3]}
                                        </label>
                                    </div>
                                </div>
                                <div className="col-md-2">
                                    <button type="submit" className="btn btn-primary btn-lg btn-block mt-4">
                                        Enviar
                                    </button>

                                </div>
                            </div>
                        </form>
                    }
                </div>
            </div>


            <Modal show={modal.mostrar} onHide={onCancelarModal}>
                <Modal.Header closeButton className="bg-primary text-white">
                    <Modal.Title>{modal.titulo}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={guardar} >
                        <div className="form-group">
                            <label htmlFor="nombre">Nombre</label>
                            <input type="text" className="form-control" id="nombre" placeholder="Nombre" name="nombre" onChange={onInputChange} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="apellido">Apellido</label>
                            <input type="text" className="form-control" id="apellido" placeholder="Apellido" name="apellido" onChange={onInputChange} required />
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
