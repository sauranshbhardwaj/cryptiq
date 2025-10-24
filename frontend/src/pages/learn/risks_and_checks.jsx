import React from "react";

const subtopics = [
  { id: "hype_risks", label: "Hype Risk" },
  { id: "security_risks", label: "Security Risk" },
  { id: "volatility_risk", label: "Volatility Risk" },
  { id: "liquidity_risk", label: "Liquidity Risk" },
  { id: "vanishing_risk", label: "Vanishing Risk" },
  { id: "vanishing_risk", label: "Regulation Risk" },
];

export default function Risks_and_checks() {
  return (
    <div className="flex h-[calc(100vh-4rem)]">
      <div className="w-full overflow-y-auto scroll-smooth py-6 lg:w-3/4 lg:px-4 lg:pr-8">
        <h1 className="mb-6 text-3xl font-bold">Notable Risks and Checks</h1>

        <section id="sub0" className="mb-6">
          <p className="text-gray-300">
            The world of cryptocurrencies presents a unique set of potential
            pitfalls. By becoming knowledgeable about these risks, you can make
            more informed decisions and build a strategy that aligns with your
            risk tolerance and safeguards your financial well-being. Here are
            several key categories of cryptocurrency risks to be aware of.
          </p>
        </section>

        <section id="hype_risks" className="mb-6">
          <h2 className="mb-4 text-2xl font-semibold">Hype Risks</h2>
          <p className="mb-4 text-gray-300">
            While identifying opportunities is important, making investment
            decisions solely based on social media trends and hype can be
            detrimental. Often, individuals may not fully understand the
            fundamentals of a cryptocurrency and instead follow popular opinion
            or celebrity endorsements. The "crypto bubbles" observed between
            2017 and 2022 were largely fueled by such market hype. Following the
            initial excitement, market corrections are common, leading to panic
            selling and significant price drops, sometimes referred to as
            "crypto winters." This behavior contradicts the fundamental
            investment principle of "buy low and sell high.".
          </p>
          <p className="mb-4 text-gray-300">
            The cryptocurrency community has even developed its own terminology
            to describe these hype-driven behaviors:
          </p>
          <ul className="mb-4 list-inside list-disc space-y-2 pl-2 text-gray-300">
            <li>
              <strong>FOMO (Fear Of Missing Out):</strong> The anxiety of
              missing potential gains, leading to impulsive buying during price
              surges.
            </li>
            <li>
              <strong>FUD (Fear, Uncertainty, and Doubt):</strong> Negative
              sentiment or information that can cause market downturns.
            </li>
            <li>
              <strong>ATH (All-Time High):</strong> The highest price an asset
              has ever reached, often indicative of a potential bubble.
            </li>
            <li>
              <strong>BTFD (Buy The F***ing Dip!):</strong> An enthusiastic call
              to buy an asset after a price drop, based on the belief in its
              long-term potential.
            </li>
          </ul>
          <p className="mb-4 text-gray-300">
            To avoid the pitfalls of hype-driven investing, it's essential to
            thoroughly research the cryptocurrencies you are considering.
            Patience and informed decision-making are more effective than
            blindly following trends. Relying on hype without a sound investment
            strategy is akin to gambling.
          </p>
        </section>

        <section id="security_risks">
          <h2 className="mt-8 mb-4 text-2xl font-semibold">Security Risks</h2>
          <p className="mb-4 text-gray-300">
            Scams, hacking, and theft have been persistent concerns in the
            cryptocurrency market since its inception. Such incidents can
            negatively impact the value of cryptocurrencies, even if
            temporarily. Your cryptocurrency holdings can be compromised in
            several ways, making robust security measures paramount.
          </p>
          <p className="text-gray-300">
            <strong>
              Safety Check #1: Recognizing Bitcoin Investing Schemes:
            </strong>
          </p>
          <p className="mb-4 text-gray-300">
            Be wary of social media solicitations, even from accounts claiming
            to be influencers, offering Bitcoin in exchange for investment.
            Scammers often impersonate well-known figures using their photos and
            names. Always verify the authenticity of any offer by checking
            official websites and contacting customer service directly.
            Impersonation scams also occur on dating apps and other social
            networks, where scammers build trust over time before soliciting
            cryptocurrency investments and then disappearing. These "pig
            butchering" scams involve a gradual process of building rapport
            before the financial exploitation.
          </p>

          <p className="text-gray-300">
            <strong>
              Safety Check #2: Evaluating the Cryptocurrency Itself:
            </strong>
          </p>
          <p className="mb-4 text-gray-300">
            With a multitude of cryptocurrencies available and new ones
            emerging, it's crucial to scrutinize the underlying technology and
            avoid scams like "rug pulls" (where developers abandon a project
            after raising funds) and "pump and dump" schemes (where artificial
            hype drives up prices for the creators to sell at a profit, leaving
            other investors with losses). A critical step is to read the
            cryptocurrency's white paper, an official document outlining the
            project's details. If the promises seem too good to be true or the
            technology is unclear, it's best to avoid investing. Confidence in
            your understanding of an investment is key to managing risk.
          </p>

          <p className="text-gray-300">
            <strong>Safety Check #3: Choosing a Secure Exchange:</strong>
          </p>
          <p className="mb-4 text-gray-300">
            Cryptocurrency exchanges, platforms where you buy and sell digital
            assets, are also potential targets for security breaches. Numerous
            hacking incidents have occurred, highlighting the importance of
            selecting a trustworthy and credible exchange. The early hack of Mt.
            Gox in 2014 serves as a stark reminder of the risks. While exchanges
            have improved their security measures, incidents still occur.
            Centralized exchanges are generally more vulnerable. Before choosing
            an exchange, review its security protocols, check for bug bounty
            programs, insurance, SOC compliance, and the use of MultiSig wallets
            (requiring multiple private keys for transactions). Seek
            recommendations from trusted sources.
          </p>

          <p className="text-gray-300">
            <strong>Safety Check #4: Securing Your Wallet:</strong>
          </p>
          <p className="mb-4 text-gray-300">
            The security of your cryptocurrency wallet, where your private keys
            (needed to access your funds) are stored, is largely in your hands.
            While you don't physically hold the coins, securing your digital
            keys is essential. Consider using secure physical wallets and
            implementing backup strategies to protect your assets.
          </p>
        </section>

        <section id="volatility_risk">
          <h2 className="mt-8 mb-4 text-2xl font-semibold">Volatility Risk</h2>
          <p className="mb-4 text-gray-300">
            Volatility risk refers to the potential for unexpected and
            significant price movements in the market. While volatility can
            present opportunities for profit, it can also lead to substantial
            losses if you are unprepared. The cryptocurrency market, being
            relatively new and influenced by various factors, can experience
            sudden and sharp price swings. A long-term investment perspective
            can help mitigate the impact of short-term volatility, potentially
            turning price drops into buying opportunities.
          </p>
        </section>

        <section id="liquidity_risk">
          <h2 className="mt-8 mb-4 text-2xl font-semibold">Liquidity Risk</h2>
          <p className="mb-4 text-gray-300">
            Liquidity risk is the possibility of not being able to quickly sell
            an investment at a reasonable price. Low trading volume can make it
            difficult to execute trades at your desired price. The
            cryptocurrency market, particularly for less established coins, can
            experience periods of illiquidity, contributing to price volatility
            and increasing the potential for manipulation by large investors
            known as "whales." As the cryptocurrency market matures and becomes
            more widely adopted, liquidity is expected to improve with more
            trusted exchanges and easier access through ATMs and payment cards.
            Regulatory clarity will also likely contribute to increased
            liquidity. When evaluating a cryptocurrency, consider its
            acceptance, popularity, and the number of exchanges it is traded on,
            as lower liquidity can pose risks.
          </p>
        </section>

        <section id="vanishing_risk">
          <h2 className="mt-8 mb-4 text-2xl font-semibold">Vanishing Risk</h2>
          <p className="mb-4 text-gray-300">
            The cryptocurrency landscape is vast, with thousands of different
            coins and new ones emerging frequently. However, not all of these
            will survive in the long term. Similar to the dot-com bubble, where
            many internet-based companies failed while a few thrived, many of
            today's cryptocurrencies may eventually disappear. To minimize this
            "vanishing risk," it's crucial to conduct thorough fundamental
            analysis of the projects you invest in. Consider their purpose, the
            problem they aim to solve, their partnerships, and their long-term
            viability. While this risk cannot be entirely eliminated,
            understanding the fundamentals can help you avoid investing in
            projects with a higher likelihood of failure.
          </p>
        </section>

        <section id="regulation_risk">
          <h2 className="mt-8 mb-4 text-2xl font-semibold">Regulation Risk</h2>
          <p className="mb-4 text-gray-300">
            Initially, the lack of regulation was a defining characteristic of
            cryptocurrencies. However, as the market grows, governments
            worldwide are grappling with how to regulate this new asset class.
            The regulatory landscape is still evolving and varies significantly
            between countries. Regulation risk can manifest in two ways:
            unexpected regulatory announcements that can trigger market
            volatility and the inherent uncertainty surrounding the future
            nature of regulations. Even seemingly minor regulatory news can
            significantly impact cryptocurrency prices. While some investors
            welcome regulation for the increased stability and legitimacy it may
            bring, others are concerned about the potential impact on the
            decentralized nature of cryptocurrencies. The future of
            cryptocurrency regulation remains uncertain but has the potential to
            significantly shape the market.
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
