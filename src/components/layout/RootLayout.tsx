import { Layout, Flex } from 'antd';
import Navbar from '../Navbar/Navbar';
import { Header } from 'antd/es/layout/layout';
const { Content } = Layout;

interface FuncProps {
  children: React.ReactNode;
}

const RootLayout: React.FC<FuncProps> = ({ children }) => {
  return (
    <Layout>
      <Header>
        <Navbar />
      </Header>
      <Content>{children}</Content>
    </Layout>
  );
};

export default RootLayout;
