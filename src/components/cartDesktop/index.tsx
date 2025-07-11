import {HiChevronLeft, HiChevronRight} from "react-icons/hi"
import GarantiaOptions from "../serviçosCart"
import { FaTrash } from "react-icons/fa"
import { useContext} from "react"
import { CartContext } from "../../context/CartContext"
import { FiSearch } from "react-icons/fi"
import { Link } from "react-router-dom"


export function CartDesktop() {
    const { cart, menosUm, maisUm, removerProduto, converterParaReal, total, totalServicosValor } = useContext(CartContext)

    function dezPorcento(valor: number) {
        const cincoP = (valor / 100) * 10  
        const resultado = valor - cincoP

        return resultado
    }

    return (
    <>
        {total === 0 && (
            <div className="w-full">
                <div className="flex flex-col items-center mt-20">
                        <p className="text-white text-2xl font-bold">
                            Seu carrinho parece estar vazio!
                        </p>

                        <Link to={"/"} className="text-red-400 text-xl mt-3 hover:text-red-500 duration-200">
                            Voltar aos produtos
                        </Link>
                    </div>
            </div>
        )}
        <section className="w-full flex">
            <div className="w-full">
                {cart.map(product => {
                    return (
                        <section key={product.id} className="w-full flex flex-col items-center mb-5">
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

                                        <span className="text-red-400 font-bold text-lg md:text-xl">
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
                        </section>
                    )
                })}   
            </div>

            {total > 0 && (
                <div className="w-full">
                <aside className="w-full pt-4 bg-neutral-900 sticky top-20 z-50 h-fit">
                    <div className="w-full px-4">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <FiSearch className="text-white"/>
        
                                <h2 className="font-bold text-white z-100">
                                    RESUMO
                                </h2>
                            </div>
        
                            <h1 className="text-white z-100 text-sm">
                                VALOR NO PIX: <span className="font-bold">{converterParaReal(dezPorcento(total + totalServicosValor))}</span>
                            </h1>
                        </div>
        
                        <div className={"block"}>
                            <div className="w-full flex flex-col mt-8 border-b border-black/30 pb-2">
                                <div className="flex justify-between ">
                                    <p className="text-white/80 text-sm">
                                        Valor dos Produtos: 
                                    </p>
        
                                    <span className="text-white font-bold">
                                        {converterParaReal(total)}
                                    </span>
                                </div>
        
                                <div className="flex justify-between ">
                                    <p className="text-white/80 text-sm">
                                        Valor dos Serviços: 
                                    </p>
        
                                    <span className="text-white font-bold">
                                        {converterParaReal(totalServicosValor)}
                                    </span>
                                </div>
                            </div>
        
                            <div className="mt-5 bg-neutral-800 p-2">
                                <div className="flex justify-between">
                                    <p className="text-white/80 text-sm">
                                        Total a prazo: 
                                    </p>
        
                                    <span className="text-white font-bold">
                                        {converterParaReal(total + totalServicosValor)}
                                    </span>
                                </div>
        
                                <p className="text-white/80 text-end text-sm">
                                    (em até <strong>10x</strong> de <strong>{converterParaReal((total + totalServicosValor) / 10)}</strong> sem juros)
                                </p>
                            </div>
        
                            <div className="mt-5 bg-neutral-800 p-2">
                                <div className="flex justify-between">
                                    <p className="text-white/80 text-sm">
                                        Total á vista no <strong>pix:</strong> 
                                    </p>
        
                                    <span className="text-white font-bold">
                                        {converterParaReal(dezPorcento(total + totalServicosValor))}
                                    </span>
                                </div>
        
                                <p className="text-white/80 text-end text-sm">
                                    (Ecomomize: <strong className="text-white">{converterParaReal((total + totalServicosValor) - dezPorcento(total + totalServicosValor))}</strong>)
                                </p>
                            </div>
        
                        </div>
        
                        <button className="text-white w-full font-bold mt-5 py-3.5 mb-5 bg-red-800 rounded-sm text-md cursor-pointer hover:bg-red-800/70 duration-150">
                            IR PARA O PAGAMENTO
                        </button>
                    </div>
                </aside>
            </div>
            )}
        </section>
        </>
    )
}