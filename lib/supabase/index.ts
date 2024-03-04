import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";

export async function createSupbaseServerClientReadOnly() {
  const cookieStore = cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );
}
// export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
// export async function setupRealTimeListeners(supabase: SupabaseClient) {
//   // Subscription for 'Admin_permission' table
//   const subscriptionAdminPermission = supabase
//     .channel("schema-db-changes")
//     .on(
//       "postgres_changes",
//       {
//         event: "*",
//         schema: "public",
//         table: "Admin_permission",
//       },
//       (payload) => {
//         console.log("Change detected in Admin_permission:", payload);
//       }
//     )
//     .subscribe();

//   // Subscription for 'admin' table
//   const subscriptionAdmin = supabase
//     .channel("schema-db-changes")
//     .on(
//       "postgres_changes",
//       {
//         event: "*",
//         schema: "public",
//         table: "admin",
//       },
//       (payload) => {
//         console.log("Change detected in admin:", payload);
//       }
//     )
//     .subscribe();

//   // Return both subscriptions if you need to manage them later
//   return { subscriptionAdminPermission, subscriptionAdmin };
// }

export async function createSupbaseServerClient() {
  const cookieStore = cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          cookieStore.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          cookieStore.set({ name, value: "", ...options });
        },
      },
    }
  );
}

export async function createSupbaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SERVICE_ROLE!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
}
export async function createSupbaseRecuiter() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
}
