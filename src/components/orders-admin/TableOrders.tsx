import {Table, TableHeader, TableRow, TableColumn, TableBody, TableCell} from "@heroui/table"

import { Pagination } from "@heroui/pagination"

import { useMemo, useState } from "react"

import { useOrders } from "@/hooks/useOrders"


import { RootState } from "@/redux/store"

import { useSelector } from "react-redux";

import { Button } from "@heroui/button"

import { useModal } from "@/hooks/useModal"

import ModalUpdateStateOrder from "./modalUpdateStateOrder"

export interface DeleteProdSizeModalProps {
    id: string | null;
}

export default function TableOrders() {
    useOrders();
    const [selectId, setSelectId] = useState<string | null>(null);

    const svgEdit = (
        <svg className="w-[10px] h-[10px] flex-shrink-0" xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 384 384">
            <path fill="currentColor" d="M0 304L236 68l80 80L80 384H0v-80zM378 86l-39 39l-80-80l39-39q6-6 15-6t15 6l50 50q6 6 6 15t-6 15z"/>
        </svg>
    )


    const ordersState = useSelector((state: RootState) => state.order.orders || []);
    const usersState = useSelector((state: RootState) => state.users.users || []);
    const productsState = useSelector((state: RootState) => state.products.products || []);
    const [page, setPage] = useState(1);
    const rowsPerPage = 10;
    const {onOpen: onOpenEditStateOrder} = useModal('modalUpdateStateOrder');

    const rows = useMemo(() => {
        const productMap = new Map((productsState || []).map((p: any) => [p._id || p.id, p]));
        const userMap = new Map((usersState || []).map((u: any) => [u._id || u.id || u.email, u]));

        const result: any[] = [];
        const orderIndexMap = new Map<string, number>();
        let nextOrderIndex = 1;

        (ordersState || []).forEach((order: any, oi: number) => {
            const orderId = order._id || order.id || `order-${oi}`;
            if (!orderIndexMap.has(orderId)) {
                orderIndexMap.set(orderId, nextOrderIndex++);
            }
            const orderNumber = orderIndexMap.get(orderId) as number;
            const user = typeof order.userId === 'object' ? order.userId : (userMap.get(order.userId) || {});
            const email = user?.email || order.email || '';
            const createdAt = order.createdAt || order.created_at || order.created || '';
            const status = order.status || 'Pending';

            (order.products || []).forEach((p: any, pi: number) => {
                const product: any = productMap.get(p.productId) || {};
                const productName = (p.productId && typeof p.productId === 'object' && p.productId.name)
                    ? p.productId.name
                    : (product.name || p.name || '');
                result.push({
                    key: `${orderId}-${pi}`,
                    orderId,
                    orderNumber,
                    productName,
                    email,
                    quantity: p.quantity,
                    size: p.size,
                    price: p.price,
                    totalAmount: order.totalAmount || order.total_amount || 0,
                    address: order.address || '',
                    city: order.city || '',
                    postalCode: order.postalCode || order.postal_code || '',
                    phone: order.phone || '',
                    status,
                    createdAt,
                });
            });
        });

        return result;
    }, [ordersState, usersState, productsState]);

    const pages = Math.max(1, Math.ceil(rows.length / rowsPerPage));

    const items = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        return rows.slice(start, end);
    }, [page, rows]);

    return (
        <div className="flex flex-col items-center w-full min-h-screen overflow-x-hidden">
                    <div className="w-full border-b border-black/10">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 px-4 md:px-6 lg:px-8 py-4 sm:py-6 max-w-full">
                    <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-black to-gray-600 bg-clip-text text-transparent tracking-wider">
                        Pedidos
                    </h1>
                </div>
            </div>

                    <div className="w-95/100 px-4 md:px-6 lg:px-8 max-w-[calc(100vw-2rem)] md:max-w-[calc(100vw-3rem)] lg:max-w-[calc(100vw-4rem)] mt-24">
                    <div className="w-full overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
                        <Table
                            className="w-full"
                            removeWrapper
                            aria-label="Tabla de productos"
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
                                <TableColumn className="min-w-[120px]"><div className="text-left">PEDIDO #</div></TableColumn>
                                <TableColumn className="min-w-[160px]"><div className="text-left">PRODUCTO</div></TableColumn>
                                <TableColumn className="min-w-[160px]"><div className="text-left">EMAIL USUARIO</div></TableColumn>
                                <TableColumn className="min-w-[80px]"><div className="text-left">CANT.</div></TableColumn>
                                <TableColumn className="min-w-[80px]"><div className="text-left">TALLE</div></TableColumn>
                                <TableColumn className="min-w-[100px]"><div className="text-left">PRECIO</div></TableColumn>
                                <TableColumn className="min-w-[120px]"><div className="text-left">TOTAL PEDIDO</div></TableColumn>
                                <TableColumn className="min-w-[160px]"><div className="text-left">DIRECCIÓN</div></TableColumn>
                                <TableColumn className="min-w-[120px]"><div className="text-left">CIUDAD</div></TableColumn>
                                <TableColumn className="min-w-[120px]"><div className="text-left">CÓDIGO POSTAL</div></TableColumn>
                                <TableColumn className="min-w-[140px]"><div className="text-left">TELÉFONO</div></TableColumn>
                                <TableColumn className="min-w-[120px]"><div className="text-left">ESTADO</div></TableColumn>
                                <TableColumn className="min-w-[160px]"><div className="text-left">CREADO</div></TableColumn>
                                <TableColumn className="min-w-[80px]"><div className="text-center">ACCIONES</div></TableColumn>
                            </TableHeader>
                            <TableBody
                                emptyContent={
                                    <div className="text-center py-8 text-gray-500">No hay pedidos para mostrar</div>
                                }
                                items={items}
                            >
                                {(item: any) => (
                                    <TableRow key={item.key} className="hover:bg-gray-50 transition-colors">
                                        <TableCell className="text-left">
                                            <div className="truncate max-w-[140px] font-medium" title={String(item.orderNumber ?? item.orderId)}>{item.orderNumber ?? item.orderId}</div>
                                        </TableCell>
                                        <TableCell className="text-left">
                                            <div className="truncate max-w-[160px] font-medium" title={item.productName || '-'}>{item.productName || '-'}</div>
                                        </TableCell>
                                        <TableCell className="text-left">
                                            <div className="truncate max-w-[160px] text-gray-600" title={item.email || '-'}>{item.email || '-'}</div>
                                        </TableCell>
                                        <TableCell className="text-left">{item.quantity}</TableCell>
                                        <TableCell className="text-left">{item.size}</TableCell>
                                        <TableCell className="text-left">{item.price ? `$${Number(item.price).toLocaleString()}` : '-'}</TableCell>
                                        <TableCell className="text-left">{item.totalAmount ? `$${Number(item.totalAmount).toLocaleString()}` : '-'}</TableCell>
                                        <TableCell className="text-left"><div title={item.address || '-'} className="truncate max-w-[160px]">{item.address || '-'}</div></TableCell>
                                        <TableCell className="text-left"><div title={item.city || '-'} className="truncate max-w-[120px]">{item.city || '-'}</div></TableCell>
                                        <TableCell className="text-left"><div title={item.postalCode || '-'} className="truncate max-w-[120px]">{item.postalCode || '-'}</div></TableCell>
                                        <TableCell className="text-left"><div title={item.phone || '-'} className="truncate max-w-[140px]">{item.phone || '-'}</div></TableCell>
                                        <TableCell className="text-left"><div title={item.status || '-'} className="truncate max-w-[120px]">{item.status || '-'}</div></TableCell>
                                        <TableCell className="text-left">{item.createdAt ? new Date(item.createdAt).toLocaleString() : ''}</TableCell>
                                        <TableCell className="text-center">
                                            <div className="flex flex-row justify-center items-center gap-2">
                                                <Button onPress={() => {
                                                    const idToSet = (item as any).orderId || null;
                                                    console.debug('TableOrders - Open update state modal for order:', idToSet);
                                                    setSelectId(idToSet);
                                                    onOpenEditStateOrder();
                                                }} 
                                                title="Editar" isIconOnly variant="solid" color="warning" className="text-white">
                                                    {svgEdit}
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                        <ModalUpdateStateOrder id_order={selectId}></ModalUpdateStateOrder>
                    </div>
                </div>
                
            </div>
            )
}