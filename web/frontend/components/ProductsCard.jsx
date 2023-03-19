import { useState } from "react";
import {
  Card,
  Heading,
  TextContainer,
  DisplayText,
  TextStyle,
} from "@shopify/polaris";
import { Toast } from "@shopify/app-bridge-react";
import { useAppQuery, useAuthenticatedFetch } from "../hooks";

export function ProductsCard() {
  const emptyToastProps = { content: null };
  const [isLoading, setIsLoading] = useState(true);
  const [toastProps, setToastProps] = useState(emptyToastProps);
  const fetch = useAuthenticatedFetch();

  const {
    data,
    refetch: refetchProductCount,
    isLoading: isLoadingCount,
    isRefetching: isRefetchingCount,
  } = useAppQuery({
    url: "/api/products/count",
    reactQueryOptions: {
      onSuccess: () => {
        setIsLoading(false);
      },
    },
  });

  const toastMarkup = toastProps.content && !isRefetchingCount && (
    <Toast {...toastProps} onDismiss={() => setToastProps(emptyToastProps)} />
  );

  const handlePopulate = async () => {
    setIsLoading(true);
    const response = await fetch("/api/products/create");

    if (response.ok) {
      await refetchProductCount();
      setToastProps({ content: "5 products created!" });
    } else {
      setIsLoading(false);
      setToastProps({
        content: "There was an error creating products",
        error: true,
      });
    }
  };
//--------------------------------


const handleMeta = async () => {
  setIsLoading(true);
  const response = await fetch("/api/crea/meta");
  //console.log(response);
  if(response.ok){
    setToastProps({ content: "Meta created!" });
  }else {
      setIsLoading(false);
      setToastProps({
        content: "There was an error creating metafield definitions",
        error: true,
      });
    }
  setIsLoading(false);

};



//------------------------------------




const fetchCollection = async() => {

  try {
    
    const response = await fetch("/api/collections/292313825473");
    console.log(await response.json());

  } catch (err) {
    
    console.log(err);
  }

}


//fetchCollection();


//--------------------------------

const fetchOrders = async() => {

  try {
    
    const response = await fetch("/api/orders");
    console.log(await response.json());

  } catch (err) {
    
    console.log(err);
  }

}

//fetchOrders();

//--------------------------------


//--------------------------------

const fetchCustomers = async() => {

  try {
    
    const response = await fetch("/api/customers");
    console.log(await response.json());

  } catch (err) {
    
    console.log(err);
  }

}

//fetchCustomers();

//--------------------------------



//--------------------------------

const createProd = async() => {

  try {
    
    const response = await fetch("/api/prodotto/crea", {method: "POST"});
    console.log(await response.json());

  } catch (err) {
    
    console.log(err);
  }

}

//createProd();

//--------------------------------


//--------------------------------

const createMeta = async() => {

  try {
    
    const response = await fetch("/api/meta/crea", {method: "POST"});
    console.log(await response.json());

  } catch (err) {
    
    console.log(err);
  }

}

//createMeta();

//--------------------------------





  return (
    <>
      {toastMarkup}
      <Card
        title="Product Counter"
        sectioned
        primaryFooterAction={{
          content: "Create Meta",
          onAction: handleMeta,
          loading: isLoading,
        }}
      >
        <TextContainer spacing="loose">
          <p>
            Sample products are created with a default title and price. You can
            remove them at any time.
          </p>
          <Heading element="h4">
            TOTAL PRODUCTS
            <DisplayText size="medium">
              <TextStyle variation="strong">
                {isLoadingCount ? "-" : data.count}
              </TextStyle>
            </DisplayText>
          </Heading>
        </TextContainer>
      </Card>
    </>
  );
}
