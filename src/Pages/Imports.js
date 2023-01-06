import React, { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { AuthContext } from "../authProvider/AuthProvider";
import loading from '../assets/file-loading.gif'
const Imports = () => {

    const { logOut } = useContext(AuthContext);

    const handleLogOut = () => {
        logOut();
    };
    const [hidden,setHidden]=useState(false)
    const [ importedEmail, setImportedEmail ] = useState([])
        // console.log(importedEmail);
    // console.log(user);
    const processingCsv = (data) => {
        // console.log(data);
        const email = data.split(/\r?\n/);
        // console.log(email);
        setImportedEmail(email)
        toast.success('Successfully Imported...')
    }
    const handleImport = (event) => {
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

    const sendMail = async () => {
        setHidden(true)
        let response = 0;
        for (let i = 0; i < importedEmail.length; i++){
            
            const res = fetch("https://mail-sender-server.vercel.app/send", {
              method: "POST",
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify({ email: importedEmail[i] }),
            });
            // console.log((await res).status);
            if ((await res).status === 201) {
                response = response + 1;
             };
            if (response === importedEmail.length) {
                setHidden(false)
                 toast.success("Email send successfully..");
             }
        }
    }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen mx-4">
      <button className="p-2 rounded bg-red-300 mb-10" onClick={handleLogOut}>
        LogOut
      </button>
      <form onSubmit={handleImport}>
        <div>
          <input
            type="file"
            name="csvFile"
            id="csvFile"
            accept=".csv"
            required
          />
          {/* <label for="csvFile">Choose File</label> */}
        </div>

        <input
          type="submit"
          value="Import"
          className="p-2 rounded bg-green-300 mt-5 w-full"
        />
      </form>
      {importedEmail.length > 0 && (
        <div className="mt-5">
          {importedEmail.map((gmail) => (
            <li className="text-xl" key={Math.random()}>
              {gmail}
            </li>
          ))}
          <div className="flex w-full items-center">
            <button
              className="p-2 rounded bg-green-300 mt-5"
              onClick={sendMail}
            >
              Send Mail
            </button>
            <img src={loading} alt="" className={`w-10 ${hidden?`block`:`hidden`}`} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Imports;
