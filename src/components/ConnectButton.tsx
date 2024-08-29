import { useEffect, useState } from 'react'
import { formatEther } from 'viem'
import { walletClient, publicClient } from './config'
import 'viem/window';
import maskAddress from './util.ts';

//import icon_bnb from '../assets/bnb_icon.png'

function ConnectButton() {
  const [account, setAccount] = useState<any>(null) 
  const [balance, setBalance] = useState<String>("0")
  const [chain, setChain] = useState<String>("")
  const [user, setUser] = useState<any>("")

  //const addressInput = React.createRef<HTMLInputElement>()
  //const valueInput = React.createRef<HTMLInputElement>()


  useEffect(() => {
    connect();

   }, []);

  function generateUsername() {
    var a = ["Shy", "Blue", "Ugly","Hungry"];
    var b = ["Bear", "Dog", "Banana","Pirate"];

    var rA = Math.floor(Math.random()*a.length);
    var rB = Math.floor(Math.random()*b.length);
    var name = a[rA] + b[rB];
    return(name);
  }

  const connect = async () => {
    try {
      const username = generateUsername();
      console.log("username :",username); // blossomlogistical732

      const [address] = await walletClient.requestAddresses()
      setAccount(address)

      if (  window.localStorage.getItem("activeAccount")==address ) {
        const _user = window.localStorage.getItem("userName");
        setUser(_user);
      } else {
        window.localStorage.setItem("userName",username);
        window.localStorage.setItem("activeAccount",address);
        setUser(username);
      }

      const chainId = await publicClient.getChainId() 
      setChain(String(chainId));
        
      // read wallet native balance
      const mbalance = await publicClient.getBalance({ 
          address: address,
      })
   
      const balanceAsEther = formatEther(mbalance)
      setBalance(balanceAsEther)
      console.log("balance:",balanceAsEther);
      
      
    } catch(e) {
      console.log(e)
      
    }
  }

/*
  const sendTransaction = async () => {
    
    try {  
        const hash = await walletClient.sendTransaction({
          account,
          to: addressInput.current!.value as Address,
          value: parseEther(valueInput.current!.value as '${number}'),
        })
        setHash(hash);
        console.log("TX hash:",hash);
        
      } catch(e) {
        console.log("error:",e);
      }
  }
*/


 if (account)  
    return (
      <>

      <details className="dropdown">
          <summary className="btn m-1">{maskAddress(account)}</summary>
          <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
            <li><a>chain {chain}</a></li>
            <li><a>BNB {balance}</a></li>
            <li><a>USER {user}</a></li>
          </ul>
      </details>

     
      </>
    )
  return (
    <>
      <button className="btn btn-primary"  onClick={connect}>Connect wallet</button>
      
    </>  
    )
}

export default ConnectButton;
/*
                <h2>IPFS upload file</h2>
                <SingleFileUploader wallet={account} />
                <ERC20token token={TOKEN_SPC} wallet={account} />
                <ERC721token token={TOKEN_NFT} wallet={account} />

        <Wallet token={TOKEN_SPC} wallet={account} />         
        <ERC721token token={TOKEN_NFT} wallet={account} /> 

*/

