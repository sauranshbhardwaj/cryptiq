import React from "react";

const subtopics = [
  { id: "charting_and_price_action", label: "Charting and Price Action" },
  { id: "time_chart_analysis", label: "Importance of time in Chart Analysis" },
  { id: "spotting_trends", label: "Spotting Trends" },
];

export default function Technical_analysis() {
  return (
    <div className="flex h-[calc(100vh-4rem)]">
      <div className="w-full overflow-y-auto scroll-smooth py-6 lg:w-3/4 lg:px-4 lg:pr-8">
        <h1 className="mb-6 text-3xl font-bold">Technical Analysis</h1>

        <section id="sub0" className="mb-6">
          <p className="text-gray-300">
            Basically, technical analysis is like looking at a cryptocurrency's
            past price charts to get a sense of where it might head next. It's
            built on the idea that how investors have reacted before can give us
            clues about what they might do in the future. This often holds true
            because people tend to repeat certain habits and thinking patterns
            when making decisions, and many traders use similar tools, which can
            make some price points stand out more. If you spot these patterns
            early on, it can give you an edge. Just remember that while
            technical analysis can help you understand the chances of different
            outcomes, it doesn't guarantee profits. Good risk management is
            always important to stay safe.
          </p>
        </section>

        <section id="charting_and_price_action" className="mb-6">
          <h2 className="mb-4 text-2xl font-semibold">
            Charting the Price Action
          </h2>
          <p className="mb-4 text-gray-300">
            To understand how the price of a cryptocurrency has changed over
            time, technical analysts often look at charts. These are visual
            tools that show the price of a cryptocurrency in relation to another
            currency, like US dollars, over a certain period. Charts help make
            it easier to spot trends and patterns in price movements. While
            there are different types of charts, some of the most common ones
            include:
          </p>
          <ul className="list-inside list-disc space-y-2 pl-2 text-gray-300">
            <li>
              <strong>Line Charts:</strong> These simple charts only show the
              closing price of a cryptocurrency for each time period, connecting
              these points with a line. While they give you a general idea of
              how the price moves, they don't show the highs and lows that
              happen within that period.
            </li>
            <li>
              <strong>Bar Charts:</strong> Bar charts offer a clear way to see
              detailed information about a specific time period. They show the
              opening price, the highest price, the lowest price, and the
              closing price. Each vertical bar illustrates the overall price
              range from high to low, while small horizontal lines indicate the
              opening price on the left and the closing price on the right.
            </li>

            <div className="my-6 flex justify-center">
              <img
                src="/learn/barc.png"
                alt="Bar Chart Example"
                className="w-full max-w-lg rounded border border-gray-700 shadow-md"
              />
            </div>

            <li>
              <strong>Candlestick Charts:</strong> Candlestick charts are widely
              loved by traders and analysts because they are easy to interpret
              visually. They show the open, high, low, and close prices for a
              specific time period, much like bar charts. What makes them stand
              out is the colored area, called the 'body,' which represents the
              price movement during that period. Usually, a green or bullish
              body means the closing price was higher than the opening,
              suggesting buying pressure. Conversely, a red or bearish body
              indicates the closing was lower than the opening, pointing to
              selling pressure. The thin lines above and below the body, known
              as 'wicks' or 'shadows,' show the highest and lowest prices
              reached during that time frame.
            </li>
          </ul>

          <div className="my-6 flex justify-center">
            <img
              src="/learn/candlestick.png"
              alt="Bar Chart Example"
              className="w-full max-w-lg rounded border border-gray-700 shadow-md"
            />
          </div>
        </section>

        <section id="time_chart_analysis">
          <h2 className="mt-8 mb-4 text-2xl font-semibold">
            Importance of time in Chart Analysis
          </h2>
          <p className="mb-4 text-gray-300">
            The time frame you pick for your technical analysis really depends
            on your investing approach. If you're a short-term trader, looking
            at charts with time frames like 30 minutes, 1 hour, or 4 hours can
            be quite helpful. On the other hand, long-term investors might focus
            on daily, weekly, or even monthly charts to spot bigger trends and
            important price levels. Remember that all types of charts, whether
            line, bar, or candlestick can be examined across different time
            frames to suit your analysis.
          </p>
        </section>

        <section id="spotting_trends">
          <h2 className="mt-8 mb-4 text-2xl font-semibold">Spotting Trends</h2>
          <p className="mb-4 text-gray-300">
            As you look at price charts, you'll notice certain patterns and
            levels that seem to show up again and again. This repetition is
            often tied to what we call market psychology, which is basically,
            how traders and investors feel about the market at any given time.
            One of the most important patterns to spot is a trend. A trend
            simply means the general direction in which the price of a
            cryptocurrency is moving. When prices keep making higher highs and
            higher lows, that's called an uptrend, indicating positive sentiment
            and more buying activity. Conversely, a downtrend happens when
            prices form lower highs and lower lows, showing negative feelings
            and selling pressure. Picking up on the current trend early on can
            open up opportunities for trading, since, as the saying goes, "the
            trend is your friend."
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
