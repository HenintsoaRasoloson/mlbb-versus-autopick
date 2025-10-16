import type { NowResponse } from "@vercel/node";
import fetch from "node-fetch";

export default async (res: NowResponse) => {
  try {
    const response = await fetch(
      "https://mlbb-stats.ridwaanhall.com/hero-list/"
    );
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching hero list:", error);
    res.status(500).json({ error: "Failed to fetch hero list" });
  }
};
