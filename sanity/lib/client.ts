import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "../env";

export const client = createClient({
  projectId: "ws507jcw",
  dataset: "production",
  apiVersion: "2025-07-21",
  useCdn: true,
  token: process.env.SANITY_API_READ_TOKEN,
});
