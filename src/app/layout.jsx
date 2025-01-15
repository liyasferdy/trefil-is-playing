import "./globals.css";

export const metadata = {
  title: "trefil is playing",
  description: "play with me",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`antialiased`}>{children}</body>
    </html>
  );
}
