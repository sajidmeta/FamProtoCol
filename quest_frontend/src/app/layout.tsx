import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import "./globals.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Providers } from "./provider";
import MainLayout from "@/app/components/MainLayout/mainLayout";

// laptop 1440x900
// mobile 375x667


export const metadata: Metadata = {
  title: "FamProtocol",
  description: "Generated by create next app",
};

export default function RootLayout ( {
  children,
}: Readonly<{
  children: React.ReactNode;
}> )
{
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <link rel="icon" href="https://clusterprotocol2024.s3.amazonaws.com/website+logo/logo.png" sizes="any" />
      </head>
      <body>
        <Providers>
        <MainLayout>
        { children }
        </MainLayout>
        </Providers>
      </body>
    </html>
  );
}