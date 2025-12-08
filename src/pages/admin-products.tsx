import NavLat from "@/components/common/NavLat";

export default function AdminProducts() {
    return (
        <div className="flex flex-row overflow-x-hidden">
            <NavLat currentPageName="Productos" />
            <main className="flex-1 md:pl-64 pb-16 md:pb-0">
                <h2>Esta va a ser la pagina de productos</h2>
            </main>
        </div>
    )
}