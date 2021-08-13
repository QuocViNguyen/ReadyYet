import axios from 'axios';


export async function getPharmacies(){
    const pharmacies = await axios.get('http://localhost:4000/getPharmacies');
    return pharmacies;
}