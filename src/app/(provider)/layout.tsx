import React, { PropsWithChildren } from "react";
import TanstackQueryProvider from "./_providers/TanStackQueryProvider";
import AuthProvider from "./_providers/AuthProvider";
import ModalProvider from "./_providers/ModalProvider";

function ProvidersLayout({ children }: PropsWithChildren) {
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
