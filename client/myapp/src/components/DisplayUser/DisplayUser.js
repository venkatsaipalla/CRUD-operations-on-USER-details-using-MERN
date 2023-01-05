import React, { Fragment } from "react";
import "./DisplayUser.css";

const DisplayUser = (props) => {
  const { userDetails } = props;
  const { name, id, email, status, imageUrl, gender, created_at, updated_at } =
    userDetails;
  return (
    <Fragment>
      <div className="card">
        <div className="cover-photo">
          <img src={imageUrl} className="profile" alt="propic" />
        </div>
        <h3 className="profile-name">{name}</h3>
        <div className="details">
          <p className="about">UserId : {id}</p>
          <p className="about">Email : {email}</p>
          <p className="about">
            status : {status} | gender : {gender}
          </p>
        </div>
        <button className="bttn">Message</button>
        <button className="bttn">Show More</button>
        <p className="about">Created_at : {created_at}</p>
        <p className="about">Updated at : {updated_at}</p>
      </div>
    </Fragment>
  );
};
export default DisplayUser;
