import { useEffect, useState } from "react";
import Logo from "../img/illustrations/logo.png";
import Image from "next/image";
import Link from "next/link";

export default function Siderbar() {
    const [storage, setstorage] = useState({});
    // load user
    useEffect(() => {
        setstorage(localStorage);
    });
    return (
        <>
            <section className="sidebar">
                <Image src={Logo} className="sidebar__logo" />

                <Link
                    className="sideicon"
                    alt="Explore"
                    title="Explore"
                    href={"/explore"}
                >
                    <i className="bx bx-hash"></i>
                </Link>

                <Link
                    className="sideicon"
                    alt="new post"
                    title="New Post"
                    href={"/new-post"}
                >
                    <i className="bx bx-pencil"></i>
                </Link>

                <Link
                    className="sideicon"
                    alt="search"
                    title="Search"
                    href={"/search"}
                >
                    <i className="bx bx-search"></i>
                </Link>

                {storage.name ? (
                    <Link
                        className="sideicon"
                        alt="profile"
                        title="Profile"
                        href={"/profile"}
                    >
                        <i className="bx bx-user"></i>
                    </Link>
                ) : (
                    <Link
                        className="sideicon"
                        alt="login"
                        title="Login/Signup"
                        href={"/login"}
                    >
                        <i className="bx bx-user-plus"></i>
                    </Link>
                )}
            </section>
        </>
    );
}
