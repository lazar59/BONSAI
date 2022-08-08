var presale_abi = require("./ABI/PresaleFactory.json");
var BONSAI_abi = require('./ABI/BONSAI.json')
var FNFT_abi = require("./ABI/fnft.json");

export const config = {
    chainId: 97, // mainnet : 56.  bsctestnet : 97
    mainNetUrl: 'https://bsc-dataseed.binance.org/',
    testNetUrl: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
    FNFTFactory : "0x47F7B51AD03b43C1167E73210b7A0Ed70FA5F9aa", // testnet: 0x47F7B51AD03b43C1167E73210b7A0Ed70FA5F9aa
    FNFTFactoryABI : presale_abi,
    BONSAIAddress: '0x340CcF81dB765583f32b9CAF1059aAa32e5cA0af',  // testnet: 0x340CcF81dB765583f32b9CAF1059aAa32e5cA0af
    BONSAIAbi: BONSAI_abi,
    FNFTAddress: '0xffA9cFfdba24bA05658e75d8E2bE060092d238F3', // testnet: 0xffA9cFfdba24bA05658e75d8E2bE060092d238F3
    FNFTAbi: FNFT_abi,
    INFURA_ID: 'e6943dcb5b0f495eb96a1c34e0d1493e'
}

export const def_config = {
    SWAP_FEE: 0.053,
    AUTO_SLIPPAGE: 1,
    BUY_FEE: 0.15,
    SELL_FEE: 0.3,
    MAX_PRESALE_AMOUNT: 100000,
    START_TIME: 1659800028,// 1659960028,
    PRESALE_PERIOD: 3
}