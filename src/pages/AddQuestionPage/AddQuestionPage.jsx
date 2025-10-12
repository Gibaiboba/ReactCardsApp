import cls from "./AddQuestionPage.module.css";
import { useActionState } from "react";
import { delayFn } from "../../helpers/DelayFn";
import { toast } from "react-toastify";
import { API_URL } from "../../constans";
import { Loader } from "../../components/Loader";
import { QuestionForm } from "../../components/QuestionForm";

const createCardAction = async (_prevState, formData) => {
  try {
    await delayFn();

    const newQuestion = Object.fromEntries(formData);
    const resources = newQuestion.resources.trim();
    const isClearForm = newQuestion.clearForm;

    const response = await fetch(`${API_URL}/react`, {
      method: "POST",
      body: JSON.stringify({
        question: newQuestion.question,
        answer: newQuestion.answer,
        description: newQuestion.description,
        resources: resources.length ? resources.split(",") : [],
        level: Number(newQuestion.level),
        completed: false,
        editDate: undefined,
      }),
    });

    if (response.status === 400) {
      throw new Error(response.statusText);
    }

    const question = await response.json();
    toast.success("New question successfully created!");

    return isClearForm ? {} : question;
  } catch (error) {
    toast.error(error.message);
    return {};
  }
};

const AddQuestionPage = () => {
  const [formState, formAction, isPading] = useActionState(createCardAction, {
    clearForm: true,
  });

  return (
    <>
      {isPading && <Loader />}
      <h1 className={cls.formTitle}>Add new question</h1>

      <div className={cls.formContainer}>
        <QuestionForm
          formAction={formAction}
          state={formState}
          isPading={isPading}
          submitBtnText="Add Question"
        />
      </div>
    </>
  );
};

export default AddQuestionPage;
