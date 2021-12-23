import ListaCategoria from "./ListaCategorias";

const { Fragment } = require("react");

function FormNuevaPregunta(props) {
    return (
        <Fragment>
            <form className="form-group">
                <ListaCategoria />
                <label>Pregunta</label>
                <input type="text" className="form-control" />

                <div className="form-group">
                    <label>Respuesta correcta</label>
                    <input type="text" className="form-control" />
                </div>
                <div className="form-group">
                    <label>Respuesta incorrecta 1</label>
                    <input type="text" className="form-control" />
                </div>
                <div className="form-group">
                    <label>Respuesta incorrecta 2</label>
                    <input type="text" className="form-control" />
                </div>
                <div className="form-group">
                    <label>Respuesta incorrecta 3</label>
                    <input type="text" className="form-control" />
                </div>
                <button type="submit" className="btn btn-primary btn-block mt-4" onClick={props.guardar}>
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