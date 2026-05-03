import { db, activityLogs } from "@repo/db";

export async function logActivity(
  organizationId: string,
  type: string,
  message: string,
  metadata?: Record<string, unknown>
) {
  try {
    await db.insert(activityLogs).values({
      organizationId,
      type,
      message,
      metadata: metadata ? JSON.stringify(metadata) : null,
    });
  } catch (error) {
    console.error("Failed to log activity:", error);
  }
}
