
import Home from './pages/Home';

import Jugar from './pages/Jugar';
import Configurar from './pages/Configurar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Fragment } from 'react';


function App() {


  return (
    <Fragment>
      <div className="container mt-4 shadow p-3 mb-5 bg-body rounded">
        <div className="row">
          <div className="col-md-12 text-center">
            <h1>CHALLENGE - CONCURSO DE PREGUNTAS Y RESPUESTAS</h1>
          </div>
        </div>
      </div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/jugar" element={<Jugar />} />
          <Route path="/configurar" element={<Configurar />} />
        </Routes>
      </Router>
    </Fragment>
  );
}

export default App;
