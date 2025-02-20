## Architecture & Solution

The application is built using React and Vite with a component-based architecture, emphasizing scalability and modularity:

- **Routing:** Managed by [`react-router-dom`](https://reactrouter.com), routing is implemented with routes defined in [src/App.jsx](src/App.jsx) that navigate between pages such as [ListingsPage](src/pages/ListingsPage.jsx) and [DetailsPage](src/pages/DetailsPage.jsx).
- **State Management:** Global state for saved properties is maintained using the Context API via [`SavedPropertiesContext`](src/context/SavedPropertiesContext.jsx).
- **Data Handling:** Listings data is loaded from [src/data/listings.json](src/data/listings.json) and fetched using a custom hook ([`useFetchListings`](src/hooks/useFetchListings.js)).
- **Components:** The UI is composed of reusable components, including [`ListingCard`](src/components/ListingCard.jsx) and [`ContactAgentForm`](src/components/ContactAgentForm.jsx), ensuring a clear separation of concerns.
- **Styling:** Styling is managed with Tailwind CSS along with additional custom CSS in [src/App.css](src/App.css) and [src/index.css](src/index.css).
