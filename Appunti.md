https://www.youtube.com/watch?v=hJCjYdxySIw 30m

Necessario avere account su ngrok.
Necessario avere un negozio shopify e un account shopify partners

lanciare npm init @shopify/app@latest da powershell e seguire la configurazione

dopodichè installare l'app al link che esce

creare l'estensione con npm run shopify app generate extension e seguire la configurazione

Dall'account di shopify partners andare su app -> estensioni e abilitare l'app

Per lanciare l'app fare npm run dev

Nella cartella extension -> blocks creare un file liquid e inserirci quello che si vuole

Creare uno schema nel file liquid

Esempio schema
{% render "app_snippet" %}
{% schema %}

  {
    "name": "Hello world",
    "target": "section",
    "stylesheet": "app.css",
    "javascript": "app.js",
    "settings": [
      {
        "label": "Color",
        "id": "color",
        "type": "color",
        "default": "#000000"
      }
    ]
  }
{% endschema %}


Per leggere dei dati tramite api entrare nel file index.js e creare degli endpoint (vedere documentazione admin-rest api shopify) come da esempio (incollare dopo riga 52 del file index.js)

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


Una volta scritto questo codice entrare in una pagina del frontend del modulo (esempio web/frontend/components/ProductsCard.jsx) e scrivere quanto segue 

const fetchCollection = async() => {

  try {
    
    const response = await fetch("/api/collections/292313825473");
    console.log(await response.json());

  } catch (err) {
    
    console.log(err);
  }

}


fetchCollection();


//--------------------------------

const fetchOrders = async() => {

  try {
    
    const response = await fetch("/api/orders");
    console.log(await response.json());

  } catch (err) {
    
    console.log(err);
  }

}

fetchOrders();

Per gli ordini è necessario fare richiesta di sblocco su shopify partners -> app -> entrare nell'app -> configurazione app e da destra "Accesso ai dati protetti dei clienti" -> Dati protetti dei clienti -> spuntare tutte le caselle

Per i moduli che dovranno andare online sarà necessario fare richiesta a Shopify direttamente dalla pagina di shopify partner 