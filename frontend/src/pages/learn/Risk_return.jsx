import React from "react";

const subtopics = [
  { id: "risk_return_tradeoff", label: "Risk Return Tradeoff" },
];

export default function Risk_and_return() {
  return (
    <div className="flex h-[calc(100vh-4rem)]">
      <div className="w-full overflow-y-auto scroll-smooth py-6 lg:w-3/4 lg:px-4 lg:pr-8">
        <h1 className="mb-6 text-3xl font-bold">Risk Return Tradeoff</h1>

        <section id="risk_return_tradeoff" className="mb-6">
          <p className="mb-4 text-gray-300">
            In this part, we'll look at some of the key moments that have shaped
            how we think about and invest in digital currencies today. We'll
            talk about the big swings, both up and down, and the mix of
            excitement and doubt that has surrounded cryptocurrency along the
            way. Knowing about the past ups and downs is important as we explore
            more about investing in cryptocurrencies, along with the risks and
            rewards involved.
          </p>
          <p className="mb-4 text-gray-300">
            Starting around 2017, the important surge in prices of major
            cryptocurrencies, especially Bitcoin, brought crypto investing into
            the spotlight. Bitcoin saw incredible growth, increasing by over
            1,000%, while other lesser-known digital currencies like Ripple and
            NEM experienced even more remarkable jumps during that time. This
            sharp rise in value caught the attention of many, from seasoned
            investors to everyday people. By early 2018, discussions about
            Bitcoin and other cryptocurrencies had become common, even among
            those with no prior experience in investing.
          </p>
          <p className="mb-4 text-gray-300">
            Like any other type of investment, cryptocurrencies can experience
            sudden and sharp changes in value. After their swift rise, the
            market often faces a quick downturn, a period commonly called
            "crypto winter." For example, Bitcoin's price fell dramatically from
            nearly $20,000 to around $3,000 by January 2019. This drop caused
            many people to become skeptical, with some even questioning whether
            cryptocurrencies were scams. The market started to bounce back
            around July 2020, with prices beginning to rise again. By the end of
            2021, Bitcoin hit new highs, surpassing $68,000, which drew a lot of
            attention and some people felt a fear of missing out, often called
            FOMO. However, after that, there was another big price drop,
            bringing Bitcoin back down to about $20,000. Interestingly, this low
            was very similar to the price Bitcoin reached in 2018, during its
            previous peak.
          </p>
          <p className="mb-4 text-gray-300">
            In investment analysis, the $20,000 mark has historically acted as a
            support level for Bitcoin. This is a key price point where the
            cryptocurrency has often struggled to drop below. Other support
            levels can be seen around $13,000 and $7,000. Technical analysis
            helps identify these important levels, giving investors a clearer
            idea of potential price floors and helping them manage risks more
            effectively. Cryptocurrency markets are known for their sharp price
            swings, with swift rises and falls. This high volatility creates a
            tough balance between risk and reward. Early investors who sold at
            the right moments could enjoy huge profits, while those who bought
            at higher prices might have faced serious losses. Because of this
            unpredictable nature, many investors prefer to hold onto their
            assets for the long term instead of trying to predict short-term
            market movements.
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
