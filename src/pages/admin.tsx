import {useUsers} from "@/hooks/useUsers";
import NavLat from "@/components/common/NavLat";
import TableUsers from "@/components/admin/TableUsers";

export default function Admin() {
    useUsers();
    return (
        <div className="flex flex-row overflow-x-hidden">
            <NavLat currentPageName="Usuarios" />
            <main className="flex-1 md:pl-64 pb-16 md:pb-0">
                <TableUsers />
            </main>
        </div>
    )
}