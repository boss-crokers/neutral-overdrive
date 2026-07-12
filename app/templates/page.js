import TemplatesClient from "./TemplatesClient";

export const metadata = {
  title: "Developer Prompt Library | Neutral Overdrive",
  description: "Searchable, schema-locked prompt templates and system instructions for Gemini, Claude, and OpenAI models. Inject parameters and copy direct integrations.",
  alternates: {
    canonical: "/templates/",
  },
  openGraph: {
    title: "Developer Prompt Library | Neutral Overdrive",
    description: "Searchable, schema-locked prompt templates and system instructions for Gemini, Claude, and OpenAI models. Inject parameters and copy direct integrations.",
    url: "https://neutraloverdrive.com/templates/",
  },
  twitter: {
    title: "Developer Prompt Library | Neutral Overdrive",
    description: "Searchable, schema-locked prompt templates and system instructions for Gemini, Claude, and OpenAI models. Inject parameters and copy direct integrations.",
  },
};

export default function TemplatesPage() {
  return <TemplatesClient />;
}
