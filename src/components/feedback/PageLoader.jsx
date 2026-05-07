import { Spinner } from 'react-bootstrap';

const PageLoader = ({ text = "Carregando dados..." }) => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center py-5" role="status">
      <Spinner animation="border" style={{ color: 'var(--rb-blue)', width: '2.5rem', height: '2.5rem', borderWidth: '3px' }}>
        <span className="visually-hidden">Carregando...</span>
      </Spinner>
      <p className="mt-3 text-muted fw-medium" style={{ fontSize: '0.9rem' }}>{text}</p>
    </div>
  );
};

export default PageLoader;
