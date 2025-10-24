import React from "react";

const subtopics = [
  { id: "types_of_cryptocurrencies", label: "Types of Cryptocurrencies" },
  { id: "iida", label: "Invest Diva Diamond Analysis" },
];

export default function Types_of_cryptocurrencies() {
  return (
    <div className="flex h-[calc(100vh-4rem)]">
      <div className="w-full overflow-y-auto scroll-smooth py-6 lg:w-3/4 lg:px-4 lg:pr-8">
        <h1 className="mb-6 text-3xl font-bold">Types of Cryptocurrencies</h1>

        <section id="types_of_cryptocurrencies" className="mb-6">
          <p className="mb-4 text-gray-300">
            Cryptocurrencies come in many different forms, each serving a
            distinct purpose within the digital ecosystem. From coins that power
            their own blockchains to tokens that enable decentralized
            applications, understanding the different types of cryptocurrencies
            is essential to make informed decisions.
          </p>
          <ol className="list-inside list-disc space-y-2 pl-2 text-gray-300">
            <li>
              <strong>Coins:</strong> These are digital currencies that run on
              their own independent blockchain. Bitcoin was the first and
              remains the most popular coin. Other coins like Litecoin and
              Bitcoin cash fall into this category. Coins are typically used as
              a store of value, an exchange medium or for network level
              utilities like transaction fees.
            </li>
            <li>
              <strong>Altcoins:</strong> They are any cryptocurrencies that are
              not Bitcoin. These coins may possess unique purposes or improve on
              Bitcoins limitations. Ethereum, for example, introduced smart
              contracts, while Solana focuses on speed. These coins often aim to
              offer better scalability, privacy or flexibility, compared to
              Bitcoin.
            </li>
            <li>
              <strong>Tokens:</strong> Tokens don't have their own blockchain
              and are built on preexisting ones. They represent assets in a
              specific ecosystem. Unlike coins, tokens are more like app layer
              currencies, used in decentralized exchange apps, decentralized
              finance platforms, and games where players use tokens for in game
              purchases or governance.
            </li>
            <li>
              <strong>Utility Tokens:</strong> These tokens are designed to
              provide access to a product or a service within a blockchain
              ecosystem. For example, BAT (Basic Attention Token) is used in
              Brave Browser to reward users and advertisers. Utility tokens,
              however are not meant to be investments, though many gain a
              speculative value.
            </li>
            <li>
              <strong>Governance Tokens:</strong> These tokens give holders
              voting rights over protocol decisions, such as updates, fee
              structures, or project funding. These tokens support Decentralized
              Decision making in DeFi projects.
            </li>
            <li>
              <strong>Stablecoins:</strong> These are pegged to stable assets,
              like the US dollar, to avoid extreme volatility. USDT (USD Tether)
              and USDC (USD Coin) are commonly used to transfer value or park
              funds during market swings. They combine the benefits of crypto
              with stability.
            </li>
            <li>
              <strong>Meme Coins:</strong> These coins are created for fun or
              social experiments. They gain traction through online communities
              and hype rather than utility. Dogecoin and Shiba Inu are famous
              examples. These coins are highly volatile and speculative.
            </li>
          </ol>
        </section>
        <section id="iida">
          <h2 className="mt-8 mb-4 text-2xl font-semibold">
            Invest Divas Diamond Analysis
          </h2>
          <p className="mb-4 text-gray-300">
            Wondering about how a cryptocurrency is doing? The Invest Diva
            Diamond Analysis (IDDA) gives us five key areas to check. Here's a
            simplified look at each:
          </p>
          <ul className="mb-6 list-inside list-disc space-y-2 pl-2 text-gray-300">
            <li>
              <strong>Intentional Analysis (Your Goals):</strong> Think back to
              why you would bought this crypto. If it is for long-term growth,
              does the project still look promising for the future? Are they
              hitting milestones? Is the overall idea still relevant? If you are
              hoping for quicker gains, has it seen some upward movement
              recently? Good performance is tied to your initial reasons for
              investing. A slow-but-steady gainer might be great for long-term
              goals but not for a quick flip.
            </li>
            <li>
              <strong>Capital Analysis (Risk Management):</strong> Consider how
              the price changes make you feel. If the daily ups and downs are
              causing significant anxiety, it may not be perform well for your
              personal risk tolerance. Even if the price is generally
              increasing, wild, unpredictable swings can be a sign of higher
              risk, which might not be suitable for everyone. Good performance,
              for you, means growth you can stomach without constant stress.
            </li>
            <li>
              <strong>Fundamental Analysis (The Crypto's Core):</strong> Try to
              find out if the cryptocurrency is actually being used for
              something. Are there news articles about real-world applications,
              partnerships with other companies, or growth in the number of
              people using the technology? Is the team actively developing the
              project, releasing updates, and addressing any issues? A strong
              foundation, a real use and ongoing development is often a good
              sign for future performance. Look beyond just the price and see
              what the project is doing.
            </li>
            <li>
              <strong>Technical Analysis (Price Trends):</strong> Open a simple
              price chart for the cryptocurrency over a few weeks or months. Can
              you see a general trend upwards? Are there more "green candles"
              (representing price increases) than "red candles" (price
              decreases)? Has the price recently broken above previous high
              points? Consistently making higher highs and higher lows is a
              basic sign of positive performance in technical analysis.
            </li>
            <li>
              <strong>Sentimental Analysis (Market Mood):</strong> Get a general
              sense of what people are saying about this crypto online. Are news
              articles mostly positive? Is there a lot of excitement and
              optimistic discussion on social media and forums? While you
              shouldn't base your decisions solely on hype, a generally positive
              market sentiment can sometimes contribute to upward price
              movement. However, be wary of extreme hype without solid
              fundamentals to back it up, that can be a warning sign.
            </li>
          </ul>
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
