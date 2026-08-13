import type { Metadata } from "next";
import { Outfit, Syne } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/providers/SmoothScroll";

const outfit = Outfit({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const syne = Syne({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Brand Professor | Experience Engine",
  description:
    "Next-generation Experience Engine for Brand Professor — futuristic events & exhibitions production lab for pan-India brands.",
  keywords: [
    "Brand Professor",
    "Events",
    "Exhibitions",
    "Stage Production",
    "Bangalore",
    "India",
  ],
  openGraph: {
    title: "Brand Professor Experience Engine",
    description:
      "The operating system for brand moments — events, exhibitions and AI briefing in one futuristic interface.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${syne.variable} h-full`}>
      <body className="min-h-full antialiased font-sans text-foreground bg-background">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
