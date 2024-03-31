import React, { createContext, useContext, useState, Dispatch, SetStateAction, ReactNode } from 'react';
import { Cart } from 'types';

interface CartContextType {
    cartItemsUpdate: boolean;
    setCartItemsUpdate: Dispatch<SetStateAction<boolean>>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [cartItemsUpdate, setCartItemsUpdate] = useState<boolean>(false);

    return (
        <CartContext.Provider value={{ cartItemsUpdate, setCartItemsUpdate }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = (): CartContextType => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
