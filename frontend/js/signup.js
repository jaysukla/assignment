console.log(1);
document.getElementById("rform").addEventListener("submit", async function(event) {
    event.preventDefault(); // Prevent form submission

    const fullname = document.getElementById("fullname").value;
    const email = document.getElementById("inputEmail").value;
    const password = document.getElementById("inputPassword").value;
    const dob = document.getElementById("dob").value;

    let data = {
        fullname,
        email,
        password,
        dob,
    };

    console.log(data);

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:5050/signup", true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 300) {
            console.log("Response from server:");
            console.log(JSON.parse(xhr.responseText));
           document.getElementById("invalid").innerText = "Success";
            document.getElementById("invalid").style.color="green";
         

        } else {
            console.error("Error:", xhr.responseText);
            document.getElementById("invalid").innerText = xhr.responseText;
        }
    };

    xhr.onerror = function() {
        console.error("Request failed");
    };

    xhr.send(JSON.stringify(data));
});
