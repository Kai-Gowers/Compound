import "./FollowingCard.css";
import { useState, useEffect } from 'react';
import { api } from "../../api/client";
import { useAuth } from "../../auth/AuthProvider";
import { ForeignUserCard } from "./ForeignUserCard";

export function FollowingCard() {

    const [showFollowing, setShowFollowing] = useState(false);
    const [followingList, setFollowingList] = useState([]);
    const { user } = useAuth();
    
    const getFollowing = async (isInitialRender) => {
        try {
            const response = await api.get(`/friends/${user.id}/following`);
            setFollowingList(response.data);
            if (!isInitialRender) {
                setShowFollowing(true);
            }
        } catch (error) {
            alert("Unable to get following");
        }
    }

    useEffect(() => {
        getFollowing(true);
    }, []);

    return (
        <>

            {followingList.length}

            <button onClick={() => getFollowing(false)}>
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