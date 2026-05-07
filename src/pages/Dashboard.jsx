import { Row, Col } from 'react-bootstrap';
import { 
  FaMapMarkedAlt, 
  FaSearchLocation, 
  FaPhoneAlt, 
  FaCalendarAlt, 
  FaEnvelope, 
  FaInfoCircle,
  FaServer,
  FaShieldAlt,
  FaPaperPlane
} from 'react-icons/fa';

import DashboardCard from '../components/ui/DashboardCard';
import StatCard from '../components/ui/StatCard';


const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="hero-radar d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3">
        <div>
          <p className="mb-0 text-white-50 fs-6" style={{ maxWidth: '700px' }}>
            Consulte estados, municípios, CEPs, DDDs e feriados nacionais com dados públicos do Brasil.
          </p>
        </div>
      </div>

      <Row className="mb-4 g-3">
        <Col xs={6} lg={3}>
          <StatCard value="5" label="Consultas" icon={<FaMapMarkedAlt />} color="var(--rb-blue)" />
        </Col>
        <Col xs={6} lg={3}>
          <StatCard value="BrasilAPI" label="Dados Abertos" icon={<FaServer />} color="var(--rb-green)" />
        </Col>
        <Col xs={6} lg={3}>
          <StatCard value="React" label="Front-end" icon={<FaShieldAlt />} color="var(--rb-yellow)" />
        </Col>
        <Col xs={6} lg={3}>
          <StatCard value="EmailJS" label="Exportação" icon={<FaPaperPlane />} color="var(--rb-blue)" />
        </Col>
      </Row>

      <div className="mb-3 pb-2" style={{ borderBottom: '1px solid var(--rb-border)' }}>
        <h5 className="fw-bold mb-0" style={{ color: 'var(--rb-blue-dark)', fontSize: '1.05rem' }}>Serviços Disponíveis</h5>
      </div>
      
      <Row className="g-3 mb-3">
        <Col xs={12} md={6} lg={4}>
          <DashboardCard 
            title="Estados e Municípios" 
            description="Consulte a lista de estados e seus municípios." 
            icon={<FaMapMarkedAlt />} 
            to="/app/estados"
            color="#0B2E6D"
          />
        </Col>
        <Col xs={12} md={6} lg={4}>
          <DashboardCard 
            title="Consulta por CEP" 
            description="Busque endereços utilizando o código postal." 
            icon={<FaSearchLocation />} 
            to="/app/cep"
            color="#1F8A4C"
          />
        </Col>
        <Col xs={12} md={6} lg={4}>
          <DashboardCard 
            title="Consulta por DDD" 
            description="Descubra cidades e estados de um código DDD." 
            icon={<FaPhoneAlt />} 
            to="/app/ddd"
            color="#081F4A"
          />
        </Col>
        <Col xs={12} md={6} lg={4}>
          <DashboardCard 
            title="Feriados Nacionais" 
            description="Lista completa de feriados nacionais por ano." 
            icon={<FaCalendarAlt />} 
            to="/app/feriados"
            color="#D4A017"
          />
        </Col>
        <Col xs={12} md={6} lg={4}>
          <DashboardCard 
            title="Exportar Resultado" 
            description="Envie os resultados das consultas por e-mail." 
            icon={<FaEnvelope />} 
            to="/app/exportar"
            color="#14633A"
          />
        </Col>
        <Col xs={12} md={6} lg={4}>
          <DashboardCard 
            title="Sobre o Projeto" 
            description="Equipe desenvolvedora e tecnologias aplicadas." 
            icon={<FaInfoCircle />} 
            to="/app/sobre"
            color="#475569"
          />
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
