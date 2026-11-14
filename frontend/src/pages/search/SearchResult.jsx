import './SearchResult.css';
import { api } from "../../api/client";

export function SearchResult({ searchResult }) {


    const follow = async () => {
        try {
            const response = await api.post(`/friends/follow/${searchResult.id}`);
            alert(`You now follow ${searchResult.email}`);
        } catch (error) {
            alert(error.response?.data?.detail);
        }
    }

    const unfollow = async () => {
        try {
            const response = await api.post(`/friends/unfollow/${searchResult.id}`);
            alert(`You unfollowed ${searchResult.email}`);
        } catch (error) {
            alert(error.response?.data?.detail);
        }
    }

    return (
        <div className="search-result">

            {searchResult.email}

            {/* We need to add a check for each user that pops up to see if we follow them, so that we know which follow/unfollow button to display */}

            <button 
                className="follow-button"
                onClick={follow}
            >
                Follow
            </button>

            <button 
                className="unfollow-button"
                onClick={unfollow}
            >
                Unfollow
            </button>

            <button className="followers-button">
                Followers
            </button>
            <button className="following-button">
                Following
            </button>
        </div>
    );

}