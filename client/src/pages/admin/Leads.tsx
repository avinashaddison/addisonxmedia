import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Plus, TrendingUp } from "lucide-react";

export default function Leads() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Leads</h1>
          <p className="text-muted-foreground">Track and manage your sales leads</p>
        </div>
        <Link href="/admin/leads/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Lead
          </Button>
        </Link>
      </div>

      <Card className="p-8 text-center">
        <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">Lead Management Coming Soon</h3>
        <p className="text-muted-foreground">
          Full lead tracking and management features will be available in the next update.
        </p>
      </Card>
    </div>
  );
}
