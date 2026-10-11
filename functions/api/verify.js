
export async function onRequestPost({ request, env }) {
  const headers = {
    "Content-Type": "application/json",
    "Cache-Control": "no-store"
  };

  try {
    const body = await request.json();
    const key = typeof body.key === "string"
      ? body.key.trim()
      : "";

    if (!key || key.length > 200) {
      return Response.json(
        { ok: false, message: "Invalid license key." },
        { status: 400, headers }
      );
    }

    if (!env.LICENSE_KEY) {
      return Response.json(
        { ok: false, message: "License system is not configured yet." },
        { status: 503, headers }
      );
    }

    if (key !== env.LICENSE_KEY) {
      return Response.json(
        { ok: false, message: "ACCESS FAILED" },
        { status: 403, headers }
      );
    }

    return Response.json(
      { ok: true, message: "ACCESS GRANTED" },
      { headers }
    );
  } catch {
    return Response.json(
      { ok: false, message: "Invalid request." },
      { status: 400, headers }
    );
  }
}
