import productsServices from "../services/products.db.services.js";

export async function getHome(req, res) { // Should be replaced by a real home view
    try {
        const paginatedData = await productsServices.getProducts({},{lean: true});
        res.status(200).render('index', paginatedData);
    } catch (error) {
        res.status(500).json({ Error: error.message });
    }
}

export async function getProducts(req, res) {
    try {
        const {limit, sort, page} = req.query;
        const options = {
            limit: limit? Number(limit) : 10,
            sort: sort? {price: sort} : {},
            page: page? Number(page) : 1,
            lean: true
        }
        let query = {}
        if (req.query.category) query.category = req.query.category;
        const paginatedData = await productsServices.getProducts(query, options);
        res.status(200).render('products', paginatedData)
    } catch (error) {
        res.status(500).json({ Error: error.message });
    }
}

export async function getRealTimeProducts(req, res) {
    try {
        const paginatedData = await productsServices.getProducts({},{lean: true});
        res.status(200).render('realTimeProducts', paginatedData)
    } catch (error) {
        res.status(500).json({ Error: error.message });
    }
}

export async function getChat(req, res) {
    try {
        res.status(200).render('chat')
    } catch (error) {
        res.status(500).json({ Error: error.message });
    }
}

