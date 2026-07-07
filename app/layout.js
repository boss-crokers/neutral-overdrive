import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AdUnit from "./components/AdUnit";
import CookieConsent from "./components/CookieConsent";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    template: "%s | Neutral Overdrive",
    default: "Neutral Overdrive - AI Prompt Engineering & Advanced Workflows Hub",
  },
  description: "Explore premium tutorials, prompt galleries, and agentic code workflows utilizing Midjourney, DALL-E, Kling AI, and Google Antigravity.",
  keywords: ["AI Workflows", "Prompt Engineering", "Midjourney", "Kling AI", "Agentic RAG", "Gemini API", "Antigravity SDK", "Generative AI"],
  authors: [{ name: "Neutral Overdrive Team" }],
  metadataBase: new URL("https://neutraloverdrive.com"),
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#060913] text-[#f1f5f9] font-sans selection:bg-brand-cyan/30 selection:text-white">
        {/* Sticky Header */}
        <Header />
        
        {/* Page Main Content */}
        <main className="flex-1 flex flex-col">
          {children}
        </main>
        
        {/* Global Footer */}
        <Footer />

        {/* Sticky Dismissible Bottom Overlay Ad */}
        <AdUnit type="bottom-anchor" />

        {/* Global GDPR Consent Modal */}
        <CookieConsent />
      </body>
    </html>
  );
}
