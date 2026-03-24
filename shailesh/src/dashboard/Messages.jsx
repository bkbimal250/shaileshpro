import useMessages from "@/features/messages/useMessages";
import { Loader2, Trash2, Mail, Phone, Clock } from "lucide-react";

const Messages = () => {
  const { messages, loading, error, removeMessage } = useMessages();

  if (loading && messages.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center text-white/60">
        <Loader2 className="animate-spin mr-2" />
        Loading messages...
      </div>
    );
  }

  return (
    <div className="pb-10">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-xl font-semibold">Messages</h1>
          <p className="text-sm text-white/50">
            Manage contact inquiries
          </p>
        </div>

        <span className="text-sm text-white/50">
          {messages.length} total
        </span>
      </div>

      {/* ERROR */}
      {error && (
        <div className="mb-6 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-sm text-red-400">
          {error}
        </div>
      )}

      {/* LIST */}
      <div className="space-y-4">
        {messages.length > 0 ? (
          messages.map((msg) => (
            <div
              key={msg._id}
              className="bg-white/5 border border-white/10 rounded-xl p-5 flex flex-col gap-4"
            >

              {/* TOP */}
              <div className="flex justify-between items-start gap-4">
                <div>
                  <h3 className="font-semibold text-lg">
                    {msg.name}
                  </h3>

                  <div className="flex items-center gap-3 text-sm text-white/50 mt-1 flex-wrap">
                    <span className="flex items-center gap-1">
                      <Mail size={14} /> {msg.email}
                    </span>

                    {msg.phone && (
                      <span className="flex items-center gap-1">
                        <Phone size={14} /> {msg.phone}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs text-white/50 flex items-center gap-1">
                    <Clock size={12} />
                    {new Date(msg.createdAt).toLocaleDateString()}
                  </span>

                  <button
                    onClick={() => removeMessage(msg._id)}
                    className="w-9 h-9 flex items-center justify-center border border-red-500/20 text-red-400 rounded-lg hover:bg-red-500/10 transition"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>

              {/* MESSAGE */}
              <p className="text-sm text-white/70 leading-relaxed bg-bg-canvas border border-white/10 rounded-lg p-4">
                {msg.message}
              </p>

            </div>
          ))
        ) : (
          <div className="text-center py-16 text-white/50">
            No messages yet.
          </div>
        )}
      </div>
    </div>
  );
};

export default Messages;