import { auth } from "@clerk/nextjs/server";
import { db } from "@repo/db";
import { organizations } from "@repo/db";
import { eq } from "drizzle-orm";

export default async function DashboardPage() {
  const { userId, orgId } = await auth();

  if (!orgId) {
    return (
      <div>
        <h1
          style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "1rem" }}
        >
          Welcome
        </h1>
        <p style={{ color: "#6b7280" }}>
          Select or create an organization using the switcher above to get
          started.
        </p>
      </div>
    );
  }

  // Fetch the current org from our database
  const org = await db.query.organizations.findFirst({
    where: eq(organizations.id, orgId),
  });

  return (
    <div>
      <h1 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "1rem" }}>
        Dashboard
      </h1>
      <div
        style={{
          padding: "1.5rem",
          border: "1px solid #e5e7eb",
          borderRadius: "0.5rem",
          maxWidth: "32rem",
        }}
      >
        <p>
          <strong>Organization:</strong> {org?.name ?? "Not synced yet"}
        </p>
        <p>
          <strong>Slug:</strong> {org?.slug ?? "—"}
        </p>
        <p>
          <strong>Org ID:</strong>{" "}
          <code style={{ fontSize: "0.875rem" }}>{orgId}</code>
        </p>
        <p>
          <strong>User ID:</strong>{" "}
          <code style={{ fontSize: "0.875rem" }}>{userId}</code>
        </p>
      </div>
    </div>
  );
}
