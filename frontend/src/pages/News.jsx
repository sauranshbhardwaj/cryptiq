import BentoGrid from "../components/BentoGrid";
import BentoGridItem from "../components/BentoGridItem";

import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { backendURL } from "../../config.js";

function News() {
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch(`${backendURL}/news`).then((response) => {
      if (response.ok) {
        response.json().then((data) => {
          setItems(data.Data);
          setIsLoading(false);
        });
      } else {
        console.error("Failed to fetch news");
      }
    });
  }, []);

  return (
    <>
      <Helmet>
        <title>CryptIQ | News</title>
      </Helmet>
      <Navbar />
      <div
        className="min-h-screen bg-black bg-contain bg-top bg-no-repeat pt-24 text-white"
        style={{
          backgroundImage: "url('/background/aboutus.webp')",
        }}
      >
        <h1 className="mx-4 mb-9 text-5xl font-semibold tracking-wide text-white drop-shadow-md lg:ml-32">
          News
        </h1>
        {!isLoading ? (
          <BentoGrid className="mx-4 max-w-full lg:mx-32">
            {items.map((item, i) => (
              <BentoGridItem
                key={i}
                title={item.TITLE}
                description={item.BODY}
                header={
                  <img
                    src={item.IMAGE_URL}
                    alt={""}
                    className="flex h-[8rem] w-[8rem] rounded-xl object-cover"
                  />
                }
                url={item.URL}
              />
            ))}
          </BentoGrid>
        ) : (
          <></>
        )}

        <Footer />
      </div>
    </>
  );
}

export default News;
