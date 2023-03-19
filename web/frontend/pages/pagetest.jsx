import { Card, Page, Layout, TextContainer, Heading, Stack } from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import CustomSidebar from "../components/CustomSidebar";

export default function PageName() {
  return (
    <Page fullWidth>
        <Stack wrap={false}>
            <Stack.Item>
                <CustomSidebar />
            </Stack.Item>
        </Stack>
    </Page>
  );
}
