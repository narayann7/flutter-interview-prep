Here is a glimpse of GraphQL Vs REST:

|   |   |   |
|---|---|---|
|Focus Points|GraphQL|Rest API|
|Data Fetching|GraphQL enables the clients to specify the exact data that they are in need of, in a single query, avoiding over-fetching or under-fetching of data.|The server defines the fixed endpoint, and client retrieve data by making HTTP requests to the endpoints.|
|Request Structure|Talking about GraphQL, it uses a single endpoint and leverages a flexible and declarative query language to specify the desired data structure.|Whereas Rest API specifically follows a resource-oriented approach, where these endpoints represent a definite resource and HTTP methods defining the action on the resources.|
|Versioning|Clients are allowed to request specific fields and explicitly reasoning the version of the schema they are using.|Rest API requires versioning when making changes to API’s structure, introducing new endpoints or modifying existing ones.|
|Development Experience|This simplifies development by allowing clients to recover their data in just a single request reducing the number of network calls and making it easier to manage the dependencies of the data.|Usually REST API requires multiple round trips to fetch related data, that can result in a more complicated and time-taking development process.|
|Caching|On contrary, GraphQL, with its fine-grained control over data fetching, requiring more customization of caching strategies.|REST API relies on HTTP aching at the server or client level.|