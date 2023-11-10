import Image from "next/image";
import Link from "next/link";

export default function CustomUser({ name, pfp, username }) {
    return (
        <>
            <Link id="get__home" href="/" style={{ display: "none" }}></Link>
            <section className="profile posts">
                <span className="pfp_background">
                    <Image
                        width={100}
                        height={100}
                        className="user__pfp"
                        src={pfp}
                    />
                </span>
                <br />
                <span className="cred">
                    <p className="name__pfp">{name}</p>
                    <p className="username__pfp">@{username}</p>
                </span>
                <br />
            </section>
        </>
    );
}
