import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-canvas text-white px-6">

      <div className="text-center max-w-xl">

        {/* 404 */}
        <h1 className="text-6xl md:text-8xl font-bold">
          404
        </h1>

        {/* Title */}
        <h2 className="text-2xl md:text-3xl font-semibold mt-4">
          Page not found
        </h2>

        {/* Description */}
        <p className="text-white/60 mt-4">
          The page you’re looking for doesn’t exist or has been moved.
        </p>

        {/* Button */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 mt-8 bg-primary px-6 py-3 rounded-lg font-medium hover:opacity-90 transition"
        >
          <ArrowLeft size={16} />
          Go back home
        </Link>

      </div>

    </div>
  );
};

export default NotFound;