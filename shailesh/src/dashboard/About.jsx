import { useState } from "react";
import useAbout from "@/features/about/useAbout";
import AboutForm from "@/features/about/AboutForm";
import { Loader2, UserCircle } from "lucide-react";

const DashboardAbout = () => {
   const { about, loading, saveAbout } = useAbout();
   const [saving, setSaving] = useState(false);
   const [success, setSuccess] = useState(false);

   const handleSubmit = async (formData) => {
      setSaving(true);
      setSuccess(false);

      const data = {
         ...formData,
         skills: formData.skills.split(",").map(s => s.trim()).filter(s => s !== ""),
         tools: formData.tools.split(",").map(t => t.trim()).filter(t => t !== ""),
         role: formData.title,
      };

      try {
         await saveAbout(data);
         setSuccess(true);
         setTimeout(() => setSuccess(false), 3000);
      } catch (err) {
         console.error(err);
      } finally {
         setSaving(false);
      }
   };

   if (loading && !about) {
      return (
         <div className="flex h-64 items-center justify-center text-white/50">
            <Loader2 className="animate-spin mr-2 text-primary" /> Synchronizing Profile Intel...
         </div>
      );
   }

   return (
      <div className="pb-24">
         <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-10 pb-8 border-b border-white/5">
            <div className="flex items-center gap-5 w-full md:w-auto">
               <div className="w-14 h-14 bg-bg-white border border-white/5 rounded-2xl flex items-center justify-center text-white/10 shadow-inner-light relative overflow-hidden group">
                  {about?.profileImage ? (
                     <img src={about.profileImage} alt="Preview" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  ) : (
                     <UserCircle size={28} />
                  )}
               </div>
               <div>
                  <h1 className="text-xl md:text-2xl font-black text-white leading-tight uppercase tracking-tighter italic">{about?.name || "Tactical Identity"}</h1>
                  <div className="flex items-center gap-3 mt-1 opacity-50">
                     <span className="text-primary text-[8px] font-black uppercase tracking-[0.4em] italic leading-none">{about?.role || "In-Field Operations"}</span>
                  </div>
               </div>
            </div>
         </div>

         <AboutForm 
            initialData={about} 
            onSubmit={handleSubmit} 
            saving={saving} 
            success={success} 
         />
      </div>
   );
};

export default DashboardAbout;
