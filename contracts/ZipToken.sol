// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Capped.sol";
import "@uniswap/v2-periphery/contracts/interfaces/IUniswapV2Router02.sol";
import "@uniswap/v2-core/contracts/interfaces/IUniswapV2Factory.sol";

contract ZipToken is ERC20Capped {
    address public owner;
    uint256 private constant TOTAL_SUPPLY = 25000000 * (10 ** 18);
    address public uniswapRouter;
    address public uniswapFactory;

    event OwnershipTransferred(
        address indexed previousOwner,
        address indexed newOwner
    );

    constructor(
        string memory name,
        string memory symbol,
        uint256 totalSupply,
        uint8 decimals,
        address _uniswapRouter,
        address _uniswapFactory
    ) ERC20(name, symbol) ERC20Capped(totalSupply * (10 ** decimals)) {
        _mint(msg.sender, totalSupply * (10 ** decimals));
        uniswapRouter = _uniswapRouter;
        uniswapFactory = _uniswapFactory;
    }

    function transferOwnership(address newOwner) external {
        require(msg.sender == owner, "Only the owner can transfer ownership");
        address previousOwner = owner;
        owner = newOwner;
        emit OwnershipTransferred(previousOwner, newOwner);
    }

    function addLiquidity(uint256 tokenAmount, uint256 ethAmount) external {
        approve(uniswapRouter, tokenAmount);

        address pair = IUniswapV2Factory(uniswapFactory).getPair(
            address(this),
            IUniswapV2Router02(uniswapRouter).WETH()
        );

        if (pair == address(0)) {
            IUniswapV2Factory(uniswapFactory).createPair(
                address(this),
                IUniswapV2Router02(uniswapRouter).WETH()
            );
            pair = IUniswapV2Factory(uniswapFactory).getPair(
                address(this),
                IUniswapV2Router02(uniswapRouter).WETH()
            );
        }

        IUniswapV2Router02(uniswapRouter).addLiquidityETH{value: ethAmount}(
            address(this),
            tokenAmount,
            0,
            0,
            owner,
            block.timestamp + 3600
        );
    }

    function _taxOnSwap(
        address sender,
        address recipient,
        uint256 amount
    ) internal {
        uint256 taxAmount = (amount * 5) / 100;
        _transferWithTax(sender, address(this), taxAmount);
        _transferWithTax(sender, recipient, amount - taxAmount);
    }

    function _transferWithTax(
        address sender,
        address recipient,
        uint256 amount
    ) internal {
        if (recipient == uniswapRouter) {
            _taxOnSwap(sender, recipient, amount);
        }
        super._transfer(sender, recipient, amount);
    }
}
