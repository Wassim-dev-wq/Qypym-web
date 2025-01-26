import Navbar from "@/components/NavBar";
import Head from 'next/head';
import PageScroll from "@/components/PageScroll";

export default function Home() {
    return (
        <>
            <Head>
                <title>QYPYM</title>
            </Head>
            <Navbar/>
            <PageScroll/>
        </>
    );
}