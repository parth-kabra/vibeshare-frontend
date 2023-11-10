import { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "@/authentication/firebase";
import Link from "next/link";
import Image from "next/image";

function Suggest({ name, username, img }) {
    return (
        <div key={Math.random()}>
            <span className="post__head suggest__head">
                <Image
                    width={100}
                    height={100}
                    className="author__img suggest__img"
                    src={img}
                    alt="avatar"
                />
                <span className="author__info">
                    <p className="name">{name}</p>
                    <p className="username">@{username}</p>
                </span>
            </span>
        </div>
    );
}

export default function Other() {
    const [storage, setStorage] = useState({});
    const [featured, setFeatured] = useState([]);

    async function getFeatured() {
        fetch("https://chat-app-backend-parthkabra.vercel.app/api/get-featured")
            .then((response) => response.json())
            .then((data) => {
                //console.log(data)
                if (data) {
                    setFeatured(data.accounts);
                }
            });
    }

    useEffect(() => {
        setStorage({ ...localStorage });
        getFeatured();
    }, []);

    function logout() {
        signOut(auth)
            .then(() => {
                localStorage.clear();
            })
            .then(() => {
                document.getElementById("get__home1").click();
            })
            .catch(() => {});
    }

    return (
        <>
            <Link id="get__home1" href="/" style={{ display: "none" }}></Link>
            <section className="other">
                {storage.name ? (
                    <span className="profile__view" key={Math.random()}>
                        {" "}
                        {/* Added key prop */}
                        <span className="view__head">
                            <span className="post__head">
                                <Image
                                    width={100}
                                    height={100}
                                    className="author__img suggest__img"
                                    src={storage.pfp}
                                    alt="avatar"
                                />
                                <span className="author__info">
                                    <p className="name">
                                        {storage.name}
                                        {storage.name === "parth kabra"
                                            ? "👑"
                                            : ""}
                                    </p>
                                    <p className="username">
                                        @{storage.username}
                                    </p>
                                </span>
                            </span>
                            <p
                                onClick={logout}
                                className="logout"
                                align="right"
                            >
                                LOGOUT
                            </p>
                        </span>
                    </span>
                ) : (
                    <></>
                )}
                {storage.name ? (
                    <h1 className="other__people">
                        Suggested for <span className="you">You</span>
                    </h1>
                ) : (
                    <h1 className="other__people">Featured Accounts</h1>
                )}
                {featured.map((account, index) => {
                    return (
                        <Suggest
                            key={index}
                            name={account.name}
                            username={account.username}
                            img={account.img}
                        />
                    );
                })}
            </section>
        </>
    );
}
