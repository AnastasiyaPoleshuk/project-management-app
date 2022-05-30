import { useForm } from 'react-hook-form';
import './ColumnForm.scss';

type ColumnFormValues = {
  columnTitle: string;
};

type ColumnFormProps = {
  onSubmit: (data: ColumnFormValues) => void;
  onCancel: () => void;
};

const ColumnForm = ({ onSubmit, onCancel }: ColumnFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ColumnFormValues>();

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      {errors?.columnTitle && <p className="formError">* column title should be fill</p>}
      <input
        type="text"
        className="formInput"
        {...register('columnTitle', { required: true })}
        placeholder="Enter column title"
        autoComplete="off"
      />
      <div className="btnWrapper">
        <input className="formBtn" type="submit" value="Submit" />
        <input className="formBtn" type="button" value="Cancel" onClick={onCancel} />
      </div>
    </form>
  );
};

export default ColumnForm;
