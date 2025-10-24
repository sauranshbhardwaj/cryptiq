import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { toast, Toaster } from "react-hot-toast";
import { Helmet } from "react-helmet";
import { backendURL } from "../../config.js";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  function handleSubmit(event) {
    event.preventDefault();

    fetch(`${backendURL}/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }).then((response) => {
      if (response.ok) {
        toast.success("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        toast.error("Failed to send message. Please try again.");
      }
    });
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center text-white"
      style={{
        backgroundImage: "url('/background/aboutus.webp')",
      }}
    >
      <Helmet>
        <title>CryptIQ | Contact</title>
      </Helmet>
      <Navbar />

      {/* Contact Section */}
      <section className="relative container mx-auto flex-1 px-4 pt-36 pb-20">
        <div className="relative z-10 mx-auto max-w-xl rounded-2xl border border-gray-700 bg-[#1a1a1a] p-8 shadow-lg">
          <h1 className="mb-8 text-center text-4xl font-bold">Contact us</h1>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-gray-600 bg-transparent p-4 focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-gray-600 bg-transparent p-4 focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />

            <textarea
              name="message"
              placeholder="Message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="5"
              className="w-full rounded-xl border border-gray-600 bg-transparent p-4 focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />

            <button
              type="submit"
              className="w-full rounded-xl bg-gray-200 py-4 font-semibold text-black transition hover:bg-white"
            >
              Submit
            </button>
          </form>
        </div>
      </section>

      <Footer />
      <Toaster />
    </div>
  );
}

export default Contact;
