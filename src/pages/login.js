import Head from "next/head";
import Image from "next/image";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "@/authentication/firebase";
import Link from "next/link";
import { useEffect } from "react";
import Streamer from "../img/illustrations/streamer.png";
function generateUsername(input) {
    const username = input.split("@")[0];
    let hash = 0;

    if (input.length === 0) return hash;

    for (let i = 0; i < input.length; i++) {
        const char = input.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash &= hash;
    }

    const s = Math.abs(hash).toString(16);
    const usable = `${s[0]}${s[1]}${s[s.length - 1]}`;
    return `${username}_${usable}`;
}

export default function UserAuth() {
    useEffect(() => {
        if (localStorage.name) {
            document.getElementById("home__direct").click();
        }
    });

    const baseURL = "https://chat-app-backend-parthkabra.vercel.app";
    const provider = new GoogleAuthProvider();
    async function CreateNewUser(name, username, email, pfp) {
        const response = await fetch(`${baseURL}/api/create-user`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, username, email, pfp }),
        }).then(() => {
            document.getElementById("home__direct").click();
        });
    }
    function HandleUser() {
        signInWithPopup(auth, provider)
            .then((current) => {
                const name = current.user.displayName;
                const email = current.user.email;
                const username = generateUsername(email);
                const pfp = current.user.photoURL;

                // store the user locally
                localStorage.clear();
                localStorage.name = name;
                localStorage.email = email;
                localStorage.username = username;
                localStorage.pfp = pfp;
                CreateNewUser(name, username, email, pfp);
            })
            .catch(() => {});
    }

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
            <Link
                style={{ display: "none" }}
                id="home__direct"
                href="/explore"
            ></Link>
            <section className="login">
                <Image src={Streamer} className="streamer" />
                <span className="login__main_div">
                    <span className="title__section">
                        <h1 className="create__title">
                            <span className="underlined">Step int</span>o
                            Connectivity
                        </h1>
                    </span>
                    <br />
                    <p
                        onClick={(e) => HandleUser()}
                        className="logout submit__post login_btn"
                    >
                        Create Account/Login with Google
                    </p>
                    <p className="agree">
                        <br />
                        By creating an account, you agree to the
                        <Link
                            className="terms"
                            href="https://cerulean-ostrich-10d.notion.site/Terms-and-Conditions-for-APP-NAME-9831dc7c0dce48f49806ac1a12e6dfba"
                        >
                            Terms and Conditions
                        </Link>
                        .
                    </p>
                </span>
            </section>
        </>
    );
}
