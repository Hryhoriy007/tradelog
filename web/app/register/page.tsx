export default function RegisterPage() {
  return (
    <main style={{ padding: 40 }}>
      <h1>Register</h1>
      <p>Створи акаунт і почни 7-day trial</p>

      <form style={{ display: "grid", gap: 12, maxWidth: 320, marginTop: 16 }}>
        <input placeholder="Email" type="email" />
        <input placeholder="Password (min 8 chars)" type="password" />
        <button type="submit">Start free trial</button>
      </form>

      <p style={{ marginTop: 16 }}>
        Already have an account? <a href="/login">Login</a>
      </p>
    </main>
  );
}
