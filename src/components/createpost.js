import Image from "next/image";
import { useEffect, useState } from "react";
import Loading from "./loading";
import Dots from "../img/dots.png";
import Link from "next/link";

export default function Createpost() {
    const baseURL = "https://chat-app-backend-parthkabra.vercel.app";
    const [characters, setCharacters] = useState(0);
    const [imageSrc, setImageSrc] = useState("");
    const [storage, setstorage] = useState({});

    useEffect(() => {
        setstorage(localStorage);
    });

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            setImageSrc(e.target.result);
        };

        if (file) {
            document.getElementById("choose__file").style.display = "none";
            reader.readAsDataURL(file);
        }
    };

    function getVal(id) {
        return document.getElementById(id).value;
    }

    async function CreateNewPost() {
        const user = storage.name;
        const username = storage.username;
        const text = document.getElementById("input__text").value;
        const img = imageSrc;
        const pfp = storage.pfp;
        let valid = false;
        if (text.length > 0 || img.length > 0) {
            valid = true;
        }
        if (!valid) {
            alert(
                "The post format is invalid. Please choose an image or share your thoughts. If the issue persists, kindly refresh the page and attempt again."
            );
            return;
        }
        const response = await fetch(`${baseURL}/api/create-post`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ user, username, text, img, pfp }),
        }).then(() => {
            document.getElementById("get__homexx").click();
        });
    }

    function choosepostbanner() {
        document.getElementById("file__hidden").click();
    }

    useEffect(() => {
        if (localStorage.name == null) {
            document.getElementById("get__home2").click();
        }
    });

    return (
        <section className="main__post">
            <Image src={Dots} className="dots dots1" />
            <Image src={Dots} className="dots dots2" />
            <Link
                id="get__home2"
                href="/login"
                style={{ display: "none" }}
            ></Link>
            <Link
                id="get__homexx"
                href="/explore"
                style={{ display: "none" }}
            ></Link>

            {storage.name ? (
                <>
                    <span className="title__section">
                        <h1 className="create__title">
                            <span className="underlined">
                                What<span className="you">'</span>s On
                            </span>{" "}
                            Your Mind?
                        </h1>
                    </span>
                    <span className="createpost">
                        <br />
                        <br />
                        <span className="textarea__">
                            <textarea
                                className="textarea"
                                id="input__text"
                                onInput={(e) =>
                                    setCharacters(
                                        document.getElementById("input__text")
                                            .value.length
                                    )
                                }
                                maxLength={100}
                                placeholder={"What's happening?"}
                            ></textarea>
                            <p className="characters">{characters}/100</p>
                        </span>
                        {imageSrc && ( // Render image only if a file is selected
                            <div className="post__banner">
                                <Image
                                    src={imageSrc} // Set the source of the image dynamically from the uploaded file
                                    alt="Uploaded Image"
                                    className="uploaded__img"
                                    width={300}
                                    height={200}
                                />
                            </div>
                        )}
                        <br />
                        <span className="post__banner">
                            <input
                                type="file"
                                id="file__hidden"
                                className="file__hidden"
                                onChange={handleFileChange}
                                accept="image/*"
                            />
                            <p
                                onClick={(e) => choosepostbanner()}
                                className="logout file__"
                                id="choose__file"
                            >
                                Choose post banner
                                <i className="bx bx-image-alt"></i>
                            </p>
                        </span>
                        {imageSrc ? (
                            <></>
                        ) : (
                            <>
                                <br />
                                <br />
                            </>
                        )}
                        <p
                            onClick={(e) => CreateNewPost()}
                            className="logout file__ submit__post"
                        >
                            Speak Your Mind
                        </p>
                        <br />
                        <br />
                    </span>
                </>
            ) : (
                <Loading />
            )}
        </section>
    );
}
