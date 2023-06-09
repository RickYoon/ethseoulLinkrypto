import hashed from 'assets/ci/hashed.png'
import 'App.css'; 
import {Link} from "react-router-dom"
import styled, { keyframes } from 'styled-components';
import react, {useState, useEffect} from "react";
import { useDispatch , useSelector } from 'react-redux';
import { Bar } from "react-chartjs-2";

import icons from "assets/tokenIcons"
import { useParams } from "react-router-dom";
import { BsBoxArrowLeft } from "react-icons/bs";
import axios from 'axios';

import { WsV2 } from "chainrunner-sdk";
import BigNumber from "bignumber.js";

import poolInfos from "./poolInfos.json"
import testData from "./testData.json"
import testDataAfter from "./testDataAfter.json"

import ethereum from '../../assets/ci/ethereum.png';
import Lido from "../../assets/tokens/blog.svg"
import fraxfinance from "../../assets/tokens/fraxfinance.png"
import curve from "../../assets/tokens/curve.png"
import {Card} from "./CardComponent.jsx"
// import Rocketpool from "../../../assets/tokens/rocketpool.png"
// import swell from "../../../assets/tokens/swell.svg"
// import etherfi from "../../../assets/tokens/etherfi.svg"
// import ankr from "../../../assets/tokens/ankr.png"
// import stakewise from "../../../assets/tokens/stakewise.png"

function Manage() {

  const { id } = useParams();  
  const [showModal, setShowModal] = useState(false);
  const [isloading, setIsloading] = useState(false);
  const [isDropdown, setIsDropdown] = useState(true);
  const [sortstate, setSortstate] = useState(0);
  const sortStates = ["APR","Balance"]

  const userAccount = useSelector(state => state.account) // 지갑주소
  const walletProvider = useSelector(state => state.walletProvider) // 프로바이더

  // nodeklay => "클레이 노드 스테이킹"
  const [investedAsset, setInvestedAsset] = useState({
    "isInvested": true,
    "totalAssetETH": 150,
    "investedETH": 104.15,
    "investedUSD": 23000,
    "dailyIncomeETH": 0.023,
    "dailyIncomeUSD": 3.7,
    "averageAPR": 5.11,
    "ethProtocolCategorySummary": [
      { "frxETH + ETH LP": 42 },
      { "frxETH Staking": 58 }
    ],
    "ethAprStatus": {
      "myStatus": 5.107257898683967,
      "maxApr": 7.560209552012428
    },
    "ethPerformanceChartValue": [95, 100, 90],
    "ethPerformanceChartDate": ["06-01", "06-02", "06-03"],
    "myStakingList": [
      {
        "depositedETH": 0.5,
        "protocolName": "fraxfinance"
      }
    ],
    StakingDetailList : [{
      "id": "baef2dc8",
      "onEvent": false,
      "stepNumber": 2, 
      "category" : "Liquidity Staking",
      "balanceETH" : 10,
      "boostCRV" : 0,
      "boostBAL" : 0,
      "netAPR": 6.7,
      "protocolName" : "Frax",
      "investStep": [
          {
              "protocol" : "Frax",
              "action" : "deposit ETH",
              "result" : "get Base Token, frxETH"
          },
          {
              "protocol" : "Curve",
              "action" : "provide frxETH + ETH LP",
              "result" : "reward CRV + CVX + FXS Token"
          }
      ]
    }]
  })

useEffect(() => {

  if(userAccount === ""){

    setInvestedAsset({
      "isInvested": true,
      "totalAssetETH": 150,
      "investedETH": 104.15,
      "investedUSD": 23000,
      "dailyIncomeETH": 0.023,
      "dailyIncomeUSD": 3.7,
      "averageAPR": 5.11,
      "ethProtocolCategorySummary": [
        { "frxETH + ETH LP": 42 },
        { "frxETH Staking": 58 }
      ],
      "ethAprStatus": {
        "myStatus": 5.107257898683967,
        "maxApr": 7.560209552012428
      },
      "ethPerformanceChartValue": [95, 100, 90],
      "ethPerformanceChartDate": ["06-01", "06-02", "06-03"],
      "myStakingList": [
        {
          "depositedETH": 0.5,
          "protocolName": "fraxfinance"
        }
      ],
      StakingDetailList : [{
        "id": "baef2dc8",
        "onEvent": false,
        "stepNumber": 2, 
        "category" : "Liquidity Staking",
        "balanceETH" : 10,
        "boostCRV" : 0,
        "boostBAL" : 0,
        "netAPR": 6.7,
        "protocolName" : "Frax",
        "investStep": [
            {
                "protocol" : "Frax",
                "action" : "deposit ETH",
                "result" : "get Base Token, frxETH"
            },
            {
                "protocol" : "Curve",
                "action" : "provide frxETH + ETH LP",
                "result" : "reward CRV + CVX + FXS Token"
            }
        ]
      }]
    })

  } else if (userAccount !== undefined || userAccount !== "") { 

   
    loadAsset() 
  }
  

}, [userAccount])

function delay(ms = 1000) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const loadAsset = async () => {

  try {
    
    console.log("loading 시작")
    setIsloading(true)
    const time = Date.now();
    await delay(2000);


    const assetList = await axios.get(`https://wp22qg4khl.execute-api.ap-northeast-2.amazonaws.com/v1/eth/investInfo?userAddr=${userAccount}`)

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

  const chartOptions = { plugins: { legend: { display: false } } };

  const chartData = {
    labels: investedAsset.ethPerformanceChartDate,
    datasets: [
      {
        label: "",
        data: investedAsset.ethPerformanceChartValue,
        backgroundColor: ["#2563eb"]
      },
    ],
  };

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
                    Asset Status
                  </Title>
                </ManageTitle>
              </Wrappertitle>
              <div style={{paddingTop:"20px"}}/>

                  <div class="block p-6 bg-blue-700 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                  <div style={{justifyContent:"space-between"}} class="flex flex-row mb-2 text-1xl font-bold tracking-tight text-white dark:text-white">
                      <div>Total Asset</div>                      
                      <div>
                      {isloading ? 
                         <>
                          <div style={{float:"right"}}> <ProductSkeleton width="80px" height="30px" /> </div>
                         </>  
                          :
                          userAccount !== "" ?
                            <div style={{float:"right"}}> {investedAsset.totalAssetETH} ETH </div>
                            :  
                            "-"
                        }
                      </div>
                    </div>
                    <hr />
                    {isloading ? 
                          <>
                            <hr />
                            <ProductSkeleton width="80%" height="30px" style={{marginTop:"20px"}}/>
                          </> 
                          :
                          userAccount !== "" ?
                          <h5 class="mt-2 mb-2 text-1xl font-bold tracking-tight text-white dark:text-white">
                            Invested 
                          </h5>    
                            :  
                            <br/>
                        }

                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-white dark:text-white">
                      {isloading ? 
                          <><ProductSkeleton width="20%" height="20px" /></>
                          :
                          userAccount !== "" ?
                            <> {investedAsset.investedETH.toFixed(2)} ETH  </>
                            :  
                            "Connect Wallet"
                      }
                      
                      <span className="text-xs text-gray mx-5">
                      {isloading ? 
                          <><ProductSkeleton width="20%" height="20px" /></>   // 로딩 중이고, 자산이 로딩 안된 상황
                          :
                          userAccount !== "" ?
                            <> {Number(investedAsset.investedUSD.toFixed(0)).toLocaleString()} USD  </>
                            :  
                            ""
                      }
                        
                      </span>
                    </h5>
                    <h5 class="mb-2 text-1xl font-bold tracking-tight text-white dark:text-white">
                    {isloading ? 
                          <><ProductSkeleton width="50%" height="30px" /></>   // 로딩 중이고, 자산이 로딩 안된 상황
                          :
                          userAccount !== "" ?
                            <>                         
                            Daily Income : {investedAsset.dailyIncomeETH.toFixed(4)} ETH 
                            <span className="text-xs text-gray mx-5"> 
                              {investedAsset.dailyIncomeUSD.toFixed(4)} USD
                            </span>                        
                            <br/>
                            average APR : {investedAsset.averageAPR.toFixed(2)} %  </>
                            :  
                            ""
                    }

                    </h5>
                  </div>
                  <div style={{marginTop:"20px"}}></div>
                  {isloading ? 
                          <>
                            <div className="border border-blue-200 rounded-lg p-5" style={{backgroundColor:"white"}}>
                              <ProductSkeleton width="100%" height="150px" />
                            </div>
                          </>  
                          :
                          userAccount !== "" ?
                            <>
                  <div className="border border-blue-200 rounded-lg p-5" style={{backgroundColor:"white"}}>
                  <h5 class="mb-3 text-1xl font-bold tracking-tight text-black dark:text-white">Portfolio</h5>
                  <div style={{marginTop:"10px"}}></div>
                  <div class="mb-1 p-0 text-base font-medium dark:text-blue-500" style={{fontSize:"14px"}}>Protocol list</div>
                  <div class="w-full bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700">
                    {isloading ? 
                      <></>   // 로딩 중이고, 자산이 로딩 안된 상황
                      :
                        investedAsset.ethProtocolCategorySummary.length > 0 ? 
                        investedAsset.ethProtocolCategorySummary.length < 1.5 ? 
                          <>
                          <div class="bg-blue-600 h-2.5 rounded-full" style={{width:"100%"}}>                              
                          </div>
                          </>
                          :
                          <>
                            <div class="bg-blue-200 h-2.5 rounded-full" style={{width:"100%"}}>                              
                                <div class="bg-blue-400 h-2.5 rounded-full" 
                                      style={{width:`${Object.values(investedAsset.ethProtocolCategorySummary[0])[0] + Object.values(investedAsset.ethProtocolCategorySummary[1])[0]}%`}}>    
                                      <div class="bg-blue-600 h-2.5 rounded-full" 
                                        style={{width:`${Object.values(investedAsset.ethProtocolCategorySummary[0])[0] * 100 / (Object.values(investedAsset.ethProtocolCategorySummary[0])[0] + Object.values(investedAsset.ethProtocolCategorySummary[1])[0])}%`}}>    
                                      </div>
                                </div>
                            </div>
                          </>
                      :
                        <></>
                    }
                    <span style={{fontSize:"12px", marginTop:"20px"}}>
                        <span class="flex flex-wrap items-center text-xs font-medium text-gray-900 dark:text-white pt-2 gap-1">
                        {isloading ? 
                          <></>  
                          :
                          investedAsset.ethProtocolCategorySummary.map((res,index, array)=>(
                            array.length !== 0 ?
                              index < 2 ?
                                <>
                                <span class={`pt-1 w-2.5 h-2.5 bg-blue-${600 - 200*index} rounded-full mr-0.5`}></span>
                                <span>{Object.keys(res)[0]} - {Object.values(res)[0].toFixed(1)}%</span>                            
                                </>
                                :
                                <></>
                            :
                            <></>
                        ))}
                        </span>
                    </span>
                  </div>

                  <div style={{marginTop:"40px"}}></div>
                  <div class="mb-1 p-0 text-base font-medium dark:text-blue-500" style={{fontSize:"14px"}}>APR status</div>
                  <div class="w-full bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700">
                    {isloading ? 
                          <></>  
                          :
                          investedAsset.ethAprStatus.myStatus !== 0 ? 
                          100 * investedAsset.ethAprStatus.myStatus / investedAsset.ethAprStatus.maxApr > 90 ?
                            <>
                            <div class="bg-blue-500 h-2.5 rounded-full" style={{width:`${100 * investedAsset.ethAprStatus.myStatus / investedAsset.ethAprStatus.maxApr}%`}}></div>
                            <span style={{fontSize:"12px", marginTop:"20px"}}> 
                              My status - {investedAsset.ethAprStatus.myStatus.toFixed(2)} % 
                              (Max {investedAsset.ethAprStatus.maxApr.toFixed(2)}%)
                            </span>
                            </>
                            :
                            <>
                            <div class="bg-red-500 h-2.5 rounded-full" style={{width:`${100 * investedAsset.ethAprStatus.myStatus / investedAsset.ethAprStatus.maxApr}%`}}></div>
                            <span style={{fontSize:"12px", marginTop:"20px"}}> 
                              My status - {investedAsset.ethAprStatus.myStatus.toFixed(2)} % 
                              (Max {investedAsset.ethAprStatus.maxApr.toFixed(2)}%)
                            </span>
                            </>
                          :
                          <></>
                    }
                  </div>
                  </div>
                  </>
                  :  
                  ""
                }
            <div style={{marginTop:"20px"}}></div>

            </SubTemplateBlockVertical>
            <RightSubTemplateBlockVertical style={{backgroundColor:"rgb(249,250,251)"}}>
            {isloading ? 
              <>
              <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>               
              <Title>
                My Staking List
              </Title>
                <div style={{position:"relative"}} >
                <Link to="/findpools">
                  <button style={{width:"100px", height:"40px", display:"flex", alignItems:"center", justifyContent:"center"}} id="dropdownDefaultButton" data-dropdown-toggle="dropdown" class="text-white border border-blue-200 bg-blue-600 hover:bg-blue-400 font-medium rounded-lg text-sm px-2 py-1.5 text-center inline-flex items-center" type="button">
                    Add Staking
                  </button>
                </Link>
                </div>
              </div>
                <div style={{marginTop:"20px"}}></div>
                <div className="border border-blue-200 rounded-lg p-5" style={{backgroundColor:"white"}}>
                  <ProductSkeleton width="100%" height="200px" />
                </div>
              </> : 
              userAccount !== "" ?
              <>
              <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>               
              <Title>
                My Staking List
              </Title>
                <div style={{position:"relative"}} >
                <Link to="/findpools">
                  <button style={{width:"100px", height:"40px", display:"flex", alignItems:"center", justifyContent:"center"}} id="dropdownDefaultButton" data-dropdown-toggle="dropdown" class="text-white border border-blue-200 bg-blue-600 hover:bg-blue-400 font-medium rounded-lg text-sm px-2 py-1.5 text-center inline-flex items-center" type="button">
                    Add Staking
                  </button>
                </Link>

                </div>
              </div>

              <div style={{marginTop:"20px"}}></div>

              <ul role="list">
                {isloading ? 
                  <>
                  </> 
                  :
                  userAccount !== "" ?                 
                    investedAsset.StakingDetailList.map((res)=>(
                      <>
                        <div className="border border-blue-200 rounded-lg p-5" style={{backgroundColor:"white"}}>
                          <Card data={res} />
                        </div>
                        <div style={{marginTop:"20px"}}></div>
                      </>
                    ))
                  :
                  <></>
                }
                </ul>
              </>
              :
              <></>
              }
            </RightSubTemplateBlockVertical>
          </OverBox>
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
    margin-left: 30px;
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




export default Manage;

