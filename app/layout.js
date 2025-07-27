import "./styles/globals.css";

export const metadata = {
  title: "Daily Journal",
  description: "Your personal digital journal with categories.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}