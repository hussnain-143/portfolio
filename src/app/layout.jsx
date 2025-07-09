import "./globals.css";

export const metadata = {
  title: {
    template: "%s | Hussnain's Portfolio",
    default: "Hussnain's Portfolio",
  },
  description: "Hussnain Ahmed's professional portfolio showcasing projects and skills.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body cz-shortcut-listen="true" >{children}</body>
    </html>
  );
}