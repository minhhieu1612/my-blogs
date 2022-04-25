// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { PostType } from "../../../components/Posts";
import PostHandler from "../../../models/post/handler";

type Data =
  | PostType[]
  | {
      message: string;
    };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const postHandler = new PostHandler();
  switch (req.method) {
    case "GET":
      {
        if (req.query.id) {
          const resultHandler = await postHandler.getOne(req.query.id);
          if (resultHandler.status) {
            res.status(200).json(resultHandler.data);
          } else {
            res.status(500).json({ message: "something went wrong" });
          }
        } else {
          const resultHandler = await postHandler.getMany();
          if (resultHandler.status) {
            res.status(200).json(resultHandler.data);
          } else {
            res.status(500).json({ message: "something went wrong" });
          }
        }
      }
      break;
    case "POST":
      {
        const resultHandler = await postHandler.insert(req.body);
        if (resultHandler.status) {
          res.status(200).json({ message: resultHandler.message });
        } else {
          res.status(500).json({ message: "something went wrong" });
        }
      }
      break;
    case "PUT":
      {
        console.log("in");

        const resultHandler = await postHandler.update(req.query.id, req.body);
        if (resultHandler.status) {
          res.status(200).json({ message: resultHandler.message });
        } else {
          res.status(500).json({ message: "something went wrong" });
        }
      }
      break;
    case "DELETE":
      {
        const resultHandler = await postHandler.delete(req.query.id);
        if (resultHandler.status) {
          res.status(200).json({ message: resultHandler.message });
        } else {
          res.status(500).json({ message: "something went wrong" });
        }
      }
      break;
  }
}
