import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Resume2Webpage - Transform Your Resume into a Beautiful Website',
  description: 'Convert your resume into a personalized portfolio website instantly. No coding required.',
  openGraph: {
    title: 'Resume2Webpage - Transform Your Resume into a Beautiful Website',
    description: 'Convert your resume into a personalized portfolio website instantly. No coding required.',
    url: 'https://resume2webpage.com',
    siteName: 'Resume2Webpage',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Resume2Webpage - Transform Your Resume into a Beautiful Website',
    description: 'Convert your resume into a personalized portfolio website instantly. No coding required.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <div className="flex min-h-screen flex-col">
            <Navigation />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}