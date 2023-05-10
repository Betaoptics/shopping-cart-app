import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";

const productAdapater = createEntityAdapter({
    sortComparer: (a, b) => (a.completed === b.completed) ? 0 : a.completed ? 1 : -1
})

const initialState = productAdapater.getInitialState()

export const ProductApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getProduct: builder.query({
            query: () => ({
                url: '/catalog',
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError
                },
            }),
            transformResponse: responseData => {
                const loadedProduct = responseData.map(product => {
                    product.id = product._id
                    return product
                });
                return productAdapater.setAll(initialState, loadedProduct)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Product', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Product', id }))
                    ]
                } else return [{ type: 'Product', id: 'LIST' }]
            }
        }),
        addNewProduct: builder.mutation({
            query: initialProduct => ({
                url: '/catalog',
                method: 'POST',
                body: {
                    ...initialProduct,
                }
            }),
            invalidatesTags: [
                { type: 'Product', id: "LIST" }
            ]
        }),
        updateProduct: builder.mutation({
            query: initialProduct => ({
                url: '/catalog',
                method: 'PATCH',
                body: {
                    ...initialProduct,
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Product', id: arg.id }
            ]
        }),
        deleteProduct: builder.mutation({
            query: ({ id }) => ({
                url: `/catalog`,
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Product', id: arg.id }
            ]
        }),
    }),
})

export const {
    useGetProductQuery,
    useAddNewProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation,
} = ProductApiSlice

// returns the query result object
export const selectProductResult = ProductApiSlice.endpoints.getProduct.select()

// creates memoized selector
const selectProductData = createSelector(
    selectProductResult,
    ProductResult => ProductResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllProducts,
    selectById: selectProductById,
    selectIds: selectProductIds
    // Pass in a selector that returns the product slice of state
} = productAdapater.getSelectors(state => selectProductData(state) ?? initialState)