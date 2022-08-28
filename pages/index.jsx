//import { AsyncLocalStorage } from 'async_hooks';
import Head from 'next/head'
import Image from 'next/image'
import {useState} from 'react'
import { NFTCard } from "./components/nftCard"

// alchemy-nft-api/fetch-script.js
//import fetch from 'node-fetch';

const Home = () => {
  const [wallet, setWalletAddress] = useState("");
  const [collection, setCollectionAddress] = useState("");
  const [NFTs, setNFTs] = useState([]);
  const [fetchForCollection, setFetchForCollection]=useState(false);
  const [pageKeyIndex, setpageKeyIndex]=useState("");



  // Setup request options:
  var requestOptions = {
    method: 'GET',
    //redirect: 'follow'
  };
  

  const fetchNFTs = async() => {
      let nfts;
      console.log("fetching nfts");
      // Replace with your Alchemy API key:
      const apiKey = "demo";
      const baseURL = `https://eth-mainnet.alchemyapi.io/nft/v2/${apiKey}/getNFTs/`;
      
      
      // Replace with the wallet address you want to query:
      if (pageKeyIndex.length === 0) {
        var pageInd = "";
      } else {
        var pageInd = `&pageKey=${pageKeyIndex}`;
      }


      if(!collection.length) {

        

        // Replace with the wallet address you want to query:
        const fetchURL = `${baseURL}?owner=${wallet}${pageInd}`;
       
        nfts = await fetch(fetchURL, requestOptions).then(data => data.json())

      } else {

        console.log("fetching nfts for collection owned by address");
        const fetchURL = `${baseURL}?owner=${wallet}&contractAddresses%5B%5D=${collection}${pageInd}`;
        nfts = await fetch(fetchURL, requestOptions).then(data => data.json())


      }

      if(nfts) {
        console.log("nfts:",nfts);
        setNFTs(nfts.ownedNfts);
        if(nfts.pageKey){
          setpageKeyIndex(nfts.pageKey)
        } else {
          setpageKeyIndex("")
        }
          
       
      }
    }

    const fetchNFTsForCollection = async () => {
        if(collection.length) {


      // Replace with the wallet address you want to query:
      if (pageKeyIndex.length === 0) {
        var pageInd = "";
      } else {
        var pageInd = `&startToken=${pageKeyIndex}`;
      }

          // Replace with your Alchemy API key:
        const apiKey = "demo";
        const baseURL = `https://eth-mainnet.alchemyapi.io/nft/v2/${apiKey}/getNFTsForCollection/`;
        const fetchURL = `${baseURL}?contractAddress=${collection}&withMetadata=${"true"}${pageInd}`;
        const nfts = await fetch(fetchURL, requestOptions).then(data => data.json());

        if (nfts) {
          console.log("NFTS in collection: ", nfts);
          setNFTs(nfts.nfts);
          console.log(nfts.nextToken)
          
          if(nfts.nextToken){
            setpageKeyIndex(nfts.nextToken)
          }

          

          }
        }
    }

  return (
    <div className="flex flex-col items-center justify-center py-8 gap-y-3">
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <input disabled={fetchForCollection} className="w=2/5 bg-slate-100 py-2 px-2 rounded-lg text-gray-800 focus:outline-blue-300 disabled:bg-slate-50 disabled:text-gray-50" onChange={(e) => {setWalletAddress(e.target.value)}} value={wallet} type="text" placeholder="Add your wallet address"></input>
      <input className="w=2/5 bg-slate-100 py-2 px-2 rounded-lg text-gray-800 focus:outline-blue-300 disabled:bg-slate-50 disabled:text-gray-50" onChange= {(e) => {setCollectionAddress(e.target.value)}} value= {collection} type="text" placeholder="Add the collection address"></input>
    <label className="text-gray-600"><input onChange={(e)=>{setFetchForCollection(e.target.checked)}} type="checkbox" className="mr-2"></input>Fetch for collection</label>
    <button className="disabled:bg-slate-500  bg-blue-400 px-5 py-2 mt-3 rounded-sm w-2/5" onClick= {
      () => {
        if (fetchForCollection) {
          fetchNFTsForCollection()
        } else fetchNFTs()
      }
      }>Let's go!</button>
      </div>

    <div className='flex flex-wrap gap-y-12 mt-4 w-5/6 gap-x-2 justify-center'>
    {
      NFTs.length && NFTs.map(nft => {
        return (
          <NFTCard nft={nft}></NFTCard>
        )
      })
    }
    </div>
    
          

    {pageKeyIndex? 
          <button disabled={pageKeyIndex.length === 0} 
            className={"disabled:bg-slate-500 text-white bg-blue-400 px-4 py-2 mt-3 rounded-sm w-1/5"}
            onClick={
              () => {
                if (fetchForCollection) {
                  fetchNFTsForCollection()
                } else fetchNFTs()
              }
            }
          >
            Next Page
          </button>
          : <></> }  

</div>
    
  )
}

export default Home
