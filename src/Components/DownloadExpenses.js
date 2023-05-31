import { Button } from "react-bootstrap";
import { useRef } from "react";
import { useSelector } from "react-redux";

const DownloadExpenses = () => {
  const downloadLinkRef = useRef(null);
  const expenses = useSelector((state) => state.expenses.expenses);

  const convertToCSV = () => {
    const cols = ["Category", "Description", "Amount"];
    const rows = expenses.map((expense) =>
      [expense.category, expense.description, expense.money].join(",")
    );
    return [cols.join(","), ...rows].join("\n");
  };

  const downloadHandler = () => {
    const csvData = convertToCSV();
    const blob = new Blob([csvData]);
    const url = URL.createObjectURL(blob);
    downloadLinkRef.current.href = url;
  };

  return (
    <Button
      onClick={downloadHandler}
      download={"expenses.csv"}
      as="a"
      ref={downloadLinkRef}
    >
      Download Expenses
    </Button>
  );
};

export default DownloadExpenses;
