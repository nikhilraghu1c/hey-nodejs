import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useEffect, useState } from "react";

const Connections = () => {
  const [connections, setConnections] = useState([]);
  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      if (Array.isArray(res.data?.data)) {
        setConnections(res.data.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);
  return (
    <div className="text-center my-10">
      <h1 className="font-bold text-white text-3xl">Connections</h1>
      {connections.length === 0 && (
        <p className="font-bold text-white text-l mt-24">No connections found</p>
      )}
      {connections.map((connection) => {
        const { _id, firstName, lastName, photoUrl, about, age, gender } =
          connection;
        return (
          <div
            key={_id}
            className="flex m-4 p-4 rounded-lg bg-base-300 w-1/3 mx-auto"
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
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
