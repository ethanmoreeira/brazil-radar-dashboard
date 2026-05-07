import { Card, Button, Badge, Form } from 'react-bootstrap';
import { FaTrash, FaHistory } from 'react-icons/fa';
import { formatDateTimeBR } from '../../utils/formatters';

const HistoryCard = ({ result, onRemove, selected, onToggleSelect }) => {
  if (!result) return null;

  return (
    <Card
      className={`history-card border-0 shadow-sm mb-3 ${selected ? 'history-card--selected' : ''}`}
      style={{ borderRadius: '16px', transition: 'box-shadow 0.2s, border-color 0.2s' }}
    >
      <Card.Body className="p-3">
        <div className="d-flex justify-content-between align-items-start history-card-header mb-2">
          <div className="d-flex align-items-center gap-2">
            {onToggleSelect && (
              <Form.Check
                type="checkbox"
                id={`select-${result.id}`}
                checked={!!selected}
                onChange={() => onToggleSelect(result.id)}
                className="history-card-checkbox"
                aria-label={`Selecionar consulta ${result.queryLabel}`}
              />
            )}
            <div
              className="rounded-circle bg-light d-flex align-items-center justify-content-center"
              style={{ width: '32px', height: '32px', color: 'var(--rb-blue)', flexShrink: 0 }}
            >
              <FaHistory size={14} />
            </div>
            <div>
              <h6 className="fw-bold mb-0 text-dark history-card-title">
                {result.queryLabel}
              </h6>
              <div className="text-muted history-card-meta" style={{ fontSize: '0.75rem' }}>
                {formatDateTimeBR(result.createdAt)}
              </div>
            </div>
          </div>

          <Badge
            bg="primary"
            className="bg-opacity-75 text-uppercase"
            style={{ fontSize: '0.7rem', padding: '0.35em 0.6em', flexShrink: 0 }}
          >
            {result.moduleName}
          </Badge>
        </div>

        <div className="bg-light p-2 rounded-3 mb-3 border history-card-summary">
          <p className="mb-0 text-dark fw-medium" style={{ fontSize: '0.85rem' }}>
            {result.summaryText}
          </p>
        </div>

        <div className="d-flex justify-content-end history-card-actions">
          <Button
            variant="outline-danger"
            size="sm"
            onClick={() => onRemove(result.id)}
            className="d-flex align-items-center gap-1 rounded-pill px-2 py-1"
            style={{ fontSize: '0.75rem' }}
          >
            <FaTrash size={10} /> Remover
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default HistoryCard;
