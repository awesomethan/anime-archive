// app/layout.js

export const metadata = {
  title: {
    absolute: "",
    default: "Ethan's Anime Archive",
    template: "",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
