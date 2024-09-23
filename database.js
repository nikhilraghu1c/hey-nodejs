const { MongoClient } = require("mongodb");

// Connection URL
const url =
  "mongodb+srv://mongodb_node:x8rGIM6G8wjxSzLd@heynodejs.eig1v.mongodb.net/";

// Instance of MongoClient
const client = new MongoClient(url);

// Database Name
const dbName = "HelloWorld";

// Function to connect to the server and return a message
async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log("Connected to the database server");
  const db = client.db(dbName);
  const collection = db.collection("User");

  // Below code is to insert a document in the collection
  /**
         const data = {
            firstName: "MS",
            lastName: "Dhoni",
            city: "Ranchi",
            phoneNumber: "1234567890",
        };

        const insertResult = await collection.insertMany([data]);
        console.log("Inserted documents =>", insertResult);
    */
  // Below code is to delete a document from the collection
  const deleteResult = await collection.deleteOne({
    firstName: "MS",
  });
  console.log("Deleted documents =>", deleteResult);

  // Below code is to update a document in the collection
  const updateResult = await collection.updateOne(
    { firstName: "MS" },
    { $set: { firstName: "Mahendra Singh" } }
  );
  console.log("Updated documents =>", updateResult);

  // Count the number of documents in the collection
  const count = await collection.countDocuments({});
  console.log("Count of document in the user collection =>", count);

  // Below code is to read the documents from the collection
  const findResult = await collection.find({}).toArray();
  console.log("Found documents =>", findResult);

  // Find the document with the firstName as MS
  // To Array is used to convert the cursor to an array
  // Cursor is a pointer to the result set of a query
  const findMS = await collection
    .find({ firstName: "Mahendra Singh" })
    .toArray();
  console.log("Found documents with firstName as Mahendra Singh =>", findMS);
  return "done.";
}

// Call the main function and log the result  and close the connection
main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());

// Notes

// Go to mongodb.com and create a new M0 cluster
// Create a new user and password
// Get the connection string and replace the password with the one you created
// Install mongodb compass and connect
// Create a new database and collection
// Create a new document with some fields

// To do this all things using code then need to install mongodb npm package (npm install mongodb) https://mongodb.github.io/node-mongodb-native/6.8/

// Create a new file database.js
// Add the above code to the file
// Run the file using node database.js
// Check the output in the console
// Check the database and collection in mongodb compass
// Check the CRUD operations query from the documentation
// Go to collection option in the documentation and check the query for many operations
// create a .gitignore file and add node_modules/ to it

// In Prod , we are going to use Mongoose ORM for MongoDB, which is a wrapper around the mongodb npm package and provides a schema based solution for MongoDB operations  https://mongoosejs.com/docs/guide.html
