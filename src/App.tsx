import {Route, Routes } from "react-router-dom";
import Home from './pages/Home';
import WalletPage from './pages/WalletPage'
import NftPage from './pages/NftPage'
import BrowsePage from './pages/BrowsePage'


function App() {
  
  return (
    <div>   
      <Routes>
        <Route path="/" element={<Home />} />   
        <Route path="/wallet" element={<WalletPage />} /> 
        <Route path="/nft" element={<NftPage />} /> 
        <Route path="/browse" element={<BrowsePage />} /> 
      </Routes>     
    </div>
  )
}
export default App;

// <Route path="/wallet" element={<Wallet/>} />
// dogelon (ELON)
// 0x761D38e5ddf6ccf6Cf7c55759d5210750B5D60F3
//
// shiba inu
// 0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE
//
// vitalik wallet
// 0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045
//
// SPace Coin v3 (BSC testnet)
// 0x3FA03F41d0B5Bc2Ba1827E9B10010304AFF38784


