import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import Section from "@/components/common/Section";
import Container from "@/components/common/Container";
import { getProjectById } from "@/features/projects/projectService";
import { Loader2, ArrowLeft, ExternalLink, Github } from "lucide-react";

const CaseStudy = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const data = await getProjectById(slug);
        setProject(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-bg-canvas text-white/60">
        <Loader2 className="animate-spin mr-2" />
        Loading project...
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex h-screen items-center justify-center flex-col gap-6 text-center">
        <h2 className="text-2xl font-semibold">Project not found</h2>
        <button
          onClick={() => navigate("/projects")}
          className="text-primary underline"
        >
          Go back
        </button>
      </div>
    );
  }

  return (
    <div className="bg-bg-canvas text-white min-h-screen">
      <Navbar />

      {/* HEADER */}
      <Section className="pt-24 pb-12 border-b border-white/10">
        <Container>
          <button
            onClick={() => navigate("/projects")}
            className="flex items-center gap-2 text-white/50 hover:text-white mb-8"
          >
            <ArrowLeft size={16} />
            Back to Projects
          </button>

          <div className="max-w-3xl">
            <span className="text-sm text-primary font-medium">
              {project.category}
            </span>

            <h1 className="text-4xl md:text-5xl font-bold mt-2">
              {project.title}
            </h1>

            <p className="text-white/60 mt-4 leading-relaxed">
              {project.description}
            </p>
          </div>
        </Container>
      </Section>

      {/* HERO IMAGE */}
      <Section className="py-10">
        <Container>
          {project.image && (
            <img
              src={project.image}
              alt={project.title}
              className="w-full rounded-2xl border border-white/10"
            />
          )}
        </Container>
      </Section>

      {/* CONTENT */}
      <Section className="py-16">
        <Container>
          <div className="grid md:grid-cols-3 gap-12">

            {/* MAIN CONTENT */}
            <div className="md:col-span-2 space-y-12">

              {/* Challenge */}
              <div>
                <h2 className="text-2xl font-semibold mb-3">
                  Challenge
                </h2>
                <p className="text-white/60 leading-relaxed">
                  {project.challenge ||
                    "The client faced issues in growth, retention, and conversion performance."}
                </p>
              </div>

              {/* Solution */}
              <div>
                <h2 className="text-2xl font-semibold mb-3">
                  Solution
                </h2>
                <p className="text-white/60 leading-relaxed">
                  {project.solution ||
                    "We implemented a structured growth strategy combining marketing automation and funnel optimization."}
                </p>
              </div>

              {/* Results */}
              <div>
                <h2 className="text-2xl font-semibold mb-3">
                  Results
                </h2>
                <p className="text-primary text-xl font-semibold">
                  {project.results || "Growth delivered"}
                </p>
              </div>

              {/* Gallery */}
              {project.gallery?.length > 0 && (
                <div>
                  <h2 className="text-2xl font-semibold mb-6">
                    Gallery
                  </h2>

                  <div className="grid sm:grid-cols-2 gap-6">
                    {project.gallery.map((img, i) => (
                      <img
                        key={i}
                        src={img}
                        className="rounded-xl border border-white/10"
                      />
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* SIDEBAR */}
            <div className="space-y-8">

              {/* Tools */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <h3 className="text-lg font-semibold mb-4">
                  Tools Used
                </h3>

                <div className="flex flex-wrap gap-2">
                  {project.tools?.map((tool, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 text-sm bg-white/10 rounded-full text-white/70"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              {/* Links */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">

                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    className="flex items-center justify-between bg-primary text-white px-4 py-3 rounded-lg"
                  >
                    Live Project
                    <ExternalLink size={16} />
                  </a>
                )}

                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    className="flex items-center justify-between border border-white/20 px-4 py-3 rounded-lg"
                  >
                    Source Code
                    <Github size={16} />
                  </a>
                )}

              </div>

            </div>
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section className="py-20 border-t border-white/10">
        <Container>
          <div className="bg-primary rounded-2xl p-10 text-center">

            <h2 className="text-2xl md:text-3xl font-semibold">
              Want similar results?
            </h2>

            <p className="text-white/80 mt-2">
              Let’s build your next growth strategy.
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

export default CaseStudy;