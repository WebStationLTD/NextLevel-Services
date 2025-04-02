import { headers } from "next/headers";
import Navigation from "../components/nav";
import CookieConsentBanner from "../components/cookieConsentBanner";
import Footer from "../components/footer";
import Script from "next/script";
import ImagePreloader from "../components/ImagePreloader";
import { CriticalCSS } from "./critical-css";

import "../styles/globals.css";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "sans-serif"],
  adjustFontFallback: true,
});

export async function generateMetadata() {
  const host = (await headers()).get("host"); // Get the current domain
  const protocol = host?.includes("localhost") ? "http" : "https"; // Adjust for local dev

  return {
    metadataBase: new URL(`${protocol}://${host}`),
    title: 'Адвокатско дружество "Бурков, Радев, Дюлгерска"',
    description:
      "Вашият доверен правен партньор. Предлагаме висококачествени правни услуги в областта на търговското, гражданското, наказателното и административното право.",
    openGraph: {
      title: 'Адвокатско дружество "Бурков, Радев, Дюлгерска"',
      description:
        "Вашият доверен правен партньор. Предлагаме висококачествени правни услуги в областта на търговското, гражданското, наказателното и административното право.",
      images: "/lawyer.webp",
      type: "website",
      locale: "bg_BG",
      siteName: 'Адвокатско дружество "Бурков, Радев, Дюлгерска"',
    },
    twitter: {
      card: "summary_large_image",
      title: 'Адвокатско дружество "Бурков, Радев, Дюлгерска"',
      description: "Вашият доверен правен партньор",
      images: ["/lawyer.webp"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: {
      canonical: "/",
      languages: {
        bg: "/",
      },
    },
  };
}

export default function RootLayout({ children }) {
  return (
    <html lang="bg">
      <head>
        <CriticalCSS />
        <link
          rel="preconnect"
          href="https://brd.devclick.net"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="https://brd.devclick.net" />

        {/* Предварително зареждане на мобилната версия на LCP изображението */}
        <link
          rel="preload"
          href="/lawyer-mobile-lcp.webp"
          as="image"
          type="image/webp"
          fetchPriority="high"
          importance="high"
          media="(max-width: 640px)"
        />

        {/* Предварително зареждане на десктоп версията на LCP изображението */}
        <link
          rel="preload"
          href="/lawyer-desktop-lcp.webp"
          as="image"
          type="image/webp"
          fetchPriority="high"
          importance="high"
          media="(min-width: 641px)"
        />

        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className={roboto.className}>
        <ImagePreloader />
        <Navigation />
        <main>{children}</main>
        <CookieConsentBanner />
        <Footer />
        <Script
          id="structured-data"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LegalService",
              name: 'Адвокатско дружество "Бурков, Радев, Дюлгерска"',
              description:
                "Вашият доверен правен партньор. Предлагаме висококачествени правни услуги в областта на търговското, гражданското, наказателното и административното право.",
              url: "https://brd.bg",
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+359XXXXXXXXX",
                contactType: "customer service",
              },
              address: {
                "@type": "PostalAddress",
                streetAddress: "Example Street 123",
                addressLocality: "София",
                postalCode: "1000",
                addressCountry: "BG",
              },
            }),
          }}
        />
      </body>
    </html>
  );
}
