import Link from "next/link";

export default function HomePage() {
  return (
    <main style={{ maxWidth: 960, margin: "0 auto", padding: "48px 20px" }}>
      {/* Header */}
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16 }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 32 }}>TradeLog</h1>
          <p style={{ marginTop: 8, opacity: 0.8 }}>
            Journal your crypto trades. Stay consistent. Improve your edge.
          </p>
        </div>

        <div style={{ display: "flex", gap: 10 }}>
          <Link
            href="/login"
            style={{
              padding: "10px 14px",
              border: "1px solid #ccc",
              borderRadius: 10,
              textDecoration: "none",
            }}
          >
            Login
          </Link>

          <Link
            href="/register"
            style={{
              padding: "10px 14px",
              borderRadius: 10,
              textDecoration: "none",
              background: "#111",
              color: "#fff",
            }}
          >
            Start trial
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section style={{ marginTop: 40 }}>
        <h2 style={{ fontSize: 26, marginBottom: 10 }}>
          UA + EN • Crypto only • 7-day free trial
        </h2>

        <p style={{ lineHeight: 1.6, opacity: 0.9 }}>
          <b>EN:</b> Track entries/exits, screenshots, emotions, and stats. Keep your strategy honest.
          <br />
          <b>UA:</b> Веди журнал угод: входи/виходи, скріншоти, емоції та статистику. Контролюй дисципліну.
        </p>

        <div style={{ display: "flex", gap: 12, marginTop: 16, flexWrap: "wrap" }}>
          <Link
            href="/register"
            style={{
              padding: "12px 16px",
              borderRadius: 12,
              textDecoration: "none",
              background: "#111",
              color: "#fff",
            }}
          >
            Create account (Trial)
          </Link>

          <Link
            href="/login"
            style={{
              padding: "12px 16px",
              borderRadius: 12,
              textDecoration: "none",
              border: "1px solid #ccc",
            }}
          >
            I already have an account
          </Link>
        </div>
      </section>

      {/* Features */}
      <section style={{ marginTop: 40 }}>
        <h3 style={{ fontSize: 20 }}>Features / Можливості</h3>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16, marginTop: 16 }}>
          {[
            {
              title: "Fast trade logging",
              ua: "Швидке внесення угод",
              desc: "Log trades in seconds: pair, side, entry/exit, fees, notes.",
              uaDesc: "Фіксуй угоди за секунди: пара, напрям, вхід/вихід, комісії, нотатки.",
            },
            {
              title: "Sessions (max 2 devices)",
              ua: "Сесії (до 2 пристроїв)",
              desc: "Security: keep up to 2 active sessions; old one gets revoked.",
              uaDesc: "Безпека: максимум 2 активні сесії; стара автоматично відключається.",
            },
            {
              title: "Trial + Paid plans",
              ua: "Пробний період + Платні плани",
              desc: "Start with a 7-day trial, then upgrade to keep using.",
              uaDesc: "Почни з 7-денного trial, потім — підписка для продовження.",
            },
            {
              title: "Stats & discipline",
              ua: "Статистика і дисципліна",
              desc: "See your winrate, R:R, mistakes, and patterns over time.",
              uaDesc: "Аналізуй winrate, R:R, помилки та патерни з часом.",
            },
          ].map((f) => (
            <div
              key={f.title}
              style={{
                border: "1px solid #e5e5e5",
                borderRadius: 14,
                padding: 16,
              }}
            >
              <div style={{ fontWeight: 700 }}>{f.title}</div>
              <div style={{ opacity: 0.75, marginTop: 4 }}>{f.ua}</div>
              <p style={{ marginTop: 10, lineHeight: 1.5, opacity: 0.9 }}>
                {f.desc}
                <br />
                {f.uaDesc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer style={{ marginTop: 48, opacity: 0.7, fontSize: 14 }}>
        © {new Date().getFullYear()} TradeLog • Crypto only • UA/EN
      </footer>
    </main>
  );
}
