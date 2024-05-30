const { BlobServiceClient } = require("@azure/storage-blob");
const { TableClient, AzureNamedKeyCredential } = require("@azure/data-tables");

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

        const accountName = process.env["STORAGE_ACCOUNT_NAME"];
        const accountKey = process.env["STORAGE_ACCOUNT_KEY"];

        // Log the values to verify they are being read correctly
        context.log(`Account Name: ${accountName}`);
        context.log(`Account Key: ${accountKey}`);

        if (!accountName || !accountKey) {
            throw new Error("Storage account name or key is missing.");
        }

        const tableName = "pdfMetadata";
        const credential = new AzureNamedKeyCredential(accountName, accountKey);
        const tableClient = new TableClient(`https://${accountName}.table.core.windows.net`, tableName, credential);

        const metadata = {
            partitionKey: "pdf",
            rowKey: fileName,
            fileName: fileName,
            url: blockBlobClient.url,
            uploadDate: new Date().toISOString()
        };

        await tableClient.createEntity(metadata);

        context.res = {
            status: 200,
            body: "File uploaded and metadata stored successfully."
        };
    } catch (error) {
        context.log.error("Error uploading file:", error.message);
        context.res = {
            status: 500,
            body: "Error uploading file."
        };
    }
};
