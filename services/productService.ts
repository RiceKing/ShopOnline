import type {Product, Category, QueryProducts} from "@/types/product"



export const fetchProducts = async (query: QueryProducts): Promise<Product[]> => {
    try {
        const queryString = new URLSearchParams();

        if (query.priceMin !== undefined) {
            queryString.append('price_min', String(query.priceMin));
        }
        if (query.priceMax !== undefined) {
            queryString.append('price_max', String(query.priceMax));
        }
        if (query.categoryId !== undefined) {
            queryString.append('categoryId', String(query.categoryId));
        }

        const response = await fetch(`https://api.escuelajs.co/api/v1/products?${queryString.toString()}`);

        if (!response.ok) {
            throw new Error('Ошибка загрузки https://api.escuelajs.co/api/v1/products');
        }

        const products: Product[] = await response.json();
        return products;
    } catch (error) {
        console.error('Ошибка загрузки https://api.escuelajs.co/api/v1/products:', error);
        throw error;
    }
};

export const fetchCategories = async (): Promise<Category[]> => {
    try {   
        const response = await fetch('https://api.escuelajs.co/api/v1/categories');

        if(!response.ok) {
            throw new Error('Ошибка загрузки https://api.escuelajs.co/api/v1/categories')
        }
        
        const categories: Category[] = await response.json();
        return categories;
    } catch (error) {
        console.error('Ошибка загрузки https://api.escuelajs.co/api/v1/categories:', error)
        throw error;
    }
};

