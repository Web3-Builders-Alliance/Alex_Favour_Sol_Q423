import {
  Connection,
  Keypair,
  SystemProgram,
  PublicKey,
  Commitment,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";
import { Program, Wallet, AnchorProvider, Address } from "@coral-xyz/anchor";
import { meteoraAmm, amm } from "./Program/amm";
import wallet from "../wba-wallet.json";
import { BN } from "@coral-xyz/anchor";
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

const commitment = "confirmed";
const connection = new Connection(
  "https://devnet.helius-rpc.com/?api-key=51d6c9fd-d6fc-466d-94ce-2c1e83abd432"
);
const provider = new AnchorProvider(connection, new Wallet(keypair), {
  commitment,
});
const programm = new Program<meteoraAmm>(
  amm,
  "Eo7WjKq67rjJQSZxS6z3YkapzY3eMj6Xy8X5EQVn5UaB" as Address,
  provider
);

(async () => {
  try {
    const signature = await programm.methods
      .swap(new BN(0.1 * LAMPORTS_PER_SOL), new BN(13443535))
      .accounts({
        pool: new PublicKey("B7yJxZEeTDWGBj6JcQ3vvsXKGEZT33PVYtsmJWPKJMgD"),
      });
  } catch (error) {
    console.log(error);
  }
})();
