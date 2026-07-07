import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Privacy Policy",
  description: "How Neutral Overdrive handles analytics, cookies, newsletter data, and advertising partners.",
};

export default function PrivacyPage() {
  return (
    <div>
      <section className="site-container border-b border-[var(--border)] py-9 md:py-12">
        <Link href="/" className="text-link inline-flex items-center gap-2 text-[14px]">
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>
        <h1 className="display-heading mt-8 text-[clamp(42px,6vw,72px)]">
          Privacy policy.
        </h1>
        <p className="mt-4 text-[13px] text-[var(--muted)]">Last updated: July 6, 2026</p>
      </section>

      <article className="site-container page-section prose prose-neutral max-w-[820px]">
        <p>
          Neutral Overdrive collects limited information to run the site, understand readership, process newsletter signups, and support sponsorships.
        </p>
        <h2>Information we collect</h2>
        <p>
          If you subscribe or contact us, we may receive your email address, name, company, and message content. Analytics may include browser, device, referral, page, and approximate location data.
        </p>
        <h2>Cookies and analytics</h2>
        <p>
          We use cookies and analytics tools to understand traffic patterns and improve the site. You can decline optional cookies through the cookie notice.
        </p>
        <h2>Advertising partners</h2>
        <p>
          Sponsors and advertising partners may use cookies or similar technologies when their placements appear on the site. Third-party privacy policies govern those systems.
        </p>
        <h2>Your rights</h2>
        <p>
          You may request access, correction, deletion, or objection to processing where applicable. Contact ads@neutraloverdrive.com for privacy requests.
        </p>
      </article>
    </div>
  );
}
