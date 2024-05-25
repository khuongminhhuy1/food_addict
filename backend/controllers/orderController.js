import { PrismaClient } from "@prisma/client";

const prisma = PrismaClient();
// Function to create an order with shipping information
export async function createOrderWithShipping(
  userId,
  productId,
  quantity,
  totalPrice,
  shippingInfo
) {
  try {
    // Create order
    const order = await prisma.order.create({
      data: {
        user: { connect: { id: userId } },
        product: { connect: { id: productId } },
        quantity: quantity,
        totalPrice: totalPrice,
      },
    });

    // Create shipping information entries
    const shippingInfoEntries = [];
    for (const info of shippingInfo) {
      const shipping = await prisma.shippingInfo.create({
        data: {
          order: { connect: { id: order.id } },
          address: info.address,
          city: info.city,
          state: info.state,
          country: info.country,
          pinCode: info.pinCode,
          phoneNumber: info.phoneNumber,
        },
      });
      shippingInfoEntries.push(shipping);
    }

    // Return the created order
    return order;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
}
