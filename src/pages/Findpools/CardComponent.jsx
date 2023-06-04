import icons from "../../assets/protocols"
import {Link} from "react-router-dom"

export function Card (props) {

    const data = props.data 

    return (

    <li>
        <div class="flex items-center space-x-4">
            <div class="flex-1 min-w-0">
            <div>
            </div>
                <p class="mt-2 text-sm font-medium text-gray-900 truncate dark:text-white">
                <span class="bg-blue-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-gray-300">
                {data.category}
                </span>
                <div class="mt-2">
                {data.balanceETH === 0 ?
                <span class="mt-2 bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-gray-300">
                    {data.balanceETH} ETH
                </span> :
                <span class="mt-2 bg-red-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-gray-300">
                    {data.balanceETH} ETH deposited
                </span>                   
                }
                </div>

            <div style={{padding:"5px", margin:"10px"}}>
                {data.stepNumber === 1 ?
                <>
                <ol class="mt-5 ml-5 relative border-gray-200 dark:border-gray-700">                  
                    <li class="mb-0 ml-6">
                        <span class="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -left-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                            <img src={icons[data.investStep[0].protocol]} alt=""/>
                        </span>
                        <h3 class="flex items-center mb-1 text-base font-semibold text-gray-900 dark:text-white">{data.investStep[0].action}</h3>
                        <p class="pb-2 text-base font-normal text-gray-500 dark:text-gray-400">{data.investStep[0].result}</p>
                    </li>
                </ol>
                </>
                :
                data.stepNumber === 2 ?
                <>
                <ol class="mt-5 ml-5 relative border-l border-gray-700 dark:border-gray-700">                  
                    <li class="mb-0 ml-6">
                        <span class="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -left-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                            <img src={icons[data.investStep[0].protocol]} alt=""/>
                        </span>
                        <h3 class="flex items-center mb-1 text-base font-semibold text-gray-900 dark:text-white">{data.investStep[0].action}</h3>
                        <p class="pb-2 text-base font-normal text-gray-500 dark:text-gray-400">{data.investStep[0].result}</p>
                    </li>
                </ol>
                <ol class="mt-2 ml-5 relative">                  
                    <li class="ml-6">
                    <span class="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -left-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                            <img src={icons[data.investStep[1].protocol]} alt=""/>
                        </span>
                        <h3 class="flex items-center mb-1 text-base font-semibold text-gray-900 dark:text-white">{data.investStep[1].action}</h3>
                        <p class="pb-2 text-base font-normal text-gray-500 dark:text-gray-400">{data.investStep[1].result}</p>
                    </li>
                </ol>
                </>
                :
                data.stepNumber === 3 ?
                <>
                <ol class="mt-5 ml-5 relative border-l border-gray-700 dark:border-gray-700">                  
                    <li class="mb-0 ml-6">
                        <span class="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -left-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                            <img src={icons[data.investStep[0].protocol]} alt=""/>
                        </span>
                        <h3 class="flex items-center mb-1 text-base font-semibold text-gray-900 dark:text-white">{data.investStep[0].action}</h3>
                        <p class="pb-2 text-base font-normal text-gray-500 dark:text-gray-400">{data.investStep[0].result}</p>
                    </li>
                </ol>
                <ol class="mt-2 ml-5 relative border-l border-gray-700 dark:border-gray-700">                   
                    <li class="ml-6">
                    <span class="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -left-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                            <img src={icons[data.investStep[1].protocol]} alt=""/>
                        </span>
                        <h3 class="flex items-center mb-1 text-base font-semibold text-gray-900 dark:text-white">{data.investStep[1].action}</h3>
                        <p class="pb-2 text-base font-normal text-gray-500 dark:text-gray-400">{data.investStep[1].result}</p>
                    </li>
                </ol>
                <ol class="mt-2 ml-5 relative">                  
                    <li class="ml-6">
                    <span class="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -left-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                            <img src={icons[data.investStep[2].protocol]} alt=""/>
                        </span>
                        <h3 class="flex items-center mb-1 text-base font-semibold text-gray-900 dark:text-white">{data.investStep[2].action}</h3>
                        <p class="pb-2 text-base font-normal text-gray-500 dark:text-gray-400">{data.investStep[2].result}</p>
                    </li>
                </ol>
                </>
                :
                data.stepNumber === 4 ?
                <>
                <ol class="mt-5 ml-5 relative border-l border-gray-700 dark:border-gray-700">                  
                    <li class="mb-0 ml-6">
                        <span class="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -left-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                            <img src={icons[data.investStep[0].protocol]} alt=""/>
                        </span>
                        <h3 class="flex items-center mb-1 text-base font-semibold text-gray-900 dark:text-white">{data.investStep[0].action}</h3>
                        <p class="pb-2 text-base font-normal text-gray-500 dark:text-gray-400">{data.investStep[0].result}</p>
                    </li>
                </ol>
                <ol class="mt-2 ml-5 relative border-l border-gray-700 dark:border-gray-700">                   
                    <li class="ml-6">
                    <span class="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -left-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                            <img src={icons[data.investStep[1].protocol]} alt=""/>
                        </span>
                        <h3 class="flex items-center mb-1 text-base font-semibold text-gray-900 dark:text-white">{data.investStep[1].action}</h3>
                        <p class="pb-2 text-base font-normal text-gray-500 dark:text-gray-400">{data.investStep[1].result}</p>
                    </li>
                </ol>
                <ol class="mt-2 ml-5 relative">                  
                    <li class="ml-6">
                    <span class="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -left-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                            <img src={icons[data.investStep[2].protocol]} alt=""/>
                        </span>
                        <h3 class="flex items-center mb-1 text-base font-semibold text-gray-900 dark:text-white">{data.investStep[2].action}</h3>
                        <p class="pb-2 text-base font-normal text-gray-500 dark:text-gray-400">{data.investStep[2].result}</p>
                    </li>
                </ol>
                <ol class="mt-2 ml-5 relative">                  
                    <li class="ml-6">
                    <span class="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -left-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                            <img src={icons[data.investStep[3].protocol]} alt=""/>
                        </span>
                        <h3 class="flex items-center mb-1 text-base font-semibold text-gray-900 dark:text-white">{data.investStep[3].action}</h3>
                        <p class="pb-2 text-base font-normal text-gray-500 dark:text-gray-400">{data.investStep[3].result}</p>
                    </li>
                </ol>                
                </>
                :
                <></>
                }
            </div>

            </p>
            </div>
            <div style={{paddingRight:"20px"}}>
                <Link to={`/detail/${data.id}`}>
                    <div style={{fontSize:"17px", textAlign:"center", fontWeight:"400", marginBottom:"10px"}}>{data.netAPR} %</div>
                    <a href="#" class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-500 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        deposit
                    </a>
                </Link>
            </div>
        </div>
        </li>
    )
}