(function (root, factory) {
  root.HELPERS = factory();
})(this, function () {
  function getGDriveImgById(id) {
    return `https://drive.google.com/uc?export=view&id=${id}`;
  }

  function getGDriveImgByLink(link) {
    const [, idSide] = link.split("d/");
    const [id] = idSide.split("/");
    return getGDriveImgById(id);
  }

  function getFavIconFromId(id) {
    return `https://drive.google.com/uc?id=${id}&export=download&format=png`;
  }

  function getFavIconFromLink(link) {
    const [, idSide] = link.split("d/");
    const [id] = idSide.split("/");
    return getFavIconFromId(id);
  }

  function getWhatsappLink(number) {
    return `https://wa.me/${number}`;
  }

  function getEmailLink(email) {
    return `mailto:${email}`;
  }

  function convertImageToDataUri(link) {
    const [, idSide] = link.split("d/");
    const [fileId] = idSide.split("/");
    // var fileId = 'YOUR_FILE_ID_HERE'; // Replace with your Google Drive file ID
    var file = DriveApp.getFileById(fileId);
    var blob = file.getBlob();
    var contentType = blob.getContentType();
    var base64Data = Utilities.base64Encode(blob.getBytes());
    var dataUri = 'data:' + contentType + ';base64,' + base64Data;
    console.log(dataUri)
    return dataUri
    // You can now use this data URI as needed in your application
  }


  return {
    getFavIconFromLink,
    getGDriveImgById,
    getGDriveImgByLink,
    convertImageToDataUri,
    getWhatsappLink,
    getEmailLink,
  };
});

function convertImageToDataUri(link){
  return HELPERS.convertImageToDataUri(link)
}
