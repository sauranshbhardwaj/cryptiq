import React from "react";

const subtopics = [
  { id: "the_transaction_process", label: "The transaction process" },
  { id: "network_fees", label: "Network Fees" },
  { id: "exchange_fees", label: "Cryptocurrency Exchange Fees" },
];

export default function Transactions_and_fees() {
  return (
    <div className="flex h-[calc(100vh-4rem)]">
      <div className="w-full overflow-y-auto scroll-smooth py-6 lg:w-3/4 lg:px-4 lg:pr-8">
        <h1 className="mb-6 text-3xl font-bold">Transactions and Fees</h1>

        <section id="the_transaction_process" className="mb-6">
          <h2 className="mb-4 text-2xl font-semibold">
            The transaction process
          </h2>
          <p className="mb-4 text-gray-300">
            Cryptocurrency transactions involve the transfer of digital assets
            between users on a blockchain network. Here's a simplified process
            flow of how transactions work:
          </p>
          <ol className="list-inside list-disc space-y-2 pl-2 text-gray-300">
            <li>
              <strong>Initiation:</strong> A user uses their crypto wallet to
              specify the recipient's public address and the amount of
              cryptocurrency to send.
            </li>
            <li>
              <strong>Transaction Creation:</strong> The wallet software creates
              a transaction data package containing sender, receiver, and amount
              details.
            </li>
            <li>
              <strong>Digital Signature:</strong> The sender uses their private
              key to create a unique digital signature, verifying their
              authorization.
            </li>
            <li>
              <strong>Broadcasting:</strong> The transaction is broadcasted to
              the cryptocurrency network nodes.
            </li>
            <li>
              <strong>Verification:</strong> Network nodes verify the
              transaction's validity (sender's balance, signature, and format).
            </li>
            <li>
              <strong>Inclusion in a Block:</strong> Valid transactions are
              bundled into a new block by miners or validators. Miners solve a
              complex puzzle to add a block, which is then verified by others.
              Validators are chosen to propose and attest to new blocks based on
              their staked cryptocurrency.
            </li>
            <li>
              <strong>Blockchain Update:</strong> The validated block is added
              to the blockchain, making the transactions permanent.
            </li>
            <li>
              <strong>Confirmation:</strong> Transactions gain "confirmation" as
              more blocks are added afterward, increasing irreversibility.
            </li>
            <li>
              <strong>Recipient Receives Funds:</strong> The recipient's wallet
              balance updates upon sufficient confirmations.
            </li>
          </ol>
        </section>

        <section id="network_fees">
          <h2 className="mt-8 mb-4 text-2xl font-semibold">
            Cryptocurrency Transaction Fees (Network Fees)
          </h2>
          <p className="mb-4 text-gray-300">
            Think of sending a cryptocurrency transaction like sending a letter.
            The "network fee" is like the postage you pay to ensure your letter
            gets delivered by the postal service (in this case, the blockchain
            network).
          </p>
          <p className="mb-4 text-gray-300">
            They exist for the following reasons:
          </p>
          <ul className="mb-4 list-inside list-disc space-y-2 pl-2 text-gray-300">
            <li>
              <strong>Paying the "Miners" or "Validators":</strong> These are
              the people or entities that dedicate computing power (miners in
              Proof-of-Work systems like Bitcoin) or stake their own
              cryptocurrency (validators in Proof-of-Stake systems like newer
              versions of Ethereum and others) to process and secure the
              network. They bundle your transaction (and many others) into a
              "block" which is then added to the blockchain. The fee is an
              incentive for them to do this work.{" "}
            </li>
            <li>
              <strong>Preventing Spam:</strong> If sending crypto was completely
              free, someone could flood the network with millions of tiny,
              useless transactions, clogging it up and making it slow for
              everyone else. Transaction fees make this kind of "spam attack"
              very expensive and therefore impractical.
            </li>
            <li>
              <strong>Managing Congestion:</strong> When lots of people are
              trying to send transactions at the same time, the "demand" for
              space in the next block increases. Like an auction, those who are
              willing to pay a higher fee are more likely to have their
              transaction included in the next block and confirmed faster.
            </li>
          </ul>
          <p className="mb-4 text-gray-300">
            Wondering why your crypto transaction fee changes? It mainly depends
            on a few simple things. First, how busy the network is. When lots of
            people are making transactions, the fees tend to go up. Think of it
            like traffic on a highway during rush hour, you might pay for a
            faster lane or wait longer in traffic. During quieter times, fees
            usually drop.
          </p>
          <p className="mb-4 text-gray-300">
            Second, consider the size of your transaction. It's not just about
            how much you're sending; it also includes info about who's sending,
            who's receiving, and any digital signatures. If your transaction is
            complex or involves many details, it will take up more space and
            likely cost more to process. It's similar to mailing a larger or
            heavier letter, you need more postage.
          </p>
          <p className="mb-4 text-gray-300">
            Lastly, each network has its own way of setting fees. For example,
            Bitcoin's fees depend on how many transactions are waiting and how
            big they are, kind of like how postage depends on weight and size.
            Ethereum's fees, called 'gas,' are based on how much computation the
            transaction needs and how much users are willing to pay per unit of
            that work.
          </p>
        </section>

        <section id="exchange_fees">
          <h2 className="mt-8 mb-4 text-2xl font-semibold">
            Cryptocurrency Exchange Fees
          </h2>
          <p className="mb-4 text-gray-300">
            Think of a cryptocurrency exchange like a stockbroker or a bank.
            They provide a service a platform where you can buy, sell, and trade
            cryptocurrencies. Just like brokers and banks charge for their
            services, crypto exchanges also have fees.
          </p>
          <p className="mb-4 text-gray-300">
            They exist for the following reasons:
          </p>
          <ul className="mb-4 list-inside list-disc space-y-2 pl-2 text-gray-300">
            <li>
              <strong>Running the Platform:</strong> Exchanges have significant
              operational costs. They need to maintain servers, ensure security,
              provide customer support, comply with regulations, and develop
              their trading tools. Fees help cover these expenses.
            </li>
            <li>
              <strong>Providing Different Levels of Service:</strong> Some
              exchanges offer more advanced trading features, higher liquidity,
              or better customer support, and their fees might reflect these
              premium services.
            </li>
          </ul>
          <p className="mb-4 text-gray-300">
            How do the different types of exchange fees work?
          </p>
          <ul className="mb-4 list-inside list-disc space-y-2 pl-2 text-gray-300">
            <li>
              <strong>Trading Fees (Buying and Selling):</strong> When you buy
              or sell crypto, the exchange usually takes a small percentage of
              the total value of your trade. The exact percentage often depends
              on your trading volume, and whether you're a maker or trader.
              Makers place orders that sit on the exchange's "order book" (a
              list of buy and sell orders) and are filled later. They "make"
              liquidity available. Exchanges often charge lower fees to makers
              because they help the market function more efficiently. Takers
              place orders that are filled immediately against existing orders
              on the order book. They "take" liquidity. Takers usually pay
              slightly higher fees.
            </li>
            <li>
              <strong>Deposit Fees:</strong> Exchanges often don't charge fees
              when you deposit cryptocurrency because they want to encourage
              users to bring their assets to their platform. However, depositing
              fiat currency (like GBP or USD) might incur a fee depending on the
              method. For example, bank transfers might be free or have a small
              charge, while using a credit or debit card is often more expensive
              for the exchange to process, so they pass on that cost to you.
            </li>
            <li>
              <strong>Withdrawal Fees:</strong> When you withdraw cryptocurrency
              to your own external wallet, the exchange will usually charge a
              fee to cover the network transaction fee they have to pay to send
              the crypto on the blockchain. This fee is usually a fixed amount
              for each specific cryptocurrency and can vary depending on the
              network conditions (though it's the exchange deciding what fee to
              charge you on top of the network fee). Fiat withdrawals also often
              have fees depending on the currency and the method of withdrawal
              (e.g., bank transfer).
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
