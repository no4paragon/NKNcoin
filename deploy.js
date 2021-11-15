const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const path = require('path');
const fs = require('fs');
const { exit } = require('process');

const provider = new HDWalletProvider(
    'rrrr',
    'https://rinkeby.infura.io/v3/f1bc913421dd4ed8af734aea6a21c11a'
);

const web3 = new Web3(provider);

const abiPath = path.resolve(__dirname, 'bin', 'Nakano.abi');
const abi = fs.readFileSync(abiPath, 'utf8');

const bytecodePath = path.resolve(__dirname, 'bin', 'Nakano.bin');
const bytecode = fs.readFileSync(bytecodePath, 'utf8');

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();

    console.log('Attempting to deploy from account ', accounts[0]);

    const result = await new web3.eth.Contract(JSON.parse(abi))
        .deploy({data: bytecode})
        .send({from: accounts[0], gas: '1000000'});

    console.log('Contract deployed to ', result.options.address);
    exit(0);
}

deploy();