import {
  Card,
  Page,
  Layout,
  TextContainer,
  Heading,
  Stack,
  Select,
  Label,
  ButtonGroup,
  Button,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import CustomSidebar from "../components/CustomSidebar";

import { useState, useCallback } from "react";

export default function LayoutPage() {
  const [selected, setSelected] = useState("collections");
  const [selected2, setSelected2] = useState("conditions");

  const handleSelectedChange = useCallback((value) => setSelected(value), []);
  const handleSelectedChange2 = useCallback((value) => {
    setSelected2(value)
    console.log(value);
    console.log(selected2);
}, []);

  const options = [
    { label: "Collections1", value: "Collections1" },
    { label: "Collections2", value: "Collections2" },
    { label: "Collections3", value: "Collections3" },
  ];

  const conditions = [
    { label: "Is", value: "is" },
    { label: "Not is", value: "not-is" },
    { label: "Equal", value: "equal" },
  ];

  return (
    <Page fullWidth>
      <Stack wrap={false}>
        <Stack.Item fill>
          <Layout>
            <Layout.Section>
              <h1 style={{ fontWeight: "bold" }}>STEP 1: SELECT</h1>
            </Layout.Section>
            <Layout.Section>
              <Card>
                <Layout.Section>
                  <Stack>
                    <Stack.Item>
                      <h2>Prodotti</h2>
                    </Stack.Item>
                  </Stack>
                </Layout.Section>
                <Layout.Section>
                  <Stack>
                    <Stack.Item></Stack.Item>
                    <Stack.Item>
                      <Select
                        options={options}
                        onChange={(e) => handleSelectedChange(e)}
                        value={selected}
                      />
                    </Stack.Item>
                    <Stack.Item>
                      <Select
                        options={conditions}
                        onChange={(e) => handleSelectedChange2(e)}
                        value={selected2}
                      />
                    </Stack.Item>
                    <Stack.Item>
                      <Select />
                    </Stack.Item>
                  </Stack>
                  <Layout.Section>
                    <ButtonGroup>
                      <Button>Preview matched products</Button>
                      <Button primary>Add product filter conditions</Button>
                    </ButtonGroup>
                  </Layout.Section>
                  <Layout.Section>
                    <hr />
                  </Layout.Section>
                </Layout.Section>
              </Card>
              <Layout.Section>
                <h1>STEP 2: TEST</h1>
              </Layout.Section>
              <Layout.Section>
                <Card>
                  <Layout>
                    <Layout.Section>
                      <Stack distribution="fillEvenly">
                        <Stack.Item></Stack.Item>
                        <Stack.Item>Title</Stack.Item>
                        <Stack.Item>Variants</Stack.Item>
                        <Stack.Item>Tags</Stack.Item>
                      </Stack>
                    </Layout.Section>
                    <Layout.Section></Layout.Section>
                  </Layout>
                </Card>
              </Layout.Section>
            </Layout.Section>
            <Layout.Section>
                <h1 style={{fontWeight:"bold"}}>OPTIONAL STEP: SELECT WHAT VARIANTS TO EDIT</h1>
            </Layout.Section>


          </Layout>
        </Stack.Item>
      </Stack>
    </Page>
  );
}
