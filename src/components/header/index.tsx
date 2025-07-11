import { useContext } from "react"
import { Link } from "react-router-dom"
import { FiSearch, FiShoppingCart} from "react-icons/fi"
import { useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import { useSearch } from "../../context/SearchContext";

import { CartContext } from "../../context/CartContext"

export function Header() {
    const { cartAmount } = useContext(CartContext)
    const { setSearchTerm } = useSearch()
    const [home, setHome] = useState(false)
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

    const location = useLocation()

    useEffect(() => {
        if (location.pathname === "/") {
        setHome(true);
        } else {
        setHome(false);
        }
    }, [location.pathname])

    useEffect(() => {
        const handleResize = () => {
        setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);


    return (
        <div>
            <header className="fixed top-0 w-full bg-neutral-900 px-1 shadow-md shadow-black/10 pb-1 z-999">
                <nav className="w-full max-w-7xl h-14 flex items-center justify-between px-5 mx-auto">
                    <Link to="/" className="text-2xl font-bold lg:text-4xl text-white">
                        Out<span className="text-red-400">Shop</span>
                    </Link>
                    
                    <div className="flex justify-center items-center mt-1">
                        {home && !isMobile && (
                            <div className="flex">
                                <div className="relative w-96 mx-5">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FiSearch className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Search products..."
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-red-400 focus:border-red-400"
                                    />
                                </div>
                            </div>
                        )}
                        
                        <Link className="relative" to="/cart">
                            <FiShoppingCart size={24} color="#FFF"/>
                            {cartAmount > 0 && (
                                <span className="absolute -top-3 -right-3 bg-red-400 px-2.5 h-6 w-6 flex justify-center items-center rounded-full text-white">
                                    {cartAmount}
                                </span>
                            )}
                        </Link>
                    </div>
                </nav>

                {home && isMobile && (
                    <div className="flex max-w-xl mx-auto pb-5">
                        <div className="relative w-full mx-5">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FiSearch className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                placeholder="Search products..."
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-red-400 focus:border-red-400"
                            />
                        </div>
                    </div>
                )}
            </header>
        </div>
    )
}