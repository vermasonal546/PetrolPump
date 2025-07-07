import React, { useEffect, useState } from "react";
import "./ChangePassword.css";
import axios from "axios";
import baseUrl from "./Url";

const Sign = ({ cross, setCross }) => {
  const [submit, setSubmit] = useState(false);
  const [click, setClick] = useState(false);
  const [error, setError] = useState("");
  const [currentpassword, setCurrentPassword] = useState("");
  const [newpassword, setNewPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent form submission reload
    if (newpassword === confirmpassword) {
      setSubmit(true);
      setClick(true);
      setError(""); // Clear previous errors
    } else {
      setError("Passwords do not match");
    }
  };

  useEffect(() => {
    if (submit && click) {
      axios.put(
          `${baseUrl}/changepswd?password=${currentpassword}&newPassword=${newpassword}`
        )
        .then(() => {
          alert("Password changed successfully");
          setSubmit(false);
          setClick(false);
          // Optionally clear form or close modal here
        })
        .catch((err) => {
          console.error(err);
          setError("Failed to change password");
        });
    }
  }, [submit, click, currentpassword, newpassword]);

  return (
    <>
      {cross ? (
        <div className="sign-container">
          <h1>
                 Change Password   
          </h1>
           <button onClick={() => setCross(false)} className="cross-btn">❌</button>
            <form onSubmit={handleSubmit}>
            <label>
              Current Password <span id="asterisk">*</span>
            </label>
            <input
              type="password"
              className="field"
              required
              value={currentpassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />

            <label id="new-password">
              New Password <span id="asterisk">*</span>
            </label>
            <input
              type="password"
              className="field"
              required
              value={newpassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />

            <label>
              Confirm Password <span id="asterisk">*</span>
            </label>
            <input
              type="password"
              className="field"
              required
              value={confirmpassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            {error && <h1 style={{ color: "red" }}>{error}</h1>}

            <button type="submit" className="btn">
              Submit
            </button>
          </form>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Sign;
