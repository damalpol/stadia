import  { useEffect, useState } from 'react';
import { publicClient, walletClient } from './config';
import 'viem/window';
import { IPFSabi } from '../IPFSabi';
import maskAddress from './util.ts';

function BrowseIPFS() {
 
  const [html, setHTML] = useState<any>("")

  useEffect(() => {
    //init();

   });

  
  const CONTRACT_IPFS = '0x4901a36B47e392a39eE6e4D198343a154FFa0799'

const likeUpdate = async (e:any) => {
  (document.getElementById('my_modal_2') as HTMLFormElement).showModal();

    try {
      let dweetId=e.currentTarget.id;
      console.log("like ",dweetId);
      
      const [account] = await walletClient.requestAddresses();
       
      const { request } = await publicClient.simulateContract({
                account,
                address: CONTRACT_IPFS,
                abi: IPFSabi,
                functionName: 'likeDweet',
                args: [BigInt(dweetId)]  //{_id:BigInt(10)}
      })           

      const _data3 = await walletClient.writeContract(request);
      //setResult(_data3);
      console.log(_data3);
      (document.getElementById('my_modal_2') as HTMLFormElement).close();
    } catch(e) {
      console.log(e);
      (document.getElementById('my_modal_2') as HTMLFormElement).close(); 
    }

}

 
  const init = async () => {
  
    (document.getElementById('my_modal_1') as HTMLFormElement).showModal();
        
   try {

    let _search = (document.getElementById('search') as HTMLFormElement).value;
    console.log("searching for :",_search);
        	
   let i: any = await publicClient.readContract({
      address: CONTRACT_IPFS,
      abi: IPFSabi,
      functionName: 'totalDweets'
    })

   //var rows = [];
   var _json = [];
   let _data: any;
   
    while (i > 0) {
      _data = await publicClient.readContract({
        address: CONTRACT_IPFS,
        abi: IPFSabi,
        functionName: 'getDweet',
        args: [i]
      })

      const myBigInt = BigInt(_data[3]);
      const myNumber = Number(myBigInt);
      const date= new Date(myNumber*1000);
      const dateFormat = date.toLocaleTimeString("en-US") + ", "+ date.toLocaleDateString("en-US");
      const _comment = _data[2];
      const arrayofString = _comment.split(" ");
      console.log(arrayofString);
      // && arrayofString.indexOf('#') > -1
      if (_search=="") {
         _json.push({id: Number(i), wallet: _data[0], date:dateFormat, likes:Number(_data[4]), hash:"https://fuchsia-broken-goat-339.mypinata.cloud/ipfs/"+_data[1], comment: _data[2]});
 
      } else {
        for (let ii = 0; ii < arrayofString.length; ii++) {
          if ( arrayofString[ii]==_search )  {
            console.log("found! :",arrayofString);
             _json.push({id: Number(i), wallet: _data[0], date:dateFormat, likes:Number(_data[4]), hash:"https://fuchsia-broken-goat-339.mypinata.cloud/ipfs/"+_data[1], comment: _data[2]});
          }   
        }  
      }
            
      i--;
    }

    //setData(_info)
    console.log(_json);
    console.log(_json[0].hash);
    console.log(_json.length); // from 0 use -1 in loop    
    //setHTML(_json)

    const arrayDataItems: any = _json.map((file:any) => 
      <div className="card m-4 w-80 shadow  mx-auto  " key={file.id}>
        <figure>
          <img src={file.hash} alt="nft" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">post #{file.id}</h2>
          <p>{file.comment}</p>
          <p>{file.date}</p>
          <p>posted by {maskAddress(file.wallet)}</p>
          <p>likes {file.likes}</p>
              <div   className="btn btn-primary w-18  mx-auto" id={file.id} onClick={likeUpdate} >
                  like it!
              </div>    
         
            <div className="join">            
              <div   className="btn btn-neutral w-17  mx-auto" id={file.id}  >
                  diploma
              </div> 
              <div   className="btn btn-neutral w-17  mx-auto mr-5 ml-5" id={file.id}  >
                  scholarship
              </div>    
              <div   className="btn btn-neutral w-17  mx-auto" id={file.id}  >
                  NILoffer
              </div>  
            </div>  

        </div>

      </div>);    
    
    setHTML(arrayDataItems);

    (document.getElementById('my_modal_1') as HTMLFormElement).close();

    } catch(e) {
      //console.log(e)
       (document.getElementById('my_modal_1') as HTMLFormElement).close();
    }
  }


  return (
      <>
   <dialog id="my_modal_1" className="modal">
      <div className="modal-box  bg-blue-500 ">
      
        <h3 className="font-bold text-lg">Please wait</h3>
        <span className="loading loading-dots loading-lg"></span>
        <p className="py-4">retrieving data from blockchain</p>
       
      </div>
    </dialog>  
    <dialog id="my_modal_2" className="modal">
      <div className="modal-box  bg-blue-500 ">
      
        <h3 className="font-bold text-lg">Please wait</h3>
        <span className="loading loading-dots loading-lg"></span>
        <p className="py-4">saving data to blockchain</p>
       
      </div>
    </dialog>  

    <div className="card card-compact  p-4 mx-auto text-center w-180 shadow-xl  bg-base-200">
           
        <div className="join">   
            <label className="input input-bordered flex items-center gap-2">
              <input type="text" id="search" className="grow" placeholder="Search" />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70">
                <path
                  fillRule="evenodd"
                  d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                  clipRule="evenodd" />
              </svg>
            </label>
           <button   className="btn btn-primary w-24  mx-auto"  onClick={init} >
              load
            </button>
        </div>

          {html}

    </div>
           
        
      </>
    )
 
}

export default BrowseIPFS;




/*

<JsonToTable json={html} />

      {data.map((record) => {
                    return (
                      <th key={record.id}>
                        
                      </th>
                    );
                  })}

*/
