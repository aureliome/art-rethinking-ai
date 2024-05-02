import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Art Rethinking AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
