import './SearchResult.css';

export function SearchResult({ searchResult }) {

    return (
        <div className="search-result">

            {searchResult.email}
            {searchResult.sign_up_date}

            <button classname="followers-button">
                Followers
            </button>
            <button classname="following-button">
                Following
            </button>
        </div>
    );

}