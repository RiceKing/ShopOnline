export interface Category {
    id: number;
    name: string;
    image: string | null;
}

export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: Category; 
    images: string[]; 
    quantity: number;
}

export interface QueryProducts {
    priceMin: string | number | undefined
    priceMax: string | number | undefined
    categoryId: string | number | undefined
}