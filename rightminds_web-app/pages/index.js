import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Reviews from "@/components/Subscription";
import Features from "@/components/Features";
import Courses from "@/components/Courses";

import Lp_Footer from "@/components/Lp_Footer";
import Contact from "@/components/Contact";
import Subscription from "@/components/Subscription";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <div>
      <main>
        <div>
          <Navbar />
        </div>
        <div>
          <Hero />
        </div>
        <div>
          <About />
        </div>
        <div>
          <Features />
        </div>
        <div>
          <Courses />
        </div>

        <div>
          <Subscription />
        </div>
        <div className="">
          <Lp_Footer />
        </div>
      </main>
    </div>
  );
}
