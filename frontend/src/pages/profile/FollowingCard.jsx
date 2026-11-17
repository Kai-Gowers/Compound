import "./FollowingCard.css";
import { useState } from 'react';
import { api } from "../../api/client";
import { useAuth } from "../../auth/AuthProvider";
import { ForeignUserCard } from "./ForeignUserCard";

export function FollowingCard() {

    const [showFollowing, setShowFollowing] = useState(false);
    const [followingList, setFollowingList] = useState([]);
    const { user } = useAuth();
    
    const getFollowing = async () => {
        const response = await api.get(`/friends/${user.id}/following`);
        setFollowingList(response.data);
        setShowFollowing(true);
    }

    return (
        <>
            <button onClick={getFollowing}>
                Following
            </button>

            {showFollowing && (
                <div className="overlay" onClick={() => setShowFollowing(false)}>
                    <div className="card" onClick={(e) => e.stopPropagation()}>
                        <button onClick={() => setShowFollowing(false)}>
                            Close
                        </button>

                        {followingList.map((followingUnit) => {
                            
                            return (
                                <ForeignUserCard foreignUser={followingUnit}/>
                            );

                        })}
                    </div>
                </div>
            )}
        
        
        </>
    );

}