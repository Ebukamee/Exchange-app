import "./globals.css";
import { Providers } from "./providers";

export const metadata = {
  title: "Powerpay — Trade Crypto & Gift Cards",
  description:
    "Powerpay — buy and sell Bitcoin, USDT and gift cards at the best rates. Fast payouts, every trade admin-verified.",
  icons: {
    icon:
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cpath d='M20 6h34c11 0 20 9 20 20s-9 20-20 20H38v22L20 90V6Z' fill='%23ed1c24'/%3E%3Cpath d='M38 22h14a4 4 0 0 1 0 8H38v-8Z' fill='white'/%3E%3C/svg%3E",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500..800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

