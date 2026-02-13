import {useState} from "react";
// eslint-disable-next-line no-unused-vars
import {motion} from "framer-motion";

const phoneNumber = "5491162625807";

export default function ProductCard({product}) {
  const [open, setOpen] = useState(false);

  const message = encodeURIComponent(
    `Hola! 👋

Estoy interesada en:

🛍️ ${product.name}
📝 ${product.description}
💲 $${product.price.toLocaleString("es-AR")}

¿Sigue disponible? 😊`,
  );

  return (
    <>
      <motion.div
        layout
        initial={{opacity: 0, y: 25}}
        animate={{opacity: 1, y: 0}}
        exit={{opacity: 0}}
        className="bg-white dark:bg-neutral-800 rounded-3xl shadow-md overflow-hidden"
      >
        <div className="relative cursor-pointer" onClick={() => setOpen(true)}>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-64 object-cover"
          />

          {product.offer && (
            <span className="absolute top-3 right-3 bg-red-500 text-white text-xs px-3 py-1 rounded-full">
              OFERTA
            </span>
          )}
        </div>

        <div className="p-5 space-y-3">
          <h2 className="font-semibold text-neutral-800 dark:text-white">
            {product.name}
          </h2>

          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            {product.description}
          </p>

          <p className="text-xl font-bold dark:text-white">
            ${product.price.toLocaleString("es-AR")}
          </p>

          {product.status !== "sold" && (
            <a
              href={`https://wa.me/${phoneNumber}?text=${message}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center bg-blue-500 text-white py-3 rounded-2xl hover:bg-blue-600 transition"
            >
              Consultar
            </a>
          )}
        </div>
      </motion.div>

      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
        >
          <img
            src={product.image}
            alt={product.name}
            className="max-h-[80%] rounded-2xl"
          />
        </div>
      )}
    </>
  );
}
