import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative bg-gradient-to-br from-background to-secondary/20">
      <Card className="w-[420px] shadow-lg">
        <CardHeader className="space-y-1 flex flex-col items-center">
          <div className="w-16 h-16 mb-2 relative">
            <Image
              src="/Logo.png"
              alt="MineLegends Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <CardTitle className="text-2xl font-bold text-center">
            MineLegends
          </CardTitle>
          <CardDescription className="text-center">
             Admin Dashboard Login
          </CardDescription>
          
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Benutzername</Label>
            <Input
              id="username"
              placeholder="Minecraft Username"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Passwort</Label>
            <Input
              id="password"
              type="password"
              placeholder="•••••••••••••"
              required
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button className="w-full">Anmelden</Button>
          <div className="w-full flex items-center gap-4 pt-2">
            <div className="h-[1px] flex-1 bg-border/60" />
            <p className="text-sm text-muted-foreground text-center px-2">
              Bei Problemen wende dich bitte an einen Administrator
            </p>
            <div className="h-[1px] flex-1 bg-border/60" />
          </div>
        </CardFooter>
      </Card>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-secondary/40 to-transparent" />
    </div>
  );
}
