import Navbar from "../components/Navbar";
import Footer from "../components/Footer.jsx";
import { Helmet } from "react-helmet";

function About() {
  return (
    <div
      className="min-h-screen bg-cover bg-center text-white"
      style={{
        backgroundImage: "url('/background/aboutus.webp')",
      }}
    >
      <Helmet>
        <title>CryptIQ | About</title>
      </Helmet>
      <Navbar />
      <div className="mx-auto flex max-w-6xl flex-col items-start space-y-6 px-6 pt-28 sm:px-10 md:px-16">
        <h1 className="mb-9 text-5xl font-semibold tracking-wide text-white drop-shadow-md">
          About Us
        </h1>
        <div className="flex w-full gap-6">
          <div
            className="w-8 rounded-l-xl"
            style={{ backgroundColor: "#6056E0" }}
          ></div>

          <div className="space-y-5 text-base leading-relaxed text-gray-100 sm:text-lg">
            <p>
              CryptIQ is where knowledge meets smart investing! It is a platform
              designed to demonstrate the world of cryptocurrency through an
              interactive, risk-free learning opportunity. Our mission is to
              empower individuals with the tools, confidence, and knowledge to
              explore crypto safely and wisely; bridging the gap between
              theoretical knowledge and real-world practice. Our goal is simple:
              to create an accessible space where everyone — regardless of
              background or experience — can confidently navigate the world of
              crypto. We offer wide range of features, such as paper trading,
              live coin tracking, and crypto news aggregation. All crafted to
              simulate an investing experience without the burden of real
              financial risk!
            </p>
            <p>
              What sets us apart is our education-first approach. Unlike typical
              crypto platforms focused solely on transactions or charts, CryptIQ
              is built for learning, growth, and experimentation. We have our
              own learning resources to educate our users on the key terms and
              legal rights about crypto investment. Whether you're a beginner
              taking your first steps or a curious mind wanting to explore
              crypto deeper, our platform adapts to your pace and goals. We aim
              to keep you engaged with the gamified features like profile
              wallets and global leaderboard.
            </p>
            <p>
              This platform is the result of a collaborative university project
              driven by a passion for technology, innovation, and financial
              empowerment. We're proud to combine academic insight with
              real-world relevance to deliver an experience that's as
              informative as it is intuitive. Join us and start mastering the
              future of finance!
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default About;
