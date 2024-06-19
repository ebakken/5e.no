import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UrlForm } from "@/components/url-form";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center max-w-md mx-auto p-2">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Create link</CardTitle>
          <CardDescription>
            Create a short sharable link to any URL.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <UrlForm />
        </CardContent>
      </Card>
    </main>
  );
}
