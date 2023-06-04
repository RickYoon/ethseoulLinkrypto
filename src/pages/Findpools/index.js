import hashed from 'assets/ci/hashed.png'
import 'App.css'; 
import {Link} from "react-router-dom"
import styled, { keyframes } from 'styled-components';
import react, {useState, useEffect} from "react";
import { useDispatch , useSelector } from 'react-redux';
import { Bar } from "react-chartjs-2";

import icons from "../../assets/protocols"
import { useParams } from "react-router-dom";
import { BsBoxArrowLeft } from "react-icons/bs";
import axios from 'axios';

import { WsV2 } from "chainrunner-sdk";
import BigNumber from "bignumber.js";

import poolInfos from "./poolInfos.json"
import testData from "./testData.json"

import ethereum from '../../assets/ci/ethereum.png';
import Lido from "../../assets/tokens/blog.svg"
import fraxfinance from "../../assets/tokens/fraxfinance.png"
import curve from "../../assets/tokens/curve.png"
// import Rocketpool from "../../../assets/tokens/rocketpool.png"
// import swell from "../../../assets/tokens/swell.svg"
// import etherfi from "../../../assets/tokens/etherfi.svg"
// import ankr from "../../../assets/tokens/ankr.png"
// import stakewise from "../../../assets/tokens/stakewise.png"

import {Card} from "./CardComponent.jsx"



function Findpools() {

  const { id } = useParams();  
  const [showModal, setShowModal] = useState(false);
  const [isloading, setIsloading] = useState(false);
  const [isDropdown, setIsDropdown] = useState(true);
  const [sortstate, setSortstate] = useState(0);
  const sortStates = ["APR","Balance"]

  const userAccount = useSelector(state => state.account) // 지갑주소
  const walletProvider = useSelector(state => state.walletProvider) // 프로바이더

  const [poollistInfo, setPoollistInfo] = useState([
        {
            "id": "aa650e6f",
            "onEvent": false,
            "stepNumber": 1,
            "category": "Liquidity Staking",
            "balanceETH": 104.15,
            "boostCRV": 0,
            "boostBAL": 0,
            "netAPR": 4.8,
            "investStep": [
                {
                    "protocol": "Lido",
                    "action": "Deposit ETH",
                    "result": "Get reward bearing token, stETH"
                }
            ]
        }
    ])

  // nodeklay => "클레이 노드 스테이킹"
  const [investedAsset, setInvestedAsset] = useState({
    "connectedProtocols": 9,
    "protocolList": [
      {
        "name": "Lido",
        "fullName": "Lido Finance",
        "Category": "Liquidity Staking"
      },
      {
        "name": "Frax",
        "fullName": "Frax Finance",
        "Category": "Liquidity Staking"
      },
      {
        "name": "Rocketpool",
        "fullName": "Rocket Pool",
        "Category": "Liquidity Staking"
      },
      {
        "name": "Binance",
        "fullName": "Binance Finance",
        "Category": "Liquidity Staking"
      },
      {
        "name": "Coinbase",
        "fullName": "Coinbase",
        "Category": "Liquidity Staking"
      },
      {
        "name": "Ankr",
        "fullName": "Ankr Finance",
        "Category": "Liquidity Staking"
      },
      { "name": "Swell", "fullName": "Swell", "Category": "Liquidity Staking" },
      {
        "name": "Curve",
        "fullName": "Curve Finance",
        "Category": "Liquidity Staking"
      },
      {
        "name": "Balancer",
        "fullName": "Balancer",
        "Category": "Liquidity Staking"
      }
    ],
    "poolList": [
      {
        "id": "aa650e6f",
        "onEvent": false,
        "stepNumber": 1,
        "category": "Liquidity Staking",
        "balanceETH": 0,
        "boostCRV": 0,
        "boostBAL": 0,
        "netAPR": 4.8,
        "investStep": [
          {
            "protocol": "Lido",
            "action": "Deposit ETH",
            "result": "Get reward bearing token, stETH"
          }
        ]
      }
    ]
  }
  
  )

useEffect(() => {

  // console.log("userAccount",userAccount)
  // console.log("localStorage.getItem.address", localStorage.getItem("address") === "")

  // 1) local storage address check
  // null 이면 아예 접속한 적이 없는 것. // "" 이면 접속했엇으나 지갑해제한것.

  // 이 상황이라면 아무 것도 안한다. 
  
  // address 가 바뀌었다.
  if(userAccount === ""){ // 아무것도 아닌 거라면,
    // target 주소가 아무 것도 아닌 것이라면 아무 것도 안한다.
    setInvestedAsset({
      "isInvested": false,
      "totalInvested": 0,
      "totalDailyIncome": 0,
      "totalApr": 0,
      "klayInvestedinKlay": 0,
      "klayInvestedinKRW": 0,
      "klayDailyIncomeKlay": 0,
      "klayDailyIncomeKRW": 0,
      "KlayTotalApr": 0,
      "investCategory": {
          "klayStaking": 0,
          "ousdtStaking": 0
      },
      "klayStaking": {
          "Min": 0,
          "Max": 0,
          "balance": 0
      },
      "ousdtStaking": {
          "Min": 0,
          "Max": 0,
          "balance": 0
      },
      "klayAprStatus": {
        "myStatus": 0,
        "maxApr": 0
      },
      "klayProtocolCategorySummary":[{"":0},{"":0}],
      "klayProtocolCategory": [
        {
          "poolName": "hashed-Ozys (Klaystation)",
          "category": "노드 스테이킹",
          "investedKLAY": 0,
          "tvlKLAY": 0,
          "tvlKRW": 0,
          "apr":0,
          "liqToken": "sKLAY",
          "unStakingOption": [
              "스왑",
              "7일대기"
          ]
        }
    ]
  })

  } else if (userAccount !== undefined || userAccount !== "") { // 지갑 주소가 로딩 되었는데,

    loadAsset() 
  }

}, [userAccount])

const loadAsset = async () => {

  try {
    
    console.log("loading 시작")
    setIsloading(true)
    const time = Date.now();

    const assetList = await axios.get(`https://wp22qg4khl.execute-api.ap-northeast-2.amazonaws.com/v1/eth/poolfind?userAddr=${userAccount}`)

    // console.log("assetList.data.poolList",assetList)
    // assetList.data.poolList.sort(function(a,b){
    //   if(a.netAPR < b.netAPR) return 1;
    //   if(a.netAPR === b.netAPR) return 0;
    //   if(a.netAPR > b.netAPR) return -1;
    // })
    // console.log("assetList.data.poolList after",assetList.data.poolList)

    setInvestedAsset(assetList.data)
    localStorage.setItem("lastAddress", userAccount)
    localStorage.setItem("assetList", JSON.stringify(assetList.data))
    localStorage.setItem("assetTimestamp", time)

    // console.log("assetList",assetList)
    // console.log("loading 종료")
    // initialArrange()
    setIsloading(false)
    
  } catch (error) {
    
    console.log("asset loading error")
    
  }

}

  return (
    <>

      <div style={{backgroundColor:"rgb(249,250,251)"}}>

        <div class="p-4 mt-10">
        <div style={{paddingTop:"30px"}}/>
          <OverBox style={{display:"flex", flexDirection:"row"}}>
              <SubTemplateBlockVertical style={{backgroundColor:"rgb(249,250,251)"}}>
              <Wrappertitle>
                <ManageTitle>
                  <Title>
                    Connection Info
                  </Title>
                  
                </ManageTitle>
              </Wrappertitle>
              <div style={{paddingTop:"20px"}}/>

              {userAccount == "" ?
              <></>
              :
              <div class="block p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <h5 class="mb-2 text-1xl font-bold tracking-tight text-blue-800 dark:text-white">
                  Connected Protocols - 9
                </h5>
                <h5 class="ml-5 mb-2 text-1xl tracking-tight text-blue-800 dark:text-white">
                <div style={{marginTop:"20px"}}></div>                  
                <span class="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                  <img src={icons["Lido"]} alt=""/>
                  </span>
                  <h3 class="ml-10 flex items-center mb-1 text-base text-gray-900 dark:text-white">
                    Lido Finance (LSD)
                  </h3>
                </h5>
                <h5 class="ml-5 mb-2 text-1xl tracking-tight text-blue-800 dark:text-white">
                <div style={{marginTop:"20px"}}></div>                  
                <span class="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                  <img src={icons["Frax"]} alt=""/>
                  </span>
                  <h3 class="ml-10 flex items-center mb-1 text-base text-gray-900 dark:text-white">
                    Frax Finance (LSD)
                  </h3>
                </h5>
                <h5 class="ml-5 mb-2 text-1xl tracking-tight text-blue-800 dark:text-white">
                <div style={{marginTop:"20px"}}></div>                  
                <span class="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                  <img src={icons["Rocketpool"]} alt=""/>
                  </span>
                  <h3 class="ml-10 flex items-center mb-1 text-base text-gray-900 dark:text-white">
                    Rocket Pool (LSD)
                  </h3>
                </h5>
                <h5 class="ml-5 mb-2 text-1xl tracking-tight text-blue-800 dark:text-white">
                <div style={{marginTop:"20px"}}></div>                  
                <span class="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                  <img src={icons["Binance"]} alt=""/>
                  </span>
                  <h3 class="ml-10 flex items-center mb-1 text-base text-gray-900 dark:text-white">
                    Binance (LSD)
                  </h3>
                </h5>                
                <h5 class="ml-5 mb-2 text-1xl tracking-tight text-blue-800 dark:text-white">
                <div style={{marginTop:"20px"}}></div>                  
                <span class="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                  <img src={icons["Coinbase"]} alt=""/>
                  </span>
                  <h3 class="ml-10 flex items-center mb-1 text-base text-gray-900 dark:text-white">
                    Coinbase (LSD)
                  </h3>
                </h5>
                <h5 class="ml-5 mb-2 text-1xl tracking-tight text-blue-800 dark:text-white">
                <div style={{marginTop:"20px"}}></div>                  
                <span class="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                  <img src={icons["Ankr"]} alt=""/>
                  </span>
                  <h3 class="ml-10 flex items-center mb-1 text-base text-gray-900 dark:text-white">
                    Ankr Finance (LSD)
                  </h3>
                </h5>
                <h5 class="ml-5 mb-2 text-1xl tracking-tight text-blue-800 dark:text-white">
                <div style={{marginTop:"20px"}}></div>                  
                <span class="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                  <img src={icons["Swell"]} alt=""/>
                  </span>
                  <h3 class="ml-10 flex items-center mb-1 text-base text-gray-900 dark:text-white">
                    swell (LSD)
                  </h3>
                </h5>
                <h5 class="ml-5 mb-2 text-1xl tracking-tight text-blue-800 dark:text-white">
                <div style={{marginTop:"20px"}}></div>                  
                <span class="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                  <img src={icons["Curve"]} alt=""/>
                  </span>
                  <h3 class="ml-10 flex items-center mb-1 text-base text-gray-900 dark:text-white">
                    Curve Finance (DEX)
                  </h3>
                </h5>
                <h5 class="ml-5 mb-2 text-1xl tracking-tight text-blue-800 dark:text-white">
                <div style={{marginTop:"20px"}}></div>                  
                <span class="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                  <img src={icons["Balancer"]} alt=""/>
                  </span>
                  <h3 class="ml-10 flex items-center mb-1 text-base text-gray-900 dark:text-white">
                    Balancer (DEX)
                  </h3>
                </h5>
              </div>
              }

            </SubTemplateBlockVertical>
            <RightSubTemplateBlockVertical style={{backgroundColor:"rgb(249,250,251)"}}>
            {isloading ? 
              <>
                <ProductSkeleton width="90%" height="50px" style={{marginLeft:"20px"}}/>
              </> : 
              userAccount !== "" ?
              <>
              <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>               
              <Title>
                Staking List
              </Title>
                <div style={{position:"relative"}} >
                  <Link to="/manage">
                    <button style={{width:"100px", height:"40px", display:"flex", alignItems:"center", justifyContent:"center"}} id="dropdownDefaultButton" data-dropdown-toggle="dropdown" class="text-blue-600 border border-blue-200 bg-white hover:bg-blue-400 font-medium rounded-lg text-sm px-2 py-1.5 text-center inline-flex items-center" type="button">
                      Return
                    </button>
                  </Link>
                <div style={{position:"absolute"}} id="dropdown" class="bg-white divide-y divide-gray-100 rounded-lg shadow w-30 dark:bg-gray-700">
                      <ul hidden={isDropdown} class="text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                        {sortStates.map((res)=>(
                          res !== sortStates[sortstate] ?
                          <li>
                            <div class="block px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                             {res}
                            </div>
                          </li>
                          :
                          <></>
                        ))}
                      </ul>
                  </div>

                </div>
              </div>

              <div style={{marginTop:"20px"}}></div>


              <div style={{marginTop:"20px"}}></div>

              <ul role="list">

                <div style={{marginTop:"20px"}}></div>

                {investedAsset.poolList.map((res)=>(
                    <>
                    {res.balanceETH === 0 ?
                    <>
                    <div className="border border-gray-200 rounded-lg p-5" style={{backgroundColor:"white"}}>
                      <Card data={res} />
                    </div>
                    <div style={{marginTop:"20px"}}></div>
                    </>
                    :
                    <>
                    <div className="border border-blue-200 rounded-lg p-5" style={{backgroundColor:"white"}}>
                      <Card data={res} />
                    </div>
                    <div style={{marginTop:"20px"}}></div>
                    </>
                    }
                  </>
                ))}

                
                </ul>
                </>
                :
                <></>
              }
            </RightSubTemplateBlockVertical>
          </OverBox>
        </div>
      </div>
      
    <div id="crypto-modal" tabindex="-1" aria-hidden="true" class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
      <div class="relative w-full max-w-md max-h-full">
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-hide="crypto-modal">
                <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>  
                <span class="sr-only">Close modal</span>
            </button>
            <div class="px-6 py-4 border-b rounded-t dark:border-gray-600">
                <h3 class="text-base font-semibold text-gray-900 lg:text-xl dark:text-white">
                    Connect wallet
                </h3>
            </div>
            <div class="p-6">
                <p class="text-sm font-normal text-gray-500 dark:text-gray-400">Connect with one of our available wallet providers or create a new one.</p>

            </div>
      </div>
    </div>
  </div>
    </>
  );
}

function TransScaleToken(props) {

  return (
    <>
      풀 토큰 :   
      {props.data > 100000000 ?
        " " + (props.data / 100000000).toFixed(2) + " 억 KLAY"
        : props.data >  10000 ?
        " " + (props.data / 10000).toFixed(2) + " 만 KLAY"
        :
        " " + props.data + " KLAY"
      }
    </>
  )
}

function TransScale(props) {

  return (
    <>
      풀 규모 :   
      {props.data > 100000000 ?
        " " + (props.data / 100000000).toFixed(2) + " 억원"
        : props.data >  10000 ?
        " " + (props.data / 10000).toFixed(2) + " 만원"
        :
        " " + props.data
      }
    </>
  )

}

const ManageTitle = styled.div`
  width: 460px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  @media screen and (max-width: 500px){
      width: 100%;
      /* margin: 10px 10px; */
      font-size: 12px;
    }
`


const Title = styled.h1`
  font-weight: 600;
  font-size: 20px;
`

const Wrappertitle = styled.div`
  margin: 0px auto 10px auto;
  width: 1136px;
  @media screen and (max-width: 950px){
    width: 100%;
    padding-top: 20px;
    color: black;
  }
  @media screen and (max-width: 500px){
    width: 100%;
    padding-top: 20px;
    /* color: gray; */
  }
`
const OverBox = styled.div`

margin: 10px auto; 
width: 1200px;
  /* position: relative;
  scroll-behavior: smooth;
  scroll-snap-type: y mandatory;
  height: 100vh;
  overflow: auto;
  padding: 30px; */

  @media screen and (max-width: 950px){
    width: calc(100%);
    width: -moz-calc(100%);
    width: -webkit-calc(100%);
    padding: 10px;
  }
`


const RightSubTemplateBlockVertical = styled.div`
     /* width: 900px; */
     /* max-width: 500px; */
    /* margin: 10px auto; */
    /* max-width: 460px; */
    width:100%;
    margin-left: 50px;
    /* padding-bottom: 10px; */
    /* position: relative; */
    /* padding:15px; */
    /* display:flex; */
    /* flex-direction:column; */

    /* padding: 20px 25px !important;
    background: #fff; */

    color: rgba(0, 0, 0, 0.87);
    transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    min-width: 0px;
    overflow-wrap: break-word;
    background-color: rgb(255, 255, 255);
    background-clip: border-box;
    /* border: 1px solid rgba(0, 0, 0, 0.125); */
    /* border-radius: 0.75rem; */
    /* box-shadow: rgb(0 0 0 / 10%) 0rem 0.25rem 0.375rem -0.0625rem, rgb(0 0 0 / 6%) 0rem 0.125rem 0.25rem -0.0625rem; */
    /* overflow: visible; */
    
  @media screen and (max-width: 500px){
      width: 100%;
      /* margin: 10px 10px; */
      font-size: 12px;
    }
`;

const SubTemplateBlockVertical = styled.div`
     /* width: 900px; */
     /* max-width: 500px; */
    /* margin: 10px auto; */
    max-width: 460px;
    /* padding-bottom: 10px; */
    position: relative;
    /* padding:15px; */
    /* display:flex; */
    /* flex-direction:column; */

    /* padding: 20px 25px !important;
    background: #fff; */

    color: rgba(0, 0, 0, 0.87);
    transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    min-width: 0px;
    overflow-wrap: break-word;
    background-color: rgb(255, 255, 255);
    background-clip: border-box;
    /* border: 1px solid rgba(0, 0, 0, 0.125); */
    /* border-radius: 0.75rem; */
    /* box-shadow: rgb(0 0 0 / 10%) 0rem 0.25rem 0.375rem -0.0625rem, rgb(0 0 0 / 6%) 0rem 0.125rem 0.25rem -0.0625rem; */
    /* overflow: visible; */
    
  @media screen and (max-width: 500px){
      width: 100%;
      /* margin: 10px 10px; */
      font-size: 12px;
    }
`;

const skeletonKeyframes = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`;


export const ProductSkeleton = styled.div`
  display: inline-block;
  height: ${props => props.height || "20px"};
  width: ${props => props.width || "50%"};
  animation: ${skeletonKeyframes} 1300ms ease-in-out infinite;
  background-color: #eee;
  background-image: linear-gradient( 100deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.5) 50%, rgba(255, 255, 255, 0) 80% );
  background-size: 200px 100%;
  background-repeat: no-repeat;
  border-radius: 4px;
  margin-top: ${props => props.marginTop || "0"}
`;




export default Findpools;

