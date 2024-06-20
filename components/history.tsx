"use client";

import { Redirect } from "@/lib/drizzle";
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

type Item = Redirect;

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
            <div key={item.slugId} className="flex items-center">
              <div className="rounded-full bg-primary-foreground --border">
                <LinkIcon className="h-9 w-9 p-2" />
              </div>
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">
                  <span className="">5e.no/</span>
                  {item.slugId}
                </p>
                <p className="text-sm text-muted-foreground">{item.url}</p>
              </div>
              <div className="ml-auto space-x-2">
                <Button variant="outline" className="ml-auto">
                  {/* TODO: Copy to clipboard and notify user */}
                  <Copy className="h-4 w-4 -mx-1" />
                </Button>
                <Button variant="default" className="ml-auto" asChild>
                  <Link href={`/${item.slugId}`}>
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
