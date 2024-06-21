"use client";

import { Contact, Redirect } from "@/lib/drizzle";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { ArrowUpRight, Copy, LinkIcon } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { toast } from "sonner";

type Item = Redirect | Contact;

export default function History() {
  const [items, setItems] = useState([] as Item[]);

  useEffect(() => {
    const listenStorageChange = () => {
      if (localStorage.getItem("items") === null) {
        setItems([]);
      } else {
        setItems(JSON.parse(localStorage.getItem("items") || "[]"));
      }
    };
    listenStorageChange();
    window.addEventListener("storage", listenStorageChange);
    return () => window.removeEventListener("storage", listenStorageChange);
  }, []);

  if (!items.length) return null;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Latest creations</CardTitle>
        <CardDescription>
          Here are the latest links you&apos;ve created.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {items.map((item) => (
            <div key={item.slugId} className="flex items-center gap-4">
              <div className="rounded-full bg-primary-foreground">
                <LinkIcon className="h-9 w-9 p-2" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium leading-none text-ellipsis overflow-hidden text-nowrap pb-1">
                  <span className="">5e.no/</span>
                  {item.slugId}
                </p>
                <p className="text-sm text-muted-foreground text-ellipsis overflow-hidden text-nowrap">
                  {"name" in item ? item.name : item.url}
                </p>
              </div>
              <div className="ml-auto space-x-2 shrink-0">
                <CopyToClipboard
                  onCopy={() => toast.success("Copied!")}
                  text={`https://5e.no/${item.slugId}`}
                >
                  <Button variant="outline" className="ml-auto">
                    <Copy className="h-4 w-4 -mx-1" />
                  </Button>
                </CopyToClipboard>
                <Button variant="default" className="ml-auto" asChild>
                  <Link href={`/${item.slugId}`} target="_blank">
                    <ArrowUpRight className="h-4 w-4 -mx-1" />
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
