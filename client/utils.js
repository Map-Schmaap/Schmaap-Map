import axios from 'axios';

// send a POST request
axios({
  method: 'post',
  url: 'http: /login',
  data: {
    firstName: 'Finn',
    lastName: 'Williams',
  },
}).then((response) => {
  console.log(response.data);
});

export async function postData(url, data) {
  //   let user = {
  //     Id: 78912,
  //     Customer: "Jason Sweet",
  //     Quantity: 1
  //   };

  try {
    const response = await axios.post(url, data);
    console.log('Request successful!');
    console.log('Response: ', response.data);
    return response;
  } catch (error) {
    if (error.response) {
      console.log(error.reponse.status);
    } else {
      console.log(error.message);
    }
  }
}
