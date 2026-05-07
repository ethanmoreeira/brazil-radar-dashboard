const SectionHeader = ({ title, subtitle }) => {
  return (
    <div className="section-header">
      <h2>{title}</h2>
      {subtitle && <p>{subtitle}</p>}
    </div>
  );
};

export default SectionHeader;
