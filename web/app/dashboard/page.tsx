import LogoutButton from "../components/LogoutButton";

export default function DashboardPage() {
  return (
    <main>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1>Dashboard</h1>
        <LogoutButton />
      </div>

      <p>Ця сторінка має відкриватися тільки після логіну.</p>
    </main>
  );
}
