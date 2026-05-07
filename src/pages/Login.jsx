import { useState, useEffect } from 'react';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("auth") === "true";
    if (isAuthenticated) {
      navigate("/app", { replace: true });
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user === 'G8' && password === '2026') {
      localStorage.setItem("auth", "true");
      localStorage.setItem("usuario", "G8");
      navigate("/app", { replace: true });
    } else {
      setError('Usuário ou senha inválidos.');
    }
  };

  return (
    <div className="login-wrapper">
      <Container style={{ maxWidth: '400px' }}>
        
        <div className="text-center mb-4">
          <div 
            className="d-inline-flex align-items-center justify-content-center mb-3" 
            style={{ 
              width: '56px', 
              height: '56px', 
              backgroundColor: 'var(--rb-blue)', 
              borderRadius: 'var(--rb-radius-lg)', 
              color: 'var(--rb-yellow)',
              boxShadow: 'var(--rb-shadow-md)'
            }}
          >
            <span className="fw-bold fs-4">G8</span>
          </div>
          <h2 className="fw-bold mb-1" style={{ color: 'var(--rb-blue-dark)', fontSize: '1.5rem' }}>
            Radar Brasil
          </h2>
          <p style={{ color: 'var(--rb-text-secondary)', fontSize: '0.9rem' }}>
            Acesse o painel de consultas regionais.
          </p>
        </div>

        <Card className="login-card border-0 shadow-lg">
          <div className="login-accent-bar"></div>
          <Card.Body className="p-4">
            {error && (
              <Alert variant="danger" className="border-0 rounded-3 mb-3 fw-medium text-center py-2" style={{ fontSize: '0.88rem' }}>
                {error}
              </Alert>
            )}

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formUser">
                <Form.Label className="fw-semibold small" style={{ color: 'var(--rb-text-secondary)' }}>
                  Usuário
                </Form.Label>
                <Form.Control 
                  type="text" 
                  value={user}
                  onChange={(e) => setUser(e.target.value)}
                  placeholder="Ex: G8"
                  className="py-2"
                  style={{ 
                    borderRadius: 'var(--rb-radius-md)', 
                    backgroundColor: 'var(--rb-bg)',
                    borderColor: 'var(--rb-border)'
                  }}
                  required 
                  autoComplete="username"
                />
              </Form.Group>

              <Form.Group className="mb-4" controlId="formPassword">
                <Form.Label className="fw-semibold small" style={{ color: 'var(--rb-text-secondary)' }}>
                  Senha
                </Form.Label>
                <Form.Control 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="py-2"
                  style={{ 
                    borderRadius: 'var(--rb-radius-md)', 
                    backgroundColor: 'var(--rb-bg)',
                    borderColor: 'var(--rb-border)'
                  }}
                  required 
                  autoComplete="current-password"
                />
              </Form.Group>

              <Button 
                variant="primary" 
                type="submit" 
                className="w-100 fw-bold py-2 border-0" 
                style={{ 
                  backgroundColor: 'var(--rb-blue)', 
                  borderRadius: 'var(--rb-radius-md)',
                  fontSize: '0.95rem'
                }}
              >
                Entrar
              </Button>
            </Form>
          </Card.Body>
        </Card>
        
        <div className="text-center mt-4">
          <small style={{ color: 'var(--rb-muted)', fontSize: '0.78rem' }}>
            2026
          </small>
        </div>
      </Container>
    </div>
  );
};

export default Login;
