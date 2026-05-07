import { useState, useMemo } from 'react';
import { Card, Form, Button, InputGroup } from 'react-bootstrap';
import { FaSearch, FaEraser, FaTimes } from 'react-icons/fa';
import SectionHeader from '../components/layout/SectionHeader';
import PageLoader from '../components/feedback/PageLoader';
import ErrorMessage from '../components/feedback/ErrorMessage';
import EmptyState from '../components/feedback/EmptyState';
import JsonViewer from '../components/feedback/JsonViewer';
import DddCard from '../components/ui/DddCard';
import { getDdd } from '../services/brasilApi';
import { cleanDdd, isValidDdd } from '../utils/validators';
import { saveResultToHistory, createResultPayload } from '../utils/storage';
import { wait } from '../utils/asyncUtils';

const Ddd = () => {
  const [ddd, setDdd] = useState('');
  const [consultedDdd, setConsultedDdd] = useState('');
  const [result, setResult] = useState(null);
  const [rawJson, setRawJson] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleDddChange = (e) => {
    setDdd(e.target.value);
  };

  const handleLimpar = () => {
    setDdd('');
    setConsultedDdd('');
    setResult(null);
    setRawJson(null);
    setError(null);
    setSearchTerm('');
  };

  const handleConsultar = async (e) => {
    e.preventDefault();
    
    setError(null);
    setResult(null);
    setRawJson(null);
    setConsultedDdd('');
    setSearchTerm('');

    if (!ddd) {
      setError("Informe um DDD.");
      return;
    }

    const dddLimpo = cleanDdd(ddd);

    if (!isValidDdd(dddLimpo)) {
      setError("DDD inválido. Informe 2 dígitos.");
      return;
    }

    setLoading(true);

    try {
      const [data] = await Promise.all([
        getDdd(dddLimpo),
        wait(500)
      ]);
      setResult(data);
      setRawJson(data);
      setConsultedDdd(dddLimpo);
      setDdd(dddLimpo);

      const uf = data.state || "não informada";
      const totalCities = data.cities ? data.cities.length : 0;

      saveResultToHistory(createResultPayload({
        moduleName: "DDD",
        queryLabel: `DDD ${dddLimpo}`,
        summaryText: `Consulta retornou a UF ${uf} e ${totalCities} cidade(s).`,
        data: data
      }));

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const filteredCities = useMemo(() => {
    if (!result || !result.cities) return [];
    if (!searchTerm) return result.cities;
    
    const normalizedTerm = searchTerm.toLowerCase().trim();
    return result.cities.filter(city => 
      city.toLowerCase().includes(normalizedTerm)
    );
  }, [result, searchTerm]);

  const temResultadoOuErro = result !== null || error !== null;

  return (
    <div className="dashboard-container">
      <SectionHeader 
        title="Consulta por DDD" 
        subtitle="Descubra o estado e as cidades relacionadas a um código DDD."
      />

      <Card className="radar-card border-0 shadow-sm mb-4" style={{ background: 'linear-gradient(135deg, #EEF3FA 0%, #F0F7F2 100%)' }}>
        <Card.Body className="p-4">
          <Form onSubmit={handleConsultar}>
            <Form.Group>
              <Form.Label className="fw-semibold small" style={{ color: 'var(--rb-text-secondary)' }}>
                Digite o DDD
              </Form.Label>
              <InputGroup>
                <Form.Control
                  type="text"
                  placeholder="Ex: 32"
                  value={ddd}
                  onChange={handleDddChange}
                  className="py-2 px-3 search-input"
                  style={{ borderRadius: 'var(--rb-radius-md) 0 0 var(--rb-radius-md)', backgroundColor: 'var(--rb-bg)', maxWidth: '140px', borderColor: 'var(--rb-border)' }}
                  disabled={loading}
                  maxLength={5}
                  aria-label="DDD para consulta"
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
                DDD com 2 dígitos. Exemplo: 32.
              </Form.Text>
            </Form.Group>
            
            {temResultadoOuErro && (
              <div className="mt-3 ddd-actions">
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

      {loading && <PageLoader text="Consultando DDD..." />}

      {!loading && !result && !error && (
        <EmptyState 
          title="Nenhuma consulta realizada" 
          description="Informe um DDD para visualizar o estado e as cidades retornadas pela BrasilAPI." 
        />
      )}

      {!loading && result && (
        <div className="mt-2">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end mb-3 gap-3">
            <h6 className="fw-bold mb-0" style={{ color: 'var(--rb-text-secondary)', fontSize: '0.9rem' }}>Resultado da Busca</h6>
            
            <div className="ddd-search-card p-2 rounded-3 shadow-sm" style={{ minWidth: '260px', backgroundColor: 'var(--rb-card)', border: '1px solid var(--rb-border)' }}>
              <InputGroup size="sm">
                <InputGroup.Text style={{ backgroundColor: 'var(--rb-bg)', borderColor: 'var(--rb-border)', color: 'var(--rb-muted)' }}>
                  <FaSearch size={12} />
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Filtrar cidade..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                  style={{ boxShadow: 'none', backgroundColor: 'var(--rb-bg)', borderColor: 'var(--rb-border)' }}
                  aria-label="Filtrar cidades por nome"
                />
                {searchTerm && (
                  <Button 
                    variant="light" 
                    className="border"
                    onClick={() => setSearchTerm('')}
                    title="Limpar busca"
                    style={{ borderColor: 'var(--rb-border)', color: 'var(--rb-muted)' }}
                  >
                    <FaTimes size={12} />
                  </Button>
                )}
              </InputGroup>
            </div>
          </div>

          <DddCard 
            ddd={consultedDdd} 
            state={result.state || 'UF não informada'} 
            cities={filteredCities} 
            totalOriginal={result.cities ? result.cities.length : 0}
            searchTerm={searchTerm}
          />
          <JsonViewer data={rawJson} title="JSON completo do DDD" />
        </div>
      )}
    </div>
  );
};

export default Ddd;
