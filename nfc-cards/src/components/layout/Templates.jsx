import React from "react";
import Layout from "./layout";
import Content from "./Content";

const Templates = ({ userData }) => {
    return (
        <Layout userData={userData} title="My Identity Nodes">
            <Content userData={userData} />
        </Layout>
    );
};

export default Templates;