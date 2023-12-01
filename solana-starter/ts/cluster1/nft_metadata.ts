import wallet from "../wba-wallet.json";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import {
  createGenericFile,
  createSignerFromKeypair,
  signerIdentity,
} from "@metaplex-foundation/umi";
import { createBundlrUploader } from "@metaplex-foundation/umi-uploader-bundlr";

// Create a devnet connection
const umi = createUmi("https://api.devnet.solana.com");
const bundlrUploader = createBundlrUploader(umi);

let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);

umi.use(signerIdentity(signer));

(async () => {
  try {
    // Follow this JSON structure
    // https://docs.metaplex.com/programs/token-metadata/changelog/v1.0#json-structure
    const metadata = {
      name: "Vault Rug",
      symbol: "VR",
      description: "Only  Vault rugs",
      image: "https://arweave.net/_SEwDPNYt1uB9GP7dyA6qP6_fG09YB-b38qwGYyJlfk",
      attributes: [{ trait_type: "Red", value: "Rug" }],
      properties: {
        files: [
          {
            type: "image/png",
            uri: "https://arweave.net/_SEwDPNYt1uB9GP7dyA6qP6_fG09YB-b38qwGYyJlfk",
          },
        ],
      },
      creators: [],
    };
    const myUri = await bundlrUploader.uploadJson(metadata);
    console.log("Your image URI: ", myUri);
  } catch (error) {
    console.log("Oops.. Something went wrong", error);
  }
})();
