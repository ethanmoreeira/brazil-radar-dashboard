import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoute from './components/layout/PrivateRoute';
import PrivateLayout from './components/layout/PrivateLayout';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Estados from './pages/Estados';
import EstadoDetalhe from './pages/EstadoDetalhe';
import Cep from './pages/Cep';
import Ddd from './pages/Ddd';
import Feriados from './pages/Feriados';
import Exportar from './pages/Exportar';
import Sobre from './pages/Sobre';
import NotFound from './pages/NotFound';

function App() {
  const isAuthenticated = localStorage.getItem("auth") === "true";

  return (
    <BrowserRouter basename="/brazil-radar-dashboard">
      <Routes>
        <Route path="/" element={<Navigate to={isAuthenticated ? "/app" : "/login"} replace />} />
        <Route path="/login" element={<Login />} />
        
        <Route path="/app" element={<PrivateRoute />}>
          <Route element={<PrivateLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="estados" element={<Estados />} />
            <Route path="estados/:uf" element={<EstadoDetalhe />} />
            <Route path="cep" element={<Cep />} />
            <Route path="ddd" element={<Ddd />} />
            <Route path="feriados" element={<Feriados />} />
            <Route path="exportar" element={<Exportar />} />
            <Route path="sobre" element={<Sobre />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
