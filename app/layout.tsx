import ClientOnlyCartProvider from '@/components/ClientOnlyCartProvider';
import Navbar from '@/components/Navbar';
import { fontSans } from '@/config/fonts';
import { siteConfig } from '@/config/site';
import '@/styles/globals.css';
import { Link } from '@nextui-org/link';
import clsx from 'clsx';
import { Metadata, Viewport } from 'next';
import Head from 'next/head';
import { Toaster } from 'react-hot-toast';
import { Providers } from './providers';

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: '/favicon.svg',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang='en'>
      <Head>
        <title>{siteConfig.name}</title>

        <link
          rel='apple-touch-icon'
          sizes='180x180'
          href='/apple-touch-icon.png'
        />
        <link rel='shortcut icon' href='/favicon.ico' />

        <link rel='icon' href='/favicon.svg' type='image/svg+xml' />

        <link
          rel='icon'
          type='image/png'
          href='/favicon-48x48.png'
          sizes='48x48'
        />

        <meta name='apple-mobile-web-app-title' content='MyWebSite' />
        <link rel='manifest' href='/site.webmanifest' />

        <meta name='description' content={siteConfig.description} />
      </Head>

      <body
        className={clsx(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable
        )}
      >
        <Providers themeProps={{ attribute: 'class', defaultTheme: 'dark' }}>
          <div className='relative flex flex-col h-screen'>
            <ClientOnlyCartProvider>
              <Toaster />
              <Navbar />
              <main className='container mx-auto max-w-7xl pt-16 px-6 flex-grow'>
                {children}
              </main>
            </ClientOnlyCartProvider>

            <footer className='w-full flex items-center justify-center py-3'>
              <Link
                isExternal
                className='flex items-center gap-1 text-current'
                href='/'
                title='FlyShop Homepage'
              >
                <span className='text-default-600'>Powered by</span>
                <p className='text-primary'>FlyShop</p>
              </Link>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
