import React, { useReducer } from "react";
import * as actions from '../../store/product/actions'
import { useForm  } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {useHistory, useLocation, Redirect} from 'react-router-dom'

const INPUT_CHANGE="INPUT_CHANGE"



const reducer = (state,action) => {
    switch (action.type) {
        case INPUT_CHANGE:
            const {name,value} =action.payload
            return {
              ...state,
                [name]:value
            }
        default:
            return state;
    }

}




const AddProduct = () => {

  let History = useHistory();
  const params = useLocation()
  let productId ="";

  productId =params.state ? params.state.productId : ""
  const products = useSelector(state => state.products.products)
  const selectedProduct = products.find(product => product._id===productId)


  const initialState = {
    title : selectedProduct ? selectedProduct.title : "",
    price : selectedProduct ? selectedProduct.price : "",
    image : selectedProduct ? selectedProduct.image : "",
    description : selectedProduct ? selectedProduct.description : "",
}

    const {errors,register,handleSubmit} = useForm()

    const [state, dispatch] = useReducer(reducer, initialState)

    const dispatchRedux = useDispatch()

 


    const inputChangeHnadler =(name,value) => {
        dispatch({
            type :INPUT_CHANGE,
            payload: {
                name:name,
                value:value
            }
        })

    }


   const onSubmithandler = () => {
     if(productId) {
      dispatchRedux(actions.updateProduct(productId,state.title,state.price,state.image,state.description)).then(() => {
        History.push('/')
      })
     }
     else {
      dispatchRedux(actions.addProduct(state.title,state.price,state.image,state.description)).then(() => {
        History.push('/')
      })
      
     }
      
     
   }




  return (
    <div style={{maxWidth:600, margin:15}}>
      <form onSubmit={handleSubmit(onSubmithandler)}>
        <div className="form-group mb-2">
          <input
            type="text"
            ref={register({ required: true })}
            name="title"
            value={state.title}
            onChange={(e) => inputChangeHnadler("title",e.target.value)}
            className="form-control "
            placeholder="Enter title"
          />
          {errors.title && <p className="alert alert-danger mb-2 mt-2">This field is required</p>}
        </div>
        <div className="form-group mb-2">
          <input
            type="number"
            ref={register({ required: true })}
            name="price"
            value={state.price}
            onChange={(e) => inputChangeHnadler("price",e.target.value)}
            className="form-control"
            placeholder="Enter Price"
          />
           {errors.price && <p className="alert alert-danger mb-2 mt-2">This field is required</p>}
        </div>
        <div className="form-group mb-2">
          <input
            type="file"
            ref={register({ required: true })}
            name="image"
            onChange={(e) => inputChangeHnadler("image",e.target.files[0])}
            className="form-control"
          />
          {errors.image && <p className="alert alert-danger mb-2 mt-2">This field is required</p>}
        </div>
        <div className="form-group mb-2">
          <input
            type="text"
            ref={register({ required: true })}
            name="description"
            className="form-control"
            value={state.description}
            onChange={(e) => inputChangeHnadler("description",e.target.value)}
            placeholder="Enter description"
          />
            {errors.description && <p className="alert alert-danger mb-2 mt-2">This field is required</p>}
        </div>
        
        <button type="submit" className="btn btn-primary">
          {productId ? "EDIT PRODUCT" : "ADD PRODUCT"}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
