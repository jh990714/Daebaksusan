package com.seafood.back.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.seafood.back.dto.CartDTO;
import com.seafood.back.entity.CartEntity;
import com.seafood.back.service.CartService;

import java.util.List;

@RestController
@RequestMapping("/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    @GetMapping("/get")
    public List<CartDTO> getCartItemsForMember(Authentication authentication) {
        String memberId = authentication.getName();
        
        return cartService.getCartItemsForMember(memberId);
    }

    @PostMapping("/delete")
    public String deleteSelectedCartItems(@RequestBody List<Long> cartItemIdsToDelete, Authentication authentication) {
        try { 
            if (cartItemIdsToDelete == null) {
                throw new IllegalArgumentException("cartItemIdsToDelete cannot be null");
            }
            String memberId = authentication.getName();
            cartService.deleteSelectedCartItems(memberId, cartItemIdsToDelete);
            return "Selected cart items deleted successfully.";
        } catch (Exception e) {
            e.printStackTrace();
            return "Error deleting selected cart items.";
        }
    }

    @PostMapping("/cookieSave")
    public ResponseEntity<?> saveCartItems(@RequestBody CartEntity[] cartItems, Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }

        String memberId = authentication.getName();
        return  cartService.saveCartItems(memberId, cartItems);
    }

    @PostMapping("/cartSave")
    public ResponseEntity<CartEntity > addToCart(@RequestBody CartEntity cart, Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }

        String memberId = authentication.getName();
        CartEntity saveCart = cartService.addToCart(memberId, cart.getProductId(), cart.getOptionId(), cart.getQuantity(), cart.getBoxCnt());

        if (saveCart != null) {
            return ResponseEntity.ok().body(saveCart);
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}
