import "./FollowersCard.css";
import { useState } from 'react';
import { api } from "../../api/client";
import { useAuth } from "../../auth/AuthProvider";
import { ForeignUserCard } from "./ForeignUserCard";

export function FollowersCard() {

    const [showFollowers, setShowFollowers] = useState(false);
    const [followerList, setFollowerList] = useState([]);
    const { user } = useAuth();
    
    const getFollowers = async () => {
        const response = await api.get(`/friends/${user.id}/followers`);
        setFollowerList(response.data);
        setShowFollowers(true);
    }

    return (
        <>
            <button onClick={getFollowers}>
                Followers
            </button>

            {showFollowers && (
                <div className="overlay" onClick={() => setShowFollowers(false)}>
                    <div className="card" onClick={(e) => e.stopPropagation()}>
                        <button onClick={() => setShowFollowers(false)}>
                            Close
                        </button>

                        {followerList.map((followerUnit) => {
                            
                            return (
                                <ForeignUserCard foreignUser={followerUnit}/>
                            );

                        })}
                    </div>
                </div>
            )}
        
        
        </>
    );

}