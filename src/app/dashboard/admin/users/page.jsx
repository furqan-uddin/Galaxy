"use client";

import { useEffect, useState } from "react";
import { apiRequest } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function AdminUsersPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (!loading && (!user || user.role !== "ADMIN")) {
      router.push("/dashboard");
    }
  }, [user, loading, router]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await apiRequest("/admin/users");
      setUsers(data.users);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const updateRole = async (userId, role) => {
    try {
      await apiRequest("/admin/users/update-role", {
        method: "POST",
        body: JSON.stringify({ userId, role }),
      });
      toast.success("Role updated");
      fetchUsers();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const deleteUser = async (userId) => {
    if (!confirm("Are you sure?")) return;

    try {
      await apiRequest("/admin/users/delete", {
        method: "POST",
        body: JSON.stringify({ userId }),
      });
      toast.success("User deleted");
      fetchUsers();
    } catch (err) {
      toast.error(err.message);
    }
  };

  if (!user || user.role !== "ADMIN") return null;

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">User Management</h1>

      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Email</th>
            <th className="border p-2">Role</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td className="border p-2">{u.email}</td>
              <td className="border p-2">{u.role}</td>
              <td className="border p-2 space-x-2">
                <button
                  onClick={() => updateRole(u.id, "MANAGER")}
                  className="text-blue-600"
                >
                  Make Manager
                </button>
                <button
                  onClick={() => deleteUser(u.id)}
                  className="text-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
