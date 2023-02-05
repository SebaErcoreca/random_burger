import productsServices from '../services/products.db.services.js';

export async function getProducts(req, res) {
    try {
        const {limit, sort, page, category} = req.query;
        const options = {
            limit: limit? Number(limit) : 10,
            page: page? Number(page) : 1,
            ...(sort && { sort: {price: sort} }),
            ...(category && { category }),
            lean: true
        }

        let query= {};
        if (category) query = {category: category};

        const paginatedData = await productsServices.getProducts(query, options);

        if (paginatedData) {
            res.status(200).json({
                success: true,
                data: paginatedData.docs
            })
        } else {
            res.status(404).json({
                success: false,
                message: 'Products not found'
            });
        }
    } catch (error) {
        res.status(500).json({ Error: error.message });
    }
};

export async function getProduct(req, res) {
    try {
        const { productID } = req.params;
        const product = await productsServices.getProduct(productID);

        if (product) {
            res.status(200).json({
                success: true,
                data: product
            });
        } else {
            res.status(404).json({
                success: false,
                message: 'Product not found. Check ID.'
            });
        }
    } catch (error) {
        res.status(500).json({ Error: error.message });
    }
};

export async function createProduct(req, res) {
    try {
        const product = req.body;
        const newProduct = await productsServices.createProduct(product);
        
        res.status(201).json({
            success: true,
            message: `Product created successfully. New product's ID is ${newProduct._id}.`,
            data: newProduct
        });
    } catch (error) {
        res.status(500).json({ Error: error.message });
    }
};

export async function updateProduct(req, res) {
    try {
        const { productID } = req.params;
        const product = req.body;
        const updatedProduct = await productsServices.updateProduct(productID, product);
        res.status(200).json({
            success: true,
            message: `Product ${productID} updated successfully.`,
            data: updatedProduct
        });
    } catch (error) {
        res.status(500).json({ Error: error.message });
    }
};

export async function deleteProduct(req, res) {
    try {
        const { productID } = req.params;
        await productsServices.deleteProduct(productID);
        res.status(200).json({
            success: true,
            message: `Product ${productID} deleted successfully.`,
        });
    } catch (error) {
        res.status(500).json({ Error: error.message });
    }
}