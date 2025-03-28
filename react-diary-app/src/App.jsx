import { Routes, Route } from "react-router-dom"; // Removed Router import

import HomePage from "./HomePage"; // Updated to import HomePage
import CheckReviews from "./CheckReviews";
import DeleteReview from "./DeleteReview";

function App() {
  return (

      <Routes>
        <Route path="/" element={<HomePage />} /> {/* Set HomePage as the default route */}
        <Route path="/CheckReviews" element={<CheckReviews />}/>
        <Route path="/DeleteReview" element={<DeleteReview />}/>
      </Routes>

  );
}

export default App;
