"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff, Mail, Lock, AlertCircle, Loader, User2 } from "lucide-react";
import { FaGoogle, FaFacebook, FaGithub } from "react-icons/fa";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";

// Schéma de validation avec Zod
const registerSchema = z
  .object({
    name: z.string().min(1, "Le nom est requis"),
    email: z.email("Format d'email invalide").min(1, "L'email est requis"),
    password: z
      .string()
      .min(1, "Le mot de passe est requis")
      .min(8, "Le mot de passe doit contenir au moins 8 caractères"),
    confirmPassword: z
      .string()
      .min(1, "La confirmation du mot de passe est requise"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [registerError, setRegisterError] = useState<string | null>(null);
  const router = useRouter();

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (user: RegisterFormData) => {
    try {
      setIsLoading(true);
      setRegisterError(null);

      const res = await authClient.signUp.email(
        {
          email: user.email,
          password: user.password,
          name: user.name,
        },
        {
          onError: ({ error }) => {
            setRegisterError(
              "Une erreur est survenue lors de l'inscription. Veuillez réessayer."
            );
            toast.error("Erreur d'inscription : " + error.message);
          },
          onSuccess: () => {
            toast.success("Inscription réussie !");
            router.push("/");
          },
        }
      );

      console.log(res);
    } catch (error) {
      setRegisterError(
        "Une erreur est survenue lors de l'inscription. Veuillez réessayer."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider: "google" | "github") => {
    try {
      setIsLoading(true);
      setRegisterError("");

      const res = await authClient.signIn.social({ provider });

      console.log(res);
    } catch (error) {
      console.error(`Erreur de connexion ${provider}:`, error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full space-y-6">
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
          S'inscrire avec Google
        </Button>

        <Button
          type="button"
          variant="outline"
          onClick={() => handleSocialLogin("github")}
          disabled={isLoading}
          className="w-full"
        >
          <FaGithub className="mr-2 h-4 w-4 text-gray-900" />
          S'inscrire avec Github
        </Button>

        {/* <Button
          type="button"
          variant="outline"
          onClick={() => handleSocialLogin("tiktok")}
          disabled={isLoading}
          className="w-full"
        >
          <FaTiktok className="mr-2 h-4 w-4" />
          S'inscrire avec TikTok
        </Button> */}
      </div>

      {/* Séparateur */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <Separator />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background rounded-lg px-2 text-muted-foreground">
            Ou s'inscrire avec
          </span>
        </div>
      </div>

      {/* Formulaire d'inscription */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Erreur générale */}
          {registerError && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{registerError}</AlertDescription>
            </Alert>
          )}

          {/* Champ Nom */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative">
                    <User2 className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      {...field}
                      type="text"
                      placeholder="Entrez votre nom"
                      className={cn("pl-9", {
                        "border-destructive focus-visible:ring-destructive focus-visible:border-destructive":
                          form.formState.errors.name,
                      })}
                      autoComplete="name"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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
                      placeholder="Entrez votre adresse email"
                      className={cn("pl-9", {
                        "border-destructive focus-visible:ring-destructive focus-visible:border-destructive":
                          form.formState.errors.email,
                      })}
                      autoComplete="email"
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
                      placeholder="Entrez un mot de passe"
                      className={cn("pl-9 pr-9", {
                        "border-destructive focus-visible:ring-destructive focus-visible:border-destructive":
                          form.formState.errors.password,
                      })}
                      autoComplete="new-password"
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

          {/* Champ Confirmation mot de passe */}
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      {...field}
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirmez votre mot de passe"
                      className={cn("pl-9 pr-9", {
                        "border-destructive focus-visible:ring-destructive focus-visible:border-destructive":
                          form.formState.errors.confirmPassword,
                      })}
                      autoComplete="new-password"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? (
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

          {/* Bouton de soumission */}
          <Button
            type="submit"
            className="w-full"
            disabled={form.formState.isSubmitting || isLoading}
          >
            {form.formState.isSubmitting || isLoading ? (
              <>
                <Loader className="mr-2 h-4 w-4 animate-spin" />
                Inscription en cours...
              </>
            ) : (
              "Créer mon compte"
            )}
          </Button>

          {/* Lien vers connexion */}
          <div className="text-center text-sm text-muted-foreground">
            Vous avez déjà un compte ?{" "}
            <Button variant="link" asChild className="p-0 h-auto font-normal">
              <Link
                href="/auth/login"
                className="text-primary font-semibold! hover:underline"
              >
                Se connecter
              </Link>
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default RegisterForm;
