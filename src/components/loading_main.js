import Image from "next/image";
import logo from "../img/illustrations/logo.png";

export default function LoadingMain() {
    return (
        <span className="title__section">
            <Image src={logo} className="logo__img" />
        </span>
    );
}
