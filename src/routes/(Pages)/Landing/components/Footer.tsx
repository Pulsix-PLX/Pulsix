import { For } from "solid-js";
import { Activity, PiggyBank, LineChart } from "lucide-solid";

export default function Features() {
  const features = [
    {
      title: "Real-time Tracking",
      description: "Monitor your finances instantly with our real-time notification system.",
      icon: Activity,
      delay: "0s",
    },
    {
      title: "Smart Budgeting",
      description: "Create intelligent budgets that adapt to your spending patterns.",
      icon: PiggyBank,
      delay: "0.2s",
    },
    {
      title: "Insightful Analytics",
      description: "Get personalized insights to optimize your financial health.",
      icon: LineChart,
      delay: "0.4s",
    },
  ];

  return (
    <section id="features" class="py-16 px-6 lg:px-12 relative">
      <div class="absolute inset-0 -z-10 opacity-70">
        <div class="absolute top-1/3 left-1/3 w-64 h-64 bg-pulsix-50 rounded-full filter blur-3xl animate-float"></div>
        <div class="absolute bottom-1/3 right-1/3 w-48 h-48 bg-pulsix-100/50 rounded-full filter blur-3xl animate-float" style="animation-delay: 1.5s;"></div>
      </div>
      
      <div class="max-w-5xl mx-auto">
        <div class="text-center mb-12 animate-fade-in-up">
          <h2 class="text-3xl font-bold text-foreground mb-4">
            Everything you need to <span class="text-pulsix-600 relative color-red">
              master
              <span class="absolute -top-1 -right-1 text-pulsix-400">
                <span class="relative inline-flex h-3 w-3">
                  <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-pulsix-400 opacity-75"></span>
                  <span class="relative inline-flex rounded-full h-3 w-3 bg-pulsix-500"></span>
                </span>
              </span>
            </span> your finances
          </h2>
          
          <p class="text-lg text-muted-foreground max-w-2xl mx-auto">
            Powerful tracking tools with insightful analytics to give you complete control.
          </p>
        </div>
        
        <div class="grid md:grid-cols-3 gap-8">
          <For each={features}>{(feature) => (
            <div 
              class="glass-card p-6 rounded-xl border border-border transition-all duration-300 hover:translate-y-[-8px] hover:shadow-xl animate-fade-in-up"
              style={{ "animation-delay": feature.delay }}
            >
              <div class="w-12 h-12 rounded-xl bg-pulsix-50 text-pulsix-600 flex items-center justify-center mb-4 glow-effect">
                <feature.icon class="w-6 h-6" />
              </div>
              
              <h3 class="text-xl font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              
              <p class="text-muted-foreground">
                {feature.description}
              </p>
            </div>
          )}</For>
        </div>
      </div>
    </section>
  );
}
