import {Table, TableHeader, TableRow, TableColumn, TableBody, TableCell} from "@heroui/table"
import { Input } from "@heroui/input"
import { useUsers } from "@/hooks/useUsers"
import { Pagination } from "@heroui/pagination"
import type { User } from "@/redux/users/sliceUsers"
import { useMemo, useState, useEffect } from "react"

export default function TableUsers() {
    const { users = [] } = useUsers();

    const svgSearch = (
        <svg className="w-[15px] h-[15px] flex-shrink-0" xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 376 384">
            <path fill="currentColor" d="m267 235l106 106l-32 32l-106-106v-17l-6-6q-39 33-90 33q-58 0-98.5-40.5T0 138.5t40.5-98t98-40.5t98 40.5T277 139q0 51-33 90l6 6h17zm-128 0q40 0 68-28t28-68t-28-68t-68-28t-68 28t-28 68t28 68t68 28z"/>
        </svg>
    )

    const [page, setPage] = useState(1);
    const [filterEmail, setFilterEmail] = useState("");
    const rowsPerPage = 10;

    const rows = useMemo(() => {
        if (!filterEmail) return users;
        const term = filterEmail.toLowerCase();
        return users.filter(u => (u.email || "").toLowerCase().includes(term));
    }, [users, filterEmail]);

    const pages = Math.max(1, Math.ceil(rows.length / rowsPerPage));

    const items = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        return rows.slice(start, end);
    }, [page, rows]);

    useEffect(() => {
        setPage(1);
    }, [filterEmail]);

    return (
        <div className="flex flex-col items-center w-full min-h-screen overflow-x-hidden">
            <div className="w-full border-b border-black/10">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 px-4 md:px-6 lg:px-8 py-4 sm:py-6 max-w-full">
                    <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-black to-gray-600 bg-clip-text text-transparent tracking-wider">
                        Usuarios
                    </h1>
                    <Input
                        className="w-full sm:w-auto sm:max-w-[280px] bg-white/90"
                        placeholder="Buscar por email"
                        startContent={svgSearch}
                        value={filterEmail}
                        onChange={(e) => setFilterEmail((e.target as HTMLInputElement).value)}
                        size="sm"
                    />
                </div>
            </div>

            <div className="w-95/100 px-4 md:px-6 lg:px-8 max-w-[calc(100vw-2rem)] md:max-w-[calc(100vw-3rem)] lg:max-w-[calc(100vw-4rem)] mt-24">
                <div className="w-full overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
                    <Table
                        className="w-full"
                        removeWrapper
                        aria-label="Tabla de usuarios"
                        bottomContent={
                            pages > 1 ? (
                                <div className="flex w-full justify-center py-4 px-2">
                                    <Pagination
                                        isCompact
                                        showControls
                                        showShadow
                                        color="primary"
                                        page={page}
                                        total={pages}
                                        onChange={(page) => setPage(page)}
                                        size="sm"
                                    />
                                </div>
                            ) : null
                        }
                        classNames={{
                            base: "overflow-visible",
                            table: "min-w-[600px]",
                            thead: "[&>tr]:first:bg-gray-50",
                            th: "bg-gray-50 text-xs font-semibold uppercase tracking-wider py-3 px-3",
                            td: "py-3 px-3",
                        }}
                    >
                        <TableHeader>
                            <TableColumn className="min-w-[100px]">
                                <div className="text-left">NOMBRE</div>
                            </TableColumn>
                            <TableColumn className="min-w-[100px]">
                                <div className="text-left">APELLIDO</div>
                            </TableColumn>
                            <TableColumn className="min-w-[160px]">
                                <div className="text-left">EMAIL</div>
                            </TableColumn>
                            <TableColumn className="min-w-[70px]">
                                <div className="text-center">EDAD</div>
                            </TableColumn>
                            <TableColumn className="min-w-[80px]">
                                <div className="text-center">ROL</div>
                            </TableColumn>
                        </TableHeader>
                        <TableBody 
                            emptyContent={
                                <div className="text-center py-8 text-gray-500">
                                    {filterEmail 
                                        ? "No se encontraron usuarios con ese email" 
                                        : "No hay usuarios para mostrar"}
                                </div>
                            } 
                            items={items}
                        >
                            {(item: User) => (
                                <TableRow 
                                    key={item.email}
                                    className="hover:bg-gray-50 transition-colors"
                                >
                                    <TableCell className="text-left">
                                        <div className="truncate max-w-[120px] font-medium">
                                            {item.name}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-left">
                                        <div className="truncate max-w-[120px] font-medium">
                                            {item.lastName}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-left">
                                        <div className="truncate max-w-[180px] text-gray-600">
                                            {item.email}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <span className="inline-flex items-center justify-center text-sm">
                                            {(item as any).edad ?? (item as any).age ?? '-'}
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <span className={`inline-flex items-center justify-center px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                                            item.isAdmin 
                                                ? 'bg-blue-100 text-blue-800' 
                                                : 'bg-gray-100 text-gray-800'
                                        }`}>
                                            {item.isAdmin ? 'Admin' : 'User'}
                                        </span>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    )
}