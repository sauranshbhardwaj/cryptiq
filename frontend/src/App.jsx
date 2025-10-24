import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing.jsx";
import LoginSignup from "./pages/LoginSignup.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import Google from "./callback/Google.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import News from "./pages/News.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import LearnLayout from "./components/LearnLayout.jsx";
import Money from "./pages/learn/Money.jsx";
import Cryptocurrencies from "./pages/learn/Cryptocurrencies.jsx";
import Working_of_cryptocurrencies from "./pages/learn/Working_of_cryptocurrencies.jsx";
import Wallets_and_keys from "./pages/learn/Wallets_and_keys.jsx";
import Buying_crypto from "./pages/learn/Buying_crypto.jsx";
import Transactions_and_fees from "./pages/learn/Transactions_and_fees.jsx";
import Types_of_cryptocurrencies from "./pages/learn/Types_of_crypto.jsx";
import Risk_and_return from "./pages/learn/Risk_return.jsx";
import Risks_and_checks from "./pages/learn/risks_and_checks.jsx";
import Technical_analysis from "./pages/learn/Technical_analysis.jsx";
import Trading_strats from "./pages/learn/long_and_short_strats.jsx";
import Max_g_min_l from "./pages/learn/max_g_min_l.jsx";
import Tax from "./pages/learn/tax.jsx";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<LoginSignup isSignup={false} />} />
            <Route path="/signup" element={<LoginSignup isSignup={true} />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/auth/callback/google" element={<Google />} />
            <Route path="/news" element={<News />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/learn" element={<LearnLayout />}>
              <Route path="" element={<Money />} />
              <Route path="Cryptocurrencies" element={<Cryptocurrencies />} />
              <Route
                path="Working_of_cryptocurrencies"
                element={<Working_of_cryptocurrencies />}
              />
              <Route
                path="crypto_wallets_and_keys"
                element={<Wallets_and_keys />}
              />
              <Route
                path="crypto_exchanges_and_brokers"
                element={<Buying_crypto />}
              />
              <Route
                path="transactions_and_fees"
                element={<Transactions_and_fees />}
              />
              <Route
                path="types_of_cryptocurrencies"
                element={<Types_of_cryptocurrencies />}
              />
              <Route
                path="risk_return_tradeoff"
                element={<Risk_and_return />}
              />
              <Route
                path="notable_risks_and_checks"
                element={<Risks_and_checks />}
              />
              <Route
                path="technical_analysis"
                element={<Technical_analysis />}
              />
              <Route
                path="long_and_short_term_trading_strategies"
                element={<Trading_strats />}
              />
              <Route
                path="maximizing_gains_and_minimizing_losses"
                element={<Max_g_min_l />}
              />
              <Route path="hmrc_guidelines" element={<Tax />} />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
