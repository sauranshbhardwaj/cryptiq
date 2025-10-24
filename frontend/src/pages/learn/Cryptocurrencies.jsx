import React from "react";

const subtopics = [
  {
    id: "decentralization_and_blockchain",
    label: "Decentralization and Blockchains",
  },
  { id: "key_benefits", label: "Key Cryptocurrency Benefits" },
];

export default function Cryptocurrencies() {
  return (
    <div className="flex h-[calc(100vh-4rem)]">
      <div className="w-full overflow-y-auto scroll-smooth py-6 lg:w-3/4 lg:px-4 lg:pr-8">
        <h1 className="mb-6 text-3xl font-bold">Cryptocurrencies</h1>

        <section id="sub0" className="mb-6">
          <p className="text-gray-300">
            Simply put, cryptocurrencies are a digital form of money. While
            traditional digital currencies are linked to bank accounts and have
            physical forms like notes and coins, cryptocurrencies operate
            differently as a type of virtual currency. A key security feature is
            cryptography, which significantly reduces the chances of
            counterfeiting.
          </p>
        </section>

        <section id="decentralization_and_blockchain" className="mb-6">
          <h2 className="mb-4 text-2xl font-semibold">
            Decentralization and Blockchain
          </h2>
          <p className="mb-4 text-gray-300">
            A fundamental idea behind many cryptocurrencies is decentralization,
            which means they operate without a central authority like a bank.
            This is usually made possible through blockchain technology, a
            shared, transparent record-keeping system that logs transactions
            across many computers worldwide.
          </p>
          <p className="mb-4 text-gray-300">
            Despite their lack of a physical form, cryptocurrencies can be used
            as a medium of exchange for goods and services. However, it is
            crucial to recognize that the value of cryptocurrencies can be
            highly volatile, meaning it can change rapidly and significantly.
          </p>
        </section>

        <div className="mb-6 rounded border-l-4 border-blue-500 bg-[#1e2e3e] p-4">
          <strong>Note:</strong> Bitcoin was the first established
          cryptocurrency, but many attempts at creating digital currencies
          occurred years before Bitcoin was formally introduced.
        </div>

        <section id="key_benefits">
          <h2 className="mt-8 mb-4 text-2xl font-semibold">
            Key Cryptocurrency Benefits
          </h2>
          <p className="mb-4 text-gray-300">
            Here are a number of solutions that cryptocurrencies may be able to
            provide through their decentralized nature:
          </p>
          <ul className="list-inside list-disc space-y-2 pl-2 text-gray-300">
            <li>
              <strong>Reducing Corruption:</strong> Decentralization is about
              spreading out control so that no single person or group has too
              much power, which helps reduce the chance of corruption. When
              control is shared across a network, it becomes harder for any one
              entity to misuse it. Although there have been cases of market
              manipulation, the main idea behind blockchain technology is to
              distribute power evenly and prevent central authority from taking
              over.
            </li>
            <li>
              <strong>Limited Money printing:</strong> Unlike traditional
              currencies issued by central banks, which can create more money
              through mechanisms like quantitative easing, many cryptocurrencies
              have a limited supply. Once all coins are in circulation, there's
              no way to simply print more. This is different from fiat
              currencies, where excessive printing can cause inflation and even
              hyperinflation, lowering the value of money considerably.
            </li>
            <li>
              <strong>Complete control over funds:</strong> Traditional banks
              hold your money and can freeze accounts or change policies, since
              they control the funds and work with governments. On the other
              hand, cryptocurrencies let you have more control because you
              manage your assets directly through private keys, without relying
              on banks or governments.
            </li>
            <li>
              <strong>Elimination of Intermediaries:</strong> Traditional
              financial transactions often rely on intermediaries like banks or
              payment processors, which usually charge additional fees. In many
              cryptocurrency networks, the participants themselves are the
              intermediaries, typically resulting in much lower transaction
              fees.
            </li>
            <li>
              <strong>Financial access for the Unbanked:</strong> Many people
              around the world still do not have access to traditional banking
              services. Cryptocurrencies could help bring digital commerce to
              these individuals, since having a mobile phone might be enough to
              get involved in the cryptocurrency world. In fact, in many areas,
              more people have phones than access to banks.
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
