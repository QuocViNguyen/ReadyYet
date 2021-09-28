import axios from 'axios';

export async function addOrder(data){
    const result = await axios.post('http://localhost:4000/add-order', {
        firstname : data.firstname,
        lastname : data.lastname,
        email : data.email,
        phonenumber : data.phonenumber,
        pickuptime : data.pickuptime,
        description : data.description
    });
}