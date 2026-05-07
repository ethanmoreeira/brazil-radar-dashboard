import { Card, Badge } from 'react-bootstrap';
import { FaCalendarDay } from 'react-icons/fa';
import { formatDateBR } from '../../utils/formatters';

const FeriadoCard = ({ feriado }) => {
  if (!feriado) return null;

  const date = feriado.date ? formatDateBR(feriado.date) : 'Data não informada';
  const name = feriado.name || 'Feriado não informado';
  const type = feriado.type || 'Tipo não informado';


  let badgeColor = 'secondary';
  if (type.toLowerCase() === 'national') badgeColor = 'success';
  else if (type.toLowerCase() === 'facultativo') badgeColor = 'warning';
  else if (type.toLowerCase() === 'estadual') badgeColor = 'primary';
  else if (type.toLowerCase() === 'municipal') badgeColor = 'info';

  return (
    <Card className="radar-card radar-card-hoverable feriado-card h-100 border-0 shadow-sm">
      <Card.Body className="p-4 d-flex flex-column">
        <div className="d-flex align-items-start justify-content-between mb-3">
          <div className="d-flex align-items-center gap-2">
            <div 
              className="rounded-circle bg-light d-flex align-items-center justify-content-center flex-shrink-0" 
              style={{ width: '40px', height: '40px', color: 'var(--rb-blue)' }}
            >
              <FaCalendarDay size={18} />
            </div>
            <div className="feriado-date fw-bold" style={{ color: 'var(--rb-blue-dark)', letterSpacing: '0.5px' }}>
              {date}
            </div>
          </div>
        </div>
        
        <h5 className="fw-bold mb-3 feriado-name flex-grow-1 text-dark">
          {name}
        </h5>
        
        <div className="mt-auto pt-2 border-top">
          <Badge bg={badgeColor} className="bg-opacity-75 px-3 py-2 text-uppercase" style={{ fontSize: '0.7rem' }}>
            {type}
          </Badge>
        </div>
      </Card.Body>
    </Card>
  );
};

export default FeriadoCard;
