import React from "react";

const subtopics = [
  { id: "reducing_losses", label: "Minimizing Losses" },
  { id: "maximizing_gains", label: "Maximizing Gains" },
];

export default function Max_g_min_l() {
  return (
    <div className="flex h-[calc(100vh-4rem)]">
      <div className="w-full overflow-y-auto scroll-smooth py-6 lg:w-3/4 lg:px-4 lg:pr-8">
        <h1 className="mb-6 text-3xl font-bold">
          Maximizing gains and Minimizing losses
        </h1>

        <section id="sub0" className="mb-6">
          <p className="text-gray-300">
            Whether you're just starting out or have been investing in
            cryptocurrencies for a while, actively managing your portfolio can
            help you achieve better results. This doesn’t mean you need to watch
            the markets every second; instead, it’s about having strategies in
            place to manage risk and maximize potential rewards effectively.
          </p>
        </section>

        <section id="reducing_losses" className="mb-6">
          <h2 className="mb-4 text-2xl font-semibold">Minimizing Losses</h2>
          <ul className="list-inside list-disc space-y-2 pl-2 text-gray-300">
            <li>
              <strong>Tracking Your Returns:</strong>
            </li>
            <p className="mb-4 text-gray-300">
              Keep an eye on how your investments are doing across different
              exchanges and wallets. It's helpful to convert everything into a
              common currency like USD to simplify things, or record them
              separately based on the currency used for purchase, like BTC or
              USD. Review your logs monthly, quarterly, or yearly, depending on
              your investment timeline.
            </p>

            <li>
              <strong>Watch Exchange Fees:</strong>
            </li>
            <p className="mb-4 text-gray-300">
              Pay attention to transaction fees, especially if you're trading
              often. Look for exchanges with lower fees for your chosen crypto
              pairs, and consider using the exchange’s own cryptocurrency to
              lower costs. Remember to include these fees when calculating your
              profits.
            </p>

            <li>
              <strong>Strategic Exiting, Avoid Greed:</strong>
            </li>
            <p className="mb-4 text-gray-300">
              Stick to your planned profit targets based on technical analysis.
              Don’t get carried away chasing bigger gains.
            </p>

            <li>
              <strong>Cut liabilities:</strong>
            </li>
            <p className="mb-4 text-gray-300">
              Don’t hesitate to sell assets that aren’t performing well. This
              can free up money for other opportunities and might even provide
              some tax advantages.
            </p>
          </ul>
        </section>

        <section id="maximizing_gains" className="mb-6">
          <h2 className="mb-4 text-2xl font-semibold">Maximizing Gains</h2>
          <ul className="list-inside list-disc space-y-2 pl-2 text-gray-300">
            <li>
              <strong>Buying at the Bottom:</strong>
            </li>
            <p className="mb-4 text-gray-300">
              While it's not possible to do this consistently, using tools like
              Ichimoku and Fibonacci analysis can help spot potential buying
              opportunities.
            </p>

            <li>
              <strong>Patience Matters:</strong>
            </li>
            <p className="mb-4 text-gray-300">
              Don't let emotions drive your decisions during market swings.
              Staying patient usually results in better outcomes over the long
              run.
            </p>

            <li>
              <strong>Spotting Peaks:</strong>
            </li>
            <p className="mb-4 text-gray-300">
              Use technical analysis, like chart patterns and indicators to
              identify good times to sell.
            </p>

            <li>
              <strong>Thinking Independently:</strong>
            </li>
            <p className="mb-4 text-gray-300">
              Avoid following the crowd or hype blindly. Make your decisions
              based on analysis, not just popular trend.
            </p>
          </ul>
        </section>

        <p className="mb-4 text-gray-300">
          Overall, managing your crypto investments thoughtfully can make a big
          difference. Keep learning and stay disciplined to improve your chances
          of success.
        </p>
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
