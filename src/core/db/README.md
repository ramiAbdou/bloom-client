# Local DB (In-Memory Redux Store)

The Bloom front-end runs on a normalized entity store. What does that mean? Every single entity that we fetch from the database that we will need somewhere in our application is stored in a Redux store.

## Normalization

The best part (about normalization): in our Redux store, there is only ever one instance of ANY entity.

- Example: If we fetch a member with an ID of "1" in one place of the application and then fetch the same member with an ID of "1" in another place of the application, there is still only one member in our store with an ID of "1".

### Entity Relationships
