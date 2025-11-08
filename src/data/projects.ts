export type Project = {
  title: string;
  image: string;
  description: string;
  tech: string[];
  website?: string;
  source?: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    title: "AAPL Next-Day Direction Classifier",
    image: "/AAPL-model.png",
    description:
      "Reproducible ML pipeline blending TF-IDF + Logistic Regression sentiment with Random Forest technical baselines (RSI14, SMA3/7, log returns, volatility) hitting up to 0.947 F1 with chronological splits and PCA diagnostics.",
    tech: ["Python", "scikit-learn", "Pandas", "NumPy"],
    featured: true,
  },
  {
    title: "Dungeon Platformer",
    image: "/platformer.png",
    description:
      "2D platformer built with Bevy ECS, LDTK collision layers, and deterministic physics, shipped to browsers via WASM with tuned movement systems, bevy_audio, and targeted tests.",
    tech: ["Rust", "Bevy", "WASM", "LDTK"],
    source: "https://github.com/mitchford20/in_da_dungeon",
    featured: true,
  },
  {
    title: "Index Fund Trader",
    image: "/placeholder-profile.png",
    description:
      "Data-driven ETF trading pipeline combining probability-based signals, expected-value framing, engineered indicators, Polygon 1-min bars, and SQLite backtests yielding ~50% simulated returns.",
    tech: ["Python", "SQL", "NumPy", "SQLite", "Alpaca", "Polygon API"],
  },
  {
    title: "WanderSync: Travel Itinerary Manager",
    image: "/wandersync.png",
    description:
      "Real-time Android travel itinerary app built in Java with Firebase auth/navigation/data flow, delivering reliable feedback plus MPAndroidChart visualizations across 500+ QA transactions for responsive trip summaries.",
    tech: ["Java", "Firebase", "Android Studio", "XML", "MPAndroidChart"],
    source: "https://github.com/Cabaretman/Wandersync",
  },
];
