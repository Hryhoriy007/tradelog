export default function LoginPage() {
  return (
    <main style={{ padding: 40 }}>
      <h1>Login</h1>
      <p>Увійдіть у TradeLog</p>

      <form style={{ display: "grid", gap: 12, maxWidth: 320, marginTop: 16 }}>
        <input placeholder="Email" type="email" />
        <input placeholder="Password" type="password" />
        <button type="submit">Sign in</button>
      </form>

      <p style={{ marginTop: 16 }}>
        No account? <a href="/register">Create one</a>
      </p>
    </main>
  );
}
