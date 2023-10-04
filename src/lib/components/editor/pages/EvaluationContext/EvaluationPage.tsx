import { useContext, useState } from "react";
import { Attribute } from "../../types";
import { Button } from "../../components/Button";
import { Table } from "../../components/Table";
import { Modal } from "../../components/Modal";
import { EvaluationForm } from "./EvaluationForm";
import { AttributesContext } from "../../context/AttributesProvider";
import { Command } from "./index";
import { Pencil, Trash } from "../../components/Icons";
import "./EvaluationPage.css";

export function EvaluationPage() {
  const [visible, setvisible] = useState(false);
  const [command, setCommand] = useState("edit" as Command);

  const openModal = () => setvisible(true);

  const closeModal = () => setvisible(false);

  const handleClick = (action: Command) => {
    setCommand(action);
    openModal();
  };

  const computeModalContent = () => {
    switch (command) {
      case "edit":
        return (
          <>
            <EvaluationForm />
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
            <Button className="pp-btn">YES</Button>
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

      <Table className="pp-attr-table" labels={["Name", "Type", "Actions"]}>
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
  const { state, dispatch } = useContext(AttributesContext);

  const renderAttributeItem = (attribute: Attribute) => {
    switch (attribute.type) {
      case "TEXT":
        return (
          <>
            <td className="text">{attribute.type}</td>
          </>
        );
      case "NUMERIC":
        return (
          <>
            <td className="numeric">{attribute.type}</td>
          </>
        );
      case "CONDITION":
        return (
          <>
            <td className="condition">{attribute.type}</td>
          </>
        );
    }
  };

  return (
    <>
      {state.data.map((attribute, index) => (
        <tr key={attribute.id}>
          <td>{attribute.id}</td>
          {renderAttributeItem(attribute)}
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
