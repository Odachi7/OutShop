import { useContext, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { HiChevronUp, HiChevronDown } from "react-icons/hi";
import { CartContext } from "../../context/CartContext";

export function TotalMobile() {
    const [info, setInfo] = useState(false)
    const {total, converterParaReal, totalServicosValor} = useContext(CartContext)

    function dezPorcento(valor: number | string) {
        let numero: number;

        if (typeof valor === "string") {
            const limpo = valor.replace("R$", "").replace(/\./g, "").replace(",", ".").trim();
            numero = parseFloat(limpo);
        } else {
            numero = valor;
        }

        const desconto = (numero / 100) * 10;
        const resultado = numero - desconto;

        return resultado;
    }

    function handleInfo() {
        if(info === false) {
            setInfo(true)
        } else {
            setInfo(false)
        }
    }

    return (
        <footer className="w-full fixed bottom-0 pt-4 bg-neutral-900 z-100">
            <div className="before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-1 before:shadow-[0_-4px_8px_rgba(0,0,0,0.55)] z-10"></div>

           <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-14 h-14 bg-neutral-900 rounded-full flex items-start justify-center">
                <button onClick={() => handleInfo()}>
                    {info ? <HiChevronDown className="text-white text-2xl cursor-pointer"/> : <HiChevronUp className="text-white text-2xl cursor-pointer"/>}
                    
                </button>
                <HiChevronUp className="text-white hidden text-2xl" />
            </div>

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

                <div className={`${info ? "block" : "hidden"}`}>
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
                            <p className="text-green-400/80 text-sm">
                                Total á vista no <strong>pix:</strong> 
                            </p>

                            <span className="text-green-400 font-bold">
                                {converterParaReal(dezPorcento(total + totalServicosValor))}
                            </span>
                        </div>

                        <p className="text-green-400/80 text-end text-sm">
                            (Ecomomize: <strong className="text-green-400">{converterParaReal((total + totalServicosValor) - dezPorcento(total + totalServicosValor))}</strong>)
                        </p>
                    </div>

                </div>

                <button className="text-white w-full font-bold mt-5 py-3.5 mb-5 bg-red-400 rounded-sm text-md cursor-pointer hover:bg-red-400/70 duration-150">
                    IR PARA O PAGAMENTO
                </button>
            </div>
        </footer>
    )
}
