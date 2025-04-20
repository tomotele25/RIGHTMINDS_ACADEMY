import Link from "next/link";
import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaDiscord,
  FaGithub,
  FaGlobe,
} from "react-icons/fa";

const Lp_Footer = () => {
  return (
    <footer className="bg-slate-800 dark:bg-gray-900 text-gray-200">
      <div className="mx-auto w-full max-w-screen-xl">
        <div className="grid grid-cols-2 gap-8 px-5 py-6 lg:py-8 md:grid-cols-4">
          {/** Company */}
          <div>
            <h2 className="mb-6 text-sm font-semibold uppercase text-white">
              Company
            </h2>
            <ul className="text-gray-400 font-medium space-y-4">
              <li>
                <a href="#" className="hover:underline">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Brand Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/** Help Center */}
          <div>
            <h2 className="mb-6 text-sm font-semibold uppercase text-white">
              Help Center
            </h2>
            <ul className="text-gray-400 font-medium space-y-4">
              <li>
                <a href="#" className="hover:underline">
                  Discord Server
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Facebook
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/** Legal */}
          <div>
            <h2 className="mb-6 text-sm font-semibold uppercase text-white">
              Legal
            </h2>
            <ul className="text-gray-400 font-medium space-y-4">
              <li>
                <Link href="/PrivacyPolicy" className="hover:underline">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Licensing
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Terms &amp; Conditions
                </a>
              </li>
            </ul>
          </div>

          {/** Download */}
          <div>
            <h2 className="mb-6 text-sm font-semibold uppercase text-white">
              Download
            </h2>
            <ul className="text-gray-400 font-medium space-y-4">
              <li>
                <a href="#" className="hover:underline">
                  iOS
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Android
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Windows
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  MacOS
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/** Bottom Bar */}
        <div className="px-4 py-6 bg-gray-700 md:flex md:items-center md:justify-between">
          <span className="text-sm text-gray-300 sm:text-center">
            © 2023{" "}
            <a href="https://flowbite.com/" className="hover:underline">
              CHRIS™
            </a>
            . All Rights Reserved.
          </span>
          <div className="flex mt-4 md:mt-0 space-x-5">
            <a href="#" className="hover:text-white">
              <FaFacebookF />
            </a>
            <a href="#" className="hover:text-white">
              <FaDiscord />
            </a>
            <a href="#" className="hover:text-white">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-white">
              <FaGithub />
            </a>
            <a href="#" className="hover:text-white">
              <FaGlobe />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Lp_Footer;
