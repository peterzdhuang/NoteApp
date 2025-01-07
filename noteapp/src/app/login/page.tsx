'use client';
import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const emailInput = form.elements.namedItem('email') as HTMLInputElement;
    const passwordInput = form.elements.namedItem('password') as HTMLInputElement;
    
    const formData = {
      email: emailInput.value,
      password: passwordInput.value
    };

    try {
      const response = await fetch('https://pdfstoragefunctionapp.azurewebsites.net/api/Login?code=wpcPGoqbA7oQao1YUlCsWPhoxIx_5Ckkfve37SHqHXJMAzFuTJ_f7w%3D%3D', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      router.push("/");
      
    } catch (error) {
      console.error('There was a problem with the form submission:', error);
    }
  };
  
  return (
    <div className = "flex items-center justify-center min-h-screen">
      <div className="w-full h-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
        <div className="flex items-center justify-center py-12">
          <div className="mx-auto grid w-[350px] gap-6">
            <div className="grid gap-2 text-center">
              <h1 className="text-3xl font-bold">Login</h1>
              <p className="text-balance text-muted-foreground">
                Enter your email below to login to your account
              </p>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <Link
                      href="/forgot-password"
                      className="ml-auto inline-block text-sm underline"
                    >
                      Forgot your password?
                    </Link>
                  </div>
                  <Input id="password" type="password" required />
                </div>
                <Button type="submit" className="w-full">
                  Login
                </Button>
                <Button variant="outline" className="w-full">
                  Login with Google
                </Button>
              </div>
            </form>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href="#" className="underline">
                Sign up
              </Link>
            </div>
          </div>
        </div>
        <div className="hidden bg-muted lg:block">
          <Image
            src="/bg.jpg"
            alt="Image"
            width="1920"
            height="1080"
            className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
          />
        </div>

      </div>

    </div>

  )
}
