import { useQuery, useMutation } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { Setting } from "@shared/schema";
import { Settings as SettingsIcon, Building2, Mail, Phone, MapPin } from "lucide-react";
import { useState } from "react";

export default function Settings() {
  const { toast } = useToast();
  const [editingKey, setEditingKey] = useState<string | null>(null);

  const { data: settings = [], isLoading } = useQuery<Setting[]>({
    queryKey: ["/api/settings"],
  });

  const upsertMutation = useMutation({
    mutationFn: async (data: { key: string; value: string; category: string }) => {
      await apiRequest("POST", "/api/settings", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/settings"] });
      toast({
        title: "Success",
        description: "Setting updated successfully",
      });
      setEditingKey(null);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update setting",
        variant: "destructive",
      });
    },
  });

  const getSetting = (key: string): string => {
    const setting = settings.find(s => s.key === key);
    return setting?.value || "";
  };

  const handleSave = (key: string, value: string, category: string) => {
    upsertMutation.mutate({ key, value, category });
  };

  const companySettings = [
    { key: "company_name", label: "Company Name", category: "company", placeholder: "AddisonX Media", icon: Building2 },
    { key: "company_email", label: "Email", category: "company", placeholder: "team@addisonxmedia.com", icon: Mail },
    { key: "company_phone", label: "Phone", category: "company", placeholder: "+91 97097 07311", icon: Phone },
    { key: "company_address", label: "Address", category: "company", placeholder: "Itki Road, Near Kawasaki Showroom, Ranchi", icon: MapPin, multiline: true },
  ];

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-4"></div>
          <p className="text-muted-foreground">Loading settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-muted-foreground">Configure system settings and preferences</p>
      </div>

      {/* Company Information */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <Building2 className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold">Company Information</h2>
        </div>
        <div className="space-y-4">
          {companySettings.map((setting) => {
            const Icon = setting.icon;
            const currentValue = getSetting(setting.key);
            const isEditing = editingKey === setting.key;

            return (
              <div key={setting.key} className="flex items-start gap-4">
                <Icon className="h-5 w-5 text-muted-foreground mt-2" />
                <div className="flex-1">
                  <label className="text-sm font-medium mb-1 block">{setting.label}</label>
                  {isEditing ? (
                    <div className="space-y-2">
                      {setting.multiline ? (
                        <Textarea
                          defaultValue={currentValue}
                          placeholder={setting.placeholder}
                          rows={3}
                          id={`edit-${setting.key}`}
                          data-testid={`input-${setting.key}`}
                        />
                      ) : (
                        <Input
                          defaultValue={currentValue}
                          placeholder={setting.placeholder}
                          id={`edit-${setting.key}`}
                          data-testid={`input-${setting.key}`}
                        />
                      )}
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => {
                            const input = document.getElementById(`edit-${setting.key}`) as HTMLInputElement | HTMLTextAreaElement;
                            handleSave(setting.key, input.value, setting.category);
                          }}
                          disabled={upsertMutation.isPending}
                          data-testid={`button-save-${setting.key}`}
                        >
                          Save
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setEditingKey(null)}
                          disabled={upsertMutation.isPending}
                          data-testid={`button-cancel-${setting.key}`}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-muted-foreground">
                        {currentValue || <span className="italic">Not set</span>}
                      </p>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setEditingKey(setting.key)}
                        data-testid={`button-edit-${setting.key}`}
                      >
                        Edit
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* System Settings */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <SettingsIcon className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold">System Settings</h2>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-muted rounded-md">
            <div>
              <p className="font-medium">Database</p>
              <p className="text-sm text-muted-foreground">PostgreSQL via Neon</p>
            </div>
            <div className="w-2 h-2 rounded-full bg-green-600"></div>
          </div>
          <div className="flex items-center justify-between p-4 bg-muted rounded-md">
            <div>
              <p className="font-medium">Object Storage</p>
              <p className="text-sm text-muted-foreground">Google Cloud Storage</p>
            </div>
            <div className="w-2 h-2 rounded-full bg-green-600"></div>
          </div>
          <div className="flex items-center justify-between p-4 bg-muted rounded-md">
            <div>
              <p className="font-medium">Authentication</p>
              <p className="text-sm text-muted-foreground">Replit OIDC</p>
            </div>
            <div className="w-2 h-2 rounded-full bg-green-600"></div>
          </div>
        </div>
      </Card>
    </div>
  );
}
