import React, { useState } from "react";
import localForage from "localforage";

const OfflineFallback = () => {
  const [formData, setFormData] = useState({});

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Store form data in local storage using localForage
    await localForage.setItem("formData", formData);
    // Additional logic for handling offline data submission
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div>
      <h1>Add Candidate Offline</h1>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleInputChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleInputChange}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default OfflineFallback;
