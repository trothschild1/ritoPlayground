import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import "./styles/index.scss";

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Theme appearance="dark" accentColor="indigo" className="custom-theme">
          {children}
        </Theme>
      </body>
    </html>
  );
}
