import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import Section from "@/components/common/Section";
import Container from "@/components/common/Container";
import ProjectCard from "@/features/projects/ProjectCard";
import useProjects from "@/features/projects/useProjects";
import { Loader2 } from "lucide-react";

const Projects = () => {
  const { projects, loading } = useProjects();

  if (loading && projects.length === 0) {
    return (
      <div className="flex h-screen items-center justify-center bg-bg-canvas text-white/60">
        <Loader2 className="animate-spin mr-2" />
        Loading projects...
      </div>
    );
  }

  return (
    <div className="bg-bg-canvas min-h-screen text-white">
      <Navbar />

      {/* HEADER */}
      <Section className="pt-24 pb-12 border-b border-white/10">
        <Container>
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold">
              Projects
            </h1>

            <p className="text-white/60 mt-4">
              A collection of my recent work, case studies, and growth experiments.
            </p>
          </div>
        </Container>
      </Section>

      {/* PROJECT GRID */}
      <Section className="py-16">
        <Container>
          {projects.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((p) => (
                <ProjectCard key={p._id} project={p} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-white/50">
              No projects available.
            </div>
          )}
        </Container>
      </Section>

      {/* CTA */}
      <Section className="py-20 border-t border-white/10">
        <Container>
          <div className="bg-primary rounded-2xl p-10 text-center">

            <h2 className="text-2xl md:text-3xl font-semibold">
              Let’s build your next project 🚀
            </h2>

            <p className="text-white/80 mt-3">
              Ready to create something impactful together.
            </p>

            <a
              href="/contact"
              className="inline-block mt-6 bg-white text-primary px-6 py-3 rounded-lg font-medium hover:scale-105 transition"
            >
              Contact Me
            </a>

          </div>
        </Container>
      </Section>

      <Footer />
    </div>
  );
};

export default Projects;