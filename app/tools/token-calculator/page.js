import TokenCalculatorClient from "./TokenCalculatorClient";

export const metadata = {
  title: "AI API Token Cost Calculator | Neutral Overdrive",
  description: "Estimate prompt and completion token API spend before running production workflows. Compare latest standard rates for Google Gemini, Anthropic Claude, and OpenAI.",
  alternates: {
    canonical: "/tools/token-calculator/",
  },
  openGraph: {
    title: "AI API Token Cost Calculator | Neutral Overdrive",
    description: "Estimate prompt and completion token API spend before running production workflows. Compare latest standard rates for Google Gemini, Anthropic Claude, and OpenAI.",
    url: "https://neutraloverdrive.com/tools/token-calculator/",
  },
  twitter: {
    title: "AI API Token Cost Calculator | Neutral Overdrive",
    description: "Estimate prompt and completion token API spend before running production workflows. Compare latest standard rates for Google Gemini, Anthropic Claude, and OpenAI.",
  },
};

export default function TokenCalculatorPage() {
  return <TokenCalculatorClient />;
}
