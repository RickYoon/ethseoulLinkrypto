import Web3 from 'web3';
import Swal from 'sweetalert2'

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

const kaikasKlayDepositExecutor = async (accountAddress, targetContract, amount) => {

    const userAddress = accountAddress
    const protocolAddress = targetContract
    const depositAmount = amount

    let transactionInfo = {}

    switch (protocolAddress) {
        case '0xe33337cb6fbb68954fe1c3fde2b21f56586632cd': // 1 - klaystation : hashed - ozys             
            transactionInfo = await klaystationKaikasDeposit(userAddress, protocolAddress, depositAmount)
            break;
        case '0xeffa404dac6ba720002974c54d57b20e89b22862': // 2 - klaystation : hankyung             
            transactionInfo = await klaystationKaikasDeposit(userAddress, protocolAddress, depositAmount)
            break;
        case '0x0795aea6948fc1d31809383edc4183b220abd71f': // 3 - klaystation : jump - everstate             
            transactionInfo = await klaystationKaikasDeposit(userAddress, protocolAddress, depositAmount)
            break;
        case '0x962cdb28e662b026df276e5ee7fdf13a06341d68': // 4 - klaystation : FSN             
            transactionInfo = await klaystationKaikasDeposit(userAddress, protocolAddress, depositAmount)
            break;
        case '0x74ba03198fed2b15a51af242b9c63faf3c8f4d34': // 5 - klaymore       
            transactionInfo = await klaymoreKaikasDeposit(userAddress, protocolAddress, depositAmount)
            break;
        case '0x829fcfb6a6eea9d14eb4c14fac5b29874bdbad13': // 6 - bifi       
            transactionInfo = await bifiKaikasDeposit(userAddress, protocolAddress, depositAmount)
            break;
        case '0x7087d5a9e3203d39ec825d02d92f66ed3203b18a': // 7 - kokoa       
            transactionInfo = await kokoaKaikasDeposit(userAddress, protocolAddress, depositAmount)
            break;
        case '0xf80f2b22932fcec6189b9153aa18662b15cc9c00': // 7 - kokoa       
            transactionInfo = await stakelyKaikasDeposit(userAddress, protocolAddress, depositAmount)
            break;
        default:
            console.log(`Sorry, we are out of ${protocolAddress}.`);
    }

    // console.log("transactionInfo",transactionInfo)

    const web3Return = await window.caver.klay
      .sendTransaction(transactionInfo)
      .once('transactionHash', (transactionHash) => {
        console.log('txHash', transactionHash);
        Toast.fire({
            icon: 'success',
            title: '예치 신청이 성공적으로 완료되었습니다.',
          })
      })
      .once('receipt', (receipt) => {
          console.log('receipt', receipt);
        })
      .once('error', (error) => {
          console.log('error', error);
          alert("지불에 실패하셨습니다.");
      })

      return web3Return
        
}

const kaikasKlayWithdrawalExecutor = async (accountAddress, targetContract, amount, balance) => {

    const web3 = new Web3(window.ethereum);

    const userAddress = accountAddress
    const protocolAddress = targetContract
    const withdrawalAmount = amount
    const userBalance = balance

    let transactionInfo = {}

    switch (protocolAddress) {
        // case '0xe33337cb6fbb68954fe1c3fde2b21f56586632cd': // 1 - klaystation : hashed - ozys             
        //     transactionInfo = await klaystationWithdrawal(userAddress, protocolAddress, withdrawalAmount, userBalance)
        //     break;
        // case '0xeffa404dac6ba720002974c54d57b20e89b22862': // 2 - klaystation : hankyung     
        //     transactionInfo = await klaystationWithdrawal(userAddress, protocolAddress, withdrawalAmount, userBalance)
        //     break;
        // case '0x962cdb28e662b026df276e5ee7fdf13a06341d68': // 3 - klaystation : FSN
        //     transactionInfo = await klaystationWithdrawal(userAddress, protocolAddress, withdrawalAmount, userBalance)
        //     break;
        // case '0x0795aea6948fc1d31809383edc4183b220abd71f': // 4 - klaystation : jump - everstake
        //     transactionInfo = await klaystationWithdrawal(userAddress, protocolAddress, withdrawalAmount, userBalance)
        //     break;
        case '0xf80f2b22932fcec6189b9153aa18662b15cc9c00': // 5 - stakely
            transactionInfo = await stakelyWithdrawal(userAddress, protocolAddress, withdrawalAmount)
            break;
        // case '0xa691c5891d8a98109663d07bcf3ed8d3edef820a': // 6 - kleva 
        //     transactionInfo = await klevaDeposit(userAddress, protocolAddress, withdrawalAmount)
        //     break;
        // case '0x829fcfb6a6eea9d14eb4c14fac5b29874bdbad13': // 7 - bifi 
        //     transactionInfo = await bifiWithdrawal(userAddress, protocolAddress, withdrawalAmount)
        //     break;
        // case '0x74ba03198fed2b15a51af242b9c63faf3c8f4d34': // 8 - klaymore 
        //     transactionInfo = await klaymoreWithdrawal(userAddress, protocolAddress, withdrawalAmount)
        //     break;        
        // case '0x7087d5a9e3203d39ec825d02d92f66ed3203b18a': // 9 - kokoa 
        //     transactionInfo = await kokoaWithdrawal(userAddress, protocolAddress, withdrawalAmount)
        //     break;
        // case '0x6d219198816947d8bb4f88ba502a0518a7c516b1': // 10 - klaybank 
        //     transactionInfo = await klaybankWithdrawal(userAddress, protocolAddress, withdrawalAmount, userBalance)
        //     break;        
        // case '0xf50782a24afcb26acb85d086cf892bfffb5731b5': // 11 - swapscanner 
        //     transactionInfo = await swapscannerWithdrawal(userAddress, protocolAddress, withdrawalAmount, userBalance)
        //     break;
        // case '0xe4c3f5454a752bddda18ccd239bb1e00ca42d371': // 12 - klayswap 
        //     transactionInfo = await klayswapWithdrawal(userAddress, protocolAddress, withdrawalAmount, userBalance)
        //     break;
        default:
            console.log(`Sorry, we are out of ${protocolAddress}.`);
    }

    const web3Return = await window.caver.klay
      .sendTransaction(transactionInfo)
      .once('transactionHash', (transactionHash) => {
        console.log('txHash', transactionHash);
        Toast.fire({
            icon: 'success',
            title: '예치 신청이 성공적으로 완료되었습니다.',
          })
      })
      .once('receipt', (receipt) => {
          console.log('receipt', receipt);
        })
      .once('error', (error) => {
          console.log('error', error);
          alert("지불에 실패하셨습니다.");
      })

      return web3Return

}


async function stakelyKaikasDeposit (addr, contAddr, amount) {

    const abi = {name: 'stake',type: 'function', inputs: []}
    const inputArray = []

    const data = window.caver.klay.abi.encodeFunctionCall(abi, inputArray)      

    return {
        type: 'SMART_CONTRACT_EXECUTION',
        from: addr,
        to: contAddr,
        data,
        value: window.caver.utils.toPeb(amount.toString(), 'KLAY'),
        gas: 3000000
    }
}

async function stakelyWithdrawal (addr, contAddr, amount) {

    if(amount === undefined){
        amount = 0;
    }

    const amountBN = window.caver.utils.toPeb(amount.toString(), 'KLAY')
    
    const abi = {name: 'unstake',type: 'function', inputs: [{"name": "uint256","type": "uint256"}]}
    const inputArray = [amountBN]

    const data = window.caver.klay.abi.encodeFunctionCall(abi, inputArray)      

    return {
        type: 'SMART_CONTRACT_EXECUTION',
        from: addr,
        to: contAddr,
        data,
        gas: 3000000
    }

}


async function klaystationKaikasDeposit (addr, contAddr, amount) {

    const abi = {name: 'stakeKlay',type: 'function', inputs: [{"name": "address","type": "address"}]}
    const inputArray = [addr]

    const data = window.caver.klay.abi.encodeFunctionCall(abi, inputArray)      

    return {
        type: 'SMART_CONTRACT_EXECUTION',
        from: addr,
        to: contAddr,
        data,
        value: window.caver.utils.toPeb(amount.toString(), 'KLAY'),
        gas: 800000
    }
}

async function klaymoreKaikasDeposit (addr, contAddr, amount) {

    const abi = {name: 'stakeKlay',type: 'function', inputs: [{"name": "address","type": "address"}]}
    const inputArray = [addr]

    const data = window.caver.klay.abi.encodeFunctionCall(abi, inputArray)      

      return {
        type: 'SMART_CONTRACT_EXECUTION',
        from: addr,
        to: contAddr,
        data,
        value: window.caver.utils.toPeb(amount.toString(), 'KLAY'),
        gas: 500000
    }

}

async function bifiKaikasDeposit (addr, contAddr, amount) {

    let tokenAmount = 0;
    let klayAmount = 0;

    if (contAddr === "0x829fcfb6a6eea9d14eb4c14fac5b29874bdbad13") {
        tokenAmount = 0;
        klayAmount = amount * 1e+18
    }

    const abi = {name: 'deposit',type: 'function', inputs: [{"name": "amount","type": "uint256"},{"name": "flag","type": "bool"}]};
    const amountBN = window.caver.utils.toPeb(amount.toString(), 'KLAY');
    const abiInput =[amountBN, 0];

    const data = window.caver.klay.abi.encodeFunctionCall(abi, abiInput)      

      return {
        type: 'SMART_CONTRACT_EXECUTION',
        from: addr,
        to: contAddr,
        data,
        value: amountBN,
        gas: 500000
    }

}

async function kokoaKaikasDeposit (addr, contAddr, amount) {

    const abi = {name: 'stakeAndBorrow',type: 'function', inputs: [{"name": "uint256","type": "uint256"}]}
    const inputArray = [0]

    const data = window.caver.klay.abi.encodeFunctionCall(abi, inputArray)      

      return {
        type: 'SMART_CONTRACT_EXECUTION',
        from: addr,
        to: contAddr,
        data,
        value: window.caver.utils.toPeb(amount.toString(), 'KLAY'),
        gas: 2000000
    }
    
}



export {
    kaikasKlayDepositExecutor,
    kaikasKlayWithdrawalExecutor
}