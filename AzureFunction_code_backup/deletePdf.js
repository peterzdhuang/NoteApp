const { BlobServiceClient } = require("@azure/storage-blob");
const { TableClient, AzureNamedKeyCredential } = require("@azure/data-tables");

module.exports = async function (context, req) {
    const accountName = process.env["STORAGE_ACCOUNT_NAME"];
    const accountKey = process.env["STORAGE_ACCOUNT_KEY"];

    if (!accountName || !accountKey) {
        context.res = {
            status: 500,
            body: "Storage account name or key is missing."
        };
        return;
    }

    const blobServiceClient = BlobServiceClient.fromConnectionString(process.env["AzureWebJobsStorage"]);
    const containerClient = blobServiceClient.getContainerClient("pdfblob");

    const fileName = req.query.name;

    if (!fileName) {
        context.res = {
            status: 400,
            body: "Please provide a file name."
        };
        return;
    }

    try {
        // Delete the PDF from Blob Storage
        const blockBlobClient = containerClient.getBlockBlobClient(fileName);
        await blockBlobClient.deleteIfExists();

        // Delete the metadata from Table Storage
        const tableName = "pdfMetadata";
        const credential = new AzureNamedKeyCredential(accountName, accountKey);
        const tableClient = new TableClient(`https://${accountName}.table.core.windows.net`, tableName, credential);

        await tableClient.deleteEntity("pdf", fileName);

        context.res = {
            status: 200,
            body: "File and metadata deleted successfully."
        };
    } catch (error) {
        context.log.error("Error deleting file:", error.message);
        context.res = {
            status: 500,
            body: "Error deleting file."
        };
    }
};
