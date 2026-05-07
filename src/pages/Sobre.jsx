import SectionHeader from '../components/layout/SectionHeader';
import { Card, ListGroup, Badge, Alert, Row, Col } from 'react-bootstrap';
import { FaGraduationCap, FaCode, FaUsers } from 'react-icons/fa';

const Sobre = () => {
  return (
    <div className="dashboard-container">
      <SectionHeader 
        title="Sobre o Projeto" 
        subtitle="Projeto acadêmico de Desenvolvimento Web Front End."
      />
      
      <Alert 
        className="mb-4 border-0 shadow-sm d-flex align-items-center rounded-3" 
        style={{ 
          backgroundColor: 'var(--rb-blue)', 
          borderLeft: '4px solid var(--rb-yellow) !important',
          color: '#fff'
        }}
      >
        <FaGraduationCap size={20} className="me-3 flex-shrink-0" style={{ color: 'var(--rb-yellow)' }} />
        <span style={{ fontSize: '0.88rem' }}>
          Este projeto utiliza dados públicos da <strong>BrasilAPI</strong> e possui finalidade estritamente acadêmica.
        </span>
      </Alert>
      
      <Row className="g-4 mb-4">
        <Col lg={6}>
          <Card className="radar-card border-0 h-100">
            <div style={{ height: '3px', background: 'linear-gradient(90deg, var(--rb-blue), var(--rb-green))' }}></div>
            <Card.Header className="bg-transparent border-0 pt-4 pb-0 px-4">
              <h5 className="fw-bold d-flex align-items-center gap-2 mb-0" style={{ color: 'var(--rb-blue-dark)', fontSize: '1rem' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: 'var(--rb-radius-md)', backgroundColor: 'var(--rb-blue-light)', color: 'var(--rb-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <FaCode size={14} />
                </div>
                Informações do Projeto
              </h5>
            </Card.Header>
            <Card.Body className="p-4 pt-3">
              <ListGroup variant="flush">
                <ListGroup.Item className="px-0 py-3 d-flex justify-content-between align-items-center border-light">
                  <span className="fw-medium" style={{ color: 'var(--rb-text-secondary)', fontSize: '0.88rem' }}>Tema</span>
                  <span className="fw-bold" style={{ fontSize: '0.88rem', color: 'var(--rb-blue-dark)' }}>Dashboard de Dados Regionais</span>
                </ListGroup.Item>
                <ListGroup.Item className="px-0 py-3 border-light">
                  <div className="fw-medium mb-2" style={{ color: 'var(--rb-text-secondary)', fontSize: '0.88rem' }}>Tecnologias</div>
                  <div className="d-flex flex-wrap gap-2">
                    {[
                      { name: 'React', bg: '#087EA4' },
                      { name: 'Vite', bg: '#646CFF' },
                      { name: 'React Router DOM', bg: '#CA4245' },
                      { name: 'React-Bootstrap', bg: '#7952B3' },
                      { name: 'Axios', bg: '#5A29E4' },
                      { name: 'EmailJS', bg: '#B8860B' },
                    ].map(tech => (
                      <Badge 
                        key={tech.name} 
                        className="fw-semibold" 
                        style={{ 
                          fontSize: '0.73rem', 
                          backgroundColor: tech.bg, 
                          color: '#fff', 
                          padding: '0.4em 0.7em',
                          borderRadius: '50rem'
                        }}
                      >
                        {tech.name}
                      </Badge>
                    ))}
                  </div>
                </ListGroup.Item>
                <ListGroup.Item className="px-0 py-3 border-0">
                  <div className="fw-medium mb-2" style={{ color: 'var(--rb-text-secondary)', fontSize: '0.88rem' }}>APIs consumidas (BrasilAPI)</div>
                  <div className="d-flex flex-wrap gap-2">
                    {['IBGE Estados', 'IBGE Municípios', 'CEP', 'DDD', 'Feriados'].map(api => (
                      <Badge 
                        key={api} 
                        className="fw-semibold" 
                        style={{ 
                          fontSize: '0.73rem', 
                          backgroundColor: 'var(--rb-green)', 
                          color: '#fff',
                          padding: '0.4em 0.7em',
                          borderRadius: '50rem'
                        }}
                      >
                        {api}
                      </Badge>
                    ))}
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
        
        <Col lg={6}>
          <Card className="radar-card border-0 h-100" style={{ position: 'relative', overflow: 'hidden' }}>
            <div style={{ height: '3px', background: 'linear-gradient(90deg, var(--rb-yellow), var(--rb-green))' }}></div>
            
            <div 
              aria-hidden="true"
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                backgroundImage: 'url(/college.jpg)',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                opacity: 0.18,
                pointerEvents: 'none',
                zIndex: 0,
              }}
            />

            <Card.Header className="bg-transparent border-0 pt-4 pb-0 px-4" style={{ position: 'relative', zIndex: 1 }}>
              <h5 className="fw-bold d-flex align-items-center gap-2 mb-0" style={{ color: 'var(--rb-blue-dark)', fontSize: '1rem' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: 'var(--rb-radius-md)', backgroundColor: 'var(--rb-yellow-light)', color: '#B8860B', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <FaUsers size={14} />
                </div>
                Integrantes — G8
              </h5>
            </Card.Header>
            <Card.Body className="p-4 pt-3" style={{ position: 'relative', zIndex: 1 }}>
              <ListGroup variant="flush">
                {[
                  { initials: 'GF', name: 'Gabriel Fagundes Motta', color: '#0B2E6D' },
                  { initials: 'ID', name: 'Ítalo Dias Moreira Campos', color: '#1F8A4C' },
                  { initials: 'JL', name: 'Julyanne Lauriano Genevain', color: '#5B21B6' },
                  { initials: 'RG', name: 'Rakel Garcia da Silva', color: '#B8860B' },
                  { initials: 'RR', name: 'Raphaell Reiff Galoni', color: '#0E7490' }
                ].map((member, idx, arr) => (
                  <ListGroup.Item 
                    key={member.initials} 
                    className={`px-0 py-3 d-flex align-items-center ${idx === arr.length - 1 ? 'border-0' : ''}`}
                    style={{ backgroundColor: 'transparent', borderColor: 'rgba(0,0,0,0.08)' }}
                  >
                    <div 
                      className="me-3" 
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: 'var(--rb-radius-md)',
                        fontSize: '0.78rem',
                        fontWeight: '800',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: `${member.color}12`,
                        color: member.color,
                        flexShrink: 0,
                      }}
                    >
                      {member.initials}
                    </div>
                    <span className="fw-medium" style={{ fontSize: '0.92rem' }}>{member.name}</span>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Sobre;
