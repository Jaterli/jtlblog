---
title: "Token ERC-20 con Mint, Burn y un límite de suministro total."
description: "Ejercicio sencillo de smart contract basado en el estándar ERC-20."
pubDate: "2024-08-29"
heroImage: "/assets/images/proyectos/projects.Solidity-ERC20.png"
badge: "Finalizado"
codes: ["Solidity"]
---

### Requisitos ###

-	El contrato debe heredar de la implementación básica de OpenZeppelin para ERC-20.
-	La función de mint solo puede ser utilizada por el creador del contrato.
-	Asegurarse de que la oferta total nunca supere el límite máximo definido (por ejemplo, 1 millón de tokens).
-	Implementar una función burn para que cualquier usuario pueda quemar tokens de su propio saldo.
-	Emitir los eventos de Mint y Burn.

link de referencia: https://solidity-by-example.org/app/erc20/

### Resolución ###

```solidity
// Archivo: ERC20-exercice-2024.09.13.sol
// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20, Ownable {

    uint256 public _maxSupply;

    // Constructor que establece el nombre, símbolo y maxSupply
    constructor(uint256 maxSupply_) ERC20("Mytoken", "JTL") Ownable(msg.sender) {
        _maxSupply = maxSupply_;
    }

    // Eventos para registrar las operaciones de minteo y quema de tokens
    event Mint(address indexed minter, uint256 value);
    event Burn(address indexed burner, uint256 value);

    // Función para mintear tokens solo por el propietario
    function mint(uint256 amount) public onlyOwner {
        // Validar que la cantidad total después de mintear no exceda el máximo
        require(totalSupply() + amount <= _maxSupply, "Exceeds max supply");

        // Mintear los tokens a la dirección del contrato
        _mint(address(this), amount);

        // Emitir el evento de mint
        emit Mint(msg.sender, amount);
    }

    // Función para transferir tokens desde el contrato al propietario
    function transferToOwner(uint256 value) public onlyOwner {
        _transfer(address(this), owner(), value);
    }

    // Función para quemar tokens de la cuenta del remitente
    function burn(uint256 amount) public {
        // Quemar los tokens de la cuenta del remitente
        _burn(msg.sender, amount);

        // Emitir el evento de quema
        emit Burn(msg.sender, amount);
    }
}

```

### Uso:

- **Mint**: Solo el propietario del contrato puede mintear tokens hasta alcanzar el límite de suministro máximo (`_maxSupply`).
- **TransferToOwner**: Transfiere tokens desde el contrato al propietario.
- **Burn**: Quema tokens desde la cuenta del remitente (`msg.sender`).

Esta estructura asegura que las reglas del contrato ERC-20 se respeten, como el suministro máximo y la autorización del propietario para realizar minteos y transferencias.

He usado la herramienta Remix para la ejecución del smart contract.
Remix es un entorno de desarrollo integrado (IDE) basado en la web que se utiliza para escribir, probar y depurar contratos inteligentes en Solidity.
https://remix.ethereum.org/