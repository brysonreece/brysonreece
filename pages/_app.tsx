import "@/styles/app.scss";

import type { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'

import { Layout } from '@/components/layout'

type NextPageWithCustomLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type NextPageWithMetaInformation<P = {}, IP = P> = NextPage<P, IP> & {
    title?: string
    description?: string
}

type CustomAppProps = AppProps & {
  Component: NextPageWithCustomLayout | NextPageWithMetaInformation
}

function DefaultLayout({ title, description, page }: {
    title?: string,
    description?: string,
    page: ReactElement,
}) {
    return (
        <Layout title={title} description={description}>
            {page}
        </Layout>
    )
}

export default function App({ Component, pageProps }: CustomAppProps) {
    // Use the layout defined at the page level, if available
    const getLayout = (Component as NextPageWithCustomLayout).getLayout || ((page: ReactElement) => (
        <DefaultLayout
            title={(Component as NextPageWithMetaInformation).title}
            description={(Component as NextPageWithMetaInformation).description}
            page={page}
        />
    ))

  return getLayout(<Component {...pageProps} />)
}
