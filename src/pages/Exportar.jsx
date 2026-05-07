import { useState, useEffect, useMemo } from 'react';
import { Card, Form, Button, Alert, Badge } from 'react-bootstrap';
import { FaPaperPlane, FaTrashAlt, FaCheckSquare, FaSquare } from 'react-icons/fa';
import SectionHeader from '../components/layout/SectionHeader';
import PageLoader from '../components/feedback/PageLoader';
import ErrorMessage from '../components/feedback/ErrorMessage';
import EmptyState from '../components/feedback/EmptyState';
import JsonViewer from '../components/feedback/JsonViewer';
import HistoryCard from '../components/ui/HistoryCard';
import useLastResult from '../hooks/useLastResult';
import { sendExportEmail } from '../services/emailService';
import { isValidEmail } from '../utils/validators';
import { wait } from '../utils/asyncUtils';

const MAX_EMAIL_EXPORT_ITEMS = 5;

const Exportar = () => {
  const { resultsHistory, clearSavedResults, removeSavedResult } = useLastResult();

  const [toName, setToName] = useState('');
  const [toEmail, setToEmail] = useState('');
  const [message, setMessage] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const [selectedIds, setSelectedIds] = useState([]);

  useEffect(() => {
    if (resultsHistory && resultsHistory.length > 0) {
      const initialSelection = resultsHistory
        .slice(0, MAX_EMAIL_EXPORT_ITEMS)
        .map(item => item.id);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSelectedIds(initialSelection);
    } else {
      setSelectedIds([]);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resultsHistory.length]);

  const subject = useMemo(() => {
    const count = selectedIds.length;
    if (count > 0) return `Radar Brasil G8 - Exportação de ${count} consulta(s)`;
    if (resultsHistory && resultsHistory.length > 0) return 'Radar Brasil G8 - Exportação de consultas';
    return '';
  }, [selectedIds, resultsHistory]);


  const handleToggleSelect = (id) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(sid => sid !== id) : [...prev, id]
    );
  };

  const handleSelectRecentes = () => {
    const ids = (resultsHistory || []).slice(0, MAX_EMAIL_EXPORT_ITEMS).map(item => item.id);
    setSelectedIds(ids);
  };

  const handleDeselectAll = () => {
    setSelectedIds([]);
  };

  const handleEnviar = async (e) => {
    e.preventDefault();

    setError(null);
    setSuccess(false);

    if (selectedIds.length === 0) {
      setError("Selecione pelo menos uma consulta para enviar.");
      return;
    }

    if (selectedIds.length > MAX_EMAIL_EXPORT_ITEMS) {
      setError(
        `Selecione no máximo ${MAX_EMAIL_EXPORT_ITEMS} consultas por envio para evitar excesso de dados no e-mail.`
      );
      return;
    }

    if (!toName.trim()) {
      setError("Informe o nome do destinatário.");
      return;
    }

    if (!toEmail.trim()) {
      setError("Informe o e-mail do destinatário.");
      return;
    }

    if (!isValidEmail(toEmail)) {
      setError("Informe um e-mail válido.");
      return;
    }

    if (!subject.trim()) {
      setError("Informe o assunto do e-mail.");
      return;
    }

    const selectedResults = (resultsHistory || []).filter(item =>
      selectedIds.includes(item.id)
    );

    setLoading(true);

    try {
      await Promise.all([
        sendExportEmail({
          toName: toName.trim(),
          toEmail: toEmail.trim(),
          subject: subject.trim(),
          message: message.trim(),
          resultsHistory: selectedResults  // somente as selecionadas
        }),
        wait(500)
      ]);
      setSuccess(true);
    } catch {
      setError("Não foi possível enviar o e-mail. Verifique as configurações do EmailJS.");
    } finally {
      setLoading(false);
    }
  };

  const handleLimparTodos = () => {
    clearSavedResults();
    setSelectedIds([]);
    setSuccess(false);
    setError(null);
  };

  const handleRemover = (id) => {
    removeSavedResult(id);
    setSelectedIds(prev => prev.filter(sid => sid !== id));
    setSuccess(false);
    setError(null);
  };

  if (!resultsHistory || resultsHistory.length === 0) {
    return (
      <div className="dashboard-container">
        <SectionHeader
          title="Exportar Resultados"
          subtitle="Envie por e-mail as consultas salvas no Radar Brasil G8."
        />
        <EmptyState
          title="Nenhum resultado salvo"
          description="Realize consultas em Estados, CEP, DDD ou Feriados antes de exportar."
        />
      </div>
    );
  }

  const totalCount = resultsHistory.length;
  const selectedCount = selectedIds.length;
  const overLimit = selectedCount > MAX_EMAIL_EXPORT_ITEMS;

  return (
    <div className="dashboard-container">
      <SectionHeader
        title="Exportar Resultados"
        subtitle="Envie por e-mail as consultas salvas no Radar Brasil G8."
      />

      <div className="export-layout">

        <section className="export-history-panel">

          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <h6 className="fw-bold mb-0" style={{ color: 'var(--rb-text)' }}>Consultas salvas</h6>
              <small style={{ color: 'var(--rb-muted)', fontSize: '0.75rem' }}>
                Até 10 no histórico · Até 5 por envio
              </small>
            </div>
            <Button
              variant="outline-danger"
              size="sm"
              onClick={handleLimparTodos}
              className="d-flex align-items-center gap-1 px-3"
              style={{ borderRadius: 'var(--rb-radius-md)', fontSize: '0.78rem' }}
            >
              <FaTrashAlt size={11} /> Limpar
            </Button>
          </div>


          <div className="export-selection-info mb-3 p-3 rounded-3">
            <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
              <Badge
                bg={overLimit ? 'danger' : selectedCount === 0 ? 'secondary' : 'success'}
                className="px-3 py-2 export-selection-badge"
                style={{ fontSize: '0.78rem' }}
              >
                {selectedCount} de {totalCount} selecionada(s)
              </Badge>


              <div className="d-flex gap-2 flex-wrap">
                <Button
                  variant="outline-primary"
                  size="sm"
                  onClick={handleSelectRecentes}
                  className="d-flex align-items-center gap-1 px-3"
                  style={{ fontSize: '0.75rem', borderRadius: 'var(--rb-radius-md)', borderColor: 'var(--rb-blue)', color: 'var(--rb-blue)' }}
                >
                  <FaCheckSquare size={11} />
                  Selecionar recentes
                </Button>
                <Button
                  variant="outline-secondary"
                  size="sm"
                  onClick={handleDeselectAll}
                  className="d-flex align-items-center gap-1 px-3"
                  style={{ fontSize: '0.75rem', borderRadius: 'var(--rb-radius-md)' }}
                >
                  <FaSquare size={11} />
                  Desmarcar
                </Button>
              </div>
            </div>

            {overLimit && (
              <div className="mt-2">
                <small className="text-danger fw-semibold" style={{ fontSize: '0.78rem' }}>
                  ⚠ Máximo de {MAX_EMAIL_EXPORT_ITEMS} consultas por envio. Desmarque algumas.
                </small>
              </div>
            )}
          </div>

          <div className="history-list pe-1">
            {resultsHistory.map((result) => (
              <HistoryCard
                key={result.id}
                result={result}
                onRemove={handleRemover}
                selected={selectedIds.includes(result.id)}
                onToggleSelect={handleToggleSelect}
              />
            ))}
          </div>

          <div className="mt-4">
            <JsonViewer data={resultsHistory} title="Payload JSON das consultas (completo)" />
          </div>
        </section>

        <aside className="export-email-panel">
          {success && (
            <Alert variant="success" className="border-0 shadow-sm rounded-3 fw-medium email-success mb-3" style={{ fontSize: '0.88rem' }}>
              E-mail enviado com sucesso.
            </Alert>
          )}

          {error && (
            <div className="mb-3">
              <ErrorMessage message={error} />
            </div>
          )}

          <Card className="export-form-card border-0 shadow-sm" style={{ borderRadius: 'var(--rb-radius-xl)', background: 'linear-gradient(160deg, #E8EDF5 0%, #EEF3FA 60%, #E8F5ED 100%)', border: '1px solid var(--rb-border)' }}>
            <div style={{ height: '3px', background: 'linear-gradient(90deg, var(--rb-blue), var(--rb-green))' }}></div>
            <Card.Body className="p-4">
              <div className="mb-4">
                <h6 className="fw-bold" style={{ color: 'var(--rb-blue-dark)', fontSize: '1rem' }}>
                  ✉ Enviar relatório
                </h6>
                <p className="mb-0" style={{ color: 'var(--rb-muted)', fontSize: '0.82rem' }}>
                  Informe o destinatário para enviar as consultas selecionadas.
                </p>
              </div>

              <Form onSubmit={handleEnviar}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold small" style={{ color: 'var(--rb-text-secondary)', fontSize: '0.78rem' }}>
                    Nome do destinatário
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ex: João da Silva"
                    value={toName}
                    onChange={(e) => setToName(e.target.value)}
                    disabled={loading}
                    style={{ backgroundColor: '#fff', borderColor: 'rgba(255,255,255,0.2)', borderRadius: 'var(--rb-radius-md)' }}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold small" style={{ color: 'var(--rb-text-secondary)', fontSize: '0.78rem' }}>
                    E-mail do destinatário
                  </Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Ex: joao@email.com"
                    value={toEmail}
                    onChange={(e) => setToEmail(e.target.value)}
                    disabled={loading}
                    style={{ backgroundColor: '#fff', borderColor: 'rgba(255,255,255,0.2)', borderRadius: 'var(--rb-radius-md)' }}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold small" style={{ color: 'var(--rb-text-secondary)', fontSize: '0.78rem' }}>
                    Assunto
                  </Form.Label>
                  <Form.Control
                    type="text"
                    value={subject}
                    readOnly
                    disabled={loading}
                    style={{ backgroundColor: '#fff', borderColor: 'rgba(255,255,255,0.2)', borderRadius: 'var(--rb-radius-md)' }}
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label className="fw-semibold small" style={{ color: 'var(--rb-text-secondary)', fontSize: '0.78rem' }}>
                    Mensagem complementar
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Opcional..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    disabled={loading}
                    style={{ backgroundColor: '#fff', borderColor: 'rgba(255,255,255,0.2)', borderRadius: 'var(--rb-radius-md)' }}
                  />
                </Form.Group>

                <Button
                  type="submit"
                  className="d-flex align-items-center justify-content-center gap-2 px-4 py-3 fw-bold w-100 border-0"
                  style={{
                    backgroundColor: 'var(--rb-blue)',
                    color: '#fff',
                    borderRadius: 'var(--rb-radius-lg)',
                    fontSize: '0.9rem'
                  }}
                  disabled={loading || selectedCount === 0 || overLimit}
                >
                  {loading ? (
                    <>Enviando...</>
                  ) : (
                    <><FaPaperPlane size={14} /> Enviar por e-mail</>
                  )}
                </Button>
              </Form>
            </Card.Body>
          </Card>

          {loading && (
            <div className="mt-3">
              <PageLoader text="Conectando ao serviço de e-mail..." />
            </div>
          )}
        </aside>

      </div>
    </div>
  );
};

export default Exportar;
