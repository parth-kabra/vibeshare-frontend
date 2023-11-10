export default function SearchBar() {
    return (
        <>
            <section className="search">
                <span className="search__bar">
                    <input
                        type="text"
                        id="search__input"
                        className="search__input"
                        placeholder="Search something..."
                    />
                    <i className="bx bx-search"></i>
                </span>
            </section>
        </>
    );
}
