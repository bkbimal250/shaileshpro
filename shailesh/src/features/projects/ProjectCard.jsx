import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

const ProjectCard = ({ project }) => {
  return (
    <Link to={`/projects/${project._id}`} className="group block h-full">

      <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden h-full flex flex-col transition hover:border-primary/40 hover:-translate-y-1">

        {/* IMAGE */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={
              project.image ||
              "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop"
            }
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition"
          />

          {/* CATEGORY */}
          <span className="absolute top-3 left-3 bg-black/60 text-white text-xs px-3 py-1 rounded-full">
            {project.category || "Project"}
          </span>

          {/* ICON */}
          <div className="absolute top-3 right-3 w-8 h-8 bg-black/60 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
            <ArrowUpRight size={14} />
          </div>
        </div>

        {/* CONTENT */}
        <div className="p-4 flex flex-col flex-1">

          <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition">
            {project.title}
          </h3>

          <p className="text-sm text-white/60 line-clamp-2 flex-1">
            {project.description}
          </p>

          {/* FOOTER */}
          <div className="mt-4 flex justify-between items-center text-sm">

            <span className="text-primary">
              {project.results || "Live"}
            </span>

            {project.tools?.length > 0 && (
              <span className="text-white/40">
                {project.tools[0]}
              </span>
            )}

          </div>

        </div>
      </div>

    </Link>
  );
};

export default ProjectCard;