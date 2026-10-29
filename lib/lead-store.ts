import { mkdir, appendFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";

// Every form submission is written to disk first, so a lead is never lost even when
// email delivery is not configured or fails. Optionally a push notification is sent
// (ntfy-compatible: plain-text POST with Title/Tags headers) so someone sees it quickly.

const leadsDir = process.env.DTC_LEADS_DIR || path.join(process.cwd(), "..", "leads");
const notifyUrl = process.env.DTC_LEAD_NOTIFY_URL || "";

export interface LeadAttachment {
  filename: string;
  content: Buffer;
  contentType?: string;
}

export interface SavedLead {
  id: string;
  file: string;
}

function safeName(name: string) {
  return name.replace(/[^a-zA-Z0-9._-]/g, "_").slice(-120) || "file";
}

export async function saveLead(
  kind: "inquiry" | "transport",
  data: Record<string, unknown>,
  attachments: LeadAttachment[] = []
): Promise<SavedLead> {
  const now = new Date();
  const id = `${now.toISOString().replace(/[-:T]/g, "").slice(0, 14)}-${randomUUID().slice(0, 8)}`;
  await mkdir(leadsDir, { recursive: true, mode: 0o700 });

  let attachmentFiles: string[] = [];
  if (attachments.length) {
    const dir = path.join(leadsDir, "attachments", id);
    await mkdir(dir, { recursive: true, mode: 0o700 });
    attachmentFiles = await Promise.all(
      attachments.map(async (item, index) => {
        const target = path.join(dir, `${index + 1}-${safeName(item.filename)}`);
        await writeFile(target, item.content, { mode: 0o600 });
        return path.relative(leadsDir, target);
      })
    );
  }

  const file = path.join(leadsDir, `${kind}-${now.toISOString().slice(0, 7)}.jsonl`);
  const record = { id, kind, receivedAt: now.toISOString(), ...data, attachmentFiles };
  await appendFile(file, `${JSON.stringify(record)}\n`, { mode: 0o600 });

  return { id, file };
}

export async function notifyLead(title: string, body: string) {
  if (!notifyUrl) return;
  try {
    await fetch(notifyUrl, {
      method: "POST",
      // HTTP header values must be Latin-1; the full text (with any non-Latin name) goes in the body.
      headers: { Title: title.replace(/[^\x20-\x7E]/g, "?"), Tags: "tooth", Priority: "high" },
      body,
      signal: AbortSignal.timeout(8000)
    });
  } catch (error) {
    console.error("[lead] Push notification failed.", error);
  }
}
