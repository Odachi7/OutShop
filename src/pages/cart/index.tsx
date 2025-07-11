import { useContext, useEffect, useState } from "react"
import { CartMobile } from "../../components/cartMobile";
import { CartDesktop } from "../../components/cartDesktop";
import { HiChevronLeft } from "react-icons/hi";
import { Link } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import toast from "react-hot-toast";

export function Cart() {
    const [isMobile, setIsMobile] = useState(false)
    const [cupom, setCupom ] = useState("")
    const [cupomUsado, setCupomUsado] = useState(false)
    const { cartAmount, removerTodosProdutos, cupomDesconto } = useContext(CartContext)

    const CUPOM_10PORCENTO = "OUTDAYOFF10"

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 1024)
        }

        checkMobile()
        window.addEventListener('resize', checkMobile)

        return () => window.removeEventListener('resize', checkMobile);
    }, [])

    function verificarCupom() {
        if (cupomUsado && cupom.toUpperCase() === CUPOM_10PORCENTO) {
           toast.error('Cupom já foi ultilizado!', {
                iconTheme: {
                    primary: 'oklch(70.4% 0.191 22.216)', 
                    secondary: '#f0fdf4', 
                },
            });
            return;
        }

        if (cupom.toUpperCase() === CUPOM_10PORCENTO) {
            cupomDesconto()
            setCupomUsado(true);

            toast.success('Cupom aplicado com sucesso!', {
                iconTheme: {
                    primary: 'oklch(70.4% 0.191 22.216)', 
                    secondary: '#f0fdf4', 
                },
            });;
        } else if (cupom === "") {
            toast.error('Digite um cupom de desconto!', {
                iconTheme: {
                    primary: 'oklch(70.4% 0.191 22.216)', 
                    secondary: '#f0fdf4', 
                },
            });;
        } else { 
            toast.error('Cupom inválido!', {
                iconTheme: {
                    primary: 'oklch(70.4% 0.191 22.216)', 
                    secondary: '#f0fdf4', 
                },
            });
        }
    }

    return (
        <div className="w-full max-w-7xl mx-auto">
            <Link to={"/"} className="text-white flex items-center mt-18 px-3 max-w-24">
                <HiChevronLeft size={20}/> Voltar
            </Link>
           <div className="w-full mt-5 flex justify-between items-center px-4 mb-3">
                <h1 className="text-white font-bold text-xl">
                    MEUS PRODUTOS
                </h1>

                <button onClick={removerTodosProdutos} className="text-red-800 font-bold border-1 p-2 rounded-md hover:bg-red-800 hover:text-white hover:border-red-800 duration-150 cursor-pointer">
                    REMOVER TODOS 
                </button>
           </div>

            <div className="w-full px-4">
               <div className="w-full border-b-1 border-gray-400/10">
                    <p className="text-white/70 text-sm bg-gray-400/10 max-w-56 px-1">
                        Vendido e entregue por: <span className="font-bold">Outshop!</span>
                    </p>
               </div>

                {isMobile && cartAmount === 0 && (
                <div className="flex flex-col items-center mt-20">
                    <p className="text-white text-2xl font-bold">
                        Seu carrinho parece estar vazio!
                    </p>

                    <Link to={"/"} className="text-red-400 text-xl mt-3 hover:text-red-500 duration-200">
                        Voltar aos produtos
                    </Link>
                </div>
                )}

                {isMobile ? <CartMobile/> : <CartDesktop/>}

                {isMobile && cartAmount > 0 && (
                    <div className="w-full mt-5 mb-40">
                        <div className="w-full flex flex-col">
                            <div className="relative w-full mb-4">
                                <input
                                    type="text"
                                    id="coupon"
                                    placeholder="OUTDAYOFF10"
                                    value={cupom}
                                    onChange={(e) => setCupom(e.target.value)}
                                    className="peer w-full border border-gray-500 rounded-md bg-transparent px-4 py-4 text-white placeholder-transparent outline-none focus:placeholder-gray-400 focus:border-red-400 focus:ring-0"
                                />
                                <label
                                    htmlFor="coupon"
                                    className="absolute left-4 text-gray-400 text-sm transition-all duration-300
                                    peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500
                                    peer-focus:-top-3 peer-focus:text-sm peer-focus:text-red-400
                                    peer-not-placeholder-shown:-top-3 peer-not-placeholder-shown:bg-neutral-900 peer-not-placeholder-shown:px-2 
                                    peer-not-placeholder-shown:text-sm peer-not-placeholder-shown:text-red-400 select-none
                                    peer-focus:bg-neutral-900 peer-focus:px-2 peer-focus:rounded-2xl"
                                >
                                    Cupom de desconto
                                </label>
                            </div>

                            <button onClick={verificarCupom} className="bg-red-800 text-white font-bold p-3 rounded-md cursor-pointer">
                                APLICAR CUPOM 
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}