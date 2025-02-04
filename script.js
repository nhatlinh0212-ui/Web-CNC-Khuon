function showAlert() {
    alert("Bạn đã nhấn vào nút!");
}

function showPasswordForm() {
    document.getElementById("password-form").style.display = "block";
}

function checkPassword() {
    const password = document.getElementById("password-input").value;
    if (password === "2002") {
        document.getElementById("password-form").style.display = "none";
        document.getElementById("content").style.display = "block";
        listFiles(); // Call listFiles when the password is correct
        startPolling(); // Start polling for file changes
    } else {
        alert("Mật khẩu không đúng!");
    }
}

function listFiles() {
    gapi.client.drive.files.list({
        'q': "'1VLnOPj2HBuTfjDp5RAheFOpNEjmqAdDD' in parents and mimeType='text/plain'",
        'fields': 'files(id, name)'
    }).then(function(response) {
        const files = response.result.files;
        const fileList = document.getElementById("file-list");
        fileList.innerHTML = '';
        if (files && files.length > 0) {
            files.forEach(function(file) {
                const li = document.createElement("li");
                li.textContent = file.name;
                fileList.appendChild(li);
            });
        } else {
            fileList.innerHTML = '<li>No files found.</li>';
        }
    });
}

function initClient() {
    gapi.client.init({
        'apiKey': 'AIzaSyBjjnUx4Hu-xBMqNBeLllL1JJR9pl9lhac', // Replace with your actual API key
        'clientId': '1095891064471-6rnn7bkukmr2alr9vje7p1sbg6dunem9.apps.googleusercontent.com', // Replace with your actual client ID
        'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'],
        'scope': 'https://www.googleapis.com/auth/drive.readonly'
    }).then(function () {
        listFiles();
    });
}

function handleClientLoad() {
    gapi.load('client:auth2', initClient);
}

function startPolling() {
    setInterval(listFiles, 1000); //60000); // Refresh the file list every 60 seconds
}


