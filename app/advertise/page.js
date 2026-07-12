import AdvertiseClient from "./AdvertiseClient";

export const metadata = {
  title: "Sponsor & Advertise | Neutral Overdrive",
  description: "Reach builders and teams scaling AI applications. Sponsor our practical guides, templates, and tools, or request a custom enterprise workflow consult.",
  alternates: {
    canonical: "/advertise/",
  },
  openGraph: {
    title: "Sponsor & Advertise | Neutral Overdrive",
    description: "Reach builders and teams scaling AI applications. Sponsor our practical guides, templates, and tools, or request a custom enterprise workflow consult.",
    url: "https://neutraloverdrive.com/advertise/",
  },
  twitter: {
    title: "Sponsor & Advertise | Neutral Overdrive",
    description: "Reach builders and teams scaling AI applications. Sponsor our practical guides, templates, and tools, or request a custom enterprise workflow consult.",
  },
};

export default function Page() {
  return <AdvertiseClient />;
}
