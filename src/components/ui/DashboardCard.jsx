import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';

const DashboardCard = ({ title, description, icon, to, color = 'var(--rb-blue)' }) => {
  return (
    <Card className="radar-card radar-card-hoverable h-100 border-0 shadow-sm" style={{ overflow: 'hidden' }}>
      <div style={{ height: '3px', backgroundColor: color }}></div>
      <Card.Body className="d-flex flex-column p-3">
        <div className="d-flex align-items-center mb-2 gap-3">
          <div 
            className="icon-container mb-0 flex-shrink-0"
            style={{ 
              backgroundColor: `${color}12`,
              color: color
            }}
          >
            {icon}
          </div>
          <Card.Title className="fw-bold mb-0 fs-6" style={{ color: 'var(--rb-blue-dark)', lineHeight: '1.25' }}>
            {title}
          </Card.Title>
        </div>
        
        <Card.Text className="mb-3 flex-grow-1" style={{ fontSize: '0.83rem', lineHeight: '1.45', color: 'var(--rb-text-secondary)' }}>
          {description}
        </Card.Text>
        
        <div className="mt-auto">
          <Button 
            as={Link} 
            to={to} 
            variant="light" 
            size="sm"
            className="w-100 text-start d-flex justify-content-between align-items-center fw-semibold py-1 px-2"
            style={{ 
              backgroundColor: `${color}08`, 
              color: color,
              border: `1px solid ${color}20`,
              borderRadius: 'var(--rb-radius-md)'
            }}
          >
            <span>Acessar</span>
            <FaArrowRight size={11} />
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default DashboardCard;
