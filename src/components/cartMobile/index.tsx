import { FaTrash } from "react-icons/fa";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import GarantiaOptions from "../serviçosCart";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { TotalMobile }  from "../totalMobile";

export function CartMobile() {
    const {cart, maisUm, menosUm, removerProduto, converterParaReal} = useContext(CartContext)

    function dezPorcento(valor: number) {
        const cincoP = (valor / 100) * 10  
        const resultado = valor - cincoP

        return resultado
    }

    return (
        <>
        {cart.map(product => {
            return (
                <section key={product.id} className="w-full flex flex-col items-center">
                    <div className="w-full flex items-center justify-between gap-4">
                        <div className="w-full flex items-center gap-4 mt-5">
                            <img 
                                src={product.thumbnail}
                                alt={product.title}
                                className="w-20"
                            />

                            <h1 className="text-white font-bold text-[11px] md:text-sm max-w-[420px]">
                                {product.title}
                            </h1>
                        </div>

                        <div className="hidden md:flex flex-col justify-end items-end gap-1 md:pr-4">
                            <span className="text-white pr-3">quant.</span>

                            <div className="w-full flex items-center justify-end gap-4">
                                <button onClick={() => menosUm(product.id)} className="text-white/70 hover:text-white cursor-pointer">
                                    <HiChevronLeft/>
                                </button>
                                <p className="font-bold text-white">{product.amount}</p>
                                <button onClick={() => maisUm(product.id)} className="text-white/70 hover:text-white cursor-pointer">
                                    <HiChevronRight/>
                                </button>
                            </div>
                        </div>

                        <button onClick={() => removerProduto(product.id)} className="text-red-800 cursor-pointer hover:text-red-600 pr-1 md:flex items-center gap-1">
                            <FaTrash className="text-2xl md:text-xl"/>

                            <span className="hidden md:flex font-bold">REMOVER</span>
                        </button>
                    </div>
                    
                    <div className="w-full flex flex-col mt-4 md:flex-row md:items-center md:justify-between">
                        <div>
                            <p className="text-white/80 text-[12px] md:text-[16px]">
                                Com desconto no PIX: <span className="font-bold">{converterParaReal(dezPorcento(product.price))}</span>
                            </p>

                            <p className="text-white/80 text-[12px] md:text-[16px] mb-2">
                                Parcelado no cartão sem juros: <span className="font-bold">{converterParaReal(product.price)}</span>
                            </p>
                        </div>

                        <div className="flex">
                            <div className="w-full flex flex-col">
                                <span className="text-white/80 text-sm my-2 md:text-[16px]">
                                    Preço à vista no PIX:
                                </span>

                                <span className="text-red-400/90 font-bold text-lg md:text-xl">
                                    {converterParaReal(dezPorcento(product.price) * product.amount)}
                                </span>
                            </div>
                            <div className="w-full flex flex-col justify-end items-end gap-1 md:hidden">
                                <span className="text-white pr-3">quant.</span>

                                <div className="w-full flex items-center justify-end gap-4">
                                    <button onClick={() => menosUm(product.id)} className="text-white/70 hover:text-white cursor-pointer">
                                        <HiChevronLeft/>
                                    </button>
                                    <span className="font-bold text-white">{product.amount}</span>
                                    <button onClick={() => maisUm(product.id)} className="text-white/70 hover:text-white cursor-pointer">
                                        <HiChevronRight/>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <GarantiaOptions cartItem={product}/>
                    <TotalMobile />
                </section>
            )
        })}   
        </>
    )
}
