import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Plus, FolderKanban } from "lucide-react";

export default function Projects() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Projects</h1>
          <p className="text-muted-foreground">Manage projects and track progress</p>
        </div>
        <Link href="/admin/projects/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Create Project
          </Button>
        </Link>
      </div>

      <Card className="p-8 text-center">
        <FolderKanban className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">Project Management Coming Soon</h3>
        <p className="text-muted-foreground">
          Full project management and task tracking features will be available in the next update.
        </p>
      </Card>
    </div>
  );
}
