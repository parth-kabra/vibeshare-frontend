import LoadingMain from "@/components/loading_main";
import Other from "@/components/other";
import Post from "@/components/post";
import Siderbar from "@/components/sidebar";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Explore() {
    const router = useRouter();
    const { postid } = router.query;
    const post_id = postid - "0";
    const [post, setPost] = useState({});
    const baseURL = "https://chat-app-backend-parthkabra.vercel.app";
    const [storage, setstorage] = useState({});

    async function getPost() {
        const response = await fetch(`${baseURL}/api/get-post`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ post_id }),
        });
        const data = await response.json();
        setPost(data);
    }

    useEffect(() => {
        setTimeout(() => {
            document.getElementById("loading_app").style.display = "none";
            document.getElementById("app__").style.display = "flex";
        }, 2000);
        setstorage(localStorage);
    }, []);

    useEffect(() => {
        if (post_id && !post.length) {
            getPost();
        }
    });

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
                    <span className="posts">
                        <Post
                            shared={true}
                            name={post.name}
                            email={storage.email ? storage.email : "none"}
                            likes={post.likes}
                            post_id={post.post_id}
                            username={post.username}
                            text={post.text}
                            pfp={post.pfp}
                            img={post.img}
                        />{" "}
                    </span>
                    <Other />
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
