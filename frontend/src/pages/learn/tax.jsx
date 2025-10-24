import React from "react";

const subtopics = [
  { id: "capital_gains_tax", label: "Capital Gains Tax" },
  { id: "income_tax", label: "Income Tax" },
  { id: "imp_reg", label: "Important Tips" },
];

export default function Tax() {
  return (
    <div className="flex h-[calc(100vh-4rem)]">
      <div className="w-full overflow-y-auto scroll-smooth py-6 lg:w-3/4 lg:px-4 lg:pr-8">
        <h1 className="mb-6 text-3xl font-bold">
          Navigating Tax implications and regulations regarding Cryptocurrencies
        </h1>

        <section id="sub0" className="mb-6">
          <p className="text-gray-300">
            In the UK, both Capitals Gains tax(CGT) and Income tax can apply to
            Cryptocurrency activities.
          </p>
        </section>

        <div className="mb-6 rounded border-l-4 border-blue-500 bg-[#1e2e3e] p-4">
          <strong>Note:</strong> Cryptocurrency tax rules in the UK can change.
          Always refer to the latest official guidance on the GOV.UK website
          (specifically the HMRC pages) for the most up-to-date information and
          regulations.
        </div>

        <section id="capital_gains_tax" className="mb-6">
          <h2 className="mb-4 text-2xl font-semibold">
            Capital Gains Tax (CGT)
          </h2>
          <p className="mb-4 text-gray-300">
            You're liable for CGT when you sell, exchange, or dispose of
            cryptoassets. This includes converting crypto to pounds, swapping it
            for other cryptocurrencies, using crypto to buy goods or services,
            gifting crypto (except to a spouse or civil partner), or donating
            crypto to charity.
          </p>
          <ul className="list-inside list-disc space-y-2 pl-2 text-gray-300">
            <li>
              <strong>When it doesn't count:</strong>
            </li>
            <p className="mb-4 text-gray-300">
              Simply buying or holding crypto doesn't trigger CGT. Gifting
              crypto to a spouse or civil partner is also exempt. If your total
              gains from all chargeable assets in a year are less than the
              annual exempt amount (£3,000 for 2024-2025), you don’t pay CGT.
              Also, crypto held within tax-advantaged accounts like ISAs or
              SIPPs are generally exempt, although direct crypto investments
              within these accounts are limited.
            </p>

            <li>
              <strong>How to work out your gain:</strong>
            </li>
            <p className="mb-4 text-gray-300">
              Subtract your original purchase cost (including transaction fees)
              from what you received when you disposed of the crypto.
            </p>

            <li>
              <strong>Expenses you can deduct:</strong> Costs related to buying,
              selling, or managing your crypto assets can be deducted.
            </li>

            <li>
              <strong>Losses:</strong>
            </li>
            <p className="mb-4 text-gray-300">
              If you end up making a loss, you can offset this against other
              gains this year or carry it forward to future years.
            </p>

            <li>
              <strong>Pooling rules:</strong>
            </li>
            <p className="mb-4 text-gray-300">
              For each type of crypto token you own, you need to pool them and
              work out the average cost. However, if you buy tokens on the same
              day you sell, or within 30 days of selling, you don’t pool them,
              instead, you follow the same rules as for shares.
            </p>
          </ul>
        </section>

        <section id="income_tax" className="mb-6">
          <h2 className="mb-4 text-2xl font-semibold">Income Tax</h2>
          <p className="mb-4 text-gray-300">
            When does this apply? If you receive crypto as income, not just from
            selling, then Income Tax may be due. This includes:
          </p>
          <ul className="list-inside list-disc space-y-2 pl-2 text-gray-300">
            <li>
              Getting paid in crypto (the value in GBP at the time counts)
            </li>
            <li>Staking rewards (considered miscellaneous income)</li>
            <li>
              Rewards from mining (taxed differently depending on whether you're
              a professional miner or just doing it casually)
            </li>
            <li>Airdrops received for providing a service</li>
            <li>Certain DeFi activities like earning interest from lending</li>
            <li>
              If your crypto activities are frequent, organized, and
              professional, profits may be taxed as self-employed income.
            </li>
          </ul>
        </section>

        <section id="imp_reg" className="mb-6">
          <h2 className="mb-4 text-2xl font-semibold">Important Tips</h2>
          <ul className="list-inside list-disc space-y-2 pl-2 text-gray-300">
            <li>
              Keep detailed records of every transaction : dates, amounts, GBP
              values at the time, fees, and the type of transaction. This helps
              when calculating CGT and Income Tax, and tracking pooled
              costs.{" "}
            </li>
            <li>
              For income, record the GBP value of crypto when you receive it. -
              You might be able to use the £1,000 trading allowance for
              small-scale crypto activities.
            </li>
            <li>
              Be aware that crypto received as income can be subject to CGT
              later if its value increases. You can't pay CGT on the amount
              already taxed as income.{" "}
            </li>
            <li>
              The difference between trading (Income Tax) and investing (CGT)
              can be complicated. If unsure, it's best to seek professional
              advice.
            </li>
            <li>
              Tax rules around DeFi projects and NFTs are still developing, so
              guidance may change.
            </li>
            <li>
              If you need to declare unpaid taxes from previous years, HMRC
              offers the Cryptoasset Disclosure Service.
            </li>
            <li>
              While exchange reports can help track transactions, remember they
              are not tax calculations and won't automatically account for
              pooled costs.{" "}
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
