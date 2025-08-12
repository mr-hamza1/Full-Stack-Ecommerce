import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const productAPI = createApi({
    reducerPath: "productAPI",
    baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/product/` }),
    tagTypes: ["products"],
      endpoints: (builder) => ({
        latestProducts: builder.query({
            query: () => {
                return {
                    url: "latest",
                    credentials: "include",
                };
            },
            providesTags: ["products"],
        }),
        allProducts: builder.query({
            query: (id) => {
                return {
                    url: `admin-products?id=${id}`,
                    credentials: "include",
                };
            },
            providesTags: ["products"],
        }),
        productDetails: builder.query({
            query: (id) => {
                return {
                    url: `${id}`,
                    credentials: "include",
                };
            },
            providesTags: ["products"],
        }),
        categories: builder.query({
            query: () => {
                return {
                    url: `categories`,
                    credentials: "include",
                };
            },
            providesTags: ["products"],
        }),
searchProducts: builder.query({
  query: ({ minPrice, maxPrice, brands, featureds, page, category, search }) => {
    const params = new URLSearchParams();

    if (search) params.append("search", search);
    if (page) params.append("page", page);
    if (maxPrice) params.append("maxPrice", maxPrice);
    if (minPrice) params.append("minPrice", minPrice);

    // ✅ Proper array handling for brands
    if (Array.isArray(brands) && brands.length > 0) {
      brands.forEach((b) => params.append("brands", b));
    } 

    if (Array.isArray(featureds) && featureds.length > 0) {
      featureds.forEach((f) => params.append("featureds", f));
    } 

    if (category) params.append("category", category);

    return {
      url: `all?${params.toString()}`,
      credentials: "include",
    };
  },
  providesTags: ["products"],
}),

        newProduct: builder.mutation({
            query: ({formData, id}) => {
                return {
                    url: `new?id=${id}`,
                    method: "POST",
                    body: formData,
                    credentials: "include",
                };
            },
            invalidateTags: ["products"],           
        }),
        updateProduct: builder.mutation({
            query: ({formData, id, userId}) => {
                return {
                    url: `${id}?id=${userId}`,
                    method: "PUT",
                    body: formData,
                    credentials: "include",
                };
            },
            invalidateTags: ["products"],           
        }),
        deleteProduct: builder.mutation({
            query: ({id, userId}) => {
                return {
                    url: `${id}?id=${userId}`,
                    method: "DELETE",
                    credentials: "include",
                };
            },
            invalidateTags: ["products"],           
        }),

        deleteCartItem: builder.mutation({
            query: ({id, userId}) => {
                return {
                    url: `deleteCart?id=${id}&userId=${userId}`,
                    method: "DELETE",
                    credentials: "include",
                };
            },
            invalidateTags: ["products"],           
        }),
addToWishlist: builder.mutation({
    query: ({ userId, wishlist, productId }) => {
        return {
            url: `wish`,
            method: "POST",
            body: {
                userId,
                wishlist,
                productId
            },
            credentials: "include",
        };
    },
    invalidateTags: ["products"],           
}),

addToCart: builder.mutation({
    query: ({ userId, productId }) => {
        return {
            url: `cart`,
            method: "POST",
            body: {
                userId,
                productId
            },
            credentials: "include",
        };
    },
    invalidateTags: ["products"],           
}),


        favourites: builder.query({
            
            query: ({id, userId}) => {
                let base = `fav?userId=${userId}`;
               id? base = `fav?productId=${id}` :`fav`

                return {
                    url:  base,
                    credentials: "include",
                };
            },
            providesTags: ["products"],
        }),

        cartPrducts: builder.query({
            
            query: ({productId, userId}) => {
                let base = `cartProducts?userId=${userId}`;
              if (productId) base = `cartProducts?productId=${productId}&userId=${userId}`;
                return {
                    url:  base,
                    credentials: "include",
                };
            },
            providesTags: ["products"],
        }),

       
    }),
});

export const { 
               useLatestProductsQuery, 
               useAllProductsQuery, 
               useCategoriesQuery, 
               useSearchProductsQuery,
               useNewProductMutation,
               useProductDetailsQuery,
               useUpdateProductMutation,
               useDeleteProductMutation,
               useAddToWishlistMutation,
               useFavouritesQuery,
               useAddToCartMutation,
               useCartPrductsQuery,
               useDeleteCartItemMutation,
            } = productAPI;
