import { getHandbookProps, HandbookProps, getHandbookFiles } from "src/utils/";
import { GetStaticPaths, GetStaticProps } from "next";
export { default } from "src/handbook";

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const handbookFiles = await getHandbookFiles();

    return {
      paths: handbookFiles.files.map((file) => ({
        params: { handbook: file.name },
      })),
      fallback: false,
    };
  } catch (error) {
    console.error(error);
    return { paths: [], fallback: true };
  }
};

export const getStaticProps: GetStaticProps<HandbookProps> = async (
  context
) => {
  try {
    const handbook = `${context?.params?.handbook}`;
    const props = await getHandbookProps(handbook);
    return {
      props,
    };
  } catch (e) {
    console.error(e);
    return {
      props: {
        handbooks: { handbooks: [], categories: [] },
        subHeadings: [],
        filename: "",
      },
    };
  }
};
