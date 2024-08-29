
import stadiaLogo from '../assets/stadia_logo.png'
import ConnectButton from './ConnectButton';

export default function Navbar() {
  return (
    <>

<nav className="navbar justify-between bg-base-300">
    
    <a className="btn btn-ghost text-lg">
        <img alt="Logo" src={stadiaLogo} className="w-14" />
        STADIA NIL 
    </a>

    
    <div className="dropdown dropdown-end sm:hidden">
        <button className="btn btn-ghost">
            <i className="fa-solid fa-bars text-lg"></i>
        </button>

        <ul className="dropdown-content menu z-[1] bg-base-200 p-6 rounded-box shadow w-56 gap-2">
            <li><a>About</a></li>
            <li><a>Pricing</a></li>
            <li><a>Blog</a></li>
            <li><a>Contact</a></li>
            <a className="btn btn-sm btn-primary">Log in</a>
        </ul>
    </div>

   
    <ul className="hidden menu sm:menu-horizontal gap-2">
        <li><a  href="/wallet">Wallet</a></li>
        <li><a  href="/nft">NFT Membership</a></li>
        <li><a  href="/browse">BlockDataBase</a></li>
        <li><a  href="/">Home</a></li>
        
    </ul>

 
        <ul className="col-span-2 menu md:menu-horizontal justify-start gap-4 hidden">
           
            <ConnectButton />
            <li><a>Community</a></li>
        </ul>

</nav>


          
    </>
  );
}


/*


   <div className="navbar bg-base-100 bg-gray-300  ">
      <div className="flex-none">
        <button className="btn btn-square btn-ghost">
          <img src={stadiaLogo} />
        </button>
      </div>
      <div className="flex-1">
        <a className="btn btn-ghost text-xl mr-10" href="/wallet">Wallet</a>
      </div>
       <div className="flex-1">
        <a className="btn btn-ghost text-xl mr-10" href="/nft">NFT Membership</a>
      </div>    
       <div className="flex-1">
        <a className="btn btn-ghost text-xl mr-10" href="/browse">IPFS Browse</a>
      </div>    
      <div className="flex-1">
        <a className="btn btn-ghost text-xl" href="/">Home</a>
      </div>          
      <div className="flex-none">
        <ConnectButton />
      </div>
    </div>

*/