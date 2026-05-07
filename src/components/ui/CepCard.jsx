import { Card, Badge, Row, Col } from 'react-bootstrap';
import { formatCep } from '../../utils/formatters';
import { FaMapMarkerAlt, FaLocationArrow, FaCity, FaRoad } from 'react-icons/fa';

const CepCard = ({ data }) => {
  if (!data) return null;

  const hasLocation = data.location && data.location.coordinates && data.location.coordinates.longitude && data.location.coordinates.latitude;

  return (
    <Card className="radar-card border-0 shadow-sm">
      <Card.Body className="p-4">
        <div className="d-flex justify-content-between align-items-center border-bottom pb-3 mb-4">
          <div className="d-flex align-items-center gap-2">
            <div className="rounded-circle bg-light d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px', color: 'var(--rb-blue)' }}>
              <FaMapMarkerAlt size={18} />
            </div>
            <div>
              <h5 className="fw-bold mb-0" style={{ color: 'var(--rb-blue-dark)', letterSpacing: '1px' }}>
                {formatCep(data.cep)}
              </h5>
              {data.service && (
                <small className="text-muted text-uppercase" style={{ fontSize: '0.7rem', fontWeight: '600' }}>
                  Fonte: {data.service}
                </small>
              )}
            </div>
          </div>
          <Badge bg="success" className="bg-opacity-75 px-3 py-2">
            {data.state || 'UF não informada'}
          </Badge>
        </div>

        <Row className="g-3">
          <Col md={12}>
            <div className="d-flex align-items-start gap-3 p-3 bg-light rounded-3">
              <FaRoad className="text-muted mt-1 flex-shrink-0" />
              <div>
                <small className="text-muted fw-semibold d-block text-uppercase mb-1" style={{ fontSize: '0.7rem' }}>Logradouro</small>
                <div className="fw-medium text-dark">{data.street || 'Rua não informada'}</div>
              </div>
            </div>
          </Col>
          <Col md={6}>
            <div className="d-flex align-items-start gap-3 p-3 bg-light rounded-3 h-100">
              <FaLocationArrow className="text-muted mt-1 flex-shrink-0" />
              <div>
                <small className="text-muted fw-semibold d-block text-uppercase mb-1" style={{ fontSize: '0.7rem' }}>Bairro</small>
                <div className="fw-medium text-dark">{data.neighborhood || 'Bairro não informado'}</div>
              </div>
            </div>
          </Col>
          <Col md={6}>
            <div className="d-flex align-items-start gap-3 p-3 bg-light rounded-3 h-100">
              <FaCity className="text-muted mt-1 flex-shrink-0" />
              <div>
                <small className="text-muted fw-semibold d-block text-uppercase mb-1" style={{ fontSize: '0.7rem' }}>Cidade</small>
                <div className="fw-medium text-dark">{data.city || 'Cidade não informada'}</div>
              </div>
            </div>
          </Col>
        </Row>

        <div className="mt-4 pt-3 border-top">
          {hasLocation ? (
            <div className="d-flex gap-4">
              <div>
                <small className="text-muted d-block text-uppercase mb-1" style={{ fontSize: '0.65rem', fontWeight: '600' }}>Latitude</small>
                <div className="text-dark font-monospace" style={{ fontSize: '0.85rem' }}>{data.location.coordinates.latitude}</div>
              </div>
              <div>
                <small className="text-muted d-block text-uppercase mb-1" style={{ fontSize: '0.65rem', fontWeight: '600' }}>Longitude</small>
                <div className="text-dark font-monospace" style={{ fontSize: '0.85rem' }}>{data.location.coordinates.longitude}</div>
              </div>
            </div>
          ) : (
            <small className="text-muted fst-italic">Geolocalização não disponível para este CEP.</small>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default CepCard;
