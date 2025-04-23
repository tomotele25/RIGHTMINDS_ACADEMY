import React from "react";
import Link from "next/link";
const Client = () => {
  return (
    <div className="font-sans">
      <main>
        {/* Navbar */}
        <nav className="bg-[#1A202C] text-white p-6 shadow-md">
          <div className="max-w-screen-xl mx-auto flex justify-between items-center">
            <h1 className="text-3xl font-bold text-[#5A67D8]">ClientCollab</h1>
            <div className="space-x-6 text-lg">
              <a
                href="#features"
                className="hover:text-[#5A67D8] transition duration-300"
              >
                Features
              </a>
              <a
                href="#about"
                className="hover:text-[#5A67D8] transition duration-300"
              >
                About
              </a>
              <a
                href="#contact"
                className="hover:text-[#5A67D8] transition duration-300"
              >
                Contact
              </a>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="bg-gradient-to-r from-[#5A67D8] to-[#4C51BF] text-white text-center py-20">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
            Collaborate Seamlessly with Your Clients
          </h2>
          <p className="text-lg md:text-xl mb-8">
            Share designs, discuss, and get paid – all in one place.
          </p>
          <a
            href="#about"
            className="bg-[#5A67D8] hover:bg-[#4C51BF] text-white py-2 px-6 rounded-md text-xl transition duration-300"
          >
            Learn More
          </a>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 bg-[#F7FAFC] text-[#2D3748]">
          <div className="max-w-screen-xl mx-auto px-6 md:px-12">
            <h3 className="text-3xl font-semibold text-center mb-6 text-[#5A67D8]">
              About ClientCollab
            </h3>
            <p className="text-lg md:text-xl text-center max-w-2xl mx-auto">
              ClientCollab is a web app that makes working with clients easier
              by integrating design sharing, communication, and payment features
              all in one seamless platform.
            </p>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="bg-white py-20">
          <div className="max-w-screen-xl mx-auto text-center px-6 md:px-12">
            <h3 className="text-3xl font-semibold text-[#5A67D8] mb-10">
              Features
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <div className="p-6 bg-[#EDF2F7] rounded-lg shadow-lg">
                <h4 className="text-2xl font-semibold mb-4">
                  Upload & View Designs
                </h4>
                <p className="text-[#2D3748]">
                  Share your Figma or prototype links easily and collaborate on
                  designs in real-time.
                </p>
              </div>
              <div className="p-6 bg-[#EDF2F7] rounded-lg shadow-lg">
                <h4 className="text-2xl font-semibold mb-4">
                  Live Chat & Negotiations
                </h4>
                <p className="text-[#2D3748]">
                  Communicate directly with clients, negotiate details, and
                  finalize agreements instantly.
                </p>
              </div>
              <div className="p-6 bg-[#EDF2F7] rounded-lg shadow-lg">
                <h4 className="text-2xl font-semibold mb-4">Secure Payments</h4>
                <p className="text-[#2D3748]">
                  Get paid securely with milestone payments, ensuring both
                  parties are protected throughout the project.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Subscription Section */}
        <section className="bg-[#5A67D8] text-white py-16">
          <div className="max-w-screen-xl mx-auto text-center px-6 md:px-12">
            <h3 className="text-3xl font-semibold mb-6">Stay Updated</h3>
            <p className="text-lg md:text-xl mb-8">
              Subscribe to get the latest updates on ClientCollab!
            </p>
            <div className="flex justify-center">
              <input
                type="email"
                placeholder="Enter your email"
                className="p-4 rounded-l-md text-[#2D3748] w-80"
              />
              <button className="bg-[#5A67D8] hover:bg-[#4C51BF] text-white px-6 py-4 rounded-r-md">
                Subscribe
              </button>
            </div>
          </div>
        </section>

        {/* Reviews Section */}
        <section className="py-20 bg-[#F7FAFC] text-center">
          <h3 className="text-3xl font-semibold text-[#5A67D8] mb-6">
            What Our Users Say
          </h3>
          <blockquote className="italic text-[#4A5568] max-w-3xl mx-auto">
            "ClientCollab completely transformed my workflow! I can now easily
            share designs and get paid on time."
          </blockquote>
          <p className="mt-4 text-lg text-[#2D3748]">
            – Alex, Product Designer
          </p>
        </section>

        {/* FAQ Section */}
        <section id="contact" className="py-20 bg-white">
          <div className="max-w-screen-xl mx-auto px-6 md:px-12">
            <h3 className="text-3xl font-semibold text-[#5A67D8] text-center mb-10">
              Frequently Asked Questions
            </h3>
            <div className="space-y-6">
              <div>
                <p className="font-semibold text-lg text-[#2D3748]">
                  How do I get started?
                </p>
                <p className="text-[#4A5568]">
                  Sign up, create your profile, and invite clients to
                  collaborate on projects. It's easy to get started!
                </p>
              </div>
              <div>
                <p className="font-semibold text-lg text-[#2D3748]">
                  Is my payment secure?
                </p>
                <p className="text-[#4A5568]">
                  Yes, our platform ensures secure payments with escrow
                  protection for both clients and freelancers.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-[#1A202C] text-white py-6 text-center">
          <p>
            &copy; {new Date().getFullYear()} ClientCollab. All rights reserved.
          </p>
        </footer>
      </main>
    </div>
    // <main className="min-h-screen bg-gray-900 text-white flex flex-col justify-center items-center px-4">
    //   {/* Hero Section */}
    //   <section className="text-center py-24">
    //     <h1 className="text-6xl font-bold mb-4">Welcome to ClientCollab</h1>
    //     <p className="text-xl mb-6 max-w-xl mx-auto">
    //       Streamline your freelance workflow: connect with clients, share
    //       designs, chat, and manage payments — all in one secure place.
    //     </p>
    //     <div className="flex gap-4 justify-center">
    //       <Link
    //         href="/login"
    //         className="bg-blue-600 hover:bg-blue-700 transition px-6 py-3 rounded-full text-lg font-semibold"
    //       >
    //         Log In
    //       </Link>
    //       <Link
    //         href="/signup"
    //         className="bg-gray-700 hover:bg-gray-600 transition px-6 py-3 rounded-full text-lg font-semibold"
    //       >
    //         Sign Up
    //       </Link>
    //     </div>
    //   </section>

    //   {/* Footer */}
    //   <footer className="mt-16 text-center text-gray-400">
    //     <p>
    //       &copy; {new Date().getFullYear()} ClientCollab. All rights reserved.
    //     </p>
    //   </footer>
    // </main>
    // <main className="min-h-screen bg-gray-900 text-white">
    //   {/* Landing Section */}
    //   <section className="h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex flex-col justify-center items-center text-center px-4">
    //     <h1 className="text-5xl font-bold mb-4">Welcome to ClientCollab</h1>
    //     <p className="text-xl mb-6 max-w-xl">
    //       Seamlessly collaborate with your clients — upload Figma designs, chat,
    //       and manage payments all in one place.
    //     </p>
    //     <a
    //       href="#start"
    //       className="bg-blue-600 px-6 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition"
    //     >
    //       Get Started
    //     </a>
    //   </section>

    //   {/* Collaboration Portal Section */}
    //   <section id="start" className="bg-gray-900 text-white p-6">
    //     <h2 className="text-3xl font-bold mb-6 text-center">
    //       Client Collaboration Portal
    //     </h2>

    //     {/* Upload Prototype Section */}
    //     <div className="max-w-4xl mx-auto mb-8 bg-gray-800 p-6 rounded-xl shadow-xl">
    //       <h3 className="text-xl font-semibold mb-4">
    //         Send Figma/Prototype Link
    //       </h3>
    //       <input
    //         type="text"
    //         placeholder="https://figma.com/file/xyz..."
    //         className="w-full p-2 rounded bg-gray-700 text-white mb-4"
    //       />
    //       <button className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition">
    //         Submit
    //       </button>
    //     </div>

    //     {/* Chat & Negotiation Section */}
    //     <div className="max-w-4xl mx-auto mb-8 bg-gray-800 p-6 rounded-xl shadow-xl">
    //       <h3 className="text-xl font-semibold mb-4">Chat & Negotiation</h3>
    //       <div className="h-40 overflow-y-auto bg-gray-700 p-3 rounded mb-4 space-y-2">
    //         <p className="text-sm">Client: Can you build this by Friday?</p>
    //         <p className="text-sm text-right">
    //           You: Sure, but I’ll need 50% upfront.
    //         </p>
    //       </div>
    //       <div className="flex gap-2">
    //         <input
    //           type="text"
    //           placeholder="Type a message..."
    //           className="flex-1 p-2 rounded bg-gray-700 text-white"
    //         />
    //         <button className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition">
    //           Send
    //         </button>
    //       </div>
    //     </div>

    //     {/* Payment Section */}
    //     <div className="max-w-4xl mx-auto bg-gray-800 p-6 rounded-xl shadow-xl">
    //       <h3 className="text-xl font-semibold mb-4">Project Payment</h3>
    //       <p className="mb-2">
    //         Agreed Amount: <strong>$500</strong>
    //       </p>
    //       <p className="mb-4">
    //         Status:{" "}
    //         <span className="text-yellow-400">
    //           Awaiting 50% Upfront Payment
    //         </span>
    //       </p>
    //       <button className="bg-green-600 px-4 py-2 rounded hover:bg-green-700 transition">
    //         Pay Now
    //       </button>
    //     </div>
    //   </section>
    // </main>
    // <main className="min-h-screen bg-gray-900 text-white p-6">
    //   <h1 className="text-3xl font-bold mb-6">Client Collaboration Portal</h1>

    //   {/* Upload Prototype Section */}
    //   <section className="max-w-4xl mx-auto mb-8 bg-gray-800 p-6 rounded-xl shadow-xl">
    //     <h2 className="text-xl font-semibold mb-4">
    //       Send Figma/Prototype Link
    //     </h2>
    //     <input
    //       type="text"
    //       placeholder="https://figma.com/file/xyz..."
    //       className="w-full p-2 rounded bg-gray-700 text-white mb-4"
    //     />
    //     <button className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition">
    //       Submit
    //     </button>
    //   </section>

    //   {/* Chat & Negotiation Section */}
    //   <section className="max-w-4xl mx-auto mb-8 bg-gray-800 p-6 rounded-xl shadow-xl">
    //     <h2 className="text-xl font-semibold mb-4">Chat & Negotiation</h2>
    //     <div className="h-40 overflow-y-auto bg-gray-700 p-3 rounded mb-4 space-y-2">
    //       <p className="text-sm">Client: Can you build this by Friday?</p>
    //       <p className="text-sm text-right">
    //         You: Sure, but I’ll need 50% upfront.
    //       </p>
    //     </div>
    //     <div className="flex gap-2">
    //       <input
    //         type="text"
    //         placeholder="Type a message..."
    //         className="flex-1 p-2 rounded bg-gray-700 text-white"
    //       />
    //       <button className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition">
    //         Send
    //       </button>
    //     </div>
    //   </section>

    //   {/* Payment Section */}
    //   <section className="max-w-4xl mx-auto bg-gray-800 p-6 rounded-xl shadow-xl">
    //     <h2 className="text-xl font-semibold mb-4">Project Payment</h2>
    //     <p className="mb-2">
    //       Agreed Amount: <strong>$500</strong>
    //     </p>
    //     <p className="mb-4">
    //       Status:{" "}
    //       <span className="text-yellow-400">Awaiting 50% Upfront Payment</span>
    //     </p>
    //     <button className="bg-green-600 px-4 py-2 rounded hover:bg-green-700 transition">
    //       Pay Now
    //     </button>
    //   </section>
    // </main>
  );
};

export default Client;
