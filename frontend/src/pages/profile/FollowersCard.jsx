import "./FollowersCard.css";
import { useState } from 'react';

export function FollowersCard() {

    const [showFollowers, setShowFollowers] = useState(false);

    return (
        <>
            <button onClick={() => setShowFollowers(true)}>
                Followers
            </button>

            {showFollowers && (
                <div className="overlay" onClick={() => setShowFollowers(false)}>
                    <div className="card" onClick={(e) => e.stopPropagation()}>
                        <button onClick={() => setShowFollowers(false)}>
                            Close
                        </button>

                        <div>Kai, Alice, Bob</div>
                    </div>
                </div>
            )}
        
        
        </>
    );

}