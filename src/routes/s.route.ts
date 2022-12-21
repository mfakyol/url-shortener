import express from "express";
import ShortenerModel from "../models/shortener.model";

const domain = process.env.DOMAIN || "";

export default function SRouter() {
  const route = () => {
    const router = express.Router();

    router.get("/:short", async (req, res) => {

      try {
        const shortener = await ShortenerModel.findOne({ short: req.params.short });

        if (shortener) return res.redirect(shortener.url);

        return res.redirect("https://google.com");
      } catch (error) {
        return res.redirect("https://google.com");
      }
    });

    return router;
  };

  return {
    route,
    routerPrefix: `/s`,
  };
}
