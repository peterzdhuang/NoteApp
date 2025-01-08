'use client';
import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image"

export default function Signup() {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = {
      firstName: (form.elements.namedItem('firstName') as HTMLInputElement).value,
      lastName: (form.elements.namedItem('lastName') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      password: (form.elements.namedItem('password') as HTMLInputElement).value
    };
    try {
      const response = await fetch('https://pdfstoragefunctionapp.azurewebsites.net/api/Signup?code=3Qu9ojpaiqOI7a3ASW2joJSRCliRw_U2YblWljFl3Ns5AzFujvUjlg%3D%3D', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      console.log('Form submitted successfully!');
      // Optionally, you can handle the response from the server here
    } catch (error) {
      console.error('There was a problem with the form submission:', error);
    }
  };

  return (
    <div className="flex">
        <Card className="flex items-center justify-center min-h-screen w-[40vw] h-[100vh]">
          <CardHeader>
            <CardTitle className="text-xl">Sign Up</CardTitle>
            <CardDescription>
              Enter your information to create an account
            </CardDescription>
          </CardHeader>
          <CardContent>

            <div className="grid gap-4">
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2 mt-4">
                    <Label htmlFor="first-name">First name</Label>
                    <Input id="firstName" placeholder="Max" required />
                  </div>
                  <div className="grid gap-2 mt-4">
                    <Label htmlFor="last-name">Last name</Label>
                    <Input id="lastName" placeholder="Robinson" required />
                  </div>
                </div>
                <div className="grid gap-2 mt-4">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                  />
                </div>
                <div className="grid gap-2 mt-4">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" />
                </div>
                <Button type="submit" className="w-full mt-4">
                  Create an account
                </Button>
              </form>
            </div>

            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link href="/login" className="underline">
                Sign in
              </Link>
            </div>
          </CardContent>
      </Card>

      <div className="hidden bg-muted lg:block w-[60vw]">
          <Image
            src="/bg.jpg"
            alt="Image"
            width="1920"
            height="1080"
            className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
          />
      </div>
    </div>
    
  )
}
