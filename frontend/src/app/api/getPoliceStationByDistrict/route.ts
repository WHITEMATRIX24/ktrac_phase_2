// /app/api/getPoliceStationsByDistrict/route.ts
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const district = searchParams.get("district");
  const state = searchParams.get("state") ?? "Kerala";

  if (!district) {
    return new Response(JSON.stringify({ error: "District is required" }), { status: 400 });
  }

  const query = `${district}, ${state}`;
  try {
    // Step 1: Get bounding box from Nominatim
    const nominatimResp = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=1`
    );
    const nominatimData = await nominatimResp.json();
    if (!nominatimData.length) throw new Error("District not found");

    const [south, north, west, east] = nominatimData[0].boundingbox.map(parseFloat);

    // Step 2: Query Overpass API
    const overpassQuery = `
      [out:json][timeout:25];
      (
        node["amenity"="police"](${south},${west},${north},${east});
        way["amenity"="police"](${south},${west},${north},${east});
        relation["amenity"="police"](${south},${west},${north},${east});
      );
      out center;
    `;

    const overpassResp = await fetch("https://overpass-api.de/api/interpreter", {
      method: "POST",
      body: overpassQuery,
    });

    const overpassData = await overpassResp.json();

    return new Response(JSON.stringify(overpassData.elements), { status: 200 });
  } catch (error) {
    console.error("Fetch police stations failed:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch police stations" }), { status: 500 });
  }
}
