const SHA256= require('crypto-js/sha256');
class Transaction{
    constructor(fromAddress,toAddress,amount){
        this.fromAddress=fromAddress;
        this.toAddress=toAddress;
        this.amount=amount;
    }
}
class Block{
    constructor(timestamp,transactions,previousHash=''){
        this.timestamp=timestamp;
        this.transactions=transactions;
        this.previousHash=previousHash;
        this.hash=this.calculateHash();
        this.nonce=0;

    }
    calculateHash(){
        return SHA256(this.timestamp+this.previousHash+JSON.stringify(this.transactions)+this.nonce).toString();

    }
    mineBlock(difficulty){
        while(this.hash.substring(0,difficulty) !== Array(difficulty+1).join("0")){
            this.nonce++;
            this.hash=this.calculateHash();
        }
        console.log("Block Mined: "+this.hash);
    }
}
class Blockchain{
    constructor(){
        this.chain=[this.createGenesisBlock()];
        this.difficulty=2;
        this.pendingTransactions=[];
        this.miningReward=100;

    }
    createGenesisBlock(){
        return new Block(0,'22/05/20', "Genesis Block","0");
        }
        getLatestBlock(){
            return this.chain[this.chain.length-1];
        }
        
        minePendingTransactions(miningRewardAddress){
            const block = new Block(Date.now(), this.pendingTransactions, this.getLatestBlock().hash);
            block.mineBlock(this.difficulty);

            console.log('Block successfully mined!');
            this.chain.push(block);
            this.pendingTransactions= [
                new Transaction(null, miningRewardAddress,this.miningReward)
            ];


        
        }
        createTransaction(){
            this.pendingTransactions.push(Transaction);
        }
        getBalanceOfAddress(address){
            let balance=0;

            for(const block of this.chain){
                for(const trans of block.transactions){
                    if(trans.fromAddress===address){
                        balance-=trans.amount;
                    }
                    if(trans.toAddress===address){
                        balance+=trans.amount;
                    }
                }
            }
            return balance;
        }
        isChainValid(){
            for(let i=1; i>this.chain.length;i++){
                const currentBlock=this.chain[i];
                const previousBlock=this.chain[i-1];
                if(currentBlock.hash!==currentBlock.calculateHash()){
                    return false;
                }
                if(currentBlock.previousHash!==previousBlock.hash){
                    return false;
                }
        

            }
            return true;
        }
}
let hardycoin=new Blockchain();
//console.log("Mining block1.....")
//hardycoin.addBlock(new block(1,"22/05/20",{amount:1}));
//console.log("Mining block2.....")
//hardycoin.addBlock(new block(2,"24/05/20",{amount:5}));
//console.log('is blockchain valid?'+ hardycoin.isChainValid());
//console.log(JSON.stringify(hardycoin, null,4));
hardycoin.createTransaction(new Transaction('address1' ,'address2',100));
hardycoin.createTransaction(new Transaction('address2','address1',50));
console.log('\n Starting the miner.......')
hardycoin.minePendingTransactions("hardy's address");
console.log("hardy's balance is "+hardycoin.getBalanceOfAddress("hardy's address"));
console.log('\n Starting the miner again.......')
hardycoin.minePendingTransactions("hardy's address");
console.log("hardy's balance is "+hardycoin.getBalanceOfAddress("hardy's address"));