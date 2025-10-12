import { useActionState } from "react";
import cls from "./EditQuestionPage.module.css";
import { Loader } from "../../components/Loader";
import { QuestionForm } from "../../components/QuestionForm";
import { delayFn } from "../../helpers/DelayFn";
import { API_URL } from "../../constans";
import { toast } from "react-toastify";
import { dateFormat } from "../../helpers/DateFormat";

const editCardAction = async (_prevState, formData) => {
  try {
    await delayFn();

    const newQuestion = Object.fromEntries(formData);
    const resources = newQuestion.resources.trim();
    const questionId = newQuestion.questionId;
    const isClearForm = newQuestion.clearForm;

    const response = await fetch(`${API_URL}/react/${questionId}`, {
      method: "PATCH",
      body: JSON.stringify({
        question: newQuestion.question,
        answer: newQuestion.answer,
        description: newQuestion.description,
        resources: resources.length ? resources.split(",") : [],
        level: Number(newQuestion.level),
        completed: false,
        editDate: dateFormat(new Date()),
      }),
    });

    if (response.status === 400) {
      throw new Error(response.statusText);
    }

    const question = await response.json();
    toast.success("The question edited successfully!");

    return isClearForm ? {} : question;
  } catch (error) {
    toast.error(error.message);
    return {};
  }
};

export const EditQuestion = ({ initialState = {} }) => {
  const [formState, formAction, isPading] = useActionState(editCardAction, {
    ...initialState,
    clearForm: false,
  });

  return (
    <>
      {isPading && <Loader />}
      <h1 className={cls.formTitle}>Edit question</h1>

      <div className={cls.formContainer}>
        <QuestionForm
          formAction={formAction}
          state={formState}
          isPading={isPading}
          submitBtnText="Edit Question"
        />
      </div>
    </>
  );
};
