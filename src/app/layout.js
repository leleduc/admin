import AuthProvider from '@/components/authProvider/authProvider';
import './globals.css';
import { Inter } from 'next/font/google';
// import { useSession, signIn, signOut } from 'next-auth/react';
import NavBar from '@/components/navBar/navBar';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Next Ecommercer App',
  description: 'Next Ecommercer App created by leleduc',
};

export default function RootLayout({ children }) {
  // const session = useSession();
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <div className="bg-blue-900 w-screen min-h-screen flex">
            <NavBar />
            <div className="bg-white flex-grow mt-2 mr-2 mb-2 rounded-lg p-4">
              {children}
            </div>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
