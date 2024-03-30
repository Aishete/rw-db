import localForage from "localforage";
import { readUserSession } from "@/lib/actions";
import { redirect } from "next/navigation";

const fetchUserMetadata = async () => {
  try {
    const { data: userSession } = await readUserSession();
    const user_metadata = {
      name: userSession.session?.user.user_metadata.name,
      email: userSession.session?.user.user_metadata.email,
      role: userSession.session?.user.user_metadata.role,
    };
    await localForage.setItem("user_metadata", user_metadata);
    return user_metadata;
  } catch (error) {
    console.error("Error fetching user metadata:", error);
  }
};

export { fetchUserMetadata }; // Exporting the function instead of default export
