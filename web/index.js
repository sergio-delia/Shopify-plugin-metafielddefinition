// @ts-check
import { join } from "path";
import { readFileSync } from "fs";
import express from "express";
import serveStatic from "serve-static";

import shopify from "./shopify.js";
import productCreator from "./product-creator.js";
import {metafielddefinitionCreator} from "./product-creator.js";
import GDPRWebhookHandlers from "./gdpr.js";

const PORT = parseInt(process.env.BACKEND_PORT || process.env.PORT, 10);

const STATIC_PATH =
  process.env.NODE_ENV === "production"
    ? `${process.cwd()}/frontend/dist`
    : `${process.cwd()}/frontend/`;

const app = express();

// Set up Shopify authentication and webhook handling
app.get(shopify.config.auth.path, shopify.auth.begin());
app.get(
  shopify.config.auth.callbackPath,
  shopify.auth.callback(),
  shopify.redirectToShopifyOrAppRoot()
);
app.post(
  shopify.config.webhooks.path,
  shopify.processWebhooks({ webhookHandlers: GDPRWebhookHandlers })
);

// If you are adding routes outside of the /api path, remember to
// also add a proxy rule for them in web/frontend/vite.config.js

app.use("/api/*", shopify.validateAuthenticatedSession());

app.use(express.json());

app.get("/api/products/count", async (_req, res) => {
  const countData = await shopify.api.rest.Product.count({
    session: res.locals.shopify.session,
  });
  res.status(200).send(countData);
});

//--------------------------------------------------------------------------


app.get("/api/collections/292313825473", async(req, res) => {

  try {
    
    const response = await shopify.api.rest.Collection.find({
      session: res.locals.shopify.session,
      id: 292313825473,
    });

    res.status(200).send(response);

  } catch (err) {
    
    res.status(500).send(err)
  }
  
});
//--------------------------------------------------------------------------

app.get("/api/orders", async(req, res) => {

try {
  
  const response= await shopify.api.rest.Order.all({
    session: res.locals.shopify.session,
    status: "any",
  });

  res.status(200).send(response)

} catch (err) {
  
  res.status(500).send(err)
}


})


//--------------------------------------------------------------------------

app.get("/api/customers", async(req, res) => {

try {
  
  const response= await shopify.api.rest.Customer.all({
    session: res.locals.shopify.session,
    ids: "6514484904129",
  });

  res.status(200).send(response)

} catch (err) {
  
  res.status(500).send(err)
}


})

//--------------------------------------------------------------------------

app.post("/api/prodotto/crea", async (req, res) => {

  try {
    
    const product = new shopify.api.rest.Product({session: res.locals.shopify.session});
    product.title = "Burton Custom Freestyle 151TEST";
    product.body_html = "<strong>Good snowboard!</strong>";
    product.vendor = "Burton";
    product.product_type = "Snowboard";
    product.status = "draft";
    await product.save({
      update: true,
    });
    console.log(res.locals);
    res.status(200).send('OK fatto prod');


  } catch (err) {
    res.status(500).send(err)
  }

})

//--------------------------------------------------------------------------

app.post("/api/meta/crea", async (req, res) => {

  try {

    const metafield = new shopify.api.rest.Metafield({session: res.locals.shopify.session});
    metafield.collection_id = 292321591489;
    metafield.namespace = "my_fields";
    metafield.key = "discount2";
    metafield.type = "single_line_text_field";
    //metafield.value = "25%";
    await metafield.save({
      update: true,
    });
    //console.log(res.locals.shopify);
    res.status(200).send('OK fatto meta2');
  

    
  } catch (err) {
    res.status(500).send(err)
  }

})


//--------------------------------------------------------------------------

app.get('/api/crea/meta', async(req, res) => {

  let status = 200;
  let error = null;
  try {
    await metafielddefinitionCreator(res.locals.shopify.session);
  } catch (e) {
    console.log(`Failed to process metafielddefinition2: ${e.message}`);
    status = 500;
    error = e.message;
  }
  res.status(status).send({ success: status === 200, error });
});


//--------------------------------------------------------------------------



app.get("/api/products/create", async (_req, res) => {
  let status = 200;
  let error = null;

  try {
    await productCreator(res.locals.shopify.session);
  } catch (e) {
    console.log(`Failed to process products/create: ${e.message}`);
    status = 500;
    error = e.message;
  }
  res.status(status).send({ success: status === 200, error });
});

app.use(serveStatic(STATIC_PATH, { index: false }));

app.use("/*", shopify.ensureInstalledOnShop(), async (_req, res, _next) => {
  return res
    .status(200)
    .set("Content-Type", "text/html")
    .send(readFileSync(join(STATIC_PATH, "index.html")));
});

app.listen(PORT);
