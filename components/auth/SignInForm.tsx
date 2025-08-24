"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff, Mail, Lock, AlertCircle, Loader } from "lucide-react";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { authClient } from "@/lib/auth-client";

// Schéma de validation avec Zod
const loginSchema = z.object({
  email: z.email("Format d'email invalide").min(1, "L'email est requis"),
  password: z
    .string()
    .min(1, "Le mot de passe est requis")
    .min(6, "Le mot de passe doit contenir au moins 6 caractères"),
  rememberMe: z.boolean().optional(),
});

// Type pour les données du formulaire de connexion
type LoginFormData = z.infer<typeof loginSchema>;

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  // Redirection après connexion
  const redirectTo = searchParams.get("redirectTo") || "/";

  // Initialisation du formulaire
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  // Soumission du formulaire
  const onSubmit = async (user: LoginFormData) => {
    try {
      setIsLoading(true);
      setLoginError(null);

      // Appel à l'API de connexion
      const res = await authClient.signIn.email(
        {
          ...user,
        },
        {
          // Gestion des erreurs
          onError: (err) => {
            console.error("Login error:", err);
            setLoginError(
              "Erreur de connexion. Veuillez vérifier vos identifiants."
            );
            toast.error("Erreur de connexion: " + err.error.message);
          },

          // Gestion des succès
          onSuccess: (data) => {
            console.log("Login success:", data);
            router.push(redirectTo);
          },
        }
      );

      // Affichage de la réponse de connexion
      console.log("Login response:", res);

    } catch (error) {
      // Gestion des erreurs
      setLoginError(
        "Une erreur s'est produite lors de la connexion. Veuillez réessayer."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Gestion de la connexion sociale
  const handleSocialLogin = async (provider: "google" | "github") => {
    setIsLoading(true);
    try {
      setLoginError("");

      await authClient.signIn.social({ provider });
    } catch (error) {
      console.error(`Erreur de connexion ${provider}:`, error);
    }
  };

  return (
    <div className="w-full max-w-[25rem] space-y-6">

      {/* Connexion sociale */}
      <div className="space-y-3">
        <Button
          type="button"
          variant="outline"
          onClick={() => handleSocialLogin("google")}
          disabled={isLoading}
          className="w-full"
        >
          <FaGoogle className="mr-2 h-4 w-4 text-red-500" />
          Continuer avec Google
        </Button>

        <Button
          type="button"
          variant="outline"
          onClick={() => handleSocialLogin("github")}
          disabled={isLoading}
          className="w-full"
        >
          <FaGithub className="mr-2 h-4 w-4 text-gray-900" />
          Continuer avec GitHub
        </Button>

        {/* TikTok n'est pas un provider supporté par Supabase OAuth */}
        {/*
        <Button
          type="button"
          variant="outline"
          onClick={() => handleSocialLogin("tiktok")}
          disabled={isLoading}
          className="w-full"
        >
          <FaTiktok className="mr-2 h-4 w-4" />
          Continuer avec TikTok
        </Button>
        */}
      </div>

      {/* Séparateur */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <Separator />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background rounded-lg px-2 text-muted-foreground">
            Ou continuer avec
          </span>
        </div>
      </div>

      {/* Formulaire de connexion */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Erreur générale */}
          {loginError && (
            <Alert variant="destructive" className="border-destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{loginError}</AlertDescription>
            </Alert>
          )}

          {/* Champ Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      {...field}
                      type="email"
                      placeholder="Votre adresse email"
                      className={cn("pl-9", {
                        "border-destructive focus-visible:ring-destructive focus-visible:border-destructive": form.formState.errors.email,
                      })}
                      autoComplete="email"
                      disabled={form.formState.isSubmitting || isLoading}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Champ Mot de passe */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      {...field}
                      type={showPassword ? "text" : "password"}
                      placeholder="Votre mot de passe"
                      className={cn("pl-9 pr-9", {
                        "border-destructive focus-visible:ring-destructive focus-visible:border-destructive": form.formState.errors.password,
                      })}
                      autoComplete="current-password"
                      disabled={form.formState.isSubmitting || isLoading}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Options */}
          <div className="flex items-center justify-between">
            <FormField
              control={form.control}
              name="rememberMe"
              render={({ field }) => (
                <FormItem className="flex flex-row justify-center items-center space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={form.formState.isSubmitting || isLoading}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="text-sm font-normal">
                      Rester connecté
                    </FormLabel>
                  </div>
                </FormItem>
              )}
            />

            <Button variant="link" asChild className="px-0 font-normal">
              <Link href="/forgot-password">Mot de passe oublié ?</Link>
            </Button>
          </div>

          {/* Bouton de soumission */}
          <Button
            type="submit"
            className="w-full"
            disabled={form.formState.isSubmitting || isLoading}
          >
            {form.formState.isSubmitting || isLoading ? (
              <>
                <Loader className="h-4 w-4 animate-spin" />
                Connexion en cours
              </>
            ) : (
              "Se connecter"
            )}
          </Button>

          {/* Lien vers inscription */}
          <div className="text-center text-sm text-muted-foreground">
            Pas encore de compte ?{" "}
            <Button variant="link" asChild className="p-0 h-auto font-normal">
              <Link
                href="/auth/register"
                className="text-primary font-semibold! hover:underline"
              >
                Créer un compte
              </Link>
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default LoginForm;
