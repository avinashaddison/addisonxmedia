import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Upload, Link2, Save, Image } from "lucide-react";
import { queryClient } from "@/lib/queryClient";

export default function FaviconSettings() {
  const { toast } = useToast();
  const [uploadingFile, setUploadingFile] = useState(false);
  const [faviconUrl, setFaviconUrl] = useState("");

  // Fetch current favicon
  const { data: currentFavicon, isLoading } = useQuery<{ faviconUrl: string | null }>({
    queryKey: ["/api/favicon"],
  });

  // Update favicon URL
  const updateFaviconMutation = useMutation({
    mutationFn: async (url: string) => {
      const response = await fetch("/api/favicon", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ faviconUrl: url }),
      });

      if (!response.ok) {
        throw new Error("Failed to update favicon");
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/favicon"] });
      toast({
        title: "Success",
        description: "Favicon updated successfully",
      });
      setFaviconUrl("");
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update favicon",
        variant: "destructive",
      });
    },
  });

  // Handle file upload
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validTypes = ['image/x-icon', 'image/vnd.microsoft.icon', 'image/png', 'image/jpeg', 'image/gif'];
    if (!validTypes.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Please upload an .ico, .png, .jpg, or .gif file",
        variant: "destructive",
      });
      return;
    }

    // Validate file size (max 1MB)
    if (file.size > 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload a file smaller than 1MB",
        variant: "destructive",
      });
      return;
    }

    setUploadingFile(true);

    try {
      // Get upload URL
      const uploadResponse = await fetch("/api/favicon/upload-url", {
        method: "POST",
        credentials: "include",
      });

      if (!uploadResponse.ok) {
        throw new Error("Failed to get upload URL");
      }

      const { uploadURL } = await uploadResponse.json();

      // Upload file directly to object storage
      const uploadFileResponse = await fetch(uploadURL, {
        method: "PUT",
        body: file,
        headers: {
          "Content-Type": file.type,
        },
      });

      if (!uploadFileResponse.ok) {
        throw new Error("Failed to upload file");
      }

      // Extract the object path from the upload URL
      const url = new URL(uploadURL);
      const objectPath = url.pathname.split('/').slice(2).join('/'); // Remove /bucket-name/ prefix

      // Save the favicon URL to database
      await updateFaviconMutation.mutateAsync(`/api/object-storage/${objectPath}`);

      toast({
        title: "Success",
        description: "Favicon uploaded successfully",
      });
    } catch (error) {
      console.error("Error uploading favicon:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to upload favicon",
        variant: "destructive",
      });
    } finally {
      setUploadingFile(false);
      // Reset file input
      e.target.value = "";
    }
  };

  const handleUpdateUrl = () => {
    if (!faviconUrl.trim()) {
      toast({
        title: "Error",
        description: "Please enter a favicon URL",
        variant: "destructive",
      });
      return;
    }

    updateFaviconMutation.mutate(faviconUrl);
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight" data-testid="heading-favicon-settings">Favicon Settings</h1>
        <p className="text-muted-foreground mt-2">
          Manage your website's favicon. Upload an image or provide a URL.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Current Favicon Preview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Image className="w-5 h-5" />
              Current Favicon
            </CardTitle>
            <CardDescription>
              This is how your favicon currently appears
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex items-center justify-center h-32">
                <div className="text-sm text-muted-foreground">Loading...</div>
              </div>
            ) : currentFavicon?.faviconUrl ? (
              <div className="flex flex-col items-center gap-4">
                <div className="p-4 bg-muted rounded-lg">
                  <img
                    src={currentFavicon.faviconUrl}
                    alt="Current Favicon"
                    className="w-16 h-16"
                    data-testid="img-current-favicon"
                  />
                </div>
                <code className="text-xs bg-muted px-2 py-1 rounded break-all max-w-full">
                  {currentFavicon.faviconUrl}
                </code>
              </div>
            ) : (
              <div className="flex items-center justify-center h-32 text-sm text-muted-foreground">
                No favicon set
              </div>
            )}
          </CardContent>
        </Card>

        {/* Upload Favicon */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="w-5 h-5" />
              Upload New Favicon
            </CardTitle>
            <CardDescription>
              Upload a .ico, .png, .jpg, or .gif file (max 1MB)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="favicon-upload">Select File</Label>
              <Input
                id="favicon-upload"
                type="file"
                accept=".ico,.png,.jpg,.jpeg,.gif"
                onChange={handleFileUpload}
                disabled={uploadingFile}
                data-testid="input-favicon-upload"
              />
            </div>
            {uploadingFile && (
              <div className="text-sm text-muted-foreground">
                Uploading...
              </div>
            )}
          </CardContent>
        </Card>

        {/* Set Favicon URL */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Link2 className="w-5 h-5" />
              Set Favicon URL
            </CardTitle>
            <CardDescription>
              Alternatively, provide a direct URL to your favicon
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <div className="flex-1 space-y-2">
                <Label htmlFor="favicon-url">Favicon URL</Label>
                <Input
                  id="favicon-url"
                  type="url"
                  placeholder="https://example.com/favicon.ico"
                  value={faviconUrl}
                  onChange={(e) => setFaviconUrl(e.target.value)}
                  data-testid="input-favicon-url"
                />
              </div>
              <div className="flex items-end">
                <Button
                  onClick={handleUpdateUrl}
                  disabled={updateFaviconMutation.isPending || !faviconUrl.trim()}
                  data-testid="button-update-favicon-url"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Update
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Info Card */}
      <Card>
        <CardHeader>
          <CardTitle>Tips for Best Results</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <ul className="list-disc list-inside space-y-1">
            <li>Recommended size: 32x32 pixels or 16x16 pixels</li>
            <li>.ICO format is preferred for best browser compatibility</li>
            <li>PNG format with transparency is also widely supported</li>
            <li>Keep file size small (under 100KB) for faster loading</li>
            <li>Your favicon will automatically appear in browser tabs and bookmarks</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
