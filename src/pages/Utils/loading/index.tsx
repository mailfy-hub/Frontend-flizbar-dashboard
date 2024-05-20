import { motion } from "framer-motion";
import LOGO from "../../../assets/FLIZBAR_DEFAULT_LOGO.png";
export const Loading = () => {
  return (
    <motion.div
      initial={{ opacity: 100 }}
      animate={{ opacity: 0 }}
      transition={{
        duration: 0.8,
        delay: 0.4,
      }}
      className="h-screen w-screen fixed top-0 left-0 right-0 bottom-0 bg-BLACK grid place-content-center z-50">
      <div>
        <img className="h-8" src={LOGO} alt="Flizbar LOGO" />
      </div>
    </motion.div>
  );
};
