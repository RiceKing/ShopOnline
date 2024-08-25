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
}

export interface QueryProducts {
    priceMin: locationQueryValue | string | number | undefined,
    priceMax: locationQueryValue | string | number | undefined,
    categoryId: locationQueryValue | string | number | undefined,
}