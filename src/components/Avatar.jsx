import React from "react";

import constants from "../helpers/constants";
const { DEFAULT_AVATAR_IMAGES } = constants;
const Avatar = ({ user, width }) => {
  return (
    <div id="profile-image">
      <img
        className="rounded-circle mx-1"
        width={width}
        src={user.imageUrl}
        alt={user.name}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = DEFAULT_AVATAR_IMAGES;
        }}
      />
    </div>
  );
};

export default Avatar;
