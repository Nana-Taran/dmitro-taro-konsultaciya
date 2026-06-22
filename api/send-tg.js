export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  const { name, contact, situation } = req.body || {};

  const text =
    `📩 Нова заявка з сайту dmitro.online!\n` +
    `👤 Ім'я: ${name || "—"}\n` +
    `📱 Як написати: ${contact || "—"}\n` +
    `💬 Ситуація: ${situation || "—"}`;

  const tgRes = await fetch(
    `https://api.telegram.org/bot${process.env.TG_TOKEN}/sendMessage`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: process.env.TG_CHAT, text }),
    }
  );

  if (!tgRes.ok) {
    return res.status(500).json({ ok: false });
  }
  return res.status(200).json({ ok: true });
}
