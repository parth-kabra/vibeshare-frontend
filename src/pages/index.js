import LoadingMain from "@/components/loading_main";
import Other from "@/components/other";
import Posts from "@/components/posts";
import Siderbar from "@/components/sidebar";
import Head from "next/head";
import { useEffect } from "react";

export default function Explore() {
    useEffect(() => {
        setTimeout(() => {
            document.getElementById("loading_app").style.display = "none";
            document.getElementById("app__").style.display = "flex";
        }, 2000);
    }, []);
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
                <section className="app" id="app__" style={{ display: "none" }}>
                    <Siderbar />
                    <Posts />
                    <Other />
                    {/* <Createpost id="hidden"/> */}
                </section>
                <section
                    id="loading_app"
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        width: "100%",
                        height: "100vh",
                        justifyContent: "center",
                    }}
                >
                    <LoadingMain />
                </section>
            </main>
        </>
    );
}
