import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import AdminDashboardClient from "./AdminDashboardClient";
import getServerUser from "@/lib/auth-server";

async function AdminPage() {
  const user = await getServerUser()

  // user is not logged in
  if (!user) redirect("/");


  const userEmail = user?.email;

  // user is not the admin
  if (!userEmail?.includes('admin@gmail.com')) redirect("/dashboard");

  return <AdminDashboardClient />;
}

export default AdminPage;
