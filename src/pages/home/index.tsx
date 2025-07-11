import { BsCart, BsCartPlus } from "react-icons/bs"
import { useProducts, type ProductProps } from "../../context/ProductContext"
import { useContext } from "react"
import { CartContext } from "../../context/CartContext"
import { Link, useNavigate } from "react-router-dom"
import { useSearch } from "../../context/SearchContext"

export function Home() {
    const { addItemCart } = useContext(CartContext)
    const { products, loading } = useProducts()
    const { searchTerm } = useSearch()
    const navigate = useNavigate()

    if(loading) {
        return (
            <h1 className="w-full h-96 flex justify-center items-center text-4xl font-bold text-red-400">
                Carregando...
            </h1>
        )
    }

    const filteredProducts = products.filter(prod =>
        prod.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    function converterParaReal(valor: number, cotacao = 5.30) {
        const valorConvertido = valor * cotacao;
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(valorConvertido);
    }

    function cincoPorcento(valor: number) {
        return valor * 0.05;
    }

    function handleComprar(product: ProductProps) {
        addItemCart(product) 
        navigate("/cart")
    }

    return (
        <div>
            <main className="w-full max-w-[1350px] mx-auto px-4 mt-36">
                <h1 className="text-center text-white font-bold text-xl mt-10 md:mt-12 md:text-3xl md:mb-4 lg:mt-17 lg:text-4xl xl:text-5xl">
                    OS MELHORES PRODUTOS VOCÊ SÓ ENCONTRA AQUI!
                </h1>
                <h3 className="text-center text-sm px-5 font-medium text-white/60 lg:text-2xl">
                    Tecnologia de ponta e eletrônicos premium a preços imbatíveis.
                </h3>

                <h2 className="font-bold text-2xl text-white mt-10">
                    Produtos em destaque
                </h2>


                <div className="mt-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredProducts.map(prod => (
                        <section  key={prod.id} className="w-full flex flex-col items-center rounded-lg mb-5 shadow-2xl border-1 border-red-400/20">
                            <div className="w-full flex items-center justify-end pt-3 pr-4">
                                <button onClick={() => addItemCart(prod)} className="text-white cursor-pointer text-2xl z-100">
                                    <BsCartPlus /> 
                                </button>
                            </div>
                           <Link to={`produto/${prod.id}`} className="w-full">
                                <div className="w-full flex items-center justify-center gap-2 -mt-5">
                                    
                                    <div className="w-full flex items-center justify-center">
                                        <img 
                                            src={prod.title === "iPhone 13 Pro" ? "https://www.frandroid.com/wp-content/uploads/2021/09/apple-iphone-13-pro-frandroid-2021.png" : prod.thumbnail } 
                                            alt={prod.title}
                                            className="-w-35 h-35 mt-2"
                                        />
                                    </div>
                                    

                                    <div className="w-full flex flex-col items-start justify-center">
                                        {(prod.price * 5.30) > 4000 && (
                                            <span className="text-white text-[11px] font-medium bg-green-800 px-2 rounded-2xl">
                                                Frete Gratis*
                                            </span>
                                        )}

                                        <p className="text-white font-medium text-xl mb-2 pr-1">
                                            {prod.title}
                                        </p>
                                    </div>
                                </div>
                           </Link>
                            
                            <div className="w-full p-4 rounded-b-2xl text-white flex flex-col">
                                <strong className="text-red-400 text-4xl">
                                    {converterParaReal(prod.price)}
                                </strong>

                                <div>
                                    <p className="mt-2 text-sm">
                                        À vista com <span className="font-bold">5% OFF</span> ou
                                    </p>

                                    <p className="text-sm">
                                        <span className="font-bold">{converterParaReal(prod.price + cincoPorcento(prod.price))}</span> Em até 10x de <span className="font-bold">{converterParaReal((prod.price + cincoPorcento(prod.price)) / 10)}</span> sem juros no cartão
                                    </p>
                                </div>

                            </div>
                            <div className="w-full">
                                <button onClick={() => handleComprar(prod)} className="bg-red-400 w-full py-2 font-bold rounded-b flex items-center justify-center text-white gap-2 mt-4 cursor-pointer hover:bg-red-400/80 duration-200">
                                    <BsCart size={20} /> COMPRAR
                                </button>
                            </div>
                    </section>
                    ))}
                </div>
            </main>
        </div>
    )
}