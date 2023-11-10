import { useEffect, useState } from "react";
import Post from "./post";
import Loading from "./loading";
export default function Posts() {
    const [posts, setPosts] = useState([]);
    const [storage, setstorage] = useState({});

    useEffect(() => {
        setstorage(localStorage);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            fetch(
                "https://chat-app-backend-parthkabra.vercel.app/api/get-posts"
            )
                .then((response) => response.json())
                .then((data) => {
                    //console.log(data)
                    if (data) {
                        setPosts(data.posts);
                    }
                });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    let allposts = [];
    for (let i in posts) {
        const post = posts[i];
        allposts.push(
            <Post
                name={post.name}
                email={storage.email ? storage.email : "none"}
                likes={post.likes}
                post_id={post.post_id}
                username={post.username}
                text={post.text}
                pfp={post.pfp}
                img={post.img}
            />
        );
    }
    allposts.reverse();

    return (
        <>
            <section className="posts">
                {allposts.length ? <>{allposts}</> : <Loading />}
            </section>
        </>
    );
}
