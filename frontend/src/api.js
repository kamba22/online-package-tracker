// src/api.js
import axios from 'axios';

/*const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});*/

export const createPackage= async(packageData) =>{
  try{
    const response = await axios.post("http://localhost:5000/api/Package/", packageData);
    return response.data;
  } catch(error){
    console.error("Error creating package:", error.response?.data || error.message);
    return null;
  }
}
export default api;

  