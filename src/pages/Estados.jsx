import { useState, useEffect, useMemo } from 'react';
import { Row, Col, ButtonGroup, Button } from 'react-bootstrap';
import SectionHeader from '../components/layout/SectionHeader';
import PageLoader from '../components/feedback/PageLoader';
import ErrorMessage from '../components/feedback/ErrorMessage';
import EmptyState from '../components/feedback/EmptyState';
import JsonViewer from '../components/feedback/JsonViewer';
import EstadoCard from '../components/ui/EstadoCard';
import { getEstados } from '../services/brasilApi';
import { saveResultToHistory, createResultPayload } from '../utils/storage';
import { wait } from '../utils/asyncUtils';

const Estados = () => {
  const [estados, setEstados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [regiaoSelecionada, setRegiaoSelecionada] = useState('Todas');
  const [rawJson, setRawJson] = useState(null);

  useEffect(() => {
    const fetchEstados = async () => {
      try {
        setLoading(true);
        setError(null);
        const [data] = await Promise.all([
          getEstados(),
          wait(500)
        ]);
        const estadosOrdenados = data.sort((a, b) => a.nome.localeCompare(b.nome));
        setEstados(estadosOrdenados);
        setRawJson(data);

        saveResultToHistory(createResultPayload({
          moduleName: "Estados",
          queryLabel: "Lista de UFs brasileiras",
          summaryText: `Consulta retornou ${estadosOrdenados.length} estado(s) brasileiros organizados por região.`,
          data: data
        }));

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEstados();
  }, []);

  const estadosFiltrados = useMemo(() => {
    if (regiaoSelecionada === 'Todas') return estados;
    return estados.filter(estado => estado.regiao?.nome === regiaoSelecionada);
  }, [estados, regiaoSelecionada]);

  const regioes = ['Todas', 'Norte', 'Nordeste', 'Centro-Oeste', 'Sudeste', 'Sul'];

  return (
    <div className="dashboard-container">
      <SectionHeader 
        title="Estados e Municípios" 
        subtitle="Explore as UFs brasileiras e acesse seus municípios usando dados da BrasilAPI."
      />

      {loading && <PageLoader text="Buscando lista de estados..." />}
      
      {error && !loading && <ErrorMessage message={error} />}

      {!loading && !error && estados.length === 0 && (
        <EmptyState 
          title="Nenhum estado encontrado" 
          description="A API não retornou dados de estados no momento." 
        />
      )}

      {!loading && !error && estados.length > 0 && (
        <>
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
            <ButtonGroup className="flex-wrap">
              {regioes.map(regiao => (
                <Button 
                  key={regiao}
                  size="sm"
                  onClick={() => setRegiaoSelecionada(regiao)}
                  className="fw-medium"
                  style={{ 
                    backgroundColor: regiaoSelecionada === regiao ? 'var(--rb-blue)' : 'var(--rb-card)',
                    color: regiaoSelecionada === regiao ? '#fff' : 'var(--rb-text-secondary)',
                    border: `1px solid ${regiaoSelecionada === regiao ? 'var(--rb-blue)' : 'var(--rb-border)'}`,
                    borderRadius: 'var(--rb-radius-md)',
                    padding: '0.35rem 0.85rem',
                    fontSize: '0.82rem',
                    transition: 'all var(--rb-transition)'
                  }}
                >
                  {regiao}
                </Button>
              ))}
            </ButtonGroup>
            <div className="fw-medium px-3 py-2 rounded-3" style={{ backgroundColor: 'var(--rb-card)', border: '1px solid var(--rb-border)', color: 'var(--rb-text-secondary)', fontSize: '0.85rem' }}>
              Exibindo <strong style={{ color: 'var(--rb-text)' }}>{estadosFiltrados.length}</strong> estado(s)
            </div>
          </div>

          <Row className="g-3 mb-5 state-grid">
            {estadosFiltrados.map(estado => (
              <Col xs={12} sm={6} lg={4} xl={3} key={estado.id || estado.sigla}>
                <EstadoCard estado={estado} />
              </Col>
            ))}
          </Row>

          <JsonViewer data={rawJson} />
        </>
      )}
    </div>
  );
};

export default Estados;
