// The client makes a POST request to the server sending the user details.

const handleSubmit = async(url = '', data = {}) => {
  console.log(data);
  const response = await fetch("http://localhost:8081"+url, {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
          'Content-Type': 'application/json',
      },
      // Body data type must match "Content-Type" header        
      body: JSON.stringify(data),
  });
  try {
      const newData = await response.json();
      console.log(newData);
      return newData;
  } catch (error) {
      console.log("error", error);
  }
}

async function updateUi(e) {
  const request = await fetch('http://localhost:8081/all');
  try {
      const allData = await request.json();
      console.log(allData);
      if(city.value.length < 1){
        pic.innerHTML = `<img src="${allData.img}" alt="City Img">`;
        weather.innerHTML = ` You'll arrive in Narnia in less than twelve parsecs!
        <br>${allData.weather} is waiting for you
        <br><img src="https://www.weatherbit.io/static/img/icons/${allData.icon}.png" alt="weather icon">`;
        error.innerHTML = `Please introduce a valid city and date.`;
      }else{
        pic.innerHTML = `<img src="${allData.img}" alt="City Img">`;
        weather.innerHTML = ` You'll arrive in ${allData.place} in ${allData.daysDiff} days
        <br>${allData.weather} is waiting for you
        <br><img src="https://www.weatherbit.io/static/img/icons/${allData.icon}.png" alt="weather icon">
        <br>Temperature will be ${allData.temp} &#176C`;
        error.innerHTML = ``;
      }
  } catch (error) {
      console.log("Something went wrong!", error);
      error.innerHTML = `Something went wrong!`;
  }
}
export { updateUi,
  handleSubmit
};