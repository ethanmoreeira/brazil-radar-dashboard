import { Card } from 'react-bootstrap';

const StatCard = ({ value, label, icon, color = 'var(--rb-blue)' }) => {
  return (
    <Card className="radar-card h-100 border-0 shadow-sm">
      <Card.Body className="d-flex align-items-center p-3">
        <div 
          className="stat-card-icon me-3" 
          style={{ 
            backgroundColor: `${color}12`, 
            color: color
          }}
        >
          {icon}
        </div>
        <div>
          <h4 className="fw-bold mb-0" style={{ color: 'var(--rb-text)', lineHeight: '1', fontSize: '1.15rem' }}>{value}</h4>
          <p className="mb-0" style={{ color: 'var(--rb-text-secondary)', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: '600' }}>{label}</p>
        </div>
      </Card.Body>
    </Card>
  );
};

export default StatCard;
