import ProductModel from '../dao/models/products.model.js';
import webSocketService from './websocket.services.js';

class ProductsServices {
    
    async createProduct(data) {
        try {
            const newProduct = await ProductModel.create(data);
            const productsList = await this.getProducts(); 
            webSocketService.io.emit('reloadList', productsList);

            return newProduct;
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async getProducts(query, options) {
        try {
            query = {deleted: false, ...query};
            const paginatedList = await ProductModel.paginate(query, options);

            webSocketService.io.emit('reloadList', paginatedList.docs);
            
            const newData = {
                ...paginatedList,
                options: {...options}
            } 
            return newData;
        } catch (error) {
            throw new Error(error.message)
        }
    }
    
    async getProduct(productID) {
        try {
            const product = await ProductModel.findById(productID).lean();
            return product;
        } catch (error) {
            throw new Error(error.message)
        }
    }
    
    async updateProduct(productID, data) {
        try {
            const updatedProduct = await ProductModel.findByIdAndUpdate(productID, data, {new: true}).lean();
            
            const productsList = await this.getProducts();
            webSocketService.io.emit('reloadList', productsList);

            return updatedProduct;
        } catch (error) {
            throw new Error(error.message)
        }
    }
    
    async deleteProduct(productID) {
        try {
            await ProductModel.deleteById(productID);

            const productsList = await this.getProducts();
            webSocketService.io.emit('reloadList', productsList);

        } catch (error) {
            throw new Error(error.message)
        }
    }
}

const productsServices = new ProductsServices();
export default productsServices;