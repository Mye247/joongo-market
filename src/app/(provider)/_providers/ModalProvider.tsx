"use client";

import { useModalStore } from "@/zustand/modalStore";
import { PropsWithChildren } from "react";
import Modal from "../(root)/_components/Modal";

function ModalProvider({ children }: PropsWithChildren) {
  const isModal = useModalStore((state) => state.isModal);

  return (
    <>
      {isModal === true ? <Modal /> : null}
      {children}
    </>
  );
}

export default ModalProvider;
