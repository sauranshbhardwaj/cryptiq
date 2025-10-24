import React from "react";

const subtopics = [
  { id: "cryptography", label: "Cryptography" },
  { id: "nodes", label: "Nodes" },
  { id: "mining", label: "Mining" },
  { id: "blockchain", label: "Blockchain" },
];

export default function Working_of_cryptocurrencies() {
  return (
    <div className="flex h-[calc(100vh-4rem)]">
      <div className="w-full overflow-y-auto scroll-smooth py-6 lg:w-3/4 lg:px-4 lg:pr-8">
        <h1 className="mb-6 text-3xl font-bold">Working of Cryptocurrencies</h1>

        <section id="sub0" className="mb-6">
          <p className="text-gray-300">
            Cryptocurrencies, with Bitcoin being a prominent early example,
            demonstrated a key application of blockchain technology.
            Consequently, many individuals are more familiar with Bitcoin than
            the underlying blockchain innovation. This section will delve into
            the operational mechanisms of cryptocurrencies leveraging
            blockchain, their generation, and relevant terminology.
          </p>
        </section>

        <section id="cryptography" className="mb-6">
          <h2 className="mb-4 text-2xl font-semibold">Cryptography</h2>
          <p className="mb-4 text-gray-300">
            The "crypto" in cryptocurrency and cryptography signifies "secret,"
            often referring to anonymity within the digital realm. Historically,
            cryptography is the art of concealing messages. In the context of
            cryptocurrencies, it is employed to ensure security and a degree of
            anonymity.
          </p>
          <p className="mb-4 text-gray-300">
            Cryptocurrencies utilize cryptographic techniques to maintain the
            integrity of the system and prevent issues like double-spending.
            This is achieved through methods such as:
          </p>
          <ul className="list-inside list-disc space-y-2 pl-2 text-gray-300">
            <li>
              <strong>Hashing:</strong> Similar to a digital fingerprint, a hash
              function takes input data of any size and produces a fixed-size
              output. In cryptocurrencies, hashing plays a role in maintaining
              blockchain data structure, encoding account addresses, and
              enabling the mining process.
            </li>
            <li>
              <strong>Symmetric Encryption:</strong> This basic method uses a
              single secret key for both encrypting and decrypting data. A
              primary challenge is the need to securely exchange this key among
              all involved parties.
            </li>
            <li>
              <strong>Asymmetric Encryption:</strong> This more advanced method
              employs a pair of keys - a public key for encryption and a private
              key for decryption. Messages encrypted with a recipient's public
              key can only be decrypted using their corresponding private key.
            </li>
          </ul>
        </section>

        <section id="nodes" className="mb-6">
          <h2 className="mb-4 text-2xl font-semibold">Nodes</h2>
          <p className="mb-4 text-gray-300">
            Nodes are electronic devices within the blockchain network that
            perform the crucial task of record-keeping, enabling
            decentralization. These devices, which can range from computers to
            smartphones, maintain a connection to the internet and access to the
            blockchain network.
          </p>
        </section>

        <section id="mining" className="mb-6">
          <h2 className="mb-4 text-2xl font-semibold">Mining</h2>
          <p className="mb-4 text-gray-300">
            In many cryptocurrency networks, individuals who operate nodes
            voluntarily contribute their computing power to validate and record
            transactions. This process is known as mining. As a reward for their
            efforts, miners have the opportunity to collect transaction fees and
            earn newly generated cryptocurrency.
          </p>
          <p className="mb-4 text-gray-300">
            It's important to note that not all cryptocurrencies utilize mining.
            However, for those that do, the process involves miners solving
            complex cryptographic puzzles using specialized software. The first
            miner to find a solution adds a new block of verified transactions
            to the blockchain and receives a reward in the form of
            cryptocurrency. This computational effort is akin to "extracting"
            new coins into circulation.
          </p>
          <p className="mb-4 text-gray-300">
            The difficulty of these cryptographic puzzles requires significant
            computing power, leading to a competitive environment among miners.
            While the probability of a single miner consistently solving every
            block is statistically low, those with greater computational
            resources generally have a higher chance of success.
          </p>
        </section>

        <section id="blockchain">
          <h2 className="mt-8 mb-4 text-2xl font-semibold">Blockchain</h2>
          <p className="mb-4 text-gray-300">
            Imagine a digital ledger that is shared across a network of
            computers. This ledger, the blockchain, records cryptocurrency
            transactions in groups called "blocks." When a new set of
            transactions is ready to be added to the ledger, a new block is
            created. This new block contains the details of these transactions
            and, crucially, a cryptographic link to the previous block in the
            chain. This link is a unique digital fingerprint of the previous
            block's data.
          </p>
          <p className="mb-4 text-gray-300">
            This cryptographic linking is fundamental to the security of the
            blockchain. If anyone were to tamper with the information in a past
            block, its digital fingerprint would change. Because each subsequent
            block contains the fingerprint of the one before it, this change
            would ripple through the entire chain, immediately making the
            tampering evident to everyone on the network.
          </p>
          <p className="mb-4 text-gray-300">
            Instead of this ledger being held by a single entity, a copy of the
            blockchain is distributed across all the computers participating in
            the network. When a new block is created, it is broadcast to this
            network. Before this new block is permanently added to everyone's
            copy of the ledger, the network participants must collectively agree
            that the transactions within it are valid. This agreement is reached
            through a process called "consensus," and different cryptocurrencies
            employ various methods to achieve this.
          </p>
          <p className="mb-4 text-gray-300">
            Once a block of transactions has been verified by the network and
            added to the chain, it becomes an immutable part of the historical
            record. This means it is extremely difficult to alter or delete. The
            combination of cryptographic linking and distributed consensus
            ensures the integrity and transparency of the blockchain, allowing
            for secure and auditable transactions without the need for a central
            authority to maintain the ledger.
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
