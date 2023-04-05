import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import PaginaInicial from './PaginaInicial';
import CarroForm from "./components/Formulario/CarroForm";

function App() {
  return (
      <Router>
        <Route path="/" exact component={PaginaInicial} />
        <Route path="/carroform" component={CarroForm} />
      </Router>
  );
}

export default App;
