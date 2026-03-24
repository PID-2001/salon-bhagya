import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Cinzel, Cormorant_Garamond } from "next/font/google";
import { ThemeProvider } from "@/context/ThemeContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-cinzel",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-cormorant",
});

export const metadata: Metadata = {
  title: {
    default: "THE ONE | Salon Bhagya",
    template: "%s | THE ONE · Salon Bhagya",
  },
  description:
    "Salon Bhagya — where luxury meets artistry. Premium hair, beauty, bridal & wellness services.",
  keywords: ["salon bhagya", "luxury salon", "bridal salon", "THE ONE", "wedding sarees", "magulporu"],
  openGraph: {
    type: "website",
    siteName: "THE ONE | Salon Bhagya",
    title: "THE ONE | Salon Bhagya — Premium Luxury Salon",
    description: "Where luxury meets artistry. Premium salon services, bridal packages & rental collections.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)",  color: "#080806" },
    { media: "(prefers-color-scheme: light)", color: "#FDFAF4" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <body className={`${cinzel.variable} ${cormorant.variable}`}>
        <ThemeProvider>
          <Navbar />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}