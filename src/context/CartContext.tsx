import { createContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { ProductProps } from "./ProductContext";
import toast from "react-hot-toast";

interface CartContextData {
    cart: CartProps[]
    cartAmount: number;
    addItemCart: (NewItem: ProductProps) => void;
    menosUm: (id: number) => void;
    maisUm: (id: number) => void;
    removerProduto: (id: number) => void;
    removerTodosProdutos: () => void;
    converterParaReal: (valor: number) => string;
    total: number;
    servicoValor: (idOpc: number, cartItem: CartProps) => void;
    selectedGarantias: { [id: number]: number }; 
    valoresServico: { [id: number]: number };
    totalServicosValor: number;
    cupomDesconto: () => void;
}

export interface CartProps {
    id: number; 
    title: string;
    description?: string; 
    price: number; 
    thumbnail: string;
    amount: number;
    total: number; 
}

interface CartProviderProps {
    children: ReactNode
}

export const CartContext = createContext({} as CartContextData)

function CartProvider({children}: CartProviderProps) {
    const [cart, setCart] = useState<CartProps[]>([])
    const [total, setTotal] = useState(0)
    const [selectedGarantias, setSelectedGarantias] = useState<{ [id: number]: number }>({});
    const [valoresServico, setValoresServico] = useState<{ [id: number]: number }>({});
    const [totalServicosValor, setTotalServicosValor] = useState(0);

    function addItemCart(NewItem: ProductProps) {
        const indexItem = cart.findIndex(item => item.id === NewItem.id)

        if (indexItem !== -1) {
            let cartList = cart

            cartList[indexItem].amount = cartList[indexItem].amount + 1
            cartList[indexItem].total = cartList[indexItem].amount * cartList[indexItem].price
            
            setCart(cartList)
            totalResultCart(cartList)
            toast.success('Produto adicionado!', {
                iconTheme: {
                    primary: 'oklch(70.4% 0.191 22.216)', 
                    secondary: '#f0fdf4', 
                },
            });
            return
        }

        let data = { 
            ...NewItem, 
            amount: 1,
            total: NewItem.price
        }

        setCart(products => [...products, data])
        totalResultCart([...cart, data])
        toast.success('Produto adicionado!', {
            iconTheme: {
                primary: 'oklch(70.4% 0.191 22.216)', 
                secondary: '#f0fdf4', 
            },
        });
    }

    function menosUm(id: number) {
        const novoCarrinho = cart.map(item => {
            if (item.id === id && item.amount > 1) {
                const novaQuantidade = item.amount - 1;
                return {
                    ...item,
                    amount: novaQuantidade,
                    total: novaQuantidade * item.price,
                };
            }
            return item;
        });

        setCart(novoCarrinho);
        totalResultCart(novoCarrinho);
    }

    function maisUm(id: number) {
        const novoCarrinho = cart.map(item => {
            if (item.id === id && item.amount >= 1 && item.amount <= 29) {
                const novaQuantidade = item.amount + 1;
                return {
                    ...item,
                    amount: novaQuantidade,
                    total: novaQuantidade * item.price,
                };
            }
            return item;
        });

        setCart(novoCarrinho);
        totalResultCart(novoCarrinho);
    }

    function removerProduto(id: number) {
        const novoCarrinho = cart.filter(item => item.id !== id)
        setCart(novoCarrinho)
        totalResultCart(novoCarrinho)
        toast.success('Produto removido com sucesso!', {
            iconTheme: {
                primary: 'oklch(70.4% 0.191 22.216)', 
                secondary: '#f0fdf4', 
            },
        });
    }

    function removerTodosProdutos() {
        setCart([])
        totalResultCart([])
        
        if (total !== 0) {
            toast.success('Produtos removidos!', {
            iconTheme: {
                primary: 'oklch(70.4% 0.191 22.216)', 
                secondary: '#f0fdf4', 
            },
            });
        }
    }

    function converterParaReal(valor: number) {
        const valorConvertido = valor * 5.30;
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(valorConvertido);
    }

    function totalResultCart(items: CartProps[]) { 
        let myCart = items
        let result = myCart.reduce((acc, obj) => { return acc + obj.total }, 0)
        setTotal(result)
    }

    function servicoValor(idOpc: number, cartItem: CartProps) {
        let valorCalculado = 0;

        if (idOpc === 12) {
            valorCalculado = (cartItem.price / 100) * 15;
        } else if (idOpc === 24) {
            valorCalculado = (cartItem.price / 100) * 25;
        } else if (idOpc === 36) {
            valorCalculado = (cartItem.price / 100) * 35;
        }

        setSelectedGarantias(prev => ({
            ...prev,
            [cartItem.id]: idOpc
        }));

        setValoresServico(prev => ({
            ...prev,
            [cartItem.id]: valorCalculado
        }));
    }

    useEffect(() => {
        const total = cart.reduce((acc, item) => {
            const valorServicoItem = valoresServico[item.id] || 0;
            return acc + valorServicoItem * item.amount;
        }, 0);

        setTotalServicosValor(total);
    }, [valoresServico, cart]);

    function cupomDesconto() {
        let desconto = (total / 100) * 10
        const result = total - desconto
        
        setTotal(result)
    }

    return (
        <CartContext.Provider 
            value={{
                cart,
                cartAmount: cart.length,
                addItemCart,
                menosUm,
                maisUm, 
                removerProduto,
                removerTodosProdutos,
                converterParaReal,
                total,
                servicoValor,
                selectedGarantias,
                valoresServico,
                totalServicosValor,
                cupomDesconto
            }}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider