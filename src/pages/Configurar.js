import { Fragment } from "react";
import ListaCategoria from "./components/ListaCategorias";
import ListaPreguntas from "./components/ListaPreguntas";
import FormNuevaCategoria from "./components/FormNuevaCategoria";
import FormNuevaPregunta from "./components/FormNuevaPregunta";
import { Modal } from "react-bootstrap";
import { useState, useEffect } from "react";
import config from "../config/config.json";
import axios from "axios";




function Configuracion() {
    const [paramModal, setParamModal] = useState({
        titulo: "",
        mostrar: false,
        modo: "",
        onGuardar: null,
        onCancelar: null

    });

    const [categoriaSelect, setCategoriaSelect] = useState({
        id: "",
        nombre: "",
        nivel: ""
    });

    const [preguntas, setPreguntas] = useState([]);

    // Modal categoria nueva
    const nuevaCategoria = () => {
        setParamModal({
            titulo: "Nueva categoria",
            mostrar: true,
            modo: "categoria",

        });
    };

    // Modal pregunta nueva
    const nuevaPregunta = () => {
        setParamModal({
            titulo: "Nueva pregunta",
            mostrar: true,
            modo: "pregunta",

        });
    };

    // Pagina de inicio
    const inicio = () => {
        window.location.href = "/";
    };

    // Guardar categoria
    const handleCategoria = async (categoria) => {
        console.log(categoria);
        try {
            await axios.post(`${config.HOST}/categoria/new`, categoria)
                .then(res => {
                    console.log(res);
                    setParamModal({
                        titulo: "",
                        mostrar: false,
                        modo: ""
                    });
                    window.location.reload();

                })
                .catch(err => {
                    if (err.response) {

                        alert(err.response.data.message);
                    } else {
                        alert("Error, contacte con el administrador");
                    }
                    console.log(err);
                }
                );

        } catch (error) {
            console.log(error)
        }
    };

    // Guardar pregunta
    const handlePregunta = async (pregunta) => {
        console.log(pregunta);
        try {
            await axios.post(`${config.HOST}/pregunta/new`, pregunta)
                .then(res => {
                    setParamModal({
                        titulo: "",
                        mostrar: false,
                        modo: ""
                    });
                    alert(res.data.message);
                    window.location.reload();
                })
                .catch(err => {
                    if (err.response) {
                        alert(err.response.data.message);
                    } else {
                        alert("Error, contacte con el administrador");
                    }
                    setParamModal({
                        titulo: "",
                        mostrar: false,
                        modo: ""
                    });
                });
        } catch (error) {
            console.log(error)
        }
    };

    const onCancelarModal = () => {
        const paramNuevos = { ...paramModal };
        paramNuevos.mostrar = false;
        setParamModal(paramNuevos);
    };

    // Al escoger una categoria de la lista
    const handleCategoriaSeleccionada = (id, nombre, nivel) => {

        setCategoriaSelect({
            id: id,
            nombre: nombre,
            nivel: nivel
        });

    };

    // Obtener lista de preguntas de la categoria seleccionada
    useEffect(() => {

        async function getListaPreguntas() {
            if (categoriaSelect.id !== "") {

                await axios.get(`${config.HOST}/pregunta/categoria/${categoriaSelect.id}`)
                    .then(res => {
                        console.log(res);
                        setPreguntas(res.data.preguntas);
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
        }
        getListaPreguntas();
    }, [categoriaSelect]);

    // Crear el listado de preguntas de la categoria seleccionada
    const listaPreguntas = preguntas.map((pregunta) => (
        <ListaPreguntas
            key={pregunta._id}
            preguntas={pregunta}
        />
    ));


    return (
        <Fragment>
            <div className="container mt-4 shadow p-3 mb-5 bg-body rounded">
                <div className="row">
                    <div className="row text-center">
                        <h2>Configuración</h2>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <button type="button" className="btn btn-primary btn-lg btn-block mt-4" onClick={nuevaCategoria}>
                            Crear nueva categoría
                        </button>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <button type="button" className="btn btn-primary btn-lg btn-block mt-4" onClick={nuevaPregunta}>
                            Crear nueva pregunta
                        </button>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <button type="button" className="btn btn-secondary btn-lg btn-block mt-4" onClick={inicio}>
                            Pagina de inicio
                        </button>
                    </div>
                </div>
                <div className="row mt-2">
                    <div className="col-md-12">
                        <div className="container shadow p-3 bg-body rounded">
                            <h4>Lista de preguntas segun categoria</h4>
                        </div>
                    </div>

                </div>
                <div className="row mt-2">
                    <div className="container shadow p-3 bg-body rounded">
                        <div className="row align-items-center">
                            <div className="col-md-3">
                                <ListaCategoria 
                                    handleCategoria={handleCategoriaSeleccionada} />

                            </div>
                            <div className="col-md-9">
                                Nivel: {categoriaSelect.nivel}
                            </div>
                        </div>
                    </div>

                </div>
                <div className="row mt-2">
                    <div className="container shadow p-3 bg-body rounded">
                        <div className="col-md-12">
                            {listaPreguntas}


                        </div>
                    </div>
                </div>
            </div>


            <Modal show={paramModal.mostrar} onHide={onCancelarModal}>
                <Modal.Header closeButton className="bg-primary text-white">
                    <Modal.Title>{paramModal.titulo}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {paramModal.modo === "categoria" ? <FormNuevaCategoria
                        handleCategoria={handleCategoria}
                        cancelar={onCancelarModal}
                    /> : <FormNuevaPregunta
                        
                        handlePregunta={handlePregunta}
                        cancelar={onCancelarModal}
                    />}
                </Modal.Body>

            </Modal>

        </Fragment>
    );
}

export default Configuracion;