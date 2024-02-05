import Layout from "@/components/Layout";
import getStore from "@/store";
import { AppProps } from "next/app";
import { Provider } from "react-redux";

import "@/assets/styles/global.css";

const store = getStore();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}
