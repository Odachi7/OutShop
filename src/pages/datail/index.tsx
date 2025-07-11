import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useProducts, type ProductProps } from "../../context/ProductContext";
import { CartContext } from "../../context/CartContext";
import { HiChevronLeft } from "react-icons/hi";

export function Datail() {
  const { id } = useParams();
  const [product, setProduct] = useState<ProductProps | null>(null);
  const { getProductById } = useProducts();
  const { converterParaReal, addItemCart } = useContext(CartContext)

  const navigate = useNavigate()

  useEffect(() => {
    async function getProduct() {
      if (!id) return;

      const response = await getProductById(Number(id));
      setProduct(response);
    }

    getProduct();
  }, [id, getProductById]);

  function handleComprar(product: ProductProps) {
    addItemCart(product) 
    navigate("/cart")
  }

  if (!product) {
    return (
      <div className="w-full h-96 flex items-center justify-center text-red-400 text-2xl">
        <p>Carregando produto...</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto mt-18">
      <Link to={"/"} className="text-white flex items-center px-2 max-w-24 mb-3">
        <HiChevronLeft size={20}/> Voltar
      </Link>
      <section className="w-full px-4">
        <div className="w-full flex items-center justify-between">
          <p className="text-white/80">
            Vendido e entregue por:{" "}
            <span className="text-red-400/80 font-medium">OutShop</span>
          </p>

          <p className="text-white/80">
            categoria: <span className="font-medium">{product.category}</span>
          </p>
        </div>
        <div className="w-full flex flex-col mt-8 lg:mt-12 max-2xl:px-5">
          <div className="w-full flex flex-col lg:flex-row gap-4">
            <div className="w-full flex flex-col items-start mt-2 ">
              <img
                src={
                  product.title === "iPhone 13 Pro"
                    ? "https://www.frandroid.com/wp-content/uploads/2021/09/apple-iphone-13-pro-frandroid-2021.png"
                    : product.thumbnail
                }
                alt={product.title}
                className="w-70 lg:w-80 2xl:w-90 h-70 lg:h-80 2xl:h-90 object-cover max-lg:mx-auto p-3 mb-4 rounded-xl bg-neutral-800 shadow-md shadow-neutral-950"
              />

              <h1 className="text-white font-medium text-xl lg:mt-4 lg:text-2xl 2xl:text-3xl">
                {product.title}
              </h1>

              <h3 className="text-white/85 mt-3 lg:mt-5 lg:text-xl">
                {product.description}
              </h3>
            </div>

            <div className="lg:w-full lg:flex lg:justify-end max-lg:mb-5">
              <div className="lg:w-87 2xl:w-95 2xl:p-4 flex flex-col justify-between border rounded-md border-white/10 shadow-md p-3">
                <div>
                  <h4 className="text-white/55 line-through text-sm lg:text-lg 2xl:text-xl">
                    {converterParaReal(product.price + (product.price / 100 * 5))}
                  </h4>

                  <h2 className="text-2xl lg:text-3xl 2xl:text-4xl text-red-400 font-bold">
                    {converterParaReal(product.price)}
                  </h2>

                  <p className="text-sm lg:text-lg 2xl:text-xl 2xl:mt-5 text-white/55">
                    À vista no PIX com <span className="font-medium text-white/55">5% de desconto</span>
                  </p>

                  <p className="text-sm lg:text-lg 2xl:text-xl mt-3 text-white/55">
                    <span className="font-medium">R$ 4.199,00</span> em até 10x de <span className="font-medium">R$ 419,90</span> sem juros <br />
                    ou 1x com <span className="font-medium">5% de desconto</span> no cartão
                  </p>

                  <p className="text-sm lg:text-lg 2xl:text-xl text-green-700 font-medium mt-2">
                    Em estoque
                  </p>
                </div>

                <div>
                  <button onClick={() => handleComprar(product)} className="w-full bg-red-400 text-white font-medium rounded-sm py-2 mt-2 lg:text-lg cursor-pointer">
                    COMPRAR AGORA
                  </button>
                  <button onClick={() => addItemCart(product)} className="w-full bg-red-400 text-white font-medium rounded-sm py-2 mt-3 lg:text-lg cursor-pointer">
                    ADICIONAR AO CARRINHO
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
