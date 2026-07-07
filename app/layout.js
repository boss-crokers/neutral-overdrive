import { Geist, Geist_Mono, Libre_Baskerville } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CookieConsent from "./components/CookieConsent";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const displaySerif = Libre_Baskerville({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata = {
  title: {
    template: "%s | Neutral Overdrive",
    default: "Neutral Overdrive - Practical AI Workflow Guides",
  },
  description:
    "Practical AI workflow guides, model comparisons, prompt templates, and tools for people shipping real work.",
  keywords: [
    "AI workflows",
    "prompt engineering",
    "model comparisons",
    "AI templates",
    "token calculator",
    "RAG",
    "Gemini API",
  ],
  authors: [{ name: "Neutral Overdrive" }],
  metadataBase: new URL("https://neutraloverdrive.com"),
};

const themeInit = `
  try {
    var stored = localStorage.getItem("neutral_overdrive_theme");
    var theme = stored === "graphite" ? "graphite" : "light";
    document.documentElement.dataset.theme = theme;
    if (theme === "graphite") document.documentElement.classList.add("theme-graphite");
  } catch (e) {}
`;

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${displaySerif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <CookieConsent />

        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-N1LYQX4KYR"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-N1LYQX4KYR');
          `}
        </Script>
      </body>
    </html>
  );
}
