import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';

const Menu = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("auth");
    localStorage.removeItem("usuario");
    navigate("/login", { replace: true });
  };

  return (
    <Navbar className="radar-navbar shadow-sm py-2" variant="dark" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand as={NavLink} to="/app" className="fw-bold d-flex align-items-center gap-2 me-4">
          <span className="text-white" style={{ fontSize: '1.05rem' }}>Radar Brasil</span>
          <span className="badge-g8">G8</span>
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="radar-navbar-nav" className="border-0 shadow-none" />
        
        <Navbar.Collapse id="radar-navbar-nav">
          <Nav className="me-auto align-items-lg-center">
            <Nav.Link as={NavLink} to="/app" end>Início</Nav.Link>
            <Nav.Link as={NavLink} to="/app/estados">Estados</Nav.Link>
            <Nav.Link as={NavLink} to="/app/cep">CEP</Nav.Link>
            <Nav.Link as={NavLink} to="/app/ddd">DDD</Nav.Link>
            <Nav.Link as={NavLink} to="/app/feriados">Feriados</Nav.Link>
            <Nav.Link as={NavLink} to="/app/exportar">Exportar</Nav.Link>
            <Nav.Link as={NavLink} to="/app/sobre">Sobre</Nav.Link>
          </Nav>
          
          <Nav className="mt-3 mt-lg-0 border-top border-lg-0 pt-3 pt-lg-0" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
            <Button 
              className="btn-logout"
              onClick={handleLogout}
              aria-label="Sair do sistema"
            >
              Sair
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Menu;
