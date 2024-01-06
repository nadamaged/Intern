import React from "react";
import ProfileBody from "./ProfileBodey";
import ProfileHeader from "./ProfileHeader";

const Profile: React.FC = () => {
  return (
    <div className="divide-y-1 divide-gray-100 border-b border-gray-200 drop-shadow-md">
      <ProfileBody />
      <ProfileHeader />
    </div>
  );
};

export default Profile;
