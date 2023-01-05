import React, { useContext, useState } from "react";
import { AuthContext } from "../authProvider/AuthProvider";

const Imports = () => {
    const [ importedEmail, setImportedEmail ] = useState([])
        console.log(importedEmail);
  const { user } = useContext(AuthContext);
    console.log(user);
    const processingCsv = (data) => {
        // console.log(data);
        const email = data.split('\n');
        // console.log(email);
        setImportedEmail(email)
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        const csv = form.csvFile.files[0]
        const reader = new FileReader();
        reader.onload = function(e) {
            const data = e.target.result;
            // console.log(data);
            processingCsv(data);

        }
        reader.readAsText(csv);
    }
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <form onSubmit={handleSubmit}>
        <input type="file" name="csvFile" id="csvFile" accept=".csv" />
        {/* <label for="csvFile">Choose File</label> */}

        <input
          type="submit"
          value="Import"
          className="p-2 rounded bg-green-300"
        />
          </form>
        {importedEmail.length >0 &&
      <div className="mt-5">
          {importedEmail.map((gmail) => <li className="text-xl" key={Math.random()}>{gmail}</li>)}
        <button className="p-2 rounded bg-green-300 mt-5">Send Mail</button>
      </div>
          }
    </div>
  );
};

export default Imports;
