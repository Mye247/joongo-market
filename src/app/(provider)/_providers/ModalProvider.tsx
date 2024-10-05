"use client";

import { PropsWithChildren } from "react";
import { useModalStore } from "@/zustand/modalStore";
import ModalPage from "../(root)/_components/Modal";

function ModalProvider({ children }: PropsWithChildren) {
  const isModal = useModalStore((state) => state.isModal);

  return (
    <>
      {children}
      {isModal && <ModalPage />}
    </>
  );
}

export default ModalProvider;
