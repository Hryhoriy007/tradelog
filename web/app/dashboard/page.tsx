export default function DashboardPage() {
  return (
    <main style={{ padding: 40 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>Dashboard</h1>

        <form action="/api/auth/logout" method="post">
          <button type="submit">Вийти</button>
        </form>
      </div>

      <p>Ця сторінка має відкриватися тільки після логіну.</p>
    </main>
  );
}
