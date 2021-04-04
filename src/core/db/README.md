# Local DB (In-Memory Redux Store)

The Bloom front-end runs on a normalized entity store. What does that mean? Every single entity that we fetch from the database that we will need somewhere in our application is stored in a Redux store.

## Normalization

The best part (about normalization): in our Redux store, there is only ever one instance of **ANY** entity. Dope as hell right?

- Example: If we fetch a member with an ID of "1" in one place of the application and then fetch the same member with an ID of "1" in another place of the application, there is still only one member in our store with an ID of "1".

### Entity Relationships

A natural question may arise. How we do we actually acheive this normalization where there is only entity in the store at any given point? After all, when we fetch data from our GraphQL server, there is a whole bunch of nested data/entities in our response...

Answer: We use a _REALLY_ cool library called [normalizr](https://www.npmjs.com/package/normalizr) that helps us normalize our data! All we have to do is define the relationships between our entities (we use PostgreSQL, a relational database), and then normalizr will take care of the rest!
