import { all } from "redux-saga/effects"

import maincategorySagas from "./MainCategorySagas"
import subcategorySagas from "./SubcategorySagas"
import brandSagas from "./BrandSagas"
import testimonialSagas from "./TestimonialSagas"
import productSagas from "./ProductSagas"
import cartSagas from "./CartSagas"
import wishlistSagas from "./WishlistSagas"
import checkoutSagas from "./CheckoutSagas"
import newsletterSagas from "./NewsletterSagas"
import contactUsSagas from "./ContactUsSagas"
export default function* RootSaga() {
    yield all([
        maincategorySagas(),
        subcategorySagas(),
        brandSagas(),
        testimonialSagas(),
        productSagas(),
        cartSagas(),
        wishlistSagas(),
        checkoutSagas(),
        newsletterSagas(),
        contactUsSagas(),
    ])
}