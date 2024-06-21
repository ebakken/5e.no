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
import { ContactForm } from "@/components/contact-form";

export default function Home() {
  return (
    <>
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
            <CardContent>
              <ContactForm />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      <History />
    </>
  );
}
