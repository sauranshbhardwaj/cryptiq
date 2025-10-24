import React from "react";

const subtopics = [
  { id: "centralized_exchanges", label: "Centralized Exchanges" },
  { id: "decentralized_exchanges", label: "Decentralized Exchanges" },
  { id: "crypto_brokers", label: "Crypto Brokers" },
];

export default function Buying_crypto() {
  return (
    <div className="flex h-[calc(100vh-4rem)]">
      <div className="w-full overflow-y-auto scroll-smooth py-6 lg:w-3/4 lg:px-4 lg:pr-8">
        <h1 className="mb-6 text-3xl font-bold">
          Crypto Exchanges and Brokers
        </h1>
        <section id="sub0" className="mb-6">
          <p className="text-gray-300">
            To start investing in cryptocurrencies, the most popular method is
            buying it through platforms that facilitate crypto trading. These
            platforms fall into three categories: Centralized exchanges,
            Decentralized exchanges, and Crypto brokers.
          </p>
        </section>

        <section id="centralized_exchanges" className="mb-6">
          <h2 className="mb-4 text-2xl font-semibold">Centralized Exchanges</h2>
          <p className="mb-4 text-gray-300">
            Centralized exchanges are online platforms run by private companies
            that act as intermediaries between buyers and sellers and behave
            like traditional banks or stock exchanges. These exchanges typically
            charge a commission to facilitate transactions made between buyers
            and sellers.
          </p>
          <p className="mb-4 text-gray-300">
            They usually require identification, handle custody of your funds,
            and provide advanced trading tools and support. They offer fiat to
            crypto, and crypto to fiat trades. Some popular Centralized
            exchanges are Binance, Coinbase, Kraken and Bitstamp.
          </p>
        </section>

        <section id="decentralized_exchanges" className="mb-6">
          <h2 className="mb-4 text-2xl font-semibold">
            Decentralized Exchanges
          </h2>
          <p className="mb-4 text-gray-300">
            Decentralized exchanges run on smart contracts, and don't rely on a
            centralized authority. Users trade peer to peer directly from their
            crypto wallets. It's a marketplace where buyers and sellers come
            together and process the transactions directly between each other.
            These exchanges do not require identification. These exchanges are
            open and permissionless, meaning you have full control over your
            private keys.
          </p>
          <p className="mb-4 text-gray-300">
            However, it is worth noting that these exchanges offer lower
            liquidity and slower transaction times, compared to centralized
            exchanges. Some popular Decentralized exchanges are Uniswap,
            PancakeSwap and SushiSwap.
          </p>
        </section>

        <section id="crypto_brokers" className="mb-6">
          <h2 className="mb-4 text-2xl font-semibold">Crypto Brokers</h2>
          <p className="mb-4 text-gray-300">
            Crypto brokers offer another way to get started with crypto, they
            are platforms that sell cryptocurrencies to users at set prices.
            Unlike exchanges, brokers don’t connect you to buyers or sellers,
            they act as seller themselves. While this makes purchasing faster
            and more user friendly, it often comes with higher fees and limited
            coin options. Most brokers are custodial, meaning you won’t have
            complete control over your private keys, or have full ownership of
            the crypto. Robinhood and Revolut are popular Crypto brokers, and
            offer exposure to crypto prices, but restrict withdrawals to
            personal wallets.
          </p>
        </section>
      </div>
      <aside className="sticky top-[4rem] hidden h-fit w-1/4 border-l border-gray-700 py-6 pl-6 lg:block">
        <div className="space-y-2">
          <h3 className="mb-2 text-lg font-semibold">Quick Navigation</h3>
          {subtopics.map((sub, index) => (
            <a
              key={index}
              href={`#${sub.id}`}
              className="block text-sm text-purple-400 hover:text-purple-300"
            >
              {sub.label}
            </a>
          ))}
        </div>
      </aside>
    </div>
  );
}
