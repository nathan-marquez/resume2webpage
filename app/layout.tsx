import "./globals.css";
import type { Metadata } from "next";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Toaster } from "@/components/ui/toaster";
import { Navigation } from "@/components/Navigation";
import { AuthProvider } from "@/components/providers/AuthProvider";

export const metadata: Metadata = {
  title: "Resume2Webpage - Transform Your Resume into a Beautiful Website",
  description:
    "Convert your resume into a personalized portfolio website instantly. No coding required.",
  // openGraph: {
  //   title: "Resume2Webpage - Transform Your Resume into a Beautiful Website",
  //   description:
  //     "Convert your resume into a personalized portfolio website instantly. No coding required.",
  //   url: "https://resume2webpage.com",
  //   siteName: "Resume2Webpage",
  //   type: "website",
  // },
  // twitter: {
  //   card: "summary_large_image",
  //   title: "Resume2Webpage - Transform Your Resume into a Beautiful Website",
  //   description:
  //     "Convert your resume into a personalized portfolio website instantly. No coding required.",
  // },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="light">
          <AuthProvider>
            <div className="flex min-h-screen flex-col">
              <Navigation />
              <main className="flex-1">{children}</main>
            </div>
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
