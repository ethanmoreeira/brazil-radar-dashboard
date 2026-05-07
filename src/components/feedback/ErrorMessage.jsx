import { Alert } from 'react-bootstrap';
import { FaExclamationCircle } from 'react-icons/fa';

const ErrorMessage = ({ message }) => {
  if (!message) return null;

  return (
    <Alert variant="danger" className="d-flex align-items-center border-0 shadow-sm rounded-3">
      <FaExclamationCircle className="me-3 fs-4 flex-shrink-0" />
      <div>{message}</div>
    </Alert>
  );
};

export default ErrorMessage;
