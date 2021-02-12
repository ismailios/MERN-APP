import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Product from './Product'
import * as actions from '../../store/product/actions'
const Products = () => {


    const products = useSelector(state => state.products.products)
    

    const dispatch = useDispatch()

        useEffect(() => {
            dispatch(actions.fetchProdcuts())
        }, [])



    return (
        <div className="d-flex m-2 flex-wrap">
             {products.map(product => {
                 return <Product key={product._id}  product={product}  />
             })}
            
        </div>
    )
}

export default Products
