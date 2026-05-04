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

  // 🔥 Gallery state
  const [viewerOpen, setViewerOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleGalleryCount, setVisibleGalleryCount] = useState(6);

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

  // 🔥 Keyboard support
  useEffect(() => {
    const handleKey = (e) => {
      if (!viewerOpen) return;

      if (e.key === "Escape") setViewerOpen(false);
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [viewerOpen, project]);

  // 🔥 Gallery functions
  const openViewer = (index) => {
    setCurrentIndex(index);
    setViewerOpen(true);
  };

  const nextImage = () => {
    setCurrentIndex((prev) =>
      prev === project.gallery.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? project.gallery.length - 1 : prev - 1
    );
  };

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

            {/* MAIN */}
            <div className="md:col-span-2 space-y-12">

              {/* Challenge */}
              <div>
                <h2 className="text-2xl font-semibold mb-3">Challenges</h2>
                <p className="text-white/60 leading-relaxed">
                  {project.challenges ||
                    "The client faced issues in growth, retention, and conversion performance."}
                </p>
              </div>

              {/* Solution */}
              <div>
                <h2 className="text-2xl font-semibold mb-3">Solution</h2>
                <p className="text-white/60 leading-relaxed">
                  {project.solution ||
                    "We implemented a structured growth strategy combining marketing automation and funnel optimization."}
                </p>
              </div>

              {/* Results */}
              <div>
                <h2 className="text-2xl font-semibold mb-3">Results</h2>
                <p className="text-primary text-xl font-semibold">
                  {project.results || "Growth delivered"}
                </p>
              </div>

              {/* 🔥 VIDEO */}
              {project.video && (
                <div>
                  <h2 className="text-2xl font-semibold mb-6">Video</h2>
                  <div className="overflow-hidden rounded-xl border border-white/10 bg-black/40 flex justify-center">
                    <video
                      src={project.video}
                      controls
                      className="w-full max-h-[70vh] object-contain"
                    >
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </div>
              )}

              {/* 🔥 GALLERY */}
              {project.gallery?.length > 0 && (
                <div>
                  <h2 className="text-2xl font-semibold mb-6">Gallery</h2>

                  <div className="grid sm:grid-cols-2 gap-6">
                    {project.gallery.slice(0, visibleGalleryCount).map((img, i) => (
                      <div
                        key={i}
                        onClick={() => openViewer(i)}
                        className="overflow-hidden rounded-xl border border-white/10 cursor-pointer aspect-video"
                      >
                        <img
                          src={img}
                          alt=""
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                        />
                      </div>
                    ))}
                  </div>

                  {project.gallery.length > visibleGalleryCount && (
                    <div className="mt-8 flex justify-center">
                      <button
                        onClick={() => setVisibleGalleryCount(prev => prev + 6)}
                        className="px-6 py-2 rounded-full border border-white/20 text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                      >
                        Load More
                      </button>
                    </div>
                  )}
                </div>
              )}

            </div>

            {/* SIDEBAR */}
            <div className="space-y-8">

              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <h3 className="text-lg font-semibold mb-4">Tools Used</h3>

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

      {/* 🔥 IMAGE VIEWER MODAL */}
      {viewerOpen && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center z-50">

          {/* Close */}
          <button
            onClick={() => setViewerOpen(false)}
            className="absolute top-6 right-6 text-white text-3xl"
          >
            ✕
          </button>

          {/* Prev */}
          <button
            onClick={prevImage}
            className="absolute left-6 text-white text-4xl"
          >
            ‹
          </button>

          {/* Image */}
          <img
            src={project.gallery[currentIndex]}
            className="max-h-[80vh] max-w-[90vw] rounded-xl"
          />

          {/* Next */}
          <button
            onClick={nextImage}
            className="absolute right-6 text-white text-4xl"
          >
            ›
          </button>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default CaseStudy;