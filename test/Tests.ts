import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import hre from "hardhat";

describe("Lock", function () {

  async function deployErc20FromScratch() {

    const ADDRESS_ZERO = '0x0000000000000000000000000000000000000000'

    const [owner, otherAccount] = await hre.ethers.getSigners();

    const Token = await hre.ethers.getContractFactory("ERC20FromScratch");
    const token = await Token.deploy("CustomToken", "CTK", 18);

    return { owner, otherAccount, ADDRESS_ZERO, token };
  }

  describe("Deployment", function () {
    it("Should deploy the contract", async () => {
      const { token, ADDRESS_ZERO } = await deployErc20FromScratch();
      expect(token.target).to.be.not.equal(ADDRESS_ZERO);
    });
  })

  describe("Mint tokens", function () {
    it("Should mint certain amount of tokens", async () => {
      const { token, owner } = await deployErc20FromScratch();
      await token.mint(owner.address, 1000);
      expect(await token.balanceOf(owner.address)).to.be.equal(1000);
    });
  })

  describe("Burn tokens", function () {
    it("Should burn certain amount of tokens", async () => {
      const { token, owner } = await deployErc20FromScratch();
      await token.mint(owner.address, 1000);
      await token.burn(owner.address, 500);
      expect(await token.balanceOf(owner.address)).to.be.equal(500);
    });
  })

  describe("Transfer tokens", function () {
    it("Should transfer certain amount of tokens", async () => {
      const { token, owner, otherAccount } = await deployErc20FromScratch();
      await token.mint(owner.address, 1000);
      await token.transfer(otherAccount.address, 500);
      expect(await token.balanceOf(otherAccount.address)).to.be.equal(500);
    });
  });

  // describe("Transfer certain amount of tokens from one account to other", function () {
  //   it("Should transfer certain amount of tokens from one account to other", async () => {
  //     const { token, owner, otherAccount } = await deployErc20FromScratch();
  //     await token.mint(owner.address, 1000);
  //     await token.approve(otherAccount, 500);
  //     await token.transferFrom(owner, otherAccount, 500);
  //     expect(await token.balanceOf(otherAccount.address)).to.be.equal(500);
  //   })
  // })
});
