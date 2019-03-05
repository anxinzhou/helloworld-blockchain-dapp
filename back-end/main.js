const Koa = require('koa');
const app = new Koa();
const Router = require('koa-router');
const router = new Router();
const cors = require('koa2-cors');
const bodyParser = require('koa-bodyparser');
const Web3 = require('web3');
const config = require('./config.json');
const fs = require('fs');
const https = require('https');

const options = {
	key: fs.readFileSync('../pem/key.pem'),
	cert: fs.readFileSync('../pem/cert.pem')
};
const web3 = new Web3(config.httpPort);
const contract = new web3.eth.Contract(config.abi, config.address);
const account = web3.eth.accounts.privateKeyToAccount('0x65CF458E20E12991BA6AEBC210B8293AD5B3495F585CECC6D22DE77933DE2B0F');
console.log(account);
router.prefix('/api/v1');
router.get('/tokens/:user', getToken)
	.put('/tokens/:user', updateToken);

console.log("app start");
app.use(cors());
app.use(bodyParser());
app.use(router.routes());
https.createServer(options,app.callback()).listen(4000);


async function sendTransaction(funcName, ...args) {
    let option = {
        to: config.address,
        gasLimit: '3000000',
		gasPrice: '2000000000',
		data: contract.methods[funcName](...args).encodeABI(),
    };

    // let tx = new EthereumTx(option);
    // tx.sign(privateKey);
    // let serializedTx = '0x'+tx.serialize().toString('hex');
    // console.log(serializedTx);
	try {
        let signedTx = await account.signTransaction(option);
        console.log(signedTx.rawTransaction);
        let receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
        receipt.status === '0x0' ?Promise.reject(new Error('transaction revert')) : Promise.resolve();
	} catch(err){
		throw(err);
	}
}

function callTransaction(funcName, ...args) {
    return contract.methods[funcName](...args).call();
}

async function getToken(ctx) {
	let user = ctx.params.user;
	try {
		let amount = await callTransaction('balanceOf', user);
		console.log(`user: ${user}`);
		console.log(`balance: ${amount}`);
		ctx.response.status = 200;
		ctx.response.body = amount;
	} catch (err) {
		console.log(err.message)
		ctx.response.status = 400;
		ctx.response.body = {
			message: err.message
		}
	}
}

async function updateToken(ctx) {
	console.log('update token');
	let user = ctx.params.user;
	let amount = ctx.request.body.amount;
	let p = amount<0 ? sendTransaction('consume',user,-amount): sendTransaction('reward',user,amount);
	try {
		await p;
		ctx.response.status = 200;
	} catch (err) {
        console.log(err.message)
        ctx.response.status = 400;
        ctx.response.body = {
            message: err.message
        }
    }
}