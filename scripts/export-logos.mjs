import { writeFile, mkdir } from "node:fs/promises";
import { join } from "node:path";

import {
  siGmail,
  siSlack,
  siNotion,
  siAirtable,
  siZapier,
  siHubspot,
  siSalesforce,
  siGoogledrive,
  siGooglesheets,
  siN8n,
} from "simple-icons";

const OUT_DIR = join(process.cwd(), "public", "logos");

async function writeIcon(icon, filename) {
  if (!icon || !icon.svg) {
    console.error(`❌ Missing icon data for ${filename}`);
    return;
  }
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#${icon.hex}">${icon.svg}</svg>`;
  await writeFile(join(OUT_DIR, filename), svg, "utf8");
  console.log(`✅ wrote ${filename}`);
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });

  await writeIcon(siGmail, "gmail.svg");
  await writeIcon(siSlack, "slack.svg");
  await writeIcon(siNotion, "notion.svg");
  await writeIcon(siAirtable, "airtable.svg");
  await writeIcon(siZapier, "zapier.svg");
  await writeIcon(siHubspot, "hubspot.svg");
  await writeIcon(siSalesforce, "salesforce.svg");
  await writeIcon(siGoogledrive, "google-drive.svg");
  await writeIcon(siGooglesheets, "google-sheets.svg");
  await writeIcon(siN8n, "n8n.svg");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});