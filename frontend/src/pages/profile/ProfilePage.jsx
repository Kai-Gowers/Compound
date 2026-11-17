import "./ProfilePage.css";
import { FollowersCard } from "./FollowersCard";
import { FollowingCard } from "./FollowingCard";

export function ProfilePage() {

    
    

    return (

        <div>

            <div>Profile</div>


            <div>Email:</div>

            <div>Username:</div>

            <FollowersCard />
            
            <FollowingCard />

        </div>

    );

}