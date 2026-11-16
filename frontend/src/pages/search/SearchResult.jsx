import './SearchResult.css';
import { api } from "../../api/client";
import { useState } from 'react';

export function SearchResult({ searchResult }) {

    const [followStatus, setFollowStatus] = useState(searchResult.is_following);

    const follow = async () => {
        try {
            const response = await api.post(`/friends/follow/${searchResult.id}`);
            setFollowStatus(true);
        } catch (error) {
            alert(error.response?.data?.detail);
        }
    }

    const unfollow = async () => {
        try {
            const response = await api.post(`/friends/unfollow/${searchResult.id}`);
            setFollowStatus(false);
        } catch (error) {
            alert(error.response?.data?.detail);
        }
    }

    // TODO: wire up the followers and following button so that we can see these lists of other people
    // TOOD: add CSS to make the page look pretty

    return (
        <div className="search-result">
            <span className="search-result-email">{searchResult.email}</span>

            <div className="search-result-actions">
                {followStatus ? (
                    <button
                        className="unfollow-button"
                        onClick={unfollow}
                    >
                        Unfollow
                    </button>
                ) : (
                    <button
                        className="follow-button"
                        onClick={follow}
                    >
                        Follow
                    </button>
                )}

                <button className="ghost-button">
                    Followers
                </button>
                <button className="ghost-button">
                    Following
                </button>
            </div>
        </div>
    );

}