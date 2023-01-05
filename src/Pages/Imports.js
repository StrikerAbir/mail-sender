import React, { useContext } from "react";
import { AuthContext } from "../authProvider/AuthProvider";

const Imports = () => {
  const { user } = useContext(AuthContext);
    console.log(user);
    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        const csv = form.csvFile.files[0]
        console.log(csv);
    }
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <form onSubmit={handleSubmit}>
        <div>
          <input type="file" name="csvFile" id="csvFile" accept=".csv" />
          {/* <label for="csvFile">Choose File</label> */}
        </div>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default Imports;
