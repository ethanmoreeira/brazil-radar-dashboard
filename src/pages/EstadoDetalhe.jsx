import { useState, useMemo, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Row, Col, Button, Form, InputGroup } from 'react-bootstrap';
import { FaArrowLeft, FaSearch } from 'react-icons/fa';
import SectionHeader from '../components/layout/SectionHeader';
import PageLoader from '../components/feedback/PageLoader';
import ErrorMessage from '../components/feedback/ErrorMessage';
import EmptyState from '../components/feedback/EmptyState';
import JsonViewer from '../components/feedback/JsonViewer';
import MunicipioCard from '../components/ui/MunicipioCard';
import { getMunicipios } from '../services/brasilApi';
import { saveResultToHistory, createResultPayload } from '../utils/storage';
import { wait } from '../utils/asyncUtils';

const EstadoDetalhe = () => {
  const { uf } = useParams();
  const [municipios, setMunicipios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rawJson, setRawJson] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const ufFormatada = uf?.toUpperCase() || '';

  useEffect(() => {
    const fetchMunicipios = async () => {
      try {
        setLoading(true);
        setError(null);
        const [data] = await Promise.all([
          getMunicipios(ufFormatada),
          wait(500)
        ]);
        const municipiosOrdenados = data.sort((a, b) => a.nome.localeCompare(b.nome));
        setMunicipios(municipiosOrdenados);
        setRawJson(data);

        saveResultToHistory(createResultPayload({
          moduleName: "Municípios",
          queryLabel: `Municípios da UF ${ufFormatada}`,
          summaryText: `Consulta retornou ${municipiosOrdenados.length} município(s) para a UF ${ufFormatada}.`,
          data: data
        }));

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (ufFormatada) {
      fetchMunicipios();
    } else {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setError("UF não especificada na URL.");
      setLoading(false);
    }
  }, [ufFormatada]);

  const filteredMunicipios = useMemo(() => {
    if (!searchTerm) return municipios;
    
    const normalizedTerm = searchTerm.toLowerCase().trim();
    return municipios.filter(municipio => 
      municipio.nome.toLowerCase().includes(normalizedTerm)
    );
  }, [municipios, searchTerm]);

  return (
    <div className="dashboard-container">
      <div className="mb-4">
        <Button 
          as={Link} 
          to="/app/estados" 
          variant="light" 
          size="sm"
          className="d-inline-flex align-items-center gap-2 fw-semibold px-3 py-2"
          style={{ 
            backgroundColor: 'var(--rb-card)', 
            borderColor: 'var(--rb-border)', 
            color: 'var(--rb-blue)',
            borderRadius: 'var(--rb-radius-md)'
          }}
        >
          <FaArrowLeft size={12} /> Voltar para Estados
        </Button>
      </div>

      <SectionHeader 
        title={`Municípios de ${ufFormatada}`} 
        subtitle="Lista de municípios retornados pela BrasilAPI para a UF selecionada."
      />

      {loading && <PageLoader text={`Carregando municípios de ${ufFormatada}...`} />}
      
      {error && !loading && (
        <div className="mb-4">
          <ErrorMessage message={error} />
        </div>
      )}

      {!loading && !error && municipios.length === 0 && (
        <EmptyState 
          title="Nenhum município encontrado" 
          description={`A API não retornou dados de municípios para a UF ${ufFormatada}.`} 
        />
      )}

      {!loading && !error && municipios.length > 0 && (
        <>
          <div className="search-card p-3 rounded-3 shadow-sm mb-4" style={{ backgroundColor: 'var(--rb-card)', border: '1px solid var(--rb-border)' }}>
            <Form.Group>
              <InputGroup>
                <InputGroup.Text style={{ backgroundColor: 'var(--rb-bg)', borderColor: 'var(--rb-border)', color: 'var(--rb-muted)' }}>
                  <FaSearch size={14} />
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Buscar município..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                  style={{ boxShadow: 'none', backgroundColor: 'var(--rb-bg)', borderColor: 'var(--rb-border)' }}
                  aria-label="Buscar município por nome"
                />
              </InputGroup>
            </Form.Group>
          </div>

          <div className="d-flex justify-content-between align-items-center mb-4">
            <h6 className="fw-bold mb-0" style={{ color: 'var(--rb-text-secondary)', fontSize: '0.9rem' }}>Resultados</h6>
            <div className="fw-medium px-3 py-1 rounded-3" style={{ backgroundColor: 'var(--rb-card)', border: '1px solid var(--rb-border)', color: 'var(--rb-text-secondary)', fontSize: '0.82rem' }}>
              Exibindo: <strong style={{ color: 'var(--rb-text)' }}>{filteredMunicipios.length}</strong> município(s)
            </div>
          </div>

          {filteredMunicipios.length === 0 ? (
            <EmptyState 
              title="Sem resultados" 
              description="Nenhum município encontrado com esse termo." 
            />
          ) : (
            <Row className="g-3 mb-5 municipio-grid">
              {filteredMunicipios.map(municipio => (
                <Col xs={12} sm={6} md={4} lg={3} key={municipio.codigo_ibge || municipio.nome}>
                  <MunicipioCard municipio={municipio} />
                </Col>
              ))}
            </Row>
          )}

          <JsonViewer data={rawJson} title={`JSON completo de municípios (${ufFormatada})`} />
        </>
      )}
    </div>
  );
};

export default EstadoDetalhe;
