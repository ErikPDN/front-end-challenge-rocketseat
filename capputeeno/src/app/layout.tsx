import type { Metadata } from "next";
import { Saira } from "next/font/google";
import "./globals.css";
import { Header } from "../components/header";
import { DefaultProviders } from "../components/default-providers";

const saira = Saira({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});


export const metadata: Metadata = {
  title: "Capputeeno",
  description: "Capputeeno is a web-site",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${saira.className}`}>
        <DefaultProviders>
          <Header />
          {children}
        </DefaultProviders>
      </body>
    </html>
  );
}
