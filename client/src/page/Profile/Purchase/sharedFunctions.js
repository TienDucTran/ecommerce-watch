import { getOrder } from "../../../redux/OrderAction";
import { userRequest } from "../../../requestMethods";

export const handlePayment = async (id, product,userId, dispatch) => {
try {
const res = await userRequest.put(`/orders/${id}`, {
    userId: product.userId,
    products: product.products.map((item) => ({
        productId: item.productId,
        productName: item.productName,
        quantity: item.quantity,
    })),
    amount: product.cartTotalAmount,
    name: product.name,
    phone: product.phone,
    address: product.address,
    status: "success",
    payment: "delivered",
    customer: "completed",
    });
    console.log(res);

// Lấy danh sách đơn hàng mới sau khi thanh toán
await getOrder(userId, dispatch);
} catch (error) {
console.error(error);
}
};

export const handleCancel = async (id, product,userId, dispatch) => {
try {
const res = await userRequest.put(`/orders/${id}`, {
    userId: product.userId,
    products: product.products.map((item) => ({
        productId: item.productId,
        productName: item.productName,
        quantity: item.quantity,
    })),
    amount: product.cartTotalAmount,
    name: product.name,
    phone: product.phone,
    address: product.address,
    status: "failed order",
    payment: "delivery failed",
    customer: "cancel",
    });
    console.log(res);

    // Lấy danh sách đơn hàng mới sau khi hủy
    await getOrder(userId, dispatch);
} catch (error) {
console.error(error);
}
};
