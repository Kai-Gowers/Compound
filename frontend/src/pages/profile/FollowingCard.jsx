import "./FollowingCard.css";
import { useState } from 'react';

export function FollowingCard() {

    const [showFollowing, setShowFollowing] = useState(false);

    return (
        <>
            <button onClick={() => setShowFollowing(true)}>
                Following
            </button>

            {showFollowing && (
                <div className="overlay" onClick={() => setShowFollowing(false)}>
                    <div className="card" onClick={(e) => e.stopPropagation()}>
                        <button onClick={() => setShowFollowing(false)}>
                            Close
                        </button>

                        <div>Kai, Jake, Jack</div>
                    </div>
                </div>
            )}
        
        
        </>
    );

}