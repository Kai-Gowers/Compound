import "./ProfilePage.css";
import { FollowersCard } from "./FollowersCard";
import { FollowingCard } from "./FollowingCard";
import { useAuth } from "../../auth/AuthProvider";

export function ProfilePage() {

    const { user } = useAuth();

    return (

        <main className="profile-page">

            <header className="profile-header">
                <h1>Profile</h1>
            </header>

            <section className="profile-card">
                <div className="profile-identity">
                    <div className="profile-avatar" aria-hidden="true" />

                    <p className="profile-username">username</p>

                    <div className="profile-stats">
                        <FollowersCard />
                        <FollowingCard />
                    </div>
                </div>

                <dl className="profile-details">
                    <div>
                        <dt>Email</dt>
                        <dd>{user.email}</dd>
                    </div>
                    <div>
                        <dt>Sign-up date</dt>
                        <dd>{user.sign_up_date}</dd>
                    </div>
                    <div>
                        <dt>Bio</dt>
                        <dd>bio: none</dd>
                    </div>
                </dl>
            </section>

        </main>

    );

}
