import {
  Commitment,
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
} from "@solana/web3.js";
import wallet from "../wba-wallet.json";
import { getOrCreateAssociatedTokenAccount, transfer } from "@solana/spl-token";

// We're going to import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

//Create a Solana devnet connection
const commitment: Commitment = "confirmed";
const connection = new Connection("https://api.devnet.solana.com", commitment);

// Mint address
const mint = new PublicKey("TemJBGnvkYdbd7jECXa9RDhrtmmeKLHgrob4cQ3z51C");
// const wallets = [
//   Keypair.generate().publicKey.toBase58(),
//   Keypair.generate().publicKey.toBase58(),
//   Keypair.generate().publicKey.toBase58(),
// ];
// Recipient address
const to = new PublicKey("GkEVXEapXkxc7pScePBP37BJaRBycyEPBYaS7uYJuq8m");

const createWallets = async () => {
  const wallets = Array.from({ length: 100 }, () => {
    return Keypair.generate().publicKey.toBase58();
  });

  console.log(wallets);
  return wallets;
};

const wallets = [
  "48U2PZDL4XhxsvXzse8UnqjtvtUAT6Ve9Bv3oF76NP5e",
  "54fdJHjt8yQ2HQpHyMYHn3LpXKdSWEe5RgrbJXWHoHi8",
  "GBeBaYqrEHYcuEX6BAz2VrUXmgLoxXdTZsftErsVQL52",
  "z9gz2aRp48tkmNhXpx5BAXNwK8k3WRTwfQ3Yu9eKopU",
  "4ugSNCwbkHyQ97aKEPiJpYbnCWNCoMwE1Thg21s9qqDN",
  "3a1svScseX5Sxe8iDeE3WrfijTdGQGgKpqiZUyGRakdN",
  "GQ4mDXwVeCznBXmRtBvKL5gH23449ZLBhycWbJuATGsS",
  "HRNnMVRvVsrETtnWdCctb8L6k7Q4636CEikd72QzbLPY",
  "8DvtE1xtiVtHTWxDEfeUWSgFj59GegQyENyUcPPHwKhG",
  "8tpezW7ckHHwhBeN8UTnW8pgof8VF2rgRgiE1vd18Z4u",
  "5Rq2m8Xmbo9MxeFvsr82Fp82Yw62NBxrJRh427t2Uv97",
  "EGbk2J25TYh3iUR696T4kjathwZfjfXtPVF2ZoRPun35",
  "6fcFazCAt4x3qgK4yK1ZmftzGZa3gWi8d2wW35PsSSe4",
  "AtFScWJn4dQAh7BAwXFuuZxopxViwuRgdGn5PrritLzD",
  "ELD9WZsRfMKxmMDMhHMc6fP8fbKKEki4f2RVYrAfnBBs",
  "28GBTXVD6qWBYnRyWyxSLYUZaL9jtVyBqNvuYe5dkkGm",
  "DULumg5YVnCKxfKwHw7bd7Rn1WcgUhVJEtfVLnAZQqpz",
  "5Ux7iTrMopa3NcaywtD1jVeCiQqZ5WYoanHg3LNJeCQT",
  "29NbgJnViHBk2z4UhGcwh4t5P9egRKMyu1R9W2tx9ttT",
  "8GQ4dGqCZ39AJCwn3ADQRTQivg9oGNcswLo8ozpSL5P5",
  "GFB2BHmgzoWZkqgh4Fx7XL9VYfSgLBirTBnMRd7D7Nc9",
  "3kfqYokYVshuhMhMPUpGgjCDQMMYYXsCe9EPQfGAB3ai",
  "DgPsSeCSZec4KPYvxBiYPaqbs9YCXqrxaQ6ePnGYfrF",
  "5EaaMSsJo9TU7qUkfJH41E4HYzST8TdqBpeS3YQ9xf2h",
  "78ffGvR3GoRrESaorH8Mxv3EZHvYCuTEaE6RLtmNdNiy",
  "ATkyUzHKeuwM2LANDWzA7urvsSDTdkxDVxBh5JKc534Y",
  "5h1uRwxAhgJBqXJvRfkmMfshwJCWdAQUFczZaWNvcQNA",
  "3s5Cj4ktWB1zFyMHZb6C2TtgQyX84L3gXFU7F9HkE4zq",
  "2fk3xJy91J1knnz9cn1q9xConeTDVcx7VjojvF3i1WKX",
  "ACaF1m22kW8cSPXXJ3Jcvv1umEfcrj6JxdYSkfrNyUPK",
  "6mCXGDW93vjVJPwrY2cdN6nHqYXAzoRoWgxktdPPzwKS",
  "Bf2f1KWzrHsS2ZvHDJaY4Do6jaSLDZ2QGneJSsubMxDH",
  "GVUsuBV5pLgNQnGB7y3B8kQKu9TN13dytjYqkG2kq7Y9",
  "Epm3AHfjZ5sNfqxLiQPLJiDTMtSkB9VkFnYM9Km3Xob5",
  "5mM9bV1S7ddJ1nnBCTPq8gSfuvUjUnjdPnCM2rjQcUER",
  "Gj1b7iK7dq1V8tFdkppUPnXZzDduAGLoJnLqvkKqZ3YJ",
  "Ca9Rf2tgVA59chACt1Fyp8x9Ty64J2N3QLUeumx3qQHe",
  "AkBV3kiNKiwpSSsLXKUk3QfG3gsfTir29D7c37vTU7A6",
  "ECF8ydBuBR1ifA3R8cJxqnCEbqAYYfg6wSZpscPYKoZg",
  "8G4w2dGB7BGDUDPFMvsFVE6Ut5CSv8gjkXDPTyQsZaGE",
  "5ckLUHG169dzZNeZ5bgxs8anKS8zYgjGaKywDHCdHPYD",
  "3nMVuHx1J9WBBik5nZaGjh9QmEKakJxMwafg3c2jss56",
  "ANhiLH3AqoMG4KJ1fsyRtYMJuqbcTfJ2YzyBTEkKCJir",
  "J72ajeWdJqPk9sfQKUq78Sr6TinpcdHuh2B2TrUyEUov",
  "Bvc5Sn4BsZsBELmrGUCogbyxEZ1gwdZCFhmoeX53sy9u",
  "2ZwtAVphGhAgDu8wRtnWTeCVfyhukQxK8BPxCrbHyxgD",
  "2BKZwQ77Czt9JptXUaVwfPD5jbgUYq1yqp4WmvFiaLFa",
  "CAxDLYNfxsbd7mCoin6tCZGWva7TB5EDWNHdSDBWzSJe",
  "6nMnrAY33G7Kda2uXShnVYnBpZ3JgTVg7cKADZSRLTv3",
  "C9An96dzjcfpNS6pERepVwvsShoD9kpXjZuDLP6T2dWf",
  "8eEaEtA6ioSUdJidKLRXpn76pxuboGeg6Bjp1J8mhgRJ",
  "2ZZTM7gy44u5LoGSmGuTr216wkMvyjEW1xsPvJyN1FJR",
  "7HKh7ejSiZo62v9sPc2WLrRLHqbfjzpaZ2o7sE3fq65C",
  "69mT4VUCHbrYoZ3CTzY4UUgybtMaJoS3w7XCGU1xtvdz",
  "3kopUyH9t8B9bCJ3eA8c3t4oAqY2xTAagqegQuwU1aAM",
  "GPEDAqvhZbd2iWJauZhzW4nmUJoA5MDNRTqiBUxouY5S",
  "Awm8MnxsDRVj6kkXqYMqQQWxXuLwurWrDGrHvDAbtMqb",
  "Cg3pyTWzfDvG61yJkmthLcDgnciS9zAWyLphxaXtSLR8",
  "8yyp65V9CTYKSiGjpvCCaeQdHY7BeCr3PADSRXdbbbAm",
  "9vUSVeZakZ3Vqu983CR6g9m39noNKvpFB5zWEzFbF5Vd",
  "2q84mbt9oP64YXLYUyQnVSAvihP66dFcSS9vhpoJGA59",
  "H1hohe2m4s7hWewecAnUUXUvTFijq1vLqc7tiyfKXNx3",
  "9PAUkG9VvDZLHFUCcxL53JivyJGWrVkNQef7tjJCviAf",
  "42SNcgJcewbDFXAxEVQk2wbsiFXFL3cCw9RgKu2kz23t",
  "2QzTbsXhYu2C1txccdxbdMV6bLwecz2ZHxaPW4vhvFeS",
  "C6guZdAPufcMBaE6Sp3GbRb2R7rwGPcj7pB8dkiLtoSF",
  "E7eHDASj8P9Xe1CAzBUp1cB9dZy1B8ZG4cx7YeTUeTvS",
  "7CnuquBqTaREGmBp8p8DjaKnRg6P6qyCinJkjhFy1FP9",
  "5ihKXG7tMVehBdLs1q8txwNpss1JGbth3nQJfVG3fDC",
  "CH1DCcKfU3LbB5pqMBdoLVZSVQpC4W5Nr7nWdChyo4Xn",
  "4ssHovfHDyaMwFp7p6fd8jq5SXbvnyHFqMccatCZfSds",
  "BXkn7aReLkv3Bp1vpduNBRdJntzKLttMZQyGbnGkyCcx",
  "ECXpy1scJG7tRcPXjk5mRVfte7KHyp7gbArrhC9sczn3",
  "92mkLgGVAQDiUMJV74p5rhWpv1xeDhSbmjgUFNoSb7h1",
  "4QkTp21nBJfxoL8jsxQzJVLwiHd57yarfSF4hxMFfM2f",
  "De3SHrTm8dd7BDn7ubNyMUUaKZJGtNM4v78RSyTR9Vgq",
  "k7AxFrQr1HzxpNuxsqLtwm27Vu8fDJZPd86XKKygij6",
  "2WK5YDrhjUA1KS5rr5P4iSujd6ijNWQ46fyPhm9AJQcP",
  "5J2aw4tY7J6d86poZbkTQjidAEQTC2tZszvTJjpzdCoi",
  "DxwjeC8w2Lq6jnFV7nyVyvNLyYhnFBtvv3S6j74tchD8",
  "CDwhR5hFFZ7VbiLWSTmgJV5ikFmkpDoZyB4AJKrpMNc6",
  "DvZkjfcvr7JqA1CECKVT4AJ29Qpe6746H7L1ECrtJpJ2",
  "7ZAjLLvub7ibA153rKBNFqbALJ2sP8r4R5P7yY17mRFJ",
  "6E5vS3j1pV33QYMyT8iFupihDa5MgT1mQ5AcMCJAyFPo",
  "86TwXzCNiWhrjEiK8Kq63TqeS4QZmsT1V29eoHpZ244o",
  "3MLrihhanRrPT5AKctDkJviAKNhkRSEUdcGXnfPZsCnL",
  "3YHq8qjBfNZZ5BtQQJWKQCofYLnxYUK9eUSDF8AFDBNe",
  "H1YnMRoYGrXwkiFsyXJTV3p2md6RoDVuQ4ZaAEpj6vGz",
  "8TctGCdYKjogNfgQsQ42j3UVdjGEShyXM3JboB8ydmW8",
  "2BmAQVN635JkYyBrvzGU7127PJuhGkYsAB8iLy5vGadS",
  "GpRqEMLhRbM8ZzH1rLg3Tz9G2LqcJ1Ag1BMWy12S1Lbe",
  "6S1fAvPNv9o82wA8N5guAG2BZGoZnVnz8A6ERhQvUiku",
  "BoH2iVwN1tThxgfG3GT3msjpZDJ5MBzGcNiNgBz5pkuG",
  "tuukAHZALnsChTiEAmLbpjcZBGyKsLVTqvpykzhD19y",
  "EuAJpD9z57PvNABNyVVUHtmeEGxszhc2SDzHWyAKRHei",
  "3qHReUUgeuvCSsF6wrkN4nQrT3oXY1d2yrG4qyCQAA4U",
  "9i3AWPBAqZJriQKz2YYoyfUSmtyMWUaGQUfoY6wtPUeR",
  "H58HyE9LUiT8HWH9Q8jNVqT9Db2UNSWeEdpeYCjKRGZA",
  "BkTaCCcJwtTMHC9derWoXDNrCenUTyzhvcZm8viKfMRo",
  "EYZSxpWiYXR9Dx5Y1Vg9xzWEQwvUwVDGLWVSCdX3kt2x",
];

(async () => {
  try {
    // Get the token account of the fromWallet address, and if it does not exist, create it

    const getTokenAccount = async (address: string) => {
      const fromTokenAccount = await getOrCreateAssociatedTokenAccount(
        connection,
        keypair,
        mint,
        keypair.publicKey
      );

      // Get the token account of the toWallet address, and if it does not exist, create it
      const toTokenAccount = await getOrCreateAssociatedTokenAccount(
        connection,
        keypair,
        mint,
        new PublicKey(address)
      );
      return {
        fromTokenAccount,
        toTokenAccount,
      };
    };
    for (const items of wallets) {
      try {
        const token = await getTokenAccount(items);
        const txid = await transfer(
          connection,
          keypair,
          token.fromTokenAccount.address,
          token.toTokenAccount.address,
          keypair,
          50000n * 1_000_000_000n
        );
        console.log(`Your transfer txid: ${txid}`);
      } catch (error) {
        console.log("ooops " + error);
      }
    }
    // Transfer the new token to the "toTokenAccount" we just created
  } catch (e) {
    console.error(`Oops, something went wrong: ${e}`);
  }
})();
