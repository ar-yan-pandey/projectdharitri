import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AOSInit from '../components/AOSInit';
import { LanguageProvider } from '../context/LanguageContext';
import Loader from '../components/Loader';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Dharitri - Complete Cow Healthcare Solution',
  description: 'Access verified products, expert veterinarians, and essential information for the best care of your cattle.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col min-h-screen bg-gradient-to-b from-white via-green-50/30 to-white`}>
        <LanguageProvider>
          <AOSInit />
          <Loader />
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
          <Toaster position="top-center" />
        </LanguageProvider>
      </body>
    </html>
  );
}
