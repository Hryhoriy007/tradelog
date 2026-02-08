"use client";

import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const isJson = res.headers.get("content-type")?.includes("application/json");
      const data = isJson ? await res.json() : null;

      setLoading(false);

      if (!res.ok) {
        alert(data?.error || `Login failed (${res.status})`);
        return;
      }

      // після логіну cookie вже є
      window.location.href = "/";
    } catch {
      setLoading(false);
      alert("Network error");
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
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          placeholder="Password"
          type="password"
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
