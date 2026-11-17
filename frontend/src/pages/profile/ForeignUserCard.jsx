import './ForeignUserCard.css';

export function ForeignUserCard({ foreignUser }) {

    return (
        <div className="foreign-user-information">
            {foreignUser.email}
            {foreignUser.sign_up_date}
        </div>
    );

}