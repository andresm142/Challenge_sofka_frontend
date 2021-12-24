
const { Fragment, useState } = require("react");

function FormNuevaCategoria(props) {

    const [categoria, setCategoria] = useState({
        nombre: "",
        nivel: 1
    });

    // Al cambiar el valor de un input
    const onInputChange = (e) => {
        const [name, value] = [e.target.name, e.target.value];
        setCategoria({
            ...categoria,
            [name]: value
        });
        
    }

    // Al darle click al boton guardar
    const onSubmit = (e) => {
        e.preventDefault();
        props.handleCategoria(categoria);
        setCategoria({
            nombre: "",
            nivel: 1
        });
    }


    return (
        <Fragment>
            <form onSubmit={onSubmit} className="form-group">
                <label>Nombre</label>
                <input type="text" className="form-control" name="nombre" onChange={onInputChange} required/>
                <label>Nivel</label>
                <select className="form-control" name="nivel" onChange={onInputChange}>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                </select>


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
export default FormNuevaCategoria;