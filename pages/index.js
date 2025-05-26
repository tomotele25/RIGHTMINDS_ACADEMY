import { Poppins } from "next/font/google";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Reviews from "@/components/Reviews";
import Features from "@/components/Features";
import Courses from "@/components/Courses";
import Lp_Footer from "@/components/Lp_Footer";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import Subscription from "@/components/Subscription";
import Faq from "@/components/Faq";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export default function Home() {
  return (
    <div className={`${poppins.variable} font-sans`}>
      <main>
        <Navbar />
        <Hero />
        <About />
        <Features />
        <Courses />
        <Subscription />
        <Reviews />
        <Faq />
        <Lp_Footer />
        <ScrollToTopButton />
      </main>
    </div>
  );
}
