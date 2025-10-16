import type { VercelResponse } from "@vercel/node";
import fetch from "node-fetch";

export default async function handler(res: VercelResponse) {
  try {
    const response = await fetch(
      "https://mlbb-stats.ridwaanhall.com/api/hero-list/"
    );
    const data = await response.json();
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching hero list:", error);
    res.status(500).json({ error: "Failed to fetch hero list" });
  }
}
