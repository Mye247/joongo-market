import React from "react";
import TanstackQueryProvider from "./_providers/TanStackQueryProvider";
import AuthProvider from "./_providers/AuthProvider";
import ModalProvider from "./_providers/ModalProvider";

function ProvidersLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <TanstackQueryProvider>
        <ModalProvider>
          <AuthProvider>{children}</AuthProvider>
        </ModalProvider>
      </TanstackQueryProvider>
    </>
  );
}

export default ProvidersLayout;
