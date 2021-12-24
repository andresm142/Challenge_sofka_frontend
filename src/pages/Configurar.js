import { Fragment } from "react";
import ListaCategoria from "./components/ListaCategorias";
import ListaPreguntas from "./components/ListaPreguntas";
import FormNuevaCategoria from "./components/FormNuevaCategoria";
import FormNuevaPregunta from "./components/FormNuevaPregunta";
import { Modal } from "react-bootstrap";
import { useState } from "react";
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

    const [categoria, setCategoria] = useState({
        id: "",
        nombre: "",
        nivel: ""
    });

    // Modal categoria nueva
    const nuevaCategoria = () => {
        setParamModal({
            titulo: "Nueva categoria",
            mostrar: true,
            modo: "categoria",
            onGuardar: () => {
                console.log("Guardar");
            },
            onCancelar: () => {
                console.log("Cancelar");
            }
        });
    };

    // Modal pregunta nueva
    const nuevaPregunta = () => {
        setParamModal({
            titulo: "Nueva pregunta",
            mostrar: true,
            modo: "pregunta",
            onGuardar: () => {
                console.log("Guardar");
            },
            onCancelar: () => {
                console.log("Cancelar");
            }
        });
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

    const onGuardar = () => {
        alert("Guardar");
    };

    const onCancelarModal = () => {
        const paramNuevos = { ...paramModal };
        paramNuevos.mostrar = false;
        setParamModal(paramNuevos);
    };

    // Al escoger una categoria de la lista
    const handleCategoriaSeleccionada = (id,nombre,nivel) => {
        console.log(id,nombre,nivel);
        setCategoria({
            id: id,
            nombre: nombre,
            nivel: nivel
        });
        
    };
    

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
                            <ListaCategoria handleCategoria={handleCategoriaSeleccionada} />
                            
                        </div>
                        <div className="col-md-9">
                            Nivel: {categoria.nivel}
                        </div>
                        </div>
                    </div>

                </div>
                <div className="row mt-2">
                    <div className="container shadow p-3 bg-body rounded">
                        <div className="col-md-12">

                            <ListaPreguntas />
                            <ListaPreguntas />
                            <ListaPreguntas />
                            <ListaPreguntas />
                            <ListaPreguntas />

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
                        guardar={onGuardar}
                        cancelar={onCancelarModal}
                    />}
                </Modal.Body>

            </Modal>

        </Fragment>
    );
}

export default Configuracion;