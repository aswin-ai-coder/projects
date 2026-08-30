export const metadata = {
  title: "AI Study Assistant",
  description: "A modern workspace for smarter studying.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
