import React from "react";
import Layout from "./layout";
import Content from "./Content";

const Templates = ({ userData }) => {
    return (
        <Layout userData={userData} hideTopNav={true}>
            <Content userData={userData} />
        </Layout>
    );
};

export default Templates;