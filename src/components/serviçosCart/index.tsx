import { useContext, useState } from "react";
import { HiChevronDown, HiChevronUp } from "react-icons/hi";
import { HiWrenchScrewdriver } from "react-icons/hi2";
import { CartContext } from "../../context/CartContext";

type GarantiaOptionsProps = {
  cartItem: {
    id: number; 
    title: string;
    description?: string; 
    price: number; 
    thumbnail: string;
    amount: number;
    total: number; 
  }
};

type GarantiaOption = {
  id: number;
  label: string;
};

const GarantiaOptions: React.FC<GarantiaOptionsProps> = ({ cartItem }) => {
  const [info, setInfo] = useState(true);
  const { converterParaReal, servicoValor, selectedGarantias, valoresServico} = useContext(CartContext);

  function handleInfo() {
    setInfo((prev) => !prev);
  }

  const opcoes: GarantiaOption[] = [
    { id: 0, label: "Sem garantia" },
    { id: 12, label: "12 Meses de Garantia Estendida OutShop" },
    { id: 24, label: "24 Meses de Garantia Estendida OutShop" },
    { id: 36, label: "36 Meses de Garantia Estendida OutShop" },
  ];

  return (
    <div className="w-full bg-gray-950/50 p-4 mt-3">
      <div className="w-full flex justify-between items-center mb-4">
        <h2 className="text-white font-bold flex items-center gap-1">
          <HiWrenchScrewdriver /> SERVIÇOS
        </h2>

        <button onClick={handleInfo}>
          {info ? (
            <HiChevronUp size={26} className="text-red-800 cursor-pointer" />
          ) : (
            <HiChevronDown size={26} className="text-red-800 cursor-pointer" />
          )}
        </button>
      </div>

      <div className={`space-y-3 ${info ? "block" : "hidden"}`}>
        {opcoes.map((opcao) => (
          <label
            key={opcao.id}
            className="flex items-end gap-2 cursor-pointer"
          >
            <input
              type="radio"
              name={`garantia-${cartItem.id}`}
              value={opcao.id}
              checked={selectedGarantias[cartItem.id] === opcao.id}
              onClick={() => servicoValor(opcao.id, cartItem)}
              className="accent-red-400 mt-1"
            />

            <div className="w-full flex items-center justify-between">
              <div className="max-w-60 leading-[1] mt-2">
                <span className="text-[12px] md:text-sm text-white/80">
                  {opcao.label}
                </span>
              </div>

              {opcao.id !== 0 && (
                <div className="w-2/3 flex items-center justify-end">
                  <p className="text-white/80 text-end text-[11px] md:text-sm">
                    Até 10x sem juros de <br />
                    {converterParaReal(
                      ((cartItem.price / 100) *
                        (opcao.id === 12
                          ? 15
                          : opcao.id === 24
                          ? 25
                          : opcao.id === 36
                          ? 35
                          : 0)) / 10
                    )}
                  </p>
                </div>
              )}
            </div>
          </label>
        ))}
      </div>

      <p className="text-[11px] md:text-sm text-white/80 mt-4">
        Ao adicionar a Garantia Estendida Original Ampliada, declaro que tive
        acesso, li e aceito as{" "}
        <span className="text-red-800">Condições gerais</span>
      </p>

      <div className="w-full flex justify-end mt-5 md:mt-8">
        <span className="text-white text-[12px] md:text-sm">
          <span className="font-bold">Subtotal serviços:</span>{" "}
          {converterParaReal((valoresServico[cartItem.id] || 0) * cartItem.amount)}
        </span>
      </div>
    </div>
  );
};

export default GarantiaOptions;
