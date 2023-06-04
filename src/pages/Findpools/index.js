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
    },
    {
        "id": "f88c4cc0",
        "onEvent": false,
        "stepNumber": 2,
        "category": "Add Liquidity",
        "balanceETH": 0,
        "boostCRV": 0,
        "boostBAL": 0,
        "netAPR": 16.8,
        "investStep": [
            {
                "protocol": "Lido",
                "action": "Deposit ETH",
                "result": "Get reward bearing token, stETH"
            },
            {
                "protocol": "Curve",
                "action": "Add Liquidity in stETH/ETH pool",
                "result": "Get LP Token"
            }
        ]
    },
    {
        "id": "31a5a811",
        "onEvent": false,
        "stepNumber": 3,
        "category": "LP farming",
        "balanceETH": 0,
        "boostCRV": 1,
        "boostBAL": 0,
        "netAPR": 5.6,
        "investStep": [
            {
                "protocol": "Lido",
                "action": "Deposit ETH",
                "result": "Get reward bearing token, stETH"
            },
            {
                "protocol": "Curve",
                "action": "Add Liquidity in stETH/ETH pool",
                "result": "Get LP Token"
            },
            {
                "protocol": "Curve",
                "action": "Stake LP Token",
                "result": "Reward $CRV + LDO Token"
            }
        ]
    },
    {
        "id": "c1a033fb",
        "onEvent": false,
        "stepNumber": 2,
        "category": "Add Liquidity",
        "balanceETH": 0,
        "boostCRV": 0,
        "boostBAL": 0,
        "netAPR": 9.54,
        "investStep": [
            {
                "protocol": "Lido",
                "action": "Deposit ETH",
                "result": "Get reward bearing token, stETH"
            },
            {
                "protocol": "Curve",
                "action": "Add Liquidity in stETH/ETH pool",
                "result": "Get LP Token"
            }
        ]
    },
    {
        "id": "d29d3ba5",
        "onEvent": false,
        "stepNumber": 3,
        "category": "LP farming",
        "balanceETH": 0,
        "boostCRV": 1,
        "boostBAL": 0,
        "netAPR": 31.32,
        "investStep": [
            {
                "protocol": "Lido",
                "action": "Deposit ETH",
                "result": "Get reward bearing token, stETH"
            },
            {
                "protocol": "Curve",
                "action": "Add Liquidity in stETH/ETH pool",
                "result": "Get LP Token"
            },
            {
                "protocol": "Curve",
                "action": "Stake LP Token",
                "result": "Reward $CRV Token"
            }
        ]
    },
    {
        "id": "1c4b9230",
        "onEvent": false,
        "stepNumber": 3,
        "category": "LP farming",
        "balanceETH": 0,
        "boostCRV": 2.5,
        "boostBAL": 0,
        "netAPR": 10.78,
        "investStep": [
            {
                "protocol": "Lido",
                "action": "Deposit ETH",
                "result": "Get reward bearing token, stETH"
            },
            {
                "protocol": "Curve",
                "action": "Add Liquidity in stETH/ETH pool",
                "result": "Get LP Token"
            },
            {
                "protocol": "Convex",
                "action": "Stake LP Token",
                "result": "Reward $CRV + CVX Token"
            }
        ]
    },
    {
        "id": "87e7771f",
        "onEvent": false,
        "stepNumber": 2,
        "category": "Add Liquidity",
        "balanceETH": 0,
        "boostCRV": 0,
        "boostBAL": 0,
        "netAPR": 8.15,
        "investStep": [
            {
                "protocol": "Lido",
                "action": "Deposit ETH",
                "result": "Get reward bearing token, stETH"
            },
            {
                "protocol": "Curve",
                "action": "Add Liquidity in stETH/WETH pool",
                "result": "Get LP Token"
            }
        ]
    },
    {
        "id": "64fc2349",
        "onEvent": false,
        "stepNumber": 3,
        "category": "LP farming",
        "balanceETH": 0,
        "boostCRV": 1,
        "boostBAL": 0,
        "netAPR": 8.1508,
        "investStep": [
            {
                "protocol": "Lido",
                "action": "Deposit ETH",
                "result": "Get reward bearing token, stETH"
            },
            {
                "protocol": "Curve",
                "action": "Add Liquidity in stETH/WETH pool",
                "result": "Get LP Token"
            },
            {
                "protocol": "Curve",
                "action": "Stake LP Token",
                "result": "Reward $CRV Token"
            }
        ]
    },
    {
        "id": "e9931bc0",
        "onEvent": false,
        "stepNumber": 3,
        "category": "Add Liquidity",
        "balanceETH": 0,
        "boostCRV": 0,
        "boostBAL": 0,
        "netAPR": 4.837,
        "investStep": [
            {
                "protocol": "Lido",
                "action": "Deposit ETH",
                "result": "Get reward bearing token, stETH"
            },
            {
                "protocol": "Lido",
                "action": "Wrap stETH",
                "result": "Get wrapped stETH, wstETH"
            },
            {
                "protocol": "Curve",
                "action": "Add Liquidity in wstETH/rETH pool",
                "result": "Get LP Token"
            }
        ]
    },
    {
        "id": "63249966",
        "onEvent": false,
        "stepNumber": 4,
        "category": "LP farming",
        "balanceETH": 0,
        "boostCRV": 1,
        "boostBAL": 0,
        "netAPR": 4.967,
        "investStep": [
            {
                "protocol": "Lido",
                "action": "Deposit ETH",
                "result": "Get reward bearing token, stETH"
            },
            {
                "protocol": "Lido",
                "action": "Wrap stETH",
                "result": "Get wrapped stETH, wstETH"
            },
            {
                "protocol": "Curve",
                "action": "Add Liquidity in wstETH/rETH pool",
                "result": "Get LP Token"
            },
            {
                "protocol": "Curve",
                "action": "Stake LP Token",
                "result": "Reward $CRV Token"
            }
        ]
    },
    {
        "id": "0ce37685",
        "onEvent": false,
        "stepNumber": 4,
        "category": "LP farming",
        "balanceETH": 0,
        "boostCRV": 1.83,
        "boostBAL": 0,
        "netAPR": 5.09,
        "investStep": [
            {
                "protocol": "Lido",
                "action": "Deposit ETH",
                "result": "Get reward bearing token, stETH"
            },
            {
                "protocol": "Lido",
                "action": "Wrap stETH",
                "result": "Get wrapped stETH, wstETH"
            },
            {
                "protocol": "Curve",
                "action": "Add Liquidity in wstETH/rETH pool",
                "result": "Get LP Token"
            },
            {
                "protocol": "Convex",
                "action": "Stake LP Token",
                "result": "Reward $CRV + CVX Token"
            }
        ]
    },
    {
        "id": "1254ff43",
        "onEvent": false,
        "stepNumber": 2,
        "category": "Add Liquidity",
        "balanceETH": 0,
        "boostCRV": 0,
        "boostBAL": 0,
        "netAPR": 7.155,
        "investStep": [
            {
                "protocol": "Lido",
                "action": "Deposit ETH",
                "result": "Get reward bearing token, stETH"
            },
            {
                "protocol": "Curve",
                "action": "Add Liquidity in stETH/frxETH pool",
                "result": "Get LP Token"
            }
        ]
    },
    {
        "id": "90979163",
        "onEvent": false,
        "stepNumber": 3,
        "category": "LP farming",
        "balanceETH": 0,
        "boostCRV": 1,
        "boostBAL": 0,
        "netAPR": 9.105,
        "investStep": [
            {
                "protocol": "Lido",
                "action": "Deposit ETH",
                "result": "Get reward bearing token, stETH"
            },
            {
                "protocol": "Curve",
                "action": "Add Liquidity in stETH/frxETH pool",
                "result": "Get LP Token"
            },
            {
                "protocol": "Curve",
                "action": "Stake LP Token",
                "result": "Reward $CRV Token"
            }
        ]
    },
    {
        "id": "f4f86fe3",
        "onEvent": false,
        "stepNumber": 3,
        "category": "LP farming",
        "balanceETH": 0,
        "boostCRV": 1.78,
        "boostBAL": 0,
        "netAPR": 10.755,
        "investStep": [
            {
                "protocol": "Lido",
                "action": "Deposit ETH",
                "result": "Get reward bearing token, stETH"
            },
            {
                "protocol": "Curve",
                "action": "Add Liquidity in stETH/frxETH pool",
                "result": "Get LP Token"
            },
            {
                "protocol": "Convex",
                "action": "Stake LP Token",
                "result": "Reward $CRV + CVX Token"
            }
        ]
    },
    {
        "id": "c212ae68",
        "onEvent": false,
        "stepNumber": 2,
        "category": "LP farming",
        "balanceETH": 0,
        "boostCRV": 1,
        "boostBAL": 0,
        "netAPR": 16.28,
        "investStep": [
            {
                "protocol": "Lido",
                "action": "Deposit ETH",
                "result": "Get reward bearing token, stETH"
            },
            {
                "protocol": "Curve",
                "action": "Add Liquidity & Stkae LP in stETH/ETH pool",
                "result": "Reward $CRV Token"
            }
        ]
    },
    {
        "id": "0c63ac44",
        "onEvent": false,
        "stepNumber": 1,
        "category": "Liquidity Staking",
        "balanceETH": 0,
        "boostCRV": 0,
        "boostBAL": 0,
        "netAPR": 3.94,
        "investStep": [
            {
                "protocol": "Rocketpool",
                "action": "Deposit ETH",
                "result": "Get reward bearing token, rETH"
            }
        ]
    },
    {
        "id": "20a029c1",
        "onEvent": false,
        "stepNumber": 2,
        "category": "Add Liquidity",
        "balanceETH": 0,
        "boostCRV": 0,
        "boostBAL": 0,
        "netAPR": 3.978,
        "investStep": [
            {
                "protocol": "Rocketpool",
                "action": "Deposit ETH",
                "result": "Get reward bearing token, rETH"
            },
            {
                "protocol": "Curve",
                "action": "Add Liquidity in rETH/ETH pool",
                "result": "Get LP Token"
            }
        ]
    },
    {
        "id": "72091811",
        "onEvent": false,
        "stepNumber": 3,
        "category": "LP farming",
        "balanceETH": 0,
        "boostCRV": 1,
        "boostBAL": 0,
        "netAPR": 6.458,
        "investStep": [
            {
                "protocol": "Rocketpool",
                "action": "Deposit ETH",
                "result": "Get reward bearing token, rETH"
            },
            {
                "protocol": "Curve",
                "action": "Add Liquidity in rETH/ETH pool",
                "result": "Get LP Token"
            },
            {
                "protocol": "Curve",
                "action": "Stake LP Token",
                "result": "Reward $CRV Token"
            }
        ]
    },
    {
        "id": "7644c9c4",
        "onEvent": false,
        "stepNumber": 3,
        "category": "LP farming",
        "balanceETH": 0,
        "boostCRV": 1.83,
        "boostBAL": 0,
        "netAPR": 6.22,
        "investStep": [
            {
                "protocol": "Rocketpool",
                "action": "Deposit ETH",
                "result": "Get reward bearing token, rETH"
            },
            {
                "protocol": "Curve",
                "action": "Add Liquidity in rETH/ETH pool",
                "result": "Get LP Token"
            },
            {
                "protocol": "Convex",
                "action": "Stake LP Token",
                "result": "Reward $CRV + CVX Token"
            }
        ]
    },
    {
        "id": "20a029c1",
        "onEvent": false,
        "stepNumber": 2,
        "category": "Add Liquidity",
        "balanceETH": 0,
        "boostCRV": 0,
        "boostBAL": 0,
        "netAPR": 3.974,
        "investStep": [
            {
                "protocol": "Rocketpool",
                "action": "Deposit ETH",
                "result": "Get reward bearing token, rETH"
            },
            {
                "protocol": "Curve",
                "action": "Add Liquidity in rETH/frxETH pool",
                "result": "Get LP Token"
            }
        ]
    },
    {
        "id": "42fb97d9",
        "onEvent": false,
        "stepNumber": 3,
        "category": "LP farming",
        "balanceETH": 0,
        "boostCRV": 1,
        "boostBAL": 0,
        "netAPR": 8.064,
        "investStep": [
            {
                "protocol": "Rocketpool",
                "action": "Deposit ETH",
                "result": "Get reward bearing token, rETH"
            },
            {
                "protocol": "Curve",
                "action": "Add Liquidity in rETH/frxETH pool",
                "result": "Get LP Token"
            },
            {
                "protocol": "Curve",
                "action": "Stake LP Token",
                "result": "Reward $CRV Token"
            }
        ]
    },
    {
        "id": "49a6997d",
        "onEvent": false,
        "stepNumber": 3,
        "category": "LP farming",
        "balanceETH": 0,
        "boostCRV": 1.78,
        "boostBAL": 0,
        "netAPR": 10.1,
        "investStep": [
            {
                "protocol": "Rocketpool",
                "action": "Deposit ETH",
                "result": "Get reward bearing token, rETH"
            },
            {
                "protocol": "Curve",
                "action": "Add Liquidity in rETH/frxETH pool",
                "result": "Get LP Token"
            },
            {
                "protocol": "Convex",
                "action": "Stake LP Token",
                "result": "Reward $CRV + CVX Token"
            }
        ]
    },
    {
        "id": "cab3b335",
        "onEvent": false,
        "stepNumber": 2,
        "category": "Add Liquidity",
        "balanceETH": 0,
        "boostCRV": 0,
        "boostBAL": 0,
        "netAPR": 3.977,
        "investStep": [
            {
                "protocol": "Rocketpool",
                "action": "Deposit ETH",
                "result": "Get reward bearing token, rETH"
            },
            {
                "protocol": "Curve",
                "action": "Add Liquidity in rETH/wstETH pool",
                "result": "Get LP Token"
            }
        ]
    },
    {
        "id": "c0112fa7",
        "onEvent": false,
        "stepNumber": 3,
        "category": "LP farming",
        "balanceETH": 0,
        "boostCRV": 1,
        "boostBAL": 0,
        "netAPR": 4.107,
        "investStep": [
            {
                "protocol": "Rocketpool",
                "action": "Deposit ETH",
                "result": "Get reward bearing token, rETH"
            },
            {
                "protocol": "Curve",
                "action": "Add Liquidity in rETH/wstETH pool",
                "result": "Get LP Token"
            },
            {
                "protocol": "Curve",
                "action": "Stake LP Token",
                "result": "Reward $CRV Token"
            }
        ]
    },
    {
        "id": "a5cce61e",
        "onEvent": false,
        "stepNumber": 3,
        "category": "LP farming",
        "balanceETH": 0,
        "boostCRV": 1.83,
        "boostBAL": 0,
        "netAPR": 4.23,
        "investStep": [
            {
                "protocol": "Rocketpool",
                "action": "Deposit ETH",
                "result": "Get reward bearing token, rETH"
            },
            {
                "protocol": "Curve",
                "action": "Add Liquidity in rETH/wstETH pool",
                "result": "Get LP Token"
            },
            {
                "protocol": "Convex",
                "action": "Stake LP Token",
                "result": "Reward $CRV + CVX Token"
            }
        ]
    },
    {
        "id": "161de66c",
        "onEvent": false,
        "stepNumber": 1,
        "category": "Liquidity Staking",
        "balanceETH": 0,
        "boostCRV": 0,
        "boostBAL": 0,
        "netAPR": 5,
        "investStep": [
            {
                "protocol": "Swell",
                "action": "Deposit ETH",
                "result": "Get reward bearing token, swETH"
            }
        ]
    },
    {
        "id": "ee00ca39",
        "onEvent": false,
        "stepNumber": 2,
        "category": "Liquidity Staking",
        "balanceETH": 0,
        "boostCRV": 0,
        "boostBAL": 0,
        "netAPR": 4.77,
        "investStep": [
            {
                "protocol": "Frax",
                "action": "Deposit ETH",
                "result": "Get base token, frxETH"
            },
            {
                "protocol": "Frax",
                "action": "Deposit frxETH",
                "result": "Get reward bearing token, sfrxETH"
            }
        ]
    },
    {
        "id": "364ed833",
        "onEvent": false,
        "stepNumber": 2,
        "category": "Add Liquidity",
        "balanceETH": 0,
        "boostCRV": 0,
        "boostBAL": 0,
        "netAPR": 4.87,
        "investStep": [
            {
                "protocol": "Frax",
                "action": "Deposit ETH",
                "result": "Get base token, frxETH"
            },
            {
                "protocol": "Curve",
                "action": "Add Liquidity in frxETH/ETH pool",
                "result": "Get LP Token"
            }
        ]
    },
    {
        "id": "4bc017b6",
        "onEvent": false,
        "stepNumber": 3,
        "category": "LP farming",
        "balanceETH": 0,
        "boostCRV": 1,
        "boostBAL": 0,
        "netAPR": 7.46,
        "investStep": [
            {
                "protocol": "Frax",
                "action": "Deposit ETH",
                "result": "Get base token, frxETH"
            },
            {
                "protocol": "Curve",
                "action": "Add Liquidity in frxETH/ETH pool",
                "result": "Get LP Token"
            },
            {
                "protocol": "Curve",
                "action": "Stake LP Token",
                "result": "Reward $CRV Token"
            }
        ]
    },
    {
        "id": "b1a1b505",
        "onEvent": false,
        "stepNumber": 3,
        "category": "LP farming",
        "balanceETH": 0,
        "boostCRV": 1.79,
        "boostBAL": 0,
        "netAPR": 8.28,
        "investStep": [
            {
                "protocol": "Frax",
                "action": "Deposit ETH",
                "result": "Get base token, frxETH"
            },
            {
                "protocol": "Curve",
                "action": "Add Liquidity in frxETH/ETH pool",
                "result": "Get LP Token"
            },
            {
                "protocol": "Convex",
                "action": "Stake LP Token",
                "result": "Reward $CRV + CVX Token"
            }
        ]
    },
    {
        "id": "9791b791",
        "onEvent": false,
        "stepNumber": 2,
        "category": "Add Liquidity",
        "balanceETH": 0,
        "boostCRV": 0,
        "boostBAL": 0,
        "netAPR": 4.77,
        "investStep": [
            {
                "protocol": "Frax",
                "action": "Deposit ETH",
                "result": "Get base token, frxETH"
            },
            {
                "protocol": "Curve",
                "action": "Add Liquidity in frxETH/cbETH pool",
                "result": "Get LP Token"
            }
        ]
    },
    {
        "id": "9dd9590c",
        "onEvent": false,
        "stepNumber": 3,
        "category": "LP farming",
        "balanceETH": 0,
        "boostCRV": 1,
        "boostBAL": 0,
        "netAPR": 9.49,
        "investStep": [
            {
                "protocol": "Frax",
                "action": "Deposit ETH",
                "result": "Get base token, frxETH"
            },
            {
                "protocol": "Curve",
                "action": "Add Liquidity in frxETH/cbETH pool",
                "result": "Get LP Token"
            },
            {
                "protocol": "Curve",
                "action": "Stake LP Token",
                "result": "Reward $CRV Token"
            }
        ]
    },
    {
        "id": "38c106f4",
        "onEvent": false,
        "stepNumber": 3,
        "category": "LP farming",
        "balanceETH": 0,
        "boostCRV": 1.78,
        "boostBAL": 0,
        "netAPR": 13.53,
        "investStep": [
            {
                "protocol": "Frax",
                "action": "Deposit ETH",
                "result": "Get base token, frxETH"
            },
            {
                "protocol": "Curve",
                "action": "Add Liquidity in frxETH/ETH pool",
                "result": "Get LP Token"
            },
            {
                "protocol": "Convex",
                "action": "Stake LP Token",
                "result": "Reward $CRV + CVX Token"
            }
        ]
    },
    {
        "id": "2057a452",
        "onEvent": false,
        "stepNumber": 2,
        "category": "Add Liquidity",
        "balanceETH": 0,
        "boostCRV": 0,
        "boostBAL": 0,
        "netAPR": 7.025,
        "investStep": [
            {
                "protocol": "Frax",
                "action": "Deposit ETH",
                "result": "Get base token, frxETH"
            },
            {
                "protocol": "Curve",
                "action": "Add Liquidity in frxETH/stETH pool",
                "result": "Get LP Token"
            }
        ]
    },
    {
        "id": "d6d689ad",
        "onEvent": false,
        "stepNumber": 3,
        "category": "LP farming",
        "balanceETH": 0,
        "boostCRV": 1,
        "boostBAL": 0,
        "netAPR": 8.975,
        "investStep": [
            {
                "protocol": "Frax",
                "action": "Deposit ETH",
                "result": "Get base token, frxETH"
            },
            {
                "protocol": "Curve",
                "action": "Add Liquidity in frxETH/stETH pool",
                "result": "Get LP Token"
            },
            {
                "protocol": "Curve",
                "action": "Stake LP Token",
                "result": "Reward $CRV Token"
            }
        ]
    },
    {
        "id": "05b9afa1",
        "onEvent": false,
        "stepNumber": 3,
        "category": "LP farming",
        "balanceETH": 0,
        "boostCRV": 1.77,
        "boostBAL": 0,
        "netAPR": 10.665,
        "investStep": [
            {
                "protocol": "Frax",
                "action": "Deposit ETH",
                "result": "Get base token, frxETH"
            },
            {
                "protocol": "Curve",
                "action": "Add Liquidity in frxETH/ETH pool",
                "result": "Get LP Token"
            },
            {
                "protocol": "Convex",
                "action": "Stake LP Token",
                "result": "Reward $CRV + CVX Token"
            }
        ]
    },
    {
        "id": "ffd80e8b",
        "onEvent": false,
        "stepNumber": 2,
        "category": "Add Liquidity",
        "balanceETH": 0,
        "boostCRV": 0,
        "boostBAL": 0,
        "netAPR": 4.77,
        "investStep": [
            {
                "protocol": "Frax",
                "action": "Deposit ETH",
                "result": "Get base token, frxETH"
            },
            {
                "protocol": "Curve",
                "action": "Add Liquidity in frxETH/rETH pool",
                "result": "Get LP Token"
            }
        ]
    },
    {
        "id": "7fffb184",
        "onEvent": false,
        "stepNumber": 3,
        "category": "LP farming",
        "balanceETH": 0,
        "boostCRV": 1,
        "boostBAL": 0,
        "netAPR": 8.86,
        "investStep": [
            {
                "protocol": "Frax",
                "action": "Deposit ETH",
                "result": "Get base token, frxETH"
            },
            {
                "protocol": "Curve",
                "action": "Add Liquidity in frxETH/rETH pool",
                "result": "Get LP Token"
            },
            {
                "protocol": "Curve",
                "action": "Stake LP Token",
                "result": "Reward $CRV Token"
            }
        ]
    },
    {
        "id": "1e8e4d98",
        "onEvent": false,
        "stepNumber": 3,
        "category": "LP farming",
        "balanceETH": 0,
        "boostCRV": 1.78,
        "boostBAL": 0,
        "netAPR": 11,
        "investStep": [
            {
                "protocol": "Frax",
                "action": "Deposit ETH",
                "result": "Get base token, frxETH"
            },
            {
                "protocol": "Curve",
                "action": "Add Liquidity in frxETH/rETH pool",
                "result": "Get LP Token"
            },
            {
                "protocol": "Convex",
                "action": "Stake LP Token",
                "result": "Reward $CRV + CVX Token"
            }
        ]
    },
    {
        "id": "bca4b21a",
        "onEvent": false,
        "stepNumber": 2,
        "category": "Add Liquidity",
        "balanceETH": 0,
        "boostCRV": 0,
        "boostBAL": 0,
        "netAPR": 4.77,
        "investStep": [
            {
                "protocol": "Frax",
                "action": "Deposit ETH",
                "result": "Get base token, frxETH"
            },
            {
                "protocol": "Curve",
                "action": "Add Liquidity in frxETH/ankrETH pool",
                "result": "Get LP Token"
            }
        ]
    },
    {
        "id": "382b74b2",
        "onEvent": false,
        "stepNumber": 3,
        "category": "LP farming",
        "balanceETH": 0,
        "boostCRV": 1,
        "boostBAL": 0,
        "netAPR": 8.86,
        "investStep": [
            {
                "protocol": "Frax",
                "action": "Deposit ETH",
                "result": "Get base token, frxETH"
            },
            {
                "protocol": "Curve",
                "action": "Add Liquidity in frxETH/ankrETH pool",
                "result": "Get LP Token"
            },
            {
                "protocol": "Curve",
                "action": "Stake LP Token",
                "result": "Reward $CRV Token"
            }
        ]
    },
    {
        "id": "c6c90cca",
        "onEvent": false,
        "stepNumber": 3,
        "category": "LP farming",
        "balanceETH": 0,
        "boostCRV": 1.77,
        "boostBAL": 0,
        "netAPR": 17.4,
        "investStep": [
            {
                "protocol": "Frax",
                "action": "Deposit ETH",
                "result": "Get base token, frxETH"
            },
            {
                "protocol": "Curve",
                "action": "Add Liquidity in frxETH/ankrETH pool",
                "result": "Get LP Token"
            },
            {
                "protocol": "Convex",
                "action": "Stake LP Token",
                "result": "Reward $CRV + CVX Token"
            }
        ]
    },
    {
        "id": "50cad064",
        "onEvent": false,
        "stepNumber": 2,
        "category": "Liquidity Staking",
        "balanceETH": 0,
        "boostCRV": 0,
        "boostBAL": 0,
        "netAPR": 4.53,
        "investStep": [
            {
                "protocol": "Binance",
                "action": "Deposit ETH",
                "result": "Get base token, BETH"
            },
            {
                "protocol": "Binance",
                "action": "Wrap BETH",
                "result": "Get wrapped BETH reward bearing token, wBETH"
            }
        ]
    },
    {
        "id": "1dcdba02",
        "onEvent": false,
        "stepNumber": 3,
        "category": "Add Liquidity",
        "balanceETH": 0,
        "boostCRV": 0,
        "boostBAL": 0,
        "netAPR": 9.6,
        "investStep": [
            {
                "protocol": "Binance",
                "action": "Deposit ETH",
                "result": "Get reward bearing token, BETH"
            },
            {
                "protocol": "Binance",
                "action": "Wrap BETH",
                "result": "Get wrapped BETH reward bearing token, wBETH"
            },
            {
                "protocol": "Curve",
                "action": "Add Liquidity in wBETH/ETH pool",
                "result": "Get LP Token"
            }
        ]
    },
    {
        "id": "aed9c0c1",
        "onEvent": false,
        "stepNumber": 4,
        "category": "LP farming",
        "balanceETH": 0,
        "boostCRV": 1,
        "boostBAL": 0,
        "netAPR": 13.87,
        "investStep": [
            {
                "protocol": "Binance",
                "action": "Deposit ETH",
                "result": "Get reward bearing token, BETH"
            },
            {
                "protocol": "Binance",
                "action": "Wrap BETH",
                "result": "Get wrapped BETH reward bearing token, wBETH"
            },
            {
                "protocol": "Curve",
                "action": "Add Liquidity in wBETH/ETH pool",
                "result": "Get LP Token"
            },
            {
                "protocol": "Curve",
                "action": "Stake LP Token",
                "result": "Reward $CRV Token"
            }
        ]
    },
    {
        "id": "d2dd9676",
        "onEvent": false,
        "stepNumber": 4,
        "category": "LP farming",
        "balanceETH": 0,
        "boostCRV": 1.78,
        "boostBAL": 0,
        "netAPR": 17.4,
        "investStep": [
            {
                "protocol": "Binance",
                "action": "Deposit ETH",
                "result": "Get reward bearing token, BETH"
            },
            {
                "protocol": "Binance",
                "action": "Wrap BETH",
                "result": "Get wrapped BETH reward bearing token, wBETH"
            },
            {
                "protocol": "Curve",
                "action": "Add Liquidity in wBETH/ETH pool",
                "result": "Get LP Token"
            },
            {
                "protocol": "Convex",
                "action": "Stake LP Token",
                "result": "Reward $CRV + CVX Token"
            }
        ]
    },
    {
        "id": "7ce27f61",
        "onEvent": false,
        "stepNumber": 1,
        "category": "Liquidity Staking",
        "balanceETH": 0,
        "boostCRV": 0,
        "boostBAL": 0,
        "netAPR": 5.84,
        "investStep": [
            {
                "protocol": "Coinbase",
                "action": "Deposit ETH",
                "result": "Get reward bearing token, cbETH"
            }
        ]
    },
    {
        "id": "c729093d",
        "onEvent": false,
        "stepNumber": 2,
        "category": "Add Liquidity",
        "balanceETH": 0,
        "boostCRV": 0,
        "boostBAL": 0,
        "netAPR": 5.84,
        "investStep": [
            {
                "protocol": "Coinbase",
                "action": "Deposit ETH",
                "result": "Get reward bearing token, cbETH"
            },
            {
                "protocol": "Curve",
                "action": "Add Liquidity in cbETH/ETH pool",
                "result": "Get LP Token"
            }
        ]
    },
    {
        "id": "ca3aa036",
        "onEvent": false,
        "stepNumber": 3,
        "category": "LP farming",
        "balanceETH": 0,
        "boostCRV": 1,
        "boostBAL": 0,
        "netAPR": 9.31,
        "investStep": [
            {
                "protocol": "Coinbase",
                "action": "Deposit ETH",
                "result": "Get reward bearing token, cbETH"
            },
            {
                "protocol": "Curve",
                "action": "Add Liquidity in cbETH/ETH pool",
                "result": "Get LP Token"
            },
            {
                "protocol": "Curve",
                "action": "Stake LP Token",
                "result": "Reward $CRV Token"
            }
        ]
    },
    {
        "id": "e418eeb0",
        "onEvent": false,
        "stepNumber": 3,
        "category": "LP farming",
        "balanceETH": 0,
        "boostCRV": 1.79,
        "boostBAL": 0,
        "netAPR": 9.31,
        "investStep": [
            {
                "protocol": "Coinbase",
                "action": "Deposit ETH",
                "result": "Get reward bearing token, cbETH"
            },
            {
                "protocol": "Curve",
                "action": "Add Liquidity in cbETH/ETH pool",
                "result": "Get LP Token"
            },
            {
                "protocol": "Convex",
                "action": "Stake LP Token",
                "result": "Reward $CRV + CVX Token"
            }
        ]
    },
    {
        "id": "f10969f8",
        "onEvent": false,
        "stepNumber": 2,
        "category": "Add Liquidity",
        "balanceETH": 0,
        "boostCRV": 0,
        "boostBAL": 0,
        "netAPR": 5.84,
        "investStep": [
            {
                "protocol": "Coinbase",
                "action": "Deposit ETH",
                "result": "Get reward bearing token, cbETH"
            },
            {
                "protocol": "Curve",
                "action": "Add Liquidity in cbETH/frxETH pool",
                "result": "Get LP Token"
            }
        ]
    },
    {
        "id": "a0226051",
        "onEvent": false,
        "stepNumber": 3,
        "category": "LP farming",
        "balanceETH": 0,
        "boostCRV": 1,
        "boostBAL": 0,
        "netAPR": 10.56,
        "investStep": [
            {
                "protocol": "Coinbase",
                "action": "Deposit ETH",
                "result": "Get reward bearing token, cbETH"
            },
            {
                "protocol": "Curve",
                "action": "Add Liquidity in cbETH/frxETH pool",
                "result": "Get LP Token"
            },
            {
                "protocol": "Curve",
                "action": "Stake LP Token",
                "result": "Reward $CRV Token"
            }
        ]
    },
    {
        "id": "25470252",
        "onEvent": false,
        "stepNumber": 3,
        "category": "LP farming",
        "balanceETH": 0,
        "boostCRV": 1.78,
        "boostBAL": 0,
        "netAPR": 14.64,
        "investStep": [
            {
                "protocol": "Coinbase",
                "action": "Deposit ETH",
                "result": "Get reward bearing token, cbETH"
            },
            {
                "protocol": "Curve",
                "action": "Add Liquidity in cbETH/frxETH pool",
                "result": "Get LP Token"
            },
            {
                "protocol": "Convex",
                "action": "Stake LP Token",
                "result": "Reward $CRV + CVX Token"
            }
        ]
    },
    {
        "id": "c1f8e048",
        "onEvent": false,
        "stepNumber": 1,
        "category": "Liquidity Staking",
        "balanceETH": 0,
        "boostCRV": 0,
        "boostBAL": 0,
        "netAPR": 5.13,
        "investStep": [
            {
                "protocol": "Ankr",
                "action": "Deposit ETH",
                "result": "Get reward bearing token, ankrETH"
            }
        ]
    },
    {
        "id": "c692c03e",
        "onEvent": false,
        "stepNumber": 2,
        "category": "Add Liquidity",
        "balanceETH": 0,
        "boostCRV": 0,
        "boostBAL": 0,
        "netAPR": 7.42,
        "investStep": [
            {
                "protocol": "Ankr",
                "action": "Deposit ETH",
                "result": "Get reward bearing token, ankrETH"
            },
            {
                "protocol": "Curve",
                "action": "Add Liquidity in ankrETH/ETH pool",
                "result": "Get LP Token"
            }
        ]
    },
    {
        "id": "334b528c",
        "onEvent": false,
        "stepNumber": 3,
        "category": "LP farming",
        "balanceETH": 0,
        "boostCRV": 1,
        "boostBAL": 0,
        "netAPR": 7.75,
        "investStep": [
            {
                "protocol": "Ankr",
                "action": "Deposit ETH",
                "result": "Get reward bearing token, ankrETH"
            },
            {
                "protocol": "Curve",
                "action": "Add Liquidity in ankrETH/ETH pool",
                "result": "Get LP Token"
            },
            {
                "protocol": "Curve",
                "action": "Stake LP Token",
                "result": "Reward $CRV Token"
            }
        ]
    },
    {
        "id": "d4179d31",
        "onEvent": false,
        "stepNumber": 3,
        "category": "LP farming",
        "balanceETH": 0,
        "boostCRV": 1.76,
        "boostBAL": 0,
        "netAPR": 8.05,
        "investStep": [
            {
                "protocol": "Ankr",
                "action": "Deposit ETH",
                "result": "Get reward bearing token, ankrETH"
            },
            {
                "protocol": "Curve",
                "action": "Add Liquidity in ankrETH/ETH pool",
                "result": "Get LP Token"
            },
            {
                "protocol": "Convex",
                "action": "Stake LP Token",
                "result": "Reward $CRV + CVX Token"
            }
        ]
    },
    {
        "id": "389fed8b",
        "onEvent": false,
        "stepNumber": 2,
        "category": "Add Liquidity",
        "balanceETH": 0,
        "boostCRV": 0,
        "boostBAL": 0,
        "netAPR": 5.13,
        "investStep": [
            {
                "protocol": "Ankr",
                "action": "Deposit ETH",
                "result": "Get reward bearing token, ankrETH"
            },
            {
                "protocol": "Curve",
                "action": "Add Liquidity in ankrETH/frxETH pool",
                "result": "Get LP Token"
            }
        ]
    },
    {
        "id": "5b44d5b7",
        "onEvent": false,
        "stepNumber": 3,
        "category": "LP farming",
        "balanceETH": 0,
        "boostCRV": 1,
        "boostBAL": 0,
        "netAPR": 11.56,
        "investStep": [
            {
                "protocol": "Ankr",
                "action": "Deposit ETH",
                "result": "Get reward bearing token, ankrETH"
            },
            {
                "protocol": "Curve",
                "action": "Add Liquidity in ankrETH/frxETH pool",
                "result": "Get LP Token"
            },
            {
                "protocol": "Curve",
                "action": "Stake LP Token",
                "result": "Reward $CRV Token"
            }
        ]
    },
    {
        "id": "abf33460",
        "onEvent": false,
        "stepNumber": 3,
        "category": "LP farming",
        "balanceETH": 0,
        "boostCRV": 1.77,
        "boostBAL": 0,
        "netAPR": 17.81,
        "investStep": [
            {
                "protocol": "Ankr",
                "action": "Deposit ETH",
                "result": "Get reward bearing token, ankrETH"
            },
            {
                "protocol": "Curve",
                "action": "Add Liquidity in ankrETH/frxETH pool",
                "result": "Get LP Token"
            },
            {
                "protocol": "Convex",
                "action": "Stake LP Token",
                "result": "Reward $CRV + CVX Token"
            }
        ]
    },
    {
        "id": "54f35273",
        "onEvent": false,
        "stepNumber": 1,
        "category": "Liquidity staking",
        "balanceETH": 0,
        "boostCRV": 0,
        "boostBAL": 0,
        "netAPR": 3.94,
        "investStep": [
            {
                "protocol": "RocketPool",
                "action": "Deposit ETH",
                "result": "Get reward bearing token, rETH"
            }
        ]
    },
    {
        "id": "e8ebe2de",
        "onEvent": false,
        "stepNumber": 2,
        "category": "Add Liquidity",
        "balanceETH": 0,
        "boostCRV": 0,
        "boostBAL": 0,
        "netAPR": 3.03,
        "investStep": [
            {
                "protocol": "Rocketpool",
                "action": "Deposit ETH",
                "result": "Get reward bearing token, rETH"
            },
            {
                "protocol": "Balancer",
                "action": "Add Liquidity in rETH/WETH pool",
                "result": "Get LP Token BPT / Reward BAL Token"
            }
        ]
    },
    {
        "id": "1b6029f0",
        "onEvent": false,
        "stepNumber": 3,
        "category": "LP farming",
        "balanceETH": 0,
        "boostCRV": 0,
        "boostBAL": 1,
        "netAPR": 4.44,
        "investStep": [
            {
                "protocol": "Rocketpool",
                "action": "Deposit ETH",
                "result": "Get reward bearing token, rETH"
            },
            {
                "protocol": "Balancer",
                "action": "Add Liquidity in rETH/WETH pool",
                "result": "Get LP Token BPT / Reward BAL Token"
            },
            {
                "protocol": "Balancer",
                "action": "Stake LP Token BPT",
                "result": "Reward BAL Token"
            }
        ]
    },
    {
        "id": "a9159807",
        "onEvent": false,
        "stepNumber": 3,
        "category": "LP farming",
        "balanceETH": 0,
        "boostCRV": 0,
        "boostBAL": 1.51,
        "netAPR": 7.72,
        "investStep": [
            {
                "protocol": "Rocketpool",
                "action": "Deposit ETH",
                "result": "Get reward bearing token, rETH"
            },
            {
                "protocol": "Balancer",
                "action": "Add Liquidity in rETH/WETH pool",
                "result": "Get LP Token BPT / Reward BAL Token"
            },
            {
                "protocol": "Aura",
                "action": "Stake LP Token BPT",
                "result": "Reward BAL + AURA Token"
            }
        ]
    },
    {
        "id": "512605a9",
        "onEvent": false,
        "stepNumber": 2,
        "category": "Add Liquidity",
        "balanceETH": 0,
        "boostCRV": 0,
        "boostBAL": 0,
        "netAPR": 3.98,
        "investStep": [
            {
                "protocol": "Rocketpool",
                "action": "Deposit ETH",
                "result": "Get reward bearing token, rETH"
            },
            {
                "protocol": "Balancer",
                "action": "Add Liquidity in rETH/wstETH/sfrxETH pool",
                "result": "Get LP Token BPT / Reward BAL Token"
            }
        ]
    },
    {
        "id": "9c691fb0",
        "onEvent": false,
        "stepNumber": 3,
        "category": "LP farming",
        "balanceETH": 0,
        "boostCRV": 0,
        "boostBAL": 1,
        "netAPR": 5.48,
        "investStep": [
            {
                "protocol": "Rocketpool",
                "action": "Deposit ETH",
                "result": "Get reward bearing token, rETH"
            },
            {
                "protocol": "Balancer",
                "action": "Add Liquidity in rETH/wstETH/sfrxETH pool",
                "result": "Get LP Token BPT / Reward BAL Token"
            },
            {
                "protocol": "Balancer",
                "action": "Stake LP Token BPT",
                "result": "Reward BAL Token"
            }
        ]
    },
    {
        "id": "c52a9463",
        "onEvent": false,
        "stepNumber": 3,
        "category": "LP farming",
        "balanceETH": 0,
        "boostCRV": 0,
        "boostBAL": 1.51,
        "netAPR": 10.02,
        "investStep": [
            {
                "protocol": "Rocketpool",
                "action": "Deposit ETH",
                "result": "Get reward bearing token, rETH"
            },
            {
                "protocol": "Balancer",
                "action": "Add Liquidity in rETH/wstETH/sfrxETH pool",
                "result": "Get LP Token BPT / Reward BAL Token"
            },
            {
                "protocol": "Aura",
                "action": "Stake LP Token BPT",
                "result": "Reward BAL + AURA Token"
            }
        ]
    },
    {
        "id": "c592b8bf",
        "onEvent": false,
        "stepNumber": 1,
        "category": "Liquidity staking",
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
    },
    {
        "id": "9cc5006c",
        "onEvent": false,
        "stepNumber": 3,
        "category": "Add Liquidity",
        "balanceETH": 0,
        "boostCRV": 0,
        "boostBAL": 0,
        "netAPR": 3.91,
        "investStep": [
            {
                "protocol": "Lido",
                "action": "Deposit ETH",
                "result": "Get reward bearing token, stETH"
            },
            {
                "protocol": "Lido",
                "action": "Wrap stETH",
                "result": "Get wrapped stETH, wstETH"
            },
            {
                "protocol": "Balancer",
                "action": "Add Liquidity in wstETH/WETH pool",
                "result": "Get LP Token BPT / Reward BAL Token"
            }
        ]
    },
    {
        "id": "1107645b",
        "onEvent": false,
        "stepNumber": 4,
        "category": "LP farming",
        "balanceETH": 0,
        "boostCRV": 0,
        "boostBAL": 1,
        "netAPR": 5.26,
        "investStep": [
            {
                "protocol": "Lido",
                "action": "Deposit ETH",
                "result": "Get reward bearing token, stETH"
            },
            {
                "protocol": "Lido",
                "action": "Wrap stETH",
                "result": "Get wrapped stETH, wstETH"
            },
            {
                "protocol": "Balancer",
                "action": "Add Liquidity in wstETH/WETH pool",
                "result": "Get LP Token BPT / Reward BAL Token"
            },
            {
                "protocol": "Balancer",
                "action": "Stake LP Token BPT",
                "result": "Reward BAL Token"
            }
        ]
    },
    {
        "id": "a6e08758",
        "onEvent": false,
        "stepNumber": 4,
        "category": "LP farming",
        "balanceETH": 0,
        "boostCRV": 0,
        "boostBAL": 1.49,
        "netAPR": 8.28,
        "investStep": [
            {
                "protocol": "Lido",
                "action": "Deposit ETH",
                "result": "Get reward bearing token, stETH"
            },
            {
                "protocol": "Lido",
                "action": "Wrap stETH",
                "result": "Get wrapped stETH, wstETH"
            },
            {
                "protocol": "Balancer",
                "action": "Add Liquidity in wstETH/WETH pool",
                "result": "Get LP Token BPT / Reward BAL Token"
            },
            {
                "protocol": "Aura",
                "action": "Stake LP Token BPT",
                "result": "Reward BAL + AURA Token"
            }
        ]
    },
    {
        "id": "5f952050",
        "onEvent": false,
        "stepNumber": 3,
        "category": "Add Liquidity",
        "balanceETH": 0,
        "boostCRV": 0,
        "boostBAL": 0,
        "netAPR": 4.84,
        "investStep": [
            {
                "protocol": "Lido",
                "action": "Deposit ETH",
                "result": "Get reward bearing token, stETH"
            },
            {
                "protocol": "Lido",
                "action": "Wrap stETH",
                "result": "Get wrapped stETH, wstETH"
            },
            {
                "protocol": "Balancer",
                "action": "Add Liquidity in wstETH/sfrxETH/rETH pool",
                "result": "Get LP Token BPT / Reward BAL Token"
            }
        ]
    },
    {
        "id": "5a6e50b0",
        "onEvent": false,
        "stepNumber": 4,
        "category": "LP farming",
        "balanceETH": 0,
        "boostCRV": 0,
        "boostBAL": 1,
        "netAPR": 6.34,
        "investStep": [
            {
                "protocol": "Lido",
                "action": "Deposit ETH",
                "result": "Get reward bearing token, stETH"
            },
            {
                "protocol": "Lido",
                "action": "Wrap stETH",
                "result": "Get wrapped stETH, wstETH"
            },
            {
                "protocol": "Balancer",
                "action": "Add Liquidity in wstETH/sfrxETH/rETH pool",
                "result": "Get LP Token BPT / Reward BAL Token"
            },
            {
                "protocol": "Balancer",
                "action": "Stake LP Token BPT",
                "result": "Reward BAL Token"
            }
        ]
    },
    {
        "id": "ea0dd2a7",
        "onEvent": false,
        "stepNumber": 4,
        "category": "LP farming",
        "balanceETH": 0,
        "boostCRV": 0,
        "boostBAL": 1.51,
        "netAPR": 10.86,
        "investStep": [
            {
                "protocol": "Lido",
                "action": "Deposit ETH",
                "result": "Get reward bearing token, stETH"
            },
            {
                "protocol": "Lido",
                "action": "Wrap stETH",
                "result": "Get wrapped stETH, wstETH"
            },
            {
                "protocol": "Balancer",
                "action": "Add Liquidity in wstETH/sfrxETH/rETH pool",
                "result": "Get LP Token BPT / Reward BAL Token"
            },
            {
                "protocol": "Aura",
                "action": "Stake LP Token BPT",
                "result": "Reward BAL + AURA Token"
            }
        ]
    },
    {
        "id": "13426d7e",
        "onEvent": false,
        "stepNumber": 3,
        "category": "Add Liquidity",
        "balanceETH": 0,
        "boostCRV": 0,
        "boostBAL": 0,
        "netAPR": 7.91,
        "investStep": [
            {
                "protocol": "Lido",
                "action": "Deposit ETH",
                "result": "Get reward bearing token, stETH"
            },
            {
                "protocol": "Lido",
                "action": "Wrap stETH",
                "result": "Get wrapped stETH, wstETH"
            },
            {
                "protocol": "Balancer",
                "action": "Add Liquidity in wstETH/cbETH pool",
                "result": "Get LP Token BPT / Reward BAL Token"
            }
        ]
    },
    {
        "id": "e29025dd",
        "onEvent": false,
        "stepNumber": 4,
        "category": "LP farming",
        "balanceETH": 0,
        "boostCRV": 0,
        "boostBAL": 1,
        "netAPR": 9.17,
        "investStep": [
            {
                "protocol": "Lido",
                "action": "Deposit ETH",
                "result": "Get reward bearing token, stETH"
            },
            {
                "protocol": "Lido",
                "action": "Wrap stETH",
                "result": "Get wrapped stETH, wstETH"
            },
            {
                "protocol": "Balancer",
                "action": "Add Liquidity in wstETH/cbETH pool",
                "result": "Get LP Token BPT / Reward BAL Token"
            },
            {
                "protocol": "Balancer",
                "action": "Stake LP Token BPT",
                "result": "Reward BAL Token"
            }
        ]
    },
    {
        "id": "041b1462",
        "onEvent": false,
        "stepNumber": 4,
        "category": "LP farming",
        "balanceETH": 0,
        "boostCRV": 0,
        "boostBAL": 1.46,
        "netAPR": 12.44,
        "investStep": [
            {
                "protocol": "Lido",
                "action": "Deposit ETH",
                "result": "Get reward bearing token, stETH"
            },
            {
                "protocol": "Lido",
                "action": "Wrap stETH",
                "result": "Get wrapped stETH, wstETH"
            },
            {
                "protocol": "Balancer",
                "action": "Add Liquidity in wstETH/cbETH pool",
                "result": "Get LP Token BPT / Reward BAL Token"
            },
            {
                "protocol": "Aura",
                "action": "Stake LP Token BPT",
                "result": "Reward BAL + AURA Token"
            }
        ]
    },
    {
        "id": "18dc7e1e",
        "onEvent": false,
        "stepNumber": 3,
        "category": "Add Liquidity",
        "balanceETH": 0,
        "boostCRV": 0,
        "boostBAL": 0,
        "netAPR": 6.975,
        "investStep": [
            {
                "protocol": "Lido",
                "action": "Deposit ETH",
                "result": "Get reward bearing token, stETH"
            },
            {
                "protocol": "Lido",
                "action": "Wrap stETH",
                "result": "Get wrapped stETH, wstETH"
            },
            {
                "protocol": "Balancer",
                "action": "Add Liquidity in wstETH/wBETH pool",
                "result": "Get LP Token BPT / Reward BAL Token"
            }
        ]
    },
    {
        "id": "62dd7449",
        "onEvent": false,
        "stepNumber": 4,
        "category": "LP farming",
        "balanceETH": 0,
        "boostCRV": 0,
        "boostBAL": 1,
        "netAPR": 11.56,
        "investStep": [
            {
                "protocol": "Lido",
                "action": "Deposit ETH",
                "result": "Get reward bearing token, stETH"
            },
            {
                "protocol": "Lido",
                "action": "Wrap stETH",
                "result": "Get wrapped stETH, wstETH"
            },
            {
                "protocol": "Balancer",
                "action": "Add Liquidity in wstETH/wBETH pool",
                "result": "Get LP Token BPT / Reward BAL Token"
            },
            {
                "protocol": "Balancer",
                "action": "Stake LP Token BPT",
                "result": "Reward BAL Token"
            }
        ]
    },
    {
        "id": "9adb0147",
        "onEvent": false,
        "stepNumber": 4,
        "category": "LP farming",
        "balanceETH": 0,
        "boostCRV": 0,
        "boostBAL": 2.5,
        "netAPR": 20.9,
        "investStep": [
            {
                "protocol": "Lido",
                "action": "Deposit ETH",
                "result": "Get reward bearing token, stETH"
            },
            {
                "protocol": "Lido",
                "action": "Wrap stETH",
                "result": "Get wrapped stETH, wstETH"
            },
            {
                "protocol": "Balancer",
                "action": "Add Liquidity in wstETH/wBETH pool",
                "result": "Get LP Token BPT / Reward BAL Token"
            },
            {
                "protocol": "Aura",
                "action": "Stake LP Token BPT",
                "result": "Reward BAL + AURA Token"
            }
        ]
    },
    {
        "id": "3e4bb9ad",
        "onEvent": false,
        "stepNumber": 1,
        "category": "Liquidity staking",
        "balanceETH": 0,
        "boostCRV": 0,
        "boostBAL": 0,
        "netAPR": 5,
        "investStep": [
            {
                "protocol": "Swell",
                "action": "Deposit ETH",
                "result": "Get reward bearing token, swETH"
            }
        ]
    },
    {
        "id": "568fc58f",
        "onEvent": false,
        "stepNumber": 2,
        "category": "Liquidity staking",
        "balanceETH": 0,
        "boostCRV": 0,
        "boostBAL": 0,
        "netAPR": 4.77,
        "investStep": [
            {
                "protocol": "Frax",
                "action": "Deposit ETH",
                "result": "Get base token, frxETH"
            },
            {
                "protocol": "Frax",
                "action": "Deposit frxETH",
                "result": "Get reward bearing token, sfrxETH"
            }
        ]
    },
    {
        "id": "19d2b16f",
        "onEvent": false,
        "stepNumber": 3,
        "category": "Add Liquidity",
        "balanceETH": 0,
        "boostCRV": 0,
        "boostBAL": 0,
        "netAPR": 4.81,
        "investStep": [
            {
                "protocol": "Frax",
                "action": "Deposit ETH",
                "result": "Get base token, frxETH"
            },
            {
                "protocol": "Frax",
                "action": "Deposit frxETH",
                "result": "Get reward bearing token, sfrxETH"
            },
            {
                "protocol": "Balancer",
                "action": "Add Liquidity in wstETH/sfrxETH/rETH pool",
                "result": "Get LP Token BPT / Reward BAL Token"
            }
        ]
    },
    {
        "id": "ff64d136",
        "onEvent": false,
        "stepNumber": 4,
        "category": "LP farming",
        "balanceETH": 0,
        "boostCRV": 0,
        "boostBAL": 1,
        "netAPR": 6.31,
        "investStep": [
            {
                "protocol": "Frax",
                "action": "Deposit ETH",
                "result": "Get base token, frxETH"
            },
            {
                "protocol": "Frax",
                "action": "Deposit frxETH",
                "result": "Get reward bearing token, sfrxETH"
            },
            {
                "protocol": "Balancer",
                "action": "Add Liquidity in wstETH/sfrxETH/rETH pool",
                "result": "Get LP Token BPT / Reward BAL Token"
            },
            {
                "protocol": "Balancer",
                "action": "Stake LP Token BPT",
                "result": "Reward BAL Token"
            }
        ]
    },
    {
        "id": "e5b90c5d",
        "onEvent": false,
        "stepNumber": 4,
        "category": "LP farming",
        "balanceETH": 0,
        "boostCRV": 0,
        "boostBAL": 1.51,
        "netAPR": 10.81,
        "investStep": [
            {
                "protocol": "Frax",
                "action": "Deposit ETH",
                "result": "Get base token, frxETH"
            },
            {
                "protocol": "Frax",
                "action": "Deposit frxETH",
                "result": "Get reward bearing token, sfrxETH"
            },
            {
                "protocol": "Balancer",
                "action": "Add Liquidity in wstETH/sfrxETH/rETH pool",
                "result": "Get LP Token BPT / Reward BAL Token"
            },
            {
                "protocol": "Aura",
                "action": "Stake LP Token BPT",
                "result": "Reward BAL + AURA Token"
            }
        ]
    },
    {
        "id": "9f02e46c",
        "onEvent": false,
        "stepNumber": 1,
        "category": "Liquidity staking",
        "balanceETH": 0,
        "boostCRV": 0,
        "boostBAL": 0,
        "netAPR": 4.53,
        "investStep": [
            {
                "protocol": "Binance",
                "action": "Deposit ETH",
                "result": "Get reward bearing token, wBETH"
            }
        ]
    },
    {
        "id": "8bab8ead",
        "onEvent": false,
        "stepNumber": 2,
        "category": "Add Liquidity",
        "balanceETH": 0,
        "boostCRV": 0,
        "boostBAL": 0,
        "netAPR": 6.975,
        "investStep": [
            {
                "protocol": "Binance",
                "action": "Deposit ETH",
                "result": "Get reward bearing token, wBETH"
            },
            {
                "protocol": "Balancer",
                "action": "Add Liquidity in wstETH/wBETH pool",
                "result": "Get LP Token BPT / Reward BAL Token"
            }
        ]
    },
    {
        "id": "830a70f3",
        "onEvent": false,
        "stepNumber": 3,
        "category": "LP farming",
        "balanceETH": 0,
        "boostCRV": 0,
        "boostBAL": 1,
        "netAPR": 10.855,
        "investStep": [
            {
                "protocol": "Binance",
                "action": "Deposit ETH",
                "result": "Get reward bearing token, wBETH"
            },
            {
                "protocol": "Balancer",
                "action": "Add Liquidity in wstETH/wBETH pool",
                "result": "Get LP Token BPT / Reward BAL Token"
            },
            {
                "protocol": "Balancer",
                "action": "Stake LP Token BPT",
                "result": "Reward BAL Token"
            }
        ]
    },
    {
        "id": "2784d8ad",
        "onEvent": false,
        "stepNumber": 3,
        "category": "LP farming",
        "balanceETH": 0,
        "boostCRV": 0,
        "boostBAL": 2.5,
        "netAPR": 20.195,
        "investStep": [
            {
                "protocol": "Binance",
                "action": "Deposit ETH",
                "result": "Get reward bearing token, wBETH"
            },
            {
                "protocol": "Balancer",
                "action": "Add Liquidity in wstETH/wBETH pool",
                "result": "Get LP Token BPT / Reward BAL Token"
            },
            {
                "protocol": "Aura",
                "action": "Stake LP Token BPT",
                "result": "Reward BAL + AURA Token"
            }
        ]
    },
    {
        "id": "68742411",
        "onEvent": false,
        "stepNumber": 1,
        "category": "Liquidity staking",
        "balanceETH": 0,
        "boostCRV": 0,
        "boostBAL": 0,
        "netAPR": 5.13,
        "investStep": [
            {
                "protocol": "Ankr",
                "action": "Deposit ETH",
                "result": "Get reward bearing token, ankrETH"
            }
        ]
    },
    {
        "id": "b0fcd831",
        "onEvent": false,
        "stepNumber": 2,
        "category": "Add Liquidity",
        "balanceETH": 0,
        "boostCRV": 0,
        "boostBAL": 0,
        "netAPR": 4.275,
        "investStep": [
            {
                "protocol": "Ankr",
                "action": "Deposit ETH",
                "result": "Get reward bearing token, ankrETH"
            },
            {
                "protocol": "Balancer",
                "action": "Add Liquidity in wstETH/ankrETH pool",
                "result": "Get LP Token BPT / Reward BAL Token"
            }
        ]
    },
    {
        "id": "dcb832e9",
        "onEvent": false,
        "stepNumber": 3,
        "category": "LP farming",
        "balanceETH": 0,
        "boostCRV": 0,
        "boostBAL": 1,
        "netAPR": 4.285,
        "investStep": [
            {
                "protocol": "Ankr",
                "action": "Deposit ETH",
                "result": "Get reward bearing token, ankrETH"
            },
            {
                "protocol": "Balancer",
                "action": "Add Liquidity in wstETH/ankrETH pool",
                "result": "Get LP Token BPT / Reward BAL Token"
            },
            {
                "protocol": "Balancer",
                "action": "Stake LP Token BPT",
                "result": "Reward BAL Token"
            }
        ]
    },
    {
        "id": "8df8d0ea",
        "onEvent": false,
        "stepNumber": 3,
        "category": "LP farming",
        "balanceETH": 0,
        "boostCRV": 0,
        "boostBAL": 1.46,
        "netAPR": 7.405,
        "investStep": [
            {
                "protocol": "Ankr",
                "action": "Deposit ETH",
                "result": "Get reward bearing token, ankrETH"
            },
            {
                "protocol": "Balancer",
                "action": "Add Liquidity in wstETH/ankrETH pool",
                "result": "Get LP Token BPT / Reward BAL Token"
            },
            {
                "protocol": "Aura",
                "action": "Stake LP Token BPT",
                "result": "Reward BAL + AURA Token"
            }
        ]
    },
    {
        "id": "2598c595",
        "onEvent": false,
        "stepNumber": 1,
        "category": "Liquidity staking",
        "balanceETH": 0,
        "boostCRV": 0,
        "boostBAL": 0,
        "netAPR": 5.84,
        "investStep": [
            {
                "protocol": "Coinbase",
                "action": "Deposit ETH",
                "result": "Get reward bearing token, cbETH"
            }
        ]
    },
    {
        "id": "313f7e41",
        "onEvent": false,
        "stepNumber": 2,
        "category": "Add Liquidity",
        "balanceETH": 0,
        "boostCRV": 0,
        "boostBAL": 0,
        "netAPR": 7.91,
        "investStep": [
            {
                "protocol": "Coinbase",
                "action": "Deposit ETH",
                "result": "Get reward bearing token, cbETH"
            },
            {
                "protocol": "Balancer",
                "action": "Add Liquidity in wstETH/cbETH pool",
                "result": "Get LP Token BPT / Reward BAL Token"
            }
        ]
    },
    {
        "id": "45a0a0c5",
        "onEvent": false,
        "stepNumber": 3,
        "category": "LP farming",
        "balanceETH": 0,
        "boostCRV": 0,
        "boostBAL": 1,
        "netAPR": 9.17,
        "investStep": [
            {
                "protocol": "Binance",
                "action": "Deposit ETH",
                "result": "Get reward bearing token, cbETH"
            },
            {
                "protocol": "Balancer",
                "action": "Add Liquidity in wstETH/cbETH pool",
                "result": "Get LP Token BPT / Reward BAL Token"
            },
            {
                "protocol": "Balancer",
                "action": "Stake LP Token BPT",
                "result": "Reward BAL Token"
            }
        ]
    },
    {
        "id": "64faf3de",
        "onEvent": false,
        "stepNumber": 3,
        "category": "LP farming",
        "balanceETH": 0,
        "boostCRV": 0,
        "boostBAL": 1.47,
        "netAPR": 10.6,
        "investStep": [
            {
                "protocol": "Binance",
                "action": "Deposit ETH",
                "result": "Get reward bearing token, wBETH"
            },
            {
                "protocol": "Balancer",
                "action": "Add Liquidity in wstETH/cbETH pool",
                "result": "Get LP Token BPT / Reward BAL Token"
            },
            {
                "protocol": "Aura",
                "action": "Stake LP Token BPT",
                "result": "Reward BAL + AURA Token"
            }
        ]
    }
])

  // {
  //   "id": "baef2dc8",
  //   "onEvent": false,
  //   "stepNumber": 2, 
  //   "category" : "Liquidity Staking",
  //   "balanceETH" : 10,
  //   "boostCRV" : 0,
  //   "boostBAL" : 0,
  //   "netAPR": 6.7,
  //   "protocolName" : "Frax",
  //   "investStep": [
  //       {
  //           "protocol" : "Frax",
  //           "action" : "deposit ETH",
  //           "result" : "get Base Token, frxETH"
  //       },
  //       {
  //           "protocol" : "Curve",
  //           "action" : "provide frxETH + ETH LP",
  //           "result" : "reward CRV + CVX + FXS Token"
  //       }
  //   ]
  // }

  // nodeklay => "클레이 노드 스테이킹"
  const [investedAsset, setInvestedAsset] = useState({
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
    "klayProtocolCategorySummary":[
      {"":0},{"":0}
    ],
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

    // const assetList = await axios.get(`https://wp22qg4khl.execute-api.ap-northeast-2.amazonaws.com/v1/service/investInfo?userAddr=${userAccount}`)
    const assetList = {
      data : testData
    }
    console.log("assetList.data.poolList",assetList)
    // assetList.data.poolList.sort(function(a,b){
    //   if(a.netAPR < b.netAPR) return 1;
    //   if(a.netAPR === b.netAPR) return 0;
    //   if(a.netAPR > b.netAPR) return -1;
    // })
    console.log("assetList.data.poolList after",assetList.data.poolList)

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



const chartOptions = { plugins: { legend: { display: false } } };

  const allMonths = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
  ];

  const chartData = {
    labels: allMonths,
    datasets: [
      {
        label: "",
        data: [80, 95, 90, 60, 55, 80, 95, 90, 60, 55, 99, 80],
        backgroundColor: ["#2563eb"]
      },
    ],
  };

  // ChartJS.defaults.datasets.line.borderColor = "#2563eb";
  // ChartJS.defaults.datasets.bar.borderColor = "#2563eb";
  // ChartJS.defaults.datasets.bar.backgroundColor = "#2563eb";

  


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
                            <div onClick={sortHandler} class="block px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
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


              {/* <ul class="flex flex-wrap text-sm font-medium text-center text-gray-500 dark:text-gray-400">
                  <li class="mr-2">
                      <a href="#" class="inline-block px-4 py-3 text-white bg-blue-600 rounded-lg active" aria-current="page">
                          All
                        <span class="inline-flex items-center justify-center w-4 h-4 ml-2 text-xs font-semibold text-blue-800 bg-blue-200 rounded-full">
                          15
                        </span>
                      </a>
                  </li>
                  <li class="mr-2">
                      <a href="#" class="inline-block px-4 py-3 rounded-lg" aria-current="page">
                        Liqudity Staking
                        <span class="inline-flex items-center justify-center w-6 h-6 ml-2 text-xs font-semibold text-black bg-gray-200 rounded-full">
                          2
                        </span>
                      </a>
                  </li>
                  <li class="mr-2">
                      <a href="#"  class="inline-block px-4 py-3 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white">
                        LP Farming
                        <span class="inline-flex items-center justify-center w-6 h-6 ml-2 text-xs font-semibold text-black bg-gray-200 rounded-full">
                          10
                        </span>
                      </a>
                  </li>
                  <li class="mr-2">
                      <a href="#" class="inline-block px-4 py-3 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white">
                        Re-Stake
                        <span class="inline-flex items-center justify-center w-6 h-6 ml-2 text-xs font-semibold text-black bg-gray-200 rounded-full">
                          1
                        </span>
                      </a>
                  </li>
                  <li class="mr-2">
                      <a href="#" class="inline-block px-4 py-3 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white">
                        Optimizer
                        <span class="inline-flex items-center justify-center w-6 h-6 ml-2 text-xs font-semibold text-black bg-gray-200 rounded-full">
                          1
                        </span>
                      </a>
                  </li>
              </ul> */}

              <div style={{marginTop:"20px"}}></div>

              <ul role="list">

                <div style={{marginTop:"20px"}}></div>

                {poollistInfo.map((res)=>(
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

