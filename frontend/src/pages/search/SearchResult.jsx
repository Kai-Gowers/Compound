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


    return (
        <div className="search-result">
            <span className="search-result-username">{searchResult.username}</span>

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