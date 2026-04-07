import {useState} from "react";
import {motion} from "framer-motion";

const phoneNumber = "5491162625807";

export default function ProductCard({product, view}) {
  const [open, setOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  const message = encodeURIComponent(
    `Hola! 👋

Me interesa:

🛍️ ${product.name}
📝 ${product.description}
💲 $${product.price.toLocaleString("es-AR")}

¿Sigue disponible?`,
  );

  const isList = view === "list";
  const isCompact = view === "compact";

  const images = Array.isArray(product.images)
    ? product.images
    : Array.isArray(product.image)
      ? product.image
      : [`${import.meta.env.BASE_URL}${product.image}`];

  return (
    <>
      <motion.div
        layout
        initial={{opacity: 0, y: 20}}
        animate={{opacity: 1, y: 0}}
        exit={{opacity: 0}}
        transition={{duration: 0.3}}
        className={`
          border border-black/10 dark:border-white/10
          rounded-2xl overflow-hidden
          ${isList ? "flex items-stretch" : ""}
        `}
      >
        <div
          className={`relative cursor-pointer ${isList ? "w-1/2" : ""}`}
          onClick={() => {
            setCurrentImage(0);
            setOpen(true);
          }}
        >
          <div className="aspect-square w-full relative">
            <img
              src={images[currentImage]}
              alt={product.name}
              className={`w-full h-full object-cover ${
                isList ? "" : "rounded-xl"
              } ${product.status === "sold" ? "opacity-90" : ""}`}
            />

            {/* Overlay + tag SOLD */}
            {product.status === "sold" && (
              <div className="absolute inset-0 flex items-center justify-center">
                {/* fondo suave */}
                <div className="absolute inset-0 bg-white/40 dark:bg-black/40 rounded-xl" />

                {/* pill */}
                <span className="relative z-10 border border-red-500 text-red-500 px-4 py-1 rounded-full text-xs uppercase tracking-widest bg-white dark:bg-black">
                  Vendido
                </span>
              </div>
            )}
          </div>

          {product.status !== "sold" && product.offer && (
            <span className="absolute top-3 right-3 border border-black dark:border-white text-xs px-2 py-1 uppercase tracking-widest bg-white dark:bg-black">
              Oferta
            </span>
          )}
        </div>

        <div
          className={`
            ${isList ? "w-1/2 p-5 flex flex-col justify-center" : "p-5"}
            ${isCompact ? "p-3" : ""}
            space-y-2
          `}
        >
          <h2 className="text-black dark:text-white font-medium">
            {product.name}
          </h2>

          {!isCompact && (
            <p className="text-sm text-black/60 dark:text-white/60">
              {product.description}
            </p>
          )}

          {!isCompact && (
            <p className="text-sm text-red-700 dark:text-red-400">
              {product.descriptionAdditional}
            </p>
          )}

          <p className="font-semibold text-black dark:text-white">
            ${product.price.toLocaleString("es-AR")}
          </p>

          {!isCompact && product.status !== "sold" && (
            <a
              href={`https://wa.me/${phoneNumber}?text=${message}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center border border-black dark:border-white py-2 rounded-full hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition duration-300 text-sm"
            >
              Consultar
            </a>
          )}
          {product.status === "sold" && (
            <p className="font-semibold text-red-500 dark:text-red-400">
              Vendido
            </p>
          )}
        </div>
      </motion.div>

      {open && (
        <div className="fixed inset-0 bg-white/95 dark:bg-black/95 flex items-center justify-center z-50">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setCurrentImage((prev) =>
                prev === 0 ? images.length - 1 : prev - 1,
              );
            }}
            className="absolute left-6 text-3xl"
          >
            ‹
          </button>

          <img
            src={images[currentImage]}
            alt={product.name}
            className="max-h-[85%] max-w-[90%] object-contain"
          />

          <button
            onClick={(e) => {
              e.stopPropagation();
              setCurrentImage((prev) =>
                prev === images.length - 1 ? 0 : prev + 1,
              );
            }}
            className="absolute right-6 text-3xl"
          >
            ›
          </button>

          <div
            onClick={() => setOpen(false)}
            className="absolute inset-0 -z-10"
          />
        </div>
      )}
    </>
  );
}
