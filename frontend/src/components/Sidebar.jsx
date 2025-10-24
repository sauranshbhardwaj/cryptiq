import { Link } from "react-router-dom";

const modules = {
  "Foundation Concepts": [
    { label: "Money", path: "" },
    { label: "Cryptocurrency", path: "cryptocurrencies" },
    {
      label: "Working of Cryptocurrencies",
      path: "working_of_cryptocurrencies",
    },
  ],
  "Real World Use": [
    { label: "Crypto Wallets and Keys", path: "crypto_wallets_and_keys" },
    {
      label: "Crypto Exchanges and Brokers",
      path: "crypto_exchanges_and_brokers",
    },
    { label: "Transactions and Fees", path: "transactions_and_fees" },
    {
      label: "Types of Cryptocurrencies and IDDA",
      path: "types_of_cryptocurrencies",
    },
  ],
  "Recognizing Risks": [
    { label: "Risk Return Tradeoff", path: "risk_return_tradeoff" },
    { label: "Notable Risks and Checks", path: "notable_risks_and_checks" },
  ],
  "Trading Strategies": [
    { label: "Technical Analysis", path: "technical_analysis" },
    {
      label: "Long and Short Term trading strategies",
      path: "long_and_short_term_trading_strategies",
    },
    {
      label: "Maximizing Gains and Minimizing losses ",
      path: "maximizing_gains_and_minimizing_losses",
    },
  ],
  "Tax and Legal Compliance": [
    { label: "Navigating Tax on cryptocurrencies", path: "hmrc_guidelines" },
  ],
};

export default function Sidebar() {
  return (
    <div className="flex h-full flex-col justify-center">
      {Object.entries(modules).map(([module, topics]) => (
        <div key={module} className="mb-8">
          <h2 className="mb-2 text-lg font-semibold">{module}</h2>
          <ul className="space-y-1 text-sm">
            {topics.map(({ label, path }, index) => (
              <li key={index}>
                <Link
                  to={`/learn/${path}`}
                  className="text-blue-400 transition-colors hover:text-blue-300"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
