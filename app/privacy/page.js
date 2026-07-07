import Link from "next/link";
import { ArrowLeft, Shield } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | Neutral Overdrive",
  description: "Disclosing data collection policies, advertising cookies, and user consent compliance guidelines.",
};

export default function PrivacyPage() {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-white transition-colors mb-8 uppercase tracking-wider"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> Back to Home
      </Link>

      <article className="bg-[#0a0f1d]/40 border border-slate-900 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-sm">
        <header className="mb-8 pb-6 border-b border-slate-900 flex items-center gap-3">
          <span className="p-2 bg-brand-cyan/10 border border-brand-cyan/20 rounded-lg text-brand-cyan">
            <Shield className="h-5 w-5" />
          </span>
          <div>
            <h1 className="text-3xl font-extrabold text-white">Privacy Policy</h1>
            <p className="text-xs text-slate-500 mt-1">Last Updated: July 6, 2026</p>
          </div>
        </header>

        <div className="prose prose-invert max-w-none text-slate-300 leading-relaxed space-y-6">
          <p>
            At Neutral Overdrive, accessible from neutraloverdrive.com, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by Neutral Overdrive and how we use it.
          </p>

          <h2 className="text-xl font-bold text-white mt-8">Consent</h2>
          <p>
            By using our website, you hereby consent to our Privacy Policy and agree to its terms.
          </p>

          <h2 className="text-xl font-bold text-white mt-8">Information We Collect</h2>
          <p>
            The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information.
          </p>
          <p>
            If you contact us directly or subscribe to our newsletter, we may receive additional information about you such as your name, email address, the contents of the message, and any other information you may choose to provide.
          </p>

          <h2 className="text-xl font-bold text-white mt-8">Log Files & Analytics</h2>
          <p>
            Neutral Overdrive follows a standard procedure of using log files. These files log visitors when they visit websites. The information collected by log files includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users' movement on the website, and gathering demographic information.
          </p>

          <h2 className="text-xl font-bold text-white mt-8">Cookies and Web Beacons</h2>
          <p>
            Like any other website, Neutral Overdrive uses &apos;cookies&apos;. These cookies are used to store information including visitors&apos; preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users&apos; experience by customizing our web page content based on visitors&apos; browser type and/or other information.
          </p>

          <h2 className="text-xl font-bold text-white mt-8">Advertising Partners & DoubleClick DART Cookies</h2>
          <p>
            Google is one of the third-party vendors on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to our site and other sites on the internet. However, visitors may choose to decline the use of DART cookies by visiting the Google ad and content network Privacy Policy at the following URL –{" "}
            <a href="https://policies.google.com/technologies/ads" className="text-brand-cyan hover:underline">
              https://policies.google.com/technologies/ads
            </a>
          </p>
          <p>
            Our advertising partners may use cookies and web beacons on our site. Third-party ad servers or ad networks use technologies like cookies, JavaScript, or Web Beacons that are used in their respective advertisements and links that appear on Neutral Overdrive, which are sent directly to users&apos; browsers. They automatically receive your IP address when this occurs. These technologies are used to measure the effectiveness of their advertising campaigns and/or to personalize the advertising content that you see on websites that you visit.
          </p>
          <p>
            Note that Neutral Overdrive has no access to or control over these cookies that are used by third-party advertisers.
          </p>

          <h2 className="text-xl font-bold text-white mt-8">GDPR & CCPA Data Protection Rights</h2>
          <p>
            We would like to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>The right to access</strong> – You have the right to request copies of your personal data.</li>
            <li><strong>The right to rectification</strong> – You have the right to request that we correct any information you believe is inaccurate.</li>
            <li><strong>The right to erasure</strong> – You have the right to request that we erase your personal data, under certain conditions.</li>
            <li><strong>The right to object to processing</strong> – You have the right to object to our processing of your personal data, under certain conditions.</li>
          </ul>

          <h2 className="text-xl font-bold text-white mt-8">Contact Us</h2>
          <p>
            If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us at{" "}
            <span className="text-brand-violet font-semibold">ads@neutraloverdrive.com</span>.
          </p>
        </div>
      </article>
    </div>
  );
}
