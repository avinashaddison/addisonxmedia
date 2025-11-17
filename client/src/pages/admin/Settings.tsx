import { Card } from "@/components/ui/card";
import { Settings as SettingsIcon } from "lucide-react";

export default function Settings() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-muted-foreground">Configure system settings and preferences</p>
      </div>

      <Card className="p-8 text-center">
        <SettingsIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">Settings Panel Coming Soon</h3>
        <p className="text-muted-foreground">
          Company settings, theme customization, and system configuration will be available in the next update.
        </p>
      </Card>
    </div>
  );
}
