const Footer = () => {
  return (
    <footer className="mt-10 border-t border-[#1e2235] bg-[#121624] py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8 flex flex-col items-center justify-between md:flex-row">
          <div className="mb-4 flex items-center md:mb-0">
            <img src="/Logo.png" alt="CryptIQ Logo" className="h-6 w-auto" />
          </div>
          <p className="text-sm text-gray-400">© 2025 CryptIQ</p>
        </div>

        <div className="border-t border-[#1e2235] pt-8 pb-4">
          <p className="text-center text-xs text-gray-500 md:text-left">
            Information provided on this site is not intended to be used for
            investment advice. All data provided for educational purposes only.
            Trade at your own risk. <br />
            No cryptocurrencies are traded or exchanged on this platform. All
            trading activity is simulated
          </p>
        </div>

        {/*<div className="grid grid-cols-2 gap-8 text-sm md:grid-cols-4">*/}
        {/*  <div>*/}
        {/*    <h3 className="mb-4 font-medium">Company</h3>*/}
        {/*    <ul className="space-y-2 text-gray-400">*/}
        {/*      <li>*/}
        {/*        <a href="/about">About</a>*/}
        {/*      </li>*/}
        {/*      <li>*/}
        {/*        <a href="/careers">Careers</a>*/}
        {/*      </li>*/}
        {/*      <li>*/}
        {/*        <a href="/contact">Contact Us</a>*/}
        {/*      </li>*/}
        {/*      <li>*/}
        {/*        <a href="/press">Press</a>*/}
        {/*      </li>*/}
        {/*    </ul>*/}
        {/*  </div>*/}

        {/*  <div>*/}
        {/*    <h3 className="mb-4 font-medium">Product</h3>*/}
        {/*    <ul className="space-y-2 text-gray-400">*/}
        {/*      <li>*/}
        {/*        <a href="/features">Features</a>*/}
        {/*      </li>*/}
        {/*      <li>*/}
        {/*        <a href="/learn">Learn & Support</a>*/}
        {/*      </li>*/}
        {/*    </ul>*/}
        {/*  </div>*/}
        {/*</div>*/}
      </div>
    </footer>
  );
};

export default Footer;
