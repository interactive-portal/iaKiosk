import { NextApiRequest, NextApiResponse } from "next";
import { getEqualizedUserIds, getUserInfo } from "@/lib/userService";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ message: "User ID is required" });
  }

  try {
    // Step 1: Fetch related user IDs
    const relatedUserIds: string[] = await getEqualizedUserIds(userId);

    // Step 2: Equalize the user IDs (assuming it means fetching unique and sorted IDs)
    const equalizedUserIds: string[] = [...new Set(relatedUserIds)].sort();

    // Step 3: Fetch user information for each ID
    const userInfoList = await Promise.all(
      equalizedUserIds.map((id) => getUserInfo(id))
    );

    return res.status(200).json({ userInfoList });
  } catch (error) {
    console.error("Error fetching user information:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
