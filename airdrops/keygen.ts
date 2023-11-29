import { Keypair } from "@solana/web3.js";

let kp = Keypair.generate();
console.log(
  `You have generated a keypair with address ${kp.publicKey.toBase58()}`,
  [`${kp.secretKey}`]
);
