---
title: "Token ERC-20 con Mint, Burn y un límite de suministro total."
description: "Ejercicio sencillo de smart contract basado en el estándar ERC-20."
pubDate: "2024-08-29"
heroImage: "/assets/images/proyectos/projects.Solidity-ERC20.png"
badge: "Finalizado"
tags: ["Solidity"]
---

### Requisitos

-	El contrato debe heredar de la implementación básica de OpenZeppelin para ERC-20.
-	La función de mint solo puede ser utilizada por el creador del contrato.
-	Asegurarse de que la oferta total nunca supere el límite máximo definido (por ejemplo, 1 millón de tokens).
-	Implementar una función burn para que cualquier usuario pueda quemar tokens de su propio saldo.
-	Emitir los eventos de Mint y Burn.

link de referencia: https://solidity-by-example.org/app/erc20/

### Resolución

```solidity
// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.20;

import "@openzeppelin/contracts@5.0.0/access/Ownable.sol";
import "@openzeppelin/contracts@5.0.0/token/ERC20/ERC20.sol";

contract MyToken is ERC20, Ownable {

    error ERC20MaxSupply();
    uint256 private _maxSupply;

    // Constructor que establece el nombre, símbolo y maxSupply
    constructor(uint256 maxSupply_) ERC20("Mytoken", "JTL") Ownable(msg.sender) {
        _maxSupply = maxSupply_;
    }

    // Eventos para registrar las operaciones de minteo y quema de tokens
    event Mint(address indexed minter, uint256 value);
    event Burn(address indexed burner, uint256 value);

    // Función para mintear tokens solo por el propietario
    function mint(address account, uint256 value) external onlyOwner {
        // Validar que la cantidad total después de mintear no exceda el máximo
        
        if (totalSupply() + value > _maxSupply) {
            revert ERC20MaxSupply();
        }

        // Mintear los tokens a la dirección del contrato
        _mint(account, value);

        // Emitir el evento de mint
        emit Mint(msg.sender, value);
    }

    // Función para transferir tokens desde el contrato al propietario
    function transferToOwner(uint256 value) external onlyOwner {
        _transfer(address(this), owner(), value);
    }

    // Función para quemar tokens de la cuenta del remitente
    function burn(uint256 value) external {
        // Quemar los tokens de la cuenta del remitente
        _burn(msg.sender, value);

        // Emitir el evento de quema
        emit Burn(msg.sender, value);
    }
}

```

### Flujo de Operaciones

1.  **Minting**:
    
    -   El propietario llama a la función `mint()` para crear nuevos tokens. Si la suma del suministro total actual y la cantidad a mintear excede el suministro máximo, la transacción es revertida.
    -   Los tokens son minteados y asignados a la cuenta especificada.
    -   Se emite el evento `Mint`.
2.  **Transferencia de tokens al propietario**:
    
    -   Si el propietario quiere mover tokens desde la dirección del contrato a su propia dirección, puede llamar a `transferToOwner()`.
3.  **Burning**:
    
    -   Cualquier usuario puede destruir parte de sus tokens mediante la función `burn()`, lo que reduce el suministro total.
    -   Se emite el evento `Burn` para registrar la destrucción.

### Seguridad

-   **Suministro máximo**: La función `mint()` incluye una comprobación para asegurarse de que no se supere el suministro máximo. Si se intenta hacerlo, la transacción se revierte usando el error `ERC20MaxSupply()`.
-   **Privilegios de propietario**: Solo el propietario del contrato puede mintear nuevos tokens o transferir tokens desde la dirección del contrato.
-   **Uso de errores personalizados**: El contrato utiliza el mecanismo de `error` de Solidity, que es más eficiente que usar strings en las condiciones `require`.

### Ejemplo de Uso

-   **Crear tokens**: El propietario puede crear tokens llamando a `mint()` y especificando una dirección donde se enviarán los tokens.
-   **Transferir tokens al propietario**: Si los tokens fueron minteados al contrato, el propietario puede transferirlos a su cuenta llamando a `transferToOwner()`.
-   **Quemar tokens**: Cualquier usuario puede quemar sus propios tokens llamando a `burn()`.

Este contrato proporciona una implementación segura de un token ERC-20 con un suministro máximo limitado y funciones adicionales para la emisión y destrucción de tokens, con controles de acceso solo para el propietario.


He usado la herramienta **Remix** para la ejecución del smart contract.
**Remix** es un entorno de desarrollo integrado (IDE) basado en la web que se utiliza para escribir, probar y depurar contratos inteligentes en Solidity.
https://remix.ethereum.org/