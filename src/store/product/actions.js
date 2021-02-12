import { BASE_URL } from "../../config/config"

export const ADD_PRODUCT = "ADD_PRODUCT"
export const FETCH_PRODUCTS = "FETCH_PRODUCTS"
export const DELETE_PRODUCT = "DELETE_PRODUCT"
export const UPDATE_PRODUCT = "UPDATE_PRODUCT"
export const SEARCH_PRODUCT = "SEARCH_PRODUCT"





export const fetchProdcuts = () => {

    return async dispatch => {

        const response = await fetch(BASE_URL+"products", {
            method:"GET"
        })

        const resData = await response.json()

        dispatch({
            type:FETCH_PRODUCTS,
            products: resData.products
        })
    }
}



export const addProduct = (title,price,image,description) => {
    return async dispatch => {

    

        let formData = new FormData();
        formData.append("title",title)
        formData.append("price",price)
        formData.append("image",image)
        formData.append("description",description)

        const response = await fetch(BASE_URL+"product", {
            method:"POST",
            body:formData

        })

        const resData= await response.json()

        dispatch({
        type:ADD_PRODUCT,
        productData : {
            id:resData._id,
            title:resData.title,
            price:resData.price,
            image:resData.image,
            description:resData.description

        }
        })

    }
    
}


export const updateProduct = (productId,title,price,image,description) => {

    return async dispatch => {

        let formData = new FormData();
        formData.append("title",title)
        formData.append("price",price)
        formData.append("image",image)
        formData.append("description",description)

        const response = await fetch(BASE_URL+"product/"+productId, {
            method:"PUT",
            body : formData
        })

        const resData = await response.json()


        dispatch({
            type:UPDATE_PRODUCT,
            id:productId,
            productData : {
                title:resData.title,
                price:resData.price,
                image:resData.image,
                description:resData.description
    
            }
        })


    }

}

export  const deleteProduct = (productId) => {

    return async dispatch => {

        const response = await fetch(BASE_URL+"product/"+productId, {
            method:"DELETE"
        })
        console.log(response)
        const resData = await response.json()

        dispatch({
            type:DELETE_PRODUCT,
            productId:productId
        })

    }

}

export const searchProduct=(title)=> {
    return {
        type:SEARCH_PRODUCT,
        title:title
    }

}