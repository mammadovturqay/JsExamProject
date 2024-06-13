import { Product } from "./types/indenpmx";
import axios from "axios";

import { HeaderConturol } from "./components/conturols/headerConturol";
import { MainSiteConturol } from "./components/conturols/mainSiteConturol";
import { BrandItemsConturol } from "./components/conturols/brandItemsConturol";
import { NewStyleItemsConturol } from "./components/conturols/newStyleItemsConturol";
import { SpecialItemCounturol } from "./components/conturols/specialItemConturol";
import { BestSellersConturol } from "./components/conturols/bestSellersConturol";
import { FollowSectionConturol } from "./components/conturols/followSectionConturol";
import { FooterConturol } from "./components/conturols/footerConturol";
import { ShopConturol } from "./components/conturols/shopConturol";
// import "./sass/main.scss";
import "../sass/main.scss";

async function getPost() {
  let posts = await axios.get("../dbProducts.json");
  console.dir(posts.data.Products);
}
getPost();

if (!localStorage.getItem("allRroducts")) {
  localStorage.setItem("allRroducts", JSON.stringify([]));
}

const hc = new HeaderConturol();
const msc = new MainSiteConturol();
const bic = new BrandItemsConturol();
const nsic = new NewStyleItemsConturol();
const sic = new SpecialItemCounturol();
const bsc = new BestSellersConturol();
const fsc = new FollowSectionConturol();
const fc = new FooterConturol();
const sc = new ShopConturol();
hc.addEvent(sc.openCloseShow.bind(sc));
nsic.addEventInThis(sc.showProducts.bind(sc));
bsc.addEventInThis(sc.showProducts.bind(sc));
