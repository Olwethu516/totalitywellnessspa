import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface BookingPayload {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  branch: string;
  service_type: string;
  service_name: string;
  service_price: number;
  preferred_date: string;
  preferred_time: string;
  notes: string;
  payment_method: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const booking: BookingPayload = await req.json();

    const branchLabel = booking.branch === "durban" ? "Durban" : "Johannesburg";
    const paymentLabel = booking.payment_method === "online" ? "Online Payment" : "Pay In-Store";

    const clientHtml = `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"></head>
<body style="font-family: Georgia, serif; background: #f9f5ee; margin:0; padding:0;">
  <div style="max-width:600px; margin:0 auto; background:#fff; border-top: 4px solid #C9A84C;">
    <div style="background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%); padding: 40px 32px; text-align:center;">
      <h1 style="color:#C9A84C; font-size:28px; margin:0; letter-spacing:2px;">TOTALITY WELLNESS SPA</h1>
      <p style="color:#e8d5a3; margin:8px 0 0; font-size:13px; letter-spacing:1px;">BOOKING CONFIRMATION</p>
    </div>
    <div style="padding: 40px 32px;">
      <p style="color:#333; font-size:16px;">Dear <strong>${booking.full_name}</strong>,</p>
      <p style="color:#555; line-height:1.6;">Thank you for booking with Totality Wellness Spa. Your booking request has been received and we will confirm shortly.</p>

      <div style="background:#fdf8ef; border-left: 3px solid #C9A84C; padding: 24px; margin: 24px 0; border-radius: 0 8px 8px 0;">
        <h3 style="color:#C9A84C; margin:0 0 16px; font-size:14px; letter-spacing:1px; text-transform:uppercase;">Booking Details</h3>
        <table style="width:100%; border-collapse:collapse;">
          <tr><td style="color:#777; padding:6px 0; font-size:14px; width:140px;">Booking Ref:</td><td style="color:#333; font-size:14px; font-weight:bold;">#${booking.id.slice(0, 8).toUpperCase()}</td></tr>
          <tr><td style="color:#777; padding:6px 0; font-size:14px;">Branch:</td><td style="color:#333; font-size:14px;">${branchLabel}</td></tr>
          <tr><td style="color:#777; padding:6px 0; font-size:14px;">Service:</td><td style="color:#333; font-size:14px;">${booking.service_name}</td></tr>
          <tr><td style="color:#777; padding:6px 0; font-size:14px;">Price:</td><td style="color:#C9A84C; font-size:14px; font-weight:bold;">R${booking.service_price}</td></tr>
          <tr><td style="color:#777; padding:6px 0; font-size:14px;">Date:</td><td style="color:#333; font-size:14px;">${booking.preferred_date}</td></tr>
          <tr><td style="color:#777; padding:6px 0; font-size:14px;">Time:</td><td style="color:#333; font-size:14px;">${booking.preferred_time}</td></tr>
          <tr><td style="color:#777; padding:6px 0; font-size:14px;">Payment:</td><td style="color:#333; font-size:14px;">${paymentLabel}</td></tr>
          ${booking.notes ? `<tr><td style="color:#777; padding:6px 0; font-size:14px; vertical-align:top;">Notes:</td><td style="color:#333; font-size:14px;">${booking.notes}</td></tr>` : ""}
        </table>
      </div>

      <p style="color:#555; font-size:14px; line-height:1.6;">For enquiries, contact us at <a href="mailto:info@oula.co.za" style="color:#C9A84C;">info@oula.co.za</a> or WhatsApp <a href="https://wa.me/27722332665" style="color:#C9A84C;">+27 72 233 2665</a>.</p>

      <div style="border-top: 1px solid #e8d5a3; margin-top: 32px; padding-top: 24px; text-align:center;">
        <p style="color:#999; font-size:12px; margin:0;">Totality Wellness Spa &bull; Durban &amp; Johannesburg</p>
        <p style="color:#999; font-size:12px; margin:4px 0 0;">info@oula.co.za</p>
      </div>
    </div>
  </div>
</body>
</html>`;

    const businessHtml = `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"></head>
<body style="font-family: Georgia, serif; background: #f9f5ee; margin:0; padding:0;">
  <div style="max-width:600px; margin:0 auto; background:#fff; border-top: 4px solid #C9A84C;">
    <div style="background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%); padding: 32px; text-align:center;">
      <h1 style="color:#C9A84C; font-size:22px; margin:0;">NEW BOOKING - Totality Wellness Spa</h1>
    </div>
    <div style="padding: 32px;">
      <div style="background:#fdf8ef; border-left: 3px solid #C9A84C; padding: 24px; border-radius: 0 8px 8px 0;">
        <h3 style="color:#C9A84C; margin:0 0 16px; font-size:14px; letter-spacing:1px;">CLIENT &amp; BOOKING DETAILS</h3>
        <table style="width:100%; border-collapse:collapse;">
          <tr><td style="color:#777; padding:6px 0; font-size:14px; width:140px;">Booking Ref:</td><td style="color:#333; font-size:14px; font-weight:bold;">#${booking.id.slice(0, 8).toUpperCase()}</td></tr>
          <tr><td style="color:#777; padding:6px 0; font-size:14px;">Client Name:</td><td style="color:#333; font-size:14px;">${booking.full_name}</td></tr>
          <tr><td style="color:#777; padding:6px 0; font-size:14px;">Email:</td><td style="color:#333; font-size:14px;"><a href="mailto:${booking.email}" style="color:#C9A84C;">${booking.email}</a></td></tr>
          <tr><td style="color:#777; padding:6px 0; font-size:14px;">Phone:</td><td style="color:#333; font-size:14px;">${booking.phone}</td></tr>
          <tr><td style="color:#777; padding:6px 0; font-size:14px;">Branch:</td><td style="color:#333; font-size:14px;">${branchLabel}</td></tr>
          <tr><td style="color:#777; padding:6px 0; font-size:14px;">Service:</td><td style="color:#333; font-size:14px;">${booking.service_name}</td></tr>
          <tr><td style="color:#777; padding:6px 0; font-size:14px;">Category:</td><td style="color:#333; font-size:14px;">${booking.service_type}</td></tr>
          <tr><td style="color:#777; padding:6px 0; font-size:14px;">Price:</td><td style="color:#C9A84C; font-size:14px; font-weight:bold;">R${booking.service_price}</td></tr>
          <tr><td style="color:#777; padding:6px 0; font-size:14px;">Date:</td><td style="color:#333; font-size:14px;">${booking.preferred_date}</td></tr>
          <tr><td style="color:#777; padding:6px 0; font-size:14px;">Time:</td><td style="color:#333; font-size:14px;">${booking.preferred_time}</td></tr>
          <tr><td style="color:#777; padding:6px 0; font-size:14px;">Payment:</td><td style="color:#333; font-size:14px;">${paymentLabel}</td></tr>
          ${booking.notes ? `<tr><td style="color:#777; padding:6px 0; font-size:14px; vertical-align:top;">Notes:</td><td style="color:#333; font-size:14px;">${booking.notes}</td></tr>` : ""}
        </table>
      </div>
    </div>
  </div>
</body>
</html>`;

    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

    if (RESEND_API_KEY) {
      await Promise.all([
        fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${RESEND_API_KEY}` },
          body: JSON.stringify({
            from: "Totality Wellness Spa <bookings@oula.co.za>",
            to: [booking.email],
            subject: `Booking Confirmation - ${booking.service_name} | Ref #${booking.id.slice(0, 8).toUpperCase()}`,
            html: clientHtml,
          }),
        }),
        fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${RESEND_API_KEY}` },
          body: JSON.stringify({
            from: "Totality Wellness Spa <bookings@oula.co.za>",
            to: ["info@oula.co.za"],
            subject: `New Booking: ${booking.full_name} - ${booking.service_name} (${branchLabel})`,
            html: businessHtml,
          }),
        }),
      ]);
    }

    const waMessage = encodeURIComponent(
      `*NEW BOOKING - Totality Wellness Spa*\n\n` +
      `*Ref:* #${booking.id.slice(0, 8).toUpperCase()}\n` +
      `*Client:* ${booking.full_name}\n` +
      `*Phone:* ${booking.phone}\n` +
      `*Email:* ${booking.email}\n` +
      `*Branch:* ${branchLabel}\n` +
      `*Service:* ${booking.service_name}\n` +
      `*Price:* R${booking.service_price}\n` +
      `*Date:* ${booking.preferred_date}\n` +
      `*Time:* ${booking.preferred_time}\n` +
      `*Payment:* ${paymentLabel}\n` +
      (booking.notes ? `*Notes:* ${booking.notes}` : "")
    );

    const CALLMEBOT_API_KEY = Deno.env.get("CALLMEBOT_API_KEY");
    if (CALLMEBOT_API_KEY) {
      await fetch(
        `https://api.callmebot.com/whatsapp.php?phone=27722332665&text=${waMessage}&apikey=${CALLMEBOT_API_KEY}`
      );
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
