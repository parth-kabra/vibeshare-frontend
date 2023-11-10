import Link from "next/link";

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

export default function CommentSpan({ email, text }) {
    return (
        <>
            <span className="comment">
                <p className="commenter">{generateUsername(email)}</p>
                <p className="comment__text">{text}</p>
            </span>
        </>
    );
}
