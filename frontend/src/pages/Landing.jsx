import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

function Landing() {
  // State for FAQ accordions
  const [openFAQ, setOpenFAQ] = useState(null);

  // FAQ data
  const faqs = [
    {
      id: 1,
      question: "What is CryptIQ?",
      answer:
        "CryptIQ is an educational platform designed to help users understand crypto markets through risk-free paper trading. We provide tools and insights to help you make informed decisions without risking real money.",
    },
    {
      id: 2,
      question: "Getting started with CryptIQ",
      answer:
        "Sign up for a free account, receive virtual funds, and start building your portfolio. Track performance, compare against benchmarks, and learn as you go.",
    },
    {
      id: 3,
      question: "How do paper trading work?",
      answer:
        "Paper trading lets you simulate buying and selling assets without using real money. You'll get a virtual balance to trade with, and our system will track your performance based on real market data.",
    },
    {
      id: 4,
      question: "How does support work?",
      answer:
        "Our support team is available through email. We also provide comprehensive educational resources and community forums for peer assistance.",
    },
    {
      id: 5,
      question: "Our next-gen dashboard",
      answer:
        "Our dashboard provides real-time analytics, portfolio tracking, performance metrics, and personalized insights to help improve your trading strategies.",
    },
    {
      id: 6,
      question: "Installing CryptIQ",
      answer:
        "CryptIQ is a web-based platform that works on all modern browsers. No installation required—just sign up and start trading.",
    },
  ];

  // Function to toggle FAQ
  const toggleFAQ = (id) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <Helmet>
        <title>CryptIQ</title>
      </Helmet>

      <section className="relative container mx-auto px-4 pt-35 pb-20">
        <img
          src="/background/Vector.webp"
          alt="Grid Pattern"
          className="pointer-events-none absolute top-0 right-0 h-[150%] w-5/8 opacity-100"
          style={{ zIndex: "0" }}
        />
        <div className="relative max-w-3xl" style={{ zIndex: "1" }}>
          <h1 className="text-4xl font-bold md:text-5xl">
            <span className="bg-gradient-to-r from-[#6f5de7] via-[#6f5de7] to-white bg-clip-text text-transparent">
              Master{" "}
            </span>
            Crypto.
            <br />
            <span className="bg-gradient-to-r from-[#6f5de7] via-[#6f5de7] to-white bg-clip-text text-transparent">
              Minimise{" "}
            </span>
            Risk.
            <br />
            <span className="bg-gradient-to-r from-[#6f5de7] via-[#6f5de7] to-white bg-clip-text text-transparent">
              Maximise{" "}
            </span>
            Potential.
          </h1>
          <p className="text-gray-20 mt-4">
            CryptIQ is where knowledge meets smart investing.
          </p>
          <button
            className="relative mt-8 flex cursor-pointer items-center overflow-hidden rounded-full bg-white px-6 py-3 font-medium text-gray-900"
            onClick={() => (window.location.href = "/signup")}
          >
            Get Started
            <span className="ml-2">→</span>
          </button>
        </div>
      </section>

      {/* Dashboard Preview */}
      <section className="container mx-auto px-4 py-8">
        <div className="relative">
          <img
            src="/background/graph.webp"
            alt="Dashboard"
            className="w-full rounded-lg border border-solid border-indigo-400/30"
          />
          <div className="absolute bottom-0 left-0 h-32 w-full rounded-b-lg bg-gradient-to-b from-transparent to-black"></div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="mb-10 text-center text-2xl font-bold">
          Empower Your Investments With
          <br />
          Cutting-Edge Insights
        </h2>
        <p className="mx-auto mb-12 max-w-2xl text-center text-gray-400">
          Unlock the power of data-driven decisions with our simulation tools,
          designed to help you navigate the complex world of cryptocurrency.
        </p>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div
            style={{ backgroundColor: "#1e1e1e" }}
            className="rounded-lg p-6"
          >
            <div className="mb-4 flex items-center">
              <div
                style={{ backgroundColor: "#1a1a4a" }}
                className="flex h-8 w-8 items-center justify-center rounded-full text-blue-400"
              >
                1
              </div>
              <h3 className="ml-3 font-semibold">Stay Ahead of Trends</h3>
            </div>
            <p className="text-sm text-gray-400">
              Real-time market data and trend analysis to help you identify
              opportunities before others.
            </p>
          </div>

          <div
            style={{ backgroundColor: "#1e1e1e" }}
            className="rounded-lg p-6"
          >
            <div className="mb-4 flex items-center">
              <div
                style={{ backgroundColor: "#1a1a4a" }}
                className="flex h-8 w-8 items-center justify-center rounded-full text-blue-400"
              >
                2
              </div>
              <h3 className="ml-3 font-semibold">Comprehensive Simulations</h3>
            </div>
            <p className="text-sm text-gray-400">
              Test trading strategies in a risk-free environment with our
              realistic market simulators.
            </p>
          </div>

          <div
            style={{ backgroundColor: "#1e1e1e" }}
            className="rounded-lg p-6"
          >
            <div className="mb-4 flex items-center">
              <div
                style={{ backgroundColor: "#1a1a4a" }}
                className="flex h-8 w-8 items-center justify-center rounded-full text-blue-400"
              >
                3
              </div>
              <h3 className="ml-3 font-semibold">Security & Compliance</h3>
            </div>
            <p className="text-sm text-gray-400">
              Learn best practices for secure crypto management and stay
              informed about regulatory changes.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row">
          <div className="mb-8 md:mb-0 md:w-1/3">
            <div className="mb-0 flex h-30 w-30 items-center justify-center text-purple-500">
              <img
                src="/logo/White_BG.png"
                alt="Logo"
                className="h-full w-full object-contain"
              />
            </div>
            <h2 className="mb-2 text-2xl font-bold">
              Frequently <br />
              asked questions
            </h2>
            {/*should this lead anywhere?*/}
            <p className="text-gray-400">
              🗨️&nbsp;Still need help?{" "}
              <Link to={"/contact"} className="text-[#5f63cd]">
                Contact us.
              </Link>
            </p>
          </div>

          <div className="md:w-2/3 md:pl-12">
            {faqs.map((faq) => (
              <div key={faq.id} className="mb-4 border-b border-gray-700 pb-4">
                <button
                  className="flex w-full items-center justify-between text-left"
                  onClick={() => toggleFAQ(faq.id)}
                >
                  <span className="font-medium">{faq.question}</span>
                  <span className="text-gray-400">
                    {openFAQ === faq.id ? "−" : "+"}
                  </span>
                </button>
                {openFAQ === faq.id && (
                  <p className="mt-2 text-sm text-gray-400">{faq.answer}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <h2 className="mb-2 text-2xl font-bold">
          Maximize your Financial Potential With
          <br />
          Our Innovative Platform
        </h2>
        <p className="mx-auto mb-8 max-w-2xl text-gray-400">
          Whether you are a beginner or a seasoned trader, our platform provides
          the tools and resources you need to make informed cryptocurrency
          investment decisions.
        </p>
        <button
          style={{ backgroundColor: "#6f5de7" }}
          className="cursor-pointer rounded-full px-8 py-3 font-medium hover:bg-purple-700"
          onClick={() => (window.location.href = "/signup")}
        >
          Register Now
        </button>
      </section>

      <Footer />
    </div>
  );
}

export default Landing;
