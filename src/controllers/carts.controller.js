import cartsServices from "../services/carts.db.services.js";



export async function createCart(req, res) {
    try {
        const cartData = req.body;
        const newCart = await cartsServices.createCart(cartData);
        res.status(201).json({
            success: true,
            message: `${newCart.products.length > 0 ?
                `New cart created with ${newCart.products.length} products.` :
                `New empty cart successfully created.`} New cart's ID is ${newCart._id}.`,
            cart: newCart
        });
    } catch (error) {
        res.status(500).json({ Error: error.message });
    }
};

export async function getCart(req, res) {
    try {
        const { cartID } = req.params;
        const cart = await cartsServices.getCart(cartID);
        res.status(200).json({
            success: true,
            data: cart
        });
    }
    catch (error) {
        res.status(500).json({ Error: error.message });
    }
};

export async function deleteCart(req, res) {
    try {
        const { cartID } = req.params;
        /* Returns an empty cart */
        await cartsServices.deleteCart(cartID);
        res.status(200).json({
            success: true,
            message: `Cart ${cartID} was emptied`
        });
    } catch (error) {
        res.status(500).json({ Error: error.message });
    }
};

export async function addProductToCart(req, res) {
    try {
        const { cartID, productID } = req.params;
        const { quantity } = req.body;

        if (quantity <= 0) {
            res.status(400).json({
                success: false,
                message: `Invalid quantity.`
            });
        }
        const cart = await cartsServices.addProductToCart(cartID, productID, Number(quantity));
        if (cart) {
            res.status(200).json({
                success: true,
                message: `Product ${productID} added to cart ${cart._id}`,
                data: cart
            });
        } else {
            res.status(404).json({
                success: false,
                message: `Product ${productID} not found.`
            });
        }
    } catch (error) {
        res.status(500).json({ Error: error.message });
    }
}

export async function deleteProductFromCart(req, res) {
    try {
        const { cartID, productID } = req.params;
        console.log(cartID, productID);
        const cart = await cartsServices.deleteProductFromCart(cartID, productID);
        if (cart) {
            res.status(200).json({
                success: true,
                message: `Product ${productID} deleted from cart ${cartID}`,
                data: cart
            });
        } else {
            res.status(404).json({
                success: false,
                message: `Product ${productID} not found in cart ${cartID} or cart ${cartID} not found.`
            });
        }
    } catch (error) {
        res.status(500).json({ Error: error.message });
    }
}

export async function updateCart(req, res) {
    try {
        const { products } = req.body;
        const { cartID } = req.params;
        const updatedCart = await cartsServices.updateCart(cartID, products);
        if (updatedCart) {
            res.status(200).json({
                success: true,
                message: `Cart ${cartID} updated.`,
                data: updatedCart
            });
        } else {
            res.status(404).json({
                success: false,
                message: `Cart ${cartID} not found.`
            });
        }
    } catch (error) {
        res.status(500).json({ Error: error.message });
    }
}

export async function updateQuantity(req, res) {
    try {
        const { cartID, productID } = req.params;
        const { quantity } = req.body;
        const updatedCart = await cartsServices.updateQuantity(cartID, productID, Number(quantity));
        if (updatedCart) {
            res.status(200).json({
                success: true,
                message: `Product ${productID} quantity updated to ${quantity} in cart ${cartID}`,
                data: updatedCart
            });
        } else {
            res.status(404).json({
                success: false,
                message: `Product ${productID} not found in cart ${cartID} or cart ${cartID} not found.`
            });
        }
    } catch (error) {
        res.status(500).json({ Error: error.message });
    }
}

export async function getCartID(req, res) {
    try {
        const cartID = req.session.user.cart._id;

        res.status(200).json({
            success: true,
            cartID
        });

    } catch (error) {
        res.status(500).json({ Error: error.message });
    }
}