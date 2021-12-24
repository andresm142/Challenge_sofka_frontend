const { Fragment } = require("react");

function ListaPreguntas(props) {
     // Mostrar las respuestas en forma aleatoria
    const respuestas = [
        props.preguntas.respuesta1,
        props.preguntas.respuesta2,
        props.preguntas.respuesta3,
        props.preguntas.respuestaCorrecta
    ];
    const respuestasAleatorias = respuestas.sort(() => Math.random() - 0.5);
    
    return (
        <Fragment>

            <div className="container shadow p-3 bg-body rounded m-2">
                <div className="row">
                    <div className="col-md-12">
                        <h5>{props.preguntas.pregunta}</h5>
                    </div>
                </div>
                <div className="row">
                    <div className="col-1 circulo text-center">

                        A)

                    </div>
                    <div className="col-8 descripcion">
                        {respuestasAleatorias[0]}
                    </div>
                </div>
                <div className="row">
                    <div className="col-1 circulo text-center">

                        B)

                    </div>
                    <div className="col-8 descripcion">
                        {respuestasAleatorias[1]}
                    </div>
                </div>
                <div className="row">
                    <div className="col-1 circulo text-center">

                        C)

                    </div>
                    <div className="col-8 descripcion">
                        {respuestasAleatorias[2]}
                    </div>
                </div>
                <div className="row">
                    <div className="col-1 circulo text-center">

                        D)

                    </div>
                    <div className="col-8 descripcion">
                        {respuestasAleatorias[3]}
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default ListaPreguntas;
