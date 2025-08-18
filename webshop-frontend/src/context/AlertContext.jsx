import React, { createContext, useContext, useState, useCallback } from "react";

const AlertContext = createContext();

export function useAlert() {
    return useContext(AlertContext);
}

export default function AlertProvider({ children }) {
    const [alert, setAlert] = useState(null);

    const showAlert = useCallback((message, type = "info", duration = 3000) => {
        setAlert({ message, type });
        setTimeout(() => setAlert(null), duration);
    }, []);

    return (
        <AlertContext.Provider value={{ showAlert }}>
            {children}

            {alert && (
                <div
                    style={{
                        position: "fixed",
                        top: "20px",
                        right: "20px",
                        padding: "10px 16px",
                        backgroundColor:
                            alert.type === "success" ? "green" :
                            alert.type === "error" ? "red" :
                            "blue",
                        color: "white",
                        borderRadius: "4px",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                        zIndex: 1000
                    }}
                >
                    {alert.message}
                </div>
            )}
        </AlertContext.Provider>
    );
}
