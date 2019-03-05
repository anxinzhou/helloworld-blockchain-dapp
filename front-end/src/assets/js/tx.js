const W = require('ethereumjs-wallet');

const createAccount = ()=> {
    let wallet =  W.generate();
    return {
        address: wallet.getAddress().toString('hex'),
        privateKey: wallet.getPrivateKey().toString('hex')
    }
};

export { createAccount};
