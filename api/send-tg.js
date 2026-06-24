export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  const { name, phone, messenger, situation, page, contact } = req.body || {};

  // New format: phone + messenger (popup form and updated CTA form)
  const isPopup = phone !== undefined || messenger !== undefined;

  const text = isPopup
    ? [
        "📋 Нова заявка з сайту",
        `👤 Ім'я: ${name || "—"}`,
        `📞 Телефон: ${phone || "—"}`,
        `💬 Месенджер: ${messenger || "—"}`,
        `📝 Ситуація: ${situation || "не вказано"}`,
        `🌐 Сторінка: ${page || "—"}`,
      ].join("\n")
    : [
        "📩 Нова заявка з сайту dmitro.online!",
        `👤 Ім'я: ${name || "—"}`,
        `📱 Як написати: ${contact || "—"}`,
        `💬 Ситуація: ${situation || "—"}`,
      ].join("\n");

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
