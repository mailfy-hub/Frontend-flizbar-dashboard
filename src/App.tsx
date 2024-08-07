import { Routes } from "./routes";
import { ScrollToTop } from "./utils/scrollToTop";
import "react-tooltip/dist/react-tooltip.css";
export function App() {
  return (
    <>
      <ScrollToTop />
      <Routes />
    </>
  );
}
