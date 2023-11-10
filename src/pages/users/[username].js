import { useRouter } from "next/router";
import Siderbar from "@/components/sidebar";
import Head from "next/head";
import { useEffect, useState } from "react";
import CustomUser from "@/components/customuser";
import Loading from "@/components/loading";
import Link from "next/link";

export default function User() {
    const router = useRouter();
    const { username } = router.query;
    const [userdata, setuserdata] = useState({ user: false });
    const baseURL = "https://chat-app-backend-parthkabra.vercel.app";

    async function getUser() {
        const response = await fetch(`${baseURL}/api/get-user`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username }),
        });

        const data = await response.json();
        setuserdata(data);
    }

    useEffect(() => {
        getUser();
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
                <section className="app">
                    <Siderbar />
                    {console.log(userdata.user.state)}
                    {userdata.user.state ? (
                        <CustomUser
                            name={userdata.user.name}
                            username={userdata.user.username}
                            pfp={userdata.user.pfp}
                        />
                    ) : (
                        <span className="load">
                            <Loading />
                        </span>
                    )}
                </section>
            </main>
        </>
    );
}
