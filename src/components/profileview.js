import { useEffect, useState } from "react";
import Loading from "./loading";
import { signOut } from "firebase/auth";
import { auth } from "@/authentication/firebase";
import Link from "next/link";
import Image from "next/image";

export default function ProfileView() {
    const [storage, setstorage] = useState({});
    useEffect(() => {
        setstorage(localStorage);
        if (!localStorage.name) {
            document.getElementById("get__home").click();
        }
    }, []);

    function logout() {
        signOut(auth)
            .then(() => {
                localStorage.clear();
            })
            .then(() => {
                document.getElementById("get__home").click();
            })
            .catch(() => {});
    }

    return (
        <>
            <Link id="get__home" href="/" style={{ display: "none" }}></Link>
            <section className="profile posts">
                {storage.name ? (
                    <>
                        <span className="pfp_background">
                            <Image
                                className="user__pfp"
                                width={140}
                                height={140}
                                src={storage.pfp}
                            />
                        </span>
                        <br />
                        <span className="cred">
                            <p className="name__pfp">
                                {storage.name}
                                {storage.name == "parth kabra" ? "👑" : ""}
                            </p>
                            <p className="username__pfp">@{storage.username}</p>
                        </span>
                        <br />
                        <p
                            onClick={(e) => logout()}
                            className="logout login_btn prof__logout"
                        >
                            LOGOUT
                        </p>
                    </>
                ) : (
                    <Loading />
                )}
            </section>
        </>
    );
}
