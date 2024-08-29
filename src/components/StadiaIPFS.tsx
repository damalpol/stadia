import { useEffect, useState } from 'react'
//import { Hash, formatEther, parseEther } from 'viem'
import { walletClient, publicClient } from './config'
import 'viem/window'
import { IPFSabi } from '../IPFSabi'

type Props = {
  hash: string; //hash ipfs
  comment: string;
};


function StadiaIPFS(props: Props) {
 
  const [result, setResult] = useState<String>("0x")

  useEffect(() => {
    //init();

   });

  
  const CONTRACT_IPFS = '0x4901a36B47e392a39eE6e4D198343a154FFa0799'
 
  const init = async () => {
     (document.getElementById('my_modal_11')  as HTMLFormElement).showModal()

     console.log("comment passed: ",props.comment);

    try {

         const [account] = await walletClient.requestAddresses();
   
         const { request } = await publicClient.simulateContract({
            account,
            address: CONTRACT_IPFS,
            abi: IPFSabi,
            functionName: 'saveFile',
            args: [props.hash,props.comment]
          })           

          const _data3 = await walletClient.writeContract(request)

          //***************************************
          // TODO : Add receipt from TX


          setResult(_data3);
       //console.log(_data3);
        (document.getElementById('my_modal_11')  as HTMLFormElement).close()
      
    } catch(e) {
      console.log(e);
       (document.getElementById('my_modal_11')  as HTMLFormElement).close()
    }
  }


  return (
      <>
  
    <dialog id="my_modal_11" className="modal">
      <div className="modal-box  bg-blue-500 ">
      
        <h3 className="font-bold text-lg">Please wait</h3>
        <span className="loading loading-dots loading-lg"></span>
        <p className="py-4">saving data to blockchain</p>
       
      </div>
    </dialog>  


         <div className="card card-compact  p-4 mx-auto text-center w-180 shadow-xl  bg-base-200">
            <button   className="btn btn-primary w-24  mx-auto"  onClick={init} >
              Save to Blockchain STEP 2/2
            </button>
            <a href={"https://testnet.bscscan.com/tx/"+result} target="_blank" className="btn btn-ghost btn-xs">details</a>
        </div>
           
        
      </>
    )
 
}

export default StadiaIPFS;
