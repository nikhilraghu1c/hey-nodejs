import { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constant";
import axios from "axios";

const Requests = () => {
  const [requests, setRequests] = useState([]);
  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      if (Array.isArray(res.data?.data)) {
        setRequests(res.data.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const reviewRequest = async (status, requestId) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/review/" + status + "/" + requestId,
        {},
        {
          withCredentials: true,
        }
      );
      removeRequest(requestId);
    } catch (error) {
      console.error(error);
    }
  };

  const removeRequest = (requestId) => {
    setRequests((item) => item.filter((request) => request._id !== requestId));
  };

  useEffect(() => {
    fetchRequests();
  }, []);
  return (
    <div className="text-center my-10">
      <h1 className="font-bold text-white text-3xl">Connection Requests</h1>
      {requests.length === 0 && (
        <p className="font-bold text-white text-l mt-24">No requests found</p>
      )}
      {requests.map((request) => {
        const { _id, firstName, lastName, photoUrl, about, age, gender } =
          request.fromUserId;
        return (
          <div
            key={_id}
            className="flex justify-between items-center m-4 p-4 rounded-lg bg-base-300 w-1/3 mx-auto"
          >
            <div>
              <img
                alt="photo"
                className="w-20 h-20 rounded-full"
                src={photoUrl}
              />
            </div>
            <div className="text-left mx-4">
              <h2 className="font-bold text-2xl">
                {firstName + " " + lastName}
              </h2>
              {age && gender && <p>{age + ", " + gender}</p>}
              <p>{about}</p>
            </div>
            <div className="flex-1 text-end">
              <button
                className="btn btn-outline btn-success mx-2"
                onClick={() => {
                  reviewRequest("accepted", request._id);
                }}
              >
                Accept
              </button>
              <button
                className="btn btn-outline btn-error mx-2"
                onClick={() => {
                  reviewRequest("rejected", request._id);
                }}
              >
                Reject
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
