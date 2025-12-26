function showSection(sectionId) {
    let sections = ["textSection", "websiteSection", "imageSection"];
    sections.forEach(id => {
        document.getElementById(id).style.display = "none";
    });
    document.getElementById(sectionId).style.display = "block";
}

function generateTextQR() {
    let text = document.getElementById("qrText").value.trim();
    let qrImage = document.getElementById("textQRImage");
    if (text !== "") {
        qrImage.src = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data="
         + encodeURIComponent(text);
    }
}

function generateWebsiteQR() {
    let url = document.getElementById("websiteInput").value.trim();
    let qrImage = document.getElementById("websiteQRImage");
    if (url !== "") {
        qrImage.src = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data="
         + encodeURIComponent(url);
    }
} 


async function generateImageQR(fileInputId, qrImageId) {
    let fileInput = document.getElementById(fileInputId).files[0];
    let qrImage = document.getElementById(qrImageId);

    if (!fileInput) {
        alert("Please select an image file.");
        return;
    }

    let formData = new FormData();
    formData.append("image", fileInput);

    let response = await fetch("https://api.imgur.com/3/upload", {
        method: "POST",
        headers: {
            Authorization: "Client-ID 451c89df78fbc8a"
        },
        body: formData
    });

    let data = await response.json();

    if (data.success) {
        let fileUrl = data.data.link;
        qrImage.src = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" + encodeURIComponent(fileUrl);
    } else {
        alert("Image upload failed: " + data.data.error);
    }
}
//delete qr code

function deleteQR(qrImageId, inputId) {
    document.getElementById(qrImageId).src = "";
    document.getElementById(inputId).value = "";
}

//share qr code

// function shareContent() {
//     if (navigator.share) {
//       navigator.share({
//         title: 'Check this out!',
//         text: 'This is an awesome website!',
//         url: window.location.href
//       })
//       .then(() => console.log('Thanks for sharing!'))
//       .catch((error) => console.log('Error sharing:', error));
//     } else {
//       alert('Web Share API not supported in your browser.');
//     }
//   }

