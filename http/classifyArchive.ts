import axios from "axios"


export const classifyArchive = async (formData: FormData) => {
  const response = axios.post("http://localhost:8000/classify", formData);
  return response;
}