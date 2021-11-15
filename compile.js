const path = require('path');
const fs = require('fs');
const solc = require('solc');
const NakanoTokenPath = path.resolve(__dirname, 'contract', 'Nakano.sol');
const source =fs.readFileSync(NakanoTokenPath, 'utf8');

var input = {
    language: 'Solidity',
    sources: {
        'Nakano.sol': {
            content: source
        }
    },
    settings:{
        outputSelection:{
            '*': {
                '*': ['*']
            }
        }
    }
};

var output = JSON.parse(solc.compile(JSON.stringify(input)));
var contract = output.contracts['Nakano.sol']['Nakano'];

var dirName = 'bin';
const contractByteCodePath = path.join(dirName, 'Nakano.bin');
fs.writeFileSync(contractByteCodePath, contract.evm.bytecode.object);

const contractAbiPath = path.join(dirName, 'Nakano.abi');
fs.writeFileSync(contractAbiPath, JSON.stringify(contract.abi));