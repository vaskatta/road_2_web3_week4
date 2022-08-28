
//import { SvgComponent } from "./svgComponent"
import { CopyToClipboard } from "react-copy-to-clipboard";
//import React from 'react';
//import {ReactComponent as ReactLogoBefore} from '../svgs/copy-svgrepo-com-2.svg';
//import {ReactComponent as ReactLogoAfter} from '../svgs/tick-svgrepo-com-3.svg';
//import { SvgIcon } from '@material-ui/core';
import React, { useState } from 'react';
import ReactDOM from "react-dom";
import styled from "styled-components";
//const [isShown, setIsShown] = useState(false);


const CopyButton = styled.button`
  ::after {
    content: url("./svgs/icons8-copy-100.png");
  }
`;

export const NFTCard = ({ nft }) => {

    return (
        
        <div className="w-1/4 flex flex-col ">
            
        <div className="rounded-md">
            <img className="object-cover h-128 w-full rounded-t-md" src={nft.media[0].gateway} ></img>
        </div>
        <div className="flex flex-col y-gap-2 px-2 py-3 bg-slate-100 rounded-b-md h-110 ">
            <div className="">
                <h2 className="text-xl text-gray-800">{nft.title}</h2>
                <p className="text-gray-600">Id: {nft.id.tokenId.substr(nft.id.tokenId.length - 4)}</p>
                <p>{`${nft.contract.address.substr(0,5)}...${nft.contract.address.substr(nft.contract.address.length -4)}`}
                 <CopyToClipboard
                    text={nft.contract.address}>
                    <CopyButton  className="bg-green-600 text-white text-center rounded-sm w=1/2  py-1 px-2">Copy</CopyButton>
                </CopyToClipboard>
                </p>
               
               
            </div>

            <div className="flex-grow mt-2">
                <p className="text-gray-600">{nft.description?.substring(0,150)}</p>
            </div>
            <div className="flex mt-1 justify-center">
                <a className="text-white py-2 px-4 bg-blue-400 w=1/2 text-center rounded-sm"target="_blank" href={`https:etherscan.io/token/${nft.contract.address}`}>View on etherscan</a>
            </div>
        </div>

    </div>
    )
}
