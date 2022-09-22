'use strict';

const btnFoto = document.querySelector('#btnFoto');

let widget_cloudinary = cloudinary.createUploadWidget({
    cloudName: 'daxw5llgw',
    uploadPreset: 'recetario'
  }, (error, result) => {
    if (!error && result && result.event === "success") {
      console.log('Done! Here is the image info: ', result.info);
      debugger
       imagen.src = result.info.url;
    }
  }
  )

  document.getElementById("btnFoto").addEventListener("click", function () {
    widget_cloudinary.open();
  }, false);