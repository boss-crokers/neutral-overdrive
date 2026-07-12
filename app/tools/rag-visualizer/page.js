import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import RagVisualizer from "../../components/RagVisualizer";

export const metadata = {
  title: "RAG Chunking Visualizer & Cost Estimator | Neutral Overdrive",
  description: "Visualize document chunking strategies, inspect text splits, and estimate embedding costs across Google Gemini, OpenAI, and Cohere.",
  alternates: {
    canonical: "/tools/rag-visualizer/",
  },
};

export default function RagVisualizerPage() {
  return (
    <div>
      <section className="site-container border-b border-[var(--border)] py-8 md:py-10">
        <Link href="/tools" className="text-link inline-flex items-center gap-2 text-[14px]">
          <ArrowLeft className="h-4 w-4" />
          Back to tools
        </Link>
        <h1 className="display-heading mt-8 max-w-[900px] text-[clamp(42px,6vw,72px)]">
          RAG Chunking Visualizer
        </h1>
        <p className="body-copy mt-5 max-w-[680px] text-[17px]">
          Inspect recursive, character, and word chunking partitions in real-time. Compute token overhead inflation and estimate embedding costs across primary models.
        </p>
      </section>

      <section className="site-container page-section">
        <RagVisualizer />
      </section>
    </div>
  );
}
