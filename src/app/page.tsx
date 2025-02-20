import Navbar from "@/components/NavBar";
import Head from 'next/head';
import PageScroll from "@/components/PageScroll";
import { Suspense } from 'react';

export default function Home() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Head>
                <title>QYPYM</title>

            </Head>
            <Navbar/>
            <PageScroll/>
        </Suspense>
    );
}