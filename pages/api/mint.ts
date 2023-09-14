// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const skTest =
      "Gh-_UvuG59RgHQIRbskK5dpjLDipgjPDqTxvhfw4q2S59OKDgyf2I97uKJcfcIQO0MbseuJ0CeRY8Af-QUqa2w"; // should be in .env yes
    const sdk = ThirdwebSDK.fromPrivateKey(
      process.env.PRIVATE_KEY!,
      "polygon",
      { secretKey: skTest }
    );

    // https://thirdweb.com/polygon/0xa0CA1f36c599B025848fD22a24eF6Dfbdc77321E
    const contract = await sdk.getContract(
      "0xa0CA1f36c599B025848fD22a24eF6Dfbdc77321E",
      "edition"
    );
    const mintData = [0, 1, 2].map((num) => ({
      metadata: { name: `Token: ${num}` },
      supply: 2,
    }));
    const tx = await contract.mintBatch(mintData);
    return res.json(tx);
  } catch (err) {
    console.log(err);
    return res.send(err);
  }
}
