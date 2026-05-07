const JsonViewer = ({ data, title = "JSON completo retornado pela API" }) => {
  if (!data) return null;

  return (
    <div className="json-viewer-container mt-4">
      <h6 className="fw-bold mb-2 text-muted" style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
        {title}
      </h6>
      <div className="json-viewer rounded-3 shadow-sm overflow-hidden" style={{ border: '1px solid var(--rb-border)' }}>
        <pre className="p-3 mb-0 text-white" style={{ backgroundColor: '#1E293B', fontSize: '0.85rem', overflowX: 'auto', maxHeight: '400px', overflowY: 'auto' }}>
          <code>
            {JSON.stringify(data, null, 2)}
          </code>
        </pre>
      </div>
    </div>
  );
};

export default JsonViewer;
