import { useCallback } from "react";
import { api } from "@/lib/axios";
import { invoice } from "@telegram-apps/sdk";

const InvoiceButton = () => {
  const handleClick = useCallback(async () => {
    try {
      if (!invoice.isSupported()) {
        console.error("Invoices are not supported in this client");
        return;
      }

      const response = await api.get("/invoice/tariff/monthly");

      if (invoice.open.isAvailable()) {
        invoice.isOpened(); // false
        const promise = invoice.open(response.data.url, "url");
        invoice.isOpened(); // true
        const status = await promise;

        invoice.isOpened(); // false
      } else {
        console.error("Invoice opening is not available");
      }
    } catch (error) {
      console.error("Error handling invoice:", error);
    }
  }, []);

  return (
    <button
      onClick={handleClick}
      style={{
        marginTop: 50,
      }}
      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
    >
      Получить тариф
    </button>
  );
};

export default InvoiceButton;
