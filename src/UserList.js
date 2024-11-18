import axios from "axios";
import React, { useEffect, useState } from "react";

function UserList() {
  const [data, setData] = useState([]);
  const [isOffline, setIsOffline] = useState(false);

  const getData = async () => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      setData(response?.data);
      console.log("Fetched data from the network.");
    } catch (error) {
      if (navigator.onLine === false) {
        setIsOffline(true);
        console.log("You are offline, attempting to load from cache...");
        // Attempt to get data from the cache
        console.log(caches,"cachedaya")
        const cachedData = await caches.match("https://jsonplaceholder.typicode.com/users");
        if (cachedData) {
          const jsonData = await cachedData.json();
          setData(jsonData);
          console.log("Loaded cached data.");
        }
      } else {
        console.error("Network Error", error);
      }
    }
  };

  // Check if the user is online or offline
  useEffect(() => {
    getData();

    // Listen for online/offline status changes
    window.addEventListener("offline", () => setIsOffline(true));
    window.addEventListener("online", () => {
      setIsOffline(false);
      getData();
    });

    return () => {
      window.removeEventListener("offline", () => setIsOffline(true));
      window.removeEventListener("online", getData);
    };
  }, []);

  return (
    <div>
      <h2>User List</h2>
      {isOffline ? (
        <p>You are offline. Showing cached data.</p>
      ) : (
        <p>Fetching data from the network...</p>
      )}
      <ul>
        {data?.map((user) => (
          <li key={user.id}>
            <strong>{user.name}</strong> ({user.email})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;
