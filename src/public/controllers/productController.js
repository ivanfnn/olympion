import productModel from '../models/product.model.js';

class ProductController {
    getProducts = async (req, res) => {
        try {
            const { limit = 10, page = 1, sort, query, category, status } = req.query;

            
            const validLimit = Math.max(1, parseInt(limit) || 10);
            const validPage = Math.max(1, parseInt(page) || 1);

            const filters = {};
            if (query) filters.title = { $regex: query, $options: 'i' };
            if (category) filters.category = category;
            if (status !== undefined) filters.status = status === 'true' || status === true;

            const products = await productModel
                .find(filters)
                .sort(sort ? { price: sort === 'asc' ? 1 : -1 } : {})
                .skip((validPage - 1) * validLimit)
                .limit(validLimit)
                .lean();

            const totalProducts = await productModel.countDocuments(filters);
            const totalPages = Math.ceil(totalProducts / validLimit);
            const hasPrevPage = validPage > 1;
            const hasNextPage = validPage < totalPages;

            res.status(200).json({
                status: 'success',
                payload: products,
                totalPages,
                prevPage: hasPrevPage ? validPage - 1 : null,
                nextPage: hasNextPage ? validPage + 1 : null,
                page: validPage,
                hasPrevPage,
                hasNextPage,
                prevLink: hasPrevPage ? `/api/products?limit=${validLimit}&page=${validPage - 1}` : null,
                nextLink: hasNextPage ? `/api/products?limit=${validLimit}&page=${validPage + 1}` : null,
            });
        } catch (err) {
            res.status(500).json({ status: 'error', message: err.message, stack: err.stack });
        }
    };
}

export default ProductController;
