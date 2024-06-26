import "./deleteArticleForm.scss";

type DeleteArticleFormProps = {
  onDelete: () => void;
  setIsDeleteButtonClicked: (isDeleteButtonClicked: boolean) => void;
};

export default function DeleteArticleForm({
  onDelete,
  setIsDeleteButtonClicked,
}: DeleteArticleFormProps) {
  return (
    <div className="delete-article-wrapper">
      <form className="delete-article-form">
        <header className="delete-article-header">Are you sure?</header>
        <div className="delete-article-buttons">
          <button
            className="delete-article-buttons-yes"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              onDelete();
              setIsDeleteButtonClicked(false);
            }}
          >
            Yes!
          </button>
          <button
            className="delete-article-buttons-no"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              setIsDeleteButtonClicked(false);
            }}
          >
            Nuh
          </button>
        </div>
      </form>
    </div>
  );
}
