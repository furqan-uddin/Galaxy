"use client";

import { useEffect, useState } from "react";
import { apiRequest } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { BackButton } from "@/components/ui/back-button";

export default function AdminLogsPage() {
    const { user, loading } = useAuth();
    const router = useRouter();

    const [logs, setLogs] = useState([]);
    const [filter, setFilter] = useState("");
    const [pagination, setPagination] = useState({ page: 1, totalPages: 1, total: 0 });

    useEffect(() => {
        if (!loading && (!user || user.role !== "ADMIN")) {
            router.push("/dashboard");
        }
    }, [user, loading, router]);

    useEffect(() => {
        if (user?.role === "ADMIN") {
            fetchLogs();
        }
    }, [user, pagination.page]);

    const fetchLogs = async (actionFilter = filter) => {
        try {
            const data = await apiRequest(
                `/admin/logs?action=${encodeURIComponent(actionFilter)}&page=${pagination.page}&limit=20`
            );
            setLogs(data.logs);
            setPagination(prev => ({
                ...prev,
                totalPages: data.pagination.totalPages,
                total: data.pagination.total,
            }));
        } catch (err) {
            toast.error(err.message);
        }
    };

    const handleFilter = (e) => {
        e.preventDefault();
        setPagination(prev => ({ ...prev, page: 1 }));
        fetchLogs(filter);
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleString();
    };

    if (!user || user.role !== "ADMIN") return null;



    return (
        <div className="p-6 space-y-6 bg-gray-50/50 min-h-screen">
            <BackButton />
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">System Logs</h1>
                    <p className="text-muted-foreground">Audit trail of all system activities</p>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <CardTitle>Activity Log</CardTitle>
                        <form onSubmit={handleFilter} className="flex w-full sm:w-auto gap-2">
                            <Input
                                placeholder="Filter by action (e.g. LOGIN)..."
                                value={filter}
                                onChange={(e) => setFilter(e.target.value)}
                                className="max-w-xs"
                            />
                            <Button type="submit" variant="secondary">Filter</Button>
                            {filter && (
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => {
                                        setFilter("");
                                        fetchLogs("");
                                    }}
                                >
                                    Clear
                                </Button>
                            )}
                        </form>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Timestamp</TableHead>
                                    <TableHead>User / Email</TableHead>
                                    <TableHead>Role</TableHead>
                                    <TableHead>Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {logs.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={4} className="h-24 text-center text-muted-foreground">
                                            No activity logs found.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    logs.map((log) => (
                                        <TableRow key={log.id} className="hover:bg-gray-50/50">
                                            <TableCell className="text-sm text-muted-foreground whitespace-nowrap">
                                                {formatDate(log.createdAt)}
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex flex-col">
                                                    <span className="font-medium">{log.user?.name || "Unknown"}</span>
                                                    <span className="text-xs text-muted-foreground">{log.user?.email || "Deleted User"}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant="outline" className="text-xs font-normal">
                                                    {log.user?.role || "N/A"}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <Badge
                                                    variant="secondary"
                                                    className="font-mono text-xs"
                                                >
                                                    {log.action}
                                                </Badge>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>

                    {/* Pagination */}
                    <div className="flex items-center justify-between pt-4">
                        <p className="text-sm text-muted-foreground">
                            Showing {logs.length} of {pagination.total} logs
                        </p>
                        <div className="flex gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                disabled={pagination.page <= 1}
                                onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
                            >
                                Previous
                            </Button>
                            <div className="flex items-center px-2 text-sm font-medium">
                                Page {pagination.page} of {pagination.totalPages}
                            </div>
                            <Button
                                variant="outline"
                                size="sm"
                                disabled={pagination.page >= pagination.totalPages}
                                onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
                            >
                                Next
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

