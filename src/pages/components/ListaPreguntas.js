const { Fragment } = require("react");

function ListaPreguntas() {
    return (
        <Fragment>

            <div className="container shadow p-3 bg-body rounded m-2">
                <div className="row">
                    <div className="col-md-12">
                        <h5>Pregunta 1</h5>
                    </div>
                </div>
                <div className="row">
                    <div className="col-1 circulo text-center">

                        A

                    </div>
                    <div className="col-8 descripcion">
                        Respuesta 1
                    </div>
                </div>
                <div className="row">
                    <div className="col-1 circulo text-center">

                        B

                    </div>
                    <div className="col-8 descripcion">
                        Respuesta 2
                    </div>
                </div>
                <div className="row">
                    <div className="col-1 circulo text-center">

                        C

                    </div>
                    <div className="col-8 descripcion">
                        Respuesta 3
                    </div>
                </div>
                <div className="row">
                    <div className="col-1 circulo text-center">

                        D

                    </div>
                    <div className="col-8 descripcion">
                        Respuesta 4
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default ListaPreguntas;
