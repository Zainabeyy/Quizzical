type handleCategory={
  handleSelect: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}
export default function QuizCategory(props:handleCategory) {
  return (
    <div className="categoryContent">
      <label htmlFor="category" className="categoryDescr">Choose a category:</label>
      <select id="category" name="category"  onChange={props.handleSelect}>
        <option value="General Knowledge">General Knowledge</option>
        <option value="Books">Entertainment: Books</option>
        <option value="Cartoon and Animations">Cartoon and Animations</option>
        <option value="Science and Nature">Science and Nature</option>
      </select>
    </div>
  );
}
