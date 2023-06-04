import hashed from 'assets/ci/hashed.png'
import 'App.css'; 
import {Link} from "react-router-dom"
import styled, { keyframes } from 'styled-components';
import react, {useState, useEffect} from "react";
import { useDispatch , useSelector } from 'react-redux';
import { Bar } from "react-chartjs-2";

import icons from "assets/protocols"
import { useParams } from "react-router-dom";
import { BsBoxArrowLeft } from "react-icons/bs";
import axios from 'axios';

import { WsV2 } from "chainrunner-sdk";
import BigNumber from "bignumber.js";

import poolInfos from "./poolInfos.json"
import testData from "./testData.json"
import testDataAfter from "./testDataAfter.json"
import singleData from "./singleDeposit.json"

import ethereum from '../../assets/ci/ethereum.png';
import Lido from "../../assets/tokens/blog.svg"
import fraxfinance from "../../assets/tokens/fraxfinance.png"
import curve from "../../assets/tokens/curve.png"
import Swal from 'sweetalert2'

import {metamaskDepositExecutor, metamaskWithdrawalExecutor, metamaskSwapExecutor, metamaskOusdtDepositExecutor,metamaskOusdtWithdrawalExecutor} from './metamaskExecutor.js';
import {kaikasKlayDepositExecutor, kaikasKlayWithdrawalExecutor} from './kaikasExecutor.js';


// import Rocketpool from "../../../assets/tokens/rocketpool.png"
// import swell from "../../../assets/tokens/swell.svg"
// import etherfi from "../../../assets/tokens/etherfi.svg"
// import ankr from "../../../assets/tokens/ankr.png"
// import stakewise from "../../../assets/tokens/stakewise.png"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  // Title,
  Tooltip,
  Legend,
} from 'chart.js';


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  // Title,
  Tooltip,
  Legend
);

ChartJS.defaults.font.family = "Inter";
ChartJS.defaults.scale.grid.drawOnChartArea = false;
ChartJS.defaults.scale.grid.drawBorder = false;
ChartJS.defaults.scale.ticks.color = "#abadc6";
ChartJS.defaults.datasets.bar.borderRadius = 4;
ChartJS.defaults.datasets.bar.maxBarThickness = 28;


function Manage() {

  const { id } = useParams();  
  const [showModal, setShowModal] = useState(false);
  const [isloading, setIsloading] = useState(false);
  const [isDropdown, setIsDropdown] = useState(true);
  const [selection, setSelection] = useState("deposit");
  const [sortstate, setSortstate] = useState(0);
  const sortStates = ["APR","Balance"]
  const [itemLoad, setItemLoad] = useState(false);

  const userAccount = useSelector(state => state.account) // 지갑주소
  const walletProvider = useSelector(state => state.walletProvider) // 프로바이더

  // nodeklay => "클레이 노드 스테이킹"
  const [investedAsset, setInvestedAsset] = useState({
      "id": "5f1eea81",
      "onEvent": false,
      "balanceETH": 12, 
      "dailyIncomeETH": 5, // 추가정보 
      "datailAPR": 4, // 추가됨
      "stepNumber": 2,
      "investStep": [
        {
          "protocol" : "frax finance",
          "action" : "deposit ETH",
          "result" : "get Base Token, frxETH",
          "balance" : 2
        },
        {
          "protocol" : "frax finance",
          "action" : "stake frxETH",
          "result" : "get reward bearing token, sfrxETH",
          "balance" : 2
        }
      ]
  })

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
        "id": "5f1eea81",
        "onEvent": false,
        "balanceETH": 12, 
        "dailyIncomeETH": 5, // 추가정보 
        "datailAPR": 4, // 추가됨
        "stepNumber": 2,
        "investStep": [
          {
            "protocol" : "frax finance",
            "action" : "deposit ETH",
            "result" : "get Base Token, frxETH",
            "balance" : 2
          },
          {
            "protocol" : "frax finance",
            "action" : "stake frxETH",
            "result" : "get reward bearing token, sfrxETH",
            "balance" : 2
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

      // const assetList = await axios.get(`https://wp22qg4khl.execute-api.ap-northeast-2.amazonaws.com/v1/service/investInfo?userAddr=${userAccount}`)
      // const assetList = {
      //   data : testData
      // }

      let itemLoad = localStorage.getItem("loadItem");


      let assetList = {}

      if(id === "aa650e6f"){

        assetList = {
          data : singleData
        }


      } else {

        if(itemLoad !== true){
    
          assetList = {
            data : testData
          }
    
        } else {
    
          assetList = {
            data : testDataAfter
          }
    
        }
      }

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
  
  function sortHandler(e) {
    setSortstate(sortStates.indexOf(e.target.innerText))
    setIsDropdown(true)

    if(sortStates.indexOf(e.target.innerText) === 0){
      investedAsset.klayProtocolCategory.sort(function(a,b){
        if(a.apr < b.apr) return 1;
        if(a.apr === b.apr) return 0;
        if(a.apr > b.apr) return -1;
      })    
    } else if(sortStates.indexOf(e.target.innerText) === 1){
      investedAsset.klayProtocolCategory.sort(function(a,b){
        if(a.investedKLAY < b.investedKLAY) return 1;
        if(a.investedKLAY === b.investedKLAY) return 0;
        if(a.investedKLAY > b.investedKLAY) return -1;
      })    
    } else if(sortStates.indexOf(e.target.innerText) === 2){
      investedAsset.klayProtocolCategory.sort(function(a,b){
        if(a.tvlKLAY < b.tvlKLAY) return 1;
        if(a.tvlKLAY === b.tvlKLAY) return 0;
        if(a.tvlKLAY > b.tvlKLAY) return -1;
      })    
    }

    setInvestedAsset({...investedAsset})
  }

  const selectionDeposit = () => {
    setSelection("deposit")
  }

  const selectionWithdrawler = () => {
    setSelection("withdraw")
  }


  const requestDeposit = async () => {

    // if(walletProvider === "metamask"){

    const chainId = await window.ethereum.request({ method: 'eth_chainId' })
    
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 5000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })

    setIsloading(true)

    let trxReturn = await metamaskDepositExecutor(userAccount, id, 140)  

    let assetList = {}

    assetList = {
      data : testDataAfter
    }

    setInvestedAsset(assetList.data)

    console.log("trxReturn",trxReturn)
  
    setIsloading(false)
    
     
    // setItemLoad(true)
    localStorage.setItem("loadItem", "loaded")

    // Toast.fire({
    //   icon: 'success',
    //   title: '예치가 성공적으로 실행되었습니다.',
    //   html: `<a href=https://scope.klaytn.com/tx/${trxReturn.transactionHash} target="_blank">상세내역보기</a>`
    // })

    // if(chainId === "0x2019"){
      
    //     const Toast = Swal.mixin({
    //       toast: true,
    //       position: 'top-end',
    //       showConfirmButton: false,
    //       timer: 5000,
    //       timerProgressBar: true,
    //       didOpen: (toast) => {
    //         toast.addEventListener('mouseenter', Swal.stopTimer)
    //         toast.addEventListener('mouseleave', Swal.resumeTimer)
    //       }
    //     })

    //     setIsloading(true)

    //     let trxReturn = {}

    //     trxReturn = await metamaskDepositExecutor(userAccount, id, 140)  
      
    //     setIsloading(false)

    //     Toast.fire({
    //       icon: 'success',
    //       title: '예치가 성공적으로 실행되었습니다.',
    //       html: `<a href=https://scope.klaytn.com/tx/${trxReturn.transactionHash} target="_blank">상세내역보기</a>`
    //     })

    //     await loadAsset()

    //   } else {
  
    //     await window.ethereum.request({
    //         method: 'wallet_switchEthereumChain',
    //         params: [{ chainId: '0x5' }], // chainId must be in hexadecimal numbers
    //     });
  
    //   }

  }

  const chartOptions = { plugins: { legend: { display: false } } };

  const chartData = {
    labels: ["4-2","4-16","5-2","5-16","6-2"],
    datasets: [
      {
        label: "",
        data: [4.9,5.1,6.9,6.5,5.3],
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
                    Staking Info
                  </Title>
                </ManageTitle>
              </Wrappertitle>
              <div style={{paddingTop:"20px"}}/>

                  <div class="block p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                    <h5 class="mb-2 text-1xl font-medium tracking-tight text-black dark:text-black">Invested</h5>
                    <h5 class="mb-2 text-2xl font-medium tracking-tight text-black dark:text-black">
                      {isloading ? 
                          <><ProductSkeleton width="20%" height="30px" /></>   
                          :
                          userAccount !== "" ?
                            <> {investedAsset.balanceETH.toFixed(2)} ETH  </>
                            :  
                            "Connect Wallet"
                      }
                      
                    </h5>
                    <h5 class="mb-2 text-1xl font-medium tracking-tight text-black dark:text-black">
                    {isloading ? 
                          <><ProductSkeleton width="50%" height="30px" /></>   
                          :
                          userAccount !== "" ?
                            <>
                            {/* Daily Income : {investedAsset.dailyIncomeETH.toFixed(4)} ETH  */}
                            {/* <br/> */}
                            {/* APR : {investedAsset.datailAPR.toFixed(2)} %   */}
                            </>
                            :  
                            ""
                    }

                    </h5>
                  </div>
                  <div style={{marginTop:"20px"}}></div>

                  {id === "aa650e6f" ?
                  <div className="border border-blue-200 rounded-lg p-5" style={{backgroundColor:"white"}}>
                  <h5 class="mb-3 text-1xl font-bold tracking-tight text-black dark:text-white">APR Performance Trend (%)</h5>
                  <Bar width={1000} height={438} data={chartData} options={chartOptions} />
                  <div style={{float:"right", fontWeight:"400", color:"gray"}}>powerd by The Graph</div>
                  <div style={{height:"20px", fontWeight:"400", color:"gray"}}></div>
                  
                  </div>
                  :
                  <></>
                  }
                  <div style={{marginTop:"20px"}}></div>
                  

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
                Deposit / Withdraw
              </Title>
                <div style={{position:"relative"}} >
                <Link to="/manage">
                  <button style={{width:"80px", height:"40px", display:"flex", alignItems:"center", justifyContent:"center"}} id="dropdownDefaultButton" data-dropdown-toggle="dropdown" class="text-blue-600 border border-blue-200 bg-white hover:bg-blue-400 font-medium rounded-lg text-sm px-2 py-1.5 text-center inline-flex items-center" type="button">
                    Return
                  </button>
                </Link>
                

                </div>
              </div>

              <div style={{marginTop:"20px"}}></div>

              {selection === "deposit" ? 

                <ul class="text-sm font-medium text-center text-gray-400 divide-x divide-blue-200 border border-blue-300 rounded-lg flex dark:divide-blue-700 dark:text-blue-400">
                    <li class="w-full">
                        <a onClick={selectionDeposit} href="#" class="inline-block w-full p-2 text-blue-600 bg-blue-100 rounded-l-lg focus:ring-1 focus:ring-blue-300 active focus:outline-none dark:bg-blue-700 dark:text-white">
                        deposit
                        </a>
                    </li>
                    <li class="w-full">
                        <a onClick={selectionWithdrawler} href="#" class="inline-block w-full p-2 bg-white rounded-r-lg hover:text-blue-700 hover:bg-blue-50 focus:ring-1 focus:outline-none focus:ring-blue-300 dark:hover:text-white dark:bg-blue-800 dark:hover:bg-blue-700">
                          withdraw
                        </a>
                    </li>
                  </ul>
                  :
                  <ul class="text-sm font-medium text-center text-gray-400 divide-x divide-blue-200 border border-blue-300 rounded-lg flex dark:divide-blue-700 dark:text-blue-400">
                  <li class="w-full">
                      <a onClick={selectionDeposit} href="#" class="inline-block w-full p-2 text-gray bg-white rounded-l-lg focus:ring-1 focus:ring-blue-300 active focus:outline-none dark:bg-blue-700 dark:text-white">
                      deposit
                      </a>
                  </li>
                  <li class="w-full">
                      <a onClick={selectionWithdrawler} href="#" class="inline-block w-full p-2 text-blue-600 bg-blue-100 rounded-r-lg hover:text-blue-700 hover:bg-blue-50 focus:ring-1 focus:outline-none focus:ring-blue-300 dark:hover:text-white dark:bg-blue-800 dark:hover:bg-blue-700">
                      withdraw
                      </a>
                  </li>
                  </ul>
                }

              <div style={{marginTop:"20px"}}></div>

              <ul role="list">

              {investedAsset.investStep.map((res)=>(
                <>
                <div className="border border-blue-200 rounded-lg" style={{backgroundColor:"white"}}>
                  <li>
                    <div class="flex items-center space-x-4">
                      <div class="flex-1">
                        <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                          <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>

                          <div style={{padding:"5px", margin:"10px"}}>
                            <ol class="mt-3 ml-5 relative border-gray-200 dark:border-gray-700">                  
                              <li class="mb-0 ml-6">            
                                <span class="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -left-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                                  <img src={icons[res.protocol]} alt=""/>
                                </span>
                                <h3 class="flex items-center mb-1 text-base font-semibold text-gray-900 dark:text-white">
                                  {res.action}
                                  <a href={`${res.linkURL}`} target='_blank'>
                                  <svg class="ml-3 w-4 h-4 dark:text-blue" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"></path>
                                  </svg>
                                  
                                  </a>
                                  
                                </h3>
                                <p class="pb-2 text-base font-normal text-gray-500 dark:text-gray-400">
                                  {res.result}
                                </p>
                              </li>
                            </ol>                          
                          </div>

                          <div style={{marginTop:"30px", marginBottom:"15px", marginRight:"20px"}}>
                            <div style={{display:"flex", flexDirection:"row"}}>   
                                <div style={{width:"200px"}}>
                                    <input type="text" id="voice-search" class="bg-white border border-blue-300 text-blue-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-300 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                      placeholder={`${res.balanceTokenname} Balance : ${res.balance} `} required 
                                    />
                                </div> 
                                <button  onClick={requestDeposit} type="submit" class="ml-5 py-2.5 px-3 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                <span style={{width:"10px"}}>deposit</span>
                              </button>
                            </div>
                          </div>

                          </div>
                        </p>
                      </div>
                    </div>
                  </li>
                </div>
                <div style={{marginTop:"20px"}}></div>
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




export default Manage;

