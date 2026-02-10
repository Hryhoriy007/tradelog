"use client";

import { useState } from "react";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // locale прибрали повністю, бо сайт EN-only
        body: JSON.stringify({ email, password }),
      });

      const isJson = res.headers.get("content-type")?.includes("application/json");
      const data = isJson ? await res.json() : null;

      setLoading(false);

      if (!res.ok) {
        alert(data?.error || `Registration failed (${res.status})`);
        return;
      }

      window.location.href = "/login";
    } catch {
      setLoading(false);
      alert("Network error");
    }
  }

  return (
    <main style={{ padding: 40 }}>
      <h1>Create account</h1>
      <p>Create your account and start a 7-day free trial.</p>

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: 12, maxWidth: 320, marginTop: 16 }}>
        <input
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
        />

        <input
          placeholder="Password (min 8 chars)"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          minLength={8}
          required
          autoComplete="new-password"
        />

        <button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Start free trial"}
        </button>
      </form>

      <p style={{ marginTop: 16 }}>
        Already have an account? <a href="/login">Login</a>
      </p>
    </main>
  );
}
