import RoadmapClient from "./RoadmapClient";

export const metadata = {
  title: "AI Governance & Security Certification Roadmap | Neutral Overdrive",
  description: "Explore the recommended certification pathway for AI security managers, risk analysts, and governance professionals (CAIS, AAISM, AAIR, AIGP, and CCISO).",
  alternates: {
    canonical: "/resources/certification-roadmap/",
  },
  openGraph: {
    title: "AI Governance & Security Certification Roadmap | Neutral Overdrive",
    description: "Explore the recommended certification pathway for AI security managers, risk analysts, and governance professionals (CAIS, AAISM, AAIR, AIGP, and CCISO).",
    url: "https://neutraloverdrive.com/resources/certification-roadmap/",
    images: [
      {
        url: "/neutral-overdrive-roadmap.jpg",
        width: 1200,
        height: 630,
        alt: "AI Governance & Security Certification Roadmap Blueprint",
      },
    ],
  },
  twitter: {
    title: "AI Governance & Security Certification Roadmap | Neutral Overdrive",
    description: "Explore the recommended certification pathway for AI security managers, risk analysts, and governance professionals (CAIS, AAISM, AAIR, AIGP, and CCISO).",
    images: ["/neutral-overdrive-roadmap.jpg"],
  },
};

export default function CertificationRoadmapPage() {
  return <RoadmapClient />;
}
