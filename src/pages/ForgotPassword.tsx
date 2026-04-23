import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Logo } from "@/components/Logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { toast } from "sonner";
import { ArrowLeft, Loader2, MailCheck } from "lucide-react";

export default function ForgotPassword() {
  const { resetPassword } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await resetPassword(email);
    setLoading(false);
    if (error) {
      toast.error("Não foi possível enviar o email. Tente novamente.");
    } else {
      setSent(true);
      toast.success("Email enviado! Verifique sua caixa de entrada.");
    }
  };

  return (
    <div className="relative min-h-screen bg-background">
      <div className="absolute right-4 top-4 z-10">
        <ThemeToggle />
      </div>

      <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-gradient-primary opacity-10 blur-3xl" />
      <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-gradient-accent opacity-10 blur-3xl" />

      <div className="relative flex min-h-screen items-center justify-center p-6">
        <div className="w-full max-w-md animate-fade-in">
          <div className="mb-8 flex justify-center">
            <Logo />
          </div>

          <Card className="border-border/60 shadow-elev-lg">
            {!sent ? (
              <>
                <CardHeader className="space-y-1">
                  <CardTitle className="text-2xl">Recuperar senha</CardTitle>
                  <CardDescription>
                    Digite seu email e enviaremos um link para você criar uma nova senha.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="voce@empresa.com"
                        autoFocus
                      />
                    </div>
                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      Enviar link de recuperação
                    </Button>
                  </form>
                </CardContent>
              </>
            ) : (
              <>
                <CardHeader className="space-y-3 text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                    <MailCheck className="h-7 w-7 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">Verifique seu email</CardTitle>
                  <CardDescription>
                    Enviamos um link de recuperação para <strong className="text-foreground">{email}</strong>.
                    O link expira em 1 hora.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-center text-xs text-muted-foreground">
                    Não recebeu? Confira a pasta de spam ou tente novamente em alguns minutos.
                  </p>
                  <Button variant="outline" className="w-full" onClick={() => setSent(false)}>
                    Enviar para outro email
                  </Button>
                </CardContent>
              </>
            )}
          </Card>

          <button
            onClick={() => navigate("/auth")}
            className="mt-6 flex w-full items-center justify-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar para o login
          </button>
        </div>
      </div>
    </div>
  );
}