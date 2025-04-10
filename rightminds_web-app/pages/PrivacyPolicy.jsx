import Navbar from "@/components/Navbar";
import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="bg-white text-black h-[100vh] w-full">
      <div className="fixed">
        <Navbar />
      </div>
      <div className=" bg-white  md:px-10 pt-10 gap-3 grid">
        <section class=" text-gray-800 py-12 px-6">
          <div class="w-full md:max-w-4xl md:mx-auto">
            <h1 class="text-4xl font-bold mb-2">📄 Privacy Policy</h1>
            <p class="text-sm text-gray-500 mb-8">
              Last updated: April 10, 2025
            </p>

            <p class="mb-6">
              Welcome to <strong>Rightminds Academy</strong> . Your privacy is
              important to us. This Privacy Policy explains how we collect, use,
              and protect your personal information when you use our
              website,Rightminds.com , and any related services or content.
            </p>

            <h2 class="text-2xl font-semibold mt-10 mb-4">
              1. Information We Collect
            </h2>
            <h3 class="font-semibold">a. Personal Information</h3>
            <ul class="list-disc list-inside mb-4">
              <li>Name</li>
              <li>Email address</li>
              <li>Profile photo (if applicable)</li>
              <li>Login credentials (for account creation)</li>
            </ul>

            <h3 class="font-semibold">b. Non-Personal Information</h3>
            <ul class="list-disc list-inside mb-6">
              <li>Browser type</li>
              <li>IP address</li>
              <li>Pages visited</li>
              <li>
                Device and usage data (collected via cookies or analytics tools)
              </li>
            </ul>

            <h2 class="text-2xl font-semibold mt-10 mb-4">
              2. How We Use Your Information
            </h2>
            <ul class="list-disc list-inside mb-6">
              <li>Provide and improve our services</li>
              <li>Personalize your learning experience</li>
              <li>Communicate important updates or support</li>
              <li>Analyze usage trends and improve site performance</li>
              <li>Ensure platform security</li>
            </ul>

            <h2 class="text-2xl font-semibold mt-10 mb-4">
              3. Cookies and Tracking Technologies
            </h2>
            <p class="mb-6">
              We may use cookies and similar tracking technologies (like Google
              Analytics) to enhance user experience and analyze site traffic.
              You can disable cookies in your browser settings.
            </p>

            <h2 class="text-2xl font-semibold mt-10 mb-4">
              4. Sharing Your Information
            </h2>
            <p class="mb-2">
              We do <strong>not sell or rent</strong> your personal information.
              We may share data with:
            </p>
            <ul class="list-disc list-inside mb-6">
              <li>Service providers who assist in running the site</li>
              <li>Legal authorities if required by law</li>
              <li>
                Other users (if you choose to post publicly, e.g., in forums or
                comments)
              </li>
            </ul>

            <h2 class="text-2xl font-semibold mt-10 mb-4">
              5. How We Protect Your Data
            </h2>
            <p class="mb-6">
              We implement appropriate technical and organizational measures to
              protect your information against unauthorized access, loss, or
              misuse.
            </p>

            <h2 class="text-2xl font-semibold mt-10 mb-4">6. Your Rights</h2>
            <ul class="list-disc list-inside mb-6">
              <li>Access, update, or delete your personal information</li>
              <li>Opt-out of non-essential communications</li>
              <li>Request a copy of your data</li>
            </ul>
            <p class="mb-6">
              To exercise any of these rights, contact us at{" "}
              <strong>Tomotelechristopher25@gmail.com</strong>.
            </p>

            <h2 class="text-2xl font-semibold mt-10 mb-4">
              7. Children’s Privacy
            </h2>
            <p class="mb-6">
              Our services are intended for users who are at least 13 years old.
              We do not knowingly collect data from children under 13. If you
              believe a child has provided us with information, contact us to
              have it removed.
            </p>

            <h2 class="text-2xl font-semibold mt-10 mb-4">
              8. Third-Party Links
            </h2>
            <p class="mb-6">
              Our website may contain links to third-party sites. We are not
              responsible for their privacy practices or content.
            </p>

            <h2 class="text-2xl font-semibold mt-10 mb-4">
              9. Changes to This Policy
            </h2>
            <p class="mb-6">
              We may update this policy from time to time. When we do, we’ll
              post the revised date at the top of this page. Continued use of
              the site after changes means you accept the updated terms.
            </p>

            <h2 class="text-2xl font-semibold mt-10 mb-4">10. Contact Us</h2>
            <p>
              If you have questions or concerns about this Privacy Policy,
              please contact us at:
            </p>
            <p class="mt-2">
              📧 <strong>Tomotelechristopher25@gmail.com</strong>
            </p>
            <p class="mt-1">
              📍 <strong>Fedral university of Abeokuta</strong>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
