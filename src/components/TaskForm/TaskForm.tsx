import { useForm } from 'react-hook-form';

type TaskFormValues = {
  title: string;
  description: string;
};

type TaskFormProps = {
  onSubmit: (data: TaskFormValues) => void;
  onCancel: () => void;
  values?: {
    title: string;
    description: string;
  };
};

const TaskForm = ({ onSubmit, onCancel, values }: TaskFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskFormValues>({
    defaultValues: { title: values?.title, description: values?.description },
  });

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      {errors?.title && <span className="formError">* task title should be fill</span>}
      <input
        type="text"
        className="formInput"
        {...register('title', { required: true })}
        placeholder="Enter task title"
        autoComplete="off"
        autoFocus
      />
      {errors?.description && <span className="formError">* task description should be fill</span>}
      <textarea
        className="formText"
        {...register('description', { required: true })}
        placeholder="Enter task description"
        autoComplete="off"
      />
      <div className="btnWrapper">
        <input className="formBtn" type="submit" value="Submit" />
        <input className="formBtn" type="button" value="Cancel" onClick={onCancel} />
      </div>
    </form>
  );
};

TaskForm.defaultProps = {
  values: {},
};

export default TaskForm;
