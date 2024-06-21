import History from "@/components/history";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RedirectForm } from "@/components/redirect-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-start max-w-md mx-auto px-4 py-8 space-y-8">
      <Tabs defaultValue="redirect" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="redirect">Link</TabsTrigger>
          <TabsTrigger value="contact">Contact</TabsTrigger>
        </TabsList>
        <TabsContent value="redirect">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Create link</CardTitle>
              <CardDescription>
                Create a short sharable link to any URL.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RedirectForm />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="contact">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Create contact card</CardTitle>
              <CardDescription>
                Create a contact card to easily share your contact information.
                As of now, we only support norwegian contact information.
              </CardDescription>
            </CardHeader>
            <CardContent>Contact form</CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      <History />
    </div>
  );
}
