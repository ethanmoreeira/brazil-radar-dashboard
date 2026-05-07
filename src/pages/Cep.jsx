import { useState } from 'react';
import { Card, Form, Button, InputGroup } from 'react-bootstrap';
import { FaSearch, FaEraser } from 'react-icons/fa';
import SectionHeader from '../components/layout/SectionHeader';
import PageLoader from '../components/feedback/PageLoader';
import ErrorMessage from '../components/feedback/ErrorMessage';
import EmptyState from '../components/feedback/EmptyState';
import JsonViewer from '../components/feedback/JsonViewer';
import CepCard from '../components/ui/CepCard';
import { getCep } from '../services/brasilApi';
import { cleanCep, isValidCep } from '../utils/validators';
import { formatCep } from '../utils/formatters';
import { saveResultToHistory, createResultPayload } from '../utils/storage';
import { wait } from '../utils/asyncUtils';

const Cep = () => {
  const [cep, setCep] = useState('');
  const [result, setResult] = useState(null);
  const [rawJson, setRawJson] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCepChange = (e) => {
    setCep(e.target.value);
  };

  const handleLimpar = () => {
    setCep('');
    setResult(null);
    setRawJson(null);
    setError(null);
  };

  const handleConsultar = async (e) => {
    e.preventDefault();
    
    setError(null);
    setResult(null);
    setRawJson(null);

    if (!cep) {
      setError("Informe um CEP.");
      return;
    }

    const cepLimpo = cleanCep(cep);

    if (!isValidCep(cepLimpo)) {
      setError("CEP inválido. Informe 8 dígitos.");
      return;
    }

    setLoading(true);

    try {
      const [data] = await Promise.all([
        getCep(cepLimpo),
        wait(500)
      ]);
      setResult(data);
      setRawJson(data);
      setCep(formatCep(cepLimpo));

      const enderecoTexto = [
        data.street || "Rua não informada",
        data.neighborhood || "Bairro não informado",
        `${data.city || "Cidade não informada"} - ${data.state || "UF não informada"}`
      ].filter(Boolean).join(', ');
      
      const servicoTexto = data.service ? ` Serviço: ${data.service}.` : '';

      saveResultToHistory(createResultPayload({
        moduleName: "CEP",
        queryLabel: `CEP ${formatCep(cepLimpo)}`,
        summaryText: `${enderecoTexto}.${servicoTexto}`,
        data: data
      }));

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const temResultadoOuErro = result !== null || error !== null;

  return (
    <div className="dashboard-container">
      <SectionHeader 
        title="Consulta por CEP" 
        subtitle="Busque dados de endereço usando a BrasilAPI."
      />

      <Card className="radar-card border-0 shadow-sm mb-4" style={{ background: 'linear-gradient(135deg, #EEF3FA 0%, #F0F7F2 100%)' }}>
        <Card.Body className="p-4">
          <Form onSubmit={handleConsultar}>
            <Form.Group>
              <Form.Label className="fw-semibold small" style={{ color: 'var(--rb-text-secondary)' }}>
                Digite o CEP
              </Form.Label>
              <InputGroup>
                <Form.Control
                  type="text"
                  placeholder="Ex: 36010-000"
                  value={cep}
                  onChange={handleCepChange}
                  className="py-2 px-3 search-input"
                  style={{ borderRadius: 'var(--rb-radius-md) 0 0 var(--rb-radius-md)', backgroundColor: 'var(--rb-bg)', borderColor: 'var(--rb-border)' }}
                  disabled={loading}
                  aria-label="CEP para consulta"
                />
                <Button 
                  type="submit" 
                  variant="primary"
                  className="d-flex align-items-center gap-2 px-4 fw-bold"
                  style={{ 
                    backgroundColor: 'var(--rb-blue)', 
                    borderColor: 'var(--rb-blue)',
                    borderRadius: '0 var(--rb-radius-md) var(--rb-radius-md) 0'
                  }}
                  disabled={loading}
                >
                  <FaSearch size={14} /> Consultar
                </Button>
              </InputGroup>
              <Form.Text className="helper-text mt-2 d-block">
                Aceita CEP com ou sem hífen. Exemplo: 36010-000.
              </Form.Text>
            </Form.Group>
            
            {temResultadoOuErro && (
              <div className="mt-3 cep-actions">
                <Button 
                  variant="outline-secondary" 
                  size="sm"
                  onClick={handleLimpar}
                  className="d-flex align-items-center gap-2 px-3"
                  style={{ borderRadius: 'var(--rb-radius-md)', fontSize: '0.82rem' }}
                >
                  <FaEraser size={12} /> Limpar
                </Button>
              </div>
            )}
          </Form>
        </Card.Body>
      </Card>

      {error && !loading && (
        <div className="mb-4">
          <ErrorMessage message={error} />
        </div>
      )}

      {loading && <PageLoader text="Consultando CEP..." />}

      {!loading && !result && !error && (
        <EmptyState 
          title="Nenhuma consulta realizada" 
          description="Informe um CEP para visualizar os dados retornados pela BrasilAPI." 
        />
      )}

      {!loading && result && (
        <div className="mt-2">
          <h6 className="fw-bold mb-3" style={{ color: 'var(--rb-text-secondary)', fontSize: '0.9rem' }}>Resultado da Busca</h6>
          <CepCard data={result} />
          <JsonViewer data={rawJson} title="JSON completo do CEP" />
        </div>
      )}
    </div>
  );
};

export default Cep;
