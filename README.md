# AI Document Summarizer
Document extraction with AI involves using advanced algorithms to automatically locate and retrieve specific information 
from various types of documents, such as company presentation, company update, cap table, term sheet, investment document. 

### How To

- Clone the AI Document Summarizer
- On the console type `npm install` and it will install a package that AI Document Summarizer depends on
- And then type `npm run start` to start the application

### Supports Amazon S3 and  Textract
Support cloud object storage with Amazon S3 for scalability, 
data availability, security, and performance.


### Directory structure

    .
    ├── controllers             # Handle the entry point, call services and models
    ├── middleware              # Provides functionality to connect applications
    ├── models                  # Manages the data, reads data from files or database
    ├── public                  # Available for app users 
    ├── services                # Performs specific functions used by controllers
    ├── utils                   # Tools and utilities
