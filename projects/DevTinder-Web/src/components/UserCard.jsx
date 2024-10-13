import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

/* eslint-disable react/prop-types */
const UserCard = ({ user }) => {
  const { _id, firstName, lastName, photoUrl, age, gender, about } = user;
  const dispatch = useDispatch();
  const handleSentRequest = async (status, userId) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        {
          withCredentials: true,
        }
      );
      dispatch(removeUserFromFeed(userId));
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="card bg-base-300 w-96 shadow-xl">
      <figure>
        <img src={photoUrl} alt="Photo" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        {age && gender && <p>{age + ", " + gender}</p>}
        <p>{about}</p>
        <div className="card-actions justify-center mt-4">
          <button
            className="btn btn-primary"
            onClick={() => handleSentRequest("ignored", _id)}
          >
            Ignore
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => handleSentRequest("interested", _id)}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
