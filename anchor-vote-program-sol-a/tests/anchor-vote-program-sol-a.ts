import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { AnchorVoteProgramSolA } from "../target/types/anchor_vote_program_sol_a";
import { Keypair, LAMPORTS_PER_SOL, SystemProgram } from "@solana/web3.js";
import { createHash } from "crypto";
import { PublicKey } from "@metaplex-foundation/js";
describe("anchor-vote-program-sol-a", () => {
  // Configure the client to use the local cluster.

  anchor.setProvider(anchor.AnchorProvider.env());
  const program = anchor.workspace
    .AnchorVoteProgramSolA as Program<AnchorVoteProgramSolA>;

  const provider = anchor.getProvider();
  const site = "twitter.com";
  const hasher = createHash("sha256");
  hasher.update(Buffer.from(site));

  const hash = hasher.digest();
  const signer = Keypair.generate();
  const vote = PublicKey.findProgramAddressSync([hash], program.programId)[0];

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

  xit("Is initialized!", async () => {
    // Add your test here.
    const tx = await program.methods
      .initialize(site)
      .accounts({
        signer: signer.publicKey,
        vote,
        systemProgram: SystemProgram.programId,
      })
      .signers([signer])
      .rpc()
      .then(confirm)
      .then(log);
    console.log("Your transaction signature", tx);
    console.log("hello");
  });
  xit("Upvote", async () => {
    // Add your test here.
    const tx = await program.methods
      .upvote(site)
      .accounts({
        signer: signer.publicKey,
        vote,
        systemProgram: SystemProgram.programId,
      })
      .signers([signer])
      .rpc()
      .then(confirm)
      .then(log);
    console.log("Your transaction signature", tx);
    console.log("hello");
  });
  it("Downvote", async () => {
    // Add your test here.
    const tx = await program.methods
      .downvote(site)
      .accounts({
        signer: signer.publicKey,
        vote,
        systemProgram: SystemProgram.programId,
      })
      .signers([signer])
      .rpc()
      .then(confirm)
      .then(log);
    console.log("Your transaction signature", tx);
    console.log("hello");
  });
});
