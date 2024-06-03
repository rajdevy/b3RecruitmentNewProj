import React, { useState } from "react";

const CheckAvailability = () => {
  const [userId, setUserId] = useState("");
  const [isAvailable, setIsAvailable] = useState(null);
  const [loading, setLoading] = useState(false);

  // Simulated API call to check availability
  const checkAvailability = async (id) => {
    debugger;
    setLoading(true);
    // Simulating network delay
    await new Promise((resolve) => setTimeout(resolve, 10000));

    // Simulate an API response
    const existingUserIds = ["user1", "user2", "user3"];
    const available = !existingUserIds.includes(id);
    setLoading(false);
    return available;
  };

  const handleInputChange = async (event) => {
    const newUserId = event.target.value;
    setUserId(newUserId);

    if (newUserId) {
      const available = await checkAvailability(newUserId);
      setIsAvailable(available);
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
