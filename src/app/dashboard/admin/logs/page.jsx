"use client";

import { useEffect, useState } from "react";
import { apiRequest } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function AdminLogsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    if (!loading && (!user || user.role !== "ADMIN")) {
      router.push("/dashboard");
    }
  }, [user, loading, router]);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    const data = await apiRequest("/admin/logs");
    setLogs(data.logs);
  };

  if (!user || user.role !== "ADMIN") return null;

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Activity Logs</h1>

      <ul className="space-y-2">
        {logs.map((log) => (
          <li key={log.id} className="border p-2">
            <strong>{log.user?.email}</strong> — {log.action}
          </li>
        ))}
      </ul>
    </div>
  );
}
