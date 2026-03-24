import useMessages from "@/features/messages/useMessages";
import { Loader2, Trash2, Mail, Phone, Clock, MessageSquare } from "lucide-react";

const Messages = () => {
  const { messages, loading, error, removeMessage } = useMessages();

  if (loading && messages.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center text-white/50">
        <Loader2 className="animate-spin mr-2 text-primary" /> Synchronizing Communications...
      </div>
    );
  }

  return (
    <div className="pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-10 pb-8 border-b border-white/5">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-white italic uppercase tracking-tighter leading-none mb-1.5">Communications Log</h1>
          <p className="text-white/20 text-[9px] font-black italic tracking-[0.4em] uppercase leading-none">Unified communication logs registry.</p>
        </div>
        <span className="text-[9px] bg-primary/10 text-primary font-black px-5 py-2.5 rounded-full uppercase tracking-[0.2em] italic border border-primary/10">
          {messages.length} ACTIVE NODES
        </span>
      </div>

      {error && (
        <div className="p-6 bg-red-500/10 border border-red-500/20 text-red-500 rounded-2xl mb-10 text-[9px] font-black uppercase tracking-widest italic animate-pulse">
          System Alert: {error}
        </div>
      )}

      <div className="space-y-6">
        {messages.length > 0 ? (
          messages.map((msg) => (
            <div key={msg._id} className="bg-bg-white border border-white/5 hover:border-primary/20 p-6 md:p-10 rounded-[2.5rem] transition-all group flex flex-col md:flex-row gap-8 shadow-premium relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-primary/20 group-hover:bg-primary transition-colors" />
              
              <div className="flex-1 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                     <div className="w-10 h-10 bg-bg-canvas rounded-xl flex items-center justify-center text-white/10 group-hover:text-primary transition-colors border border-white/5">
                        <MessageSquare size={16} />
                     </div>
                     <span className="font-black text-xl text-white italic tracking-tighter uppercase leading-none">{msg.name}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[8px] text-white/10 uppercase font-black tracking-widest italic">
                    <Clock size={10} /> {new Date(msg.createdAt).toLocaleDateString()}
                  </div>
                </div>

                <div className="flex flex-wrap gap-6 text-[10px] font-black uppercase tracking-[0.2em] italic text-primary/40 border-y border-white/5 py-5">
                   <div className="flex items-center gap-2.5"><Mail size={14} /> <span className="text-white hover:text-primary transition-colors select-all leading-none">{msg.email}</span></div>
                   {msg.phone && <div className="flex items-center gap-2.5"><Phone size={14} /> <span className="text-white hover:text-primary transition-colors select-all leading-none">{msg.phone}</span></div>}
                </div>

                <div className="text-white/40 text-base leading-relaxed max-w-4xl bg-white/[0.01] p-6 rounded-2xl border border-white/5 italic font-medium relative">
                  {msg.message}
                </div>
              </div>

              <div className="flex flex-row md:flex-col justify-end items-end gap-3 pt-6 md:pt-0">
                <button 
                  onClick={() => removeMessage(msg._id)}
                  className="w-12 h-12 flex items-center justify-center text-white/10 hover:text-red-500 hover:bg-red-500/10 transition-all rounded-xl border border-white/5"
                  title="Eject Intelligence"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="py-32 border border-dashed border-white/5 rounded-[4rem] text-center text-white/5 italic text-[10px] font-black uppercase tracking-[0.6em] animate-pulse">
            No inbound intelligence indexed.
          </div>
        )}
      </div>
    </div>
  );
};

export default Messages;