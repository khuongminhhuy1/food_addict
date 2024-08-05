import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
// Function to create an order with shipping information

export async function addItemToCart(req, res) {
  const { userId, productId, quantity } = req.body;
  try {
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return res.status(404).send("Product not found");
    }
    const totalPrice = product.price * quantity;

    const order = await prisma.order.create({
      data: {
        userId,
        productId,
        quantity,
        totalPrice,
        orderId: Math.floor(Math.random() * 1000000),
      },
    });

    res.json(order);
  } catch (error) {
    res.status(500).send("Server error");
  }
}
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
