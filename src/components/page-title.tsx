import { Helmet } from "react-helmet-async";

const PageTitle = ({ title }: { title: string }) => {
   return <Helmet>{title} | instaclone</Helmet>;
};

export default PageTitle;
