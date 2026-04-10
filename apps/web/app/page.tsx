import Link from "next/link";

export default function Home() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        gap: "1.5rem",
      }}
    >
      <h1 style={{ fontSize: "2rem", fontWeight: 700 }}>SaaS Foundation</h1>
      <p style={{ color: "#6b7280" }}>
        Multi-tenant B2B starter with Clerk, Drizzle, and Stripe.
      </p>
      <Link
        href="/dashboard"
        style={{
          padding: "0.75rem 1.5rem",
          background: "#111",
          color: "#fff",
          borderRadius: "0.5rem",
          textDecoration: "none",
        }}
      >
        Go to Dashboard
      </Link>
    </div>
  );
}
