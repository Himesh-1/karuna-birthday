import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { DynamicBalloons } from '@/components/dynamic-loader';

export const metadata: Metadata = {
  title: "Happy Birthday Karuna",
  description: 'A special birthday celebration for Karuna!',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="font-body antialiased">
        <DynamicBalloons />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
