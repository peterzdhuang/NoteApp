const { BlobServiceClient } = require("@azure/storage-blob");

module.exports = async function (context, req) {
    const blobServiceClient = BlobServiceClient.fromConnectionString(process.env["AzureWebJobsStorage"]);
    const containerClient = blobServiceClient.getContainerClient("pdfblob");

    const file = req.body;
    const fileName = req.query.name;

    if (!file || !fileName) {
        context.res = {
            status: 400,
            body: "Please provide a file and a name."
        };
        return;
    }

    try {
        const blockBlobClient = containerClient.getBlockBlobClient(fileName);
        await blockBlobClient.uploadData(file);

        context.res = {
            status: 200,
            body: "File uploaded successfully."
        };
    } catch (error) {
        context.log.error("Error uploading file:", error.message);
        context.res = {
            status: 500,
            body: "Error uploading file."
        };
    }
};
