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
        initial={{opacity: 0, y: 20}}
        animate={{opacity: 1, y: 0}}
        exit={{opacity: 0}}
        className="bg-white border border-black/10 rounded-2xl overflow-hidden"
      >
        <div className="relative cursor-pointer" onClick={() => setOpen(true)}>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-64 object-cover"
          />

          {product.offer && (
            <span className="absolute top-4 right-4 border border-black text-black text-[10px] px-3 py-1 uppercase tracking-widest">
              Oferta
            </span>
          )}
        </div>

        <div className="p-5 space-y-3">
          <h2 className="text-black text-lg font-medium tracking-wide">
            {product.name}
          </h2>

          <p className="text-sm text-black/60">{product.description}</p>

          <p className="text-lg font-semibold text-black">
            ${product.price.toLocaleString("es-AR")}
          </p>

          {product.status !== "sold" && (
            <a
              href={`https://wa.me/${phoneNumber}?text=${message}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center border border-black text-black py-3 rounded-full hover:bg-black hover:text-white transition duration-300"
            >
              Consultar
            </a>
          )}
        </div>
      </motion.div>

      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-white/95 flex items-center justify-center z-50"
        >
          <img src={product.image} alt={product.name} className="max-h-[85%]" />
        </div>
      )}
    </>
  );
}
