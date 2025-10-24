const formatCurrency = (value) => {
  if (value < 1) return `$${value.toFixed(4)}`;
  if (value < 10) return `$${value.toFixed(2)}`;
  return `$${value.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
};

const tooltipStyles = {
  container: {
    backgroundColor: "#1E1E1E",
    border: "1px solid #333",
    borderRadius: "8px",
    color: "#FFFFFF",
    padding: "10px",
  },
  item: {
    color: "#FFFFFF",
    margin: 0,
  },
  label: {
    color: "#AAAAAA",
    marginBottom: "8px",
  },
};

function formatName(name) {
  if (name === "networth") return "Net Worth";
  if (name === "spy_networth") return "S&P 500 ETF";
  if (name === "xau_networth") return "Gold";
  return name;
}

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={tooltipStyles.container}>
        <p style={tooltipStyles.label}>{label}</p>
        {payload.map((entry, index) => (
          <p key={`item-${index}`} style={tooltipStyles.item}>
            {formatName(entry.name)}: {formatCurrency(entry.value)}
          </p>
        ))}
      </div>
    );
  }

  return null;
};

export default CustomTooltip;
