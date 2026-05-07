import { Container, Button } from 'react-bootstrap';
import { FaArrowLeft } from 'react-icons/fa';

const NotFound = () => {
  return (
    <>
      <style>{`
        @keyframes nf-radar-ping {
          0%   { transform: scale(0.8); opacity: 0.6; }
          50%  { transform: scale(1.6); opacity: 0; }
          100% { transform: scale(0.8); opacity: 0; }
        }
        @keyframes nf-radar-ping-delay {
          0%   { transform: scale(0.8); opacity: 0; }
          25%  { transform: scale(0.8); opacity: 0.5; }
          75%  { transform: scale(1.8); opacity: 0; }
          100% { transform: scale(0.8); opacity: 0; }
        }
        @keyframes nf-float {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-10px); }
        }
        @keyframes nf-fade-up {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(160deg, #0B2E6D 0%, #0D3B7A 40%, #1F8A4C 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}>

        <div style={{
          position: 'absolute',
          top: '15%',
          left: '10%',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          border: '1px solid rgba(255,255,255,0.04)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute',
          bottom: '10%',
          right: '8%',
          width: '200px',
          height: '200px',
          borderRadius: '50%',
          border: '1px solid rgba(255,255,255,0.03)',
          pointerEvents: 'none',
        }} />

        <Container className="text-center" style={{ maxWidth: '520px', position: 'relative', zIndex: 1 }}>


          <div style={{
            position: 'relative',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '1rem',
            animation: 'nf-fade-up 0.6s ease-out both',
          }}>
            <span style={{
              position: 'absolute',
              width: '160px',
              height: '160px',
              borderRadius: '50%',
              border: '2px solid rgba(244,197,66,0.25)',
              animation: 'nf-radar-ping 2.4s ease-out infinite',
            }} />
            <span style={{
              position: 'absolute',
              width: '160px',
              height: '160px',
              borderRadius: '50%',
              border: '2px solid rgba(244,197,66,0.15)',
              animation: 'nf-radar-ping-delay 2.4s ease-out 0.8s infinite',
            }} />
            <img
              src="/lost-mascot.png"
              alt="Mascote perdido"
              style={{
                width: '150px',
                height: '150px',
                objectFit: 'contain',
                animation: 'nf-float 3s ease-in-out infinite',
                filter: 'drop-shadow(0 4px 20px rgba(244,197,66,0.25))',
                borderRadius: '50%',
              }}
            />
          </div>


          <h1 style={{
            fontSize: 'clamp(5rem, 12vw, 8rem)',
            fontWeight: 900,
            letterSpacing: '-0.04em',
            lineHeight: 1,
            marginBottom: '0.5rem',
            background: 'linear-gradient(135deg, #F4C542 0%, #FFE082 40%, #F4C542 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            animation: 'nf-fade-up 0.6s ease-out 0.15s both',
          }}>
            404
          </h1>


          <h2 style={{
            color: '#FFFFFF',
            fontSize: '1.5rem',
            fontWeight: 700,
            marginBottom: '2rem',
            letterSpacing: '-0.01em',
            animation: 'nf-fade-up 0.6s ease-out 0.3s both',
          }}>
            Fora do alcance do radar
          </h2>


          <div style={{ animation: 'nf-fade-up 0.6s ease-out 0.45s both' }}>
            <Button
              onClick={() => window.history.back()}
              className="d-flex align-items-center gap-2 px-4 py-2 fw-bold mx-auto"
              style={{
                background: 'linear-gradient(135deg, #F4C542 0%, #E6B830 100%)',
                border: 'none',
                borderRadius: '50rem',
                color: '#0B2E6D',
                fontSize: '0.9rem',
                boxShadow: '0 4px 16px rgba(244,197,66,0.3)',
                transition: 'all 0.25s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 24px rgba(244,197,66,0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(244,197,66,0.3)';
              }}
            >
              <FaArrowLeft size={14} />
              Voltar
            </Button>
          </div>

        </Container>
      </div>
    </>
  );
};

export default NotFound;

