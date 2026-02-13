import {useState, useMemo, useEffect} from "react";
import {motion, AnimatePresence} from "framer-motion";
import {products} from "./data/products";
import ProductCard from "./components/ProductCard";

const phoneNumber = "54911XXXXXXXX";

export default function App() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Todos");
  const [dark, setDark] = useState(false);

  // Persist dark mode
  useEffect(() => {
    const saved = localStorage.getItem("darkMode");
    if (saved === "true") setDark(true);
  }, []);

  useEffect(() => {
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
    <div className={dark ? "dark" : ""}>
      <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 transition-colors duration-300">
        <div className="max-w-md mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-xl font-semibold dark:text-white">
              Venta por mudanza
            </h1>

            <button
              onClick={() => setDark(!dark)}
              className="px-3 py-1 rounded-full bg-neutral-200 dark:bg-neutral-700 dark:text-white"
            >
              {dark ? "☀️" : "🌙"}
            </button>
          </div>

          <motion.input
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            type="text"
            placeholder="Buscar artículo..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full mb-4 px-4 py-3 rounded-2xl bg-white dark:bg-neutral-800 dark:text-white shadow-sm focus:outline-none"
          />

          <div className="flex gap-2 overflow-x-auto mb-6 pb-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition
                  ${
                    category === cat
                      ? "bg-neutral-900 text-white dark:bg-white dark:text-black"
                      : "bg-neutral-200 dark:bg-neutral-700 dark:text-white"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="space-y-6">
            <AnimatePresence>
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* WhatsApp flotante */}
        <a
          href={`https://wa.me/${phoneNumber}?text=${globalMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-5 right-5 bg-emerald-500 w-14 h-14 rounded-full flex items-center justify-center text-white text-2xl shadow-lg hover:scale-110 transition"
        >
          💬
        </a>
      </div>
    </div>
  );
}
