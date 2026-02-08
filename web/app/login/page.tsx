"use client";

import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    setLoading(false);

    if (res.ok) {
      // ✅ логін успішний → cookie поставлена
      window.location.href = "/";
    } else {
      alert(data.error || "Login failed");
    }
  }

  return (
    <main style={{ padding: 40 }}>
      <h1>Login</h1>
      <p>Увійдіть у TradeLog</p>

      <form
        onSubmit={handleSubmit}
        style={{ display: "grid", gap: 12, maxWidth: 320, marginTop: 16 }}
      >
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Sign in"}
        </button>
      </form>

      <p style={{ marginTop: 16 }}>
        No account? <a href="/register">Create one</a>
      </p>
    </main>
  );
}
