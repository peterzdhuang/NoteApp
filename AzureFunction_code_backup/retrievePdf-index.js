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

    try {
        const tableName = "pdfMetadata";
        const credential = new AzureNamedKeyCredential(accountName, accountKey);
        const tableClient = new TableClient(`https://${accountName}.table.core.windows.net`, tableName, credential);

        // Fetch all entities
        let entities = [];
        const entitiesIter = tableClient.listEntities();
        for await (const entity of entitiesIter) {
            // Remove any potential "Content-Disposition" header to avoid auto downloading
            delete entity.url;
            entities.push(entity);
        }

        context.res = {
            status: 200,
            body: entities
        };
    } catch (error) {
        context.log.error("Error retrieving metadata:", error.message);
        context.res = {
            status: 500,
            body: "Error retrieving metadata."
        };
    }
};
