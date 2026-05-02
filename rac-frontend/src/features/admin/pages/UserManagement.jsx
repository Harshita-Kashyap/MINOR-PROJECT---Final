import { useEffect, useMemo, useState } from "react";
import Header from "../../landing/components/Header";
import AdminNavbar from "../components/AdminNavbar";
import Card from "../../../shared/components/ui/Card";
import Button from "../../../shared/components/ui/Button";
import Input from "../../../shared/components/ui/Input";
import {
    getAdminUsers,
    createAdminUser,
    updateAdminUserStatus,
    deleteAdminUser,
} from "../services/adminService";

const initialForm = {
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "selector",
};

function UserManagement() {
    const [users, setUsers] = useState([]);
    const [form, setForm] = useState(initialForm);
    const [search, setSearch] = useState("");
    const [roleFilter, setRoleFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [loading, setLoading] = useState(true);
    const [creating, setCreating] = useState(false);
    const [error, setError] = useState("");

    const fetchUsers = async () => {
        try {
            setLoading(true);
            setError("");

            const params = {};
            if (roleFilter) params.role = roleFilter;
            if (statusFilter) params.status = statusFilter;

            const res = await getAdminUsers(params);
            setUsers(Array.isArray(res.data?.users) ? res.data.users : []);
        } catch (error) {
            console.error("Fetch users error:", error);
            setError("Failed to load users");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, [roleFilter, statusFilter]);

    const filteredUsers = useMemo(() => {
        if (!search.trim()) return users;

        const keyword = search.toLowerCase();

        return users.filter(
            (user) =>
                user.name?.toLowerCase().includes(keyword) ||
                user.email?.toLowerCase().includes(keyword) ||
                user.phone?.toLowerCase().includes(keyword)
        );
    }, [users, search]);

    const counts = {
        total: users.length,
        applicants: users.filter((u) => u.role === "applicant").length,
        selectors: users.filter((u) => u.role === "selector").length,
        admins: users.filter((u) => u.role === "admin").length,
        active: users.filter((u) => u.isActive).length,
    };

    const handleCreate = async (e) => {
        e.preventDefault();

        if (!form.name || !form.email || !form.phone || !form.password) {
            alert("Name, email, phone, and password are required");
            return;
        }

        try {
            setCreating(true);
            const res = await createAdminUser(form);
            const created = res.data?.user;

            if (created) {
                setUsers((prev) => [created, ...prev]);
            }

            setForm(initialForm);
            alert("User created successfully");
        } catch (error) {
            console.error("Create user error:", error);
            alert(error.response?.data?.message || "Failed to create user");
        } finally {
            setCreating(false);
        }
    };

    const handleStatusToggle = async (user) => {
        try {
            const res = await updateAdminUserStatus(user._id, !user.isActive);
            const updated = res.data?.user;

            setUsers((prev) =>
                prev.map((item) => (item._id === user._id ? updated : item))
            );
        } catch (error) {
            console.error("Update status error:", error);
            alert(error.response?.data?.message || "Failed to update user status");
        }
    };


    const handleDeleteUser = async (user) => {
        const confirmDelete = window.confirm(
            `Are you sure you want to delete ${user.name}? This action cannot be undone.`
        );

        if (!confirmDelete) return;

        try {
            await deleteAdminUser(user._id);
            setUsers((prev) => prev.filter((item) => item._id !== user._id));
        } catch (error) {
            console.error("Delete user error:", error);
            alert(error.response?.data?.message || "Failed to delete user");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-100 via-gray-100 to-gray-200 dark:from-[#030712] dark:via-[#0b1220] dark:to-[#111827]">
            <Header />
            <AdminNavbar />

            <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                <div className="space-y-6">
                    <section>
                        <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                            User Management
                        </h1>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            View users and create selector/admin accounts for system access.
                        </p>
                    </section>

                    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
                        <MetricCard title="Total Users" value={counts.total} />
                        <MetricCard title="Applicants" value={counts.applicants} />
                        <MetricCard title="Selectors" value={counts.selectors} tone="info" />
                        <MetricCard title="Admins" value={counts.admins} tone="warning" />
                        <MetricCard title="Active" value={counts.active} tone="success" />
                    </section>

                    <Card>
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                            Create User
                        </h2>

                        <form onSubmit={handleCreate} className="mt-5 grid gap-4 lg:grid-cols-6">
                            <Input
                                placeholder="Full name"
                                value={form.name}
                                onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                            />

                            <Input
                                placeholder="Email"
                                value={form.email}
                                onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                            />

                            <Input
                                placeholder="Phone"
                                value={form.phone}
                                onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
                            />

                            <Input
                                placeholder="Password"
                                type="password"
                                value={form.password}
                                onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))}
                            />

                            <Select
                                value={form.role}
                                onChange={(value) => setForm((p) => ({ ...p, role: value }))}
                                options={[
                                    ["applicant", "Applicant"],
                                    ["selector", "Selector"],
                                    ["admin", "Admin"],
                                ]}
                            />

                            <Button type="submit" disabled={creating}>
                                {creating ? "Creating..." : "Create"}
                            </Button>
                        </form>
                    </Card>

                    <Card>
                        <div className="grid gap-4 md:grid-cols-3">
                            <Input
                                placeholder="Search name, email, phone..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />

                            <Select
                                value={roleFilter}
                                onChange={setRoleFilter}
                                options={[
                                    ["", "All Roles"],
                                    ["applicant", "Applicant"],
                                    ["selector", "Selector"],
                                    ["admin", "Admin"],
                                ]}
                            />

                            <Select
                                value={statusFilter}
                                onChange={setStatusFilter}
                                options={[
                                    ["", "All Status"],
                                    ["active", "Active"],
                                    ["inactive", "Inactive"],
                                ]}
                            />
                        </div>
                    </Card>

                    {error && (
                        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                            {error}
                        </div>
                    )}

                    <Card className="overflow-hidden p-0">
                        {loading ? (
                            <div className="p-10 text-center text-gray-500">Loading users...</div>
                        ) : filteredUsers.length === 0 ? (
                            <div className="p-10 text-center text-gray-500">No users found.</div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full min-w-[1050px] text-left">
                                    <thead className="bg-gray-100 text-sm text-gray-700 dark:bg-gray-800 dark:text-gray-200">
                                        <tr>
                                            <th className="p-4">Name</th>
                                            <th className="p-4">Email</th>
                                            <th className="p-4">Phone</th>
                                            <th className="p-4">Role</th>
                                            <th className="p-4">Status</th>
                                            <th className="p-4">Created</th>
                                            <th className="p-4 text-center">Actions</th>
                                        </tr>
                                    </thead>

                                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                        {filteredUsers.map((user) => (
                                            <tr key={user._id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                                                <td className="p-4 font-medium text-gray-800 dark:text-gray-100">
                                                    {user.name}
                                                </td>

                                                <td className="p-4 text-gray-600 dark:text-gray-300">
                                                    {user.email}
                                                </td>

                                                <td className="p-4 text-gray-600 dark:text-gray-300">
                                                    {user.phone}
                                                </td>

                                                <td className="p-4">
                                                    <RolePill role={user.role} />
                                                </td>

                                                <td className="p-4">
                                                    <StatusPill active={user.isActive} />
                                                </td>

                                                <td className="p-4 text-gray-600 dark:text-gray-300">
                                                    {formatDate(user.createdAt)}
                                                </td>

                                                <td className="p-4">
                                                    <div className="flex flex-wrap justify-center gap-2">
                                                        <Button
                                                            size="sm"
                                                            variant={user.isActive ? "danger" : "secondary"}
                                                            onClick={() => handleStatusToggle(user)}
                                                        >
                                                            {user.isActive ? "Deactivate" : "Activate"}
                                                        </Button>

                                                        <Button
                                                            size="sm"
                                                            variant="danger"
                                                            onClick={() => handleDeleteUser(user)}
                                                        >
                                                            Delete
                                                        </Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </Card>
                </div>
            </main>
        </div>
    );
}

function Select({ value, onChange, options }) {
    return (
        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-sm dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
        >
            {options.map(([val, label]) => (
                <option key={val || "all"} value={val}>
                    {label}
                </option>
            ))}
        </select>
    );
}

function RolePill({ role }) {
  const map = {
    applicant:
      "bg-gray-100 text-gray-700 dark:bg-gray-700/70 dark:text-gray-200",
    selector:
      "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
    admin:
      "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
  };

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
        map[role] || map.applicant
      }`}
    >
      {role || "applicant"}
    </span>
  );
}

function StatusPill({ active }) {
    return (
        <span
            className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${active
                ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300"
                }`}
        >
            {active ? "Active" : "Inactive"}
        </span>
    );
}

function MetricCard({ title, value, tone }) {
    const toneMap = {
        default: "from-gray-50 to-white dark:from-gray-900 dark:to-gray-800",
        info: "from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-gray-800",
        warning: "from-amber-50 to-yellow-50 dark:from-amber-950/30 dark:to-gray-800",
        success: "from-green-50 to-emerald-50 dark:from-emerald-950/30 dark:to-gray-800",
    };

    return (
        <Card className={`bg-gradient-to-br ${toneMap[tone || "default"]}`}>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                {title}
            </p>
            <h3 className="mt-3 text-3xl font-bold text-gray-900 dark:text-gray-100">
                {value}
            </h3>
        </Card>
    );
}

function formatDate(date) {
    if (!date) return "-";
    return new Date(date).toLocaleDateString("en-GB");
}

export default UserManagement;