import { useState } from "react";
import SocialForm from "@/features/socials/SocialForm";
import useSocial from "@/features/socials/useSocial";
import {
  Loader2,
  Trash2,
  Edit2,
  X,
  Plus,
  ExternalLink,
  Instagram,
  Linkedin,
  Facebook,
  Youtube,
  Twitter,
} from "lucide-react";
import Button from "@/components/ui/Button";

const Icons = {
  Instagram: <Instagram size={16} className="text-pink-500" />,
  LinkedIn: <Linkedin size={16} className="text-blue-500" />,
  Facebook: <Facebook size={16} className="text-blue-500" />,
  YouTube: <Youtube size={16} className="text-red-500" />,
  Twitter: <Twitter size={16} className="text-white" />,
};

const Socials = () => {
  const {
    socials,
    loading,
    error,
    removeSocial,
    addSocial,
    modifySocial,
  } = useSocial();

  const [showForm, setShowForm] = useState(false);
  const [editingSocial, setEditingSocial] = useState(null);

  const handleAddSocial = async (data) => {
    if (editingSocial) {
      await modifySocial(editingSocial._id, data);
    } else {
      await addSocial(data);
    }
    closeForm();
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingSocial(null);
  };

  const startEdit = (social) => {
    setEditingSocial(social);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this social account?")) {
      removeSocial(id);
    }
  };

  if (loading && socials.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center text-white/60">
        <Loader2 className="animate-spin mr-2" />
        Loading...
      </div>
    );
  }

  return (
    <div className="pb-10">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-xl font-semibold">Social Accounts</h1>
          <p className="text-sm text-white/50">
            Manage your social profiles
          </p>
        </div>

        <Button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2"
        >
          {showForm ? <X size={16} /> : <Plus size={16} />}
          {showForm ? "Close" : "Add"}
        </Button>
      </div>

      {/* ERROR */}
      {error && (
        <div className="mb-6 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-sm text-red-400">
          {error}
        </div>
      )}

      {/* FORM */}
      {showForm && (
        <div className="mb-8 bg-white/5 border border-white/10 rounded-xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-medium">
              {editingSocial ? "Edit Social" : "Add Social"}
            </h2>
            <button onClick={closeForm}>
              <X size={18} />
            </button>
          </div>

          <SocialForm
            onSubmit={handleAddSocial}
            initialData={editingSocial || {}}
          />
        </div>
      )}

      {/* GRID */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {socials.length > 0 ? (
          socials.map((s) => (
            <div
              key={s._id}
              className="bg-white/5 border border-white/10 rounded-xl p-5 flex flex-col"
            >

              {/* TOP */}
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-2">
                  {Icons[s.platform]}
                  <span className="text-sm font-medium">
                    {s.handle || s.platform}
                  </span>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => startEdit(s)}
                    className="w-8 h-8 flex items-center justify-center border border-white/10 rounded-lg hover:bg-white/5 transition"
                  >
                    <Edit2 size={14} />
                  </button>

                  <button
                    onClick={() => handleDelete(s._id)}
                    className="w-8 h-8 flex items-center justify-center border border-red-500/20 text-red-400 rounded-lg hover:bg-red-500/10 transition"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>

              {/* BODY */}
              <p className="text-sm text-white/60 mb-3">
                {s.platform} • {s.niche || "General"}
              </p>

              <div className="flex justify-between text-sm mb-4">
                <span className="text-white/70">
                  {s.followers?.toLocaleString() || "0"} followers
                </span>

                <span className="text-primary">
                  {s.engagementRate || "N/A"}
                </span>
              </div>

              {/* FOOTER */}
              <div className="flex justify-between items-center mt-auto">
                <span className="text-xs text-white/50">
                  {s.managed ? "Managed" : "Inactive"}
                </span>

                {s.profileUrl && (
                  <a
                    href={s.profileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/50 hover:text-primary"
                  >
                    <ExternalLink size={16} />
                  </a>
                )}
              </div>

            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-16 text-white/50">
            No social accounts added.
          </div>
        )}
      </div>
    </div>
  );
};

export default Socials;