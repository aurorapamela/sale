import {useState, useMemo, useEffect} from "react";
import {motion, AnimatePresence} from "framer-motion";
import {products} from "./data/products";
import ProductCard from "./components/ProductCard";
import {LayoutGrid, List, Grid2X2, Sun, Moon} from "lucide-react";

const phoneNumber = "5491162625807";

export default function App() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Todos");
  const [dark, setDark] = useState(false);
  const [view, setView] = useState("cards"); // cards | list | compact

  // Persist dark mode
  useEffect(() => {
    const saved = localStorage.getItem("darkMode");
    if (saved === "true") setDark(true);
  }, []);

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    localStorage.setItem("darkMode", dark);
  }, [dark]);

  const categories = ["Todos", ...new Set(products.map((p) => p.category))];

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchSearch = product.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchCategory =
        category === "Todos" || product.category === category;

      return matchSearch && matchCategory;
    });
  }, [search, category]);

  const globalMessage = encodeURIComponent(
    "Hola! Estoy viendo tu página de venta por mudanza 😊",
  );

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white transition-colors duration-300">
      <div className="max-w-md mx-auto px-4 py-8">
        <div className="max-w-md mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-semibold dark:text-white mb-2">
                Venta por mudanza
              </h1>
              <h5 className="text-md font-regular text-gray-500 dark:text-red-300 mb-2">
                Se retira por Vega San Martín
              </h5>
            </div>
            <button
              onClick={() => setDark(!dark)}
              className="
    p-2 rounded-full
    border border-black dark:border-white
    text-black dark:text-white
    transition
    hover:bg-black hover:text-white
    dark:hover:bg-white dark:hover:text-black
  "
            >
              {dark ? (
                <Sun size={18} strokeWidth={2} />
              ) : (
                <Moon size={18} strokeWidth={2} />
              )}
            </button>
          </div>

          <div className="flex flex-wrap gap-2 mb-4 pb-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-2.5 py-0.5 rounded-full text-[11px] tracking-wide transition
    ${
      category === cat
        ? "bg-black text-white dark:bg-white dark:text-black"
        : "border border-black/30 dark:border-white/30 dark:text-white"
    }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="md:hidden flex justify-end gap-6 mb-6">
            <button
              onClick={() => setView("cards")}
              className={`p-2 rounded-full transition ${
                view === "cards"
                  ? "bg-black text-white dark:bg-white dark:text-black"
                  : "text-black/40 dark:text-white/40"
              }`}
            >
              <LayoutGrid size={20} />
            </button>

            <button
              onClick={() => setView("list")}
              className={`p-2 rounded-full transition ${
                view === "list"
                  ? "bg-black text-white dark:bg-white dark:text-black"
                  : "text-black/40 dark:text-white/40"
              }`}
            >
              <List size={20} />
            </button>

            <button
              onClick={() => setView("compact")}
              className={`p-2 rounded-full transition ${
                view === "compact"
                  ? "bg-black text-white dark:bg-white dark:text-black"
                  : "text-black/40 dark:text-white/40"
              }`}
            >
              <Grid2X2 size={20} />
            </button>
          </div>

          <div
            className={`
              ${
                view === "compact"
                  ? "grid grid-cols-2 gap-3"
                  : view === "cards"
                    ? "grid grid-cols-1 gap-6"
                    : "flex flex-col gap-4"
              }
            `}
          >
            <AnimatePresence>
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} view={view} />
              ))}
            </AnimatePresence>
          </div>
        </div>
        <a
          href={`https://wa.me/${phoneNumber}?text=${globalMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-5 right-5 border border-black dark:border-white w-14 h-14 rounded-full flex items-center justify-center text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition"
        >
          💬
        </a>
      </div>
    </div>
  );
}
