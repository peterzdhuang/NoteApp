export default {
    name: 'pdfDocument',
    title: 'PDF Document',
    type: 'document',
    fields: [
      {
        name: 'title',
        title: 'Title',
        type: 'string',
        description: 'Title of the document',
      },
      {
        name: 'summary',
        title: 'Summary',
        type: 'text',
        description: 'A short description of the document',
      },
      {
        name: 'pdfFile',
        title: 'PDF File',
        type: 'file',
        description: 'Upload the PDF file',
        options: {
          accept: '.pdf',
        },
      },
      {
        name: 'thumbnail',
        title: 'Thumbnail',
        type: 'image',
        description: 'Thumbnail image for the PDF',
      },
    ],
  };
  