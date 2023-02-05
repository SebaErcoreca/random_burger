import productsServices from "../services/products.db.services.js";
import cartsServices from "../services/carts.db.services.js";

export async function login(req, res) {
    try {
        if (!req.session.logged) {
            return res.status(200).render('login');
        }
        return res.status(200).redirect('/products');
    } catch (error) {
        res.status(500).json({ Error: error.message });
    }
}

export async function registerUser(req, res) {
    try {
        res.status(200).render('register');
    } catch (error) {
        res.status(500).json({ Error: error.message });
    }
}

export async function getProducts(req, res) {
    try {
        const { limit, sort, page, category } = req.query;
        const options = {
            limit: limit ? Number(limit) : 10,
            page: page ? Number(page) : 1,
            ...(sort && { sort: { price: sort } }),
            ...(category && { category }),
            lean: true
        }

        let query = {};
        if (category) query = { category: category };

        const paginatedData = await productsServices.getProducts(query, options);

        const user = req.session.user;

        if (paginatedData) {
            res.status(200).render('products', { ...paginatedData, user })
        }
        else {
            res.status(404).json({ Error: "Products not found" })
        };
    } catch (error) {
        res.status(500).json({ Error: error.message });
    }
}

export async function getRealTimeProducts(req, res) {
    try {
        const paginatedData = await productsServices.getProducts({}, { lean: true });

        const user = req.session.user;

        if (paginatedData) {
            res.status(200).render('realTimeProducts', { ...paginatedData, user })
        }
        else {
            res.status(404).json({ Error: "Products not found" })
        };
    } catch (error) {
        res.status(500).json({ Error: error.message });
    }
}

export async function getCart(req, res) {
    try {
        const { cartID } = req.params;
        const cart = await cartsServices.getCart(cartID);

        const user = req.session.user;

        if (cart) {
            res.status(200).render('cart', { ...cart, user })
        }
        else {
            res.status(404).json({ Error: "Cart not found" })
        };
    } catch (error) {
        res.status(500).json({ Error: error.message });
    }
}

export async function getChat(req, res) {
    try {
        const user = req.session.user;
        res.status(200).render('chat', { user })
    } catch (error) {
        res.status(500).json({ Error: error.message });
    }
}

export async function getUserCenter(req, res) {
    try {
        const user = req.session.user;

        res.status(200).render('userCenter', { user })
    } catch (error) {
        res.status(500).json({ Error: error.message });
    }
}