document.getElementById("lform").addEventListener("submit", async function(event) {
  event.preventDefault(); // Prevent form submission

  // Retrieve input values
  var email = document.getElementById("inputEmail").value;
  var password = document.getElementById("inputPassword").value;

  // Prepare data object
  let data = {
      email: email,
      password: password
  };

  // Send data to server
  try {
      const response = await fetch('http://localhost:5050/login', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
      });

      // Check if request was successful
      if (response.ok) {
          const responseData = await response.json();
          console.log('Response:', responseData);
          
          if (responseData.msg === 'login success') {
              // Redirect to index.html
              window.location.href = 'index.html';
          } else {
              // Handle other response messages
          }
      } else {
          console.error('Error:', response.statusText);
          // Handle error here
      }
  } catch (error) {
      console.error('Error:', error);
      // Handle error here
  }
});
