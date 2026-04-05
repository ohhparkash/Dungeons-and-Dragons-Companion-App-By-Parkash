import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ChevronDown, ChevronRight, BookOpen, Settings } from "lucide-react";
import { boardElements, setupRules, gameFlow, categories, boardIntro, type BoardElement } from "@/data/board-guide-data";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { playBack, playTabSwitch, playCardFlip } from "@/utils/sound-engine";

const BoardElementCard = ({ element }: { element: BoardElement }) => {
  const [open, setOpen] = useState(false);

  return (
    <button
      onClick={() => setOpen(!open)}
      className="w-full text-left rounded-lg border border-border bg-card p-4 transition-all duration-300 hover:border-gold-dim"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-xl">{element.icon}</span>
          <div>
            <h3 className="font-heading text-sm font-semibold tracking-wide text-foreground">{element.name}</h3>
            <p className="text-xs text-muted-foreground mt-0.5 capitalize">{element.category}</p>
          </div>
        </div>
        {open ? <ChevronDown className="w-4 h-4 text-muted-foreground" /> : <ChevronRight className="w-4 h-4 text-muted-foreground" />}
      </div>

      {open && (
        <div className="mt-3 space-y-3 animate-fade-in">
          <p className="text-sm text-muted-foreground leading-relaxed">{element.description}</p>
          <ul className="space-y-1.5">
            {element.rules.map((rule, i) => (
              <li key={i} className="text-sm text-muted-foreground flex gap-2">
                <span className="text-gold mt-0.5">•</span>
                <span>{rule}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </button>
  );
};

const BoardGuide = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filtered = activeCategory === "all"
    ? boardElements
    : boardElements.filter((e) => e.category === activeCategory);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/90 backdrop-blur-md border-b border-border">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-3">
          <button onClick={() => { playBack(); navigate("/"); }} className="p-2 rounded-md hover:bg-secondary transition-colors">
            <ArrowLeft className="w-5 h-5 text-muted-foreground" />
          </button>
          <h1 className="font-heading text-lg font-bold tracking-wider text-gold glow-gold-text">
            Board Guide
          </h1>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-3 sm:px-4 py-4 sm:py-6 space-y-4 sm:space-y-6 pb-24">
        {/* Intro */}
        <section className="animate-fade-in">
          <div className="p-5 rounded-lg bg-card border border-border">
            <h2 className="font-heading text-base font-semibold text-gold mb-2">{boardIntro.title}</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">{boardIntro.description}</p>
          </div>
        </section>

        <Tabs defaultValue="elements" onValueChange={() => playTabSwitch()} className="animate-fade-in" style={{ animationDelay: "150ms", opacity: 0 }}>
          <div className="overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          <TabsList className="flex w-max min-w-full bg-secondary">
            <TabsTrigger value="elements" className="text-[11px] sm:text-xs data-[state=active]:text-gold">
              <BookOpen className="w-3.5 h-3.5 mr-1 shrink-0" /> Elements
            </TabsTrigger>
            <TabsTrigger value="setup" className="text-[11px] sm:text-xs data-[state=active]:text-gold">
              <Settings className="w-3.5 h-3.5 mr-1 shrink-0" /> Setup
            </TabsTrigger>
            <TabsTrigger value="flow" className="text-[11px] sm:text-xs data-[state=active]:text-gold">
              ⚔️ Game Flow
            </TabsTrigger>
          </TabsList>
          </div>

          {/* Elements Tab */}
          <TabsContent value="elements" className="mt-4 space-y-4">
            {/* Category filters */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveCategory("all")}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  activeCategory === "all"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground hover:text-foreground"
                }`}
              >
                All
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                    activeCategory === cat.key
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {cat.icon} {cat.label}
                </button>
              ))}
            </div>

            <div className="space-y-2">
              {filtered.map((el) => (
                <BoardElementCard key={el.name} element={el} />
              ))}
            </div>
          </TabsContent>

          {/* Setup Tab */}
          <TabsContent value="setup" className="mt-4 space-y-4">
            <div className="p-4 rounded-lg bg-card border border-border">
              <h3 className="font-heading text-sm font-semibold text-gold mb-3">{setupRules.title}</h3>
              <ol className="space-y-2">
                {setupRules.steps.map((step, i) => (
                  <li key={i} className="text-sm text-muted-foreground flex gap-2.5">
                    <span className="text-gold font-semibold text-xs mt-0.5 min-w-[1rem]">{i + 1}.</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </TabsContent>

          {/* Game Flow Tab */}
          <TabsContent value="flow" className="mt-4 space-y-4">
            <div className="p-4 rounded-lg bg-card border border-border">
              <h3 className="font-heading text-sm font-semibold text-gold mb-3">{gameFlow.title}</h3>
              <ul className="space-y-2">
                {gameFlow.rules.map((rule, i) => (
                  <li key={i} className="text-sm text-muted-foreground flex gap-2">
                    <span className="text-gold mt-0.5">•</span>
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default BoardGuide;
