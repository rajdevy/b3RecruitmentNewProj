import React, { useState } from "react";
import axios from "../../api/apiUrl";

const CheckAvailability = () => {
  const [userId, setUserId] = useState("");
  const [isAvailable, setIsAvailable] = useState(null);
  const [loading, setLoading] = useState(false);

  const checkAvailability = async (id) => {
    setLoading(true);

    try {
      const response = await axios.post("Recruiters/IsCheckUserExist", {
        UserId: id,
      });

      setIsAvailable(!response.data.IsCheckUserExist);
      console.log(isAvailable);
    } catch (error) {
      console.error("Error checking user availability:", error);
      setIsAvailable(null);
    }

    setLoading(false);
  };

  const handleInputChange = (event) => {
    const newUserId = event.target.value;
    setUserId(newUserId);

    if (newUserId) {
      checkAvailability(newUserId);
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
      {loading ? (
        <p>Checking availability...</p>
      ) : (
        isAvailable !== null && (
          <p className={isAvailable ? "text-green-500" : "text-red-500"}>
            {isAvailable ? "User ID is available!" : "User ID is taken!"}
          </p>
        )
      )}
    </div>
  );
};

export default CheckAvailability;
