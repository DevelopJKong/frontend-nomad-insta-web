import { Helmet } from 'react-helmet-async';

const PageTitle = ({ title }: { title: string }) => {
   return <Helmet>{title} | insta_clone</Helmet>;
};

export default PageTitle;
