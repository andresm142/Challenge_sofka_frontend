import ListaCategoria from "./ListaCategorias";

const { Fragment, useState } = require("react");


function FormNuevaPregunta(props) {

    const [pregunta, setPregunta] = useState({
        categoria: "",
        pregunta: "",
        respuesta1: "",
        respuesta2: "",
        respuesta3: "",
        respuestaCorrecta: ""

    });

    const onInputChange = (e) => {
        const [name, value] = [e.target.name, e.target.value];
        setPregunta({
            ...pregunta,
            [name]: value
        });
        
    }

    const handleCategoria = (categoria) => {
        console.log(categoria);
        setPregunta({
            ...pregunta,
            categoria: categoria
        });
    }

    const onSubmit = (e) => {
        e.preventDefault();
        props.handlePregunta(pregunta);
        setPregunta({
            categoria: "",
            pregunta: "",
            respuesta1: "",
            respuesta2: "",
            respuesta3: "",
            respuestaCorrecta: ""
        });
    }


    return (
        <Fragment>
            <form onSubmit={onSubmit} className="form-group">
                <ListaCategoria 
                categorias={props.categorias}
                handleCategoria={handleCategoria}/>
                <label>Pregunta</label>
                <input type="text" className="form-control" name="pregunta" required onChange={onInputChange}/>

                <div className="form-group">
                    <label>Respuesta correcta</label>
                    <input type="text" className="form-control" name="respuestaCorrecta" onChange={onInputChange} required />
                </div>
                <div className="form-group">
                    <label>Respuesta incorrecta 1</label>
                    <input type="text" className="form-control" name="respuesta1" onChange={onInputChange} required/>
                </div>
                <div className="form-group">
                    <label>Respuesta incorrecta 2</label>
                    <input type="text" className="form-control" name="respuesta2" onChange={onInputChange} required />
                </div>
                <div className="form-group">
                    <label>Respuesta incorrecta 3</label>
                    <input type="text" className="form-control" name="respuesta3" onChange={onInputChange} />
                </div>
                <button type="submit" className="btn btn-primary btn-block mt-4">
                    Guardar
                </button>
                <button type="button" className="btn btn-secondary btn-block mt-4 ms-2" onClick={props.cancelar}>
                    Cancelar
                </button>

            </form>
        </Fragment>
    );

}
export default FormNuevaPregunta;