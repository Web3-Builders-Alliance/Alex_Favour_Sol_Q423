import wallet from "../wba-wallet.json";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import {
  createMetadataAccountV3,
  CreateMetadataAccountV3InstructionAccounts,
  CreateMetadataAccountV3InstructionArgs,
  DataV2Args,
  updateArgs,
} from "@metaplex-foundation/mpl-token-metadata";
import {
  createSignerFromKeypair,
  signerIdentity,
  publicKey,
} from "@metaplex-foundation/umi";
import { PublicKey, SystemProgram } from "@solana/web3.js";
import { createBundlrUploader } from "@metaplex-foundation/umi-uploader-bundlr";
import { updateMetadataPointerData } from "@solana/spl-token";

// Define our Mint address
const mint = publicKey("9fmyLy8Xh1JEqpnuZj6QUHTXxfzSQUkr9wKGGfHQ7qXP");
const token_metadata_program_id = new PublicKey(
  "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"
);
// Create a UMI connection
const umi = createUmi("https://api.devnet.solana.com");
const bundlrUploader = createBundlrUploader(umi);
const keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);
umi.use(signerIdentity(createSignerFromKeypair(umi, keypair)));

(async () => {
  try {
    // Start here
    let accounts: CreateMetadataAccountV3InstructionAccounts = {
      mint,
      payer: signer,
      mintAuthority: signer,
      updateAuthority: signer,
    };

    let data: DataV2Args = {
      name: "Vault Token",
      symbol: "Vr",
      uri: "https://arweave.net/muHqzF96q3n7F_3q5z6UueDw_bV6g16mgIyBnnN1RQ4",
      sellerFeeBasisPoints: 0,
      creators: null,
      collection: null,
      uses: null,
    };

    let args: CreateMetadataAccountV3InstructionArgs = {
      data,
      isMutable: true,
      collectionDetails: null,
    };
    let tx = createMetadataAccountV3(umi, {
      ...accounts,
      ...args,
    });

    let result = await tx.buildAndSign(umi);
    const sig = await umi.rpc.sendTransaction(result); // .then((r) => r.signature.toString());
    console.log(sig);
  } catch (e) {
    console.error(`Oops, something went wrong: ${e}`);
  }
})();
