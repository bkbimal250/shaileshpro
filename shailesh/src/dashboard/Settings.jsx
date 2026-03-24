import { useState } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { Shield, Bell, Save } from "lucide-react";

const Settings = () => {
  const [saving, setSaving] = useState(false);

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => setSaving(false), 1500);
  };

  return (
    <div className="pb-10 max-w-4xl">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-xl font-semibold">Settings</h1>
          <p className="text-sm text-white/50">
            Manage your account and preferences
          </p>
        </div>

        <Button onClick={handleSave} loading={saving}>
          <Save size={16} className="mr-2" />
          Save
        </Button>
      </div>

      <div className="space-y-6">

        {/* ACCOUNT */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Shield size={16} />
            <h2 className="font-medium">Account</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <Input label="Email" placeholder="admin@email.com" disabled />
            <Input label="Password" type="password" placeholder="••••••••" />
          </div>
        </div>

        {/* NOTIFICATIONS */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Bell size={16} />
            <h2 className="font-medium">Notifications</h2>
          </div>

          <div className="space-y-3">

            <label className="flex items-center justify-between text-sm text-white/70">
              <span>Email notifications</span>
              <input type="checkbox" defaultChecked className="accent-primary" />
            </label>

            <label className="flex items-center justify-between text-sm text-white/70">
              <span>Performance updates</span>
              <input type="checkbox" className="accent-primary" />
            </label>

          </div>
        </div>

        {/* APP INFO */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-6 flex justify-between items-center">
          <div>
            <p className="text-sm text-white/50">Version</p>
            <p className="font-medium">v2.4.0</p>
          </div>

          <div className="text-right">
            <p className="text-sm text-white/50">Status</p>
            <p className="text-primary font-medium">Active</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Settings;