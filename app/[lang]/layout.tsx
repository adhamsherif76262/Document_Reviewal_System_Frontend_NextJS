// app/[lang]/layout.tsx
import "../globals.css";
import type { ReactNode } from 'react';
import { Geist} from 'next/font/google';
import clsx from 'clsx';
// import { Tajawal } from 'next/font/google';
import { Amiri } from 'next/font/google';
// import { Metadata } from 'next';
import { AuthProvider } from '../context/AuthContext';
import PublicNavbar from '../../components/nav/PublicNavbar';
// import { LanguageProvider } from "../context/LanguageContext";
// import { NextIntlClientProvider } from "next-intl";

const metadataMap = {
  en: {
    title: {
      home: 'Home',
      departments: 'Departments',
      production: 'Production',
      research: 'Research',
      direction: 'Extension',
    },
    description: {
      home: 'Welcome to the Field Crops Research Institute.',
      departments: 'Learn about the departments of FCRI.',
      production: 'Explore FCRI’s agricultural production.',
      research: 'Discover FCRI’s research programs.',
      direction: 'Meet the Extension and management team.',
    },
  },
  ar: {
    title: {
      home: 'الرئيسية',
      departments: 'الأقسام',
      production: 'الإنتاج',
      research: 'البحوث',
      direction: 'الارشاد',
    },
    description: {
      home: 'مرحبًا بكم في معهد بحوث المحاصيل الحقلية.',
      departments: 'تعرف على أقسام المعهد.',
      production: 'اكتشف إنتاج المعهد الزراعي.',
      research: 'تعرف على برامج البحوث بالمعهد.',
      direction: 'تعرف على الارشاد وفريق العمل.',
    },
  },
};


const amiri = Amiri({
  subsets: ['arabic'],
  variable: '--font-arabic',
  weight: ['400', '700'], // You can customize weights as needed
});
const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
});

export default async function RootLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}) 
{
    // ✅ Await anything (Next.js now considers params "safe")
  // await Promise.resolve();
  // const dir = (await params).lang === 'ar' ? 'rtl' : 'ltr';
  // const dir =  params.lang === 'ar' ? 'rtl' : 'ltr';
  const lang =  (await (params)).lang ;
  return (
    // <html lang={params.lang} dir={dir}>
    <html lang={lang} dir={lang === "ar" ? "rtl" : "ltr"}>
      <body  
      className={clsx(
        // cairo.variable,                // 👈 Arabic font variable
        // tajawal.variable,         // 👈 Arabic font
        amiri.variable,         // 👈 Arabic font

        geist.variable,                // 👈 Your existing font variable
        lang === 'ar' ? 'font-arabic' : 'font-sans',  // 👈 Conditional font class
        "bg_Body text-black bg-white transition-colors duration-300 overflow-x-hidden"
        )}

style={{
  // backgroundColor: 'gray',
  // backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.2'%3E%3Cpath d='M30 30l15-15v30l-15-15zm-15 0l15 15v-30l-15 15z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
  // backgroundRepeat: 'repeat',
  // backgroundSize: '60px 60px',
  // backgroundPosition: 'top left',
  // backgroundBlendMode: 'multiply',
}}

        >
        {/* <main className="grow">
          {children}
        </main> */}
        {/* <PublicNavbar></PublicNavbar> */}
        {/* <NextIntlClientProvider locale={lang}> */}
          <AuthProvider>
            {/* <LanguageProvider> */}
              {children}
            {/* </LanguageProvider> */}
          </AuthProvider>
        {/* </NextIntlClientProvider> */}
      <footer className="bg-gray-100 text-center text-sm p-4 mb-0">
        &copy; {new Date().getFullYear()} Document Review System. All rights reserved.
      </footer>
      </body>
    </html>
  );
}

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'ar' }];
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ lang: string }>;
}) {
  const lang = (await (params)).lang === 'ar' ? 'ar' : 'en';
  // const path = typeof window !== 'undefined'
    //  ? window.location.pathname.split('/')[2] || 'home'
  //   : 'home' ; 
    const path = 'home'; // You can customize based on route segment if needed

    {
    console.log('[Metadata] lang:', lang); // 🔍 confirm it's running

  return {
    title: metadataMap[lang].title[path as keyof typeof metadataMap['en']['title']],
    description: metadataMap[lang].description[path as keyof typeof metadataMap['en']['description']],
    metadataBase: new URL('https://fcri.gov.eg'), // replace with your domain
    alternates: {
      canonical: `/${lang}`,
    },
    other: {},
    // // ✅ Required structure for html tag customization
    // htmlAttributes: {
    //   lang: lang,
    //   dir: lang === 'ar' ? 'rtl' : 'ltr',
    // },
  };
}
}
