import React from "react";

const subtopics = [
  { id: "wallets", label: "Crypto Wallets" },
  { id: "key_terminologies", label: "Key Terminologies" },
  { id: "hot_wallets", label: "Hot Wallets" },
  { id: "cold_wallets", label: "Cold Wallets" },
  { id: "types_of_wallets", label: "Types of Wallets" },
  { id: "safe_practices", label: "Safe practices" },
];

export default function Wallets_and_keys() {
  return (
    <div className="flex h-[calc(100vh-4rem)]">
      <div className="w-full overflow-y-auto scroll-smooth py-6 lg:w-3/4 lg:px-4 lg:pr-8">
        <h1 className="mb-6 text-3xl font-bold">Crypto Wallets and Keys</h1>

        <section id="wallets" className="mb-6">
          <h2 className="mb-4 text-2xl font-semibold">Crypto Wallets</h2>
          <p className="text-gray-300">
            Crypto Wallets are software programs, or sometimes a physical device
            or a piece of paper - that help you manage your cryptocurrency.
            Unlike traditional digital money, cryptocurrencies aren't stored in
            banks, you must have a crypto wallet to use them.
          </p>
          <p className="text-gray-300">
            Wallets don't store the cryptocurrency itself, but rather, its
            public and private keys allow you to access and manage your funds in
            the blockchain. A way to think about it is, think of the public key
            as your account number, for receiving cryptocurrencies, and the
            private key is the secret pin to authorize transactions and spend
            your crypto.
          </p>
        </section>

        <section id="key_terminologies" className="mb-6">
          <h2 className="mb-4 text-2xl font-semibold">Key Terminologies</h2>
          <ul className="list-inside list-disc space-y-2 pl-2 text-gray-300">
            <li>
              <strong>Wallet Address:</strong> It is a unique sequence of
              numbers and letters that identify your wallet for receiving
              cryptocurrency.
            </li>
            <li>
              <strong>Public Key:</strong> A code that allows you to receive
              cryptocurrencies into your wallet. It's mathematically linked to
              your wallet address, but it isn't identical to it.
            </li>
            <li>
              <strong>Private Key:</strong> An essential key for accessing and
              spending your cryptocurrency.
            </li>
            <li>
              <strong>Seed Phrase / Recovery Phrase:</strong>A list of words
              that can be used to recover your entire wallet, if your device is
              lost or damaged. Make sure to write this down and keep it in a
              secure, offline location!
            </li>
          </ul>
        </section>

        <div className="mb-6 rounded border-l-4 border-blue-500 bg-[#1e2e3e] p-4">
          <strong>Note:</strong> You must never share your private key, keep it
          extremely safe!
        </div>

        <section id="hot_wallets" className="mb-6">
          <h2 className="mt-8 mb-4 text-2xl font-semibold">Hot Wallets</h2>
          <p className="mb-4 text-gray-300">
            Hot wallets are designed for easy and quick access to your
            cryptocurrencies. They are often connected to the internet, allowing
            for swift transactions. Think of them like your everyday spending
            cash in your physical wallet or a readily accessible checking
            account.
          </p>
          <p className="mb-4 text-gray-300">
            Because they are often online, hot wallets are more vulnerable to
            cyber threats like hacking, malware, and phishing attacks. If your
            device or the platform hosting your hot wallet is compromised, your
            funds could be at risk. It's like keeping a large amount of cash in
            a wallet that could be easily stolen or accessed by someone else.
          </p>
        </section>

        <section id="cold_wallets" className="mb-6">
          <h2 className="mt-8 mb-4 text-2xl font-semibold">Cold Wallets</h2>
          <p className="mb-4 text-gray-300">
            Cold wallets prioritize security by keeping your private keys
            offline, away from internet-connected devices. This significantly
            reduces the risk of online attacks. Imagine this as your savings
            locked away in a secure vault that no one can access remotely.
          </p>
          <p className="mb-4 text-gray-300">
            Accessing and using the funds in a cold wallet typically requires
            more steps. You often need to physically connect the cold wallet to
            a computer or manually input information to make a transaction. It's
            like needing to go to the bank and go through security procedures
            every time you want to access your savings.
          </p>
        </section>

        <section id="types_of_wallets" className="mb-6">
          <h2 className="mb-4 text-2xl font-semibold">
            Types of Crypto wallets
          </h2>
          <p className="mb-4 text-gray-300">
            You need to take in a few key considerations when choosing the type
            of wallet you would choose to access your cryptocurrency. Prioritize
            cold wallets for long term or large amounts of cryptocurrency.
            Ensure your wallet supports the specific cryptocurrencies you plan
            to trade, some wallets are specific to a few coins, while others
            support multiple currencies.
          </p>

          <div className="mb-6 rounded border-l-4 border-blue-500 bg-[#1e2e3e] p-4">
            <strong>Note:</strong> If you plan on trading frequently, be aware
            of fees associated with the wallet.
          </div>

          <ul className="list-inside list-disc space-y-2 pl-2 text-gray-300">
            <li>
              <strong>Web Wallets:</strong> Accessed through a website or a
              browser extension. Convenient for quick transactions and active
              trading. Generally considered less secure as a third party holds
              your private keys online and is a Hot wallet type.
            </li>
            <li>
              <strong>Mobile Wallets:</strong> Smartphone applications that
              allow you to send, receive and store cryptocurrencies on the go.
              The security of your funds depends on your phones security and
              having a backup, though considered a Hot wallet type.
            </li>
            <li>
              <strong>Hardware wallets:</strong> Physical devices, like USB
              drives, that store your private keys offline. These wallets are
              often the most secure option for storing significant amounts of
              cryptocurrency as they are isolated from internet connected
              devices. Making it a cold wallet.
            </li>
            <li>
              <strong>Paper wallets:</strong> Physical copies of public and
              private keys. They offer excellent security as they are entirely
              offline, but very inconvenient for frequent transactions, and are
              susceptible to physical damage, typical cold wallet.
            </li>
          </ul>
        </section>

        <section id="safe_practices" className="mb-6">
          <h2 className="mb-4 text-2xl font-semibold">Safe Practices</h2>
          <p className="mb-4 text-gray-300">
            Some essential practices to keep your crypto safe:
          </p>
          <ul className="list-inside list-disc space-y-2 pl-2 text-gray-300">
            <li>
              Back up your wallet and secure the recovery phrase somewhere safe.
            </li>
            <li>
              Consider using multiple wallets; to diversify risk (for example,
              you can use a cold wallet to access cumulative holdings and a hot
              wallet for trading).
            </li>
            <li>Keep your software updated for security patches.</li>
            <li>
              Encrypt your wallets with a strong password and enable two factor
              authentication if your wallet provides it.
            </li>
            <li>
              Make sure to double check wallet addresses before sending crypto.
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
