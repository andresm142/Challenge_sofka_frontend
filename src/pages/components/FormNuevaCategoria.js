const { Fragment } = require("react");

function FormNuevaCategoria(props) {
    return (
        <Fragment>
            <form className="form-group">
                <label>Nombre</label>
                <input type="text" className="form-control" />
                <label>Nivel</label>
                <select className="form-control">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                </select>


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
export default FormNuevaCategoria;