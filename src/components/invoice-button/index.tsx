import { useCallback } from "react";
import { api } from "@/lib/axios";
import { invoice } from "@telegram-apps/sdk";

type InvoiceButtonProps = {
  code: string;
};

const InvoiceButton = ({ code }: InvoiceButtonProps) => {
  const handleClick = useCallback(async () => {
    try {
      if (!code) {
        console.error("Invoice code is missing");
        return;
      }

      if (!invoice.isSupported()) {
        console.error("Invoices are not supported in this client");
        return;
      }

      const response = await api.get<{ url: string }>(
        `/invoice/tariff/${code}`
      );

      if (invoice.open.isAvailable()) {
        await invoice.open(response.data.url, "url");
      } else {
        console.error("Invoice opening is not available");
      }
    } catch (error) {
      console.error("Error handling invoice:", error);
    }
  }, [code]);

  return (
    <button
      onClick={handleClick}
      style={{
        marginTop: 50,
      }}
      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
      disabled={!code}
    >
      Получить тариф
    </button>
  );
};

export default InvoiceButton;
