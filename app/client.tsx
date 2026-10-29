import React from "react";
import { hydrateRoot } from "react-dom/client";
import StaticPage, { type StaticProps } from "./StaticPage";
const dataElement=document.getElementById("page-data");
const root=document.getElementById("root");
if(root&&dataElement){const props=JSON.parse(dataElement.textContent||"{}") as StaticProps;hydrateRoot(root,<StaticPage {...props}/>);}
