import LogoutButton from "../components/LogoutButton";

export default async function DashboardPage() {
  return (
    <main style={{ padding: 40 }}>
      <h1>Dashboard</h1>
      <p>Ця сторінка має відкриватися тільки після логіну.</p>

      <div style={{ marginTop: 20 }}>
        <LogoutButton />
      </div>
    </main>
  );
}
