// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

const sampleReturnData = {
  filters: [
    { name: "Language", options: ["English", "Arabic", "Urdu"] },
    { name: "Classification", options: ["Green", "Yellow", "Red"] },
    {
      name: "Type",
      options: [
        "Religion",
        "Politics",
        "Medicine",
        "Law",
        "Sociology",
        "Technology",
        "Education",
        "Economics",
        "History",
        "Ethics",
        "Spirituality",
      ],
    },
  ],
};

type Data = typeof sampleReturnData;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json(sampleReturnData);
}
