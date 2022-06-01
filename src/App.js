import React from 'react';
import Routes from "./routes/routes";
import { ConfigProvider } from 'antd';

export default function App() {
  ConfigProvider.config({
    theme: {
      
    },
  });
  return <ConfigProvider><Routes /></ConfigProvider>;
}
