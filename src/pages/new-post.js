import Createpost from "@/components/createpost";
import Siderbar from "@/components/sidebar";
import Head from "next/head";

export default function Explore() {
    return (
        <>
            <Head>
                <title>VibeShare</title>
                <meta
                    name="description"
                    content="Connecting the World, One Nexus at a Time."
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className="main">
                <section className="app">
                    <Siderbar />
                    <Createpost id="hidden" />
                </section>
            </main>
        </>
    );
}
