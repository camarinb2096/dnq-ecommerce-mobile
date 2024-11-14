import axios from 'axios';

const API_URL = "https://dnq-backend-v1.onrender.com"

const getProducts = async () => {
    return new Promise((resolve, reject) => {
        axios.get(API_URL + '/api/v1/products/?page=1&pageSize=5')
            .then((res) => {
                resolve(res.data)
            })
            .catch((err) => {
                reject(err)
            });
    });
};

const getProductById = async (id) => {
    return new Promise((resolve, reject) => {
        axios.get(API_URL + '/api/v1/products/' + id)
            .then((res) => {
                resolve(res.data)
            })
            .catch((err) => {
                reject(err)
            });
    });
};

export { getProducts, getProductById }