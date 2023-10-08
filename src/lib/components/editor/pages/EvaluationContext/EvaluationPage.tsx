import { useContext, useState } from "react";
import { Button } from "../../components/Button";
import { Table } from "../../components/Table";
import { Modal } from "../../components/Modal";
import { AttributesContext } from "../../context/AttributesProvider";
import { Command } from "./index";
import { Pencil, Trash } from "../../components/Icons";
import { TextEvaluationForm } from "./TextEvaluationForm";
import "./EvaluationPage.css";

export function EvaluationPage() {
  const attributes = useContext(AttributesContext);
  const attribute =
    attributes.attributesState.data[attributes.attributesState.index];
  const [visible, setvisible] = useState(false);
  const [command, setCommand] = useState("edit" as Command);

  const openModal = () => setvisible(true);

  const closeModal = () => setvisible(false);

  const handleClick = (action: Command) => {
    setCommand(action);
    openModal();
  };

  const deleteEvaluation = () => {
    attributes.dispatch({
      type: "update_item",
      payload: { ...attribute, expression: "" },
    });
    closeModal();
  };

  const computeModalContent = () => {
    switch (command) {
      case "edit":
        return (
          <>
            <TextEvaluationForm />
            <Button className="pp-btn" onClick={closeModal}>
              Close
            </Button>
          </>
        );
      case "delete":
        return (
          <>
            <h2>
              This action will stop evaluating this attribute. Are you sure?
            </h2>
            <Button className="pp-btn" onClick={closeModal}>
              NO
            </Button>
            <Button className="pp-btn" onClick={deleteEvaluation}>
              YES
            </Button>
          </>
        );
    }
  };

  const content = computeModalContent();

  return (
    <>
      <header className="pp-content-header">
        <h1>Evaluation Configuration</h1>
      </header>

      <Table
        className="pp-attr-table"
        labels={["Name", "Type", "Expression", "Actions"]}
      >
        <AttributeList onClick={handleClick} />
      </Table>
      <Modal open={visible}>{content}</Modal>
    </>
  );
}

interface AttributeListProps {
  onClick: (action: Command) => void;
}

function AttributeList({ onClick }: AttributeListProps) {
  const { attributesState, dispatch } = useContext(AttributesContext);

  return (
    <>
      {attributesState.data.map((attribute, index) => (
        <tr key={attribute.id}>
          <td>{attribute.id}</td>
          <td className={attribute.type}>{attribute.type}</td>
          <td className="expression">
            {attribute.expression == ""
              ? "NO EVALUATION"
              : attribute.expression}
          </td>
          <td>
            {attribute.type != "CONDITION" && (
              <Button
                onClick={() => {
                  onClick("edit");
                  dispatch({ type: "select_item", index });
                }}
              >
                <Pencil />
              </Button>
            )}
            <Button
              onClick={() => {
                onClick("delete");
                dispatch({ type: "select_item", index });
              }}
            >
              <Trash />
            </Button>
          </td>
        </tr>
      ))}
    </>
  );
}