import { useState } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { Shield, Bell, Save, Zap } from "lucide-react";

const Settings = () => {
  const [saving, setSaving] = useState(false);

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => setSaving(false), 1500);
  };

  return (
    <div className="pb-24">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-10 pb-8 border-b border-white/5">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-white italic uppercase tracking-tighter leading-none mb-1.5">System Config</h1>
          <p className="text-white/20 text-[9px] font-black italic tracking-[0.4em] uppercase leading-none">Core operational parameters and security.</p>
        </div>
        <Button onClick={handleSave} loading={saving} className="h-12 px-8 rounded-xl w-full md:w-auto text-[9px]">
          <Save size={16} className="mr-2" /> COMMIT CHANGES
        </Button>
      </div>

      <div className="max-w-4xl space-y-8">
        
        {/* Account Settings */}
        <div className="bg-bg-white border border-white/5 p-8 md:p-12 rounded-[3.5rem] space-y-10 shadow-premium relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl rounded-full" />
          <div className="flex items-center gap-4 border-b border-white/5 pb-8">
            <Shield size={16} className="text-primary" />
            <h3 className="text-white/40 text-[10px] font-black uppercase tracking-[0.4em] italic leading-none">Access Control Hub</h3>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Input label="Admin Identifier" placeholder="ADMIN@EXAMPLE.COM" disabled />
            <Input label="Security Key (Password)" type="password" placeholder="••••••••" />
          </div>
          
          <p className="text-white/10 text-[8px] italic font-black uppercase tracking-[0.4em] leading-relaxed max-w-sm ml-4">Neural link modifications require biometric level clearance. Key entropy must be maintained across all nodes.</p>
        </div>

        {/* Preferences */}
        <div className="bg-bg-white border border-white/5 p-8 md:p-12 rounded-[3.5rem] space-y-10 shadow-premium relative overflow-hidden">
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-secondary/5 blur-3xl rounded-full" />
          <div className="flex items-center gap-4 border-b border-white/5 pb-8">
            <Bell size={16} className="text-secondary" />
            <h3 className="text-white/40 text-[10px] font-black uppercase tracking-[0.4em] italic leading-none">Comms Protocols</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-6 bg-bg-canvas rounded-2xl border border-white/5 group hover:border-secondary transition-colors">
              <div className="space-y-1">
                <div className="text-white text-sm font-black uppercase tracking-tighter italic group-hover:text-secondary transition-colors leading-none">Lead Transmission</div>
                <div className="text-white/10 text-[8px] font-black uppercase tracking-[0.3em] leading-none italic">Relay data to primary identity node</div>
              </div>
              <input type="checkbox" defaultChecked className="w-5 h-5 accent-secondary" />
            </div>

            <div className="flex items-center justify-between p-6 bg-bg-canvas rounded-2xl border border-white/5 group hover:border-secondary transition-colors">
              <div className="space-y-1">
                <div className="text-white text-sm font-black uppercase tracking-tighter italic group-hover:text-secondary transition-colors leading-none">Operational Metrics</div>
                <div className="text-white/10 text-[8px] font-black uppercase tracking-[0.3em] leading-none italic">Automated performance intelligence relay</div>
              </div>
              <input type="checkbox" className="w-5 h-5 accent-secondary" />
            </div>
          </div>
        </div>

        {/* App Meta */}
        <div className="bg-bg-white border border-white/5 p-8 md:p-10 rounded-[3.5rem] space-y-6 flex flex-col sm:flex-row items-center justify-between shadow-premium relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl opacity-50" />
            <div className="flex flex-col text-center sm:text-left gap-1 mb-6 sm:mb-0">
                <span className="text-white/10 text-[8px] uppercase font-black tracking-[0.4em] italic leading-none">Architecture</span>
                <span className="text-white font-black text-lg italic tracking-[0.2em] leading-none">V2.4.0-PRO</span>
            </div>
            <div className="flex flex-col text-center sm:text-right gap-1">
                <span className="text-white/10 text-[8px] uppercase font-black tracking-[0.4em] italic leading-none">Database Node</span>
                <div className="flex items-center justify-center sm:justify-end gap-3 text-secondary text-[10px] font-black uppercase tracking-[0.3em] italic animate-pulse leading-none">
                   <Zap size={10} />
                   Live & Synchronized
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};

export default Settings;