import React from "react";

const subtopics = [
  { id: "key_characteristics", label: "Key Characteristics" },
  { id: "evolution", label: "Evolution" },
];

export default function Money() {
  return (
    <div className="flex h-[calc(100vh-4rem)]">
      <div className="w-full overflow-y-auto scroll-smooth py-6 lg:w-3/4 lg:px-4 lg:pr-8">
        <h1 className="mb-6 text-3xl font-bold">Money</h1>

        <section id="sub0" className="mb-6">
          <p className="text-gray-300">
            Before delving into the intricacies of cryptocurrencies, it is
            crucial to establish a fundamental understanding of money itself.
            The underlying philosophy of money presents a somewhat cyclical
            concept
          </p>
        </section>

        <section id="key_characteristics" className="mb-6">
          <h2 className="mb-4 text-2xl font-semibold">Key Characteristics</h2>
          <p className="mb-4 text-gray-300">
            For an asset to function effectively as money, it must possess
            several key characteristics that establish trust, usability, and
            acceptance:
          </p>
          <ul className="list-inside list-disc space-y-2 pl-2 text-gray-300">
            <li>
              <strong>Widespread Ownership:</strong> A significant portion of
              the population must possess it, enabling practical use in everyday
              transactions.
            </li>
            <li>
              <strong>Merchant Acceptance:</strong> Merchants must widely accept
              it as a legitimate form of payment for goods and services.
            </li>
            <li>
              <strong>Public Confidence:</strong> Society as a whole must
              maintain confidence in its present and future value, ensuring
              long-term stability.
            </li>
          </ul>
        </section>

        <section id="evolution">
          <h2 className="mt-8 mb-4 text-2xl font-semibold">Evolution</h2>
          <p className="mb-4 text-gray-300">
            In earlier times, when people traded goods directly - like
            exchanging livestock for shoes - the value of each item was heavily
            based on its physical features. But when coins, paper money, and
            credit systems started to be used, everything changed. This shift
            not only redefined what money is but also influenced how trust is
            established around it. As time went on, one of the biggest changes
            in money was how easy it became to use for transactions. In the
            past, transporting large amounts of precious metals between places
            was difficult, which led to the invention of paper money. Later,
            credit cards made buying and selling even more convenient. It's
            important to recognize that traditional credit systems depend on
            currencies managed by governments. Today, as the world becomes more
            interconnected and people pay closer attention to central banks
            motives, cryptocurrencies are becoming a promising alternative for
            handling money.
          </p>
          <p className="mb-4 text-gray-300">
            An interesting point to consider is the nomenclature applied to
            traditional, government-backed currencies in the contemporary
            financial environment. Currencies such as the U.S. dollar are now
            formally referred to as fiat currency, particularly in light of the
            emergence of cryptocurrencies. The term "fiat" denotes legal tender,
            such as coins and banknotes, whose value is derived solely from
            governmental decree.
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
