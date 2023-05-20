import hashed from 'assets/ci/hashed.png'
import 'App.css'; 
import {Link} from "react-router-dom"
import styled, { keyframes } from 'styled-components';
import WalletTokenDetailTable from "pages/Portfolio/WalletTokenDetailTable.js"
import react, {useState, useEffect} from "react";
import { useDispatch , useSelector } from 'react-redux';

import icons from "assets/tokenIcons"
import { useParams } from "react-router-dom";
import { BsBoxArrowLeft } from "react-icons/bs";
import axios from 'axios';

import { WsV2 } from "chainrunner-sdk";
import BigNumber from "bignumber.js";

import poolInfos from "./poolInfos.json"


function Manage() {

  const { id } = useParams();  
  const [showModal, setShowModal] = useState(false);
  const [isloading, setIsloading] = useState(false)

  const userAccount = useSelector(state => state.account) // 지갑주소
  const walletProvider = useSelector(state => state.walletProvider) // 프로바이더


  // nodeklay => "클레이 노드 스테이킹"
  const [investedAsset, setInvestedAsset] = useState({
    "isInvested": false,
    "totalInvested": 0,
    "totalDailyIncome": 0,
    "totalApr": 0,
    "ethInvestedinEth": 0,
    "ethInvestedinKRW": 0,
    "ethDailyIncomeEth": 0,
    "ethDailyIncomeKRW": 0,
    "ethTotalApr": 0,
    "investCategory": {
        "ethStaking": 0
    },
    "ethStaking": {
        "Min": 0,
        "Max": 0,
        "balance": 0
    },
    "ethAprStatus": {
      "myStatus": 0,
      "maxApr": 0
    },
    "ethProtocolCategorySummary":[
      {"":0},{"":0}
    ],
    "ethProtocolCategory": [
      {
        "poolName": "Lido",
        "category": "노드 스테이킹",
        "investedETH": 0,
        "tvlKLAY": 0,
        "tvlKRW": 0,
        "apr":0,
        "liqToken": "eETH",
        "unStakingOption": [
            "스왑",
            "7일대기"
        ]
      }
  ]
})

useEffect(() => {



}, [userAccount])

const loadAsset = async () => {

  console.log("loading 시작")
  setIsloading(true)
  const time = Date.now();

  const assetList = await axios.get(`https://wp22qg4khl.execute-api.ap-northeast-2.amazonaws.com/v1/service/investInfo?userAddr=${userAccount}`)

  assetList.data.ethProtocolCategory.sort(function(a,b){
    if(a.investedETH < b.investedETH) return 1;
    if(a.investedETH === b.investedETH) return 0;
    if(a.investedETH > b.investedETH) return -1;
  })

  assetList.data.oUsdtProtocolCategory.sort(function(a,b){
    if(a.investedoUSDT < b.investedoUSDT) return 1;
    if(a.investedoUSDT === b.investedoUSDT) return 0;
    if(a.investedoUSDT > b.investedoUSDT) return -1;
  })    

  setInvestedAsset(assetList.data)
  localStorage.setItem("lastAddress", userAccount)
  localStorage.setItem("assetList", JSON.stringify(assetList.data))
  localStorage.setItem("assetTimestamp", time)

  // console.log("storage assetList", localStorage.getItem("assetList"))
  // console.log("storage assetList", time - localStorage.getItem("assetTimestamp")) // 1000

  console.log("assetList",assetList)
  console.log("loading 종료")
  setIsloading(false)

}

async function testBifi () {
  const client = new WsV2("wss://api.glitch.chainrunner.io", window.ethereum, "GLITCH/KOREA");
  const response = await client.call(
    "Glitch.view.info.bridges",
    undefined,
    BigNumber(1),
  );
  
  console.log(response.result);  // const response = await client.call(
  //   "Glitch.view.info.lendings",
  //   undefined,
  //   new BigNumber(1),
  // );
  
  //   "Glitch.view.account.balance",
  //   undefined,
  //   "0x0000000000000000000000000000000000000000",
  //   BigNumber(0xbfc0),
  // );
  
  // const response = await client.call(
  //   "Glitch.view.info.assets",
  //   undefined,
  //   new BigNumber(0xbfc)
  // );

  console.log(response.result);

}

  return (
    <>

      <div>

        <div class="p-4 mt-10">
          <OverBox>
          <div style={{paddingTop:"30px"}}/>

              {/* <div style={{paddingTop:"20px"}}/> */}
              <SubTemplateBlockVertical>

              <Wrappertitle>
                <ManageTitle>
                  <Title>
                    ETH 예치하기
                    {/* {id} 관리하기 */}
                  </Title>
                  
                  <Link to="/invest/ethereum">
                    <a href="#" class="inline-flex items-center px-4 py-2 text-sm font-medium border border-blue-200 text-center text-blue-500 bg-white rounded-lg hover:bg-blue-600 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                      돌아가기
                    </a>
                    {/* <BsBoxArrowLeft style={{ marginRight: "10px", verticalAlign: "bottom" }}/> */}
                  </Link>
                </ManageTitle>
              </Wrappertitle>
              <div style={{paddingTop:"20px"}}/>

                  <div class="block p-6 bg-blue-500 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                    <h5 class="mb-2 text-1xl font-bold tracking-tight text-white dark:text-white">투자현황</h5>
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-white dark:text-white">
                      {isloading ? 
                          <><ProductSkeleton width="20%" height="30px" /></>   // 로딩 중이고, 자산이 로딩 안된 상황
                          :
                          userAccount !== "" ?
                            <> {investedAsset.ethInvestedinEth.toFixed(2)} ETH  </>
                            :  
                            "지갑을 연결해주세요"
                      }
                      
                      <span className="text-xs text-gray mx-5">
                      {isloading ? 
                          <><ProductSkeleton width="5%" height="30px" /></>   // 로딩 중이고, 자산이 로딩 안된 상황
                          :
                          userAccount !== "" ?
                            <> {Number(investedAsset.ethInvestedinKRW.toFixed(0)).toLocaleString()} 원  </>
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
                            일 수익 : {investedAsset.ethDailyIncomeEth.toFixed(4)} ETH 
                            <span className="text-xs text-gray mx-5"> 
                              {investedAsset.ethDailyIncomeKRW.toFixed(4)} 원
                            </span>                        
                            <br/>
                            연 수익율 : {investedAsset.ethTotalApr.toFixed(2)} %  </>
                            :  
                            ""
                    }

                    </h5>
                  </div>
                  <div style={{marginTop:"20px"}}></div>
                  <div className="border border-blue-200 rounded-lg p-5">
                  <h5 class="mb-3 text-1xl font-bold tracking-tight text-black dark:text-white">투자 내용</h5>
                  <div style={{marginTop:"10px"}}></div>
                  <div class="mb-1 p-0 text-base font-medium dark:text-blue-500" style={{fontSize:"14px"}}>프로토콜 별</div>
                  <div class="w-full bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700">
                    {isloading ? 
                      <></>   // 로딩 중이고, 자산이 로딩 안된 상황
                      :
                        investedAsset.ethProtocolCategorySummary.length > 0 ? // 100 * 76/100 = 76, 100 * 76/100 * 51.6/100 = 
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
                      {/* Hashed-Ozys (Klaystation) - 75% */}
                        <span class="flex flex-wrap items-center text-xs font-medium text-gray-900 dark:text-white pt-2 gap-1">
                        {isloading ? 
                          <></>   // 로딩 중이고, 자산이 로딩 안된 상황
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
                  <div class="mb-1 p-0 text-base font-medium dark:text-blue-500" style={{fontSize:"14px"}}>수익율 현황</div>
                  <div class="w-full bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700">
                    {isloading ? 
                          <></>   // 로딩 중이고, 자산이 로딩 안된 상황
                          :
                          investedAsset.ethAprStatus.myStatus !== 0 ? 
                          <>
                          <div class="bg-blue-600 h-2.5 rounded-full" style={{width:`${100 * investedAsset.ethAprStatus.myStatus / investedAsset.ethAprStatus.maxApr}%`}}></div>
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

                  <div style={{marginTop:"30px"}}></div>

      <div class="w-full max-w-md bg-white rounded-lg dark:bg-gray-800 dark:border-gray-700">
        <div class="flex items-center justify-between mb-4"></div>
        <div class="flow-root">
          {isloading ? 
              <>
                <ProductSkeleton width="90%" height="50px" style={{marginLeft:"20px"}}/>
              </> : 
              userAccount !== "" ?
              <>
              <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}> 
              
              <h5 class="mb-2 text-1xl font-bold tracking-tight text-black dark:text-white">투자상품</h5>
                <div style={{position:"relative"}} >
                <button onClick={testBifi} id="dropdownDefaultButton" data-dropdown-toggle="dropdown" class="text-blue-700 border border-blue-200 bg-white hover:bg-blue-100 focus:ring-1 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-1.5 text-center inline-flex items-center" type="button">
                  내 보유량순
                </button>  
                </div>
              </div>
              <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700" style={{marginLeft:"15px"}}>

              {investedAsset.ethProtocolCategory.map((res)=>(
                <li class="py-3 sm:py-4">
                  <div class="flex items-center space-x-4">
                      <div class="flex-shrink-0">
                          {res.poolName === "Kokoa Finance" ?
                          <img class="w-8 h-8 rounded-full" src={icons["Kokoa"]} alt=""/> :      
                          res.poolName === "Kleva" ?      
                          <img class="w-8 h-8 rounded-full" src={icons["kleva"]} alt=""/> :  
                          res.poolName === "Klaymore stakehouse" ?      
                          <img class="w-8 h-8 rounded-full" src={icons["Klaymore"]} alt=""/> :  
                          res.poolName === "Stake.ly" ?      
                          <img class="w-8 h-8 rounded-full" src={icons["stakely"]} alt=""/> :  
                          res.poolName === "Swapscanner" ?      
                          <img class="w-8 h-8 rounded-full" src={icons["Swapscanner"]} alt=""/> :  
                          res.poolName === "Klayswap" ?      
                          <img class="w-8 h-8 rounded-full" src={icons["Klayswap"]} alt=""/> :  
                          res.poolName === "BiFi" ?      
                          <img class="w-8 h-8 rounded-full" src={icons["BiFi"]} alt=""/> :  
                          res.poolName === "Klaybank" ?      
                          <img class="w-8 h-8 rounded-full" src={icons["Klaybank"]} alt=""/> :  
                          <img class="w-8 h-8 rounded-full" src={icons["Klaystation"]} alt=""/>
                          }
                      </div>
                        
                      <div class="flex-1 min-w-0">
                      <div>
                          <span class="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                          {poolInfos[res.poolName].category}
                          </span>
                        </div>
                        {res.investedETH * 1000 > 1 ?
                          <span class="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">
                            {res.investedETH.toFixed(2)} ETH 예치중
                          </span> :
                          res.investedETH > 0 ?
                          <span class="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">
                            0.001 ETH 이하 예치중
                          </span> :
                          <span class="bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-gray-300">
                            예치 없음
                          </span>
                        }
                          <p class="mt-2 text-sm font-medium text-gray-900 truncate dark:text-white">
                              {res.poolName}
                          </p>
                          <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                            
                          <div class="">
                          <div class="">
                            <div class="">
                            <div class="mt-2 flex items-center text-sm text-gray-500">
                            <svg class="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                              <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>

                                <TransScale data={Number(res.tvlKRW.toFixed(0))}/>
                              </div>

                            <div class="mt-2 flex items-center text-sm text-gray-500">
                                <svg class="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 14.25l6-6m4.5-3.493V21.75l-3.75-1.5-3.75 1.5-3.75-1.5-3.75 1.5V4.757c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0c1.1.128 1.907 1.077 1.907 2.185zM9.75 9h.008v.008H9.75V9zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm4.125 4.5h.008v.008h-.008V13.5zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"></path>
                                </svg>
                                연 수익율 : 현재 {Number(res.apr.toFixed(2)).toLocaleString()} %
                              </div>


                              <div class="mt-2 flex items-center text-sm text-gray-500">
                              <svg class="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M3 4.5h14.25M3 9h9.75M3 13.5h9.75m4.5-4.5v12m0 0l-3.75-3.75M17.25 21L21 17.25"></path>
                              </svg>
                              인출방법 : {poolInfos[res.poolName].wdMethod}
                              
                              </div>

                            </div>
                          </div>


                        </div>
                              
                              
                          </p>
                      </div>
                      <Link to={`/detail/${res.contractAddress}`}>
                        <a href="#" class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-500 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                          예치하기
                        </a>
                      </Link>
                  </div>
                </li>
                ))}

                </ul>
                </>
                :
                <></>
              }
              </div>
            </div>

            </SubTemplateBlockVertical>
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
  /* width: 1136px; */
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

  /* position: relative;
  margin: 10px auto; 
  width: calc(100% - (230px));
  width: -moz-calc(100% - (230px));
  width: -webkit-calc(100% - (230px));
  scroll-behavior: smooth;
  scroll-snap-type: y mandatory;
  height: 100vh;
  overflow: auto;
  padding: 30px; */
/* 
  @media screen and (max-width: 950px){
    width: calc(100%);
    width: -moz-calc(100%);
    width: -webkit-calc(100%);
    padding: 10px;
  } */
`



const SubTemplateBlockVertical = styled.div`
     /* width: 900px; */
     /* max-width: 500px; */
    margin: 10px auto;
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

