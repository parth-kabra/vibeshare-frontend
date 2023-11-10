import { useEffect, useState } from "react";
import CommentSpan from "./comment";
import Link from "next/link";
import Image from "next/image";

export default function Post({
    shared = false,
    name,
    username,
    text,
    pfp,
    img,
    email = "none",
    post_id,
    likes,
}) {
    const [postcontent, setPostcontent] = useState(null);
    const [fake_likes, setfakelikes] = useState(likes);
    const [postimg, setPostimg] = useState(null);
    const [liked, setliked] = useState(false);
    const [likeloaded, setlikeloaded] = useState(false);
    const baseURL = "https://chat-app-backend-parthkabra.vercel.app";
    const [commentsVisible, setvisible] = useState(false);
    const [allcomments, setallcomments] = useState([]);
    let comments_compo = [];

    async function getComments() {
        const response = await fetch(`${baseURL}/api/get-comments`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ post_id }),
        });
        const data = await response.json();
        setallcomments(data.comments);
    }

    useEffect(() => {
        getComments();
    });

    for (let i in allcomments) {
        const comment = allcomments[i];
        comments_compo.push(
            <CommentSpan email={comment.email} text={comment.text} />
        );
    }

    useEffect(() => {
        if (text !== "") {
            setPostcontent(true);
        }
        if (img !== "") {
            setPostimg(true);
        }
    });

    async function loadLike() {
        const response = await fetch(`${baseURL}/api/check-liked`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ post_id, user_email: email }),
        });
        const data = await response.json();
        setlikeloaded(true);
        if (data.liked) {
            setliked(true);
        } else {
            setliked(false);
        }
    }

    useEffect(() => {
        if (email !== "none") {
            loadLike();
        }
    }, []);

    function toggleComments() {
        if (commentsVisible) {
            setvisible(false);
        } else {
            setvisible(true);
        }
    }

    async function handleLike() {
        if (likeloaded) {
            if (liked) {
                setliked(false);
                setfakelikes(fake_likes - 1);
            } else {
                setliked(true);
                setfakelikes(fake_likes + 1);
            }
        }
        if (email == "none") {
            alert("Please login to like the post.");
            return;
        } else {
            const response = await fetch(`${baseURL}/api/like-post`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ post_id, user_email: email }),
            });
            const data = await response.json();
        }
    }

    async function handleComment() {
        if (email === "none") {
            alert("Please login to comment");
            return;
        }
        let text = document.getElementById(`comment__input${post_id}`).value;
        text = text.trim("");
        if (!text.length) {
            alert("Please enter a comment first.");
            return;
        }
        document.getElementById(`comment__input${post_id}`).value = "";
        const response = await fetch(`${baseURL}/api/create-comment`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                post_id,
                user_email: email,
                text,
                name: name,
            }),
        });
        const data = await response.json();
        console.log(data);
    }

    return (
        <>
            <section
                className={`${!shared ? "post" : "shared__post"}`}
                alt="post"
            >
                <span className="post__head">
                    <Image
                        width={100}
                        height={100}
                        className="author__img"
                        src={pfp}
                        alt="avatar"
                    />
                    <span className="author__info">
                        <p className="name">{name}</p>
                        <p className="username">@{username}</p>
                    </span>
                </span>

                <br />

                {postcontent ? (
                    <span>
                        <p className="post__content">{text}</p>
                    </span>
                ) : (
                    <></>
                )}

                {postimg ? (
                    <span className="post__container">
                        <br />
                        <Image
                            width={700}
                            height={700}
                            src={img}
                            className="post__img"
                        />
                    </span>
                ) : (
                    <></>
                )}
                <br />
                {!shared ? (
                    <>
                        <span className="post__icons">
                            {!liked ? (
                                <i
                                    onClick={(e) => handleLike()}
                                    className="bx bx-heart heart__"
                                    id={`like__post${post_id}`}
                                    title="Like post"
                                ></i>
                            ) : (
                                <i
                                    onClick={(e) => handleLike()}
                                    className="bx bxs-heart heart__"
                                    id={`unlike__post${post_id}`}
                                    title="Like post"
                                ></i>
                            )}
                            <i
                                onClick={(e) => toggleComments()}
                                className="bx bx-chat"
                                title="Comment"
                            ></i>
                            <Link href={`/posts/${post_id}`}>
                                <i className="bx bx-link" title="Share"></i>
                            </Link>
                        </span>
                        <p className="liked__by_people">
                            Liked by {fake_likes} people
                        </p>
                        <span className="comment_user_span">
                            <input
                                className="comment_input"
                                maxLength={150}
                                type="text"
                                id={`comment__input${post_id}`}
                                placeholder="Add a comment"
                            />
                            <i
                                onClick={(e) => handleComment()}
                                className="bx bx-send"
                            ></i>
                        </span>
                        <p
                            onClick={(e) => toggleComments()}
                            className="view__all"
                        >
                            View all comments
                        </p>
                    </>
                ) : (
                    <></>
                )}
            </section>
            {!shared ? (
                <section
                    className="all__comments"
                    style={{ display: commentsVisible ? "flex" : "none" }}
                >
                    {comments_compo}
                </section>
            ) : (
                <></>
            )}
            <br />
            <br />
        </>
    );
}
