import { News } from "../pages/RootPage";

type DetailsCardProps = {
  article: News;
};

export default function DetailsCard({ article }: DetailsCardProps) {
  return (
    <>
      {article ? (
        <>
          <section className="details">
            <img src={article.image} />
            <p className="details-id">ID: {article.id}</p>
            <p>Slug: {article.slug}</p>
            <p>URL: {article.url}</p>
            <p>Title: {article.title}</p>

            <p>{article.content}</p>
            <p>Status: {article.status}</p>
            <p>Ctegory: {article.category}</p>
          </section>
        </>
      ) : (
        <div>
          <h1>Loading...</h1>
        </div>
      )}
    </>
  );
}
