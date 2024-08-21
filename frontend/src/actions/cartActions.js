import axios from "axios"
import { addCartItemRequest, addCartItemSuccess } from "../Slices/cartSlice"
let BASE_Url='http://52.64.175.239:8080';

export  const AddCartItem=(id,quantity)=> async (dispatch)=>{
    try{
        dispatch(addCartItemRequest())


        let {data}=await axios.get(`${BASE_Url}/cart/product/${id}`)

        dispatch(addCartItemSuccess(
            {
            product:data.product._id,
            name:data.product.name,
            price:data.product.price,
            image:data.product.images[0].image,
            stock:data.product.stock,
            quantity

            }
        ))



    }
    catch(error){

    }

}