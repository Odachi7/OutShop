import { Link } from "react-router-dom";


export function NotFound() {
    return (
        <div className="w-full h-96 flex flex-col items-center justify-center mt-20">
            <h1 className="text-4xl text-red-400 font-black">
                Página não encontrada!
            </h1>

            <Link to={"/"} className="text-white/75 mt-3 text-xl hover:text-white duration-200">
             Voltar aos produtos.
            </Link>
        </div>
    )
}