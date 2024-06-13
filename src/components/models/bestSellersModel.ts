import axios from "axios";
import { Product } from "./../../types/index";

export class BestSellersModel {
  response: any;
  products: Product[];
  buyProducts: Product[];
  showCheck = false;
  showIndex = -1;

  constructor() {
    this.products = [];
    this.buyProducts = JSON.parse(
      localStorage.getItem("productsBuys") as string
    );
  }

  async getProducts(typeIndex: number = -1) {
    const praductTitles: string[] = [];

    this.products.splice(0, this.products.length);
    this.response = await axios.get("../dbProducts.json");

    this.buyProducts = JSON.parse(
      localStorage.getItem("allRroducts") as string
    );

    let breakCheck = 0;

    let productCount = 4;
    if (this.showCheck || typeIndex == -2) {
      if (typeIndex == -2) {
        if (this.showCheck) {
          this.showCheck = false;
        } else {
          this.showCheck = true;
        }

        typeIndex = this.showIndex;
      }
      if (this.showCheck) {
        productCount = 16;
      }
    }

    for (let i = 0; i < productCount; i += 1) {
      let randomNum = Math.floor(Math.random() * 3);
      if (typeIndex != -1) {
        randomNum = typeIndex;
      }
      let selectProduct: Product[] = [];

      let array: Product[] = [];

      array = this.response.data.Products;

      switch (randomNum) {
        case 0:
          selectProduct = array.filter((pr) => {
            return pr.type == "T-Shirt";
          });
          break;
        case 1:
          selectProduct = array.filter((pr) => {
            return pr.type == "Hooded";
          });
          break;
        case 2:
          selectProduct = array.filter((pr) => {
            return pr.type == "Jacket";
          });
          break;
      }
      randomNum = Math.floor(Math.random() * selectProduct.length);

      if (!praductTitles.includes(selectProduct[randomNum].title)) {
        let checkOk = true;

        this.buyProducts.forEach((buyE) => {
          if (buyE.title == selectProduct[randomNum].title) {
            if (selectProduct[randomNum].quantity - buyE.quantity == 0) {
              checkOk = false;
            }
          }
        });

        if (checkOk) {
          praductTitles.push(selectProduct[randomNum].title);
          this.products.push(selectProduct[randomNum]);

          breakCheck = 0;
        } else {
          i -= 1;
        }
      } else {
        breakCheck += 1;

        if (breakCheck == 2000) {
          break;
        }

        i -= 1;
      }
    }

    this.buyProducts.forEach((buyE) => {
      this.products.forEach((e) => {
        if (buyE.title == e.title) {
          e.quantity -= buyE.quantity;
        }
      });
    });

    console.dir(this.products);
    this.showIndex = typeIndex;
  }

  addProductsLg(product: Product) {
    let workChek = true;

    this.buyProducts = JSON.parse(
      localStorage.getItem("allRroducts") as string
    );

    if (product.quantity) {
      for (let i = 0; i < this.buyProducts.length; i += 1) {
        if (product.title == this.buyProducts[i].title) {
          this.buyProducts[i].quantity += 1;
          localStorage.setItem("allRroducts", JSON.stringify(this.buyProducts));

          workChek = false;
          break;
        }
      }
      if (workChek) {
        product.quantity = 1;
        this.buyProducts.push(product);
        localStorage.setItem("allRroducts", JSON.stringify(this.buyProducts));
      }

      this.products.forEach((e) => {
        if (e.title == product.title) {
          e.quantity -= 1;
        }
      });
    }
  }
}
