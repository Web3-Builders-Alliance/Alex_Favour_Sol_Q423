import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { AnchorVoteProgramSolA } from "../target/types/anchor_vote_program_sol_a";
import { Keypair, LAMPORTS_PER_SOL } from "@solana/web3.js";
describe("anchor-vote-program-sol-a", () => {
  // Configure the client to use the local cluster.

  anchor.setProvider(anchor.AnchorProvider.env());
  const program = anchor.workspace
    .AnchorVoteProgramSolA as Program<AnchorVoteProgramSolA>;

  const provider = anchor.getProvider();

  const signer = Keypair.generate();
  const confirm = async (tx: string): Promise<string> => {
    const block = await provider.connection.getLatestBlockhash();
    await provider.connection.confirmTransaction({ signature: tx, ...block });
    return tx;
  };
  const log = async (tx: string): Promise<string> => {
    console.log(
      `https://explorer.solana.com/transactions/${tx}?cluster=custom&customUrl=http%3A%2F%2Flocalhost%3A8899"`
    );
    return tx;
  };

  it("Airdrop", async () => {
    await provider.connection
      .requestAirdrop(signer.publicKey, 10 * LAMPORTS_PER_SOL)
      .then(confirm)
      .then(log);
  });

  it("Is initialized!", async () => {
    // Add your test here.
    const tx = await program.methods.initialize().rpc();
    console.log("Your transaction signature", tx);
    console.log("hello");
  });
});
