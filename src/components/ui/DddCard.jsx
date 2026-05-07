import { Card, Badge, Row, Col } from 'react-bootstrap';
import { FaPhoneAlt, FaCity } from 'react-icons/fa';

const DddCard = ({ ddd, state, cities, totalOriginal, searchTerm }) => {
  const totalCities = cities.length;

  return (
    <Card className="radar-card border-0 shadow-sm ddd-result-card">
      <Card.Body className="p-4">
        <div className="d-flex justify-content-between align-items-center border-bottom pb-3 mb-4">
          <div className="d-flex align-items-center gap-3">
            <div className="rounded-circle bg-light d-flex align-items-center justify-content-center" style={{ width: '48px', height: '48px', color: 'var(--rb-blue)' }}>
              <FaPhoneAlt size={20} />
            </div>
            <div>
              <h4 className="fw-bold mb-0" style={{ color: 'var(--rb-blue-dark)', letterSpacing: '0.5px' }}>
                DDD {ddd}
              </h4>
            </div>
          </div>
          <Badge bg="success" className="bg-opacity-75 px-3 py-2 fs-6">
            {state}
          </Badge>
        </div>

        <div className="mb-4 ddd-summary bg-light p-3 rounded-3 d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center gap-3">
            <FaCity className="text-muted fs-4" />
            <div>
              <h6 className="mb-0 fw-bold text-dark">Cidades da região</h6>
              <small className="text-muted city-filter-info">
                {searchTerm 
                  ? `Exibindo ${totalCities} de ${totalOriginal} cidade(s)` 
                  : `Total: ${totalOriginal} cidade(s)`}
              </small>
            </div>
          </div>
        </div>

        {totalOriginal === 0 ? (
          <div className="text-muted fst-italic">Nenhuma cidade retornada para este DDD.</div>
        ) : totalCities === 0 ? (
          <div className="text-muted fst-italic city-empty-message text-center py-3">
            Nenhuma cidade encontrada com esse termo.
          </div>
        ) : (
          <Row className="g-2 city-grid">
            {cities.map((city, index) => (
              <Col xs={6} sm={4} md={3} lg={2} key={index}>
                <div className="city-pill bg-white border border-light shadow-sm rounded-pill py-2 px-3 text-center text-truncate w-100" title={city}>
                  <span className="fw-medium text-dark" style={{ fontSize: '0.8rem' }}>{city}</span>
                </div>
              </Col>
            ))}
          </Row>
        )}
      </Card.Body>
    </Card>
  );
};

export default DddCard;
