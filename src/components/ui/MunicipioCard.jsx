import { Card } from 'react-bootstrap';
import { FaMapMarkerAlt } from 'react-icons/fa';

const MunicipioCard = ({ municipio }) => {

  const codigoIbge = municipio.codigo_ibge || municipio.código_ibge;

  return (
    <Card className="radar-card radar-card-hoverable h-100 border-0 shadow-sm">
      <Card.Body className="p-3 d-flex align-items-center gap-3">
        <div 
          className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
          style={{ width: '36px', height: '36px', backgroundColor: 'var(--rb-green-light)', color: 'var(--rb-green)' }}
        >
          <FaMapMarkerAlt size={14} />
        </div>
        <div>
          <h6 className="fw-bold mb-1" style={{ color: 'var(--rb-blue-dark)' }}>{municipio.nome}</h6>
          {codigoIbge && (
            <small className="text-muted d-block" style={{ fontSize: '0.75rem' }}>
              IBGE: <strong>{codigoIbge}</strong>
            </small>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default MunicipioCard;
