import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-pulse mt-8">
      <Card className="lg:col-span-1 bg-glass">
        <CardHeader>
          <Skeleton className="h-6 w-3/4 bg-white/20" />
        </CardHeader>
        <CardContent className="flex justify-center items-center h-48">
          <Skeleton className="h-36 w-36 rounded-full bg-white/20" />
        </CardContent>
      </Card>
      <Card className="lg:col-span-2 bg-glass">
        <CardHeader>
          <Skeleton className="h-6 w-1/2 bg-white/20" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-12 w-2/3 bg-white/20" />
        </CardContent>
      </Card>
      <Card className="lg:col-span-3 bg-glass">
        <CardHeader>
          <Skeleton className="h-6 w-1/3 bg-white/20" />
        </CardHeader>
        <CardContent className="space-y-3">
          <Skeleton className="h-4 w-full bg-white/20" />
          <Skeleton className="h-4 w-full bg-white/20" />
          <Skeleton className="h-4 w-5/6 bg-white/20" />
        </CardContent>
      </Card>
      <Card className="lg:col-span-3 bg-glass">
        <CardHeader>
          <Skeleton className="h-6 w-1/3 bg-white/20" />
        </CardHeader>
        <CardContent className="space-y-3">
          <Skeleton className="h-4 w-full bg-white/20" />
          <Skeleton className="h-4 w-3/4 bg-white/20" />
        </CardContent>
      </Card>
      <Card className="lg:col-span-3 bg-glass">
        <CardHeader>
          <Skeleton className="h-6 w-1/3 bg-white/20" />
        </CardHeader>
        <CardContent className="space-y-3">
          <Skeleton className="h-4 w-full bg-white/20" />
          <Skeleton className="h-4 w-5/6 bg-white/20" />
        </CardContent>
      </Card>
    </div>
  );
}
