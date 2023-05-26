import Axios from "axios"

const axios = Axios.create({
    baseURL: "https://ecommerce-be-361s.onrender.com/"
})

export default axios