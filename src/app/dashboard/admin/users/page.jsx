"use client";

import { useEffect, useState } from "react";
import { apiRequest } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export default function AdminUsersPage() {
    const { user, loading } = useAuth();
    const router = useRouter();

    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [pagination, setPagination] = useState({ page: 1, totalPages: 1, total: 0 });

    // Create user form
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [newUser, setNewUser] = useState({ name: "", email: "", password: "", role: "USER" });
    const [creating, setCreating] = useState(false);

    useEffect(() => {
        if (!loading && (!user || user.role !== "ADMIN")) {
            router.push("/dashboard");
        }
    }, [user, loading, router]);

    useEffect(() => {
        if (user?.role === "ADMIN") {
            fetchUsers();
        }
    }, [user, pagination.page]);

    const fetchUsers = async (searchTerm = search) => {
        try {
            const data = await apiRequest(
                `/admin/users?search=${encodeURIComponent(searchTerm)}&page=${pagination.page}&limit=10`
            );
            setUsers(data.users);
            setPagination(prev => ({
                ...prev,
                totalPages: data.pagination.totalPages,
                total: data.pagination.total,
            }));
        } catch (err) {
            toast.error(err.message);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        setPagination(prev => ({ ...prev, page: 1 }));
        fetchUsers(search);
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
        if (!confirm("Are you sure you want to delete this user?")) return;

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

    const createUser = async (e) => {
        e.preventDefault();
        setCreating(true);

        try {
            await apiRequest("/admin/users", {
                method: "POST",
                body: JSON.stringify(newUser),
            });
            toast.success("User created successfully");
            setNewUser({ name: "", email: "", password: "", role: "USER" });
            setShowCreateForm(false);
            fetchUsers();
        } catch (err) {
            toast.error(err.message);
        } finally {
            setCreating(false);
        }
    };

    if (!user || user.role !== "ADMIN") return null;

    return (
        <div className="p-6 space-y-6 bg-gray-50/50 min-h-screen">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">User Management</h1>
                    <p className="text-muted-foreground">Manage system users, roles, and permissions</p>
                </div>
                <Button onClick={() => setShowCreateForm(!showCreateForm)}>
                    {showCreateForm ? "Cancel" : "Create New User"}
                </Button>
            </div>

            {/* Create User Form */}
            {showCreateForm && (
                <Card className="border-l-4 border-l-primary animate-in fade-in slide-in-from-top-4">
                    <CardHeader>
                        <CardTitle>Create New User</CardTitle>
                        <CardDescription>Add a new user to the system manually</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={createUser} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Full Name</Label>
                                    <Input
                                        id="name"
                                        placeholder="John Doe"
                                        value={newUser.name}
                                        onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email Address</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="john@example.com"
                                        value={newUser.email}
                                        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="password">Password</Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        placeholder="Min. 6 characters"
                                        value={newUser.password}
                                        onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                                        required
                                        minLength={6}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="role">Role</Label>
                                    <Select
                                        value={newUser.role}
                                        onValueChange={(val) => setNewUser({ ...newUser, role: val })}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select role" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="USER">User</SelectItem>
                                            <SelectItem value="MANAGER">Manager</SelectItem>
                                            <SelectItem value="ADMIN">Admin</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <div className="flex justify-end pt-2">
                                <Button type="submit" disabled={creating}>
                                    {creating ? "Creating..." : "Create User"}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            )}

            <Card>
                <CardHeader>
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <CardTitle>Users Directory</CardTitle>
                        <form onSubmit={handleSearch} className="flex w-full sm:w-auto gap-2">
                            <Input
                                placeholder="Search by name or email..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="max-w-xs"
                            />
                            <Button type="submit" variant="secondary">Search</Button>
                            {search && (
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => {
                                        setSearch("");
                                        fetchUsers("");
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
                                    <TableHead>User Details</TableHead>
                                    <TableHead>Role</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {users.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={4} className="h-24 text-center text-muted-foreground">
                                            No users found.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    users.map((u) => (
                                        <TableRow key={u.id}>
                                            <TableCell>
                                                <div className="flex flex-col">
                                                    <span className="font-medium">{u.name}</span>
                                                    <span className="text-sm text-gray-500">{u.email}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant={
                                                    u.role === "ADMIN" ? "destructive" :
                                                        u.role === "MANAGER" ? "default" :
                                                            "secondary"
                                                }>
                                                    {u.role}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                {u.isEmailVerified ? (
                                                    <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
                                                        Verified
                                                    </Badge>
                                                ) : (
                                                    <Badge variant="outline" className="text-amber-600 border-amber-200 bg-amber-50">
                                                        Pending
                                                    </Badge>
                                                )}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end items-center gap-2">
                                                    <Select
                                                        value={u.role}
                                                        onValueChange={(val) => updateRole(u.id, val)}
                                                    >
                                                        <SelectTrigger className="w-[110px] h-8">
                                                            <SelectValue />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="USER">User</SelectItem>
                                                            <SelectItem value="MANAGER">Manager</SelectItem>
                                                            <SelectItem value="ADMIN">Admin</SelectItem>
                                                        </SelectContent>
                                                    </Select>

                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => deleteUser(u.id)}
                                                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                                    >
                                                        Delete
                                                    </Button>
                                                </div>
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
                            Showing {users.length} of {pagination.total} users
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

