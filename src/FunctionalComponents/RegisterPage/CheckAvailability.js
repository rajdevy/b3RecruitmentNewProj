import React, { useState } from "react";
import axios from "../../api/apiUrl";

const CheckAvailability = () => {
  const [userId, setUserId] = useState("");
  const [isAvailable, setIsAvailable] = useState(null);
  const [loading, setLoading] = useState(false);
  const [available, setavailable] = useState();

  // Simulated API call to check availability
  const checkAvailability = async (id) => {
    debugger;
    const UserId = id;

    setLoading(true);
    // Simulating network delay
    await new Promise((resolve) => setTimeout(resolve, 0));

    axios.post("Recruiters/IsCheckUserExist", { UserId }).then((res) => {
      console.log(res.data.IsCheckUserExist);
      setavailable(res.data.IsCheckUserExist);
      console.log(available);
    });

    console.log(available);
    setLoading(false);
    return available;
  };

  const handleInputChange = async (event) => {
    const newUserId = event.target.value;
    setUserId(newUserId);

    if (newUserId) {
      const available = await checkAvailability(newUserId);
      console.log(available);
      setIsAvailable(false);
    } else {
      setIsAvailable(null);
    }
  };

  return (
    <div className="p-10 bg-blue-600 h-80">
      <input
        type="text"
        className="p-2 border rounded"
        placeholder="Enter User ID"
        value={userId}
        onChange={handleInputChange}
      />
      <h1> hello{isAvailable}</h1>
      {loading ? (
        <p>Checking availability...</p>
      ) : (
        isAvailable && (
          <p className={isAvailable ? "text-green-500" : "text-red-500"}>
            {isAvailable ? "User ID is available!" : "User ID is taken!"}
          </p>
        )
      )}
    </div>
  );
};

export default CheckAvailability;
