import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { router } from "../router/Routes";

const sleep = () => new Promise(resolve => setTimeout(resolve, 500))        // 500ms delay

axios.defaults.baseURL = 'http://localhost:5000/api/';                      // API base URL
axios.defaults.withCredentials = true;                                      // Send cookies with every request

const responseBody = (response: AxiosResponse) => response.data;            // Get response body

axios.interceptors.response.use(async response => {                         // Interceptor to handle errors
    await sleep();                                                    // Delay response
    return response         
}, (error: AxiosError) => {                                            // Handle errors
    const {data, status} = error.response as AxiosResponse;       // Get response data and status
    switch (status) {                                            // Handle errors
        case 400:                                        // Bad request
            if (data.errors) {      
                const modelStateErrors: string[] = [];      //
                for (const key in data.errors) {
                    if (data.errors[key]) {     
                        modelStateErrors.push(data.errors[key])
                    }
                }
                throw modelStateErrors.flat();
            }
            toast.error(data.title);        
            break;
        case 401:                                 // Unauthorised
            toast.error(data.title);
            break;
        case 500:                          // Server error
            router.navigate('/server-error', {state: {error: data}});
            break;
        default:                  // Other errors
            break;
    }

    return Promise.reject(error.response);      // Reject promise
})

const requests = {                                // Request methods
    get: (url: string) => axios.get(url).then(responseBody),        // Get request
    post: (url: string, body: {}) => axios.post(url, body).then(responseBody),      // Post request
    put: (url: string, body: {}) => axios.put(url, body).then(responseBody),        // Put request
    del: (url: string) => axios.delete(url).then(responseBody)      // Delete request
}

const Catalog = {                          // Catalog API
    list: () => requests.get('products'),       // Get all products
    details: (id: number) => requests.get(`products/${id}`)     // Get product details
}

const TestErrors = {                // Test errors API
    get400Error: () => requests.get('buggy/bad-request'),       // Get 400 error
    get401Error: () => requests.get('buggy/unauthorised'),      // Get 401 error
    get404Error: () => requests.get('buggy/not-found'),     // Get 404 error
    get500Error: () => requests.get('buggy/server-error'),      // Get 500 error
    getValidationError: () => requests.get('buggy/validation-error')    // Get validation error
}

const Basket = {        // Basket API
    get: () => requests.get('basket'),      // Get basket
    addItem: (productId: number, quantity = 1) => requests.post(`basket?productId=${productId}&quantity=${quantity}`, {}),      // Add item to basket
    removeItem: (productId: number, quantity = 1) => requests.del(`basket?productId=${productId}&quantity=${quantity}`)     // Remove item from basket
}

const agent = {     // Export all API methods
    Catalog,        // Export Catalog API
    TestErrors,     // Export Test errors API
    Basket          // Export Basket API
}

export default agent;       