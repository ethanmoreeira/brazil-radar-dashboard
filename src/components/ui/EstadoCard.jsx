import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import { getStateFlag } from '../../utils/stateFlags';

const regiaoColors = {
  'Norte':        { bg: '#E8F5ED', color: '#1F8A4C', border: 'rgba(31,138,76,0.15)' },
  'Nordeste':     { bg: '#E8EDF5', color: '#0B2E6D', border: 'rgba(11,46,109,0.15)' },
  'Centro-Oeste': { bg: '#FFF7D6', color: '#B8860B', border: 'rgba(184,134,11,0.15)' },
  'Sudeste':      { bg: '#EDE8F5', color: '#5B21B6', border: 'rgba(91,33,182,0.15)' },
  'Sul':          { bg: '#E8F0F5', color: '#0E7490', border: 'rgba(14,116,144,0.15)' },
};

const defaultColor = { bg: '#E8EDF5', color: '#0B2E6D', border: 'rgba(11,46,109,0.15)' };

const EstadoCard = ({ estado }) => {
  const regiao = estado.regiao?.nome;
  const palette = regiaoColors[regiao] || defaultColor;
  const flagUrl = getStateFlag(estado.sigla);

  return (
    <Card className="radar-card radar-card-hoverable h-100 border-0 shadow-sm" style={{ overflow: 'hidden', position: 'relative' }}>
      <div style={{ height: '3px', backgroundColor: palette.color }}></div>

      {flagUrl && (
        <div 
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            backgroundImage: `url(${flagUrl})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            opacity: 0.12,
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />
      )}

      <Card.Body className="d-flex flex-column p-4" style={{ position: 'relative', zIndex: 1 }}>
        <div className="d-flex justify-content-between align-items-start mb-3">
          <div 
            className="estado-sigla"
            style={{ 
              backgroundColor: palette.bg,
              color: palette.color
            }}
          >
            {estado.sigla}
          </div>
          {regiao && (
            <span 
              className="regiao-badge"
              style={{
                backgroundColor: palette.bg,
                color: palette.color,
                borderColor: palette.border
              }}
            >
              {regiao}
            </span>
          )}
        </div>
        
        <h5 className="fw-bold mb-1" style={{ color: 'var(--rb-text)', fontSize: '1rem' }}>{estado.nome}</h5>
        
        <div className="mt-auto pt-3">
          <Button 
            as={Link} 
            to={`/app/estados/${estado.sigla}`} 
            variant="outline-primary" 
            size="sm"
            className="w-100 d-flex justify-content-center align-items-center gap-2 fw-semibold"
            style={{ 
              borderColor: palette.color, 
              color: palette.color, 
              borderRadius: 'var(--rb-radius-md)',
              padding: '0.4rem 0.75rem'
            }}
          >
            Ver municípios <FaArrowRight size={11} />
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default EstadoCard;
