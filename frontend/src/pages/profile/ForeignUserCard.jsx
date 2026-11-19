import './ForeignUserCard.css';

export function ForeignUserCard({ foreignUser }) {

    return (
        <div className="foreign-user-information">
            <span>{foreignUser.email}</span>
            <span className="foreign-user-date">{foreignUser.sign_up_date}</span>
        </div>
    );

}
