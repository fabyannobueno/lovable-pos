import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Logo } from "@/components/Logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { toast } from "sonner";
import { Loader2, ShoppingCart, TrendingUp, Package, Users } from "lucide-react";

export default function Auth() {
  const { user, signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [signUpName, setSignUpName] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");

  useEffect(() => {
    if (user) navigate("/", { replace: true });
  }, [user, navigate]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await signIn(signInEmail, signInPassword);
    setLoading(false);
    if (error) {
      toast.error(error.message === "Invalid login credentials" ? "Email ou senha inválidos" : error.message);
    } else {
      toast.success("Bem-vindo de volta!");
      navigate("/", { replace: true });
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (signUpPassword.length < 6) {
      toast.error("A senha deve ter pelo menos 6 caracteres");
      return;
    }
    setLoading(true);
    const { error } = await signUp(signUpEmail, signUpPassword, signUpName);
    setLoading(false);
    if (error) {
      if (error.message.includes("already registered")) {
        toast.error("Este email já está cadastrado");
      } else {
        toast.error(error.message);
      }
    } else {
      toast.success("Conta criada! Entrando...");
      // auto-confirm enabled, so user is signed in
      navigate("/", { replace: true });
    }
  };

  const features = [
    { icon: ShoppingCart, title: "Frente de caixa ágil", desc: "Venda em segundos, com código de barras e múltiplas formas de pagamento." },
    { icon: Package, title: "Estoque inteligente", desc: "Custo, margem, markup e lucro calculados automaticamente." },
    { icon: TrendingUp, title: "Relatórios em tempo real", desc: "Dashboards de vendas, CMV e produtos mais rentáveis." },
    { icon: Users, title: "Equipe e permissões", desc: "Convide caixas, gerentes e garçons com acesso controlado." },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="absolute right-4 top-4 z-10">
        <ThemeToggle />
      </div>

      <div className="grid min-h-screen lg:grid-cols-2">
        {/* Left: Marketing */}
        <div className="relative hidden overflow-hidden bg-gradient-subtle p-12 lg:flex lg:flex-col lg:justify-between">
          <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-gradient-primary opacity-20 blur-3xl" />
          <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-gradient-accent opacity-10 blur-3xl" />

          <Logo />

          <div className="relative space-y-10">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur">
                <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
                Plataforma PDV completa
              </div>
              <h1 className="text-5xl font-bold leading-[1.05] tracking-tight">
                O caixa do seu negócio,{" "}
                <span className="bg-gradient-primary bg-clip-text text-transparent">sem complicação.</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Vendas, comandas, estoque e finanças em uma só plataforma. Moderno, rápido e pronto para escalar.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {features.map((f) => (
                <div key={f.title} className="rounded-xl border border-border bg-card/40 p-4 backdrop-blur-sm">
                  <f.icon className="mb-2 h-5 w-5 text-primary" />
                  <h3 className="text-sm font-semibold">{f.title}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <p className="relative text-xs text-muted-foreground">© {new Date().getFullYear()} Caixa PDV. Todos os direitos reservados.</p>
        </div>

        {/* Right: Form */}
        <div className="flex items-center justify-center p-6 sm:p-12">
          <div className="w-full max-w-md animate-fade-in">
            <div className="mb-8 lg:hidden">
              <Logo />
            </div>

            <Card className="border-border/60 shadow-elev-lg">
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl">Acesse sua conta</CardTitle>
                <CardDescription>Entre ou crie uma conta para começar.</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="signin" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="signin">Entrar</TabsTrigger>
                    <TabsTrigger value="signup">Criar conta</TabsTrigger>
                  </TabsList>

                  <TabsContent value="signin">
                    <form onSubmit={handleSignIn} className="space-y-4 pt-4">
                      <div className="space-y-2">
                        <Label htmlFor="signin-email">Email</Label>
                        <Input id="signin-email" type="email" required value={signInEmail} onChange={(e) => setSignInEmail(e.target.value)} placeholder="voce@empresa.com" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="signin-password">Senha</Label>
                        <Input id="signin-password" type="password" required value={signInPassword} onChange={(e) => setSignInPassword(e.target.value)} placeholder="••••••••" />
                      </div>
                      <Button type="submit" className="w-full" disabled={loading}>
                        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Entrar
                      </Button>
                    </form>
                  </TabsContent>

                  <TabsContent value="signup">
                    <form onSubmit={handleSignUp} className="space-y-4 pt-4">
                      <div className="space-y-2">
                        <Label htmlFor="signup-name">Nome completo</Label>
                        <Input id="signup-name" required value={signUpName} onChange={(e) => setSignUpName(e.target.value)} placeholder="João da Silva" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="signup-email">Email</Label>
                        <Input id="signup-email" type="email" required value={signUpEmail} onChange={(e) => setSignUpEmail(e.target.value)} placeholder="voce@empresa.com" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="signup-password">Senha</Label>
                        <Input id="signup-password" type="password" required minLength={6} value={signUpPassword} onChange={(e) => setSignUpPassword(e.target.value)} placeholder="Mínimo 6 caracteres" />
                      </div>
                      <Button type="submit" className="w-full" disabled={loading}>
                        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Criar minha conta
                      </Button>
                    </form>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            <p className="mt-6 text-center text-xs text-muted-foreground">
              Ao continuar, você concorda com nossos termos de uso e política de privacidade.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}