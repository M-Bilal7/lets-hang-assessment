import RecoilRootWrapper from '@/components/RecoilRootWrapper';
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Let's Hang Assessment",
  description: 'Create and customize your events',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <RecoilRootWrapper>
          {children}
        </RecoilRootWrapper>
      </body>
    </html>
  );
}