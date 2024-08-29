import { useState } from "react";
import axios from "axios";
import StadiaIPFS from './StadiaIPFS';

/*
type Props = {
  wallet: any; //wallet address
};
*/

const SingleFileUploader = () => {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<
    "initial" | "uploading" | "success" | "fail"
  >("initial");
  const [ipfs, setIpfsHash] = useState<"">("");
  const [comment, setComment] = useState<"">("");
  
  const JWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIxZWFhMGU3NS0xNDkxLTQ2NTItODljYy0zNTkyNGI3ODcwMzEiLCJlbWFpbCI6ImRhcC5wYXltZW50c0BnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiMGM5ZGFmYjJiODI1MDcwNDRkNzciLCJzY29wZWRLZXlTZWNyZXQiOiI1MmQyMGU5Mzc4OThhNzYzOGJhZGE0MTUzZjBmMGZhODE2MGY3YWZiMjFhOTY5MmNmZDQ1NDA4ZDRjZGM4MDg1IiwiaWF0IjoxNzEyMzQ1NTMwfQ.z23TsuBNojo43e-O9NLBpGnqNcf6iGkY_BPlTAJd_uk";

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setStatus("initial");
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (file) {
      setStatus("uploading");
      let _input = (document.getElementById('dweetContent') as HTMLFormElement).value;
     // const _user = window.localStorage.getItem("userName");
      console.log("user typed :",_input);
      setComment(_input);
      
      const formData = new FormData();
      formData.append("file", file);
      const ransom = Date.now()+"_file";

      const pinataMetadata = JSON.stringify({
      name: ""+ransom
      });
      formData.append("pinataMetadata", pinataMetadata);

      const pinataOptions = JSON.stringify({
        cidVersion: 1,
      });
      formData.append("pinataOptions", pinataOptions);
     

      try {
        const result = await axios.post(
          "https://api.pinata.cloud/pinning/pinFileToIPFS",
          formData,
          {
            headers: {
              Authorization: `Bearer ${JWT}`,
            },
          }
        );

        console.log(">>>>  ",result.data.IpfsHash);
        
        setIpfsHash(result.data.IpfsHash);
        setStatus("success");
        
      } catch (error) {
        console.error(error);
        setStatus("fail");
        
      }
    }
  };

  return (
    <>
 

      <div className="input-group">
        <label htmlFor="file" className="sr-only">
          Choose a file
        </label>
        <input id="file" type="file" onChange={handleFileChange}  className="file-input file-input-bordered w-full max-w-xs"  />
      </div>
      <div className="input-group mt-10">
         <label htmlFor="dweetContent" className="col-form-label"></label>
         <textarea className="textarea textarea-bordered" id="dweetContent" placeholder="type comment..."></textarea>
      </div>
      {file && (
        <section>
          File details:
          <ul>
            <li>Name: {file.name}</li>
            <li>Type: {file.type}</li>
            <li>Size: {file.size} bytes</li>
          </ul>
        </section>
      )}

      {file && (
        <button   className="btn btn-primary w-24  mx-auto"  onClick={handleUpload} >
          Upload a file STEP 1/2
        </button>
      )}

      <Result status={status} />
      {status==="success" && (
        <>
         <StadiaIPFS hash={ipfs} comment={comment} />
         <p>https://fuchsia-broken-goat-339.mypinata.cloud/ipfs/{ipfs}</p>
        </>
      )}
    
        
    </>
  );
};


const Result = ({ status }: { status: string }) => {
  if (status === "success") {
    return <p>✅ File uploaded successfully well done!</p>;
  } else if (status === "fail") {
    return <p>❌ File upload failed!</p>;
  } else if (status === "uploading") {
    return <p>⏳ Uploading selected file...</p>;
  } else {
    return null;
  }
};

export default SingleFileUploader;