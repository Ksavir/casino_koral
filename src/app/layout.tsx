import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Casino Koral",
  description: "A casino-style free-to-play games lobby powered by the FreeToGame API."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const themeScript = `
    try {
      var theme = localStorage.getItem("casino-koral-theme");
      document.documentElement.dataset.theme = theme === "light" ? "light" : "dark";
    } catch {
      document.documentElement.dataset.theme = "dark";
    }
  `;

  return (
    <html lang="en" data-theme="dark">
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        {children}
      </body>
    </html>
  );
}
