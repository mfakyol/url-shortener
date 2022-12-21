import express from "express";
import { nanoid } from "nanoid";
import bodyParser from "body-parser";
import ShortenerModel from "../models/shortener.model";

const domain = process.env.DOMAIN || "";

export default function ShortRouter() {
  const jsonParser = bodyParser.json();

  const route = () => {
    const router = express.Router();

    router.post("/", jsonParser, async (req, res) => {
      if (!req.body.url) res.send({ status: false, message: "url required." });
      const short = nanoid(5);
      const url = req.body.url as string;
      const ip = req.ip;

      try {
        const shortener = new ShortenerModel({ short, url, ip });
        await shortener.save();
        return res.send({ status: true, data: { url, short: `${domain}/s/${short}` } });
      } catch (error) {
        res.statusCode = 500;
        res.statusMessage = "server Error";
        return res.end();
      }
    });

    return router;
  };

  return {
    route,
    routerPrefix: `/short`,
  };
}
