import { useState, useMemo } from 'react';
import { Card, Form, Button, InputGroup, Row, Col, Badge } from 'react-bootstrap';
import { FaSearch, FaEraser, FaCalendarAlt, FaTimes } from 'react-icons/fa';
import SectionHeader from '../components/layout/SectionHeader';
import PageLoader from '../components/feedback/PageLoader';
import ErrorMessage from '../components/feedback/ErrorMessage';
import EmptyState from '../components/feedback/EmptyState';
import JsonViewer from '../components/feedback/JsonViewer';
import FeriadoCard from '../components/ui/FeriadoCard';
import { getFeriados } from '../services/brasilApi';
import { cleanYear, isValidYear } from '../utils/validators';
import { saveResultToHistory, createResultPayload } from '../utils/storage';
import { wait } from '../utils/asyncUtils';

const Feriados = () => {
  const [ano, setAno] = useState('');
  const [consultedYear, setConsultedYear] = useState('');
  const [result, setResult] = useState(null);
  const [rawJson, setRawJson] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('Todos');

  const handleAnoChange = (e) => {
    setAno(e.target.value);
  };

  const handleLimparConsulta = () => {
    setAno('');
    setConsultedYear('');
    setResult(null);
    setRawJson(null);
    setError(null);
    setSearchTerm('');
    setTypeFilter('Todos');
  };

  const handleLimparFiltros = () => {
    setSearchTerm('');
    setTypeFilter('Todos');
  };

  const consultarAnoEspecifico = async (anoParaConsultar) => {
    setError(null);
    setResult(null);
    setRawJson(null);
    setConsultedYear('');
    setSearchTerm('');
    setTypeFilter('Todos');

    const anoLimpo = cleanYear(anoParaConsultar);

    if (!anoLimpo) {
      setError("Informe um ano.");
      return;
    }

    if (anoLimpo.length !== 4) {
      setError("Ano inválido. Informe um ano com 4 dígitos.");
      return;
    }

    if (!isValidYear(anoLimpo)) {
      setError("Informe um ano entre 1900 e 2100.");
      return;
    }

    setLoading(true);

    try {
      const [data] = await Promise.all([
        getFeriados(anoLimpo),
        wait(500)
      ]);
      setResult(data);
      setRawJson(data);
      setConsultedYear(anoLimpo);
      setAno(anoLimpo); // atualiza o input com o ano consultado

      saveResultToHistory(createResultPayload({
        moduleName: "Feriados",
        queryLabel: `Feriados nacionais de ${anoLimpo}`,
        summaryText: `Consulta retornou ${data.length} feriado(s) nacional(is) para o ano ${anoLimpo}.`,
        data: data
      }));

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleConsultar = (e) => {
    e.preventDefault();
    consultarAnoEspecifico(ano);
  };

  const handleBotaoRapido = (anoRapido) => {
    consultarAnoEspecifico(anoRapido.toString());
  };

  const typesDisponiveis = useMemo(() => {
    if (!result || result.length === 0) return ['Todos'];
    const types = result.map(f => f.type).filter(Boolean);
    const uniqueTypes = [...new Set(types)];
    return ['Todos', ...uniqueTypes];
  }, [result]);

  const filteredFeriados = useMemo(() => {
    if (!result) return [];
    
    return result.filter(feriado => {
      const matchSearch = searchTerm === '' || 
        (feriado.name && feriado.name.toLowerCase().includes(searchTerm.toLowerCase().trim()));
      
      const matchType = typeFilter === 'Todos' || 
        (feriado.type && feriado.type === typeFilter);

      return matchSearch && matchType;
    });
  }, [result, searchTerm, typeFilter]);

  const temResultadoOuErro = result !== null || error !== null;
  const filtrosAtivos = searchTerm !== '' || typeFilter !== 'Todos';

  return (
    <div className="dashboard-container">
      <SectionHeader 
        title="Feriados Nacionais" 
        subtitle="Consulte os feriados nacionais de um ano usando a BrasilAPI."
      />

      <Card className="radar-card border-0 shadow-sm mb-4" style={{ background: 'linear-gradient(135deg, #EEF3FA 0%, #F0F7F2 100%)' }}>
        <Card.Body className="p-4">
          <div className="mb-4">
            <small className="fw-semibold mb-2 d-block" style={{ fontSize: '0.75rem', color: 'var(--rb-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Consultas Rápidas</small>
            <div className="d-flex gap-2 flex-wrap">
              {[2024, 2025, 2026, 2027].map(yr => (
                <Button 
                  key={yr} 
                  variant="outline-primary" 
                  size="sm" 
                  className="px-3 fw-medium year-shortcut-btn"
                  style={{ borderRadius: 'var(--rb-radius-md)', borderColor: 'var(--rb-blue)', color: 'var(--rb-blue)', fontSize: '0.82rem' }}
                  onClick={() => handleBotaoRapido(yr)}
                  disabled={loading}
                >
                  {yr}
                </Button>
              ))}
            </div>
          </div>

          <Form onSubmit={handleConsultar}>
            <Form.Group>
              <Form.Label className="fw-semibold small" style={{ color: 'var(--rb-text-secondary)' }}>
                Digite o Ano
              </Form.Label>
              <InputGroup>
                <Form.Control
                  type="number"
                  placeholder="Ex: 2026"
                  value={ano}
                  onChange={handleAnoChange}
                  className="py-2 px-3 search-input"
                  style={{ borderRadius: 'var(--rb-radius-md) 0 0 var(--rb-radius-md)', backgroundColor: 'var(--rb-bg)', maxWidth: '140px', borderColor: 'var(--rb-border)' }}
                  disabled={loading}
                  min="1900"
                  max="2100"
                  aria-label="Ano para consulta de feriados"
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
                  <FaCalendarAlt size={14} /> Consultar
                </Button>
              </InputGroup>
              <Form.Text className="helper-text mt-2 d-block">
                Ano com 4 dígitos entre 1900 e 2100.
              </Form.Text>
            </Form.Group>
            
            {temResultadoOuErro && (
              <div className="mt-3 feriados-actions d-flex justify-content-end">
                <Button 
                  variant="outline-secondary" 
                  size="sm"
                  onClick={handleLimparConsulta}
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

      {loading && <PageLoader text="Consultando feriados..." />}

      {!loading && !result && !error && (
        <EmptyState 
          title="Nenhuma consulta realizada" 
          description="Informe um ano para visualizar os feriados nacionais retornados pela BrasilAPI." 
        />
      )}

      {!loading && result && (
        <div className="mt-2">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
            <h6 className="fw-bold mb-0" style={{ color: 'var(--rb-text-secondary)', fontSize: '0.9rem' }}>Feriados de {consultedYear}</h6>
            
            <div className="fw-medium px-3 py-1 rounded-3" style={{ backgroundColor: 'var(--rb-card)', border: '1px solid var(--rb-border)', color: 'var(--rb-text-secondary)', fontSize: '0.82rem' }}>
              {filtrosAtivos 
                ? `Exibindo ${filteredFeriados.length} de ${result.length} feriado(s)`
                : `Total: ${result.length} feriado(s)`
              }
            </div>
          </div>

          {/* Filtros */}
          <div className="feriados-filter-card p-3 rounded-3 shadow-sm mb-4" style={{ backgroundColor: 'var(--rb-card)', border: '1px solid var(--rb-border)' }}>
            <Row className="g-3 align-items-center">
              <Col xs={12} md={6}>
                <InputGroup size="sm">
                  <InputGroup.Text style={{ backgroundColor: 'var(--rb-bg)', borderColor: 'var(--rb-border)', color: 'var(--rb-muted)' }}>
                    <FaSearch size={12} />
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="Buscar feriado..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                    style={{ boxShadow: 'none', backgroundColor: 'var(--rb-bg)', borderColor: 'var(--rb-border)' }}
                    aria-label="Buscar feriado por nome"
                  />
                </InputGroup>
              </Col>
              
              <Col xs={12} md={6} className="d-flex align-items-center gap-2">
                <span className="small fw-semibold text-nowrap" style={{ color: 'var(--rb-text-secondary)', fontSize: '0.78rem' }}>Tipo:</span>
                <div className="d-flex gap-2 flex-wrap flex-grow-1">
                  {typesDisponiveis.map(type => (
                    <Badge 
                      key={type}
                      bg={typeFilter === type ? 'primary' : 'light'}
                      text={typeFilter === type ? 'white' : 'dark'}
                      className="border px-2 py-1 cursor-pointer"
                      style={{ 
                        cursor: 'pointer', 
                        transition: 'all var(--rb-transition)',
                        backgroundColor: typeFilter === type ? 'var(--rb-blue)' : undefined,
                        fontSize: '0.75rem'
                      }}
                      onClick={() => setTypeFilter(type)}
                    >
                      {type}
                    </Badge>
                  ))}
                </div>
              </Col>

              {filtrosAtivos && (
                <Col xs={12}>
                  <Button 
                    variant="link" 
                    size="sm" 
                    className="text-decoration-none p-0 d-flex align-items-center gap-1"
                    style={{ color: 'var(--rb-muted)', fontSize: '0.78rem' }}
                    onClick={handleLimparFiltros}
                  >
                    <FaTimes size={10} /> Limpar filtros
                  </Button>
                </Col>
              )}
            </Row>
          </div>

          {filteredFeriados.length === 0 ? (
            <EmptyState 
              title="Sem resultados" 
              description="Nenhum feriado encontrado com os filtros atuais." 
            />
          ) : (
            <Row className="g-3 mb-5 feriados-grid">
              {filteredFeriados.map((feriado, idx) => (
                <Col xs={12} sm={6} lg={4} xl={3} key={`${feriado.date}-${idx}`}>
                  <FeriadoCard feriado={feriado} />
                </Col>
              ))}
            </Row>
          )}

          <JsonViewer data={rawJson} title={`JSON completo de Feriados (${consultedYear})`} />
        </div>
      )}
    </div>
  );
};

export default Feriados;
