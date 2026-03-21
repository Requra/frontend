import { Header } from "@/components/layout/Header/Header";
import { Button } from "@/components/ui/Button/Button";

export const LandingPage = () => {
  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative pt-32 pb-40 overflow-hidden flex flex-col items-center justify-center min-h-[80vh]">
          {/* Background decoration */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-500/10 blur-[120px] rounded-full pointer-events-none" />
          
          <div className="container mx-auto px-6 relative z-10 text-center max-w-4xl tracking-tight">
            <h1 className="text-5xl md:text-7xl font-extrabold mb-8 leading-tight">
              Scale Your Business With{" "}
              <span className="text-gradient-primary">
                Requra.AI
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-neutral-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              The smartest way to automate your workflows and scale your business with the power of artificial intelligence.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Button size="lg" className="rounded-full px-10 h-14 text-lg bg-primary-600 hover:bg-primary-700 text-white shadow-lg shadow-primary-600/20 border-none">
                Get Started Free
              </Button>
              <Button variant="outline" size="lg" className="rounded-full px-10 h-14 text-lg border-2 border-neutral-200 text-neutral-900 hover:bg-neutral-100">
                View Demo
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};
