import { Figtree } from "next/font/google";

import { cn } from "@/lib/util";

import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import Head from "next/head";

const appTitle = "Bryson Reece";
const appDescription = "a passionate maker with a specialty in developing enterprise platforms that scale";

const figtree = Figtree({
  display: "swap",
  style: "normal",
  preload: true,
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

interface HeadProps {
  title?: string;
  description?: string;
}

export function Layout({
  title = appTitle,
  description = appDescription,
  children,
}: HeadProps & Readonly<{
  children: React.ReactNode,
}>) {
  return (
    <>
      <Head>
        {title && <title>{(title !== appTitle) ? (title + ' | bryson.cc') : title}</title>}
        {description && <meta name="description" content={description} />}
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='0.9em' font-size='90'>👋</text></svg>" />
      </Head>
      <div className={cn(figtree.className, 'font-normal h-full min-h-screen min-w-sm flex flex-col bg-stone-100 dark:bg-stone-900')}>
        <Navbar />

        {children}

        <Footer className="w-full" />
      </div>
    </>
  );
}
