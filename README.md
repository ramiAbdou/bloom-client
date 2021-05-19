# Bloom (Web)

Open-sourced web application for Bloom. Communicates with [`bloom-backend`](https://github.com/ramiAbdou/bloom-backend) for information retrieval/updates and displays on UI. Components are designed using the [Atomic Design Pattern](https://bradfrost.com/blog/post/atomic-web-design/).

Core Tools and Technologies
- React.js
- Typescript
- GraphQL

Other Key Libraries Used
- [Apollo Client](https://www.apollographql.com/docs/react/) - State management tool designed for GraphQL.

## Folder Structure

- `src/components/*` - All re-usable components that have at least been used twice throughout applications. Structure follows Atomic Design.
- `src/components/atoms/*` - Standalone components/elements (ie: Button, Checkbox, etc).
- `src/components/molecules/*` - Components that combine multiple atoms (ie: Dropdown). Sometimes, these have state within their own context.
- `src/components/organisms/*` - Larger components that combine multiple molecules and atoms, and have mid-to-high state complexity.
- `src/core/*` - Controls routing logic, all re-usable hooks and global state functionality.
- `src/scenes/*` - Maps to "pages". Each "page" has its own folder.
- `src/util/*` - Utility functions and constants used throughout the application.

## Installation

To run this application, you need to have [Node.js](https://nodejs.org/en/download) and [Typescript](https://www.typescriptlang.org) installed on your machine. You should first follow the [`bloom-backend`](https://github.com/ramiAbdou/bloom-backend) installation instructions.

## Project Status

This project originated through a startup called [Bloom](http://onbloom.co/) back in 2020, but unfortunately the company has been shut down. Although there could be some development being continued, it is solely for the purpose of having fun.
