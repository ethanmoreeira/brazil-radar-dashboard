import { Card } from 'react-bootstrap';
import { FaInbox } from 'react-icons/fa';

const EmptyState = ({ title, description, icon = <FaInbox /> }) => {
  return (
    <Card className="text-center border-0 shadow-sm" style={{ borderRadius: 'var(--rb-radius-lg)', padding: '3rem 1.5rem' }}>
      <Card.Body className="d-flex flex-column align-items-center">
        <div 
          className="mb-3 d-flex align-items-center justify-content-center" 
          style={{ width: '64px', height: '64px', borderRadius: 'var(--rb-radius-lg)', backgroundColor: 'var(--rb-bg)', color: 'var(--rb-muted)', fontSize: '1.6rem' }}
        >
          {icon}
        </div>
        <h5 className="fw-bold mb-2" style={{ color: 'var(--rb-blue-dark)' }}>{title}</h5>
        <p className="text-muted mb-0 mx-auto" style={{ maxWidth: '420px', fontSize: '0.9rem' }}>{description}</p>
      </Card.Body>
    </Card>
  );
};

export default EmptyState;
