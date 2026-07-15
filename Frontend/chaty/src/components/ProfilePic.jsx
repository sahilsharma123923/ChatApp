import { getInitials } from "../utils/helper";

const ProfilePic = ({ src, name }) => {
  return (
    <div className="w-12 h-12 rounded-full bg-gray-900 flex items-center justify-center overflow-hidden">
      
      {src ? (
        <img
          src={src}
          alt={name}
          className="w-full h-full object-cover"
        />
      ) : (
        <span className="text-white font-semibold">
          {getInitials(name)}
        </span>
      )}

    </div>
  );
};

export default ProfilePic;