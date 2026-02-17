import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import RoomPage from "./pages/RoomPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/:room/:playerName" element={<RoomPage />} />
        <Route path="*" element={<Navigate to="/lobby/guest" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
