import {decode} from 'html-entities';

type Quiz = {
  key: string;
  qIndex: number;
  oIndex: number;
  value: string;
  selectedOption: SelectedOption;
  correctAnswer: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};
type SelectedOption = {
  [key: string]: string;
};
export default function Option(props: Quiz) {
  let questNum = props.qIndex + 1;
  let questTitle = `question${questNum}`;
    return (
      <div>
        <input
          type="radio"
          id={`q${questNum}Opt${props.oIndex}`}
          value={props.value}
          name={questTitle}
          checked={props.selectedOption[questTitle] === props.value}
          onChange={props.handleChange}
          required
        />
        <label htmlFor={`q${questNum}Opt${props.oIndex}`} className="option">
          {decode(props.value)}
        </label>
      </div>
    );
}
