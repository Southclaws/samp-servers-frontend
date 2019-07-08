import React from "react";
import App, { Container } from "next/app";
import Head from "next/head";
import Router from "next/router";
import withGA from "next-ga";
import NextSeo from "next-seo";

import Info from "../src/components/Info";
import Stats from "../src/containers/Stats";
import { getStatistics } from "../src/utils/utils";

class Layout extends React.Component {
  render() {
    const { children, stats } = this.props;
    return (
      <div className="layout">
        <Head title="Home">
          <link rel="stylesheet" href="https://unpkg.com/tachyons@4.10.0/css/tachyons.min.css" />
        </Head>
        <NextSeo
          config={{
            title: "SA:MP Servers",
            canonical: "https://www.samp-servers.net/",
            description: "Live indexing and data for all SA:MP servers."
          }}
        />

        <main className="avenir cf ph7-l ph5-ns ph3">
          <Info className="" />
          <Stats stats={stats} />
          <hr className="black-20 mh3" />
          {children}
          <footer className="tc pv4 f7 black-30">
            <a className="link black-50 underline hover-light-red" href="https://southcla.ws">
              Made with ❤️ by Southclaws
            </a>
          </footer>
        </main>
      </div>
    );
  }
}

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    pageProps.stats = await getStatistics();
    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <Layout stats={pageProps.stats}>
          <Component {...pageProps} />
        </Layout>
      </Container>
    );
  }
}

export default withGA("", Router)(MyApp);
