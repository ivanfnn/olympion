import productModel from './models/product.model.js';

class ProductController {
    getProducts = async (req, res) => {
        try {
            const { limit = 10, page = 1, sort, query } = req.query;

            const filters = {};
            if (query) {
                filters.title = { $regex: query, $options: 'i' }; 
            }

            const products = await productModel
                .find(filters)
                .sort(sort ? { price: sort === 'asc' ? 1 : -1 } : {})
                .skip((page - 1) * limit)
                .limit(limit)
                .lean();

            const totalProducts = await productModel.countDocuments(filters);
            const totalPages = Math.ceil(totalProducts / limit);
            const hasPrevPage = page > 1;
            const hasNextPage = page < totalPages;

            res.status(200).json({
                status: 'success',
                payload: products,
                totalPages,
                prevPage: hasPrevPage ? page - 1 : null,
                nextPage: hasNextPage ? page + 1 : null,
                page: parseInt(page),
                hasPrevPage,
                hasNextPage,
                prevLink: hasPrevPage ? `/api/products?limit=${limit}&page=${page - 1}` : null,
                nextLink: hasNextPage ? `/api/products?limit=${limit}&page=${page + 1}` : null
            });
        } catch (err) {
            res.status(500).json({ status: 'error', message: err.message });
        }
    }
}

export default ProductController;
