import Product from "../../models/Product";
import { ADD_PRODUCT, DELETE_PRODUCT, FETCH_PRODUCTS, UPDATE_PRODUCT } from "./actions";

const initialState = {
    products : []
}


export const productReducer = (state=initialState,action) => {

    

    switch (action.type) {
        
        case ADD_PRODUCT:
            const id = action.productData.id;
            const title = action.productData.title;
            const price = action.productData.price;
            const image = action.productData.image;
            const description = action.productData.description; 

      
            const newProduct = new Product(id,title,price,image,description)
       
            return {
                products:state.products.concat(newProduct)
            }
        case FETCH_PRODUCTS:
            return {
                products: action.products
            }    
        case DELETE_PRODUCT:
            const productId= action.productId;
            const updatedProducts = state.products.filter(product => product._id !==  productId)
            return {
                products:updatedProducts
             } 
        
        case UPDATE_PRODUCT:
            const prodId = action.id;
            const updatePr =[...state.products]
            const selectedProductIndex = state.products.findIndex(p => p._id===prodId)
            const newUpdateProduct = new Product(prodId,action.productData.title,action.productData.price,action.productData.image,action.productData.description)
            updatePr[selectedProductIndex] = newUpdateProduct;
            
            return {
               products:updatePr
            }    

            
        

            
    
        default:
            return state;
    }
}